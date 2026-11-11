import { favoritos } from "@/lib/db";
export async function GET() {
    return Responsejson(favoritos);
}

export async function POST(req) {
    const poke = await req.json();

    if(!favoritos.some(item => item.id === poke.id)) {
        favoritos.push(poke);
    }

    return Response.json(
        { status: "Capturado!" },
        { status: 201 }
    );
}