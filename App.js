import React, { useState } from "react";
import "./App.css";
import logo from "./assets/logo.png";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProgramList from "./components/ProgramList";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";

function App() {
  const [section, setSection] = useState("home");

  return (
    <div className="App">
      <Navbar onNavigate={setSection} currentSection={section} logo={logo} />
      <main>
        {section === "home" && (
          <>
            <Hero logo={logo} />
            <ProgramList />
            <About />
            <Testimonials />
            <ContactForm />
          </>
        )}
        {section === "programs" && <ProgramList />}
        {section === "about" && <About />}
        {section === "testimonials" && <Testimonials />}
        {section === "contact" && <ContactForm />}
      </main>
      <Footer />
    </div>
  );
}

export default App;