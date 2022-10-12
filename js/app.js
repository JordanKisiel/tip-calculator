//grab elements
const billAmount = document.getElementById('billAmount');
const tipOptions = document.querySelectorAll('fieldset > button');
const customTip = document.getElementById('customTip');
const numOfPeople = document.getElementById('numOfPeople');
const tipAmount = document.getElementById('tipAmount');
const totalPerPerson = document.getElementById('totalPerPerson');
const reset = document.getElementById('reset');

//declare variables
let tipPercentage = '15%';


//event listeners
tipOptions.forEach(button => button.addEventListener('click', selectPresetTipAmount));
customTip.addEventListener('blur', (e) => {
    setCustomTipAmount(e);
    calculateTotals();
});
billAmount.addEventListener('blur', calculateTotals);
numOfPeople.addEventListener('blur', calculateTotals);



//callback functions
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

        displayTotals(totalPerPerson, tipPerPerson);
    }
    else{
        console.log('something went wrong');
    }
}




//helper functions
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