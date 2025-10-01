import React from 'react'

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-danger">
        <div className="container-fluid">
          <a className="navbar-brand text-light" href="#">BOOL-GAMING</a>
          <div className='d-flex'>
            <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
                {/* Homepage */}
                <a className="nav-link text-light" aria-current="page" href="#">Home</a>
                {/* SearchPage */}
                <a className="nav-link text-light" href="#">Search Game</a>  
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