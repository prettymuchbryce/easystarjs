/**
 * Represents a single instance of EasyStar.
 * A path that is in the queue to eventually be found.
 */
module.exports = function() {
    this.pointsToAvoid = {};
    this.startX;
    this.callback;
    this.startY;
    this.endX;
    this.endY;
    this.nodeHash = {};
    this.openList;
    this.searchedNodes = [];

    this.pushNode = function(node) {
        this.openList.push(node);
        this.searchedNodes.push({
            x: node.x,
            y: node.y
        });
    }
};
