[<img src="http://s3.amazonaws.com/easystar/logo.png">](http://easystarjs.com/)


#### HTML5/Javascript Pathfinding Library #####

[Click here for a demonstration](http://easystarjs.com/)

## Installation
* **Web:** Find the minified file in the __/bin__ directory
* **node.js:** `npm install easystarjs`
* **Phaser:** see [Phaser Plugin](https://github.com/appsbu-de/phaser_plugin_pathfinding)
* **Bower:** `bower install easystarjs`

## Description 
easystar.js is an asynchronous A* pathfinding API written in Javascript for use in your HTML5 games and interactive projects. The goal of this project is to make it easy and fast to implement performance conscious pathfinding. 

## Features

* Calculates asynchronously for better overall performance
* Simple API
* Small. ~7kb
* Use it with any existing Javascript Framework
* TypeScript support

## API

#### Main Methods

```javascript
var easystar = new EasyStar.js();
```
```javascript
easystar.setGrid(twoDimensionalArray);
```
```javascript
easystar.setAcceptableTiles(arrayOfAcceptableTiles);
```
```javascript
easystar.findPath(startX, startY, endX, endY, callback);
```
```javascript
easystar.calculate();
```

#### Additional Features

```javascript
easystar.setIterationsPerCalculation(someValue);
```
```javascript
easystar.avoidAdditionalPoint(x, y);
```
```javascript
easystar.enableDiagonals();
```
```javascript
easystar.enableCornerCutting();
```
```javascript
easystar.setAdditionalPointCost(x, y, cost);
```
```javascript
easystar.setTileCost(tileType, multiplicativeCost);
```
```javascript
easystar.enableSync();
```
```javascript
easystar.setDirectionalCondition(x, y, [EasyStar.TOP, EasyStar.LEFT]); // only accessible from the top and left
```
```javascript
var instanceId = easystar.findPath(startX, startY, endX, endY, callback);
// ...
easystar.cancelPath(instanceId);
```

## Usage

First create EasyStar.
```javascript
// for web
var easystar = new EasyStar.js();

// for node.js
var easystarjs = require('easystarjs');
var easystar = new easystarjs.js();
```

Create a grid, or tilemap. You may have made this with a level editor, or procedurally. Let's keep it simple for this example.
```javascript
var grid = [[0,0,1,0,0],
	        [0,0,1,0,0],
	        [0,0,1,0,0],
	        [0,0,1,0,0],
	        [0,0,0,0,0]];
```

Set our grid.
```javascript	
easystar.setGrid(grid);
```
Set tiles which are "walkable".
```javascript
easystar.setAcceptableTiles([0]);
```

Find a path.
```javascript
easystar.findPath(0, 0, 4, 0, function( path ) {
	if (path === null) {
		alert("Path was not found.");
	} else {
		alert("Path was found. The first Point is " + path[0].x + " " + path[0].y);
	}
});
```

EasyStar will not yet start calculating my path. 

In order for EasyStar to actually start calculating, I must call the calculate() method.

You should call `easystar.calculate()` on a ticker, or setInterval.

If you have a large grid, then it is possible that these calculations could slow down the browser. 
For this reason, it might be a good idea to give EasyStar a smaller `iterationsPerCalculation` value via 

```javascript
easystar.setIterationsPerCalculation(1000);
```

It may take longer for you to find a path this way, but you won't completely halt your game trying to find one.
The only thing left to do now is to calculate the path.

```javascript
easystar.calculate();
```

## License

easystar.js is licensed under the MIT license. You may use it for commercial use.

## Running the demo locally

In order to run the demo you will need node.js, and npm installed.

```sh
git clone https://github.com/prettymuchbryce/easystarjs.git

cd easystarjs/demo

npm install

node app.js
```

Open your browser to 127.0.0.1:3000 to see the example.

## Testing

`npm run test`

## Support

If you have any questions, comments, or suggestions please open an issue.
