

//*****difficulty settings**********
var difDiv = document.getElementById('difficulty');
var sudokuDiv = document.getElementById('table_div');
let difValue = 0;
let beginMax = document.getElementById('beginner');
    beginMax.addEventListener('click',beginnerFuncValue);

function beginnerFuncValue(){
    difValue = Math.floor(81 * 0.75);
    // console.log(difValue);
    difDiv.style.display = 'none';
    sudokuDiv.style.display = 'block';
    randomCellsReveal(matCopy, difValue)

}

let interMax = document.getElementById('intermediate');
    interMax.addEventListener('click',interFuncValue);
    
function interFuncValue(){
    difValue = Math.floor(81 * 0.5);
    console.log(difValue);
    difDiv.style.display = 'none';
    sudokuDiv.style.display = 'block';
    randomCellsReveal(matCopy, difValue)

}
let expertMax = document.getElementById('expert');
    expertMax.addEventListener('click',expertFuncValue);
    
function expertFuncValue(){
    difValue = Math.floor(81 * 0.25);
    console.log(difValue);
    difDiv.style.display = 'none';
    sudokuDiv.style.display = 'block';
    randomCellsReveal(matCopy, difValue)

}
 //               
//******************** board setup *************************//
const ORIGINAL_MAT =
    [
        [5, 2, 6, 8, 9, 1, 4, 7, 3],    //row1
        [7, 8, 1, 3, 4, 5, 9, 2, 6],    //row2
        [4, 3, 9, 7, 2, 6, 8, 5, 1],    //row3
        [3, 1, 2, 4, 7, 9, 6, 8, 5],    //row4
        [6, 7, 4, 5, 3, 8, 2, 1, 9],    //row5
        [9, 5, 8, 1, 6, 2, 7, 3, 4],    //row6
        [8, 6, 3, 2, 5, 4, 1, 9, 7],    //row7
        [1, 9, 5, 6, 8, 7, 3, 4, 2],    //row8
        [2, 4, 7, 9, 1, 3, 5, 6, 8]     //row9
    ];
// [
//     [5, 2, 6, 8, 9, 1, 4, 7, 3],    //row1
//     [7, 8, 1 ,3 ,4 ,5 ,9 ,2 ,6],    //row2
//     [4, 3, 9, 7, 2, 6, 8, 5, 1],    //row3
//     [3, 1, 2, 4, 7, 9, 6, 8, 5],    //row4
//     [6, 7, 4, 5, 3, 8, 2, 1, 9],    //row5
//     [9, 5, 8, 1, 6, 2, 7, 3, 4],    //row6
//     [8, 6, 3, 2, 5, 4, 1, 9, 7],    //row7
//     [1, 9, 5, 6, 8, 7, 3, 4, 2],    //row8
//     [2, 4, 7, 9, 1, 3, 5, 6, 8]     //row9
//     ] ;
// console.log('original matrix',ORIGINAL_MAT)
//

////////
// board copy
let matCopy = ORIGINAL_MAT.map(function (arr) {
    return arr.slice();

})
let flag = 1;
let difficulty = 0;



//create text input inside cells
let boardCell = document.getElementsByTagName('td');
let addInputBoxToCells = addInputBoxFunc();
function addInputBoxFunc() {
    for (let i = 0; i < boardCell.length; i++) {
        let cellInput = document.createElement('input');
        cellInput.setAttribute('type', 'text')
        cellInput.setAttribute('class', 'cell_input_class')
        cellInput.setAttribute('maxLength', '1');
        boardCell[i].appendChild(cellInput);
    // end of create text input inside cells

        }
        inputClass = document.getElementsByClassName('cell_input_class');

        
    return inputClass;
}

//***********convert current board values to matrix**************/

function convertBoardToMat(arr) {
    let j = 9;
    let k = 0
    let newArr = [];

    for (let i = 0; i < arr.length; i++) {
        if (newArr.length == 0) {
            newArr.push([])
            i--
        }
        else if (i < j) {
            newArr[k].push(parseInt(arr[i].value))

        }
        else if (i == j) {
            newArr.push([])
            j += 9
            k++
            i--
        }
    }
    return newArr
}
//*********** end of convert current board values to matrix**************//
//

