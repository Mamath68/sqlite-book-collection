import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, {params}: { params: Promise<{ id: string }> }) {
   console.log('Début de la requête GET pour la série avec ID:', (await params).id);

    // Vérifie si l'ID est bien présent
    if (!(await params).id || isNaN(parseInt((await params).id))) {
        return new Response(
            JSON.stringify({message: 'ID invalide.'}),
            {status: 400}
        );
    }

    try {
        // Cherche la série par son ID dans la base de données
        const serie = await prisma.series.findUnique({
            where: {
                id: parseInt((await params).id), // Recherche de la série par son ID
            },
            include: {
                tomes: true, // Inclut les tomes associés à la série
            },
        });

        if (!serie) {
            return new Response(
                JSON.stringify({message: 'Série non trouvée.'}),
                {status: 404}
            );
        }

        return new Response(JSON.stringify(serie), {status: 200});
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error('Erreur lors de la récupération des détails de la série:', errorMessage);
        return new Response(
            JSON.stringify({error: 'Erreur serveur.', details: errorMessage}),
            {status: 500}
        );
    }
}
