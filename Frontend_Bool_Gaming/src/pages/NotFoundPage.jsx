import { Link } from "react-router-dom"

function NotFoundPage() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <h1 className="display-1 fw-bold ">WASTED</h1>
      <p className="fs-4">La pagina che cerchi non esiste</p>
      <Link to="/" className="mt-4 text-decoration-none">
        <h3 className="text-primary">Torna alla homepage</h3>
      </Link>
    </div>
  )
}

export default NotFoundPage