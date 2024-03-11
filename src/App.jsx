import { useEffect, useState } from "react";
import Title from "./components/Title";
import Card from "./components/Card";

function App() {
    const maxPokemons = 16;
    const [pokemons, setPokemons] = useState([]);

    function getPokeData(id) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then((resp) => resp.json())
            .then((data) => loadPokemonData(data))
            .catch((err) => console.error(err));
    }

    function loadPokemonData(pokeData) {
        const { id, name, sprites } = pokeData;
        const spriteFront = sprites.front_default;
        const newPokeData = { id, name, spriteFront };

        setPokemons((prevPokemons) => [...prevPokemons, newPokeData]);
    }

    useEffect(() => {
        for (let i = 0; i < maxPokemons; i++) {
            getPokeData(i);
        }
    }, []);

    function handleClick(id) {
        console.log("clicked ", id);
    }

    return (
        <>
            <Title />
            <div>
                {pokemons.map((pokemon) => (
                    <Card
                        key={pokemon.id}
                        pokeData={pokemon}
                        handleClick={handleClick}
                    />
                ))}
            </div>
        </>
    );
}

export default App;
