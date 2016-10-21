app.factory('gameBoardFactory', function() {
	var board = [0, 0, 0, 
				 0, 0, 0, 
				 0, 0, 0];	//1D game board. To be converted to 2D when displaying in view
	var currPlayer = 1; 
	var winner = null;  	//statuses: null = start, 0 = running, 1 or 2 = win, 3 = tie
	var winningCells = [];  //1D coordinates of winning cells
	var moves = 0; 			//Number of moves so far
	var validMove = false;	//Validity of current move

	var factory = {};

	factory.refresh = function() {
		winner = null;
		moves = 0;
		winningCells = [];
	};

	factory.getBoard = function() {
		return board;
	};

	factory.getCurrPlayer = function() {
		return currPlayer;
	}

	factory.setCurrPlayer = function(player) {
		currPlayer = player;
	}

	factory.clearBoard = function() {
		for(var i = 0; i < 9; i++) {
			board[i] = 0;
		}
	};

	factory.newMove = function(row, box) {
		//Make a new move on the box clicked if game is still running and box is free. 
		var move = row * 3 + box * 1;  //Convert to 1D array index (base 3 to base 10)
		if (board[move] === 0 && (winner === null || winner === 0)) {
			board[move] = currPlayer;
			moves ++; 
			validMove = true;
		}
		else {
			validMove = false;
		}
	};

	factory.switchTurns = function() {
		//Switch turns if the current move is valid.
		if (validMove === true) {
			if (currPlayer === 1) {
				currPlayer = 2;
			}
			else
				currPlayer = 1;
		}
		console.log("currPlayer: " + currPlayer);
		return currPlayer;
	};

	factory.updateBoard = function() {
		return this.convertToGrid(board);
	}

	factory.getStatus = function() {  //Checks for winner/tie and changes status
		//check rows
		for (var i = 0; i < 7; i += 3) {
			if (board[i] !== 0 && board[i] === board[i + 1] && board[i] == board[i + 2]) {
				winner = board[i];
				winningCells = [i, i + 1, i + 2];
				return "win";
			}
		}

		//check cols
		for (var i = 0; i < 3; i ++) {
			if (board[i] !== 0 && board[i] === board[i + 3] && board[i] === board[i + 6]) {
				winner = board[i];
				winningCells = [i, i + 3, i + 6];
				return "win";
			}
		}

		//check diagonals
		if (board[0] !== 0 && board[0] === board[4] && board[0] === board[8]) {
			winner = board[i];
			winningCells = [0, 4, 8];
			return "win";
		}

		else if (board[2] !== 0 && board[2] === board[4] && board[2] === board[6]) {
			winner = board[i];
			winningCells = [2, 4, 6];
			return "win";
		}

		//Check for tie
		else if (moves === 9 && winner !== 1 && winner !== 2) {
			winner = 3;
			return "tie";
		}

		if (moves > 0 && moves < 9) {
			winner = 0;
			return "running";
		}

	};


	factory.convertToGrid = function(board) {
		var grid = [];
		for (var i = 0; i < 7; i += 3) {
			var ary = [board[i], board[i + 1], board[i + 2]];
			grid.push(ary);
		}
		return grid;
	};


	factory.isWinner = function(row, box) {
		if (winningCells.length !== 0) {
			var cell = row * 3 + box * 1; 
			for(var i = 0; i < 3; i++) {
				if (cell === winningCells[i]) {
					return true;
				}
			}
			return false;
		}
		else
			return false;
	};

	return factory;

});