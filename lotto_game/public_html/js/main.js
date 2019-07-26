//SET GLOBAL VARIABLES
const allNumbers = [];
for (let i = 1; i <= 30; i++) {
    allNumbers.push(i);
}
let selectedNumbers = [];
let ticketNum = 0;
let tickets={};

//------------------------------

document.addEventListener("DOMContentLoaded", function () {
    availableNumbers();
    let addButtton = document.querySelector('#addTicket');
    addButtton.onclick = addTicket;
});


//Create template for preview and select available numbers
function availableNumbers() {
    const panelTemplate = document.querySelector('.number-wrapper');
    for (let i = 0; i < allNumbers.length; i++) {
        panelTemplate.innerHTML += '<div onclick="selectNumber(this,' + allNumbers[i] + ')" class="number-holder"><span class="number">' + allNumbers[i] + '</span></div>';
    }
}

// Function for create arr of selected num and adding active states for selected num
function selectNumber(el, num) {
    if (selectedNumbers.length == 5 && !el.classList.contains('active')) {//select maximum 5 numbers per ticket
        let err = 'Odabrali ste maksimalan broj brojeva na tiketu';
        trowError(err);
        return ;
    }

    if (el.classList.contains('active')) {
        let index = selectedNumbers.indexOf(num);
        if (index > -1) {
            selectedNumbers.splice(index, 1);
        }
        el.classList.toggle('active');
    } else {
        el.classList.toggle('active');
        selectedNumbers.push(num);
    }

}

function addTicket() {
   if(ticketNum<5){
       //adding ticket
       
   }else{
       //all ticket are fill and game can start
   }
}

function trowError(err) {
    console.log(err);
}