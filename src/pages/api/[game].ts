import { GameService } from "../../services/GameService"

export function getStaticPaths() {
	return [
	  {params: {game: 'basic'}},
	  {params: {game: 'advance'}},
	  {params: {game: 'expert'}},
	];
}

export async function GET({params} : {params: {game: string}}) {
    const game = params.game
    if (!['basic', 'advance', 'expert'].includes(game)) {
        console.log(game)
        return new Response(JSON.stringify({
            success: false
        }))
    }
    const config: { [key: string]: [number, number, number] } = {
        'basic': [9,9,10],
        'advance': [16,16,40],
        'expert' : [16,30,99],
    }
    const conf = config[game]
    console.log({conf})
    const board = await GameService.newGame(...conf)
    return new Response(
        JSON.stringify({board, mines: conf[2]})
    )
}