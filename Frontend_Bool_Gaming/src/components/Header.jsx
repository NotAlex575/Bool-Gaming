import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-danger">
        <div className="container-fluid p-4">
          <Link to={"/"} className="navbar-brand text-light" href="#">BOOL-GAMING</Link>
          <div className='d-flex'>
            <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                {/* Homepage */}
                <Link to={"/"} className="nav-link text-light" aria-current="page" href="#">Home</Link>
                {/* SearchPage */}
                <Link to={"/searchpage"} className="nav-link text-light" href="#">Search Game</Link>
                {/* CartPage */}
                <a className="nav-link text-light" href="#">Go to cart</a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header