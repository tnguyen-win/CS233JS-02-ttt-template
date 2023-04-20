/* jshint esversion: 6 */

var xIsNext = true;
var squares = Array(9).fill(null);
var winner = null;
var winningLine = Array();
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

window.onload = init;

function init() {
	const uiSquares = document.getElementsByName("square");

	uiSquares.forEach((u) => {
		u.onclick = handleClick;
	});
}

function handleClick() {
	let index = this.id;
	let player = xIsNext ? "X" : "O";
	let e = document.getElementById(index);

	xIsNext = !xIsNext;

	squares[index] = player;

	e.innerText = player;
	e.onclick = () => { };

	if (calculateWinner()) {
		highlightWinner();
		disableAll();
	} else document.getElementById("status").innerText = `Next Player: ${player = xIsNext ? "X" : "O"}`;
}

function calculateWinner() {
	for (let l = 0; l < lines.length; l++) {
		const a = lines[l][0];
		const b = lines[l][1];
		const c = lines[l][2];

		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			winner = squares[a];

			winningLine = lines[l];

			return true;
		}
	}

	winner = null;

	winningLine = Array();

	return false;
}

function highlightWinner() {
	document.getElementById("status").innerText = `Winner: ${winner}`;

	winningLine.forEach((l) => {
		document.getElementById(l).classList.add("red");
	});
}

function disableAll() {
	const squares = document.getElementsByName("square");

	squares.forEach((s) => {
		s.onclick = () => { };
	});
}