/* jshint esversion: 6 */

class TTT {
	constructor() {
		this.xIsNext = true;
		this.squares = Array(9).fill(null);
		this.winner = null;
		this.winningLine = Array();
		this.lines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];

		this.calculateWinner = this.calculateWinner.bind(this);

		this.init();
	}

	init() {
		const uiSquares = document.getElementsByName("square");

		for (let u of uiSquares) u.onclick = this.handleClick.bind(this, u.id);
	}

	handleClick(index) {
		let player = this.xIsNext ? "X" : "O";
		let e = document.getElementById(index);

		this.xIsNext = !this.xIsNext;

		this.squares[index] = player;

		e.innerText = player;
		e.onclick = () => { };

		if (this.calculateWinner()) {
			this.highlightWinner();
			this.disableAll();
		} else document.getElementById("status").innerText = `Next Player: ${player = this.xIsNext ? "X" : "O"}`;
	}

	calculateWinner() {
		for (let l of this.lines) {
			const [a, b, c] = l;

			if (this.squares[a] && this.squares[a] === this.squares[b] && this.squares[a] === this.squares[c]) {
				this.winner = this.squares[a];

				this.winningLine = l;

				return true;
			}
		}

		this.winner = null;

		this.winningLine = Array();

		return false;
	}

	highlightWinner() {
		document.getElementById("status").innerText = `Winner: ${this.winner}`;

		for (let l of this.winningLine) document.getElementById(l).classList.add("red");
	}

	disableAll() {
		const squares = document.getElementsByName("square");

		for (let s of squares) s.onclick = () => { };
	}
}

var ttt;

window.onload = () => { ttt = new TTT(); };