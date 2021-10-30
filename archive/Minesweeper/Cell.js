class Cell {
    constructor() {
        this.isMine = false;
        this.isOpened = false;
        this.isFlag = false;
        // this.isClosed = true;
        this.minesAround = this.countMinesAround();
    }
    setFlag() {
        // ...
        this.isFlag = true;
    }
    setMine() {
        // ...
        this.isMine = true;
    }
    openCell() {
        // ...
        this.isOpened = true;
    }
}
let x = new Cell();
x.setFlag();
console.log(x);
let sas = [];
