![easystar.js logo](http://easystar.nodejitsu.com/assets/logo.png)

#### HTML5 Pathfinding Library #####

easystar.js is a asynchronous A* pathfinding API written in Javascript for use in your HTML5 games. The aim of the project is to make it easy and fast to implement performance conscious pathfinding into your project. 

Find the minified file in the __/bin__ folder.

## Demo

[Demo](http://easystar.nodejitsu.com)

## Features

* Simple API
* Asynchronous. You can set the number of caculations to perform per frame.
* Add separate points to avoid, outside of those that are avoided based on tile type.

## API

`var easyStar = new EasyStar.js();`

`easyStar.setGrid(twoDimensionalArray);`

`easyStar.setAcceptableTiles(arrayOfAcceptableTiles);`

`easyStar.setIterationsPerCalculation(someValue);`

`easyStar.avoidAdditionalPoint(x, y);`

`easyStar.setPath(startX, startY, endX, endY, callback);`

`easyStar.calculate();`


## Usage

First create EasyStar.
	
	var easystar = new EasyStar.js();

Create a grid, or tilemap. You may have made this with a level editor, or procedurally. Let's keep it simple for this example.

	var grid = [[0,0,1,0,0],
		   	    [0,0,1,0,0],
		        [0,0,1,0,0],
		        [0,0,1,0,0],
		        [0,0,0,0,0]];

Set our grid.
	
	easystar.setGrid(grid);

Set tiles which are "walkable".
	
	easystar.setAcceptableTiles([1]);

Find a path.
	
	easystar.findPath(0, 0, 4, 0, function( path ) ) {
		if (path === null) {
			alert("Path was not found.");
		} else {
			alert("Path was found. The first Point is " + path[0].x + " " + path[0].y);
		}
	});

EasyStar will not yet start calculating my path. 

In order for EasyStar to actually start calculating, I must call the calculate() method.

You should call `easystar.calculate()` on a ticker, or setInterval.

If you have a large grid, then it is possible that these calculations could slow down the browser. 
For this reason, it might be a good idea to give EasyStar a smaller `iterationsPerCalculation` value via 

	easystar.setIterationsPerCalculation(1000); 

It may take longer for you to find a path this way, but you won't completely halt your game trying to find one.
The only thing left to do now is to calculate the path.

	easystar.calculate();

## License

EasyStar.js is licensed under the MIT license. You may use it for commercial use.

## Running the example locally

In order to run the example you will need node.js, and npm installed.

	git clone https://github.com/prettymuchbryce/easystarjs.git

	cd easystarjs/example

	npm install

	node app.js

Now open your browser to 127.0.0.1:3000 to see the example.

## Roadmap

* Better test coverage
* Tiles with varying costs
* Optional diagonals

## Support

If you have any questions, comments, or suggestions please feel free to open an issue.
