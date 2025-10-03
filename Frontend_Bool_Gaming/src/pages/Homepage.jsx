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
      <div className="d-flex justify-content-center align-items-center text-center hero-bg pt-5">
        <div className="text-white">
          <h1 className="mb-4">Benvenuto in BOOLGAMING!</h1>
          <h5>
            Non vendiamo sogni...ma giochi di QUALITA'!
          </h5>
        </div>
      </div>
      <div className="container mt-5">
        <div className="row gy-4">
          <div className="col-12 text-center">
            <h2>I più economici</h2>
          </div>
          {chip.map(c => {
            return (
              <div className="col-12 col-md-6 col-lg-4 text-center" key={c.id}>
                <div className="card">
                  <Link to={`/detailpage/${c.slug}`}>
                    <img src={`http://localhost:3000/img/videogames/${c.image}`} className="card-img-top" style={{ height: "500px", width: "100%" }} />
                    <div className="card-body">
                      <p className="card-text">{c.title}</p>
                      <span className="card-text">Genre: {c.types}</span>
                      <p className="card-text">Pegi {c.pegi}</p>
                      <p className="card-text">Release date: {c.release_date?.split("T")[0]}</p>
                      <p className="card-text">Price: {c.price}</p>
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