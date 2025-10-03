import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-danger">
        <div className="container-fluid p-4">
          <Link to={"/"} className="navbar-brand text-light" href="#">BOOL-GAMING</Link>
          <div className='d-flex'>
            <button class="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
              <ul class="navbar-nav">
                <li class="nav-item">
                  {/* Homepage */}
                  <Link to={"/"} className="nav-link text-light" aria-current="page" href="#">Home</Link>
                </li>
                <li class="nav-item">
                  {/* SearchPage */}
                  <Link to={"/searchpage"} className="nav-link text-light" href="#">Search Game</Link>
                </li>
                <li class="nav-item">
                  {/* CartPage */}
                    <a className="nav-link text-light" href="#">Go to cart</a>
                </li>
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown link
                  </a>
                  <ul class="dropdown-menu">
                    <li><Link to={"/"} className="nav-link text-light" aria-current="page" href="#">Home</Link></li>
                    <li><Link to={"/searchpage"} className="nav-link text-light" href="#">Search Game</Link></li>
                    <li><a className="nav-link text-light" href="#">Go to cart</a></li>
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



