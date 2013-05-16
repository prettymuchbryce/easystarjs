# EasyStar.js

[![Launch Example](http://prettymuchbryce.com/easystarjs/easystar.jpg)](http://prettymuchbryce.com/easystarjs/example/example.html)

A* is an algorithm for finding the shortest path between two points. It is very useful in game development. Any tile-based game that requires this kind of movement will probably utilize some form of A*. Tower defense games, city-building games, roguelikes, the list goes on.

Thus EasyStar.js is a simple A* API written in Javascript. 

## Some Features of EasyStar.js

* The ability to spread out your calculations over multiple calls. EasyStar.js lets you specify how many calculations should be performed each call.
* The ability to add separate points to avoid, outside of those that are avoided based on tile type.
* The ability to specify which tile types are walkable, and which are unwalkable.
* EasyStar calls a callback if it finds your path, or if there is no possible path.
* Easy!

## Important Public Methods

	var easyStar = new EasyStar.js(acceptableTiles,callback);

	easyStar.setGrid(twoDimensionalArray);

	easyStar.setPath(startX,startY,endX,endY);

	easyStar.calculate();


## Getting Started

To use EasyStar.js, first create a grid that represents the map in your game. Maybe you have made this map with a level editor, or by procedural generation. Here we create a hard-coded map.

	//Create our TileMap
	var grid = [];
	for (var y = 0; y < MAP_HEIGHT; y++) grid.push([]);
	grid[0].push(0,0,1,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0);
	grid[1].push(0,2,2,2,2,2,0,2,2,2,2,2,2,2,2,2,2,2,2,0);
	grid[2].push(0,2,2,2,2,2,0,2,2,2,2,0,2,2,2,2,2,2,2,0);
	grid[3].push(0,2,2,2,2,2,0,2,2,2,2,0,2,2,2,3,3,3,2,0);
	grid[4].push(0,2,2,2,2,2,0,2,2,2,2,0,2,2,2,3,3,3,2,2);
	grid[5].push(0,2,2,2,2,2,0,2,2,2,2,0,2,2,2,3,3,3,2,0);
	grid[6].push(0,2,2,2,2,2,0,2,2,2,2,0,2,2,2,2,2,2,2,0);
	grid[7].push(0,2,0,0,1,0,0,0,2,2,2,0,0,0,2,2,2,2,2,0);
	grid[8].push(0,2,2,2,2,2,2,0,2,2,2,2,2,0,2,2,2,2,2,0);
	grid[9].push(0,2,2,2,2,2,2,0,0,1,0,0,0,0,0,1,0,0,2,0);
	grid[10].push(0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0);
	grid[11].push(0,2,2,2,2,2,2,2,2,2,2,0,0,1,0,0,2,0,0,0);
	grid[12].push(0,2,2,2,2,2,2,2,2,2,2,0,2,2,2,2,2,2,2,0);
	grid[13].push(0,2,2,2,2,2,2,2,2,2,2,0,2,2,2,2,2,2,2,0);
	grid[14].push(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);

Next you should create a list of tiles "walkable". In our case, I want the tiles 2 and 3 to be "walkable", but all other values should not be.

	var acceptableTiles = [2,3];

Next I want to setup my callback for when a path is found.
	
	function onPathFound(path) {
		if (path==null) {
			alert("Path was not found.");
		} else {
			alert("Path was found. The first Point is " + path[0].x + " " + path[0].y);
		}
	}
Now I have everything I need to create my EasyStar instance.

	var easyStar = new EasyStar.js(acceptableTiles,onPathFound);

I also need to let EasyStar.js know what my grid looks like, so I need to call the setGrid method.

	easyStar.setGrid(grid);

We are getting close now!

All I need to do is give it a path that I want. In the case of my example, I give EasyStar a path every time the user clicks. Let us say that I want to find a path from the upper left hand corner of the map, to a position a few tiles to the right.

	easyStar.setPath(0,0,3,0); //startX, startY, endX, endY

EasyStar.js will not yet start calculating my path. In order for EasyStar to actually start calculating, I must call the calculate() method. It is good practice to call the calculate() method on a setInterval method.

If you have a large collision map, then it is possible that these calculations could slow down your page. For this reason, it might be a good idea to give EasyStar.js a smaller iterationsPerCalculations value via 

	easyStar.setIterationsPerCalculation(value); 

This way it may take longer for you to find a path, but you won't completely halt your game trying to find a path.

In this example, lets just assume that we don't have this problem, and that our collisionGrid is small, and that our path is easy to find -- which it is!

The only thing left to do is to calculate the path.

	easyStar.calculate();

..and we're done!

## License

EasyStar.js is licensed under the MIT license, which means you can use it for almost anything, even commercial use.

## Running the example locally

In order to run the example do the following.

	git clone https://github.com/prettymuchbryce/easystarjs.git

	cd easystarjs/example

	npm install

	node app.js

Now open your browser to 127.0.0.1:3000 to see the example.

## Roadmap

* Unit tests with Mocha and Chai
* Friendlier API
* Tiles with varying costs
* Optional diagonals
* Node support ?

## Support

If you have any questions, comments, or suggestions please feel free to open an issue.