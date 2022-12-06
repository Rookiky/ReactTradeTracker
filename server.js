const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql2');
const bodyParser = require('body-parser');



app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "DELETE"],
        credentials: true,
    })
);

app.use(express.json())

let db = mysql.createConnection({
    user: "root",
    host:'localhost',
    password:'Vicdub2910.',
    database: 'trade-tracker'
})

app.listen(3001, () => {
    console.log('server up and running')
})

app.post('/register', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email)

    db.query(
        "INSERT INTO userauth (email, password) VALUES (?, ?)",
        [email, password],
        (err , result) => {
            console.log(err);
            res.send({message: result})
        }
    )
})

app.post('/login', (req, res) => {
    const emaillog = req.body.emaillog;
    const passwordlog = req.body.passwordlog;

    db.query(
        "SELECT * FROM userauth WHERE email = ? AND password = ?",
        [emaillog, passwordlog], 
        (err, result) => {
            if(err){
            console.log(err);
        }

        if(result.length > 0) {
            res.send(result)
            } else {
                res.send({message: 'wrong combi'})
            }
        }
    )
});

    app.post('/portfoliolist', (req, res) => {
    const portfolio = req.body.portfolio;
    const email = req.body.email;
    const accountsize = req.body.accountsize;

    db.query(
        "INSERT INTO portfoliolist (portfolio, email, accountsize) VALUES (?, ?, ?)",
        [portfolio, email, accountsize],
        (err, result) => {
            console.log(err);
            res.send({message: result})
            console.log(portfolio)
        }
    )
})

app.post('/registertrade', (req, res) => {
    const crypto = req.body.crypto;
    const position = req.body.position;
    const size = req.body.size;
    const takeprofit1 = req.body.takeprofit1;
    const takeprofit2 = req.body.takeprofit2;
    const stoploss = req.body.stoploss;
    const setup = req.body.setup;
    const effetlevier = req.body.effetlevier;
    const result = req.body.result;
    const entry = req.body.entry; 
    const email = req.body.email;
    const account = req.body.currentportfolio

    db.query(
        "INSERT INTO portfolio (crypto, position, entry, email, size, takeprofit1, takeprofit2, stoploss, setup, effetlevier, result, account) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [crypto, position, entry, email, size, takeprofit1, takeprofit2, stoploss, setup, effetlevier, result, account],
        (err, result) => {
            console.log(err)
            console.log(result)
            console.log(account)
        }
    )
})

app.post('/retreivetrades', (req, res) => {
    const email = req.body.email;
    const currentportfolio = req.body.currentportfolio   // si current faux renvoie tout si une valeur renvoie seulement ces trades

    db.query(
        "SELECT * FROM portfolio WHERE email = ? AND account = ?", //enlever account si jamaais j'arrive pas
        [email, currentportfolio],
        (err, result) => {
            console.log(err)
            console.log(result)
            console.log(currentportfolio)
            res.send({message: result})
        }
    )
})

app.post('/retreiveportfolio', (req, res) => {
    const email = req.body.email;

    db.query(
        "SELECT * FROM portfoliolist WHERE email = ?",
        [email],
        (err, result) => {
            console.log(err);
            console.log(result);
            res.send({message: result})
        }
    )
})





app.post('/rightportfolio', (req, res) => {
    const currentportfolio = req.body.currentportfolio;

    db.query(
        'SELECT * FROM portfolio WHERE account = ?',
        [currentportfolio],
        (err, result) => {
            console.log(result);
            console.log(err);
            res.send({message: result})
        }
    )
})

app.delete('/deletetrade/:(tradeid,email)', (req, res) => {
    const tradeid = req.params.tradeid;
    const email = req.params.email

    db.query(
        'DELETE FROM portfolio WHERE tradeid = ? AND email = ?',
        [tradeid, email],
        (err, result) => {
            
            console.log(result);
            console.log(err);
            res.send({message: result})
        }
    )
})


app.use(bodyParser.urlencoded({extended: true}))
