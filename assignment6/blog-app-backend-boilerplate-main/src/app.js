const express = require('express');
const app = express();


// Import routes
const blogRoute = require('./routes/blog');


//Router MIddlewares
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/blog', blogRoute);

app.get('/', (req, res) => {
    res.redirect('/blog');
});

module.exports = app;
