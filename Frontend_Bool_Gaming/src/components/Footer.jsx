import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-5 text-center">
      <div className="container">
        <div className="row justify-content-center">

          <div className="col-12 col-md-4 mb-4">
            <h5 className="text-uppercase mb-3">Informazioni</h5>
            <ul className="list-unstyled">
              <li><a href="/about" className="text-light text-decoration-none d-block mb-1">Chi siamo</a></li>
              <li><a href="/contact" className="text-light text-decoration-none d-block mb-1">Contatti</a></li>
              <li><a href="/faq" className="text-light text-decoration-none d-block">FAQ</a></li>
            </ul>
          </div>

          <div className="col-12 col-md-4 mb-4">
            <h5 className="text-uppercase mb-3">Supporto</h5>
            <ul className="list-unstyled">
              <li><a href="/terms" className="text-light text-decoration-none d-block mb-1">Termini di servizio</a></li>
              <li><a href="/privacy" className="text-light text-decoration-none d-block mb-1">Privacy policy</a></li>
              <li><a href="/returns" className="text-light text-decoration-none d-block">Politica di reso</a></li>
            </ul>
          </div>

          <div className="col-12 col-md-4 mb-4">
            <h5 className="text-uppercase mb-3">Seguici</h5>
            <div className="d-flex justify-content-center gap-3">
              <a href="https://facebook.com/" className="text-light fs-4"><i className="fa-brands fa-facebook"></i></a>
              <a href="https://twitter.com/" className="text-light fs-4"><i className="fa-brands fa-twitter"></i></a>
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
