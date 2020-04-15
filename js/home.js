//black jack

let blackjackGame = {
    'you': { scoreSpan: '#player_score', div: '#player_container', score: 0 },
    'dealer': { scoreSpan: '#cpu_score', div: '#cpu_container', score: 0 },
    'cards': ["2", "3", "4", "5", "6", "7", "8", "9", "10", "K", "J", "Q", "A"],
    'cardmap': {
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
        '7': 7,
        '8': 8,
        '9': 9,
        '10': 10,
        'K': 10,
        'Q': 10,
        'J': 10,
        'A': [1, 11]

    },
    'wins': 0,
    'losses': 0,
    'drew': 0,
    'isStand': false,
    'trunOver': false,
    'cpuTurn': false,


};

const you = blackjackGame["you"];
const cpu = blackjackGame["dealer"];
const cardDeck = blackjackGame["cards"];
const hitSound = new Audio('/sounds/swish.m4a');
const winsound = new Audio('/sounds/cash.mp3')
const lostsound = new Audio('/sounds/aww.mp3')

document.querySelector("#btn_hit").addEventListener("click", blackjackhit);
document.querySelector("#btn_stand").addEventListener("click", blackjackStand);
document.querySelector("#btn_deal").addEventListener("click", blackjackdeal);

function blackjackhit() {

    if (blackjackGame['isStand'] === false) {
        // it will hold that stand button did not work until player done
        blackjackGame['cpuTurn'] = true;
        let card = randomCard();
        showFunction(card, you);
        updateScore(card, you);
        showscore(you);
    }



}

function showFunction(card, avtivepalyer) {

    if (avtivepalyer['score'] <= 21) {
        let cardimage = document.createElement("img");
        cardimage.src = `images/${card}.png `;
        document.querySelector(avtivepalyer["div"]).appendChild(cardimage);
        hitSound.play();
    } else {

    }

}

function blackjackdeal() {
    if (blackjackGame['trunOver'] === true) {
        blackjackGame['isStand'] = false;

        let yourImage = document
            .querySelector("#player_container")
            .querySelectorAll("img");
        let dealerimage = document
            .querySelector("#cpu_container")
            .querySelectorAll("img");
        console.log(yourImage);

        for (i = 0; i < yourImage.length; i++) {
            yourImage[i].remove();
        }

        for (i = 0; i < dealerimage.length; i++) {
            dealerimage[i].remove();
        }
        document.getElementById('player_score').textContent = '0';
        document.getElementById('player_score').style.color = 'black'
        document.getElementById('cpu_score').textContent = '0';
        document.getElementById('cpu_score').style.color = 'black'
        document.querySelector('#result').textContent = 'Lets Play';
        document.querySelector('#result').style.color = 'black';
        you['score'] = 0;
        cpu['score'] = 0;
        blackjackGame['trunOver'] = false;
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function blackjackStand() {
    if (blackjackGame['cpuTurn'] === true) {

        blackjackGame['isStand'] = true

        while (cpu['score'] < 16 && blackjackGame['isStand'] === true && blackjackGame['trunOver'] === false) {
            dealerShow()
            await sleep(1000)
        }
        blackjackGame['trunOver'] = true;
    }
}

function dealerShow() {
    let card = randomCard();
    showFunction(card, cpu)
    updateScore(card, cpu)
    showscore(cpu)
    if (cpu['score'] > 15) {
        let winner = winnerlogic();
        showresult(winner);
    }
}


function randomCard() {
    var randomCard = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomCard];
}

function updateScore(card, activePlayer) {
    if (activePlayer['score'] > 21) {

    } else {
        if (card === 'A') {
            if (activePlayer['score'] + blackjackGame['cardmap'][card][1] <= 21) {
                activePlayer['score'] += blackjackGame['cardmap'][card][1];
            } else {
                activePlayer['score'] += blackjackGame['cardmap'][card][0];
            }
        } else {
            activePlayer['score'] += blackjackGame['cardmap'][card];
        }
        console.log('scoreeee. you..' + you['score'])
        console.log('scoreeee...' + cpu['score'])

    }


}

function showscore(activePlayer) {
    if (activePlayer == you) {

        if (activePlayer['score'] > 21) {
            document.getElementById('player_score').textContent = 'BUST.!!';
            document.getElementById('player_score').style.color = 'red'
        } else {
            document.getElementById('player_score').textContent = activePlayer['score'];
        }

    } else {
        if (activePlayer['score'] > 21) {
            document.getElementById('cpu_score').textContent = 'BUST.!!';
            document.getElementById('cpu_score').style.color = 'red'
        } else {
            document.getElementById('cpu_score').textContent = activePlayer['score'];
        }
    }
}



function winnerlogic() {
    let winner;

    console.log('you::' + you['score'])
    console.log('cpu::' + cpu['score'])
        // non bust logic for player
    if (you['score'] <= 21) {


        if (you['score'] > cpu['score'] || cpu['score'] > 21) {
            console.log("player winner")
            blackjackGame['wins']++;
            winner = you;
        } else if (you['score'] < cpu['score']) {
            blackjackGame['losses']++;
            winner = cpu;
        } else if (you['score'] === cpu['score']) {
            blackjackGame['drew']++;
            console.log(':::&&&&drew')
        }

        // player bust and cpu not
    } else if (you['score'] > 21 && cpu['score'] <= 21) {
        console.log('you lost cpu win you bust')
        winner = cpu
        blackjackGame['losses']++;

    } else if (you['score'] > 21 && cpu['score'] > 21) {
        blackjackGame['drew']++;
        console.log('both bust')

    }

    return winner;
}

function showresult(winner) {
    let message, messagecolor;
    if (winner === you) {
        message = 'You Won'
        messagecolor = 'green'
        winsound.play();
    } else if (winner === cpu) {
        message = 'You lost'
        messagecolor = 'red'
        lostsound.play();

    } else {
        message = 'You drew'
        messagecolor = 'black'
        lostsound.play();
    }

    document.querySelector('#result').textContent = message;
    document.querySelector('#result').style.color = messagecolor;

    document.querySelector('#wins').textContent = blackjackGame['wins']
    document.querySelector('#losses').textContent = blackjackGame['losses']
    document.querySelector('#drew').textContent = blackjackGame['drew']




}