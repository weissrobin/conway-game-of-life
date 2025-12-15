export class Grid {
    constructor(cellSize, ctx) {
        this.rows = Math.round(window.innerHeight / cellSize) - 1;
        this.cols = Math.round(window.innerWidth / cellSize) - 1;
        this.cellSize = cellSize;
        this.cells = Array.from({ length: this.rows }, () => Array(this.cols).fill(0));
        this.ctx = ctx;

        // Box
        this.cells[10][10] = 1;
        this.cells[10][11] = 1;
        this.cells[11][10] = 1;
        this.cells[11][11] = 1;

        // Blinker
        this.cells[20][20] = 1;
        this.cells[20][19] = 1;
        this.cells[20][21] = 1;

        // Glider
        this.cells[30][30] = 1;
        this.cells[29][30] = 1;
        this.cells[30][29] = 1;
        this.cells[29][28] = 1;
        this.cells[28][30] = 1;
    }

    countAliveNeighbors(corY, corX) {
    let count = 0;

        for (let x = corX - 1; x <= corX + 1; x++) {
            for (let y = corY - 1; y <= corY + 1; y++) {
                if (x === corX && y === corY) continue;
                if (x >= 0 && x < this.cols && y >= 0 && y < this.rows) {
                    if (this.cells[y][x] === 1) count++;
                }
            }
        }

        return count;
    }

    draw() {
        for (let x = 0; x < this.cols; x++) {   
            for (let y = 0; y < this.rows; y++) {
                if (this.cells[y][x] == 1) {
                    this.ctx.fillStyle = 'yellow';
                    this.ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
                } else {
                    this.ctx.fillStyle = '#ccc';
                    this.ctx.strokeStyle = 'black';
                    this.ctx.strokeRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
                    this.ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
                }
            }
        }
    }

    update() {
        let newCells = Array.from({ length: this.rows }, () => Array(this.cols).fill(0));

        for (let x = 0; x < this.cols; x++) {   
            for (let y = 0; y < this.rows; y++) {
                const count = this.countAliveNeighbors(y, x);
                if (this.cells[y][x] == 1) {
                    if (count == 2 || count == 3) {
                        newCells[y][x] = 1;
                    } else {
                        newCells[y][x] = 0;
                    }
                } else {
                    if (count === 3) {
                        newCells[y][x] = 1;
                    } else {
                        newCells[y][x] = 0;
                    }
                }
            }
        }

        this.cells = newCells;
        this.draw();
    }

    animate() {
        const now = performance.now();
        if (!this.lastUpdate) this.lastUpdate = now;

        if (now - this.lastUpdate > 1000) {
            this.update();
            this.lastUpdate = now;
        }

        requestAnimationFrame(() => this.animate());
    }
}