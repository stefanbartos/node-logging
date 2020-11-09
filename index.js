const express = require('express');
const parser = require('body-parser');
const fs = require('fs');

const PORT = 3000;

const app = express();
app.disable('x-powered-by');

app.use(parser.json());
app.use((req, res, next) => {
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

app.post('/log', (req, res) => {
    const time = new Date().toLocaleTimeString();
    console.log(`${time}  request come`);

    // console.log(req.headers)
    // console.log(req.body)
    const data = JSON.stringify(req.body);
    console.log(data)
    fs.appendFile('output.txt', data + '\n', (err) => {
        if (err) {
            console.error(err);
            return;
        }
    });

    res.send('ok');
});

app.listen(PORT, () => {
    console.log(`server stared on port: ${PORT}`);
});
