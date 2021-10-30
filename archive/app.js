let cont = document.querySelector('.container');
console.log(cont);
// for (let rows = 1; rows <= 16; rows++) {
//     for (let cols = 1; cols <= 16; cols++) {
//         let current = document.createElement('div');

//         cont.append(current);
//         current.classList.add('kek');
//         current.dataset.row = rows;
//         current.dataset.col = cols;
//         current = new Array();
//     }
// }

console.log(cont);
class Cell {
    constructor(row, col) {
        // this.document.createElement('div');
        this.row = row;
        this.col = col;
        this.isMine = false;
        this.element = document.createElement('div');
    }
    getCell(row, col) {
        console.log(this.row, this.cell);
    }
}
for (let rows = 1; rows <= 16; rows++) {
    for (let cols = 1; cols <= 16; cols++) {
        let cell = new Cell(rows, cols);
        cont.append(cell.element);
        cell.element.classList.add('kek');
        cell.element.dataset.row = rows;
        cell.element.dataset.col = cols;
        if (rows === cols) {
            cell.isMine = true;
        }
        console.log(cell.isMine);
    }
}
getCell(5, 5);
