import React from 'react';


const Footer = () => {
  return (
    <footer className="footer mt-5">
      <div className="footer-content mt-5">
        <div className="footer-section">
          <h4>Informazioni</h4>
          <ul>
            <li><a href="/about">Chi siamo</a></li>
            <li><a href="/contact">Contatti</a></li>
            <li><a href="/faq">FAQ</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Supporto</h4>
          <ul>
            <li><a href="/terms">Termini di servizio</a></li>
            <li><a href="/privacy">Privacy policy</a></li>
            <li><a href="/returns">Politica di reso</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Seguici</h4>
          <ul className='d-flex'>
            <li><a href="https://facebook.com/tuosito"><i className="fa-brands fa-facebook me-2"></i></a></li>
            <li><a href="https://twitter.com/tuosito"><i className="fa-brands fa-twitter"></i></a></li>
            <li><a href="https://instagram.com/tuosito"><i className="fa-brands fa-instagram ms-2"></i></a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} BoolGaming.Tutti i diritti riservati.</p>
      </div>
    </footer>
  );
};

export default Footer;