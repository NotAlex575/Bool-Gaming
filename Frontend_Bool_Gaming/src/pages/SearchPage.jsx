import axios from "axios"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";

const SearchPage = () => {
  const [videogames, setVideogames] = useState([])
  const [search, setSearch] = useState("");

  //evento per attivare/disattivare il video quando il mouse sta over sulla card
  const [hoveredCard, setHoveredCard] = useState(null);

  const naviga = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [pegi, setPegi] = useState("");
  const [type, setType] = useState("");

  const fetchVideogames = () => {
    axios.get(`${API_URL}videogames`)
      .then((resp) => {
        setVideogames(resp.data);
      })
      .catch((err) => naviga("not-found"))
  };


  const filteredGames = videogames.filter((game) => {
    const matchesSearch =
      game.title.toLowerCase().includes(search.toLowerCase()) ||
      String(game.pegi).includes(search) ||
      game.types.toLowerCase().includes(search.toLowerCase());

    const matchesMinPrice = minPrice === "" || game.price >= parseFloat(minPrice);
    const matchesMaxPrice = maxPrice === "" || game.price <= parseFloat(maxPrice);
    const matchesPegi = pegi === "" || String(game.pegi) === pegi;
    const matchesType = type === "" || game.types.toLowerCase() === type.toLowerCase();

    return matchesSearch && matchesMinPrice && matchesMaxPrice && matchesPegi && matchesType;
  });

  useEffect(fetchVideogames, [filteredGames])

  return (
    <>
      <div className="container">
        <div className="row gy-4">
          <div className="col-12 p-130">
            <SearchBar onSearch={setSearch} />
          </div>
        </div>
      </div>
      <div className="container pt-5 d-flex justify-content-center align-items-center">
        <div className="bg-white p-4 rounded-4 shadow-lg row g-3">
          <div className="col-12 col-md-3">
            <input
              type="number"
              placeholder="Prezzo minimo"
              value={minPrice}
               onChange={(e) => {
                const value = e.target.value;
                setMinPrice(value >= 0 || value === "" ? value : 0);
              }}
              className="form-control"
            />
          </div>
          <div className="col-12 col-md-3">
            <input
              type="number"
              placeholder="Prezzo massimo"
              value={maxPrice}
              onChange={(e) => {
                const value = e.target.value;
                setMaxPrice(value >= 0 || value === "" ? value : 0);
              }}
              className="form-control"
            />
          </div>
          <div className="col-12 col-md-3">
            <select
              value={pegi}
              onChange={(e) => setPegi(e.target.value)}
              className="form-select"
            >
              <option value="">PEGI</option>
              <option value="3">3+</option>
              <option value="7">7+</option>
              <option value="12">12+</option>
              <option value="16">16+</option>
              <option value="18">18+</option>
            </select>
          </div>
          <div className="col-12 col-md-3">
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="form-select"
            >
              <option value="">Tipo</option>
              <option value="RPG">RPG</option>
              <option value="Action">Action</option>
              <option value="Adventure">Adventure</option>
              <option value="Sport">Sport</option>
              <option value="Shooter">Shooter</option>
              <option value="Simulation">Simulation</option>
              <option value="Strategy">Strategy</option>
              <option value="Horror">Horror</option>
              <option value="Fighting">Fighting</option>
              <option value="Stealth">Stealth</option>
              <option value="Survival">Survival</option>
            </select>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row gy-4">
          <div className="col-12">
            <h1 className="text-center color-white mt-3">BOOLGAMING</h1>
          </div>
          {filteredGames.length === 0 ? (
            <div className="text-center mt-5 text-white">Nessun gioco trovato...</div>
          ) : (
            filteredGames.map((videogame) => (
              <div
                className="col-12 col-md-6 col-lg-4 text-center"
                key={videogame.id}
                // VIDEO CARD ON
                onMouseEnter={() => setHoveredCard(videogame.id)}
                // VIDEO CARD OFF
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="card card-game">
                  <Link to={`/detailpage/${videogame.slug}`}>
                    {hoveredCard === videogame.id ? (

                      //VIDEO
                      <iframe
                        src={`${videogame.trailer_url.split("&")[0]}?autoplay=1&mute=1&controls=0`}
                        allow="autoplay"
                        title={videogame.title}
                        style={{ border: "none", pointerEvents: "none", height: "500px", width: "100%" }} />
                    ) : (

                      //IMAGE
                      <img src={`${API_URL}img/videogames/${videogame.image}`} className="card-img-top" style={{ height: "500px", width: "100%" }} />
                    )}
                    <div className="card-body">
                      <p className="card-text"><strong>{videogame.title}</strong></p>
                      <p className="card-text"><strong>Price:</strong> {videogame.price}€</p>
                    </div>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}

export default SearchPage