import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    console.log('Début de la requête GET /api/series');

    try {
        const series = await prisma.series.findMany({
            include: {
                tomes: true,
            },
        });

        console.log('Séries récupérées:', series);

        if (series.length === 0) {
            return new Response(JSON.stringify({message: 'Aucune série trouvée.'}), {status: 404});
        }

        return new Response(JSON.stringify(series), {status: 200});
    } catch (error) {
        // Si l'erreur n'est pas un objet, convertis-la en une chaîne de caractères
        const errorMessage = error instanceof Error ? error.message : String(error);

        console.error('Erreur lors de la récupération des séries:', errorMessage);

        // Assure-toi que la réponse soit toujours un objet JSON valide
        return new Response(
            JSON.stringify({error: 'Erreur serveur.', details: errorMessage}),
            {status: 500}
        );
    }
}
