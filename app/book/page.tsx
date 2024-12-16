"use client";

import {useEffect, useState} from 'react';
import axios from 'axios';
import {Container, Row, Col, Card} from 'react-bootstrap';
import Link from "next/link";

interface Series {
    id: number;
    name: string;
    img: string;
    tomes: { id: number; title: string }[];
}

export default function Book() {
    const [series, setSeries] = useState<Series[]>([]);

    useEffect(() => {
        axios
            .get('/api/series')
            .then((response) => {
                console.log('Réponse de l\'API:', response.data);
                setSeries(response.data);
            })
            .catch((error) => {
                console.error('Erreur Axios:', error.response ? error.response.data : error.message);
            });
    }, []);

    return (
        <Container>
            <h1 className="text-center">Ma Collection de Séries</h1>
            <Row>
                {series.length > 0 ? (
                    series.map((serie) => (
                        <Col key={serie.id} xs={12} sm={6} md={4} lg={3}>
                            <Card>
                                <Card.Header>
                                    <Card.Title>{serie.name}</Card.Title>
                                    <Link href={`/book/${serie.id}`}>
                                        <Card.Text>Voir les détails</Card.Text>
                                    </Link>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Img src={serie.img} height={250} width={220}/>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <p>Aucune série à afficher</p>
                )}
            </Row>
        </Container>
    );
}
