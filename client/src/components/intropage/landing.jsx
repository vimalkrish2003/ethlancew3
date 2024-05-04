import "./landing.css";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Footer from "./Footer";
import Accord from "./faq";

function Landing() {
  return (
    <div className="App">
      <Home />
      <About />
      
      <Accord/>
      <Contact />
      <Footer />
    </div>
  );
}

export default Landing;