import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import Header from "./components/layout/Header.jsx";
import Footer from './components/layout/Footer.jsx'
import Projects from './pages/Projects.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import BackToTop from './components/BackToTop.jsx'


function App() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/proyectos" element={<Projects />} />
      </Routes>
      <Footer/>
      <BackToTop />
    </div>
  );
}

export default App;