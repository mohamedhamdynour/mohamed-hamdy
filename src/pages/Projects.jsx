import Header from "../components/Header"
import ProjectsList from "../components/ProjectsList"
import Footer from "../components/Footer"

const Projects = () => {
  return (
    <>
      <Header />
      <div className="pt-16">
        <ProjectsList />
      </div>
      <Footer />
    </>
  )
}

export default Projects

