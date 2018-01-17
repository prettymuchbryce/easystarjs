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

  it("It should be able to cancel a path.", function(done) {
    var easyStar = new EasyStar.js();
    var map = [[1,1,0,1,1],
               [1,1,0,1,1],
               [1,1,0,1,1],
               [1,1,1,1,1],
               [1,1,1,1,1]];

    easyStar.setGrid(map);

    easyStar.setAcceptableTiles([1]);

    var id = easyStar.findPath(1,2,3,2,onPathFound);

    easyStar.cancelPath(id);

    easyStar.calculate();

    function onPathFound(path) {
        fail("path wasn't cancelled");
    }

    setTimeout(done, 0);
  });

  it("Paths should have different IDs.", function() {
    var easyStar = new EasyStar.js();
    var map = [[1,1,0,1,1],
               [1,1,0,1,1],
               [1,1,0,1,1],
               [1,1,1,1,1],
               [1,1,1,1,1]];

    easyStar.setGrid(map);

    easyStar.setAcceptableTiles([1]);

    var id1 = easyStar.findPath(1,2,3,2,onPathFound);
    var id2 = easyStar.findPath(3,2,1,2,onPathFound);
    expect(id1).toBeGreaterThan(0);
    expect(id2).toBeGreaterThan(0);
    expect(id1).not.toEqual(id2);

    function onPathFound(path) {
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
      easyStar.enableDiagonals();
      easyStar.setAcceptableTiles([0]);
      easyStar.setDirectionalCondition(2, 1, [EasyStar.TOP]);
      easyStar.setDirectionalCondition(1, 2, [EasyStar.TOP_RIGHT]);
      easyStar.setDirectionalCondition(2, 2, [EasyStar.LEFT]);
      easyStar.setDirectionalCondition(1, 1, [EasyStar.BOTTOM_RIGHT]);
      easyStar.setDirectionalCondition(0, 1, [EasyStar.RIGHT]);
      easyStar.setDirectionalCondition(0, 0, [EasyStar.BOTTOM]);

      easyStar.findPath(2, 0, 0, 0, function (path) {
          expect(path).not.toBeNull();
          expect(path.length).toEqual(7);
          expect(path[3]).toEqual({ x: 2, y: 2})
          done();
      });

      easyStar.calculate();
  })

  it("It should handle tiles with a directional condition and no corner cutting", function (done) {
      var easyStar = new EasyStar.js();
      easyStar.disableCornerCutting();
      var grid = [
          [0, 1, 0],
          [0, 0, 0],
          [0, 0, 0],
      ];
      easyStar.setGrid(grid);
      easyStar.enableDiagonals();
      easyStar.setAcceptableTiles([0]);
      easyStar.setDirectionalCondition(2, 1, [EasyStar.TOP]);
      easyStar.setDirectionalCondition(1, 1, [EasyStar.RIGHT]);
      easyStar.setDirectionalCondition(0, 1, [EasyStar.RIGHT]);
      easyStar.setDirectionalCondition(0, 0, [EasyStar.BOTTOM]);

      easyStar.findPath(2, 0, 0, 0, function (path) {
          expect(path).not.toBeNull();
          expect(path.length).toEqual(5);
          expect(path[2]).toEqual({ x: 1, y: 1})
          done();
      });

      easyStar.calculate();
  })
});
