import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5 text-center">
      <div className="container">
        <div className="row justify-content-center">

          <div className="col-12 col-md-4 mb-4">
            <h5 className="text-uppercase mb-3">Informazioni</h5>
            <ul className="list-unstyled">
              <li><Link to="/about" className="text-light text-decoration-none d-block mb-1">Chi siamo</Link></li>
              <li><Link to="/contact" className="text-light text-decoration-none d-block mb-1">Contatti</Link></li>
              <li><Link to="/FAQ" className="text-light text-decoration-none d-block">FAQ</Link></li>
            </ul>
          </div>

          <div className="col-12 col-md-4 mb-4">
            <h5 className="text-uppercase mb-3">Supporto</h5>
            <ul className="list-unstyled">
              <li><Link to="/terms" className="text-light text-decoration-none d-block mb-1">Termini di servizio</Link></li>
              <li><Link to="/privacy" className="text-light text-decoration-none d-block mb-1">Privacy policy</Link></li>
              <li><Link to="/returns" className="text-light text-decoration-none d-block">Politica di reso</Link></li>
            </ul>
          </div>

          <div className="col-12 col-md-4 mb-4">
            <h5 className="text-uppercase mb-3">Seguici</h5>
            <div className="d-flex justify-content-center gap-3">
              <a href="https://facebook.com/" className="text-light fs-4"><i className="fa-brands fa-facebook"></i></a>
              <a href="https://twitter.com/" className="text-light fs-4"><i className="fa-brands fa-x-twitter"></i></a>
              <a href="https://instagram.com/" className="text-light fs-4"><i className="fa-brands fa-instagram"></i></a>
            </div>
          </div>

        </div>

        <div className="text-center mt-4 pt-3 border-top border-secondary">
          <p className="mb-0">
            © {new Date().getFullYear()} BoolGaming. Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
