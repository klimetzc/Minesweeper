for (let i = 1; i <= 100; i++) {
    let cell = document.createElement('div');
    let cellD = document.querySelector('#container').appendChild(cell);
    cellD.classList.add('kek');
}
let cells = document.querySelectorAll('.kek');
cells.forEach(function (item) {
    // OPEN CELL

    // console.log(item);
    item.addEventListener('click', function (event) {
        let current = event.target;
        current.style.background = 'white';
        /*
        let row = current.dataset.row
        let col = current.dataset.col
        let cell = game.field[row][col]
        IF CLOSED && !FLAGED{
            if (cell.isMine){
                game.throwLose()
            }else{
                game.openAround (row, col)
                cell.openCell()
            }
            
        }
        */
    });
});

cells.forEach(function (item) {
    // FLAG

    // console.log(item);
    item.addEventListener('contextmenu', function (event) {
        let current = event.target;
        current.style.background = 'blue';
        // console.log(my.which);

        /*
        let row = current.dataset.row
        let col = current.dataset.col
        let cell = game.field[row][col]
        IF CLOSED && !FLAGED { если закрыта и не зафлагована
            cell.setFlag()
            game.totalFlags++;
            if(cell.isMine){
                game.FlagedMins++;
            }
        } 
        if (game.totalFlags === game.FlagedMines){
            game.trowWin()
        }
        IF CLOSED && FLAGED -> cell.unsetFlag()
        
        [...current.classList].includes('closed') &&
        ![...current.classList].includes('opened')
        */
    });
});
