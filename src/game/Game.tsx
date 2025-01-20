import { useEffect, useState } from "react"
import { Cell } from "../services/entities/Cell"
import type { ICell } from "../services/entities/Cell"
import { BoardCell } from "./BoardCell"

const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1]
]

export interface Props {
    gameType: string;
}

export const Game: React.FC<Props> = (props: Props) => {
    const {gameType} = props
    const [count, setCount] = useState<number>(0)
    const [mines, setMines] = useState<number>(0)
    const [fail, setFail] = useState<boolean>(false)
    const [win, setWin] = useState<boolean>(false)
    const [board, updateBoard] = useState<Cell[][]>()
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const data = await fetch(`/MineSweeper/api/${gameType ?? 'basic'}`)
                const {board, mines}: {board: ICell[][], mines: number} = await data.json()
    
                const cells = board.map(row => row.map(cell => new Cell(cell.mine, cell.revealed, cell.flagged, cell.nearMines )))
                updateBoard(cells)
                setMines(mines)
            } catch (error) {
                console.log(error)
                alert('Hubo un error')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (board && fail) {
            board.flat().filter(cell => cell.isMine()).forEach(mine => mine.detonate())
            updateBoard([...board])
        }
    }, [fail])

    const cellReveal = (x: number, y: number, action: 'reveal' | 'flag') => {
        if (board) {
            let newBoard = [...board]
            function iterate(x: number, y: number) {
                if (!(x >= 0 && y >= 0 && x < newBoard.length && y < newBoard[0].length)) return
                const cell = newBoard[x][y]
                if (cell.isRevealed()) return
                if (!cell.isFlagged()) {
                    cell.reveal()
                }
                if (cell.isMine()) {
                    setFail(true)
                }
                if (cell.getNearMines() === 0) {
                    directions.forEach(([dx,dy]) => {
                        const nx = x + dx
                        const ny = y + dy
                        iterate(nx,ny)
                    })
                }
            }
            if (action == 'reveal') {
                iterate(x,y)
            } else {
                board[x][y].toggleFlag()
            }
            updateBoard(newBoard)
            const revealedCount = newBoard.flat().filter(cell => cell.isRevealed()).length
            setCount(revealedCount)
            if (revealedCount == ((newBoard.length * newBoard[0].length) - mines)) {
                setWin(true)
            }
        }
    }

    return (
        <div>
            {
                board &&
                <p>Points to win: {((board.length * board[0].length) - mines) - count}</p>
            }
            {
                win ?
                <h2>YOU WIN!🎊</h2>: <></>
            }
            {
                fail ?
                <h2>YOU LOSE 🥺</h2>: <></>
            }
            {
                loading ? <p>Cargando</p> : 
                <div>
                    {board?.map((row, rIndex) => {
                        return <div key={rIndex} className="flex flex-row">
                            {row.map((cell, cIndex) => {
                                return <BoardCell key={cIndex} state={cell} onClick={(action: 'reveal' | 'flag') => {
                                    if (!win && !fail) {
                                        cellReveal(rIndex,cIndex, action)
                                    }
                                }}/>
                            })}
                        </div>
                    })}
                </div>
            }
        </div>
    )
}