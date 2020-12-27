import Game from "./game.js";

let game = new Game(4);

/* method for notifying oberserver without using alert() with documentation found here; used replaceWith()
    https://www.w3schools.com/jquery/html_replacewith.asp
*/

$(".reset").on("click", reset);
loadGame(); // load game first time
game.onMove(loadGame); // update game with each move


/* Keycodes were found at the following source
    https://stackoverflow.com/questions/5597060/detecting-arrow-key-presses-in-javascript
*/

$(document).keydown(function(event) {
    let key = event.keyCode;
    if (key == '37') {
        game.move("left");
    }
    if (key == '38') {
        game.move("up");
    }
    if (key == '39') {
        game.move("right");
    }
    if (key == '40') {
        game.move("down");
    } 
}
);

/* changes the current message on the screen to a win or lose message using replaceWith()
*/

game.onWin(function(){
    $(".notification").replaceWith(`<p class = "notification has-text-centered has-text-weight-bold" style = "color:green; font-size: 200%">
        CONGRATULATIONS YOU WON! Keep Going :)</p>`);
});

game.onLose(function (){
    $(".notification").replaceWith(`<p class = "notification has-text-centered has-text-weight-bold" style = "color:red; font-size: 200%">
        -OOP... this is awkward.. YOU LOST! Hit 'Reset' to play again!</p>`);
})

/* functions to reset the board/set up a new game and load in a the new game (also used at the start)
*/

function reset() {
    $(".notification").replaceWith(`<p class = "notification has-text-centered has-text-weight-bold" style = "color:black; font-size: 100%">
    You're doing great! :)</p>`);
    game.setupNewGame();
    loadGame();
}

function loadGame() {
    $(".score").replaceWith(`<p class = "score">Score: ${game.gameState.score}</p>`);
    for (let i = 1; i < game.boardSize + 1; i++) {
        if (game.gameState.board[i-1] !== 0) {
            $(`.${i}`).replaceWith(`<p class = "title has-text-centered ${i}" style="color:white;">${game.gameState.board[i-1]}<br></p>`);
        } else {
            $(`.${i}`).replaceWith(`<p class = "title has-text-centered ${i}" style="color:white;"><br></p>`);
        }
    }
}
