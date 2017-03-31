var easyStar;
function onPathFound() { }
function setup10x10maze() {
    easyStar = new EasyStar.js();
    var map = [
        [1,1,1,1,1,0,1,0,1,1],
        [0,0,0,0,1,0,1,0,1,0],
        [1,1,1,1,1,1,1,0,1,1],
        [1,0,1,0,0,0,0,0,0,1],
        [1,0,1,1,0,1,1,1,0,1],
        [1,0,0,0,0,1,0,1,0,1],
        [1,1,1,1,0,1,0,1,0,1],
        [0,0,0,1,0,1,0,1,1,1],
        [0,1,1,1,0,1,0,1,0,1],
        [1,1,0,1,1,1,0,1,1,1]
    ];

    easyStar.setGrid(map);
    easyStar.setAcceptableTiles([1]);
    easyStar.enableSync();
}
function setup10x10field() {
    easyStar = new EasyStar.js();
    var map = [
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,0,0,1,1,1,1],
        [1,1,1,1,0,0,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1],
        [1,1,1,1,1,1,1,1,1,1]
    ];

    easyStar.setGrid(map);
    easyStar.setAcceptableTiles([1]);
    easyStar.enableSync();
}
function setup1000x1000field() {
    easyStar = new EasyStar.js();
    var map = [];
    for (var y = 0; y < 1000; y ++) {
        var row = [];
        for (var x = 0; x < 1000; x ++) {
            row.push(1);
        }
        map.push(row);
    }

    easyStar.setGrid(map);
    easyStar.setAcceptableTiles([1]);
    easyStar.enableSync();
}

suite('EasyStar.js', function() {
    benchmark('10x10 maze no diagonals', {
        fn: function() {
            easyStar.findPath(0,0,9,0,onPathFound);
            easyStar.calculate();
        },
        setup: function() {
            setup10x10maze();
            easyStar.disableDiagonals();
            easyStar.disableCornerCutting();
        }
    });
    benchmark('10x10 maze diagonals but no corner-cutting', {
        fn: function() {
            easyStar.findPath(0,0,9,0,onPathFound);
            easyStar.calculate();
        },
        setup: function() {
            setup10x10maze();
            easyStar.enableDiagonals();
            easyStar.disableCornerCutting();
        }
    });
    benchmark('10x10 maze diagonals and corner-cutting', {
        fn: function() {
            easyStar.findPath(0,0,9,0,onPathFound);
            easyStar.calculate();
        },
        setup: function() {
            setup10x10maze();
            easyStar.enableDiagonals();
            easyStar.enableCornerCutting();
        }
    });
    benchmark('10x10 field no diagonals', {
        fn: function() {
            easyStar.findPath(0,0,9,9,onPathFound);
            easyStar.calculate();
        },
        setup: function() {
            setup10x10field();
            easyStar.disableDiagonals();
            easyStar.disableCornerCutting();
        }
    });
    benchmark('10x10 field diagonals but no corner-cutting', {
        fn: function() {
            easyStar.findPath(0,0,9,9,onPathFound);
            easyStar.calculate();
        },
        setup: function() {
            setup10x10field();
            easyStar.enableDiagonals();
            easyStar.disableCornerCutting();
        }
    });
    benchmark('10x10 field diagonals and corner-cutting', {
        fn: function() {
            easyStar.findPath(0,0,9,9,onPathFound);
            easyStar.calculate();
        },
        setup: function() {
            setup10x10field();
            easyStar.enableDiagonals();
            easyStar.enableCornerCutting();
        }
    });
    benchmark('1000x1000 field no diagonals', {
        fn: function() {
            easyStar.findPath(0,0,999,999,onPathFound);
            easyStar.calculate();
        },
        setup: function() {
            setup1000x1000field();
            easyStar.disableDiagonals();
            easyStar.disableCornerCutting();
        }
    });
    benchmark('1000x1000 field diagonals but no corner-cut', {
        fn: function() {
            easyStar.findPath(0,0,999,999,onPathFound);
            easyStar.calculate();
        },
        setup: function() {
            setup1000x1000field();
            easyStar.enableDiagonals();
            easyStar.disableCornerCutting();
        }
    });
    benchmark('1000x1000 field diagonals and corner-cut', {
        fn: function() {
            easyStar.findPath(0,0,999,999,onPathFound);
            easyStar.calculate();
        },
        setup: function() {
            setup1000x1000field();
            easyStar.enableDiagonals();
            easyStar.enableCornerCutting();
        }
    });
});