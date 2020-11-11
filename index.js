const express = require('express');
const parser = require('body-parser');
const fs = require('fs');

const PORT = 3000;
const LOG_DIRECTORY_PATH = './output_log';

const app = express();
app.disable('x-powered-by');

app.use(parser.json());
app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-Requested-With,content-type'
    );

    next();
});

const checkOutputLogDirectory = () => {
    if (!fs.existsSync(LOG_DIRECTORY_PATH)) {
        fs.mkdirSync(LOG_DIRECTORY_PATH);
    }
};

checkOutputLogDirectory();

const getShortDate = (dateToFormat) => {
    const day = `0${dateToFormat.getDate()}`.slice(-2);
    const month = `0${dateToFormat.getMonth() + 1}`.slice(-2);
    const year = dateToFormat.getFullYear();

    return `${day}.${month}.${year}`;
};

let date = getShortDate(new Date());

setInterval(() => {
    date = getShortDate(new Date());
}, 1000 * 60 * 5);

app.post('/log', (req, res) => {
    const time = new Date().toLocaleTimeString();
    console.log(`${time} - Request from ${req.ip}`);

    // console.log(req)
    // console.log(req.body)
    const data = JSON.stringify(req.body);
    // console.log(data)
    fs.appendFile(
        `${LOG_DIRECTORY_PATH}/${req.ip}-${date}.log`,
        data + '\n',
        (err) => {
            if (err) {
                console.error(err);
            }
        }
    );

    res.send('ok');
});

app.listen(PORT, () => {
    console.log(`server stared on port: ${PORT}`);
});
