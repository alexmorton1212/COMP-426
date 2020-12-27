export default class Game {

    /* constructor(size):
        creates a board: size*size
        initialized with two random values
        gameState: 
        - score updates as tiles are combined
        - won changes to 'true' once 2048 tile achieved
        - over changes to 'true' once there are no valid moves remaining
    */
    constructor(size) {
        this.size = size;
        this.boardSize = (this.size) * (this.size);
        this.winCallbacks = [];
        this.loseCallbacks = [];
        this.moveCallbacks = [];

        this.gameState = {
            board: new Array(this.boardSize).fill(0),
            score: 0,
            won: false,
            over: false,
        }

        this.randomValue();
        this.randomValue();
    }


    /* setUpNewGame():
        Returns gameState to original values
    */
    setupNewGame() {

        this.gameState.board = new Array(this.size * this.size).fill(0);
        this.gameState.score = 0;
        this.gameState.won = false;
        this.gameState.over = false;
        this.randomValue();
        this.randomValue();
    }


    /* loadGame():
        Takes gameState object and loads board/scores
    */
    loadGame(gameState) {
        this.gameState = gameState
    }

    /* move(direction):
        takes keypress input and moves the tiles in that direction (combining when necessary)
        if board is different after input, adds another tile
        after every keypress, checks if there is a 2048 tile (changes gameState.won to TRUE)
    */
    move(direction) {

        let clone = [...this.gameState.board]; // used for checking if board is the same before and after move

        if (direction == "up") {

            var multiArray = new Array(this.size);
            for (let i = 0; i < this.size; i++) {
                multiArray[i] = new Array(this.size);
            }

            // puts each row into individual arrays
            let k = 0;
            for (let i = 0; i < this.size; i++) {
                for (let j = i; j < this.boardSize; j += this.size) {
                    multiArray[i][k] = this.gameState.board[j];
                    k++;
                }
                k = 0;
            }

            // combines all numbers appropriately in each row (first step)
            // ex) [2,2,2,8,8] -> [4,0,2,16,0] 
            for (let i = 0; i < this.size; i++) {
                for (let j = 0; j < this.size; j++) {
                    for (let k = j; k < this.size; k++) {
                        if (j === k) { continue; }
                        if (multiArray[i][j] !== multiArray[i][k] && multiArray[i][k] !== 0) { break; }
                        if (multiArray[i][j] !== 0 && multiArray[i][k] === 0) { continue; }
                        if (multiArray[i][j] === multiArray[i][k]) {
                            multiArray[i][j] *= 2;
                            this.gameState.score += multiArray[i][j];
                            multiArray[i][k] = 0;
                            break;
                        }
                    }
                }
            }

            // puts numbers into the correct places after movement
            // ex) [4,0,2,16,0] -> [4,2,16,0,0]
            let m = 0;
            for (let i = 0; i < this.size; i++) {
                let tempArray = new Array(this.size).fill(0); // fill values in correct order with trailing 0's
                for (let j = 0; j < this.size; j++) {
                    if (multiArray[i][j] !== 0) {
                        tempArray[m] = multiArray[i][j];
                        m++;
                    }
                }
                multiArray[i] = tempArray;
                m = 0;
            }

            // puts multidimensional array back into the flat array
            let n = 0;
            for (let i = 0; i < this.size; i++) {
                for (let j = 0; j < this.size; j++) {
                    this.gameState.board[n] = multiArray[j][i];
                    n++;
                }
            }

            this.checkWin();

            if (!this.checkSameArray(clone, this.gameState.board)) {
                this.randomValue();
            }

        }

        if (direction == "down") {

            var multiArray = new Array(this.size);
            for (let i = 0; i < this.size; i++) {
                multiArray[i] = new Array(this.size);
            }

            // puts each row into individual arrays
            let k = 0;
            for (let i = 0; i < this.size; i++) {
                for (let j = i; j < this.boardSize; j += this.size) {
                    multiArray[i][k] = this.gameState.board[j];
                    k++;
                }
                k = 0;
            }

            // combines all numbers appropriately in each row (first step)
            // ex) [2,2,2,8,8] -> [2,0,4,0,16] 
            for (let i = this.size - 1; i >= 0; i--) {
                for (let j = this.size - 1; j >= 0; j--) {
                    for (let k = j; k >= 0; k--) {
                        if (j === k) { continue; }
                        if (multiArray[i][j] !== multiArray[i][k] && multiArray[i][k] !== 0) { break; }
                        if (multiArray[i][j] !== 0 && multiArray[i][k] === 0) { continue; }
                        if (multiArray[i][j] === multiArray[i][k]) {
                            multiArray[i][j] *= 2;
                            this.gameState.score += multiArray[i][j];
                            multiArray[i][k] = 0;
                            break;
                        }
                    }
                }
            }

            // puts numbers into the correct places after movement
            // ex) [2,0,4,0,16] -> [0,0,2,4,16]
            let m = this.size - 1;
            for (let i = this.size - 1; i >= 0; i--) {
                let tempArray = new Array(this.size).fill(0); // fill values in correct order with trailing 0's
                for (let j = this.size - 1; j >= 0; j--) {
                    if (multiArray[i][j] !== 0) {
                        tempArray[m] = multiArray[i][j];
                        m--;
                    }
                }
                multiArray[i] = tempArray;
                m = this.size - 1;
            }

            // puts multidimensional array back into the flat array
            let n = 0;
            for (let i = 0; i < this.size; i++) {
                for (let j = 0; j < this.size; j++) {
                    this.gameState.board[n] = multiArray[j][i];
                    n++;
                }
            }

            this.checkWin();

            if (!this.checkSameArray(clone, this.gameState.board)) {
                this.randomValue();
            }
        }

        if (direction == "right") {

            var multiArray = new Array(this.size);
            for (let i = 0; i < this.size; i++) {
                multiArray[i] = new Array(this.size);
            }

            // puts each row into individual arrays
            let k = 0;
            for (let i = 0; i < this.size; i++) {
                for (let j = 0; j < this.size; j++) {
                    multiArray[i][j] = this.gameState.board[k];
                    k++;
                }
            }

            // combines all numbers appropriately in each row (first step)
            // ex) [2,2,2,8,8] -> [2,0,4,0,16] 
            for (let i = this.size - 1; i >= 0; i--) {
                for (let j = this.size - 1; j >= 0; j--) {
                    for (let k = j; k >= 0; k--) {
                        if (j === k) { continue; }
                        if (multiArray[i][j] !== multiArray[i][k] && multiArray[i][k] !== 0) { break; }
                        if (multiArray[i][j] !== 0 && multiArray[i][k] === 0) { continue; }
                        if (multiArray[i][j] === multiArray[i][k]) {
                            multiArray[i][j] *= 2;
                            this.gameState.score += multiArray[i][j];
                            multiArray[i][k] = 0;
                            break;
                        }
                    }
                }
            }

            // puts numbers into the correct places after movement
            // ex) [2,0,4,16,0] -> [0,0,2,4,16]
            let m = this.size - 1;
            for (let i = this.size - 1; i >= 0; i--) {
                let tempArray = new Array(this.size).fill(0); // fill values in correct order with trailing 0's
                for (let j = this.size - 1; j >= 0; j--) {
                    if (multiArray[i][j] !== 0) {
                        tempArray[m] = multiArray[i][j];
                        m--;
                    }
                }
                multiArray[i] = tempArray;
                m = this.size - 1;
            }

            // puts multidimensional array back into the flat array
            let n = 0;
            for (let i = 0; i < this.size; i++) {
                for (let j = 0; j < this.size; j++) {
                    this.gameState.board[n] = multiArray[i][j];
                    n++;
                }
            }

            this.checkWin();

            if (!this.checkSameArray(clone, this.gameState.board)) {
                this.randomValue();
            }
        }

        if (direction == "left") {

            var multiArray = new Array(this.size);
            for (let i = 0; i < this.size; i++) {
                multiArray[i] = new Array(this.size);
            }

            // puts each row into individual arrays
            let k = 0;
            for (let i = 0; i < this.size; i++) {
                for (let j = 0; j < this.size; j++) {
                    multiArray[i][j] = this.gameState.board[k];
                    k++;
                }
            }

            // combines all numbers appropriately in each row (first step)
            // ex) [2,2,2,8,8] -> [4,0,2,16,0] 
            for (let i = 0; i < this.size; i++) {
                for (let j = 0; j < this.size; j++) {
                    for (let k = j; k < this.size; k++) {
                        if (j === k) { continue; }
                        if (multiArray[i][j] !== multiArray[i][k] && multiArray[i][k] !== 0) { break; }
                        if (multiArray[i][j] !== 0 && multiArray[i][k] === 0) { continue; }
                        if (multiArray[i][j] === multiArray[i][k]) {
                            multiArray[i][j] *= 2;
                            this.gameState.score += multiArray[i][j];
                            multiArray[i][k] = 0;
                            break;
                        }
                    }
                }
            }

            // puts numbers into the correct places after movement
            // ex) [4,0,2,16,0] -> [4,2,16,0,0]
            let m = 0;
            for (let i = 0; i < this.size; i++) {
                let tempArray = new Array(this.size).fill(0); // fill values in correct order with trailing 0's
                for (let j = 0; j < this.size; j++) {
                    if (multiArray[i][j] !== 0) {
                        tempArray[m] = multiArray[i][j];
                        m++;
                    }
                }
                multiArray[i] = tempArray;
                m = 0;
            }

            // puts multidimensional array back into the flat array
            let n = 0;
            for (let i = 0; i < this.size; i++) {
                for (let j = 0; j < this.size; j++) {
                    this.gameState.board[n] = multiArray[i][j];
                    n++;
                }
            }

            this.checkWin();

            if (!this.checkSameArray(clone, this.gameState.board)) {
                this.randomValue();
            }
        }

        this.moveCallbacks.forEach(element => {
            element(this.getGameState());
        });

        // checks if there are no moves left (game is over)
        if (!this.checkAvailableMove() && this.checkFullBoard()) {
            this.gameState.over = true;
            this.loseCallbacks.forEach(element => {
                element(this.getGameState());
            });
        }

    }

    /* toString():
        transforms the flat array into a layered one to mirror the actual game in the console
    */
    toString() {

        let asciiBoard = '';
        for (let i = 0; i < this.gameState.board.length; i++) {
            if (i % this.size === 0) {
                asciiBoard += '\n'
            }
            asciiBoard += this.gameState.board[i] + ' '
        }
        asciiBoard += '\n' + 'Score: ' + this.gameState.score + '\n'
        asciiBoard += '\n' + 'Won: ' + this.gameState.won + ', Over: ' + this.gameState.over
        return asciiBoard;
    }

    /* onMove(callback):
        ...
    */
    onMove(callback) {
        this.moveCallbacks[this.moveCallbacks.length] = callback;
    }

    /* onWin(callback):
        ...
    */
    onWin(callback) {
        this.winCallbacks[this.winCallbacks.length] = callback;
    }

    /* onLose(callback):
        ...
    */
    onLose(callback) {
        this.loseCallbacks[this.loseCallbacks.length] = callback;
    }

    /* getGameState():
        ...
    */
    getGameState() {
        return this.gameState;
    }


    //######################  HELPER METHODS  ###########################

    /* randomeValue(): 
        creates a gamepiece of '4' with 90% chance, '2' with 10% chance
        assigns that piece to a random 
    */
    randomValue() {

        let pieceValue = 0;
        let randomValueLocation = 0;
        let randomValuePiece = (Math.random() * 100);

        // assigns piece values with correct chances
        if (randomValuePiece < 90) {
            pieceValue = 2;
        } else {
            pieceValue = 4;
        }

        // finds an empty space on the board to put piece with random value
        while (true) {
            randomValueLocation = Math.floor(Math.random() * this.boardSize);
            if (this.gameState.board[randomValueLocation] === 0) {
                this.gameState.board[randomValueLocation] = pieceValue;
                break;
            }
        }
    }

    /* checkWin():
        checks if a 2048 tile becomes present (for gameState.won)
        used after each keypress
    */
    checkWin() {
        for (let i = 0; i < this.boardSize; i++) {
            if (this.gameState.board[i] === 2048) {
                this.gameState.won = true;
                this.winCallbacks.forEach(element => {
                    element(this.getGameState());
                });
                break;
            }
        }
    }

    /* checkFullBoard():
        returns true is if the board is full, 
        false if there is a 0 present (not full)
        used after every keypress (for gameState.over)
    */
    checkFullBoard() {
        for (let i = 0; i < this.boardSize; i++) {
            if (this.gameState.board[i] === 0) {
                return false;
            }
        } return true;
    }

    /* checkAvailableMove():
        returns true is if there is a possible move to make, 
        false if there is no move
        used after every keypress (for gameState.over)
    */
    checkAvailableMove() {
        for (let i = 0; i < this.boardSize; i++) {
            if ((this.gameState.board[i] === this.gameState.board[i + 1] && (i + 1) % this.size !== 0) ||
                (this.gameState.board[i] === this.gameState.board[i - 1] && i % this.size !== 0) ||
                this.gameState.board[i] === this.gameState.board[i - this.size] ||
                this.gameState.board[i] === this.gameState.board[i + this.size]) {
                return true;
            }
        } return false;
    }

    /* checkSameArray():
        returns true is if the board is full, 
        false if there is a 0 present (not full)
        used after every keypress (for gameState.over)
    */
    checkSameArray(array1, array2) {
        for (let i = 0; i < this.boardSize; i++) {
            if (array1[i] !== array2[i]) {
                return false;
            }
        } return true;
    }

}