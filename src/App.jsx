import { useEffect, useState } from "react";
import Title from "./components/Title";

function App() {
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
        getPokeData(1);
    }, []);

    return (
        <>
            <Title />
            <div>{JSON.stringify(pokemons)}</div>
        </>
    );
}

export default App;
