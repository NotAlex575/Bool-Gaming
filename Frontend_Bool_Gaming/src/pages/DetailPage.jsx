import axios from "axios"
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DetailPage = () => {

  const { slug } = useParams();
  const [videogame, setVideogame] = useState([]);
  const naviga = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchVideogame = () => {
    axios.get(`${API_URL}videogames`)
      .then(res => {
        const found = res.data.find(f => f.slug === slug);
        setVideogame(found);
      })
      .catch(error => naviga("not-found"));
  }

  useEffect(fetchVideogame, [slug])

  //AGGIUNGI AL CARRELLO (LO SALVA NEL LOCAL STORE)
  const addToCart = () => {
    const cartItem = {
      title: videogame.title,
      genre: videogame.types,
      price: videogame.price,
    };
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    existingCart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(existingCart));
    alert("Gioco aggiunto al carrello!");
  };

  return (
    <div className="container p-130">
      <div className="row mt-5">
        <div className="col-6">
          <div className="card medium-card">
            <img src={`${API_URL}img/videogames/${videogame.image}`} className="img-fluid" />
          </div>
        </div>
        <div className="col-6">
          <div className="ratio ratio-16x9">
            <iframe
              src={videogame.trailer_url?.split("&")[0]}
              title="YouTube video"
              allowFullScreen
            />
          </div>
          <div className="card-body bg-clear mt-3 shadow">
            <div className="container">
              <div className="py-2">
                <h2 className="text-center mt-4">{videogame.title}</h2>
                <p><strong>Genre:</strong> {videogame.types}</p>
                <p><strong>Pegi:</strong> {videogame.pegi}</p>
                <p><strong>Release date:</strong> {videogame.release_date?.split("T")[0]}</p>
                <p><strong>Description:</strong> {videogame.description}</p>
                <p><strong>Price:</strong> {videogame.price}€</p>
              </div>
            </div>
          </div>
          <button onClick={addToCart} className="btn btn-success mt-3">
            Aggiungi al carrello
          </button>
        </div>
      </div>
    </div>
  )
}

export default DetailPage