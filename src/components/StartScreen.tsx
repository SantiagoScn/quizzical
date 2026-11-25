

type StartScreenProps = {
    setScreen: React.Dispatch<React.SetStateAction<'start' | 'quiz'>>
}

export default function StartScreen({ setScreen }: StartScreenProps) {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen gap-4 bg-slate-50">
            <h1 className="text-3xl font-bold text-indigo-900">Quizzical</h1>
            <p className="max-w-md text-center text-slate-600 leading-relaxed">A fun and interactive quiz app that challenges your knowledge across various topics with timed questions and instant feedback.</p>
            <button onClick={() => setScreen('quiz')} className="bg-blue-900 transition-colors duration-300 ease-in-out hover:bg-indigo-600 hover:scale-105 text-white text-xl font-bold py-4 px-8 rounded cursor-pointer shadow-md">
                Start Quiz
            </button>
        </div>
    )
}