import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

export const RundomProducts = ({ title, count }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get(
        "https://9fa124965a5b597b.mokky.dev/items"
      );
      setProducts(shuffleArray(response.data));
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <div className="text-3xl font-bold">{title}</div>
      {!products || products.length === 0 ? (
        <div className="container_products_skeleton">
          {Array.from({ length: count }).map((_, index) => (
            <Skeleton key={index} className="max-w-[270px]" height={196} />
          ))}
        </div>
      ) : (
        <div className="container_rundom_products">
          {products.slice(0, count).map((item) => (
            <Link
              to={`/product/${item.category}/${item.id}`}
              onClick={() => window.scrollTo({ top: "0" })}
            >
              <div className="max-w-[250px] h-[200px]" key={item.id}>
                <img
                  src={item.imageUrl[0]}
                  alt={item.title}
                  className="max-w-[210px]"
                />
                <div className="font-bold">{item.price} ₽</div>
                <div className="title_rundom_products">{item.title}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
