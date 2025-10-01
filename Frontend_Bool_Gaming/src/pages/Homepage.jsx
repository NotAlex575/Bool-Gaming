import { useState, useEffect } from "react";
import axios from "axios";
import { useGemini } from "../services/GeminiReact";
import GeminiChat from "../services/GeminiChat"

const Homepage = () => {
  const [videogames, setVideogames] = useState([]);
  const { answer, askAI } = useGemini();

  useEffect(() => {
    axios.get('http://localhost:3000/videogames')
      .then(resp => setVideogames(resp.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="container">
      <div className="row">
        {videogames.map(videogame => (
          <div key={videogame.id} className="col-12 col-md-6 col-lg-4 p-2">
            <div className="card">
              <img
                src={`http://localhost:3000/img/videogames/${videogame.image}`}
                className="card-img-top" style={{ height: "420px", width: "100%" }} />
              <div className="card-body">
                <p className="card-text">{videogame.title}</p>
                <span className="card-text">{videogame.types}</span>
                <p className="card-text">{videogame.pegi}</p>
                <p className="card-text">{videogame.release_date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <GeminiChat videogames={videogames}
        askAI={askAI}
        answer={answer} />
    </div>
  );
};

export default Homepage;
