import { useEffect, useState } from "react";
import Card from "./components/Card";
import CardLayout from "./layouts/CardLayout";
import Instructions from "./components/Instructions";
import Scoreboard from "./components/Scoreboard";
import Title from "./components/Title";
import { shuffle } from "./utils/gameUtils";

function App() {
    const maxPokemons = 16;
    const [pokemons, setPokemons] = useState([]);
    const initClickCount = new Array(maxPokemons);
    initClickCount.fill(0);
    const [clickCount, setClickCount] = useState(initClickCount);
    const [score, setScore] = useState(0);
    const [highscore, setHighscore] = useState(0);

    useEffect(() => {
        for (let i = 1; i <= maxPokemons; i++) {
            getPokeData(i);
        }
    }, []);

    useEffect(() => {
        isWinner(score);
    }, [score]);

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

    function handleClick(id) {
        if (clickCount[id] === 1) {
            alert("GAME OVER");
            resetGame();
            return;
        }
        // update card click count
        setClickCount((clickCount) => {
            const updatedClickCount = [...clickCount];
            updatedClickCount[id] = 1;
            return updatedClickCount;
        });
        // update score
        setScore((score) => score + 1);
        // shuffle
        const newArrangement = shuffle(pokemons);
        setPokemons(newArrangement);
    }

    function isWinner(score) {
        if (score === 16) {
            alert("YOU WIN! MAX SCORE ACHIEVED!");
            resetGame();
        }
    }

    function updateHighscore(currentScore) {
        if (currentScore > highscore) {
            setHighscore(currentScore);
        }
    }

    function resetGame() {
        updateHighscore(score);
        setScore(0);
        setClickCount(initClickCount);
        const newArrangement = shuffle(pokemons);
        setPokemons(newArrangement);
    }

    return (
        <>
            <Title />
            <Instructions />
            <CardLayout>
                {pokemons.map((pokemon) => (
                    <Card
                        key={pokemon.id}
                        pokeData={pokemon}
                        handleClick={handleClick}
                    />
                ))}
            </CardLayout>
            <Scoreboard score={score} highscore={highscore} />
        </>
    );
}

export default App;
