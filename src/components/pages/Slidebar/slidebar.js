import React, { useEffect, useState } from 'react';
import { getPokemons } from '../../../services/pokemonServices';
import './styles.css';
import pokemon from "../../../assets/images/pokemonlogo.png"

function Sidebar({setSelectedPokemon}) {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPokemons = async () => {
            try {
                const pokemonsData = await getPokemons();
                setPokemons(pokemonsData);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchPokemons();
    }, []);

    if (loading) {
        return <div className="sidebar">Loading...</div>;
    }

    if (error) {
        return <div className="sidebar">Error: {error.message}</div>;
    }

    return (
        <div className="sidebar">
            <div className="logo-container">
                <img src={pokemon} alt="Logo" className="logo" />
            </div>
            <ul>
                {pokemons.map((pokemon, index) => (
                    <li key={index}>
                        <label>
                            <input
                                type="radio"
                                name="pokemon"
                                value={pokemon.name}
                                onChange={() => setSelectedPokemon(pokemon.name)}
                            />
                            {pokemon.name}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;
