import axios from "axios"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";

const Homepage = () => {

  const [videogame, setVideogame] = useState([]);
  const [chip, setChip] = useState([]);
  const [forKid, setForKid] = useState([]);
  const naviga = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/videogames")
      .then(response => {
        const data = response.data;
        setVideogame(data);

        //I PIU ECONOMICI
        const minPrice = Math.min(...data.map(p => parseFloat(p.price)));
        const videogameChip = data.filter(p => parseFloat(p.price) === minPrice);
        setChip(videogameChip);

        //PEGI UNDER 12
        const videogameForKids = data.filter(pegiKid => parseInt(pegiKid.pegi) <= 12);
        setForKid(videogameForKids);
      })
      .catch(error => naviga("not-found"));
  }, []);


  return (
    <>



      <div className="d-flex justify-content-center align-items-center text-center hero-bg pt-5">
        <div className="color-white pt-5">
          <h1 className="mb-4">Benvenuto in BOOLGAMING!</h1>
          <h5>
            Non vendiamo sogni...ma giochi di QUALITA'!
          </h5>
        </div>
      </div>
      <div className="container mt-5">
        <div className="row gy-4">
          <div className="col-12 text-center my-5">
            <h2 className="color-white">I più economici</h2>
          </div>
          {chip.map(c => {
            return (
              <div className="col-12 col-md-6 col-lg-4 text-center" key={c.id}>
                <div className="card">
                  <Link to={`/detailpage/${c.slug}`}>
                    <img src={`http://localhost:3000/img/videogames/${c.image}`} className="card-img-top" style={{ height: "400px", width: "100%" }} />
                    <div className="card-body">
                      <p className="card-text"><strong>{c.title}</strong></p>
                      <p className="card-text"><strong>Price:</strong> {c.price}€</p>
                    </div>
                  </Link>
                </div>
              </div>
            )
          }
          )}
        </div>
      </div>
      <div className="container mt-5">
        <div className="row gy-4">
          <div className="col-12 text-center my-5">
            <h2 className="color-white">Under 12</h2>
          </div>
          {forKid.map(c => {
            return (
              <div className="col-12 col-md-6 col-lg-4 text-center" key={c.id}>
                <div className="card">
                  <Link to={`/detailpage/${c.slug}`}>
                    <img src={`http://localhost:3000/img/videogames/${c.image}`} className="card-img-top" style={{ height: "400px", width: "100%" }} />
                    <div className="card-body">
                      <p className="card-text"><strong>{c.title}</strong></p>
                      <p className="card-text"><strong>Price:</strong> {c.price}€</p>
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