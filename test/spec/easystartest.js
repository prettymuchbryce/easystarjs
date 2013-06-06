describe("EasyStar.js", function() {

  beforeEach(function() { });

  it("It should find a path successfully.", function() {
	var acceptableTiles = [1];
	var easyStar = new EasyStar.js(acceptableTiles, onPathFound);
	var map = [[1,1,0,1,1],
		   [1,1,0,1,1],
		   [1,1,0,1,1],
		   [1,1,1,1,1],
		   [1,1,1,1,1]];

	easyStar.setGrid(map);

	easyStar.setPath(1,2,3,2);

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
	var acceptableTiles = [1];
	var easyStar = new EasyStar.js(acceptableTiles, onPathFound);
	var map = [[1,1,0,1,1],
		   [1,1,0,1,1],
		   [1,1,0,1,1],
		   [1,1,1,1,1],
		   [1,1,1,1,1]];

	easyStar.setGrid(map);

	easyStar.avoidAdditionalPoint(2,3);

	easyStar.setPath(1,2,3,2);

	easyStar.calculate();

	function onPathFound(path) {
		expect(path.length).toEqual(7);
		expect(path[0].x).toEqual(1);
		expect(path[0].y).toEqual(2);
		expect(path[2].x).toEqual(1);
		expect(path[2].y).toEqual(4);
	}
  });


});
