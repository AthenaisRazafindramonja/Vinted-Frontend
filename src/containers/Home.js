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
    <div className="container">
      {data.map((offer) => {
        return (
          <Link key={offer._id} to={`/offer/${offer._id}`}>
            <h4>{offer.product_name}</h4>
          </Link>
        );
      })}
    </div>
  );
};

export default Home;
