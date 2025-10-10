import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 991);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalQunantity = cart.reduce((sum, item) => sum + (item.Qunantity || 1), 0);
    setCartCount(totalQunantity);
  };

  useEffect(() => {
    const handleStorageChange = () => updateCartCount();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    const updateIsMobile = () => {
      const mobile = window.innerWidth <= 991;
      setIsMobile(mobile);
      if (mobile) {
        setScrolled(true);
      } else {
        if (isHome) {
          setScrolled(window.scrollY > 50);
        } else {
          setScrolled(true);
        }
      }
    };

    const handleScroll = () => {
      const mobile = window.innerWidth <= 991;
      if (mobile) {
        setScrolled(true);
        return;
      }
      if (isHome) {
        setScrolled(window.scrollY > 50);
      } else {
        setScrolled(true);
      }
    };

    window.addEventListener("resize", updateIsMobile);
    window.addEventListener("scroll", handleScroll);

    updateIsMobile();
    handleScroll();
    updateCartCount();

    return () => {
      window.removeEventListener("resize", updateIsMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname, isHome]);


  return (
    <header className={`${isMobile ? "position-static" : "fixed-top"}`}>
      <nav
        className={`navbar navbar-expand-lg transition-all ${isHome
          ? scrolled
            ? "bg-navbar shadow-sm"
            : "bg-transparent"
          : "bg-navbar shadow-sm"
          }`}
      >
        <div className="container-fluid ms-4 me-4">
          <Link to={"/"} className="navbar-brand text-light">
            <img className="logo" src="../Bool.png" alt="Logo" />
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
                  <Link to={"/"} className="nav-link text-light">
                    {isMobile ? (
                      <i className="fa-solid fa-house fs-5" title="Home"></i>
                    ) : (
                      <strong>Home</strong>
                    )}
                  </Link>
                </li>
              )}
                <li className="nav-item">
                  <Link to={"/searchpage"} className="nav-link text-light">
                    {isMobile ? (
                      <i className="fa-solid fa-magnifying-glass fs-5" title="Search Game"></i>
                    ) : (
                      <strong>Search Game</strong>
                    )}
                  </Link>
                </li>
                <li className="nav-item position-relative">
                  <Link to={"/cartpage"} className="nav-link text-light d-flex align-items-center">
                    {isMobile ? (
                      <i className="fa-solid fa-cart-shopping fs-5"></i>
                    ) : (
                      <strong>Go to cart</strong>
                    )}
                    {cartCount > 0 && (
                      <span className="badge bg-danger ms-1">{cartCount}</span>
                    )}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
      </nav>
    </header>
  );
};

export default Header;

