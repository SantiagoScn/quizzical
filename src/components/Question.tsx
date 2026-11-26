type QuestionProps = {
    question: string,
    options: string[],
    correctAnswer: string,
    selectedAnswer: string,
    onSelect: (answer: string) => void,
    hasChecked: boolean
}

export default function Question( {question, options, correctAnswer, selectedAnswer, onSelect, hasChecked}: QuestionProps){

    return (
        <>
            <form>
                <h2 className="font-bold text-blue-950 text-xl ">{question}</h2>
                <div className="flex gap-2 flex-wrap">
                    {options.map((option, index) => { 
                        const isCorrect = option === correctAnswer
                        const isSelected = option === selectedAnswer
                        let answerClass = ""

                        if (hasChecked && isCorrect){
                            answerClass = "bg-green-200 font-bold border-none"
                        } else if (hasChecked && isSelected){
                            answerClass = "bg-red-200 opacity-50 border-none"
                        }
                        if (!hasChecked && isSelected) {
                            answerClass = "bg-blue-200 border-none "
                        }
                        
                        return (
                            <label key={index} className="flex m-2">
                                <input 
                                    className='sr-only peer' 
                                    type="radio" 
                                    name={`answer-${question}`} 
                                    value={option} 
                                    checked={selectedAnswer === option} 
                                    onChange={() => onSelect(option)} 
                                    disabled={hasChecked}
                                />
                                <span className={`block border border-blue-950 rounded-lg px-4 py-2 hover:bg-blue-100  ${answerClass}`}>
                                    {option}
                                </span>
                            </label>
                        )
                    })}
                </div>
                <hr className="w-full opacity-25 m-2"></hr>
            </form>
        </>
    )
}