const UNDERFLOW = -(10 ** 6);
const OVERFLOW = 10 ** 6;

const opStr = {
    add: 'add',
    sub: 'sub',
    multiply: 'multiply',
    divide: 'divide',
};

const MSG = {
    add: 'the sum of given two numbers',
    sub: 'the difference of given two numbers',
    multiply: 'The product of given numbers',
    divide: 'The division of given numbers',
    underflow: 'Underflow',
    overflow: 'Overflow',
    divideByZero: 'Cannot divide by zero',
    invalidDataType: 'Invalid data types',
    emptyFields: 'Number Fields cannot be empty',
    statusErr: 'error',
    statusSuccess: 'success',
    statusFailure: 'failure',
    failure: 'Something went wrong',
};

//Individual validaters
const isEmpty = (data) => {
    return data.length < 1;
};

const isNumber = (data) => {
    return !isNaN(data);
};

const underLimit = (num) => {
    return num < UNDERFLOW;
};

const overLimit = (num) => {
    return num > OVERFLOW;
};

const isZero = (num) => {
    return num === 0;
};

//Main Validate and Evaluate the response object
const valAndEval = (num1, num2, op) => {
    const res = {
        status: 'error',
        message: MSG.emptyFields,
        result: null,
    };

    //both undefined for some reason
    if (num1 === undefined || num2 === undefined) {
        res.message = MSG.failure;
        res.status = MSG.statusFailure;
        res.result = null;
        return res;
    }

    //validate for common cases first
    if (isEmpty(num1) || isEmpty(num2)) {
        res.message = MSG.emptyFields;
        res.status = MSG.statusErr;
        return res;
    }

    //convert to numbers
    const Num1 = Number(num1);
    const Num2 = Number(num2);

    if (!isNumber(Num1) || !isNumber(Num2)) {
        res.message = MSG.invalidDataType;
        res.status = MSG.statusErr;
        return res;
    }

    if (isZero(Num2) && op === opStr.divide) {
        res.message = MSG.divideByZero;
        res.status = MSG.statusErr;
        return res;
    }

    //checking limit of inputs
    if (underLimit(Num1) || underLimit(Num2)) {
        res.message = MSG.underflow;
        res.status = MSG.statusErr;
        return res;
    }

    if (overLimit(Num1) || overLimit(Num2)) {
        res.message = MSG.overflow;
        res.status = MSG.statusErr;
        return res;
    }

    //result validater called from main validater
    const validateResult = (resultEvaluator, op) => {
        let result = resultEvaluator(op);

        if (!underLimit(result) && !overLimit(result)) {
            res.result = result;
            res.status = MSG.statusSuccess;
            res.message = MSG[op];
        } else {
            res.result = null;
            res.message = underLimit(result) ? MSG.underflow : MSG.overflow;
            res.status = MSG.statusErr;
        }
        console.log(res);
        return res;
    };

    //evaluation
    const evaluator = (op) => {
        switch (op) {
            case opStr.add:
                return Num1 + Num2;
            case opStr.sub:
                return Num1 - Num2;
            case opStr.multiply:
                return Num1 * Num2;
            case opStr.divide:
                return Num1 / Num2;
        }
    };

    return validateResult(evaluator, op);
};

module.exports = {valAndEval, opStr, MSG};
