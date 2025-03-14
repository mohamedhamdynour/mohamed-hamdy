import Header from "../components/Header"
import ServicesSection from "../components/Services"
import FeatureCarousel from "../components/FeatureCarousel"
import Testimonials from "../components/Testimonials"
import Footer from "../components/Footer"

const Services = () => {
  return (
    <>
      <Header />
      <div className="pt-16">
        <ServicesSection />
        <FeatureCarousel />
        <Testimonials />
      </div>
      <Footer />
    </>
  )
}

export default Services

