import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://vinted-backend-athenais.herokuapp.com/offers"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);
  return isLoading ? (
    <p>En cours de chargement...</p>
  ) : (
    <div>
      {data.offers.map((offer) => {
        return <div>{offer.product_name}</div>;
      })}
    </div>
  );
};

export default Home;
