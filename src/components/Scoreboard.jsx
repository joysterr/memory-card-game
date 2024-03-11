export default function Scoreboard({ score, highscore }) {
    return (
        <div className="w-full md:w-[30rem] mx-auto my-4 p-2 bg-yellow-300 rounded-lg text-black text-center">
            <p>Score: {score} </p>
            <p>High-score: {highscore}</p>
        </div>
    );
}
