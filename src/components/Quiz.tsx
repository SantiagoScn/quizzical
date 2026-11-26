import Question from './Question'
import React from 'react'
import * as he from 'he'

type QuestionData = {
    question: string,
    correct_answer: string,
    incorrect_answers: string[],
    options: string[]
}

export default function Quiz(){
    const [questions, setQuestions] = React.useState<QuestionData[]>([])
    const [isLoading, setIsLoading] = React.useState(false)
    const [answers, setAnswers] = React.useState<string[]>([])
    const [hasChecked, setHasChecked] = React.useState(false)
    const [quizKey, setQuizKey] = React.useState(0)

    React.useEffect(() => {
        async function getData() {
            try {
                setIsLoading(true)
                const res = await fetch("https://opentdb.com/api.php?amount=5&type=multiple")
                if (!res.ok) {
                    throw new Error(`HTTP error: ${res.status}`)
                }
                const data = await res.json()
                const newQuestions = data.results.map((question: QuestionData) => ({
                    ...question,
                    options: [...question.incorrect_answers, question.correct_answer]
                        .sort(() => Math.random() - 0.5)
                }))

                setQuestions(newQuestions)
            } catch (err) {
                console.error(err)
            } finally {
                setIsLoading(false)
            }
        }
        getData()
    }, [quizKey])
    
    function selectAnswer(index: number, answer: string) {
        setAnswers(prevAnswers => {
            const newAnswers = [...prevAnswers]
            newAnswers[index] = answer
            return newAnswers
        })
    }

    function checkAnswers() {
        return questions.filter((question, index) => question.correct_answer === answers[index]).length
    }

    return (
        <div className='flex flex-col justify-center items-center'>
            <div className="flex flex-col justify-center items-start gap-4 p-10">
                {isLoading && <p>Loading questions...</p>}
                {questions.map((question, index) => { 
                    return (
                        <Question 
                        key={index} 
                        question={he.decode(question.question)} 
                        options={question.options.map(answer => he.decode(answer))}
                        correctAnswer={he.decode(question.correct_answer)}
                        selectedAnswer={answers[index] || ""}
                        onSelect={(answer) => selectAnswer(index, answer)}
                        hasChecked={hasChecked}
                        />
                    )
                })}
            </div>
            {hasChecked && <p className='text-2xl text-blue-950 font-bold pb-6'>You scored {checkAnswers()}/5 correct answers!</p>}
            {hasChecked 
                ? <button onClick={() => {
                    setHasChecked(false)
                    setAnswers([])
                    setQuizKey(prevKey => prevKey + 1)
                }} className="bg-blue-900 transition-colors duration-300 ease-in-out hover:bg-indigo-600 hover:scale-105 text-white text-xl font-bold py-4 px-8 rounded-2xl cursor-pointer shadow-md">Play again</button>
                
                :<button onClick={() => setHasChecked(true)} className="bg-blue-900 transition-colors duration-300 ease-in-out hover:bg-indigo-600 hover:scale-105 text-white text-xl font-bold py-4 px-8 rounded-2xl cursor-pointer shadow-md">Check answers</button>
            }
            
        </div>
    )
}