import { Board } from "./entities/Board";

export class GameService {
    public static async newGame(rows: number, cols: number, mines:number) {
        const board = new Board(rows,cols,mines)
        return board.getBoard()
    }
}