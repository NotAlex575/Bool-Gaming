import axios from "axios"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";

const SearchPage = () => {
  const [videogames, setVideogames] = useState([]);

  const fetchVideogames = () => {
    axios.get("http://localhost:3000/videogames")
      .then((resp) => {
        setVideogames(resp.data);
      })
      .catch((err) => console.log(err))
  };

  useEffect(fetchVideogames, [])

  return (
    <div className="container">
      <div className="row gy-4">
        <div className="col-12">
          <h1 className="text-center mt-3">BOOLGAMING</h1>
        </div>
        {videogames.map(videogame => {
          return (
            <div className="col-12 col-md-6 col-lg-4" key={videogame.id}>
              <div className="card">
                <Link to={`/detailpage/${videogame.id}`}>
                  <img src={`http://localhost:3000/img/videogames/${videogame.image}`} className="card-img-top" style={{ height: "500px", width: "100%" }} />
                  <div className="card-body">
                    <p className="card-text">{videogame.title}</p>
                    <span className="card-text">Genre: {videogame.types}</span>
                    <p className="card-text">Pegi {videogame.pegi}</p>
                    <p className="card-text">Release date: {videogame.release_date?.split("T")[0]}</p>
                  </div>
                </Link>
              </div>
            </div>
          )
        }
        )}
      </div>
    </div>
  )
}

export default SearchPage