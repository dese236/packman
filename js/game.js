'use strict'
const WALL = '#'
const FOOD = '.'
const SUPERFOOD = '*'
const EMPTY = ' ';
const CHERRY = '&'
var gCherryInterval;
var gCountFood = -1;


var gBoard;
var gGame = {
    score: 0,
    isOn: false
}
function init() {
    console.log('hello')
    gBoard = buildBoard()
    createPacman(gBoard);
    createGhosts(gBoard);
    printMat(gBoard, '.board-container')
    gGame.isOn = true
    gCherryInterval = setInterval(addCherry, 15000)
}

function restartGame() {
    gGame = {
        score: 0,
        isOn: false
    }
    gGhosts = []
    gHidenGhosts = []
    gIsExtraSuperFood = false
    gCounter = 0
    gCountFood = -1
    var elMsg = document.querySelector('.msg')
    elMsg.style.display = 'none'
    init()
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD;
            gCountFood++
            // if (i === 1 && (j === 1 || j === SIZE - 2) ||
            //     i === SIZE - 2 && (j === 1 || j === SIZE - 2)) {
            //         board[i][j] = SUPERFOOD;
            //     }   
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL;
                gCountFood--

                // elCell = document.querySelector('.`cell-${i}-${j}`')
                // elCell.classList.add('wall')
            }
        }
    }
    setSuperFood(board, SIZE)
    return board;
}

function setSuperFood(board, size) {
    board[1][1] = SUPERFOOD
    board[1][size - 2] = SUPERFOOD
    board[size - 2][1] = SUPERFOOD
    board[size - 2][size - 2] = SUPERFOOD
    gCountFood += 12
    console.log(gCountFood);
}

function updateScore(diff) {
    gGame.score += diff;
    document.querySelector('h2 span').innerText = gGame.score
    if (gGame.score === 72) console.log('imHere');
    if (gCountFood === gGame.score) {
        endGame('Done')
    }
}

function addCherry() {
    var emptyCells = getEmptyCells()
    var idx = getRandomInt(1, emptyCells.length)
    var location = emptyCells[idx - 1]
    if (emptyCells.length > 0) {
        console.log('i want to add cherry');
        console.log(location);
        gBoard[location.i][location.j] = CHERRY
        renderCell(location, CHERRY)
        gCountFood+=10
    }
}


function getEmptyCells() {
    console.log('immm herererererrerer');
    var cellsInRow = gBoard.length - 1
    var cellsInCol = cellsInRow
    var res = []
    var location
    for (var i = 1; i <= cellsInRow; i++) {
        for (var j = 1; j <= cellsInCol; j++) {
            location = {
                i,
                j
            }
            console.log(location)
             console.log(gBoard[i][j]);
            if (gBoard[i][j] === EMPTY) {
                res.push(location)
            }
        }
    }
    console.log(res);
    return res
}


function endGame(str) {
    gGame.isOn = false;
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval)
    var elMsg = document.querySelector('.msg')
    var elSpan = elMsg.querySelector('.span')
    console.log(elMsg);
    elSpan.innerHTML = 'Game' + str
    elMsg.style.display = 'block'
}

