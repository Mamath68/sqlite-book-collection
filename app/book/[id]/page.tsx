'use client';
import {useEffect, useState} from 'react';
import {useParams} from "next/navigation";
import {Card, Container, Row, Col} from 'react-bootstrap';
import axios from 'axios';

interface Tome {
    id: number;
    title: string;
    volume: number;
    img: string;
    synopsis?: string;
    publishedAtInFrance: Date;
    publishedAtInOC: Date;
    possedee: boolean
}

interface Serie {
    id: number;
    name: string;
    author: string;
    original_author?: string;
    illustrator?: string;
    editeur: string;
    img: string;
    type: string;
    genre: string;
    status_vo: string;
    status_vf: string;
    commentaire?: string;
    tomes: Tome[];
}

export default function SerieDetail() {
    const {id} = useParams(); // Utilisation d’useParams pour récupérer l'ID du livre
    const [serie, setSerie] = useState<Serie | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            axios
                .get(`/api/series/${id}`) // Appel à l'API pour récupérer les détails de la série
                .then((response) => {
                    setSerie(response.data); // Mettre à jour l'état avec la série et ses tomes
                    setLoading(false); // Fin du chargement
                })
                .catch((error) => {
                    console.error('Erreur lors de la récupération de la série:', error);
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) return <p>Chargement...</p>;

    if (!serie) return <p>Série non trouvée.</p>;

    return (
        <Container>
            <h1 className="text-center">{serie.name}</h1>
            <h3>Tomes :</h3>
            <Row>
                {
                    serie.tomes.map((tome) => (
                        <Col key={tome.id} md={4}>
                            {tome.possedee ? (
                                <Card>
                                    <Card.Header>
                                        <Card.Title>{tome.title}</Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Img src={tome.img} width={220} height={250} alt={tome.title}/>
                                        <Card.Text>Je l&#39;ai</Card.Text>
                                    </Card.Body>
                                </Card>
                            ) : (
                                <Card>
                                    <Card.Header>
                                        <Card.Title>{tome.title}</Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Img src={tome.img} width={220} height={250} alt={tome.title}/>
                                    </Card.Body>
                                </Card>
                            )}
                        </Col>
                    ))}
            </Row>
        </Container>
    );
}
