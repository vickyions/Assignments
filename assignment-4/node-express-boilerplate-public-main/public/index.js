const form1 = document.getElementById('form1');
const addBtn = document.getElementById('add');
const subBtn = document.getElementById('sub');
const multiplyBtn = document.getElementById('multiply');
const divideBtn = document.getElementById('divide');

console.log(addBtn);
addBtn.addEventListener('click', (event) => {
    form1.action = '/add';
    form1.submit();
});

subBtn.addEventListener('click', (event) => {
    form1.action = '/sub';
    form1.submit();
});

multiplyBtn.addEventListener('click', (event) => {
    form1.action = '/multiply';
    form1.submit();
});

divideBtn.addEventListener('click', (event) => {
    form1.action = '/divide';
    form1.submit();
});
