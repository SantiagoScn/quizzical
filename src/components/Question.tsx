import { useState } from 'react'

type QuestionProps = {
    question: string,
    options: string[],
    correctAnswer: string
}

export default function Question( {question, options, correctAnswer}: QuestionProps){
    const [selectedAnswer, setSelectedAnswer] = useState("")

    return (
        <>
            <form>
                <h2>{question}</h2>
                <div className="flex gap-2">
                    {options.map((option, index) => (
                        <label key={index} className="flex gap-2">
                            <input className='' type="radio" name="answer" value={option} checked={selectedAnswer === option} onChange={() => setSelectedAnswer(option)} />
                            {option}
                        </label>
                    ))}
                </div>
            </form>
            <button onClick={() => alert(selectedAnswer === correctAnswer ? "Correct!" : "Incorrect!")} className="bg-blue-900 transition-colors duration-300 ease-in-out hover:bg-indigo-600 hover:scale-105 text-white text-xl font-bold py-4 px-8 rounded cursor-pointer shadow-md">Check answers</button>
        </>
    )
}