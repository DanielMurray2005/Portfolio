// var letters2 = 'ABCDEFGH';

for (var rows = 0; rows < 8; rows++){
    for (var cols = 0; cols < 8; cols++){
        
        const e = document.createElement('div');
        e.className = `tile  s${rows*8 + cols + 1}`;
        var identify = `${letters[cols]}${8-rows}`;
        e.id = `${identify}`;

        e.innerHTML = identify;
        e.style = `background-color: ${(cols-rows)%2==0? 'rgb(175,175,175)' : 'rgb(24,130,50);'};`;
        document.querySelector('.board').appendChild(e);

        const rect = e.getBoundingClientRect();
        const cover = document.createElement('div');
        cover.className = `cover cov${rows*8 + cols + 1}`;
        cover.style = `position: absolute; left: ${rect.left}px; top: ${rect.top}px; width: ${rect.right - rect.left}px; height: ${rect.right - rect.left}px; background-color: none;`;
        document.querySelector('.board').appendChild(cover);
    }
}

var shortHandPieces = {
    'r' : 'rook',
    'n' : 'knight',
    'b' : 'bishop',
    'q' : 'queen',
    'k' : 'king',
    'p' : 'pawn'
};
var BOARD = [
    ['br','bn','bb','bq','bk','bb','bn','br'],
    ['bp','bp','bp','bp','bp','bp','bp','bp'],
    ['-','-','-','-','-','-','-','-'],
    ['-','-','-','-','-','-','-','-'],
    ['-','-','-','-','-','-','-','-'],
    ['-','-','-','-','-','-','-','-'],
    ['wp','wp','wp','wp','wp','wp','wp','wp'],
    ['wr','wn','wb','wq','wk','wb','wn','wr']   
];

// var BOARD = [
//     ['br','-','bb','bq','bk','bb','-','br'],
//     ['bp','bp','bp','bp','-','bp','bp','bp'],
//     ['-','-','bn','-','-','bn','-','-'],
//     ['-','-','-','-','bp','-','-','wq'],
//     ['-','-','wb','-','wp','-','-','-'],
//     ['-','-','-','-','-','-','-','-'],
//     ['wp','wp','wp','wp','-','wp','wp','wp'],
//     ['wr','wn','wb','-','wk','-','wn','wr']   
// ];

// var BOARD = [
//     ['br', '-', 'bb', 'bq', '-', 'bb', '-', 'br'],
//     ['bp', 'bp', 'bp', 'bp', '-', 'bk', 'bp', 'bp'],
//     ['-', '-', 'bn', '-', '-', 'bn', '-', '-'],
//     ['-', '-', '-', '-', 'bp', '-', '-', '-'],
//     ['-', '-', 'wb', '-', 'wp', '-', '-', '-'],
//     ['-', '-', '-', '-', '-', '-', '-', '-'],
//     ['wp', 'wp', 'wp', 'wp', '-', 'wp', 'wp', 'wp'],
//     ['wr', 'wn', 'wb', '-', 'wk', '-', 'wn', 'wr']
// ];
var isWhite = true;


function scrubBoard(){
    for (var rows = 0; rows < 8; rows++){
        for (var cols = 0; cols < 8; cols++){
            const domSquare = document.querySelector(`.s${rows*8 + cols + 1}`);
            while (domSquare.childNodes[1]){
                domSquare.removeChild(domSquare.childNodes[1]);
            }
            const co =  document.querySelector(`.cov${rows*8 + cols + 1}`);
            co.style.backgroundColor = "rgba(255,255,255,0)";
        }
    }
}


function promotePawns(){
    for (let i = 0; i < BOARD[0].length; i++){
        if (BOARD[0][i] == 'wp'){
            BOARD[0][i] = 'wq';
        }
    }
    for (let i = 0; i < BOARD[7].length; i++){
        if (BOARD[7][i] == 'bp'){
            BOARD[7][i] = 'bq';
        }
    }
}

