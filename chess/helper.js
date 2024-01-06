const letters = 'abcdefgh';


function squareNumberToBoard(squareNumber){
    var col = squareNumber%8;
    return [(squareNumber-col)/8, col];
}

function squareNumberSplit(squareNumber){
    var rows = 8 - ((squareNumber-(squareNumber%8))/8);
    var cols = squareNumber%8;

    return [rows, cols];
}

function squareNumberToCoord(squareNumber){
    var split = squareNumberSplit(squareNumber);
    return (letters[split[1]] + split[0]);
}

function splitToSquareNumber(split){
    return (8*split[0] + split[1] + 1);
}

var boardList = [];
var boardListIndex = -1;
function copyBoard(b){
    var copy = [];
    for (var i = 0; i < b.length; i++){
        let mini = [];
        for (var j = 0; j < b[i].length; j++){
            mini.push(b[i][j]);
        }
        copy.push(mini);
    }
    return copy;
}

function rewind(){
    if (boardListIndex > 0){
        boardListIndex--;
        boardList.pop();
        BOARD = copyBoard(boardList[boardListIndex]);
    }
}

// function replay(){
//     if (boardListIndex < boardList.length - 1){
//         boardListIndex++;
//         BOARD = copyBoard(boardList[boardListIndex]);
//     }
// }

function trackBoard(){
    boardList.push(copyBoard(BOARD));
    boardListIndex++;
}

function bigger2dArrayIncludesArray(big, small){
    for (let i = 0; i < big.length; i++){
        let allEqual = true;
        for (let j = 0; j < big[i].length; j++){
            if (big[i][j] != small[j]){
                allEqual = false;
            }
        }
        if (allEqual){
            return true;
        }
    }
    return false;
}


function displayCheck(checkInfo){
    let docEl = document.getElementById('check');
    docEl.innerHTML = `${checkInfo.substring(0,5).toUpperCase()} IS IN CHECK`;
    docEl.style.color = "red";
}

function displayCheckmate(checkInfo){
    let docEl = document.getElementById('check');
    docEl.innerHTML = `${checkInfo.substring(0,5).toUpperCase()} LOST. CHECKMATE! `;
    docEl.style.color = "blue";
}

function removeCheck(){
    let docEl = document.getElementById('check');
    docEl.innerHTML = `Nobody is in check`;
    docEl.style.color = "black";
}


