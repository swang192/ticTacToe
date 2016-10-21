app.controller("tttController", ['$scope', 'gameBoardFactory', function($scope, gameBoardFactory) {

	$scope.player = { first: 1 };
	$scope.gameBoard;
	$scope.message;


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
		if (gameBoardFactory.getStatus() === "running") {
			currPlayer = gameBoardFactory.switchTurns();
			$scope.message = "It's Player " + currPlayer + "'s turn.";
		}
		else if (gameBoardFactory.getStatus() === "win") {
			$scope.message = "Player " + currPlayer + " wins!";
		}
		else if (gameBoardFactory.getStatus() === "tie") { //tie
			$scope.message = "It's a tie!"
		} 

		else {
			$scope.message = "New Game";
		}

	};

	$scope.getSymbol = function(row, box) {
		console.log($scope.gameBoard[row][box]);
		if ($scope.gameBoard[row][box] === 1) {
			return "X";
		}
		if ($scope.gameBoard[row][box] === 2) {
			return "O";
		}
	};

}]);