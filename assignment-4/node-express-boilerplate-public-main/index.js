const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const {valAndEval, opStr, MSG} = require('./src/validate');

//Bodyparser Middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Serve static pages
app.use(express.static(path.join(__dirname, 'public')));


app.post("/add", (req, res) => {
    const response = valAndEval(req.body.num1, req.body.num2, opStr.add);
    response.status === MSG.statusSuccess ? res.status(200) : res.status(400);
    res.json(response);
});

app.post("/sub", (req, res) => {
    const response = valAndEval(req.body.num1, req.body.num2, opStr.sub);
    response.status === MSG.statusSuccess ? res.status(200) : res.status(400);
    res.json(response);
});

app.post("/multiply", (req, res) => {
    const response = valAndEval(req.body.num1, req.body.num2, opStr.multiply);
    response.status === MSG.statusSuccess ? res.status(200) : res.status(400);
    res.json(response);
});

app.post("/divide", (req, res) => {
    const response = valAndEval(req.body.num1, req.body.num2, opStr.divide);
    response.status === MSG.statusSuccess ? res.status(200) : res.status(400);
    res.json(response);
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`))

module.exports = app;
