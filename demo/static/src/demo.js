/**
 * This demo demonstrates the asynchronicity of EasyStar.js.
 */
var Demo = function() {
	var demo = this;

	this._players = [];

	//grid, representing the map
	this._grid = [];

	//easystar instance
	this._easystar;

	this._stage; 

	/** 
	 * Initializes the demo. Called by demo.html
	 */
	this.init = function() {

		//Initialize EasyStar
		this._easystar = new EasyStar.js();

		//Initialize the create.js stage
		this._stage = new createjs.Stage('canvas');

		//Setup the grid.
		this._setupGrid();
	
		//Add some players		
		for (var i = 0; i < 500; i++) {
			this._addPlayer();
		}

		createjs.Ticker.addEventListener("tick", this._onTick);
	};

	/**
	 * This method is called from the slider.
	 *
	 * It sets the iterations per calculation value directly on
	 * easystar.
	 *
	 * @param {Number} iterations The iterations per calculation value
	 * to set on EasyStar.
	 */
	this.setIterationsPerCalculation = function(iterations) {
		this._easystar.setIterationsPerCalculation(iterations);
	}

	/**
	 * Sets up the grid.
	 */
	this._setupGrid = function() {
		//Generate the semi-random grid
		for (var y = 0; y < Demo.MAP_HEIGHT; y++) {
			this._grid.push([]);
			for (var x = 0; x < Demo.MAP_WIDTH; x++) {
				if (y == 0 || x == 0 || x == Demo.MAP_WIDTH-1 || y == Demo.MAP_HEIGHT-1) {
					this._grid[y].push(1);
				} else {
					if (y > 5 && y < Demo.MAP_HEIGHT-6 && Math.random()<.2) {
						this._grid[y].push(2 + Math.round(Math.random()));
					} else {
						this._grid[y].push(1);
					}
				}
			}
		}

		//Setup EasyStar.
		//Give it the grid, acceptable tiles, and
		//the number of iterations per calculations to start
		//with.
		
		this._easystar.setGrid(this._grid); //Tell EasyStar that this is the grid we want to use
		this._easystar.setAcceptableTiles([1]); //Set acceptable tiles
		this._easystar.setIterationsPerCalculation(10); //Set iterations per calculation

		//Draw the grid onto the screen.
		for (var y = 0; y < this._grid.length; y++) {
			for (var x = 0; x < this._grid[0].length; x++) {
				var bitmap = new createjs.Bitmap("assets/tiles.png");
				bitmap.sourceRect = {
					x: Demo.TILE_SIZE * this._grid[y][x], 
					y: 0, 
					width: Demo.TILE_SIZE, 
					height: Demo.TILE_SIZE
				};
				bitmap.x = x*Demo.TILE_SIZE;
				bitmap.y = y*Demo.TILE_SIZE;
				this._stage.addChild(bitmap);
			}
		}
	}

	/**
	 * Called every tick.
	 */
	this._onTick = function() {
		demo.updateAndRender();
	}

	/**
	 * Updates and renders.
	 */
	this.updateAndRender = function() {
		//Tell EasyStar to calculate every tick.
		this._easystar.calculate();

		//Moves the players back and forth, from the top of the map
		//to the bottom.
	    for (var i = 0; i < this._players.length; i++) {
	    	if (!this._players[i].moving) {
	    		this._players[i].moving = true;

	    		if (this._players[i].onTopOfMap) {
					this._findPath(this._players[i], 
						1 + Math.floor( Math.random() * ( Demo.MAP_WIDTH - 2 ) ), 
						Demo.MAP_HEIGHT - 3 - Math.floor( Math.random() * 3 ) );
	    		} else {
	    			this._findPath(this._players[i], 
	    				1 + Math.floor( Math.random() * ( Demo.MAP_WIDTH - 2 ) ), 
	    				2 + Math.floor( Math.random() * 3 ) );
	    		}

	    		this._players[i].onTopOfMap = !this._players[i].onTopOfMap;
	    	}
	    }

	    //Update the screen.
	    this._stage.update();
	}

	/**
	 * Adds a player into the demo.
	 */
	this._addPlayer = function() {
		//randomize position
		var playerX = 1 + Math.floor( Math.random() * ( Demo.MAP_WIDTH-2 ) );
		var playerY = 2 + Math.floor( Math.random() * 3 );
		
		//Create the player image.
		var playerFrame = 4 + Math.floor( Math.random() * 6 );
		var playerImage = new createjs.Bitmap("assets/tiles.png");
		playerImage.sourceRect = {
			x: Demo.TILE_SIZE * playerFrame, 
			y: 0, 
			width: Demo.TILE_SIZE, 
			height: Demo.TILE_SIZE
		};
		playerImage.x = playerX * Demo.TILE_SIZE;
		playerImage.y = playerY * Demo.TILE_SIZE;
		this._stage.addChild(playerImage);

		//Create the player object.
		var player = {};
		player.playerImage = playerImage;
		player.x = playerX;
		player.y = playerY;
		player.moving = false;
		player.onTopOfMap = true;

		//Add the player to the list of players.
		this._players.push(player);
	}

	/**
	 * Moves the player to the specific position on the grid.
	 * @param {Object} player The player object to move.
	 * @param {Array} path The path to follow.
	 */
	this._movePlayerTo = function(player, path) {
		if (path.length==0) {
			player.moving = false;
			return;
		}
		player.x = path[0].x;
		player.y = path[0].y;
		setTimeout(function() {
			player.playerImage.x = player.x * Demo.TILE_SIZE;
			player.playerImage.y = player.y * Demo.TILE_SIZE;
			path.shift();
			demo._movePlayerTo(player, path);
		},50);
	}

	/** 
	 * Try to find a path.
	 * @param {Object} Player A player object.
	 * @param {Number} x The end point on the x axis.
	 * @param {Number} y The end point on the y axis.
	 */
	this._findPath = function(player, x, y) {

		//Use EasyStar to find the path.
		this._easystar.findPath(player.x, player.y, x, y, function(path) {
			if (path === null) {
				//No path found..
			} else {
				demo._movePlayerTo(player, path);
			}
		});
	};
};

Demo.TILE_SIZE = 16;
Demo.MAP_WIDTH = 40;
Demo.MAP_HEIGHT = 30;