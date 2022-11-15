const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 8080;
require('dotenv/config');
const mongoose = require('mongoose');
const Student = require('./models/Student');

const initialdata = require('./InitialData');

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// your code goes here
//
// redirect to /api/student when path root
app.get('/', (req, res) => {
    res.redirect('/api/student');
});

//Import routes
const studentRoutes = require('./routes/student.js');
app.use('/api/student', studentRoutes);

mongoose.connect(process.env.DB_CONNECTION, async (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log('connected to DB');
        //insert the initial data if not there
        const result = await Student.find({}).count();
        if (result > 0) {
            console.log('initial data already there...can proceed now');
        } else {
            const result = await Student.create(initialdata);
            console.log(
                'inserted inital data: No of documents inserted: ' +
                    result.length
            );
        }
    }
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
