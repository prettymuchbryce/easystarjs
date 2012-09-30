//NameSpace
var EasyStar = EasyStar || {};

/**
* A simple Node that represents a single tile on the grid.
* @param parent The parent node.
* @param x The x position on the grid.
* @param y The y position on the grid.
* @param costSoFar How far this node is in moves*cost from the start.
* @param simpleDistanceToTarget Manhatten distance to the end point.
**/
EasyStar.Node = function(parent,x,y,costSoFar,simpleDistanceToTarget) {
	this.parent = parent;
	this.x = x;
	this.y = y;
	this.costSoFar = costSoFar;
	this.simpleDistanceToTarget = simpleDistanceToTarget;

	/**
	* Returns our best guess distance of a cost using this node.
	**/
	this.bestGuessDistance = function() {
		return this.costSoFar + this.simpleDistanceToTarget;
	}
}

//Constants
EasyStar.Node.OPEN_LIST = 0;
EasyStar.Node.CLOSED_LIST = 1;