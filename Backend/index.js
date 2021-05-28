const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const config = require("./config/servierconfig.json");
const Promise = require("bluebird");
const request = Promise.promisify(require("request"));
const moment = require("moment");
const _ = require("lodash");

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));

app.listen(8002, () => {
    console.log(" === STARTED === ");
});

// APIS To fetch the COVID DATA.

app.get(`/coviddata/:country`, (req, res) => {
    const uri = `https://api.covidtracking.com/v1/states/${req.params.country}/daily.json`;
    let from = new Date(moment(req.query.from));
    let to = new Date(moment(req.query.to));
    from = from.getTime();
    to = to.getTime();
    return request({
        uri,
        method: "GET"
    })
    .then(response => {
        if(response) {
            let res = JSON.parse(response.body);
            let filteredData = _.filter(res, rec => {
                let time = new Date(moment(rec.date.toString()));
                time = time.getTime();
                return from <= time && time <= to;
           });
           if(filteredData) {
               return _.map(filteredData, data => {
                   return {
                       state: data.state,
                       positive: data.positive,
                       positiveIncrease: data.positiveIncrease,
                       death: data.death,
                       deathIncrease: data.deathIncrease,
                       date: data.date
                   };
               });
           } else {
               return [];
           }
        }
    }).then(response => {
        response = response.reverse();
        res.send(response);
    });
});

app.get(`/coviddata`, (req, res) => {
    const uri = `https://api.covidtracking.com/v1/states/current.json`;
    return request({
        uri,
        method: "GET"
    })
    .then(response => {
        if(response) {
            console.log("TYPE!!!!!!!!        ", response.body);
            let res = JSON.parse(response.body);
            return _.map(res, rec => {
                return {
                    state: rec.state,
                    positive: rec.positive,
                    positiveIncrease: rec.positiveIncrease,
                    death: rec.death,
                    deathIncrease: rec.deathIncrease
                };
            });
        }
    })
    .then(data => {
        res.send(data);
    });
});