import axios from "axios"
import { useState, useEffect } from "react"

const Homepage = () => {

  const[videogames, setVideogames] = useState([]);

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
          return(
            <div className="col-12 col-md-6 col-lg-4" key={videogames.id}> 
              <div className="card">
                <img src={videogames.image} className="card-img-top" />
                <div className="card-body">
                  <p className="card-text">{videogames.title}</p>
                  <span className="card-text">{videogames.types}</span>
                  <p className="card-text">{videogames.pegi}</p>
                  <p className="card-text">{videogames.release_date}</p>
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