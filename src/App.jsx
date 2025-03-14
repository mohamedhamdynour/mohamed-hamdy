import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./contexts/ThemeContext"
import { LanguageProvider } from "./contexts/LanguageContext"
import PrivateRoute from "./components/PrivateRoute"
import getBaseUrl from "./utils/baseUrl"

// Public pages
import Home from "./pages/Home"
import About from "./pages/About"
import Projects from "./pages/Projects"
import Services from "./pages/Services"
import Contact from "./pages/Contact"

// Admin pages
import Login from "./components/admin/Login"
import Dashboard from "./components/admin/Dashboard"
import BasicInfo from "./components/admin/BasicInfo"
import Skills from "./components/admin/Skills"
import ProjectsAdmin from "./components/admin/Projects"
import ServicesAdmin from "./components/admin/Services"
import ClientsAdmin from "./components/admin/Clients"
import Languages from "./components/admin/Languages"
import Statistics from "./components/admin/Statistics"

function App() {
  const baseUrl = getBaseUrl()

  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router basename={baseUrl}>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />

            {/* Admin routes */}
            <Route path="/admin" element={<Login />} />
            <Route
              path="/admin/*"
              element={
                <PrivateRoute>
                  <Routes>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="basic-info" element={<BasicInfo />} />
                    <Route path="skills" element={<Skills />} />
                    <Route path="projects" element={<ProjectsAdmin />} />
                    <Route path="services" element={<ServicesAdmin />} />
                    <Route path="clients" element={<ClientsAdmin />} />
                    <Route path="languages" element={<Languages />} />
                    <Route path="statistics" element={<Statistics />} />
                  </Routes>
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default App

