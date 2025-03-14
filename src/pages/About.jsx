import Header from "../components/Header"
import AboutMe from "../components/AboutMe"
import Skills from "../components/Skills"
import Timeline from "../components/Timeline"
import Features from "../components/Features"
import Footer from "../components/Footer"

const About = () => {
  return (
    <>
      <Header />
      <div className="pt-16">
        <AboutMe />
        <Skills />
        <Features />
        <Timeline />
      </div>
      <Footer />
    </>
  )
}

export default About

