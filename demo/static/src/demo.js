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

	this._diagonalsEnabled = false;

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
		for (var i = 0; i < 180; i++) {
			this._addPlayer();
		}

		createjs.Ticker.setFPS(20)
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
	 * This method is called from the slider.
	 *
	 * It sets the preference of roads by making grass tiles more
	 * expensive.
	 *
	 * @param {Number} amount The new multiplicitive cost of grass tiles.
	 */
	this.setRoadPreference = function(amount) {
		this._easystar.setTileCost(1,amount);
	}

	/**
	 * This method is called from the checkbox.
	 *
	 * It toggles the diagonals functionality of easystar.
	 */
	this.toggleDiagonals = function() {
		if (this._diagonalsEnabled) {
			this._easystar.disableDiagonals();
		} else {
			this._easystar.enableDiagonals();
		}
		this._diagonalsEnabled = !this._diagonalsEnabled;
	}

	/**
	 * Sets up the grid.
	 */
	this._setupGrid = function() {
		//Generate the semi-random grid
		for (var y = 0; y < Demo.MAP_HEIGHT; y++) {
			this._grid.push([]);
			for (var x = 0; x < Demo.MAP_WIDTH; x++) {
				if (x == 0 || x == Demo.MAP_WIDTH-1) {
					this._grid[y].push(1);
				} else {
					if (x > 5 && x < Demo.MAP_WIDTH-6 && Math.random()<.2) {
						this._grid[y].push(2 + Math.round(Math.random()));
					} else {
						this._grid[y].push(1);
					}
				}
			}
		}

		//Draw road
		var y = Demo.MAP_HEIGHT/2;
		for (var x = 0; x < Demo.MAP_WIDTH; x++) {
			this._grid[y][x] = 0;
			if (Math.random() < .5 && y > 1) {
				y--;
			} else if (y < Demo.MAP_HEIGHT-2) {
				y++;
			}
			this._grid[y][x] = 0;
		}

		//Setup EasyStar.
		//Give it the grid, acceptable tiles, and
		//the number of iterations per calculations to start
		//with.
		
		this._easystar.setGrid(this._grid); //Tell EasyStar that this is the grid we want to use
		this._easystar.setAcceptableTiles([0,1]); //Set acceptable tiles
		this._easystar.setIterationsPerCalculation(300); //Set iterations per calculation
		this._easystar.setTileCost(1,1.1); //Make it slightly preferable to take roads

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

				bitmap.addEventListener("click", function(mouseEvent) {
					var y = Math.floor(mouseEvent.rawY / Demo.TILE_SIZE);
					var x = Math.floor(mouseEvent.rawX / Demo.TILE_SIZE)

			    	if (demo._grid[y][x] === 2 || demo._grid[y][x] === 3) {
			    		demo._grid[y][x] = 1;
			    	} else {
			    		demo._grid[y][x] = 2;
			    	}

					mouseEvent.target.sourceRect = {
						x: Demo.TILE_SIZE * demo._grid[y][x], 
						y: 0, 
						width: Demo.TILE_SIZE, 
						height: Demo.TILE_SIZE
					};

			    });
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

	    		if (this._players[i].onLeftOfMap) {
					this._findPath(this._players[i], 
						Demo.MAP_WIDTH - 3 - Math.floor( Math.random() * 3 ),
						1 + Math.floor( Math.random() * ( Demo.MAP_HEIGHT - 2 ) ));
	    		} else {
	    			this._findPath(this._players[i], 
	    				2 + Math.floor( Math.random() * 3 ),
	    				1 + Math.floor( Math.random() * ( Demo.MAP_HEIGHT - 2 ) ));
	    		}

	    		this._players[i].onLeftOfMap = !this._players[i].onLeftOfMap;
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
		var playerY = 1 + Math.floor( Math.random() * ( Demo.MAP_HEIGHT-2 ) );
		var playerX = 2 + Math.floor( Math.random() * 3 );
		
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
		player.onLeftOfMap = true;

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

		var timeTakenToMoveMS;
		
		if (Math.abs(player.x - path[0].x) + Math.abs(player.y - path[0].y) == 2) {
			timeTakenToMoveMS = Demo.MOVE_TIME_MS * Demo.DIAGONAL_COST;
		} else {
			timeTakenToMoveMS = Demo.MOVE_TIME_MS;
		}

		player.x = path[0].x;
		player.y = path[0].y;
		setTimeout(function() {
			player.playerImage.x = player.x * Demo.TILE_SIZE;
			player.playerImage.y = player.y * Demo.TILE_SIZE;
			path.shift();
			demo._movePlayerTo(player, path);
		},timeTakenToMoveMS);
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
				player.moving = false;
				player.onLeftOfMap = !player.onLeftOfMap;
			} else {
				demo._movePlayerTo(player, path);
			}
		});
	};
};

Demo.TILE_SIZE = 16;
Demo.MAP_WIDTH = 62;
Demo.MAP_HEIGHT = 18;
Demo.MOVE_TIME_MS = 50;
Demo.DIAGONAL_COST = 1.4;