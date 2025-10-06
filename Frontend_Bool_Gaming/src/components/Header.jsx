import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") return; // attiva solo in homepage

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);

  const isHome = location.pathname === "/"

  return (
    <header className="fixed-top">
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
                <li className="nav-item">
                  {/* Homepage */}
                  <Link to={"/"} className="nav-link text-light" aria-current="page" href="#"><strong>Home</strong></Link>
                </li>
                <li className="nav-item">
                  {/* SearchPage */}
                  <Link to={"/searchpage"} className="nav-link text-light" href="#"><strong>Search Game</strong></Link>
                </li>
                <li className="nav-item">
                  {/* CartPage */}
                  <a className="nav-link text-light" href="#"><strong>Go to cart</strong></a>
                </li>
                <li className="nav-item dropdown">
                  <ul className="dropdown-menu">
                    <li><Link to={"/"} className="nav-link text-light" aria-current="page" href="#"><strong>Home</strong></Link></li>
                    <li><Link to={"/searchpage"} className="nav-link text-light" href="#"><strong>Search Game</strong></Link></li>
                    <li><a className="nav-link text-light" href="#"><strong>Go to cart</strong></a></li>
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



