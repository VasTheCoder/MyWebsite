var RowSum, DiaSum, ColSum;
RowSum = [0, 0, 0]
ColSum = [0, 0, 0]
DiaSum = [0, 0]

// Whose chance is it now
var chance = 1; i = 0;
var game_over = false;
var winner = NaN;

// get all boxes
const cells = document.querySelectorAll(".cell");
const resultElement = document.getElementById("result");

reset()

// just a check
function check (value) {
    if (value == 3) {
        endGame(1);
    } else if (value == -3) {
        endGame(2);
    }
}

// do this function when a cell is clicked
function placeMarker (index) {
    let col = index % 3;
    let row = parseInt(index/3);
    let dia = null;
    if (col == row && col + row == 2) {
        dia = 3
    } else if (col == row) {
        dia = 0;
    } else if (col + row == 2) {
        dia = 1;
    }
    if (!game_over && cells[index].className == "cell") {
        cells[index].className = (chance == 1)?"cell cross":"cell circle";
        RowSum[row] += chance; ColSum[col] += chance;
        if (!isNaN(dia)) {
            if (dia < 3) {DiaSum[dia] += chance}
            else {DiaSum[0]+=chance;DiaSum[1]+=chance;}
        }
        
        i++;chance *= -1;
    }
    RowSum.forEach(check);
    ColSum.forEach(check);
    DiaSum.forEach(check);
    if ((i == 9) && (game_over==false)) {
        endGame(0);
    }
}

function endGame(winner) {
    if (winner == 0) {
        resultElement.innerText = "It's a Tie!";
    } else if (winner == 1) {
        resultElement.innerText = "Cross wins!";
    } else if (winner == 2) {
        resultElement.innerText = "Circle wins!";
    }
    game_over = true;
}

function emptied () {return 0}

function reset () {
    chance = 1; game_over = false; i = 0;
    cells.forEach((cell) => {
        cell.className = "cell"
    })
    resultElement.innerText = "";
    RowSum = [0, 0, 0]
    ColSum = [0, 0, 0]
    DiaSum = [0, 0]
}

// add event listener to all cells 
cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        placeMarker(index);
    });
});
