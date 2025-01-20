export interface ICell {
    mine: boolean
    revealed: boolean
    flagged: boolean
    nearMines: number
    boom: boolean
}
export class Cell {
    

    constructor(
        private mine: boolean = false,
        private revealed: boolean = false,
        private flagged: boolean = false,
        private nearMines: number = 0,
        private boom: boolean = false
    ) {
    }

    public json(): ICell {
        return {
            mine: this.mine,
            revealed: this.revealed,
            flagged: this.flagged,
            nearMines: this.nearMines,
            boom: this.boom
        }
    }

    public isMine(): boolean {
        return this.mine
    }

    public setMine(): void {
        this.mine = true
    }

    public isRevealed(): boolean {
        return this.revealed
    }

    public reveal(): void {
        this.revealed = true
    }

    public isFlagged(): boolean {
        return this.flagged
    }

    public toggleFlag(): void {
        if (this.revealed) {
            this.flagged = false
        } else {
            this.flagged = !this.flagged
        }
    }

    public getNearMines(): number {
        return this.nearMines
    }

    public setNearMines(nearMines: number): void {
        this.nearMines = nearMines
    }

    public detonate(): void {
        this.boom = true
    }

    public isBoom(): boolean {
        return this.boom
    }
}