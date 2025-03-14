import Header from "../components/Header"
import ContactForm from "../components/ContactForm"
import Footer from "../components/Footer"

const Contact = () => {
  return (
    <>
      <Header />
      <div className="pt-16">
        <ContactForm />
      </div>
      <Footer />
    </>
  )
}

export default Contact

