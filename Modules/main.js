// import { Cell } from './Cell.js';
import { Game } from './Game.js';

let radiobuttons = document.querySelectorAll('input[name="diff"]');

radiobuttons.forEach((elem) => {
    elem.addEventListener('change', function (event) {
        console.clear();
        let difficult_dom = event.target.value;
        console.log(
            `Difficult level: %c ${difficult_dom.toUpperCase()}`,
            'color: #F44336;'
        );
        let field_size = 10;

        switch (difficult_dom) {
            case 'easy':
                field_size = 5;
                document.documentElement.style.setProperty('--field-size', '5');
                break;
            case 'medium':
                field_size = 10;
                document.documentElement.style.setProperty(
                    '--field-size',
                    '10'
                );
                break;
            case 'hard':
                field_size = 15;
                document.documentElement.style.setProperty(
                    '--field-size',
                    '15'
                );
                break;
        }

        //Очистить поле
        let clearContainer = document.querySelector('#container');
        clearContainer.innerHTML = '';
        clearContainer.style.backgroundImage = 'none';

        // Создать новое
        let game = new Game(field_size);
        game.placeMines();
        let cells = document.querySelectorAll('.cell');
        cells.forEach((value) => {
            // Украшательства
            let row = value.dataset.row;
            let col = value.dataset.col;
            let targetCell = game.square[row][col];
            if (targetCell.minesAround != 0) {
                value.textContent = targetCell.minesAround;
                switch (+value.textContent) {
                    case 1:
                        value.style.color = '#303F9F'; // blue
                        break;
                    case 2:
                        value.style.color = '#388E3C'; // green
                        break;
                    case 3:
                        value.style.color = '#F9A825'; // yellow
                        break;
                    case 4:
                        value.style.color = '#AD1457'; // red
                        break;
                    default:
                        value.style.color = '#B71C1C'; // ultra red
                        break;
                }
            }
            if (targetCell.isMine) {
                value.textContent = '';
                value.style.color = 'red';
                value.style.backgroundImage = 'url(images/mine-logo-black.svg)';
                value.style.backgroundSize = '30px';
                value.style.backgroundPosition = '5px 5px';
                value.style.backgroundRepeat = 'no-repeat';
            }
        });

        // console.log(game.square[0][0] === game.square[1][0]);
        // Некоторые объекты могли быть одинаковыми
        // console.log(`Одинаковы? ${game.field[0] === game.field[5]}`);

        cells.forEach(function (item) {
            // OPEN CELL
            item.addEventListener('click', function (event) {
                let current = event.target;
                let row = current.dataset.row;
                let col = current.dataset.col;

                // Если мина:
                if (
                    game.square[row][col].isMine &&
                    current.classList.contains('closed')
                ) {
                    for (let cell of cells) {
                        cell.classList.remove('closed');
                        if (
                            !(
                                cell.classList.contains('flag') &&
                                game.square[row][col].isMine
                            )
                        ) {
                            cell.classList.remove('flag');
                        }
                    }
                    game.throwLoseGame();
                    current.style.backgroundColor = '#F44336';
                }
                // Если не флаг и клетка закрыта
                else if (
                    current.classList.contains('closed') &&
                    !current.classList.contains('flag')
                ) {
                    game.openAround(+row, +col);
                }
            });

            // SET/UNSET FLAG
            item.addEventListener('contextmenu', function (event) {
                let current = event.target;
                let row = current.dataset.row;
                let col = current.dataset.col;
                if (game.isDone) {
                    console.log('Нельзя');
                }
                // SET FLAG
                else if (
                    current.classList.contains('closed') &&
                    !current.classList.contains('flag')
                ) {
                    console.log('set flag');
                    current.classList.add('flag');
                    game.square[row][col].setFlag();
                    current.classList.remove('closed');
                    game.totalFlags++;
                    if (game.square[row][col].isMine) {
                        game.totalFlagedMines++;
                    }
                    if (
                        game.totalFlags === game.totalFlagedMines &&
                        game.totalFlags === game.TOTAL_MINES
                    ) {
                        game.throwWinGame();
                        for (let cell of cells) {
                            cell.classList.remove('closed');
                            // cell.classList.remove('flag');
                        }
                    }
                    console.log(
                        // Легальные читы
                        game.totalFlags,
                        game.TOTAL_MINES,
                        game.totalFlagedMines
                    );
                }

                // UNSET FLAG
                else if (
                    !current.classList.contains('closed') &&
                    current.classList.contains('flag')
                ) {
                    console.log('unset flag');
                    current.classList.remove('flag');
                    game.square[row][col].unsetFlag();
                    current.classList.add('closed');
                    game.totalFlags--;
                    if (game.square[row][col].isMine) {
                        game.totalFlagedMines--;
                    }
                    if (
                        game.totalFlags === game.totalFlagedMines &&
                        game.totalFlags === game.TOTAL_MINES
                    ) {
                        game.throwWinGame();
                        for (let cell of cells) {
                            cell.classList.remove('closed');
                            // cell.classList.remove('flag');
                        }
                    }
                    console.log(
                        // Легальные читы
                        game.totalFlags,
                        game.TOTAL_MINES,
                        game.totalFlagedMines
                    );
                }
            });
        });
    });
});
