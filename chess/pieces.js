var bcopy = [];

function possibleMoves(piece, location, board=BOARD){
    /*
    piece[0] --> w/b --> white/black
    piece[1] --> p,r,n,b,k,q --> pawn, rook, knight, bishop, king, queen

    */
    bcopy = copyBoard(board);
    switch(piece[1]) {
        case 'p':
            return pawnMoves(piece[0], location);
        case 'r':
            return rookMoves(piece[0], location);
        case 'b':
            return bishopMoves(piece[0], location);
        case 'q':
            return queenMoves(piece[0], location);
        case 'n':
            return knightMoves(piece[0], location);
        case 'k':
            return kingMoves(piece[0], location);
        default:
            // alert('Error: not a recognized piece');
            return [];
      }
}

function recursiveDirection(pos, xdir, ydir, list){
    let newpos = [pos[0] - ydir, pos[1] + xdir];

    if (newpos[0] > 7 || newpos[0] < 0 || newpos[1] < 0 || newpos[1] > 7) return list;

    list.push(newpos);
    if (bcopy[newpos[0]][newpos[1]] != '-'){
        return list;
    }
    
    return recursiveDirection(newpos, xdir, ydir, list);
}

function rookMoves(color, location){
    var possibleLocations = [];
    possibleLocations = recursiveDirection(location, 1, 0, possibleLocations);
    possibleLocations = recursiveDirection(location, -1, 0, possibleLocations);
    possibleLocations = recursiveDirection(location, 0, 1, possibleLocations);
    possibleLocations = recursiveDirection(location, 0, -1, possibleLocations);

    var editedLocations = [];
    for (let i = 0; i < possibleLocations.length; i++){
        const pieceAtPossibleLocation = bcopy[possibleLocations[i][0]][possibleLocations[i][1]]
        if (pieceAtPossibleLocation == '-' || pieceAtPossibleLocation[0] != color){
            editedLocations.push(possibleLocations[i]);
        }
    }
    return editedLocations;
}

function bishopMoves(color, location){
    var possibleLocations = [];
    possibleLocations = recursiveDirection(location, 1, 1, possibleLocations);
    possibleLocations = recursiveDirection(location, -1, -1, possibleLocations);
    possibleLocations = recursiveDirection(location, -1, 1, possibleLocations);
    possibleLocations = recursiveDirection(location, 1, -1, possibleLocations);

    var editedLocations = [];
    for (let i = 0; i < possibleLocations.length; i++){
        const pieceAtPossibleLocation = bcopy[possibleLocations[i][0]][possibleLocations[i][1]]
        if (pieceAtPossibleLocation == '-' || pieceAtPossibleLocation[0] != color){
            editedLocations.push(possibleLocations[i]);
        }
    }
    return editedLocations;
}

function queenMoves(color, location){
    var possibleLocations = [];
    possibleLocations = recursiveDirection(location, 1, 1, possibleLocations);
    possibleLocations = recursiveDirection(location, -1, -1, possibleLocations);
    possibleLocations = recursiveDirection(location, -1, 1, possibleLocations);
    possibleLocations = recursiveDirection(location, 1, -1, possibleLocations);
    possibleLocations = recursiveDirection(location, 1, 0, possibleLocations);
    possibleLocations = recursiveDirection(location, -1, 0, possibleLocations);
    possibleLocations = recursiveDirection(location, 0, 1, possibleLocations);
    possibleLocations = recursiveDirection(location, 0, -1, possibleLocations);

    var editedLocations = [];
    for (let i = 0; i < possibleLocations.length; i++){
        const pieceAtPossibleLocation = bcopy[possibleLocations[i][0]][possibleLocations[i][1]]
        if (pieceAtPossibleLocation == '-' || pieceAtPossibleLocation[0] != color){
            editedLocations.push(possibleLocations[i]);
        }
    }
    return editedLocations;
}

