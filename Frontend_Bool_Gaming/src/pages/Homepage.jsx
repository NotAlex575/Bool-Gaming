import axios from "axios"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";

const Homepage = () => {

  const [videogame, setVideogame] = useState([]);
  const [chip, setChip] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/videogames")
      .then(response => {
        const data = response.data;
        setVideogame(data);

        const minPrice = Math.min(...data.map(p => parseFloat(p.price)));

        const videogameChip = data.filter(p => parseFloat(p.price) === minPrice);

        setChip(videogameChip);

      })
      .catch(error => {
        console.error("Errore nel fetch:", error);
      });
  }, []);


  return (
    <>
      <div className="d-flex justify-content-center align-items-center text-center hero-bg">
        <div className="text-white">
          <h1 className="mb-4">Benvenuto in BOOLGAMING!</h1>
          <h5>
            Non vediamo sogni...ma giochi di QUALITA'!
          </h5>
        </div>
      </div>
      <div className="container">
        <div className="row gy-4">
          {chip.map(c => {
            return (
              <div className="col-12 col-md-6 col-lg-4" key={c.id}>
                <div className="card">
                  <Link to={`/detailpage/${c.id}`}>
                    <img src={`http://localhost:3000/img/videogames/${c.image}`} className="card-img-top" style={{ height: "500px", width: "100%" }} />
                    <div className="card-body">
                      <p className="card-text">{c.title}</p>
                      <span className="card-text">{c.types}</span>
                      <p className="card-text">{c.pegi}</p>
                      <p className="card-text">{c.release_date}</p>
                    </div>
                  </Link>
                </div>
              </div>
            )
          }
          )}
        </div>
      </div>
    </>
  )
}

export default Homepage