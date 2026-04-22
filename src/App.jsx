import { HashRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HeartLikeButton from './components/HeartLikeButton'
import HomePage from './pages/HomePage'
import ProjectPage from './pages/ProjectPage'
import ProjectsPage from './pages/ProjectsPage'
import './index.css'

function App() {
  return (
    <HashRouter>
      <Navbar />
      <HeartLikeButton />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/project/:id" element={<ProjectPage />} />
      </Routes>
    </HashRouter>
  )
}

export default App
