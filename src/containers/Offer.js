import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Offer = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://vinted-backend-athenais.herokuapp.com/offer/${id}`
        );
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
    <div className="offer-body">
      <div className="card-offer">
        <div className="offer-pic">
          <img src={data.product_image.secure_url} alt={data.product_name} />
        </div>
        <div className="card-block-details ">
          <span className="offer-price"> {data.product_price} € </span>
          <div className="card-details">
            {data.product_details.map((elem) => {
              const keys = Object.keys(elem);
              return (
                <div>
                  <span className="elem">{keys[0]}</span>
                  <span className="elem2">{elem[keys[0]]}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offer;
