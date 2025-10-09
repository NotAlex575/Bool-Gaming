import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 990);
  const location = useLocation();
  const isHome = location.pathname === "/"

  useEffect(() => {
    // funzione che aggiorna isMobile e imposta scrolled correttamente
    const updateIsMobile = () => {
      const mobile = window.innerWidth <= 990;
      setIsMobile(mobile);

      if (mobile) {
        // su mobile vogliamo la navbar sempre visibile (senza condizione scroll)
        setScrolled(true);
      } else {
        // su desktop: se siamo in home, applichiamo la condizione sullo scroll,
        // altrimenti navbar sempre visibile fuori dalla home
        if (isHome) {
          setScrolled(window.scrollY > 50);
        } else {
          setScrolled(true);
        }
      }
    };

    const handleScroll = () => {
      const mobile = window.innerWidth <= 990;
      if (mobile) {
        // su mobile il comportamento di scroll non deve cambiare lo stato:
        setScrolled(true);
        return;
      }

      // desktop: comportamento originale (solo in homepage diventa opaca dopo scroll)
      if (isHome) {
        setScrolled(window.scrollY > 50);
      } else {
        setScrolled(true);
      }
    };

    // registra listener
    window.addEventListener("resize", updateIsMobile);
    window.addEventListener("scroll", handleScroll);

    // inizializza subito gli stati corretti
    updateIsMobile();
    handleScroll();

    // cleanup
    return () => {
      window.removeEventListener("resize", updateIsMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname, isHome]); // ricalcola anche quando cambia la route


  return (
    <header className={`${isMobile ? "position-static" : "fixed-top"}`}>
      <nav className={`navbar navbar-expand-lg transition-all ${isHome ? scrolled ? "bg-navbar shadow-sm" : "bg-transparent" : "bg-navbar shadow-sm"}`}>
        <div className="container-fluid ms-4 me-4">
          <Link to={"/"} className="navbar-brand text-light" href="#">
            <img className="logo" src="../Bool.png" alt="" />
          </Link>
          <div>
            <button className="navbar-toggler bg-light mr-40px" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav ms-auto">
                {/* condizione per essere visibile solo all'infuori di homepage */}
                {!isHome && (

                  <li className="nav-item">
                    {/* Homepage */}
                    <Link to={"/"} className="nav-link text-light" aria-current="page" href="#"><strong>Home</strong></Link>
                  </li>
                )}

                <li className="nav-item">
                  {/* SearchPage */}
                  <Link to={"/searchpage"} className="nav-link text-light" href="#"><strong>Search Game</strong></Link>
                </li>
                <li className="nav-item">
                  {/* CartPage */}
                  <Link to={"/cartpage"} className="nav-link text-light" href="#"><strong>Go to cart</strong></Link>
                </li>
                <li className="nav-item dropdown">
                  <ul className="dropdown-menu">
                    <li><Link to={"/"} className="nav-link text-light" aria-current="page" href="#"><strong>Home</strong></Link></li>
                    <li><Link to={"/searchpage"} className="nav-link text-light" href="#"><strong>Search Game</strong></Link></li>
                    <li><Link to={"/cartpage"} className="nav-link text-light" href="#"><strong>Go to cart</strong></Link></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header



