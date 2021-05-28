import axios from "axios";
import { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";

const Publish = ({ userToken }) => {
  const [file, setFile] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [condition, setCondition] = useState("");
  const [color, setColor] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState(0);

  const history = useHistory();

  const formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("brand", brand);
  formData.append("size", size);
  formData.append("condition", condition);
  formData.append("color", color);
  formData.append("city", city);
  formData.append("price", price);
  formData.append("picture", file);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://vinted-backend-athenais.herokuapp.com/offer/publish",
        formData,
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      if (response.data._id) {
        history.pushState(`/offer/${response.data._id}`);
      } else {
        alert("Une erreur est survenue");
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  return userToken ? (
    <div className="container-publish">
      <div className="publish">
        <h2>Vends ton article</h2>
        <form onSubmit={handleSubmit}>
          <div className="file-block">
            <span>Ajoute jusqu'à 20 photos. Voir astuces</span>
            <input
              type="file"
              onChange={(event) => setFile(event.target.files[0])}
            />
          </div>

          <div className="article-block">
            <div className="block-section">
              <h4 className="title-text">Titre</h4>
              <input
                className="input-text"
                type="text"
                placeholder="ex : Chemise Sézane verte"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>

            <div className="block-section">
              <h4 className="title-text">Décris ton article</h4>
              <textarea
                className="textarea input-text"
                placeholder="ex : porté quelques fois, taille correctement"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
          </div>
          <div className="details-block">
            <div className="block-section">
              <h4 className="title-text">Marque</h4>
              <input
                className="input-text"
                type="text"
                placeholder="ex : Zara"
                value={brand}
                onChange={(event) => setBrand(event.target.value)}
              />
            </div>

            <div className="block-section">
              <h4 className="title-text">Taille</h4>
              <input
                className="input-text"
                type="text"
                placeholder="ex : S / 36"
                value={size}
                onChange={(event) => setSize(event.target.value)}
              />
            </div>

            <div className="block-section">
              <h4 className="title-text">État</h4>
              <input
                className="input-text"
                type="text"
                placeholder="ex : Très bon état"
                value={condition}
                onChange={(event) => setCondition(event.target.value)}
              />
            </div>

            <div className="block-section">
              <h4 className="title-text">Couleur</h4>
              <input
                className="input-text"
                type="text"
                placeholder="ex : Noir"
                value={color}
                onChange={(event) => setColor(event.target.value)}
              />
            </div>

            <div className="block-section">
              <h4 className="title-text">Emplacement</h4>
              <input
                className="input-text"
                type="text"
                placeholder="ex : Paris"
                value={city}
                onChange={(event) => setCity(event.target.value)}
              />
            </div>
          </div>

          <div className="price-block">
            <div className="block-section">
              <h4 className="title-text">Prix</h4>
              <input
                className="input-text"
                type="number"
                placeholder="0,00 €"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
              />
            </div>
            <div className="block-section">
              <input type="checkbox" />
              <span>Je suis intéressé(e) par les échanges</span>
            </div>
          </div>
          <div className="last-part">
            <p>
              Un vendeur professionnel se faisant passer pour un consommateur ou
              un non-professionnel sur Vinted encourt les sanctions prévues à
              l'Article <span>L.132-2 </span> du Code de la Consommation.
            </p>

            <input type="submit" value="Ajouter" />
          </div>
        </form>
      </div>
    </div>
  ) : (
    <Redirect to="/login" />
  );
};

export default Publish;
