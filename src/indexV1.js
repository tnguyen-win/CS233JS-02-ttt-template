/*  Overview
    This application simulates a tic tac toe game.

    There are 5 global variables that are used to keep track of the "state"
    of the application.
    -  xIsNext - is a boolean that keeps track of whether x is the next player or not.
    -  squares - a 9 element array of x's and o's currently on the board.  
       NOTE:  This does NOT STORE UI elements.  It represents data.
    -  winner - the player who has won the game.  The value will be either null, or "x" or "o".
    -  winningLine - an array of 3 elements that stores the indices of the winning squares on the board.
       It will be an empty array when the winner is null.
    -  lines - an array of all of the possible winning lines in the game.  The first element,
       for example, is [0, 1, 2] -- the indices for winning in the first row of the board.

    The function handleClick is associated with the click event handler for each square on the board.

    There are lots of  "helper" functions.  Comments in the code describe each of these functions.
    I've written more functions that I might have done to make each function as simple as possible.
*/

// start with these global variables
// is x the next player.  x plays first so it is initialized to true
var xIsNext = true;
// this is the data for the game NOT the UI elements
var squares = Array(9).fill(null);
// these 2 keep track of who wins and where on the board the win occurs
var winner = null;
var winningLine = Array();
// all of the possible ways to win
var lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
    ];

// --------------------------------- PART 1 --------------------------------------- //
// when the page loads, call the function init
// write the function init
// write JUST a CONSOLE.LOG statement in handleClick and then test
window.onload = init;

// Adds an onclick handler to all of the squares
// The name attribute for all of the divs is square
// Use the function handleClick to handle the event
function init()
{
    var uiSquares = document.getElementsByName("square");
    for (var i = 0; i < uiSquares.length; i++)
        uiSquares[i].onclick = handleClick;
}
// END PART 1 - TEST THIS FAR //


// --------------------------------- PART 2 --------------------------------------- //
// write handleClick
// write JUST a CONSOLE.LOG statement in hightlightWinner and disableAll and test

// the function that gets called when the user clicks a square
// it updates the global variables as well as the UI
// it calls a number of the helper functions to do that
function handleClick() {

    // Get the id from the square that triggered the event and put it in a variable called index
    // Remember that the keyword this refers to the square you clicked and the id is an integer 0 - 8
    // create a local variable called player and set it to either "X" or "O" using the variable xIsNext
    // Update the variable xIsNext to the "opposite" boolean value
    var index = this.id;
    var player = (xIsNext)? "X" : "O";
    xIsNext = !xIsNext;

    // Set the element in the squares array at index to the player's symbol.
    // Update the inner html for the square in the UI to the player's symbol too
    // Set the onclick handler for this square in the UI to an empty anonymous function or arrow function
    squares[index] = player
    document.getElementById(index).innerHTML = player;
    this.onclick = () => {};

    // If a call to calculateWinner returns true
        // highlight the winner and disable all of the squares
    // otherwise 
        //update the status in the UI to display the player
    if (calculateWinner()) {
        highlightWinner();
        disableAll();
    }
    else {
        document.getElementById("status").innerHTML = "Next Player: " + player;
    }
}

// this function determines if there's a winner based on the state of the array squares
// it returns true or false
// it updates winner and winningLine when it returns true
// THERE'S NOTHING TO WRITE HERE
function calculateWinner() {
    for (var i = 0; i < lines.length; i++) {
        var a = lines[i][0];
        var b = lines[i][1];
        var c = lines[i][2];       
        if (squares[a] && 
        squares[a] === squares[b] && 
        squares[a] === squares[c]) {
            winner = squares[a];
            winningLine = lines[i];
            return true;
        }
    }
    winner = null;
    winningLine = Array();
    return false;
}
// END PART 2 - TEST THIS FAR //


// --------------------------------- PART 3 --------------------------------------- //
// write highlightWinner
// write disable all
// test the entire app

// changes all of the UI elements in the winningLine to red when there is a winner
// it also updates the status element on the page to display the winner
function highlightWinner() {
    // Update the status in the UI to display the winner
    // Iterate through the winningLine array.  It contains the indices of the winning squares
    //      get the next square using the current index in the winningLine array as the id
    //      add the class red to the square
    document.getElementById("status").innerHTML = "Winner: " + winner;
    for (var i = 0; i < winningLine.length; i++) {
        var square = document.getElementById(winningLine[i]);
        square.classList.add("red");
    }
}

// sets the on click event handler for each square in the ui to a function that does nothing 
function disableAll() {
    // create a variable that stores all of the ui squares on the page
    // iterate through that array
        // Set the onclick handler for a ui square to function that does nothing
    var uiSquares = document.getElementsByName("square");
    for (var i = 0; i < uiSquares.length; i++)
        uiSquares[i].onclick = () => {};

}
// END PART 3 - TEST THE ENTIRE APP//  