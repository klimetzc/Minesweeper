export class Cell {
    constructor(row, col, index) {
        this.isMine = false;
        this.isFlag = false;

        this.minesAround = 0;
        this.row = row;
        this.col = col;
        this.index = index;

        // this.isOpened = false;
        // this.isClosed = true;
    }
    setFlag() {
        // ...
        this.isFlag = true;
    }
    unsetFlag() {
        this.isFlag = false;
    }
    setMine() {
        // ...
        this.isMine = true;
        // console.log(this);
    }
    valueOf() {
        return [this.row, this.col];
    }
}
