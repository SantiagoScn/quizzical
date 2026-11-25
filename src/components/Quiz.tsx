import Question from './Question'
import React from 'react'
import * as he from 'he'

type QuestionData = {
    question: string,
    correct_answer: string,
    incorrect_answers: string[]
}

export default function Quiz(){
    const [questions, setQuestions] = React.useState<QuestionData[]>([])
    const [isLoading, setIsLoading] = React.useState(false)

    React.useEffect(() => {
        async function getData() {
            try {
                setIsLoading(true)
                const res = await fetch("https://opentdb.com/api.php?amount=5&type=multiple")
                if (!res.ok) {
                    throw new Error(`HTTP error: ${res.status}`)
                }
                const data = await res.json()
                setQuestions(data.results)
            } catch (err) {
                console.error(err)
            } finally {
                setIsLoading(false)
            }
        }
        getData()
    }, [])
    console.log(questions)

    return (
        <div className="flex flex-col justify-center items-start gap-4 p-10">
            {isLoading && <p>Loading questions...</p>}
            {questions.map((question, index) => (
                <Question key={index} question={he.decode(question.question)} options={question.incorrect_answers.concat(question.correct_answer)} correctAnswer={question.correct_answer} />
            ))}
        </div>
    )
}