//
// ******fill cells randomally at game start depending on difficulty*****// 
// let randomFunc = randomCellsReveal(matCopy, difficulty);
function randomCellsReveal(initialMat, max) {
    //
    //copying mat values to single array
    let tempArr = [];
    for (let i = 0; i < initialMat.length; i++) {
        for (let j = 0; j < initialMat[i].length; j++) {
            tempArr.push(initialMat[i][j])
        }
    }
    //end of copying mat values to single array
    //
    //
    //pushing random numbers to a temp array
    // let runRandomFunct = randomArrayFilling()
    function randomArrayFilling() {
        function randNum() {
            return Math.floor(Math.random() * (80 + 1) - 0) + 0;
        }
        //
        flag = 1
        let tempVar = 0;
        let randArr = [];
        for (let x = 0; x < max; x++) {
            tempVar = randNum();
            for (let i = 0; i < randArr.length; i++) {
                if (tempVar == randArr[i]) {
                    flag = 0;
                    x--
                    break;
                }
                else {
                    flag = 1
                }
            }
            if (flag == 1) {
                randArr.push(tempVar)
            }
        }
        
        return randArr;
    }
    let randArr = randomArrayFilling()

    randArr = randArr.sort(function(a,b){return a-b}) // sorting array by
    ////////                                          // comparing method
    // console.log(randArr)

    //initiating cell filling
    for(let i = 0; i < inputClass.length; i++){
        for(let j = 0; j < randArr.length; j++){
            if(i == randArr[j]){
                inputClass[i].value = tempArr[i]
                inputClass[i].style.textShadow = ' 0 0 0 black';
                inputClass[i].style.pointerEvents = 'none';

            }
        }  
    }

    //end of initiating cell filling
}
// end of pushing random numbers to a temp array
//
// ******fill cells randomally at game start depending on difficulty*****// 
//






