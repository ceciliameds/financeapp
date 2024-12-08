import React from "react";
import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-copy">
            &copy; Copyright{" "}
            <strong>
              <span>FinanceApp</span>
            </strong>
            . Todos os direitos reservados
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
