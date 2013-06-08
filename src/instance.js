/**
 * Represents a single instance of EasyStar.
 * A path that is in the queue to eventually be found.
 */
EasyStar.instance = function() {
	this.isDoneCalculating = true;
	this.pointsToAvoid = {};
	this.startX;
	this.callback;
	this.startY;
	this.endX;
	this.endY;
	this.nodeHash = {};
	this.openList;
};