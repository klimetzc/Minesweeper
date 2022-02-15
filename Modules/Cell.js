export class Cell { // cell
    #isMine;
    constructor(row, col, index) {
        this.#isMine = false;
        this.isFlag = false;

        this.minesAround = 0;
        this.row = row;
        this.col = col;
        this.index = index;
    }
    setFlag() {
        this.isFlag = true;
    }
    unsetFlag() {
        this.isFlag = false;
    }
    setMine() {
        this.#isMine = true;
    }
    valueOf() {
        return [this.row, this.col];
    }
    isMine() {
        return this.#isMine ? true : false;
    }
}
