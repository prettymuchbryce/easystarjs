/**
*	EasyStar.js
*	github.com/prettymuchbryce/EasyStarJS
*	Blessed under the MIT License. Don't ask to use it. Just use it.
* 
*	Implementation By Bryce Neal
*	hi@prettymuchbryce.com
*	Based on Patrick Lester's excellent "A* Pathfinding for beginners" http://www.policyalmanac.org/games/aStarTutorial.htm
*	
*	EasyStar prefers the first path it finds over the "best" path.
*
* @param acceptableTiles An array of numbers that represent acceptable tiles to search on, in other words; "walkable" tiles.
* @param callback The method to call when EasyStar completes it search. Your call back should contain a single parameter which is either an Array of objects that have an x and a y attribute i.e. [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}], or null if EasyStar does not find a path.
**/
EasyStar.js = function(acceptableTiles,callback) {
	var STRAIGHT_COST = 10;
	var DIAGONAL_COST = 14;
	var isDoneCalculating = true;
	var pointsToAvoid = {};
	var collisionGrid;
	var iterationsSoFar;
	var startX;
	var startY;
	var endX;
	var endY;
	var nodeHash = {};
	var openList;
	var iterationsPerCalculation = Number.MAX_VALUE;

	/**
	* Sets the collision grid that EasyStar uses.
	* 
	* @param grid The collision grid that this EasyStar instance will read from. This should be a 2D Array of Numbers.
	**/
	this.setGrid = function(grid) {
		collisionGrid = grid;
	}

		/**
	* Sets the start and end point with which EasyStar will attempt to form a path.
	* 
	* @param inputStartX The X position of the starting point.
	* @param inputStartY The Y position of the starting point.
	* @param inputEndX The X position of the ending point.
	* @param inputEndY The Y position of the ending point.
	* 
	**/
	this.setPath = function(inputStartX,inputStartY,inputEndX,inputEndY) {
		openList = new EasyStar.PriorityQueue("bestGuessDistance",EasyStar.PriorityQueue.MIN_HEAP);
		isDoneCalculating = true;
		nodeHash = {};
		startX = inputStartX;
		startY = inputStartY;
		endX = inputEndX;
		endY = inputEndY;
		if (collisionGrid === undefined) { //Will this work?
			throw "You can't set a path without first calling setGrid() on EasyStar.";
		}

		if (startX < 0 || startY < 0 || endX < 0 || endX < 0 || startX > collisionGrid[0].length-1 || startY > collisionGrid.length-1 || endX > collisionGrid[0].length-1 || endY > collisionGrid.length-1) {
			throw "Your start or end point is outside the scope of your grid.";
		} else if (startX===endX && startY===endY) {
			callback([]);
		}

		var endTile = collisionGrid[endY][endX];
		var isAcceptable = false;
		for (var i = 0; i < acceptableTiles.length; i++) {
			if (endTile === acceptableTiles[i]) {
				isAcceptable = true;
				break;
			}
		}

		if (isAcceptable === false) {
			callback(null);
			return;
		}

		isDoneCalculating = false;

		openList.insert(coordinateToNode(startX,startY,null,STRAIGHT_COST));
	}

	/**
	* This method performs iterationsPerCalculation searches on your grid in an attempt to find your desired path.
	**/
	this.calculate = function() {
		if (collisionGrid === undefined || isDoneCalculating === true) {
			return;
		}
		iterationsSoFar = 0;
		while (iterationsSoFar < iterationsPerCalculation) {
			if (openList.length===0) {
				callback(null);
				isDoneCalculating = true;
				return;
			}
			var searchNode = openList.shiftHighestPriorityElement();
			searchNode.list = EasyStar.Node.CLOSED_LIST;

			if (searchNode.y > 0) {
				checkAdjacentNode(searchNode,0,-1,STRAIGHT_COST);
				if (isDoneCalculating===true) {
					return;
				}
			}
			if (searchNode.x < collisionGrid[0].length-1) {
				checkAdjacentNode(searchNode,1,0,STRAIGHT_COST);
				if (isDoneCalculating===true) {
					return;
				}
			}
			if (searchNode.y < collisionGrid.length-1) {
				checkAdjacentNode(searchNode,0,1,STRAIGHT_COST);
				if (isDoneCalculating===true) {
					return;
				}
			}
			if (searchNode.x > 0) {
				checkAdjacentNode(searchNode,-1,0,STRAIGHT_COST);
				if (isDoneCalculating===true) {
					return;
				}
			}


			iterationsSoFar++;
		}
	}

	/**
	* Sets the number of search iterations per calculation. A lower number provides a slower result, but is useful if you have a large tile-map and don't want to slow your page to a grind trying to find a path.
	* @param value The number of iterations per calculation.
	**/
	this.setIterationsPerCalculation = function(value) {
		iterationsPerCalculation = value;
	}

	/**
	* @param acceptableTiles An array of numbers that represent acceptable tiles to search on, in other words; "walkable" tiles.
	**/
	this.setAcceptableTiles = function(tiles) {
		acceptableTiles = tiles;
	}
	
	/**
	* Tells this EasyStar instance to avoid a particular point on the grid, regardless of whether or not it's an acceptable tile or not.
	*
	* @param x The x value of the point to void.
	* @param y The y value of the point to avoid.
	**/
	this.avoidAdditionalPoint = function(x,y) {
		pointsToAvoid[x + "_" + y] = 1;
	}

	//Private methods follow

	var checkAdjacentNode = function(searchNode,x,y,cost) {
		var adjacentCoordinateX = searchNode.x+x;
		var adjacentCoordinateY = searchNode.y+y;
		if (endX === adjacentCoordinateX && endY === adjacentCoordinateY) {
			isDoneCalculating = true;
			var path = [];
			var pathLen = 0;
			path[pathLen] = {x: adjacentCoordinateX, y: adjacentCoordinateY};
			pathLen++;
			path[pathLen] = {x: searchNode.x, y:searchNode.y};
			pathLen++;
			var parent = searchNode.parent;
			while (parent!=null) {
				path[pathLen] = {x: parent.x, y:parent.y};
				pathLen++;
				parent = parent.parent;
			}
			path.reverse();
			callback(path);
		}
		if (pointsToAvoid[adjacentCoordinateX + "_" + adjacentCoordinateY] === undefined) {
			for (var i = 0; i < acceptableTiles.length; i++) {
				if (collisionGrid[adjacentCoordinateY][adjacentCoordinateX] === acceptableTiles[i]) {
					var node = coordinateToNode(adjacentCoordinateX, adjacentCoordinateY, searchNode, cost);
					if (node.list === undefined) {
						node.list = EasyStar.Node.OPEN_LIST;
						openList.insert(node);
					} else if (node.list===EasyStar.Node.OPEN_LIST) {
						if (searchNode.costSoFar + cost < node.costSoFar) {
							node.costSoFar = searchNode.costSoFar + cost;
							node.parent = searchNode;
						}
					}
					break;
				}
			}

		}
	}

	var coordinateToNode = function(x,y,parent,cost) {
		if (nodeHash[x + "_" + y]!==undefined) {
			return nodeHash[x + "_" + y];
		}
		var simpleDistanceToTarget = getDistance(x,y,endX,endY);
		if (parent!==null) {
			var costSoFar = parent.costSoFar + cost;
		} else {
			costSoFar = simpleDistanceToTarget;
		}
		var node = new EasyStar.Node(parent,x,y,costSoFar,simpleDistanceToTarget);
		nodeHash[x + "_" + y] = node;
		return node;
	}

	var getDistance = function(x1,x2,y1,y2) {
		return Math.floor(Math.abs(x2-x1) + Math.abs(y2-y1));
	}
}
