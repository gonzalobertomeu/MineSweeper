export async function GET() {
    return new Response(
        JSON.stringify({
            status: 'ok',
            version: '1.0.0'
        })
    )
}