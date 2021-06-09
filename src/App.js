import React, {useEffect, useState} from 'react';
import './App.css';
import Pokemon from "./Pokemon";
import axios from 'axios';

function App() {

    const [pokenames, setPokenames] = useState(null);


    useEffect(() => {
        async function fetchPokenames() {
            try {
                const result = await
                    axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=20`);
                setPokenames(result.data.results);
                console.log("what is inside pokenames", result.data.results);
            } catch (e) {
                console.error(e);

            }
        }

        fetchPokenames();
    }, [])

    function handleClick(){};

        useEffect(() => {
            async function fetchNextPokenames() {
                try {
                    const result = await
                        axios.get('https://pokeapi.co/api/v2/pokemon?offset=60&limit=20');
                    setPokenames(result.data.results);
                    console.log("what is inside pokenames", result.data.results);
                } catch (e) {
                    console.error(e);

                }
            }

            fetchNextPokenames();
        }, [])


        return (
            <>
                <button onClick=
                            {() => handleClick()}
                >
                    volgende
                </button>
                <button> volgende</button>
                <div>
                    {pokenames ? (<div>{pokenames.map((pokename) => {
                            return <Pokemon nameOfPokemon={pokename.name}/>;
                        })}
                        </div>
                    ) : (
                        <h3> Loading... </h3>
                    )}
                </div>
            </>
        );

}


    export default App;
