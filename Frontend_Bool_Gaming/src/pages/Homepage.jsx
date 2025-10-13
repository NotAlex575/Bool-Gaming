import axios from "axios"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import WelcomePopup from "../components/WelcomePopup";


const Homepage = () => {

  const [chip, setChip] = useState([]);
  const [forKid, setForKid] = useState([]);

  //evento per attivare/disattivare il video quando il mouse sta over sulla card
  const [hoveredCard, setHoveredCard] = useState(null);

  const naviga = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${API_URL}homepage`).then(response => {
      setChip(response.data);
    })
      .catch(error => naviga("not-found"));
  }, []);

  useEffect(() => {
    axios.get(`${API_URL}kids`).then(response => {
      setForKid(response.data);
    })
      .catch(error => naviga("not-found"));
  }, []);



  return (
    <>
      <WelcomePopup />
      <div className="d-flex justify-content-center align-items-center text-center hero-bg pt-5">
        <div className="text-white pt-5">
          <h1 className="mb-4 fw-bold">Benvenuto in BOOLGAMING!</h1>
          <h5 className="fw-bold">
            Non vendiamo sogni...ma giochi di QUALITA'!
          </h5>
        </div>
      </div>
      <div className="container mt-5 section-card-1">
        <div className="row gy-4">
          <div className="col-12 text-center my-5">
            <h2 className="text-white fw-bold">I più economici</h2>
          </div>
          {chip.map(c => {
            return (
              <div className="col-12 col-md-6 col-lg-4 text-center"
                key={c.id}
                // VIDEO CARD ON
                onMouseEnter={() => setHoveredCard(c.id)}
                // VIDEO CARD OFF
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="card card-game">
                  <Link to={`/detailpage/${c.slug}`}>
                    {hoveredCard === c.id ? (

                      //VIDEO
                      <iframe
                        src={`${c.trailer_url.split("&")[0]}?autoplay=1&mute=1&controls=0`}
                        allow="autoplay"
                        title={c.title}
                        style={{ border: "none", pointerEvents: "none", height: "500px", width: "100%" }} />
                    ) : (

                      //IMAGE
                      <img src={`${API_URL}img/videogames/${c.image}`} className="card-img-top" style={{ height: "500px", width: "100%" }} />
                    )}
                    <div className="card-body">
                      <p className="card-text"><strong>{c.title}</strong></p>
                      <p className="card-text"><strong>Prezzo:</strong> {c.price}€</p>
                    </div>
                  </Link>
                </div>
              </div>
            )
          }
          )}
        </div>
      </div>
      <div className="container mt-5 section-card-2">
        <div className="row gy-4">
          <div className="col-12 text-center my-5">
            <h2 className="text-white fw-bold">PEGI 12</h2>
          </div>
          {forKid.map(c => {
            return (
              <div className="col-12 col-md-6 col-lg-4 text-center"
                key={c.id}
                // VIDEO CARD ON
                onMouseEnter={() => setHoveredCard(c.id)}
                // VIDEO CARD OFF
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="card card-game">
                  <Link to={`/detailpage/${c.slug}`}>
                    {hoveredCard === c.id ? (

                      //VIDEO
                      <iframe
                        src={`${c.trailer_url.split("&")[0]}?autoplay=1&mute=1&controls=0`}
                        allow="autoplay"
                        title={c.title}
                        style={{ border: "none", pointerEvents: "none", height: "500px", width: "100%" }} />
                    ) : (

                      //IMAGE
                      <img src={`${API_URL}img/videogames/${c.image}`} className="card-img-top" style={{ height: "500px", width: "100%" }} />
                    )}
                    <div className="card-body">
                      <p className="card-text"><strong>{c.title}</strong></p>
                      <p className="card-text"><strong>Prezzo:</strong> {c.price}€</p>
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