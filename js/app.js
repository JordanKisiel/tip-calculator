/* =============================================

TODO:
-test with different values to make sure calculations are done correctly
-review design files to make sure I'm not missing anything (besides the things I decided against)
-test in mobile to make it works

============================================== */





//grab elements
const billAmount = document.getElementById('billAmount');
const tipOptions = document.querySelectorAll('fieldset > button');
const customTip = document.getElementById('customTip');
const numOfPeople = document.getElementById('numOfPeople');
const tipAmount = document.getElementById('tipAmount');
const totalPerPerson = document.getElementById('totalPerPerson');
const reset = document.getElementById('reset');

//declare variables
const BILL_ALLOWED_CHARS = /[0-9.]/;
const PEOPLE_ALLOWED_CHARS = /[1-9]/;
const TIP_ALLOWED_CHARS = /[0-9.%]/;
const DEFAULT_TIP_PERCENTAGE = '15%';
let tipPercentage = DEFAULT_TIP_PERCENTAGE;


//event listeners
tipOptions.forEach(button => button.addEventListener('click', (e) => {
    selectPresetTipAmount(e);
    calculateTotals();
}));
customTip.addEventListener('blur', (e) => {
    setCustomTipAmount(e);
    calculateTotals();
});
customTip.addEventListener('keydown', checkForValidCharacter);
customTip.addEventListener('keypress', (e) => {
    if(e.key === 'Enter'){
        e.preventDefault();
        e.target.blur();
    }
});
billAmount.addEventListener('blur', calculateTotals);
billAmount.addEventListener('keydown', checkForValidCharacter);
billAmount.addEventListener('keypress', (e) => {
    if(e.key === 'Enter'){
        e.preventDefault();
        e.target.blur();
    }
});
numOfPeople.addEventListener('blur', calculateTotals);
numOfPeople.addEventListener('keydown', checkForValidCharacter);
numOfPeople.addEventListener('keypress', (e) => {
    if(e.key === 'Enter'){
        e.preventDefault();
        e.target.blur();
    }
});
reset.addEventListener('click', resetForm);



//callback functions
function checkForValidCharacter(e){
    if(e.target === billAmount){
        //allow keyboard shortcuts and useful keys like backspace
        if(e.ctrlKey || e.altKey || typeof e.key !== 'string' || e.key.length !== 1){
            return;
        }

        if(!BILL_ALLOWED_CHARS.test(e.key)){
            e.preventDefault();
        }
        else{
            if(e.key === '.' && billAmount.value.includes('.')){
                e.preventDefault();
            }
        }
    }
    
    if(e.target === numOfPeople){
        //allow keyboard shortcuts and useful keys like backspace
        if(e.ctrlKey || e.altKey || typeof e.key !== 'string' || e.key.length !== 1){
            return;
        }

        if(!PEOPLE_ALLOWED_CHARS.test(e.key)){
            e.preventDefault();
        }
    }
    
    if(e.target === customTip){
        //allow keyboard shortcuts and useful keys like backspace
        if(e.ctrlKey || e.altKey || typeof e.key !== 'string' || e.key.length !== 1){
            return;
        }

        if(!TIP_ALLOWED_CHARS.test(e.key)){
            e.preventDefault();
        }
        else{
            if(e.key === '.' && customTip.value.includes('.')){
                e.preventDefault();
            }
            if(e.key === '%' && customTip.value.includes('%')){
                e.preventDefault();
            }
        }
    }
}

function resetForm(e){
    e.preventDefault();

    billAmount.value = '';

    //reset back to default tip button preset and tip amount
    let defaultTipButton;
    for(let i = 0; i < tipOptions.length; i++){
        if(tipOptions.item(i).innerHTML === DEFAULT_TIP_PERCENTAGE){
            defaultTipButton = tipOptions.item(i);
        }
    }

    tipOptions.forEach(button => setInactiveAppearance(button));
    setActiveAppearance(defaultTipButton);
    tipPercentage = DEFAULT_TIP_PERCENTAGE;

    customTip.value = '';

    numOfPeople.value = '';

    displayTotals(0, 0);

}

function selectPresetTipAmount(e){
    e.preventDefault();
    
    //change appearance of buttons as needed
    tipOptions.forEach(button => setInactiveAppearance(button));
    setActiveAppearance(e.target);

    //reset custom tip input
    customTip.value = '';
    
    tipPercentage = e.target.innerHTML;
}

function setCustomTipAmount(e){
    //verify valid input (accept both number & percentage format)
    if(/[^0-9%.]/g.test(e.target.value)){
        e.target.value = '';
    }
    else{
        tipPercentage = e.target.value;
        console.log(tipPercentage);

        //set appearance of all presets to inactive
        tipOptions.forEach(button => setInactiveAppearance(button));
    }
}

function calculateTotals(){
    let bill = billAmount.value;
    let people = numOfPeople.value;
    let tip = '';

    console.log(isValidPercentage(tipPercentage));

    if(isValidBillAmount(bill) && isValidPeopleAmount(people) && isValidPercentage(tipPercentage)){
        //take percent sign off tip
        let tip = '';

        if(tipPercentage.slice(-1) === '%'){
            tip = tipPercentage.slice(0, tipPercentage.length - 1);
        }
        else{
            tip = tipPercentage;
        }
        
        let totalPerPerson = Number(bill) * (1 + Number(tip)/100) / Number(people);
        let tipPerPerson = Number(bill) * (Number(tip)/100) / Number(people);

        //round totals up to next cent
        totalPerPerson = roundToNearestCent(totalPerPerson);
        tipPerPerson = roundToNearestCent(tipPerPerson);

        displayTotals(totalPerPerson, tipPerPerson);
    }
    else{
        console.log('cannot calculate');
    }
}




//helper functions
function roundToNearestCent(amount){
    return Math.ceil(amount * 100)/100;
}

function displayTotals(total, tip){
    total = total.toFixed(2);
    tip = tip.toFixed(2);
    tipAmount.innerHTML = '$' + tip;
    totalPerPerson.innerHTML = '$' + total;
}

function isValidPercentage(percentage){
    if(percentage.slice(-1) === '%'){
        if(!Number(percentage.slice(0, percentage.length - 1))){
            return false;
        }
        else{
            return true;
        }
    }
    else{
        if(!Number(percentage)){
            return false;
        }
        else{
            return true;
        }
    }
}

function isValidBillAmount(amount){
    if(!Number(amount)){
        return false;
    }
    return true;
}

function isValidPeopleAmount(amount){
    if(!Number(amount)){
        return false;
    }
    else if(!Number.isInteger(Number(amount))){
        return false;
    }
    else if(Number(amount) <= 0){
        return false;
    }
    else{
        return true;
    }
}

function setActiveAppearance(button){
    button.classList.toggle('bg-veryDarkCyan');
    button.classList.toggle('bg-strongCyan');
    button.classList.toggle('text-veryLightGrayCyan');
    button.classList.toggle('text-veryDarkCyan');

    return button;
}

function setInactiveAppearance(button){
    if(button.classList.contains('bg-strongCyan')){
        button.classList.toggle('bg-strongCyan');
        button.classList.add('bg-veryDarkCyan');
    }
    if(button.classList.contains('text-veryDarkCyan')){
        button.classList.toggle('text-veryDarkCyan');
        button.classList.add('text-veryLightGrayCyan');
    }

    return button;
}