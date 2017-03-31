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
});