import { useState } from 'react'
import './App.css'
import NavBar from './components/navbar.jsx'
import Terms from './components/terms.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header>
        < NavBar />
      </header>
      <main>

      </main>
      <footer>
        <Terms />
      </footer>
    </>
  )
}

export default App
