const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

let id_counter = 7; //initial count

//GETs
router.get('/', async (req, res) => {
    try {
        const result = await Student.find({});
        res.status(200).json(result);
    } catch (err) {
        res.statusCode = 500;
        res.json({
            status: 'failed',
            message: err.message,
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Student.findOne({ id }, { _id: 0, __v: 0 });
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                status: 'failed',
                message: '404 student id doesnt exist',
            });
        }
    } catch (err) {
        res.statusCode = 500;
        res.json({
            status: 'failed',
            message: err.message,
        });
    }
});

//POSTs
router.post('/', validateStudentData, async (req, res) => {
    try {
        const { name, currentClass, division } = req.body;
        const id = ++id_counter;
        const result = await Student.create({
            id,
            name,
            currentClass,
            division,
        });
        if (result) {
            res.status(200).json({ id: result.id });
        } else {
            res.status(400).json({
                status: 'failed',
                message: 'wasnt able to create the student',
            });
        }
    } catch (err) {
        res.statusCode = 500;
        res.json({
            status: 'failed',
            message: err.message,
        });
    }
});

//Puts
router.put('/:id', async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const user = await Student.find({ id });
        if (user.length <= 0)
            throw new Error('wrong id', { cause: 'id doesnt exist' });
        validateName(name);
        const result = await Student.updateOne({ id }, { $set: { name } });
        if (result.modifiedCount > 0) {
            res.status(200).json(await Student.find({ id }));
        } else {
            res.status(400).json({
                status: 'failed',
                message:
                    "wasn't able to update the student check your data or same data",
            });
        }
    } catch (err) {
        if (err.message === 'wrong name') {
            res.statusCode = 400;
            res.json({
                status: 'failed',
                message: err.cause,
            });
        } else if (err.message === 'wrong id') {
            res.statusCode = 404;
            res.json({
                status: 'failed',
                message: 'id doesnt exist',
            });
        } else {
            res.statusCode = 500;
            res.json({
                status: 'failed',
                message: err.message,
            });
        }
    }
});

//Deletes
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Student.find({ id });
        if (user.length <= 0)
            throw new Error('wrong id', { cause: 'id doesnt exist' });
        const result = await Student.deleteOne({ id });
        if (result.deletedCount > 0) {
            res.status(200).json({
                status: 'success',
                message: 'deleted successfully student with id ' + id,
            });
        } else {
            res.status(400).json({
                status: 'failed',
                message: "didn't delete anything check your id",
            });
        }
    } catch (err) {
        if (err.message === 'wrong id') {
            res.statusCode = 404;
            res.json({
                status: 'failed',
                message: err.cause,
            });
        } else {
            res.statusCode = 500;
            res.json({
                status: 'failed',
                message: err.message,
            });
        }
    }
});

function validateStudentData(req, res, next) {
    const { name, currentClass, division } = req.body;
    try {
        if (name === undefined || name.length <= 0) {
            throw new Error("provide a correct 'name' field");
        }
        if (
            currentClass === undefined ||
            isNaN(Number(currentClass)) ||
            currentClass <= 0
        ) {
            throw new Error("provide a correct 'currentClass' field");
        }
        if (division === undefined || division.length <= 0) {
            throw new Error("provide a correct 'division' field");
        }
        next();
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message,
        });
    }
}

function validateName(name) {
    if (name === undefined || name.length <= 0) {
        throw new Error('wrong name', {
            cause: "provide correct 'name' field",
        });
    }
    return;
}

module.exports = router;
