// src/components/pages/PokemonPage/PokemonPage.js

import React, { useState, useEffect } from "react";
import "./styles.css";
import { getPokemonDetails, getPokemonSpecies, getPokemonEvolutions } from "../../../services/pokemonServices";


function PokemonPage({ selectedPokemon }) {
    const [pokemonData, setPokemonData] = useState(null);
    const [pokemonSpecies, setPokemonSpecies] = useState(null);
    const [pokemonEvolutions, setPokemonEvolutions] = useState([]);

    useEffect(() => {
        const fetchPokemonData = async () => {
            if (selectedPokemon) {
                try {
                    const [details, species] = await Promise.all([
                        getPokemonDetails(selectedPokemon),
                        getPokemonSpecies(selectedPokemon)
                    ]);
                    setPokemonData(details);
                    setPokemonSpecies(species);
                    const evolutionChainId = species.evolution_chain.url.split("/").slice(-2, -1)[0];
                    const evolutionData = await getPokemonEvolutions(evolutionChainId);
                    setPokemonEvolutions(parseEvolutions(evolutionData));
                } catch (error) {
                    console.error("Error fetching Pokémon data:", error);
                }
            }
        };

        fetchPokemonData();
    }, [selectedPokemon]);

    const cleanDescription = (description) => {
        return description.replace(/[\f\n\r]/g, " ").replace(/\s+/g, " ").trim();
    };

    const parseEvolutions = (data) => {
        const evolutions = [];
        const chain = data.chain;

        const addEvolutions = (chain) => {
            const evolution = {
                id: chain.species.url.split("/").slice(-2, -1)[0],
                name: chain.species.name,
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${chain.species.url.split("/").slice(-2, -1)[0]}.png`,
            };
            evolutions.push(evolution);
            if (chain.evolves_to.length > 0) {
                chain.evolves_to.forEach((evolution) => addEvolutions(evolution));
            }
        };

        addEvolutions(chain);
        return evolutions.slice(1);
    };

    if (!selectedPokemon) {
        return <div className="pokemon-page">
            <p className="select">Selecione um Pokémon</p></div>;
    }

    return (
        <div className="pokemon-page">
            {pokemonData && pokemonSpecies ? (
                <div className="pokemon-info">
                    <div className="pokemon-header">
                        <h1>{pokemonData.name.toUpperCase()}</h1>
                    </div>
                    <div className="pokemon-details">
                        <div className="pokemon-stats">
                            <p>
                                <strong>ID: </strong>
                                {pokemonData.id}
                            </p>
                            <p>
                                <strong>Description:</strong>{" "}
                                {cleanDescription(
                                    pokemonSpecies.flavor_text_entries.find(
                                        (entry) => entry.language.name === "en"
                                    ).flavor_text
                                )}
                            </p>
                            <p>
                                <strong>Height:</strong> {pokemonData.height / 10} m
                            </p>
                            <p>
                                <strong>Weight:</strong> {pokemonData.weight / 10} kg
                            </p>
                            <p>
                                <strong>Type:</strong> {pokemonData.types.map((type) => type.type.name).join(", ")}
                            </p>

                        </div>
                        <div className="pokemon-image">
                            <img src={pokemonData.sprites.front_default} alt={pokemonData.name} style={{ width: "200px", height: "200px" }} />
                        </div>
                    </div>
                    <div className="evolutions">
                        <div className="evolutions-title">
                            <h2>Evolutions</h2>
                        </div>
                        <div className="evolution-list">
                            {pokemonEvolutions.map((evolution) => (
                                <div key={evolution.id} className="evolution">
                                    <div className="evolution-info">
                                        <img src={evolution.image} alt={evolution.name} />
                                        <p>{evolution.id}</p>
                                        <p>{evolution.name.toUpperCase()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="habilities">
                        <div className="habilities-title">
                            <h2>Habilities</h2>
                        </div>
                        <div className="habilities-list">
                            {pokemonData.abilities.map((ability, index) => (
                                <div key={index} className="hability">
                                    <p>{ability.ability.name.toUpperCase()}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="powers">
                        <div className="powers-title">
                            <h2>Powers</h2>
                        </div>
                        <div className="powers-list">
                            {pokemonData.stats.map((stat, index) => (
                                <div key={index} className="power">
                                    <p><strong>{stat.stat.name}:</strong> {stat.base_stat}</p>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default PokemonPage;
