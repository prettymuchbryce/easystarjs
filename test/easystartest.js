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

  it("It should prefer diagonal paths when they are faster", function(done) {
    var easyStar = new EasyStar.js();
    var grid = [];
    for (var i = 0; i < 20; i++) {
        grid[i] = [];
        for (var j = 0; j < 20; j++) {
          grid[i][j] = 0;
        }
    }
    easyStar.setGrid(grid);
    easyStar.setAcceptableTiles([0]);
    easyStar.enableDiagonals();

    easyStar.findPath(4, 4, 2, 2, function(path){
        expect(path).not.toBeNull();
        expect(path.length).toEqual(3);
        expect(path[1].x).toEqual(3);
        expect(path[1].y).toEqual(3);
        done();
    });

    easyStar.calculate();
  })

  it("It should handle tiles with a directional condition", function (done) {
      var easyStar = new EasyStar.js();
      var grid = [
          [0, 1, 0],
          [0, 0, 0],
          [0, 0, 0],
      ];
      easyStar.setGrid(grid);
      easyStar.setAcceptableTiles([0]);
      easyStar.setDirectionalCondition(1,1, [EasyStar.RIGHT, EasyStar.TOP_RIGHT]);
      easyStar.setDirectionalCondition(1,2, [EasyStar.LEFT]);

      easyStar.findPath(0, 0, 2, 0, function (path) {
          expect(path).not.toBeNull();
          expect(path[3]).toEqual({ x: 1, y: 2})
          expect(path.length).toEqual(7);
          done();
      });

      easyStar.calculate();
  })
});
