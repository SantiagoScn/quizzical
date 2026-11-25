import { useState } from 'react'
import './App.css'
import StartScreen from './components/StartScreen'
import Quiz from './components/Quiz'

function App() {
  const [screen, setScreen] = useState<'start' | 'quiz'>('start')

  return (
    <>
      {screen === 'start' 
        ? <StartScreen setScreen={setScreen}/>
        : <Quiz />
      }
    </>
  )
}

export default App
