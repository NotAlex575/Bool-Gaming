import axios from "axios"
import { useState, useEffect } from "react"

const Homepage = () => {

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
      <div className="row">
        <div className="col-12">
          <h1>BOOLGAMING</h1>
        </div>
        {videogames.map(videogame => {
          return (
            <div className="col-12 col-md-6 col-lg-4" key={videogame.id}>
              <div className="card">
                <img src={`http://localhost:3000/img/videogames/${videogame.image}`} className="card-img-top object-fit-contain" />
                <div className="card-body">
                  <p className="card-text">{videogame.title}</p>
                  <span className="card-text">{videogame.types}</span>
                  <p className="card-text">{videogame.pegi}</p>
                  <p className="card-text">{videogame.release_date}</p>
                </div>
              </div>
            </div>
          )
        }
        )}
      </div>
    </div>
  )
}

export default Homepage