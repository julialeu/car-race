const FINISHING_LINE = 500;
let players = [];
let turn = 0;
let finalStandings = [];

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

    let duration = getRandomSpeed(1000, 4000);

    console.log('-----------');

    $(`#car${player.carId}`).animate(

        { marginLeft: "85%" }
        ,
        duration,
        null,
        function () {
            console.log('Terminó uno de ellos :)');

            finalStandings.push(player.id)

            if (finalStandings.length === players.length) {

                let racingTrack = document.getElementById('racingTrack');
                racingTrack.innerHTML = '';


                let orderList = document.createElement('ol');
                for (let x = 0; x < players.length; x++) {
                    let li = document.createElement('li');
                    li.innerHTML = 'Coche  ' + finalStandings[x];
                    orderList.appendChild(li);
                }

                let clasification = document.getElementById('clasification');
                clasification.appendChild(orderList);

                setTimeout(() => {
                    window.location.reload();
                }, 2000);


            }

            // player.x = player.x + random;
            // console.log('carid: ' + carId, player.x);
            // //Al completarse
            // positionsArray.push(this.name); //Conforme vayan llegando los coches los añadimos a un array
            // console.log(positionsArray);
            //
            // if (positionsArray.length == playersArray.length) {
            //     //Esta condicion se ejecuta cuando hayan llegado todos a meta
            //     reiniciar.style.display = "none";
            //     iniciar.style.display = "initial";
            //     //Pasamos las posiciones al array final donde los mostraremos
            //     finalResults = positionsArray;
            //     //Y limpiamos el array para la siguiente partida
            //     positionsArray = [];
            //     //Ocultamos los coches y la pista para mostrar los resultados
            //     let coches = document.querySelectorAll(".road");
            //     let dorsales = document.querySelectorAll(".dorsal");
            //     coches.forEach((coche) => {
            //         coche.style.display = "none";
            //     });
            //     //Ocultamos tambien los numeros dorsales
            //     dorsales.forEach((drsl) => {
            //         drsl.style.display = "none";
            //     });
            //     //Aqui construimos la lista de posiciones
            //
            //     for (let x = 0; x < finalResults.length; x++) {
            //         let pos = document.createElement("div");
            //         pos.classList.add("posiciones");
            //         pos.innerHTML = `<p><u>Posicion ${x + 1} :</u> Coche ${
            //             finalResults[x]
            //         }</p></br>`;
            //         tablePositions.appendChild(pos);
            //     }
            //     iniciar.style.display = "none"; //Ocultamos el boton en los resultados
            //     containerOne.appendChild(tablePositions); //Los mostramos por pantalla
            //
            //     //Esta funcion mostrar los resultados 3 segundos y luego volvera a la pantalla de juego
            //     // mostrando de nuevo los coches y los botones
            //     setTimeout(() => {
            //         window.location.reload();
            //     }, 3000);
            // }
        }
    );

}

function getRandomSpeed(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}