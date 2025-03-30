import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import PokedexPage from './routes/PokedexPage.tsx';
import AboutPage from './routes/AboutPage.tsx';
import Layout from './components/Layout.tsx';



function App() {

  return (
    <>
     <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<PokedexPage />}/>
              <Route path="/about" element={<AboutPage />}/>
            </Route>
            <Route path="*" element={<h1>404 – Siden blev ikke fundet</h1>} />
          </Routes>
     </Router>
    </>
  )
}

export default App
