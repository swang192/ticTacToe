app.controller("tttController", ['$scope', 'gameBoardFactory', function($scope, gameBoardFactory) {

	$scope.player = { first: 1 };
	$scope.gameBoard;
	$scope.message;
	$scope.status;


	var init =  function(player) {
		$scope.gameBoard = gameBoardFactory.updateBoard();
		gameBoardFactory.setCurrPlayer(player);
		$scope.message = "New Game. Player " + player + " starts.";
	};

	init($scope.player.first);

	$scope.newGame = function(player) {
		gameBoardFactory.clearBoard();
		gameBoardFactory.refresh();
		init($scope.player.first);
	};

	$scope.newMove = function(row, box) {
		var currPlayer = gameBoardFactory.getCurrPlayer();
		gameBoardFactory.newMove(row, box);
		$scope.gameBoard = gameBoardFactory.updateBoard();
		console.log($scope.gameBoard);
		$scope.status = gameBoardFactory.getStatus();
		if ($scope.status === "running") {
			currPlayer = gameBoardFactory.switchTurns();
			$scope.message = "It's Player " + currPlayer + "'s turn.";
		}
		else if ($scope.status === "win") {
			$scope.message = "Player " + currPlayer + " wins!";
		}
		else if ($scope.status === "tie") { //tie
			$scope.message = "It's a tie!"
		} 

		else {
			$scope.message = "New Game";
		}

	};

	$scope.getSymbol = function(row, box) {
		//Return X if box belongs to player 1, or O if it belongs to player 2.
		if ($scope.gameBoard[row][box] === 1) {
			return "X";
		}
		if ($scope.gameBoard[row][box] === 2) {
			return "O";
		}
	};

	$scope.isWinner = function(row, box) {
		return gameBoardFactory.isWinner(row, box); 
	};

}]);