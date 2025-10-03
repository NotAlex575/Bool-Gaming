import axios from "axios"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const DetailPage = () => {

  const { id } = useParams();
  const [videogame, setVideogame] = useState([]);

  const fetchVideogame = () => {
    axios.get(`http://localhost:3000/videogames/${id}`)
    .then((resp) => {
      setVideogame(resp.data)
    })
    .catch((err) => console.log(err))
  }

  useEffect(fetchVideogame, [])

  return (
    <div className="container">
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
          <div className="card-body">
            <h2 className="text-center my-3">{videogame.title}</h2>
            <p>Genre: {videogame.types}</p>
            <p>Pegi {videogame.pegi}</p>
            <p>Release date: {videogame.release_date?.split("T")[0]}</p>
            <p>Description: {videogame.description}</p>
            <p>Price: {videogame.price}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailPage