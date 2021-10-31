import { Cell } from './Cell.js';
export class Game {
    constructor(size) {
        this.size = size; // Поле квадратное. Это размер стороны
        this.field = []; // 1D Array of Cells
        this.square = []; // 2D Array of Cells
        this.isDone = false; // Игра завершена?

        this.TOTAL_MINES = +(this.size ** 2 / 8).toFixed(0); // Кол-во мин на поле
        this.totalFlags = 0; // Кол-во расставленных флагов
        this.totalFlagedMines = 0; // Кол-во мин под флагом

        document.querySelector(
            '#container'
        ).style.gridTemplateColumns = `repeat(${this.size}, 30px);`;

        let index = 0;
        for (let row = 0; row <= this.size - 1; ++row) {
            for (let col = 0; col <= this.size - 1; ++col) {
                this.field.push(new Cell(row, col, index));
                index++;

                // Создание поля(ячеек) на стороне клиента -->
                let cellCreate = document.createElement('div');
                let cellDOM = document
                    .querySelector('#container')
                    .appendChild(cellCreate);
                cellDOM.classList.add('cell', 'closed', 'noSelect'); // Почему noSelect не работает всегда - без понятия
                cellDOM.dataset.row = row;
                cellDOM.dataset.col = col;
            }
        }
        // Разбиение клеток на строки
        while (this.field.length) {
            this.square.push(this.field.splice(0, this.size));
        }
        console.log(`Game field filled by Cell objects:`);
        console.log(this.square);
    }

    throwLoseGame() {
        // Вызывается победа
        // ...
        alert(
            `Oops, you have lost.\n Guessed ${this.totalFlagedMines} mines out of ${this.TOTAL_MINES}`
        );
        this.isDone = true;
    }

    throwWinGame() {
        // Вызывается проигрыш
        // ...
        alert('Winner Winner Chicken Dinner ');
        this.isDone = true;
    }

    placeMines() {
        // Расставляет мины по полю в рандомном порядке, сомнительная эффективность, но зато работает))
        let counter = this.TOTAL_MINES;
        while (counter > 0) {
            let row = Game.randomInteger(0, this.size - 1);
            let col = Game.randomInteger(0, this.size - 1);
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
            // console.log(row, col, this.square[row][col]);
            if (this.square[row][col].isMine === false) {
                // console.log('Сработал IF');
                this.square[row][col].setMine();
                for (let [row, col] of around) {
                    // console.log('always ' + row + col);
                    if (
                        row >= 0 &&
                        col >= 0 &&
                        row <= this.size - 1 &&
                        col <= this.size - 1
                    ) {
                        // console.log('if ' + row + col);
                        // console.log(row, col);
                        this.square[row][col].minesAround++;
                    }
                }
                counter--;
            }
        }
    }
    openAround(row, col) {
        // Если вокруг не правильно расставленны флаги не всегда корректо работает
        // Вроде поправил, как затестить точно - хз
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
        let currentRow = row;
        let currentCol = col;
        // console.log(`Вызвана на ${currentRow} ${currentCol}`);
        for (let [row, col] of around) {
            let currentDOM = document.querySelector(
                `[data-row='${row}'][data-col='${col}']`
            );
            let clickedDOM = document.querySelector(
                `[data-row='${currentRow}'][data-col='${currentCol}']`
            );
            if (
                // Если существует
                row >= 0 &&
                col >= 0 &&
                row <= this.size - 1 &&
                col <= this.size - 1
            ) {
                // .. Переделать в switch case?
                if (
                    this.square[currentRow][currentCol].minesAround > 0 &&
                    (currentDOM.classList.contains('closed') ||
                        clickedDOM.classList.contains('closed'))
                ) {
                    document
                        .querySelector(
                            `[data-row='${currentRow}'][data-col='${currentCol}']`
                        )
                        .classList.remove('closed');
                    // console.log('Первый ИФ');
                    break;
                } else if (
                    this.square[currentRow][currentCol].minesAround == 0 &&
                    currentDOM.classList.contains('closed')
                ) {
                    clickedDOM.classList.remove('closed');
                    currentDOM.classList.remove('closed');
                    this.openAround(row, col, currentDOM);
                } else if (
                    +this.square[row][col].minesAround > 0 &&
                    currentDOM.classList.contains('closed')
                    // this.square[row][col].isMine
                ) {
                    currentDOM.classList.remove('closed');
                    // this.openAround(row, col, targetDOM);
                } else if (
                    this.square[row][col].minesAround == 0 &&
                    currentDOM.classList.contains('closed')
                ) {
                    currentDOM.classList.remove('closed');
                    this.openAround(row, col, currentDOM);
                } else if (clickedDOM.classList.contains('closed')) {
                    clickedDOM.classList.remove('closed');
                } else {
                    console.log('NOTHING');
                }
            }
        }
    }
    static randomInteger(min, max) {
        // получить случайное число от (min-0.5) до (max+0.5)
        // Для размещения мин
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
    }
    // Ниже то, что использовалось ранее, но удалять не хочется
    countMinesAround(row, col) {
        // Считает мины вокруг клетки
        // Вроде больше не исполбзуется, потому что считаю сразу при расстановке мин
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
    countMines() {
        // Аналогично предыдущему
        for (let rows of this.square) {
            for (let cell of rows) {
                let row = cell.row;
                let col = cell.col;
                this.countMinesAround(row, col);
            }
        }
    }

    printField() {
        // debug
        return this.field;
    }
}
