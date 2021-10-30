class Game {
    constructor(difficult) {
        switch (difficult) {
            case 'easy':
                this.field = new Array(9);
                this.field.fill(new Array(9));
                this.totalMines = 10;
                for (let row of this.field) {
                    row.fill(0);
                    // row.fill(new Cell());
                }
                break;
            case 'medium':
                break;
            case 'hard':
                break;
        }
        this.totalFlags = 0;
        this.totalFlagedMines = 0;

        // game win if totalFlagedMines === totalMines
        // game lose if currentTurn == cell.isMine
    }
    static throwLoseGame() {
        // Вызывается победа
        // ...
        console.log('Ты проигал! Ха-ха-ха!');
    }
    static throwWinGame() {
        // Вызывается проигрыш
        // ...
        console.log('Ты победил!');
    }
    makeMove(row, col) {
        // Игрок пытается открыть клетку
        let current = this.field[row][col];
        if (current.isMine()) throwLoseGame();

        current.openCell();
    }
    createGameField() {} // ?? Вывести поле на экран?
    countMinesAround(row, col) {
        // Считает мины вокруг клетки
        let counter = 0;
        let around = [
            [row - 1, col - 1],
            [row - 1, col],
            [row - 1, col + 1],
            [row, col - 1],
            [row, col + 1],
            [row + 1, col - 1],
            [row + 1, col],
            [row + 1, col + 1],
        ];
        for (let [row, col] of around) {
            // ...
            if (this.field[row][col].isMine) counter++;
        }
        console.log(counter);
        return counter;
    }
}

let game = new Game();
console.log(game);
game.countMinesAround(5, 5);
// game.field[row][col]
