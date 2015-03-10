var Player = function(id, name) {
    var name = name,
        id = id,
        opponent = undefined,
        grid = undefined,
        progress = 0;

    var getName = function() {
        return name;
    };

    var getId = function () {
        return id;
    };

    var getOpponent = function() {
        return opponent;
    };

    var setOpponent = function(newOpponent) {
        opponent = newOpponent;
    };

    var setGrid = function(newGrid) {
        grid = newGrid;
    };

    var getGrid = function() {
        return grid;
    };

    var setProgress = function(newProgress) {
        progress = newProgress;
    };

    var getProgress = function() {
        return progress;
    };

    return {
        getName : getName,
        getOpponent : getOpponent,
        setOpponent : setOpponent,
        setGrid : setGrid,
        getGrid : getGrid,
        setProgress : setProgress,
        getProgress : getProgress,
        getId : getId
    }
};

module.exports = Player;