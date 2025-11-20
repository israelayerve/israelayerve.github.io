var playerRed = 'R';
var playerYellow = 'Y';
var currentPlayer = playerRed;

var gameover = false;
var board;
var rows = 6;
var cols = 7;
var currColumns = [5, 5, 5, 5, 5, 5, 5];

window.onload = function() {
    setGame();
}
function setGame() {
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5];

    document.getElementById("board").innerHTML = "";

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < cols; c++) {
            row.push(' ');
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}
function checkWinner(){
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols - 3; c++) {
            if (board[r][c] != ' ' && board[r][c] == board[r][c + 1] && board[r][c] == board[r][c + 2] && board[r][c] == board[r][c + 3]) {
                setWinner(r, c);
                return;
            }       
        }
    }

    //Creo que se podria poner un if para mejorar la eficiencia if (not gameover) y hacemos la parte vertical
    for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' ' && board[r][c] == board[r + 1][c] && board[r][c] == board[r + 2][c] && board[r][c] == board[r + 3][c]) {
                setWinner(r, c);
                return;
            }
        }
    }
     //Creo que se podria poner un if para mejorar la eficiencia if (not gameover) y hacemos la parte la parte diagonal negativa
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < cols - 3; c++) {
            if (board[r][c] != ' ' && board[r][c] == board[r + 1][c + 1] && board[r][c] == board[r + 2][c + 2] && board[r][c] == board[r + 3][c + 3]) {
                setWinner(r, c);
                return;
            }
        }
    }
    //Creo que se podria poner un if para mejorar la eficiencia if (not gameover) y hacemos la parte la parte diagonal positiva
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < cols - 3; c++) {
            if (board[r][c] != ' ' && board[r][c] == board[r - 1][c + 1] && board[r][c] == board[r - 2][c + 2] && board[r][c] == board[r - 3][c + 3]) {
                setWinner(r, c);
                return;
            }
        }
    }

    let isTie = true;
    for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (board[r][c] == ' ') {
                    isTie = false;
                    break;
                }   
            }
        if (!isTie) break;
    }

    if (isTie) {
        let winner = document.getElementById("winner");
        winner.innerText = "¡Draw!";
        winner.className = "tie-message";
        gameover = true;
    }
}

function setWinner(r, c) {
    let winner = document.getElementById("winner");
    if (board[r][c] == playerRed) {
        winner.innerText = "Red Wins!";
        winner.className = "red-winner";
    } else {
        winner.innerText = "Yellow Wins!";
        winner.className = "yellow-winner";
    }
    gameover = true;
}



function setPiece() {
    if (gameover) {
        return;
    }

    let cords = this.id.split("-");
    let r = parseInt(cords[0]);
    let c = parseInt(cords[1]);

    r = currColumns[c];
    if (r < 0) {
        return;
    }

    board[r][c] = currentPlayer;
    let tile = document.getElementById(r.toString() + "-" + c.toString());

    if (currentPlayer == playerRed) {
        tile.classList.add("red-piece");
        currentPlayer = playerYellow;
    } 

    else {
        tile.classList.add("yellow-piece");
    currentPlayer = playerRed;
    }
    r -= 1;
    currColumns[c] = r;
    checkWinner();
}

function resetGame() {
    gameover = false;
    currentPlayer = playerRed;
    document.getElementById("winner").innerText = "";
    document.getElementById("winner").className = "";
    setGame();
}


document.body.addEventListener("click", () => {
  const audio = document.querySelector("audio");
  audio.muted = false;
});


