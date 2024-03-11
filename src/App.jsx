import { useEffect, useState } from "react";
import Title from "./components/Title";
import Card from "./components/Card";
import CardLayout from "./layouts/CardLayout";

function App() {
    const maxPokemons = 16;
    const [pokemons, setPokemons] = useState([]);
    const initClickCount = new Array(maxPokemons);
    initClickCount.fill(0);
    const [clickCount, setClickCount] = useState(initClickCount);

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
        for (let i = 1; i <= maxPokemons; i++) {
            getPokeData(i);
        }
    }, []);

    function handleClick(id) {
        if (clickCount[id] === 1) {
            alert("GAME OVER");
            return;
        }
        const updatedClickCount = [...clickCount];
        updatedClickCount[id] = 1;
        setClickCount(updatedClickCount);
    }

    return (
        <>
            <Title />
            <CardLayout>
                {pokemons.map((pokemon) => (
                    <Card
                        key={pokemon.id}
                        pokeData={pokemon}
                        handleClick={handleClick}
                    />
                ))}
            </CardLayout>
        </>
    );
}

export default App;
