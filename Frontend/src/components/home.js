import React from "react";
import { useState, useEffect } from "react";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import Chart from "react-google-charts";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const _ = require("lodash");
const moment = require('moment');

const Home = props => {
    const [tab, setTab] = useState("country");
    const [index, setIndex] = useState(0);
    const [country, setCountry] = useState("India");
    const [from, setFrom] = useState("2021-02-01");
    const [to, setTo] = useState("2021-05-02");
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [data1, setData1] = useState([]);
    const [graph1, setGraph1] = useState([]);
    const [graph2, setGraph2] = useState([]);
    const [graph3, setGraph3] = useState([]);
    const [graph4, setGraph4] = useState([]);
    const [pieChart1, setPieChart1] = useState([]);
    const [pieChart2, setPieChart2] = useState([]);
    const [pieChart3, setPieChart3] = useState([]);
    const [pieChart4, setPieChart4] = useState([]);

    const countries = { Afghanistan: 'AF',
    'Åland Islands': 'AX',
    Albania: 'AL',
    Algeria: 'DZ',
    'American Samoa': 'AS',
    AndorrA: 'AD',
    Angola: 'AO',
    Anguilla: 'AI',
    Antarctica: 'AQ',
    'Antigua and Barbuda': 'AG',
    Argentina: 'AR',
    Armenia: 'AM',
    Aruba: 'AW',
    Australia: 'AU',
    Austria: 'AT',
    Azerbaijan: 'AZ',
    Bahamas: 'BS',
    Bahrain: 'BH',
    Bangladesh: 'BD',
    Barbados: 'BB',
    Belarus: 'BY',
    Belgium: 'BE',
    Belize: 'BZ',
    Benin: 'BJ',
    Bermuda: 'BM',
    Bhutan: 'BT',
    Bolivia: 'BO',
    'Bosnia and Herzegovina': 'BA',
    Botswana: 'BW',
    'Bouvet Island': 'BV',
    Brazil: 'BR',
    'British Indian Ocean Territory': 'IO',
    'Brunei Darussalam': 'BN',
    Bulgaria: 'BG',
    'Burkina Faso': 'BF',
    Burundi: 'BI',
    Cambodia: 'KH',
    Cameroon: 'CM',
    Canada: 'CA',
    'Cape Verde': 'CV',
    'Cayman Islands': 'KY',
    'Central African Republic': 'CF',
    Chad: 'TD',
    Chile: 'CL',
    China: 'CN',
    'Christmas Island': 'CX',
    'Cocos (Keeling) Islands': 'CC',
    Colombia: 'CO',
    Comoros: 'KM',
    Congo: 'CG',
    'Congo, The Democratic Republic of the': 'CD',
    'Cook Islands': 'CK',
    'Costa Rica': 'CR',
    'Cote D\'Ivoire': 'CI',
    Croatia: 'HR',
    Cuba: 'CU',
    Cyprus: 'CY',
    'Czech Republic': 'CZ',
    Denmark: 'DK',
    Djibouti: 'DJ',
    Dominica: 'DM',
    'Dominican Republic': 'DO',
    Ecuador: 'EC',
    Egypt: 'EG',
    'El Salvador': 'SV',
    'Equatorial Guinea': 'GQ',
    Eritrea: 'ER',
    Estonia: 'EE',
    Ethiopia: 'ET',
    'Falkland Islands (Malvinas)': 'FK',
    'Faroe Islands': 'FO',
    Fiji: 'FJ',
    Finland: 'FI',
    France: 'FR',
    'French Guiana': 'GF',
    'French Polynesia': 'PF',
    'French Southern Territories': 'TF',
    Gabon: 'GA',
    Gambia: 'GM',
    Georgia: 'GE',
    Germany: 'DE',
    Ghana: 'GH',
    Gibraltar: 'GI',
    Greece: 'GR',
    Greenland: 'GL',
    Grenada: 'GD',
    Guadeloupe: 'GP',
    Guam: 'GU',
    Guatemala: 'GT',
    Guernsey: 'GG',
    Guinea: 'GN',
    'Guinea-Bissau': 'GW',
    Guyana: 'GY',
    Haiti: 'HT',
    'Heard Island and Mcdonald Islands': 'HM',
    'Holy See (Vatican City State)': 'VA',
    Honduras: 'HN',
    'Hong Kong': 'HK',
    Hungary: 'HU',
    Iceland: 'IS',
    India: 'IN',
    Indonesia: 'ID',
    'Iran, Islamic Republic Of': 'IR',
    Iraq: 'IQ',
    Ireland: 'IE',
    'Isle of Man': 'IM',
    Israel: 'IL',
    Italy: 'IT',
    Jamaica: 'JM',
    Japan: 'JP',
    Jersey: 'JE',
    Jordan: 'JO',
    Kazakhstan: 'KZ',
    Kenya: 'KE',
    Kiribati: 'KI',
    'Korea, Democratic People\'S Republic of': 'KP',
    'Korea, Republic of': 'KR',
    Kuwait: 'KW',
    Kyrgyzstan: 'KG',
    'Lao People\'S Democratic Republic': 'LA',
    Latvia: 'LV',
    Lebanon: 'LB',
    Lesotho: 'LS',
    Liberia: 'LR',
    'Libyan Arab Jamahiriya': 'LY',
    Liechtenstein: 'LI',
    Lithuania: 'LT',
    Luxembourg: 'LU',
    Macao: 'MO',
    'Macedonia, The Former Yugoslav Republic of': 'MK',
    Madagascar: 'MG',
    Malawi: 'MW',
    Malaysia: 'MY',
    Maldives: 'MV',
    Mali: 'ML',
    Malta: 'MT',
    'Marshall Islands': 'MH',
    Martinique: 'MQ',
    Mauritania: 'MR',
    Mauritius: 'MU',
    Mayotte: 'YT',
    Mexico: 'MX',
    'Micronesia, Federated States of': 'FM',
    'Moldova, Republic of': 'MD',
    Monaco: 'MC',
    Mongolia: 'MN',
    Montserrat: 'MS',
    Morocco: 'MA',
    Mozambique: 'MZ',
    Myanmar: 'MM',
    Namibia: 'NA',
    Nauru: 'NR',
    Nepal: 'NP',
    Netherlands: 'NL',
    'Netherlands Antilles': 'AN',
    'New Caledonia': 'NC',
    'New Zealand': 'NZ',
    Nicaragua: 'NI',
    Niger: 'NE',
    Nigeria: 'NG',
    Niue: 'NU',
    'Norfolk Island': 'NF',
    'Northern Mariana Islands': 'MP',
    Norway: 'NO',
    Oman: 'OM',
    Pakistan: 'PK',
    Palau: 'PW',
    'Palestinian Territory, Occupied': 'PS',
    Panama: 'PA',
    'Papua New Guinea': 'PG',
    Paraguay: 'PY',
    Peru: 'PE',
    Philippines: 'PH',
    Pitcairn: 'PN',
    Poland: 'PL',
    Portugal: 'PT',
    'Puerto Rico': 'PR',
    Qatar: 'QA',
    Reunion: 'RE',
    Romania: 'RO',
    'Russian Federation': 'RU',
    RWANDA: 'RW',
    'Saint Helena': 'SH',
    'Saint Kitts and Nevis': 'KN',
    'Saint Lucia': 'LC',
    'Saint Pierre and Miquelon': 'PM',
    'Saint Vincent and the Grenadines': 'VC',
    Samoa: 'WS',
    'San Marino': 'SM',
    'Sao Tome and Principe': 'ST',
    'Saudi Arabia': 'SA',
    Senegal: 'SN',
    'Serbia and Montenegro': 'CS',
    Seychelles: 'SC',
    'Sierra Leone': 'SL',
    Singapore: 'SG',
    Slovakia: 'SK',
    Slovenia: 'SI',
    'Solomon Islands': 'SB',
    Somalia: 'SO',
    'South Africa': 'ZA',
    'South Georgia and the South Sandwich Islands': 'GS',
    Spain: 'ES',
    'Sri Lanka': 'LK',
    Sudan: 'SD',
    Suriname: 'SR',
    'Svalbard and Jan Mayen': 'SJ',
    Swaziland: 'SZ',
    Sweden: 'SE',
    Switzerland: 'CH',
    'Syrian Arab Republic': 'SY',
    'Taiwan, Province of China': 'TW',
    Tajikistan: 'TJ',
    'Tanzania, United Republic of': 'TZ',
    Thailand: 'TH',
    'Timor-Leste': 'TL',
    Togo: 'TG',
    Tokelau: 'TK',
    Tonga: 'TO',
    'Trinidad and Tobago': 'TT',
    Tunisia: 'TN',
    Turkey: 'TR',
    Turkmenistan: 'TM',
    'Turks and Caicos Islands': 'TC',
    Tuvalu: 'TV',
    Uganda: 'UG',
    Ukraine: 'UA',
    'United Arab Emirates': 'AE',
    'United Kingdom': 'GB',
    'United States': 'US',
    'United States Minor Outlying Islands': 'UM',
    Uruguay: 'UY',
    Uzbekistan: 'UZ',
    Vanuatu: 'VU',
    Venezuela: 'VE',
    'Viet Nam': 'VN',
    'Virgin Islands, British': 'VG',
    'Virgin Islands, U.S.': 'VI',
    'Wallis and Futuna': 'WF',
    'Western Sahara': 'EH',
    Yemen: 'YE',
    Zambia: 'ZM',
    Zimbabwe: 'ZW' };

    useEffect(() => {
        fetchCountryData();
    }, [from, to, country]);

    useEffect(() => {
        fetchCurrentData();
    }, []);

    const fetchCurrentData = () => {
        setIsLoading(true);
        let uri = "http://localhost:8002/coviddata";
        fetch(uri)
            .then(res => {
                if (res.ok) return res.json();
            })
            .then(response => {
                setIsLoading(false);
                setData1(response);
                let arr = _.map(response, rec => {
                    return [
                        rec.state,
                        rec.positive
                    ]
                });
                arr = [["Country", "Cases"], ...arr];
                setPieChart1(arr);

                arr = _.map(response, rec => {
                    return [
                        rec.state,
                        rec.positiveIncrease
                    ]
                });
                arr = [["Country", "Cases"], ...arr];
                setPieChart2(arr);

                arr = _.map(response, rec => {
                    return [
                        rec.state,
                        rec.death
                    ]
                });
                arr = [["Country", "Cases"], ...arr];
                setPieChart3(arr);

                arr = _.map(response, rec => {
                    if(rec.deathIncrease > 0) {
                        return [
                            rec.state,
                            rec.deathIncrease
                        ]
                    }
                });
                arr = _.compact([["Country", "Cases"], ...arr]);
                setPieChart4(arr);
            })
    };

    const fetchCountryData = () => {
        setIsLoading(true);
        let uri = `http://localhost:8002/coviddata/${countries[country]}?from=${from}&to=${to}`
        fetch(uri)
            .then(res => {
                if (res.ok) return res.json();
            })
            .then(response => {
                setIsLoading(false);
                setData(response);
                let arr = _.map(response, rec => {
                    return [
                        moment(rec.date.toString()).format("LL"),
                        rec.positive,
                    ]
                });
                arr = [["Cases", "Date"], ...arr];
                setGraph1(arr);
                setGraph2([["Cases", "Date"], ..._.map(response, rec => {
                    return [
                        moment(rec.date.toString()).format("LL"),
                        rec.positiveIncrease,
                    ]
                })]);
                setGraph3([["Deaths", "Date"], ..._.map(response, rec => {
                    return [
                        moment(rec.date.toString()).format("LL"),
                        rec.death,
                    ]
                })]);
                setGraph4([["Deaths", "Date"], ..._.map(response, rec => {
                    return [
                        moment(rec.date.toString()).format("LL"),
                        rec.deathIncrease,
                    ]
                })]);
            });
    };


    const CountryComp = props => {
        const [selectOpen, setSelectOpen] = useState(false);
        const useStyles = makeStyles((theme) => ({
            container: {
                display: 'flex',
                flexWrap: 'wrap',
            },
            textField: {
                marginLeft: theme.spacing(10),
                marginRight: theme.spacing(10),
                marginTop: theme.spacing(5),
                width: 200,
            },
        }));

        const classes = useStyles();

        return (
            <React.Fragment>
                <form className={classes.container} noValidate>
                    <TextField
                        id="date"
                        label="From"
                        type="date"
                        defaultValue={from}
                        value={from}
                        className={classes.textField}
                        onChange={event => setFrom(event.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="date"
                        label="To"
                        type="date"
                        defaultValue={to}
                        value={to}
                        className={classes.textField}
                        onChange={event => setTo(event.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <FormControl className={classes.textField}>
                        <InputLabel id="demo-controlled-open-select-label">Country</InputLabel>
                        <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            open={selectOpen}
                            onClose={() => setSelectOpen(false)}
                            onOpen={() => setSelectOpen(true)}
                            value={country}
                            onChange={event => setCountry(event.target.value)}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {
                                Object.keys(countries).map(cn => {
                                    return <MenuItem value={cn}>{cn}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                </form>
                {
                    isLoading ? <CircularProgress /> :

                        <React.Fragment>
                            <Chart chartType="LineChart" width="100%" height="400px" data={graph1} options={{
                                hAxis: {
                                    title: 'Date',
                                },
                                vAxis: {
                                    title: 'Cases',
                                },
                            }} />
                            <Chart chartType="LineChart" width="100%" height="400px" data={graph2} options={{
                                hAxis: {
                                    title: 'Date',
                                },
                                vAxis: {
                                    title: 'CasesCummulative',
                                },
                            }} />
                            <Chart chartType="LineChart" width="100%" height="400px" data={graph3} options={{
                                hAxis: {
                                    title: 'Date',
                                },
                                vAxis: {
                                    title: 'Deaths',
                                },
                            }} />
                            <Chart chartType="LineChart" width="100%" height="400px" data={graph4} options={{
                                hAxis: {
                                    title: 'Date',
                                },
                                vAxis: {
                                    title: 'Cummulative',
                                },
                            }} />
                        </React.Fragment>
                }
            </React.Fragment>
        );
    };

    const DataComp = props => {

        const useStyles = makeStyles((theme) => ({
            pie: {
                alignItems: "left"
            }
        }));

        const classes = useStyles();

        return (
            <React.Fragment>
                <div>
                    <Chart
                        width={'500px'}
                        height={'300px'}
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={pieChart1}
                        options={{
                            title: 'Positive Cases',
                        }}
                        rootProps={{ 'data-testid': '1' }}
                        className={classes.pie}
                    />

                    <Chart
                        width={'500px'}
                        height={'300px'}
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={pieChart2}
                        options={{
                            title: 'Cummulative Positive Cases',
                        }}
                        rootProps={{ 'data-testid': '1' }}
                        className={classes.pie}
                    />
                </div>

                <div>
                    <Chart
                        width={'500px'}
                        height={'300px'}
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={pieChart3}
                        options={{
                            title: 'Deaths',
                        }}
                        rootProps={{ 'data-testid': '1' }}
                        className={classes.pie}
                    />

                    <Chart
                        width={'500px'}
                        height={'300px'}
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={pieChart4}
                        options={{
                            title: 'Cummulative Deaths',
                        }}
                        rootProps={{ 'data-testid': '1' }}
                        className={classes.pie}
                    />
                </div>
            </React.Fragment>
        );
    };

    const handleChange = (event, value) => {
        setIndex(value);
        if (value === 0) {
            setTab("country");
        } else if (value === 1) {
            setTab("data");
        }
    }

    return (
        <React.Fragment>
            <AppBar position="static">
                <Tabs value={index} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="By Country" />
                    <Tab label="By Date" />
                </Tabs>
            </AppBar>
            {
                (() => {
                    if (tab === "country") {
                        return <CountryComp />
                    }
                    else if (tab === "data") return <DataComp />
                })()
            }
        </React.Fragment>
    );
};

export default Home;

