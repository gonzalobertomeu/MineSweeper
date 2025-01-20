import { Cell } from "./Cell"

export class Board {
    private nRows: number
    private nCols: number
    private nMines: number
    private cells: Cell[][]

    constructor(nRows: number, nCols: number, nMines: number) {
        this.nRows = nRows
        this.nCols = nCols
        this.nMines = nMines
        this.cells = []
        for (let i = 0; i < nRows; i++) {
            this.cells.push([])
            for (let j = 0; j < nCols; j++) {
                this.cells[i].push(new Cell())
            }
        }
        this.placeMines()
        this.calculateNearMines()
    }

    public getBoard() {
        return this.cells.map(row => row.map(cell => cell.json()))
    }

    private placeMines(): void {
        let minesPlaced = 0
        while (minesPlaced < this.nMines) {
            const i = Math.floor(Math.random() * this.nRows)
            const j = Math.floor(Math.random() * this.nCols)
            if (!this.cells[i][j].isMine()) {
                this.cells[i][j].setMine()
                minesPlaced++
            }
        }
    }

    private calculateNearMines(): void {
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1], [0, 1],
            [1, -1], [1, 0], [1, 1]
        ]
        for (let i = 0; i < this.nRows; i++) {
            for (let j = 0; j < this.nCols; j++) {
                let nearMines = 0
                for (const [di, dj] of directions) {
                    const ni = i + di
                    const nj = j + dj
                    if (ni >= 0 && ni < this.nRows && nj >= 0 && nj < this.nCols) {
                        if (this.cells[ni][nj].isMine()) {
                            nearMines++
                        }
                    }
                }
                this.cells[i][j].setNearMines(nearMines)
            }
        }
    }
}