"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [id, setId] = useState(1);

  const [pokemon, setPokemon] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function buscarPokemon() {
      setLoading(true);

      try {
        const resposta = await fetch(
          'https:pokeapi.co/api/v2/pokemon/${id}'
        );
        if (!resposta.ok) {
          throw new Error("Pokemon não encontrado");
        }

        const dados = await resposta.json();

        setPokemon({
          id: dados.id,
          name: dados.name,
          image:
            dados.spries.other["official-artwork"].front_default || dados.spries.front_default
        });

      } catch (erro) {
        console.error(erro);
        setPokemon(null);
      } finally {
        setLoading(false);
      }
    }

    buscarPokemon();
  }, [id]);

  function passar(){
    setId(id + 1);
  }

  async function capturar() {
    try{
      const resposta = await fetch("api/favoritos", {
        method: "POST",
        headers: {
          "Content-Type": "applicatio/json"
        },
        body: JSON.stringify(pokemon)
      });

      if (!resposta.ok) {
        throw new Error("Erro ao capturar Pokemon");
      }

      alert("Pokemon Capturado!");

      setId(id+1);
    } catch (erro) {
      console.error(erro);
      alert("Não foi possivel capturar o Pokemon");
    }
  }

  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "f2f2f2",
      padding: "20px"
    }}>
      <h1>PokeMatch</h1>

      <Link href="/favoritos">Pokedex</Link>

      {loading ? (
        <p>Carregando...</p>
      ) : pokemon ? (
        <div style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "15px",
          textAlign: "center",
          marginTop: "20px",
          boxShadow: "0 4px 10px #ccc"
        }}>
          <img
            src={pokemon.image}
            alt={pokemon.name}
            width= "200"
            height= "200"
          />

          <h2>{pokemon.name.toUpperCase()}</h2>

          <p>Pokemon #{pokemon.id}</p>

          <div style={{
            display: "flex",
            gap:"15px",
            justifyContent: "center"
          }}>
            <button onClick={passar}>Passar</button>
            <button onClick={capturar}>Capturar</button>
          </div>
        </div>
      ) : (
        <p>Não foi possivel carregar o Pokemon</p>
      )}
    </main>
  );
}