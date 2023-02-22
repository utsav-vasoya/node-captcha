const express = require('express');
const svgCaptcha = require('svg-captcha');
const localStorage = require('localStorage')
const ejs = require('ejs');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');

app.get('/captcha', function (req, res) {
    const captcha = svgCaptcha.create({
        size: 5,
        noise: 2,
        color: true,
        background: '#cc9966'
    });
    localStorage.setItem("captcha", captcha.text)
    res.render('index', { data: captcha.data })
});

app.post('/check', function (req, res) {
    if (req.body.captcha == localStorage.getItem("captcha")) {
        res.send("Valid Captcha")
    } else {
        res.send("Inalid Captcha")
    }
})

app.listen(3001, function () {
    console.log('Example app listening on port 3001!');
});
