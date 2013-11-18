var EasyStarDemo = function(width, height) {
	var SCALE = 1;
	var TILE_WIDTH = 32 * SCALE;
	var TILE_HEIGHT = 48 * SCALE;
	var NUM_HEROES = 20;
	var BOARD_PADDING = 5;

	var resizeInterval;


	//UI Vars
	var preferGrass = false;
	var iterationsPerCalculation = 100;
	var diagonalsAllowed = true;

	var displayWidth = width;
	var displayHeight = height;

	var board;
	var boardWidth;
	var boardHeight;
	var heroes = [];
	var boardObjectSprites = [];
	var side = 0;

	var renderer = PIXI.autoDetectRenderer(width, height);
	var stage = new PIXI.Stage(0xecf0f1);
	var subtextures = [];
	var imageLoader = new PIXI.ImageLoader('/img/bg.png');
	var spriteSheetLoader = new PIXI.SpriteSheetLoader('/img/sprites.json');
	
	var backgroundContainer = new PIXI.DisplayObjectContainer();
	var objectContainer = new PIXI.DisplayObjectContainer();
	var heroContainer = new PIXI.DisplayObjectContainer();
	var easystar;
	var intervals = {};

	var backgroundSprite;
	var backgroundTexture;

	var loadBackground = function(callback) {
		spriteSheetLoader.addEventListener("loaded", function() {
			callback(null);
		});

		spriteSheetLoader.load();
	};

	var loadSprites = function(callback) {
		imageLoader.addEventListener("loaded", function() {
			backgroundTexture = imageLoader.texture;
			callback(null);
		});

		imageLoader.load();
	};

	this.resize = function(width, height) {
		if (resizeInterval) {
			clearTimeout(resizeInterval);
		}
		resizeInterval = setTimeout(function() {
			if (width < TILE_WIDTH * BOARD_PADDING) {
				width = TILE_WIDTH * BOARD_PADDING;
			}

			if (width < 800) {
				SCALE = .5;
			} else {
				SCALE = 1;
			}

			TILE_WIDTH = 32 * SCALE;
			TILE_HEIGHT = 48 * SCALE;

			for (var interval in intervals) {
				clearInterval(interval);
				intervals = {};
			}

			renderer.resize(width, height);

			displayWidth = width;
			displayHeight = height;

			side = 0;

			createBackground(displayWidth, displayHeight);

			boardWidth = Math.floor(displayWidth / TILE_WIDTH);
			boardHeight = Math.floor(displayHeight / TILE_HEIGHT);

			objectContainer.position.x = Math.ceil(( displayWidth - (TILE_WIDTH * boardWidth))  /2);
			heroContainer.position.x = Math.ceil(( displayWidth - (TILE_WIDTH * boardWidth)) /2);
			board = createGrid(boardWidth, boardHeight);

			easystar = new EasyStar.js();
			easystar.setGrid(board);
			easystar.setAcceptableTiles([0,2]);
			easystar.setIterationsPerCalculation(iterationsPerCalculation);
			if (diagonalsAllowed) {
				easystar.enableDiagonals();
			}
			if (preferGrass) {
				easystar.setTileCost(2,99999999999);
			}
			populateBoardWithObjects(board);

			populateBoardWithHeroes();

			startPathfinding();

		}, 50);
	};


	var that = this;
	async.parallel([loadBackground, loadSprites], function(error, results) {
		that.init();
	});

	this.setIterationsPerCalculation = function(value) {
		iterationsPerCalculation = value;
		this.resize(displayWidth, displayHeight); //reset
	};

	this.setGrassPreference = function() {
		preferGrass = true;
		this.resize(displayWidth, displayHeight); //reset
	};

	this.unsetGrassPreference = function() {
		preferGrass = false;
		this.resize(displayWidth, displayHeight); //reset		
	}

	this.enableDiagonals = function() {
		diagonalsAllowed = true;
		this.resize(displayWidth, displayHeight); //reset
	};

	this.disableDiagonals = function() {
		diagonalsAllowed = false;
		this.resize(displayWidth, displayHeight); //reset
	};

	var createGrid = function(width, height) {
		var grid = [];
		for (var y = 0; y < height; y++) {
			grid.push([]);
			for (var x = 0; x < width; x++) {
				if (x >= BOARD_PADDING &&
					x <= width - BOARD_PADDING - 1) {
					if (Math.random() > .4) {
						grid[y][x] = 1;
					} else {
						grid[y][x] = 0;
					}
				} else {
					grid[y][x] = 0;
				}
			}
		}

		//ensure there is a couple paths
		for (var i = 0; i < 2; i++) {
			var pointerY = Math.floor(i*height/2);
			var pointerX = BOARD_PADDING;
			var type = 0;

			if (i ==1) {
				type = 2;
			}

			while (pointerX < width - BOARD_PADDING - 1) {
				grid[pointerY][pointerX] = type;
				pointerX++;
				grid[pointerY][pointerX] = type;
				pointerY += Math.floor(Math.random()*3) - 1;
				if (pointerY < 0) {
					pointerY = 0;
				}
				if (pointerY > height - 1) {
					pointerY = height -1;
				}
			}
		}

		return grid;
	};

	var populateBoardWithObjects = function(board) {
		while (objectContainer.children.length > 0) {
			objectContainer.removeChild(objectContainer.children[0]);
		}
		for (var y = 0; y < board.length; y++) {
			for (var x = 0; x < board[0].length; x++) {
				if (board[y][x] == 1) {
					createBoardSprite(subtextures[Math.floor(Math.random()*5)], objectContainer, x * TILE_WIDTH, y * TILE_HEIGHT);
				} else if (board[y][x] == 2) {
					createBoardSprite(subtextures[5], objectContainer, x * TILE_WIDTH, y * TILE_HEIGHT);
				}
			}
		}
	};

	var createHero = function(texture, startX, startY) {
		var hero = {};
		hero.sprite = createBoardSprite(texture, heroContainer, startX * TILE_WIDTH, startY * TILE_HEIGHT);
		hero.x = startX;
		hero.y = startY;
		heroes.push(hero);
	}

	var populateBoardWithHeroes = function() {
		for (var i = 0; i < heroes.length; i++) {
			heroContainer.removeChild(heroes[i].sprite);
		}

		heroes = [];

		for (var y = 0; y < boardHeight; y++) {
			for (var x = 0; x < BOARD_PADDING - 2; x++) {
				if (y > 0 && y < boardHeight-1 && x > 0) {
					createHero(subtextures[11 + Math.floor(Math.random()*4)], x, y);
				}
			}
		}
	}

	var createBoardSprite = function(texture, container, posX, posY) {
		var sprite = new PIXI.Sprite(texture);
		var offsetX = Math.floor(TILE_WIDTH - sprite.width);
		var offsetY = Math.floor(TILE_HEIGHT - sprite.height);
		sprite.position.x = Math.floor(posX + Math.floor(offsetX/2));
		sprite.position.y = Math.floor(posY + Math.floor(offsetY/2) - boardHeight);
		sprite.alpha = 0;
		sprite.scale = new PIXI.Point(SCALE, SCALE);

		container.addChild(sprite);
		createjs.Tween.get(sprite.position).to({x: Math.floor(posX + offsetX/2) , y:Math.floor(posY + offsetY/2)}, 200); //.call(handleComplete);
		createjs.Tween.get(sprite).to({alpha:1}, 300); //.call(handleComplete);
		return sprite;
	};

	var createBackground = function(width, height) {
		if (backgroundContainer.children.length > 0) {
			backgroundContainer.removeChild(backgroundSprite);
		}

		backgroundSprite = new PIXI.TilingSprite(backgroundTexture, displayWidth, displayHeight);
		backgroundContainer.addChild(backgroundSprite);
	};

	this.init = function() {
		document.body.getElementsByClassName("demo")[0].appendChild(renderer.view);
		renderer.view.style.position = 'absolute';

		for (var i in spriteSheetLoader.json.frames) {
			subtextures.push(PIXI.Texture.fromFrame(i));
		}

		stage.addChild(backgroundContainer);
		stage.addChild(objectContainer);
		stage.addChild(heroContainer);

		requestAnimFrame(update);

		this.resize(displayWidth, displayHeight);

	};

	var startPathfinding = function() {
		var closures = [];
		var finished = 0;
		for (var i = 0; i < heroes.length; i++) {
			if (side == 0) {
				heroes[i].destinationX = heroes[i].x + boardWidth - BOARD_PADDING;
			} else {
				heroes[i].destinationX = heroes[i].x - boardWidth + BOARD_PADDING;
			}
			
			heroes[i].destinationY = heroes[i].y;
			
			findPathForHero(heroes[i], function() {
				finished++;
				if (finished == heroes.length) {
					if (side == 0) {
						side = 1 ;
					} else {
						side = 0;
					}
					board = createGrid(boardWidth, boardHeight);
					populateBoardWithObjects(board);
					easystar.setGrid(board);
					startPathfinding();
				}
			});
		}
	};

	var findPathForHero = function(hero, callback) {
		easystar.findPath(hero.x, hero.y, hero.destinationX, hero.destinationY, function(path) {
			if (!path) {
				var id = setTimeout(function() {
					findPathForHero(hero, callback);
					delete intervals[id];
				},10);
				intervals[id] = true;
				return;
			}
			
			path.splice(0,1);

			if (path.length == 0) {
				delete intervals[id];
				clearInterval(id);
				callback();
				return;
			}

			var id = setInterval(function() {
				hero.x = path[0].x;
				hero.y = path[0].y;
				var offsetX = TILE_WIDTH - hero.sprite.width;
				var offsetY = TILE_HEIGHT - hero.sprite.height;
				var destinationX = hero.x * TILE_WIDTH + offsetX/2;
				var destinationY = hero.y * TILE_HEIGHT + offsetY/2;
				createjs.Tween.get(hero.sprite.position).to({x:destinationX, y:destinationY}, 100); //.call(handleComplete);
				path.splice(0,1);

				if (path.length == 0) {
					delete intervals[id];
					clearInterval(id);
					callback();
				}
			},100);
			intervals[id] = true;
		});
	}

	var update = function() {
		renderer.render(stage);
		requestAnimFrame(update);
		if (easystar) {
			easystar.calculate();
		}
	};
};
