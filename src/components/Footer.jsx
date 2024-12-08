// src/components/Footer.jsx
import React from 'react';
import "../styles/footer.css"

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-copy">
            &copy; Copyright <strong><span>FinanceApp</span></strong>. Todos os direitos reservados
          </div>
          {/* <div className="footer-socials">
            <a href="https://www.linkedin.com/in/ceciliameds/" target="_blank" className="social-icon">
              <img src="images/linkedin.png" alt="LinkedIn" />
            </a>
            <a href="https://www.instagram.com/ceciliameds/" target="_blank" className="social-icon">
              <img src="images/instagram.png" alt="Instagram" />
            </a>
            <a href="https://github.com/ceciliameds" target="_blank" className="social-icon">
              <img src="images/github.png" alt="GitHub" />
             </a> 
           </div> */}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
