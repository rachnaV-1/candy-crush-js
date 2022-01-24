'use strict';



document.addEventListener("DOMContentLoaded",() => {
    const grid = document.querySelector(".grid");
    const scoreDisplay = document.getElementById("score");
    const movesEl = document.getElementById("moves");
    let movesLeft = parseInt(movesEl.innerText);
    const exitBtn = document.getElementById("exit");
    const squares = [];
    const width = 8;
    const colors = [
        'url(images/red-candy.png)',
        'url(images/blue-candy.png)',
        'url(images/yellow-candy.png)',
        'url(images/green-candy.png)',
        'url(images/purple-candy.png)',
        'url(images/orange-candy.png)'
    ]
    let score = 0;

    function createBoard (){
        for (let i = 0; i < width*width; i++){
            const square = document.createElement("div");
            square.setAttribute("id",i);
            square.setAttribute("draggable",true);
            const randomColor = Math.floor(Math.random() * colors.length);
            square.style.backgroundImage = colors[randomColor];
            grid.appendChild(square);
            squares.push(square);
        }
    }
    
    createBoard();

    exitBtn.addEventListener("onClick", close());

    //Drag the candies
    let squareBeingDragged;
    let squareBeingReplaced;
    let colorBeingDragged;
    let colorBeingReplaced;

    squares.forEach(square => square.addEventListener("dragstart", dragStart));
    squares.forEach(square => square.addEventListener("dragend", dragEnd));
    squares.forEach(square => square.addEventListener("dragenter", dragEnter));
    squares.forEach(square => square.addEventListener("dragover", dragOver));
    squares.forEach(square => square.addEventListener("dragleave", dragLeave));
    squares.forEach(square => square.addEventListener("drop", dragDrop));

    function dragStart() {
        squareBeingDragged = parseInt(this.id);
        colorBeingDragged = this.style.backgroundImage;
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function dragEnter(e) {
        e.preventDefault();
    }

    function dragLeave() {
    }

    function dragDrop() {
        squareBeingReplaced = parseInt(this.id);
        colorBeingReplaced = this.style.backgroundImage;
        squares[squareBeingDragged].style.backgroundImage = colorBeingReplaced;
        this.style.backgroundImage = colorBeingDragged;
    }

    function dragEnd() {
        const validMoves = [
            squareBeingDragged - 1, squareBeingDragged + 1,
            squareBeingDragged - width, squareBeingDragged + width
        ]
        const validMove = validMoves.includes(squareBeingReplaced);
        if (squareBeingReplaced && validMove) {
            squareBeingReplaced = null;
            movesLeft--;
            movesEl.innerText = movesLeft;
            if(movesLeft === 0) {
                document.querySelector(".gameOver").style.visibility = "visible";
                grid.style.display = "none";
            } 
        } else if (squareBeingReplaced && !validMove) {
            squares[squareBeingDragged].style.backgroundImage = colorBeingDragged;
            squares[squareBeingReplaced].style.backgroundImage = colorBeingReplaced;
        } else squares[squareBeingDragged].style.backgroundImage = colorBeingDragged;
    }

    //Move candies down
    function moveCandiesDown () {
        let firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
        for (let i = 0; i < 56; i++) {
            if (squares[i + width].style.backgroundImage === "") {
                squares[i + width].style.backgroundImage = squares[i].style.backgroundImage;
                squares[i].style.backgroundImage = "";
                if ( firstRow.includes(i) && squares[i].style.backgroundImage === "") {
                const randomColor = Math.floor(Math.random() * colors.length);
                squares[i].style.backgroundImage = colors[randomColor];
                }
            }
            if (firstRow.includes(i) && squares[i].style.backgroundImage === ""){
                const randomColor = Math.floor(Math.random() * colors.length);
                squares[i].style.backgroundImage = colors[randomColor];
            }   
        }
    }

    //Checking for matches
    function checkRowOfThree(){
        for(let i = 0; i <= 61; i++) {
            let rowOfThree = [i, i + 1, i + 2];
            let decidedColor = squares[i].style.backgroundImage;
            const isBlank = decidedColor === '';
            const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55];
            
            if(notValid.includes(i))  continue;

            if(rowOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
                score += 3;
                scoreDisplay.innerHTML = score;
                rowOfThree.forEach(index => {
                    squares[index].style.backgroundImage = '';
                })
            }
        }
    }

    function checkColumnOfThree(){
        for(let i = 0; i <= 47; i++) {
            let columnOfThree = [i, i + width, i + width*2];
            let decidedColor = squares[i].style.backgroundImage;
            const isBlank = decidedColor === '';
                    
            if(columnOfThree.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
                score += 3;
                scoreDisplay.innerHTML = score;
                columnOfThree.forEach(index => {
                    squares[index].style.backgroundImage = '';
                })
            }
        }
    }

    function checkRowOfFour(){
        for (let i = 0; i < 60; i++) {
            let rowOfFour = [i, i + 1, i + 2, i + 3];
            let decidedColor = squares[i].style.backgroundImage;
            const isBlank = decidedColor === '';
            let invalidMove = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55];
            if(invalidMove.includes(i)) continue;
            if(rowOfFour.every(index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
                score += 4;
                scoreDisplay.innerHTML = score;
                rowOfFour.forEach(index => squares[index].style.backgroundImage = '');
            }
        }
    }

    function checkColumnOfFour() {
        for (let i = 0; i < 40; i++) {
            let columnOfFour = [i, i + width, i + 2*width, i + 3*width];
            let decidedColor = squares[i].style.backgroundImage;
            const isBlank = decidedColor === '';

            if(columnOfFour.every( index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
                score += 4;
                scoreDisplay.innerHTML = score;
                columnOfFour.forEach( index => squares[index].style.backgroundImage = "");
            }
        }
    }

    function checkRowOfFive(){
        for (let i = 0; i < 60; i++) {
            let rowOfFive = [i, i + 1, i + 2, i + 3, i + 4];
            let decidedColor = squares[i].style.backgroundImage;
            const isBlank = decidedColor === "";
            const invalidMove = [4, 5, 6, 7, 12, 13, 14, 15, 20, 21, 22, 23, 28, 29, 30, 31, 36, 37, 38, 39, 44, 45, 46, 47, 52, 53, 54, 55];
            
            if (invalidMove.includes(i)) continue;

            if(rowOfFive.every( index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
                score += 5;
                scoreDisplay.innerHTML = score;
                rowOfFive.forEach( index => squares[index].style.backgroundImage = "");
            }
        }
    }

    function checkColumnOfFive() {
        for (let i = 0; i < 40; i++) {
            let columnOfFive = [i, i + width, i + 2*width, i + 3*width, i + 4*width];
            let decidedColor = squares[i].style.backgroundImage;
            const isBlank = decidedColor === '';

            if(columnOfFive.every( index => squares[index].style.backgroundImage === decidedColor && !isBlank)) {
                score += 5;
                scoreDisplay.innerHTML = score;
                columnOfFive.forEach( index => squares[index].style.backgroundImage = "");
            }
        } 
    }

    window.setInterval(function(){
        moveCandiesDown();
        checkRowOfFive();
        checkColumnOfFive();
        checkRowOfFour();
        checkColumnOfFour();
        checkRowOfThree();
        checkColumnOfThree();
        },100)
})

