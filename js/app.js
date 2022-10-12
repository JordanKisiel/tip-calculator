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
customTip.addEventListener('blur', setCustomTipAmount);


//callback functions
function selectPresetTipAmount(e){
    e.preventDefault();
    
    //change appearance of buttons as needed
    tipOptions.forEach(button => setInactiveAppearance(button));
    setActiveAppearance(e.target);

    //reset custom tip input
    customTip.value = '';
    
    tipPercentage = e.target.innerHTML;
    console.log(tipPercentage);
}

function setCustomTipAmount(e){
    tipPercentage = e.target.value;

    //set appearance of all presets to inactive
    tipOptions.forEach(button => setInactiveAppearance(button));

    console.log(tipPercentage);
}




//helper functions
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