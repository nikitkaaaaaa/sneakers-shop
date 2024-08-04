import React from "react";
import { Link } from "react-router-dom";

const Card = ({ id, imageUrl, price, title, category }) => {
  return (
    <Link
      to={`/product/${category}/${id}`}
      onClick={() => window.scrollTo({ top: "0" })}
    >
      <div className="product">
        <img src={imageUrl[0]} alt={title} />
        <div className="font-bold">{price} ₽</div>
        <div className="text-sm">{title}</div>
      </div>
    </Link>
  );
};

export default Card;
