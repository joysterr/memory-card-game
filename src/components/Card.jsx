export default function Card({ pokeData, handleClick }) {
    return (
        <div
            className="p-4 border-white border-2 rounded-md flex flex-col justify-center items-center cursor-pointer hover:border-red-700"
            onClick={() => handleClick(pokeData.id)}
        >
            <img
                className="block max-w-full"
                src={pokeData.spriteFront}
                alt={"Image of " + pokeData.name}
            />
            <p>{pokeData.name}</p>
        </div>
    );
}
