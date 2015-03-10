
var Sudoku = (function() {
    var _instance, _game;    
    function init() {
        _game = new Game();
        
        return {
            generateEmptyBoard: function(numbers) {
                return _game.buildBoard(numbers);
            },
            checkSolution: function() {
                return _game.validateSolution();
            }
        };
    }

    function Game() {
        return this;
    }

    Game.prototype = {
        buildBoard: function(numbers) {
            var td, tr;
            var table = $('<table>').addClass('sudoku-board');
            cellMatrix = {};
            var c = 0;
            console.log(numbers);
            for(var i = 0; i < 9; i++ ) {
                tr = $('<tr>');
                cellMatrix[i] = {};
                for(var j = 0; j < 9; j++) {
                    if(numbers[c] == 0) {
                        cellMatrix[i][j] = $('<input>').attr('maxlength', 1).attr('id', i + '_' +j);
                    }
                    else {
                        cellMatrix[i][j] = $('<input>').attr('maxlength', 1)
                                                .attr('id', i + '_' +j).
                                                val(numbers[c])
                                                .attr('readonly', 'readonly');
                    }

                    td = $('<td>').append(cellMatrix[i][j]);

                    sectIDi = Math.floor( i / 3 );
                    sectIDj = Math.floor( j / 3 );
                    td.addId
                    if ( ( sectIDi + sectIDj ) % 2 === 0 ) {
                        td.addClass( 'color-section-one' );
                    } else {
                        td.addClass( 'color-section-two' );
                    }

                    tr.append(td);
                    c++;
                }
                table.append(tr);
            }
            return table;
        },

        // hard-coded solution for now, may or may not implement generater and solver.
        validateSolution: function(solution) {
            solution = '872593614354681792169274358745926783983715246621348975238157469497862531516439827'
            var userInputs = "";
            for(var i = 0; i < 9; i++) {
                for(var j = 0; j < 9; j++) {
                    var current = '#' + i + '_' + j;
                    var value = $(current).val();
                    userInputs = userInputs + value;
                }
            }
            return userInputs == solution;
        }
    }

    return {

        getInstance: function() {
            if(!_instance) {
                _instance = init();
                console.log('Creating instance');
            }
            return _instance;
        } 
    };
})(); 



