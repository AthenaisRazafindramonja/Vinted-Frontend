import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://vinted-backend-athenais.herokuapp.com/offers"
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);
  return isLoading ? (
    <p>En cours de chargement...</p>
  ) : (
    <div className="card-wrapper">
      {data.map((offer) => {
        return (
          <Link key={offer._id} to={`/offer/${offer._id}`}>
            <div className="card-container">
              <div className="card-user">
                {offer.owner.account.avatar ? (
                  <img
                    src={offer.owner.account.avatar.secure_url}
                    alt={offer.product_name}
                  />
                ) : null}
                <span>{offer.owner.account.username}</span>
              </div>
              <div>
                <img
                  src={offer.product_image.secure_url}
                  alt={offer.product_name}
                />
                <div className="card-price-size-brand">
                  <span>{offer.product_price} €</span>
                  {offer.product_details.map((offer, index) => {
                    return offer.TAILLE ? (
                      <span key={index}>{offer.TAILLE}</span>
                    ) : null;
                  })}
                  {offer.product_details.map((offer, index) => {
                    return offer.MARQUE ? (
                      <span key={index}>{offer.MARQUE}</span>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Home;
