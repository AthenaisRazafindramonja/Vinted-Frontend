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
    <div className="card-offer">
      <div className="offer-pic">
        <img
          className="img"
          src={data.product_image.secure_url}
          alt={data.product_name}
        />
      </div>
      <div className="card-details1">
        <span>MARQUE</span>
        <span>TAILLE</span>
        <span>ÉTAT</span>
        <span>COULEUR</span>
        <span>EMPLACEMENT</span>
      </div>
      <div className="card-details2">
        <span>{data.product_price} €</span>
        {data.product_details.map((data, index) => {
          return data.MARQUE ? <span key={index}>{data.MARQUE}</span> : null;
        })}
        {data.product_details.map((data, index) => {
          return data.TAILLE ? <span key={index}>{data.TAILLE}</span> : null;
        })}
        {data.product_details.map((data, index) => {
          return data.ÉTAT ? <span key={index}>{data.ÉTAT}</span> : null;
        })}
        {data.product_details.map((data, index) => {
          return data.COULEUR ? <span key={index}>{data.COULEUR}</span> : null;
        })}
        {data.product_details.map((data, index) => {
          return data.EMPLACEMENT ? (
            <span key={index}>{data.EMPLACEMENT}</span>
          ) : null;
        })}
      </div>
    </div>
  );
};

export default Offer;
