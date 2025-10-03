import { Link } from "react-router-dom"

function NotFoundPage() {
  return (
    <div className="text-center mt-3">
      <h2>Spiacente</h2>
      <p>La pagina non è stata trovata</p>
      <Link to="/">Torna alla homepage</Link>
    </div>
  )
}

export default NotFoundPage
