import { useState } from 'react'
import './App.css'
import NavBar from './components/main_components/navbar/NavBar.jsx'
import Terms from './components/main_components/terms/Terms.jsx'
import Grid from './containers/grid/GridContainer.jsx'

function App() {
  const [count, setCount] = useState(0)
  const recipes = ["test", "test2", "test3", "test4", "test5", "test6", "test7", "test8", "test9", "test10"]

  return (
    <>
      <header>
        < NavBar />
      </header>
      <main>
        <Grid columns={3}>
          {recipes.map((recipe, index) => (
            <div key={index} className="grid-item">
              {recipe}
            </div>
          ))}
        </Grid>
      </main>
      <footer>
        <Terms />
      </footer>
    </>
  )
}

export default App
