import axios from "axios"
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DetailPage = () => {

  const { slug } = useParams();
  const [videogame, setVideogame] = useState([]);
  const naviga = useNavigate();


  const fetchVideogame = () => {
    axios.get(`http://localhost:3000/videogames`)
      .then(res => {
        const found = res.data.find(f => f.slug === slug);
        setVideogame(found);
      })
      .catch(error => naviga("not-found"));
  }

  useEffect(fetchVideogame, [slug])

  return (
    <div className="container p-130">
      <div className="row mt-5">
        <div className="col-6">
          <div className="card medium-card">
            <img src={`http://localhost:3000/img/videogames/${videogame.image}`} className="img-fluid" />
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
        </div>
      </div>
    </div>
  )
}

export default DetailPage