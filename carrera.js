const FINISHING_LINE = 500;
let players = [];
let turn = 0;

function prepareGame() {
    var element = document.getElementById("numPlayersSelect");
    var numPlayers = element.value;
    console.log('numPlayers', numPlayers);

    var racingTrack = document.getElementById("racingTrack")
    // Eliminamos todo el html de la anterior carrera
    racingTrack.innerHTML = '';

    for (let i = 0; i < numPlayers; i++) {
        var url = 'img/car' + (i + 1) + '.png';
        var player = {
            carId: i + 1,
            carPhotoUrl: url,
            x: 0
        };
        // Añadimos un elemento player al array players
        players.push(player);
    }
    console.log('players', players);

    /* Iteramos los elementos del array player para pintar los coches */
    for (let player of players) {
        let spanElement = document.createElement('span');
        spanElement.innerHTML = 'Coche ' + player.carId;

        let imgElement = document.createElement('img');
        imgElement.src = player.carPhotoUrl;

        let playerDiv = document.createElement("div");
        playerDiv.id = 'car' + player.carId;
        playerDiv.className = 'car';

        // Añadimos el span con el nombre y la imagen
        playerDiv.appendChild(spanElement);
        playerDiv.appendChild(imgElement);

        // Añadimos el player
        racingTrack.appendChild(playerDiv);
    }
}

function startGame() {

    let isRaceOnGoing = true;

    while (isRaceOnGoing) {
        turno();

        isRaceOnGoing = calculateIsRaceOnGoing();
    }

}


function turno() {
    console.log(' ---- turn ' + turn + ' ----');

    for (player of players) {
        playerTurn(player);
    }


    turn = turn + 1;
}

test();

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

async function test() {
    console.log('start timer');
    await delay(1000);
    console.log('after 1 second');
}

function playerTurn(player) {
    console.log('player', player.carId, player.x);
    let random = getRandomSpeed(1, 100);
    console.log('random', random);

    let item = document.getElementById('car' + player.carId);

    anim = item.animate([
        // keyframes

        {transform: `translate(${player.x}px, 0px)`},
        {transform: `translate(${player.x + random}px, 0px)`}
    ], {
        duration: 1000,
        iterations: 1,
        fill: 'forwards'
    });
    let newX = player.x + random;
    player.x = newX;

}

function calculateIsRaceOnGoing() {

    for (player of players) {
        if (player.x >= FINISHING_LINE) {

            return false;
        }
    }

    return true;
}

function getRandomSpeed(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}