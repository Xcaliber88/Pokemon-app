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
            <div className="cardContainerMain">
                <img className="logo"
                     src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg"/>
            </div>
            <div className="buttonContainer">
                <button
                    className="navButtons"
                    disabled={!offset}
                    onClick={() => handleClickPrevious()}
                >
                    vorige
                </button>

                <button
                    className="navButtons"
                    onClick={() => handleClickNext()}
                >
                    volgende
                </button>
            </div>

            <div>

                {pokenames ? (<div className="cards">{pokenames.map((pokename) => {
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
