import {Container} from 'react-bootstrap';
import Link from "next/link";

export default function Home() {

    return (
        <Container>
            <h1 className="text-center">Ma Collection de Séries</h1>
            <Link href="book">Vers les livres</Link>
        </Container>
    );
}
