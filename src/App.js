import React, {useEffect, useState} from 'react';
import './App.css';
import Pokemon from "./Pokemon";
import axios from 'axios';

function App() {

    const [pokenames, setPokenames] = useState(null);
    const [offset, setOffset] = useState(0);


    function handleClickNext() {
        setOffset(offset + 20)
        setPokenames([])
    };

    function handleClickPrevious() {
        setOffset(offset - 20)
        setPokenames([])
    };

    useEffect(() => {
        async function fetchPokenames() {
            try {
                const result = await
                    axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${offset}`);
                setPokenames(result.data.results);
                console.log("what is inside pokenames", result.data.results);
            } catch (e) {
                console.error(e);

            }
        }

        fetchPokenames();



    }, [offset]);


    return (
        <>
            <button disabled={!offset}
                    onClick={() => handleClickPrevious()}
            >
                vorige
            </button>

            <button
                onClick={() => handleClickNext()}
                    >
                volgende
            </button>

            <div className='cardContainerMain'>
                {pokenames  ? (<div>{pokenames.map((pokename) => {
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
