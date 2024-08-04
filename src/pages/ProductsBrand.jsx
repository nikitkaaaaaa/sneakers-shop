import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../componets/card/Card";
import { useParams } from "react-router-dom";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Choise, Search } from "../componets/filter/Filter";

const ProductsBrand = () => {
  const [parent, enableAnimations] = useAutoAnimate();

  const [products, setProducts] = useState([]);

  const { brand } = useParams();

  const [search, setSearch] = useState("");

  const [choise, setChoise] = useState("-price");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `https://9fa124965a5b597b.mokky.dev/items?brand=${brand}&sortBy=${choise}&title=*${search}*`
        );
        setProducts(response.data);
      } catch (error) {
        alert(error);
      }
    };
    fetchProducts();
  }, [brand, choise, search]);

  return (
    <>
      <div className="container">
        <div className="flex justify-between my-11">
          <div className="font-bold text-xl">{brand}</div>
          <div className="flex justify-end">
            <Choise setChoise={setChoise} />
            <Search setSearch={setSearch} />
          </div>
        </div>
      </div>
      <hr className="my-10" />
      <div className="container">
        <div className="content" ref={parent}>
          {products.length >= 1 ? (
            products.map((item) => <Card key={item.id} {...item} />)
          ) : (
            <div className="font-bold text-center">
              По вашему запросу ничего {search} <br />
              не найдено
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductsBrand;
