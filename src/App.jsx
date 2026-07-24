import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import Header from "./components/layout/Header.jsx";
import Footer from './components/layout/Footer.jsx'
import Projects from './pages/Projects.jsx'


function App() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/proyectos" element={<Projects />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;