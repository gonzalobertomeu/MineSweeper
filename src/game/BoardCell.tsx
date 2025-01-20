import { useEffect, useState } from "react"
import { Cell } from "../services/entities/Cell"

import { FaBomb, FaFlag } from "react-icons/fa6"

export const BoardCell = ({state, onClick}: {state: Cell, onClick: (action: 'reveal' | 'flag') => void}) => {

    const [isPressed, setPressed] = useState<boolean>(false)

    return <button
        onClick={() => {
            onClick('reveal')
        }}
        onContextMenu={(e) => {
            e.preventDefault()
            onClick('flag')
        }}
        onMouseDown={() => {
            if (!state.isRevealed()) {
                setPressed(true)
            }
        }}
        onMouseUp={() => setPressed(false)}
        onMouseLeave={() => setPressed(false)}
        className={`h-10 w-10 flex flex-row items-center justify-center ${state.isRevealed() ? 'bg-gray-400 border-b border-r border-gray-500' : isPressed ? pressed : unPressed}`}
        style={{transition: 'border-color 0.1s ease-in-out'}}
    >
        {state.isBoom() ? <FaBomb/> : 
            <>
                {state.isFlagged() ? <FaFlag className="text-red-900"/> : ''}
                {state.isRevealed() ? state.getNearMines() || '' : ''}
            </>
        }
    </button>
}


const unPressed = "bg-slate-500 border-t-4 border-t-gray-400 border-l-4 border-l-gray-400 border-b-4 border-b-gray-600 border-r-4 border-r-gray-600"
const pressed = "bg-slate-600 border-b-4 border-b-gray-600 border-r-4 border-r-gray-600 border-t-4 border-t-gray-800 border-l-4 border-l-gray-800"