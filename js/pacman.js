'use strict'
const PACMAN = '😷';

var gPacman;
var gIsExtraSuperFood = false
var gCounter = 0
function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}
function movePacman(ev) {
    if (!gGame.isOn) return;
    // console.log('ev', ev);
    var nextLocation = getNextLocation(ev)

    if (!nextLocation) return;
    // console.log('nextLocation', nextLocation);

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('NEXT CELL', nextCell);

    if (nextCell === WALL) return;
    if (nextCell === FOOD) updateScore(1);
    if(nextCell === CHERRY) updateScore(10);
    if (nextCell === SUPERFOOD) {
        if (gPacman.isSuper) {
            gIsExtraSuperFood = true;
        } else {
            updateScore(4)
            togglePacmanPower()
            setTimeout(togglePacmanPower, 5000)
        }
    } else if (nextCell === GHOST) {
        if (!gPacman.isSuper) {
            renderCell(gPacman.location, EMPTY)
            endGame('Over');
            return;
        }
        removeGhost(nextLocation);
    }


    // update the model
    if (gIsExtraSuperFood && gCounter === 1) {
        gBoard[gPacman.location.i][gPacman.location.j] = SUPERFOOD;
        renderCell(gPacman.location, SUPERFOOD);
        gIsExtraSuperFood = false 
        gCounter = 0 
    } else {
        gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
        // update the dom
        renderCell(gPacman.location, EMPTY);
    }
 
    if (gIsExtraSuperFood) gCounter++
    gPacman.location = nextLocation;

    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;
    // update the dom
    renderCell(nextLocation, PACMAN);
    

}


function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            break;
        case 'ArrowDown':
            nextLocation.i++;
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            break;
        default:
            return null;
    }
    return nextLocation;
}

function togglePacmanPower() {
    gPacman.isSuper = gPacman.isSuper ? false : true;
    gIsExtraSuperFood = false ;
    gGhosts = gGhosts.concat(gHidenGhosts)
}