function knightMoves(color, location){
    let addedValues = [
        [2,1],
        [1,2],
        [-1,2],
        [-2,1],
        [2,-1],
        [1,-2],
        [-1,-2],
        [-2,-1],
    ];
    var possibleLocations = [];
    for (let i = 0; i < addedValues.length; i++){
        possibleLocations.push([location[0]+addedValues[i][0], location[1]+addedValues[i][1]]);
    }
    // console.log(possibleLocations);
    var editedLocations = [];
    for (let i = 0; i < possibleLocations.length; i++){
        if (possibleLocations[i][0] >= 0 && possibleLocations[i][0] <= 7){
            if (possibleLocations[i][1] >= 0 && possibleLocations[i][1] <= 7){
                const pieceAtPossibleLocation = bcopy[possibleLocations[i][0]][possibleLocations[i][1]];
                if (pieceAtPossibleLocation == '-' || pieceAtPossibleLocation[0] != color){
                    editedLocations.push(possibleLocations[i]);
                }
            }
        }
    }
    return editedLocations;
}

function kingMoves(color, location){
    let addedValues = [
        [0,1],
        [0,-1],
        [1,1],
        [1,-1],
        [-1,1],
        [-1,-1],
        [1,0],
        [-1,0],
    ];
    var possibleLocations = [];
    for (let i = 0; i < addedValues.length; i++){
        possibleLocations.push([location[0]+addedValues[i][0], location[1]+addedValues[i][1]]);
    }
    var editedLocations = [];
    for (let i = 0; i < possibleLocations.length; i++){
        if (possibleLocations[i][0] >= 0 && possibleLocations[i][0] <= 7){
            if (possibleLocations[i][0] >= 0 && possibleLocations[i][1] <= 7){
                const pieceAtPossibleLocation = bcopy[possibleLocations[i][0]][possibleLocations[i][1]];
                if (pieceAtPossibleLocation == '-' || pieceAtPossibleLocation[0] != color){
                    editedLocations.push(possibleLocations[i]);
                }
            }
        }
    }
    return editedLocations;
}

function pawnMoves(color, location){
    var passiveLocations = [];
    var possibleLocations = [];
    if (color == 'w'){
        
        let newLocY = location[0] - 1;
        let newLocX = location[1] - 1;

        if (newLocY >= 0){
            passiveLocations.push([location[0]-1, location[1]]);
        }

        if (newLocX >= 0 && newLocX <= 7 && newLocY >= 0 && newLocY <=7){
            if (bcopy[location[0]-1][location[1]-1][0] == 'b'){
                possibleLocations.push([location[0]-1, location[1]-1]);
            }
        }
        newLocX = location[1] + 1;
        if (newLocX >= 0 && newLocX <= 7 && newLocY >= 0 && newLocY <=7){
            if (bcopy[location[0]-1][location[1]+1][0] == 'b'){
                possibleLocations.push([location[0]-1, location[1]+1]);
            }
        }
        if (location[0] == 6){
            passiveLocations.push([location[0]-2, location[1]]);
        }
    }
    else if (color == 'b'){
        let newLocY = location[0] + 1;
        let newLocX = location[1] - 1;

        if (newLocY <= 7){
            passiveLocations.push([location[0]+1, location[1]]);
        }
        
        if (newLocX >= 0 && newLocX <= 7 && newLocY >= 0 && newLocY <=7){
            if (bcopy[location[0]+1][location[1]-1][0] == 'w'){
                possibleLocations.push([location[0]+1, location[1]-1]);
            }
        }
        newLocX = location[1] + 1;
        if (newLocX >= 0 && newLocX <= 7 && newLocY >= 0 && newLocY <=7){
            if (bcopy[location[0]+1][location[1]+1][0] == 'w'){
                possibleLocations.push([location[0]+1, location[1]+1]);
            }
        }
        
        if (location[0] == 1){
            passiveLocations.push([location[0]+2, location[1]]);
        }
    }
    else{
        alert('Error: not a recognized piece color');
    }


    for (let i = 0; i < passiveLocations.length; i++){
        if (bcopy[passiveLocations[i][0]][passiveLocations[i][1]] == '-'){
            possibleLocations.push(passiveLocations[i]);
        }
    }

    return possibleLocations;
}