/**********************  scanning function *********************/
function scanFunc(mat) {
    console.warn('checking results...');
    flag = 1;

    for (let i = 0; i < mat.length; i++) {
        for (let j = 0; j < mat[i].length; j++) {
            //
            //scanning rows
            for (let x = 0; x < mat[i].length; x++) {

                if(!(mat[i][j] >=1 && mat[i][j] <=9)){
                flag = 0;
                alert('incomplete board or illegal number/character')
                return console.log(mat[i][j],'at',i,j, 'incomplete board or illegal number/character');
    
                }
                else if (x == j) {
                    continue;
                }
                else if (mat[i][j] == mat[i][x]) {
                    console.log('row:',i);
                    console.log('initial at: ', i, j);
                    console.log('duplicate at:', i, x);
                    flag = 0;
                }
            }
            ////end of scanning rows

            //
            //scanning cols
            for (let y = 0; y < mat.length; y++) {
                if (y == i) {
                    continue;
                }
                else if (mat[i][j] == mat[y][j]) {
                    console.log('column:',j);
                    console.log('initial at:', i, j);
                    console.log('duplicate at:', y, j);
                    flag = 0;

                }
            }
            //end of scanning cols

            //
            //***scanning sectors***//
            //scanning sector 1//
            if ((i >= 0 && i <= 2) && (j >= 0 && j <= 2)) {
                for (let x = 0; x <= 2; x++) {
                    for (let y = 0; y <= 2; y++) {
                        if (x == i && y == j) {
                            continue;
                        }
                        else if (mat[i][j] == mat[x][y]) {
                            console.log('sector 1:');
                            console.log('initial at:', i, j);
                            console.log('duplicate at:', x, y);
                            flag = 0;

                        }
                    }
                }
            }
            //end of scanning sector 1//
            //

            //scanning sector 2//
            else if ((i >= 0 && i <= 2) && (j >= 3 && j <= 5)) {
                for (let x = 0; x <= 2; x++) {
                    for (let y = 3; y <= 5; y++) {
                        if (x == i && y == j) {
                            continue;
                        }
                        else if (mat[i][j] == mat[x][y]) {
                            console.log('sector 2:');
                            console.log('initial at:', i, j);
                            console.log('duplicate at:', x, y);
                            flag = 0;


                        }
                    }
                }
            }
            //end of scanning sector 2//
            //
            //scanning sector 3//
            else if ((i >= 0 && i <= 2) && (j >= 6 && j <= 8)) {
                for (let x = 0; x <= 2; x++) {
                    for (let y = 6; y <= 8; y++) {
                        if (x == i && y == j) {
                            continue;
                        }
                        else if (mat[i][j] == mat[x][y]) {
                            console.log('sector 3:');
                            console.log('initial at:', i, j);
                            console.log('duplicate at:', x, y);
                            flag = 0;


                        }
                    }
                }
            }
            //end of scanning sector 3//
            //
            //scanning sector 4//
            else if ((i >= 3 && i <= 5) && (j >= 0 && j <= 2)) {
                for (let x = 3; x <= 5; x++) {
                    for (let y = 0; y <= 2; y++) {
                        if (x == i && y == j) {
                            continue;
                        }
                        else if (mat[i][j] == mat[x][y]) {
                            console.log('sector 4:');
                            console.log('initial at:', i, j);
                            console.log('duplicate at:', x, y);
                            flag = 0;

                            

                        }
                    }
                }
            }
            //end of scanning sector 4//
            //
            //scanning sector 5//
            else if ((i >= 3 && i <= 5) && (j >= 3 && j <= 5)) {
                for (let x = 3; x <= 5; x++) {
                    for (let y = 3; y <= 5; y++) {
                        if (x == i && y == j) {
                            continue;
                        }
                        else if (mat[i][j] == mat[x][y]) {
                            console.log('sector 5:');
                            console.log('initial at:', i, j);
                            console.log('duplicate at:', x, y);
                            flag = 0;

                        }
                    }
                }
            }
            //end of scanning sector 5//
            //
            //scanning sector 6//
            else if ((i >= 3 && i <= 5) && (j >= 6 && j <= 8)) {
                for (let x = 3; x <= 5; x++) {
                    for (let y = 6; y <= 8; y++) {
                        if (x == i && y == j) {
                            continue;
                        }
                        else if (mat[i][j] == mat[x][y]) {
                            console.log('sector 6:');
                            console.log('initial at:', i, j);
                            console.log('duplicate at:', x, y);
                            flag = 0;
                        }
                    }
                }
            }
            //end of scanning sector 6//
            //
            //scanning sector 7//
            else if ((i >= 6 && i <= 8) && (j >= 0 && j <= 2)) {
                for (let x = 6; x <= 8; x++) {
                    for (let y = 0; y <= 2; y++) {
                        if (x == i && y == j) {
                            continue;
                        }
                        else if (mat[i][j] == mat[x][y]) {
                            console.log('sector 7:');
                            console.log('initial at:', i, j);
                            console.log('duplicate at:', x, y);
                            flag = 0;
                        }
                    }
                }
            }
            //end of scanning sector 7//
            //
            //scanning sector 8//
            else if ((i >= 6 && i <= 8) && (j >= 3 && j <= 5)) {
                for (let x = 6; x <= 8; x++) {
                    for (let y = 3; y <= 5; y++) {
                        if (x == i && y == j) {
                            continue;
                        }
                        else if (mat[i][j] == mat[x][y]) {
                            console.log('sector 8:');
                            console.log('initial at:', i, j);
                            console.log('duplicate at:', x, y);
                            flag = 0;
                        }
                    }
                }
            }
            //end of scanning sector 8//
            //
            //scanning sector 9//
            else if ((i >= 6 && i <= 8) && (j >= 6 && j <= 8)) {
                for (let x = 6; x <= 8; x++) {
                    for (let y = 6; y <= 8; y++) {
                        if (x == i && y == j) {
                            continue;
                        }
                        else if (mat[i][j] == mat[x][y]) {
                            console.log('sector 9:');
                            console.log('initial at:', i, j);
                            console.log('duplicate at:', x, y);
                            flag = 0;
                        }
                    }
                }
                //end of scanning sector 9//
                //
            }
        }
    }
    if(flag == 1){
        console.warn('correct!');
        alert('correct! well done!')
    }
    else if(flag == 0){
        console.warn('Incorrect! please check your results');
        alert('Incorrect! Please try again');

    }
}
/********************** end of scanning function *********************/


// auto solve board
let showAll = document.getElementById('show_all');
showAll.addEventListener('click', funcShowAll)

function funcShowAll() {
    let k = 0;
    for (let i = 0; i < ORIGINAL_MAT.length; i++) {
        for (let j = 0; j < ORIGINAL_MAT[i].length; j++) {
            inputClass[k].value = ORIGINAL_MAT[i][j]
            k++
        }
    }
}
//end of auto solve board


// check result
let y = document.getElementById('result');
y.addEventListener('click', checkResults)

function checkResults() {

    scanFunc(convertBoardToMat(addInputBoxToCells));

}
//end of check result

///new game button
let newGame = document.getElementById('new_game');
newGame.addEventListener('click',newGameFunc)

function newGameFunc(){
    window.location.reload()
}

///end ofnew game button

//********************end board setup *************************//

