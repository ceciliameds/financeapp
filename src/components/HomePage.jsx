import React from "react";
import Navbar from "./Navbar";
import Apresentation from "./Apresentation";
import Sobre from "./Sobre";
import Footer from "./Footer";
import "../styles/homepage.css"

function HomePage() {
  return (
    <div>
      <Navbar />
      <Apresentation />
      <Sobre />
      <Footer />
    </div>
  );
}

export default HomePage;
