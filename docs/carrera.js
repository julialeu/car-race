let players = []; /* array número de coches */
let turn = 0;
let finalStandings = []; /* array para registrar el orden de llegada */

function prepareGame() {
    /* Determinamos el número de coches */
    var element = document.getElementById("numPlayersSelect");
    var numPlayers = element.value;
    console.log('numPlayers', numPlayers);

    var racingTrack = document.getElementById("racingTrack")
    // Eliminamos todo el html de la anterior carrera
    racingTrack.innerHTML = '';

    for (let i = 0; i < numPlayers; i++) {
        /* Bucle para asignar a cada coche su id y su imagen */
        var url = 'img/car' + (i + 1) + '.png';
        var player = {
            id: i + 1,
            carId: i + 1,
            carPhotoUrl: url
        };
        // Añadimos un elemento player al array players
        players.push(player);
    }
    console.log('players', players);

    /* Iteramos los elementos del array player para pintar los coches */
    for (let player of players) {
        let spanElement = document.createElement('span');
        spanElement.innerHTML = player.carId;

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

/* Función para comenzar el juego. Sino seleccionamos
número de coches,salta una alerta. Si se inicia el juego se oculta
el botón de inicio y se visualiza el de reiniciar. Lo hacemos con un if-else
 */
$(document).ready(function () {
    $(".start-game").click(function () {

        if (players.length === 0) {
            alert('Selecciona el número de jugadores');
        } else {
            $(".start-game").addClass('hidden');
            $(".restart-game").removeClass('hidden');
        }

        for (player of players) {
            playerTurn(player);
        }
    });

    /* función para reiniciar la carrera cuando pulsamos el botón */
    $(".restart-game").click(function () {

        $(".restart-game").addClass('hidden');
        $(".start-game").removeClass('hidden');

        for (player of players) {
            $(`#car${player.id}`).stop();
            $(`#car${player.id}`).animate({ marginLeft: "0px" }, 25);
        }
    });
});


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

    let duration = getRandomSpeed(1000, 4000); /* variable para asignar aleatoriamente
    la duración de cada coche */

    console.log('-----------');

    $(`#car${player.carId}`).animate(
        { marginLeft: "85%" },
        duration,
        null,
        function () {
            /*
            Cada vez que un coche termina su animación, lo añadimos a la
            lista de finalStandings y se registra por orden de llegada*/

            finalStandings.push(player.id)

            if (finalStandings.length === players.length) {

                let racingTrack = document.getElementById('racingTrack');
                racingTrack.innerHTML = '';

                let classification = document.getElementById('classification');

                let title = document.createElement('h2');
                title.innerHTML = 'Clasificación';
                classification.appendChild(title);

                let orderList = document.createElement('ol');
                for (let x = 0; x < players.length; x++) {
                    let li = document.createElement('li');
                    li.innerHTML = 'Posición ' + (x + 1) + ': Coche  ' + finalStandings[x];
                    orderList.appendChild(li);
                }
                classification.appendChild(orderList);

                setTimeout(() => {
                    window.location.reload();
                }, 3000);


            }
        }
    );

}
/* función que determina aleatoriamente la duración de animate
de cada coche
 */
function getRandomSpeed(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}