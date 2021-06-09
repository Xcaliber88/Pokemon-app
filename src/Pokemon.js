import axios from "axios";
import {useState, useEffect} from 'react';

function Pokemon(props) {
    const [pokemon, setPokemon] = useState(null);

    console.log("WHAT ARE THE PROPS:", props);
    console.log("STATE IN CARD:", pokemon);

    useEffect(() => {
        async function fetchPokemon() {
            try {
                const result = await
                    axios.get(`https://pokeapi.co/api/v2/pokemon/${props.nameOfPokemon}`
                    );
                setPokemon(result.data);
            } catch (e) {
                console.error(e);
            }
        }

        fetchPokemon();
    }, []);


    return (
        <div>
            {pokemon ? (
                <div className="cardContainer">
                    <h1>{pokemon.name}</h1>
                    <img alt-text={pokemon.name} src={pokemon.sprites.front_default}/>
                    <h2> Moves: {pokemon.moves.length}</h2>
                    <h2>Weight:{pokemon.weight}</h2>
                    <div><h2>Abilities:</h2> {pokemon.abilities.map(ability => {
                        return <p> {ability.ability.name}</p>
                    })}</div>
                </div>
            ) : (
                <h3>Loading</h3>
            )}
        </div>
    );
}

export default Pokemon;