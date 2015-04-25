describe("EasyStar.js", function() {

  beforeEach(function() { });

  it("It should find a path successfully with corner cutting enabled.", function(done) {
	var easyStar = new EasyStar.js();
	easyStar.enableDiagonals();
	var map = [[1,0,0,0,0],
			   [0,1,0,0,0],
			   [0,0,1,0,0],
			   [0,0,0,1,0],
			   [0,0,0,0,1]];

	easyStar.setGrid(map);

	easyStar.enableCornerCutting();

	easyStar.setAcceptableTiles([1]);

	easyStar.findPath(0,0,4,4,onPathFound);

	easyStar.calculate();

	function onPathFound(path) {
		expect(path).not.toBeNull();
		expect(path.length).toEqual(5);
		expect(path[0].x).toEqual(0);
		expect(path[0].y).toEqual(0);
		expect(path[3].x).toEqual(3);
		expect(path[3].y).toEqual(3);
		done()
	}
  });

  it("It should fail to find a path successfully with corner cutting disabled.", function(done) {
	var easyStar = new EasyStar.js();
	easyStar.enableDiagonals();
	var map = [[1,0,0,0,0],
			   [0,1,0,0,0],
			   [0,0,1,0,0],
			   [0,0,0,1,0],
			   [0,0,0,0,1]];

	easyStar.setGrid(map);

	easyStar.disableCornerCutting();

	easyStar.setAcceptableTiles([1]);

	easyStar.findPath(0,0,4,4,onPathFound);

	easyStar.calculate();

	function onPathFound(path) {
		expect(path).toBeNull();
		done();
	}
  });

  it("It should find a path successfully.", function(done) {
	var easyStar = new EasyStar.js();
	var map = [[1,1,0,1,1],
			   [1,1,0,1,1],
			   [1,1,0,1,1],
			   [1,1,1,1,1],
			   [1,1,1,1,1]];

	easyStar.setGrid(map);

	easyStar.setAcceptableTiles([1]);

	easyStar.findPath(1,2,3,2,onPathFound);

	easyStar.calculate();

	function onPathFound(path) {
		expect(path).not.toBeNull();
		expect(path.length).toEqual(5);
		expect(path[0].x).toEqual(1);
		expect(path[0].y).toEqual(2);
		expect(path[2].x).toEqual(2);
		expect(path[2].y).toEqual(3);
		done();
	}
  });

  it("It should be able to avoid a separate point successfully.", function(done) {
	var easyStar = new EasyStar.js();
	var map = [[1,1,0,1,1],
			   [1,1,0,1,1],
			   [1,1,0,1,1],
			   [1,1,1,1,1],
			   [1,1,1,1,1]];

	easyStar.setGrid(map);

	easyStar.avoidAdditionalPoint(2,3);

	easyStar.setAcceptableTiles([1]);

	easyStar.findPath(1,2,3,2,onPathFound);

	easyStar.calculate();

	function onPathFound(path) {
		expect(path).not.toBeNull();
		expect(path.length).toEqual(7);
		expect(path[0].x).toEqual(1);
		expect(path[0].y).toEqual(2);
		expect(path[2].x).toEqual(1);
		expect(path[2].y).toEqual(4);
		done();
	}
  });

  it("It should work with diagonals", function(done) {
	var easyStar = new EasyStar.js();
	easyStar.enableDiagonals();
	var map = [[1,1,1,1,1],
			   [1,1,1,1,1],
			   [1,1,1,1,1],
			   [1,1,1,1,1],
			   [1,1,1,1,1]];

	easyStar.setGrid(map);

	easyStar.setAcceptableTiles([1]);

	easyStar.findPath(0,0,4,4,onPathFound);

	easyStar.calculate();

	function onPathFound(path) {
		expect(path).not.toBeNull();
		expect(path.length).toEqual(5);
		expect(path[0].x).toEqual(0);
		expect(path[0].y).toEqual(0);
		expect(path[1].x).toEqual(1);
		expect(path[1].y).toEqual(1);
		expect(path[2].x).toEqual(2);
		expect(path[2].y).toEqual(2);
		expect(path[3].x).toEqual(3);
		expect(path[3].y).toEqual(3);
		expect(path[4].x).toEqual(4);
		expect(path[4].y).toEqual(4);
		done();
	}
  });

  it("It should move in a straight line with diagonals", function(done) {
	var easyStar = new EasyStar.js();
	easyStar.enableDiagonals();
	var map = [[1,1,1,1,1,1,1,1,1,1],
			   [1,1,0,1,1,1,1,0,1,1],
			   [1,1,1,1,1,1,1,1,1,1],
			   [1,1,1,1,1,1,1,1,1,1],
			   [1,1,1,1,1,1,1,1,1,1],
			   [1,1,1,1,1,1,1,1,1,1],
			   [1,1,1,1,1,1,1,1,1,1],
			   [1,1,1,1,1,1,1,1,1,1],
			   [1,1,1,1,1,1,1,1,1,1],
			   [1,1,1,1,1,1,1,1,1,1]];

	easyStar.setGrid(map);

	easyStar.enableDiagonals();

	easyStar.setAcceptableTiles([1]);

	easyStar.findPath(0,0,9,0,onPathFound);

	easyStar.calculate();

	function onPathFound(path) {
		expect(path).not.toBeNull();
		for (var i = 0; i < path.length; i++) {
			expect(path[i].y).toEqual(0);
		}
		done();
	}
  });


  it("It should prefer straight paths when possible", function(done) {
	var easyStar = new EasyStar.js();
	easyStar.enableDiagonals();
	var map = [];
	for (i = 0; i < 20; i++) {
		map[i] = [];
		for (j = 0; j < 20; j++) {
			map[i][j] = 0;
		}
	}

	for (var i = 5; i < 10; i++) {
		map[12][i] = 1;
	}

	for (var i = 12; i < 17; i++) {
		map[12][i] = 1;
	}

	easyStar.setGrid(map);

	easyStar.enableDiagonals();

	easyStar.setAcceptableTiles([0]);

	easyStar.setTileCost([0], 1);

	easyStar.findPath(18, 13, 4, 12, onPathFound);

	easyStar.calculate();

	function onPathFound(path) {
		expect(path).not.toBeNull();
		expect(path[0].x).toEqual(18);
		expect(path[0].y).toEqual(13);
		expect(path[1].x).toEqual(17);
		expect(path[1].y).toEqual(13);
		expect(path[2].x).toEqual(16);
		expect(path[2].y).toEqual(13);
		expect(path[3].x).toEqual(15);
		expect(path[3].y).toEqual(13);
		expect(path[4].x).toEqual(14);
		expect(path[4].y).toEqual(13);
		expect(path[5].x).toEqual(13);
		expect(path[5].y).toEqual(13);
		expect(path[6].x).toEqual(12);
		expect(path[6].y).toEqual(13);
		expect(path[7].x).toEqual(11);
		expect(path[7].y).toEqual(13);
		expect(path[8].x).toEqual(10);
		expect(path[8].y).toEqual(13);
		expect(path[9].x).toEqual(9);
		expect(path[9].y).toEqual(13);
		expect(path[10].x).toEqual(8);
		expect(path[10].y).toEqual(13);
		expect(path[11].x).toEqual(7);
		expect(path[11].y).toEqual(13);
		expect(path[12].x).toEqual(6);
		expect(path[12].y).toEqual(13);
		expect(path[13].x).toEqual(5);
		expect(path[13].y).toEqual(13);
		expect(path[14].x).toEqual(4);
		expect(path[14].y).toEqual(12);
		done();
	}
  });
  
  
  it("It should return empty path when start and end are the same tile.", function(done) {
	var easyStar = new EasyStar.js();
	var map = [[1,1,0,1,1],
			   [1,1,0,1,1],
			   [1,1,0,1,1],
			   [1,1,1,1,1],
			   [1,1,1,1,1]];

	easyStar.setGrid(map);

	easyStar.setAcceptableTiles([1]);

	easyStar.findPath(1,2,1,2,onPathFound);

	easyStar.calculate();

	function onPathFound(path) {
		expect(path).not.toBeNull();
		expect(path.length).toEqual(0);
		done();
	}
  });
  
/*
	FIXME #17

  it("It should prefer straight paths when possible", function(done) {
	var easyStar = new EasyStar.js();
	easyStar.setAcceptableTiles([0]);
	easyStar.enableDiagonals();
	easyStar.setGrid([
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0]
	]);

	easyStar.findPath(0, 1, 2, 1, function(path){
		expect(path).not.toBeNull();
		expect(path[1].x).toEqual(1);
		expect(path[1].y).toEqual(1);
		done();
	});

	easyStar.calculate();
  });
*/

});
