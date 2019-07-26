//SET GLOBAL VARIABLES
const allNumbers = [];
for (let i = 1; i <= 30; i++) {
    allNumbers.push(i);
}
let selectedNumbers = [];
let ticketNum = 1;
let tickets = {};

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
        return;
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
    if (ticketNum <= 5 && selectedNumbers.length > 0) {
        //adding ticket
        tickets['ticket_' + ticketNum] = [...selectedNumbers];
        selectedNumbers.length = 0;
        let numbers = document.querySelectorAll('.number-holder');
        numbers.forEach(num => {
            num.classList.remove('active');
        })
        addCompletedTicket(ticketNum);//put ticket on panel for preview played ticket
        checkForStart()//check if all tickeat are fill and game can start;
        ticketNum++;

    } else {
        if (selectedNumbers == 0) {
            err = 'Minimalan broj odabranih brojeva je 1;';
            trowError(err);
            return;
        }
    }
}
function addCompletedTicket(ticket) {//adding comleted ticket
    if (tickets.hasOwnProperty('ticket_' + ticket)) {//check if ticket is added
        let played = document.querySelector('.selected-num-wrapper');
        let ticketTemplate = '<div ticket-id=ticket_'+ticket+' class="playedTicket"></div>';
        let playedNum = tickets['ticket_' + ticket];
        played.innerHTML += ticketTemplate;
        let ticketWrapper = document.querySelector('[ticket-id=ticket_'+ticket+']');
        console.log(ticketWrapper)
        
        playedNum.forEach(num => {
            console.log('fisrt')
            ticketWrapper.innerHtml += '<p>'+num+'</p>';
            console.log(ticketWrapper)
        });
        console.log('second')
        
        
        
        
        
        
    }
}

function checkForStart() {
    if (ticketNum == 5) {
        //all ticket are fill and game can start
        console.log('start game');
    }
}


function trowError(err) {
    console.log(err);
}