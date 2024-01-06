function check(board=BOARD){
    let b = copyBoard(board);
    for (let row = 0; row < b.length; row++){
        for (let col = 0; col < b[row].length; col++){
            let moves = possibleMoves(b[row][col], [row, col], b);
            // console.log(moves);
            for (let i = 0; i < moves.length; i++){
                if (b[moves[i][0]][moves[i][1]] == 'wk'){
                    return 'whiteInCheck';
                }
                if (b[moves[i][0]][moves[i][1]] == 'bk'){
                    return 'blackInCheck';
                }
            }
        }
    }
    return false;
}

function checkmate(blackDefending){ //if true: only check black moves and king in check
    if (!check()) return false;
    var parentBoard = copyBoard(BOARD);
    for (let row = 0; row < parentBoard.length; row++){
        for (let col = 0; col < parentBoard[0].length; col++){

            if (parentBoard[row][col] != '-'){
                if ((parentBoard[row][col][0] == 'b' && blackDefending) || (parentBoard[row][col][0] == 'w' && !blackDefending)){
                    let moves = possibleMoves(parentBoard[row][col], [row,col], parentBoard);
            
                    for (let i = 0; i < moves.length; i++){
                        
                        let board = copyBoard(parentBoard);
                        
                        board[moves[i][0]][moves[i][1]] = board[row][col];
                        board[row][col] = '-';

                        if (!check(board)){
                            return false;
                        }
                    }
                }
            }
        }
    }
    return true;
}