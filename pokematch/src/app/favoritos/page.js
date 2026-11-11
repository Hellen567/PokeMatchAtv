"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Favoritos() {

    // Guarda a lista de Pokémon capturados
    const [lista, setLista] = useState([]);

    // Busca os favoritos na API
    useEffect(() => {
        fetch("/api/favoritos")
            .then(resposta => resposta.json())
            .then(dados => setLista(dados))
            .catch(erro => console.error(erro));
    }, []);

    return (
        <main style={{
            minHeight: "100vh",
            padding: "30px",
            backgroundColor: "#f2f2f2"
        }}>

            <Link href="/">
                ← Voltar
            </Link>

            <h1>Minha Pokédex</h1>

            <h2>
                Pokémon capturados: {lista.length}
            </h2>

            {lista.length === 0 ? (
                <p>Você ainda não capturou nenhum Pokémon!</p>
            ) : (

                <div style={{
                    display: "flex",
                    gap: "20px",
                    flexWrap: "wrap",
                    marginTop: "20px"
                }}>

                    {lista.map(p => (
                        <div
                            key={p.id}
                            style={{
                                backgroundColor: "white",
                                border: "1px solid #ccc",
                                borderRadius: "10px",
                                padding: "15px",
                                textAlign: "center",
                                width: "150px"
                            }}
                        >

                            <img
                                src={p.image}
                                alt={p.name}
                                width="100"
                                height="100"
                            />

                            <h3>{p.name.toUpperCase()}</h3>

                            <p>#{p.id}</p>

                        </div>
                    ))}

                </div>
            )}

        </main>
    );
}