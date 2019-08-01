//SET GLOBAL VARIABLES
const allNumbers = [];
for (let i = 1; i <= 30; i++) {
    allNumbers.push(i);
}
let selectedNumbers = [];
let ticketNum = 1;
let tickets = {};
const numToDrow = 12;
let balance = 1000;
//------------------------------

document.addEventListener("DOMContentLoaded", function () {
    availableNumbers();
    let addButtton = document.querySelector('#addTicket');
    addButtton.onclick = addTicket;
    document.querySelector('#balance').innerHTML += balance;
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
        let ticketTemplate = '<div ticket-id=ticket_' + ticket + ' class="playedTicket"></div>';
        let playedNum = tickets['ticket_' + ticket];
        played.innerHTML += ticketTemplate;
        let ticketWrapper = document.querySelector('[ticket-id=ticket_' + ticket + ']');

        playedNum.forEach(num => {
            ticketWrapper.innerHTML += '<span class="ball">' + num + '</span>';

        });
    }
}

function checkForStart() {
    if (ticketNum == 5) {
        //all ticket are fill and game can start
        let addButtton = document.querySelector('#addTicket');
        addButtton.onclick = startGame;
        addButtton.textContent = "ZAPOCNI IGRU";
        addButtton.classList.add('play');
    }
}
function loop(callback, interval) {
    counter = setTimeout(callback, interval);
}

function startGame() {
    //Game start
    let addButtton = document.querySelector('#addTicket');
    addButtton.textContent = "IZVLACENJE U TOKU...";
    addButtton.disabled = true;
    let resultNum = [...allNumbers];
    let winNum = [];
    for (let i = 0; i < numToDrow; i++) {//set 12 random numbers from 1-30
        let randPosition = Math.floor(Math.random() * resultNum.length);
        let rand = resultNum[randPosition];
        winNum.push(rand);
        resultNum.splice(randPosition, 1);
    }

    let roundNum = 0;
    (function loopGame() {//looping game until last number

        if (roundNum >= winNum.length) {//check round
            //Check for win ticket and restart round
            checkTickets(winNum);
            return;
        } else {
            loop(loopGame, 500);
            document.querySelector('.draw-wrapper').innerHTML += '<span class="winNum">' + winNum[roundNum] + '</span>';
            let numbers = document.querySelectorAll('.ball');
            numbers.forEach(num => {
                if (num.innerText == winNum[roundNum]) {
                    num.classList.add('active')
                }
            })
            roundNum++;
        }

    })();
}

function checkTickets(winArr) {
    let ticketArr = Object.entries(tickets)
    ticketArr.forEach(ticket => {
        let win = arrayContainsArray(winArr, ticket[1]);
        let winTicket = document.querySelector('[ticket-id="' + ticket[0] + '"]');
        if (win == true) {//check for win tickets
            winTicket.classList.add('win');
        } else {
            winTicket.classList.add('lost');
        }

    })
    calculateWin();

    setTimeout(function () { restartGame(); }, 3000);//wait 3sec before set game to new round

}

function arrayContainsArray(superset, subset) {
    if (0 === subset.length) {
        return false;
    }
    return subset.every(function (value) {
        return (superset.indexOf(value) >= 0);
    });
}

function calculateWin() {

}

function restartGame() {
    //set game to start stage
    let addButtton = document.querySelector('#addTicket');
    addButtton.textContent = "DODAJ TIKET";
    addButtton.disabled = false;
    addButtton.onclick = addTicket;

    ticketNum = 1;
    tickets = {};

    document.querySelector('.draw-wrapper').innerHTML = '';
    document.querySelector('.selected-num-wrapper').innerHTML = '<h3>Tiketi:</h3>';


}
function trowError(err) {
    console.log(err);
}