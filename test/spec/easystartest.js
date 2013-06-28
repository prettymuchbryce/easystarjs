describe("EasyStar.js", function() {

  beforeEach(function() { });

  it("It should find a path successfully.", function() {
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
		expect(path.length).toEqual(5);
		expect(path[0].x).toEqual(1);
		expect(path[0].y).toEqual(2);
		expect(path[2].x).toEqual(2);
		expect(path[2].y).toEqual(3);
	}
  });

  it("It should be able to avoid a separate point successfully.", function() {
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
		expect(path.length).toEqual(7);
		expect(path[0].x).toEqual(1);
		expect(path[0].y).toEqual(2);
		expect(path[2].x).toEqual(1);
		expect(path[2].y).toEqual(4);
	}
  });

  it("It should work with diagonals", function() {
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
	}
  });


});