function updateBoardDOM(){
    scrubBoard();
    promotePawns();

    for (var rows = 0; rows < 8; rows++){
        for (var cols = 0; cols < 8; cols++){
            const piece = BOARD[rows][cols];
            const squareNumber = `${rows*8 + cols + 1}`;
            const domSquare = document.querySelector('.s' + squareNumber);
            if (piece != '-' && !domSquare.childNodes[1]){
                var picture_id = (piece[0] == 'w' ? 'white_' : 'black_');
                picture_id += shortHandPieces[piece[1]] + '.png';
                var img = new Image();
                img.src = `piece_photos/${picture_id}`;
                img.style=`width: 20px; height: 45px; position: absolute; left: ${domSquare.left}px; top: ${domSquare.top}px`;
                domSquare.appendChild(img);
            }
            else if (piece == '-'){
                while (domSquare.childNodes[1]){
                    domSquare.removeChild(domSquare.childNodes[1]);
                }
            }
            
        }
    }
}

updateBoardDOM();
trackBoard();

function lightUpSquares(moves){
    for (let i = 0; i < moves.length; i++){
        // console.log(moves[i]);
        let squareNumber = splitToSquareNumber(moves[i]);
        let cover = document.querySelector(`.cov${squareNumber}`);
        cover.style.backgroundColor = "rgba(135, 135, 235, 0.55)";
    }
}

function colorValid(){
    return (isWhite? (BOARD[selectedSquares[0][0]][selectedSquares[0][1]][0] == 'w'? true : false):
    (BOARD[selectedSquares[0][0]][selectedSquares[0][1]][0] == 'b' ? true : false));
}

var selectedSquares = [];
var allowedMoves = [];
var whiteInCheck = false;
var blackInCheck = false;
function squareClick(squareNumber){
    selectedSquares.push(squareNumberToBoard(squareNumber));
    if (selectedSquares.length == 1 && BOARD[squareNumberToBoard(squareNumber)[0]][squareNumberToBoard(squareNumber)[1]] == '-'){
        //First square selected is empty
        selectedSquares.shift(); //Remove selection
    }
    else if(selectedSquares.length == 1 && colorValid()){
        //Piece is selected, but location hasn't been
        allowedMoves = possibleMoves(BOARD[selectedSquares[0][0]][selectedSquares[0][1]], selectedSquares[0]);
        lightUpSquares(allowedMoves);
    }
    if (selectedSquares.length == 2 && bigger2dArrayIncludesArray(allowedMoves, selectedSquares[1]) && colorValid()){
        BOARD[selectedSquares[1][0]][selectedSquares[1][1]] = BOARD[selectedSquares[0][0]][selectedSquares[0][1]];
        BOARD[selectedSquares[0][0]][selectedSquares[0][1]] = '-';
        allowedMoves = [];
        selectedSquares = [];
        trackBoard();
        // removeCheck();

        if (check() == 'blackInCheck' && !isWhite){
            rewind();
            alert('Illegal move');
        }
        else if (check() == 'whiteInCheck' && isWhite){
            rewind();
            alert('Illegal move');
        }
        else{
            isWhite = !isWhite;
        }

        if (check()){
            displayCheck(check());
            if (checkmate(!isWhite)){
                displayCheckmate(check());
            }
        }
        else{
            removeCheck();
        }
    }
    else if (selectedSquares.length == 2 && colorValid()){
        selectedSquares = [[selectedSquares[1][0], selectedSquares[1][1]]];
        allowedMoves = possibleMoves(BOARD[selectedSquares[0][0]][selectedSquares[0][1]], selectedSquares[0]);
        lightUpSquares(allowedMoves);
    }
    else if (selectedSquares.length == 2){
        selectedSquares = [];
        allowedMoves = [];
    }
    updateBoardDOM();
    
}

for (var el = 0; el < 64; el++){
    const num = el;
    const element = document.querySelectorAll('.cover')[el];
    document.querySelectorAll('.cover')[el].addEventListener('click', () => {
        squareClick(num);
    });
    document.querySelectorAll('.cover')[el].addEventListener('mouseover', () => {
        element.style.backgroundColor = "rgba(135, 180, 150, 0.95)";
    });
    document.querySelectorAll('.cover')[el].addEventListener('mouseout', () => {
        element.style.backgroundColor = "rgba(235, 130, 150, 0)";
        lightUpSquares(allowedMoves);
    });
}

function back(){
    rewind();
    updateBoardDOM();
}

function forward(){
    replay();
    updateBoardDOM();
}

