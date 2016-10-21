app.factory('gameBoardFactory', function() {
	var board = [0, 0, 0, 
				 0, 0, 0, 
				 0, 0, 0];

	var currPlayer = 1; 
	var winner = null;  //statuses: null = start, 0 = running, 1 or 2 = win, 3 = tie
	var moves = 0;
	var validMove = false;

	var factory = {};

	factory.refresh = function() {
		winner = null;
		moves = 0;
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
		var move = row * 3 + box * 1;  //Convert to 1D array index (base 3 to base 10)\
		if (board[move] === 0 && (winner === null || winner === 0)) {
			console.log("valid move!");
			board[move] = currPlayer;
			moves ++; 
			validMove = true;
		}
		else {
			validMove = false;
			console.log("not valid");
		}
	};

	factory.switchTurns = function() {
		console.log("SWITCH TURNS");
		console.log("P: " + currPlayer);
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
				return "win";
			}
		}

		//check cols
		for (var i = 0; i < 3; i ++) {
			if (board[i] !== 0 && board[i] === board[i + 3] && board[i] === board[i + 6]) {
				winner = board[i];
				return "win";
			}
		}

		//check diagonals
		if (board[0] !== 0 && board[0] === board[4] && board[0] === board[8]) {
			winner = board[i];
			return "win";
		}

		else if (board[2] !== 0 && board[2] === board[4] && board[2] === board[6]) {
			winner = board[i];
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

	return factory;

});