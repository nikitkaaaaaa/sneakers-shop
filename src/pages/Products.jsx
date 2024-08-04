import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import Card from "../componets/card/Card";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { fetchProducts } from "../redux/productsSlice";
import { Choise, ChoiseBrand, Search } from "../componets/filter/Filter";

export const ModelFilterSmallScreen = ({
  showFilterOnMobile,
  setShowFilterOnMobile,
  selectedBrand,
  onBrandChange,
}) => {
  const [selectedOption, setSelectedOption] = useState("Из наличия");

  const brands = ["New Balance", "Jordan", "Nike", "Asics", "Reebok", "Vans"];

  return (
    <div>
      {showFilterOnMobile && (
        <div className="px-5 pt-5 fixed z-10 bg-white w-full top-0 left-0 h-full">
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold">ФИЛЬТРЫ</div>
            <img
              onClick={() => setShowFilterOnMobile(false)}
              src="https://cdn-icons-png.flaticon.com/128/4219/4219073.png"
              alt="delete"
              className="w-9"
            />
          </div>
          <div className="mt-6 text-xl mb-2">Из наличия или под заказ?</div>
          <div>
            Под заказ кроссовки будут дешевле, а из наличия приедут сегодня или
            завтра
          </div>
          <div className="bg-zinc-100 px-2.5 py-1.5 flex space-x-3 mt-10">
            <button
              className={`font-bold  w-full py-2 rounded ${
                selectedOption === "Из наличия" ? "bg-white" : "bg-transparent"
              }`}
              onClick={() => setSelectedOption("Из наличия")}
            >
              Из наличия
            </button>
            <button
              className={`font-bold  w-full py-2 rounded ${
                selectedOption === "Под заказ" ? "bg-white" : "bg-transparent"
              }`}
              onClick={() => setSelectedOption("Под заказ")}
            >
              Под заказ
            </button>
          </div>
          <div className="font-bold text-xl mb-3 mt-10">Бренды</div>
          {brands
            .filter((brand) => !selectedBrand || brand === selectedBrand)
            .map((item, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  value={item}
                  checked={item === selectedBrand}
                  onChange={() => onBrandChange(item)}
                />
                <label className="ml-3">{item}</label>
              </div>
            ))}
          <div className="fixed bottom-10 left-0 w-full flex justify-center">
            <button
              className="bg-black text-slate-50 rounded py-3 w-8/12 "
              onClick={() => {
                setShowFilterOnMobile(false);
                window.scrollTo({ top: "0" });
              }}
            >
              Применить
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Products = () => {
  const { category } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [parent, enableAnimations] = useAutoAnimate();

  const products = useSelector((state) => state.productsSlice.products);

  const [search, setSearch] = useState("");

  const [choise, setChoise] = useState("-price");

  const [selectedBrand, setSelectedBrand] = useState("");

  const [showFilterOnMobile, setShowFilterOnMobile] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts({ search, choise, selectedBrand, category }));
  }, [dispatch, choise, search, selectedBrand, category]);

  const handleBrandChange = (brand) => {
    setSelectedBrand(brand === selectedBrand ? "" : brand);
  };

  return (
    <div>
      <ModelFilterSmallScreen
        showFilterOnMobile={showFilterOnMobile}
        setShowFilterOnMobile={setShowFilterOnMobile}
        selectedBrand={selectedBrand}
        onBrandChange={handleBrandChange}
      />
      <div className="container">
        <div className="category_products_small_screen">{category}</div>
        <div className="flex justify-between my-11 items-center">
          <div className="category_products">
            <span onClick={() => navigate("/")} className="mr-2">
              Главная
            </span>
            / <span className="ml-3">{category}</span>
          </div>
          <div className="flex">
            <Choise setChoise={setChoise} />
            <Search setSearch={setSearch} />
          </div>
          {/* фильтр маленький экран */}
          <div
            className="filter_small_screen"
            onClick={() => setShowFilterOnMobile(true)}
          >
            <div>Фильтры</div>
            <span>
              <img
                src="https://cdn-icons-png.flaticon.com/128/3839/3839020.png"
                alt="filter"
                className="w-4 ml-2"
              />
            </span>
          </div>
          {/*  */}
        </div>
      </div>
      <hr />
      <div className="container">
        <div className="flex my-10">
          <ChoiseBrand
            selectedBrand={selectedBrand}
            onBrandChange={handleBrandChange}
          />
          <div className="flex justify-end items-center">
            <div className="content" ref={parent}>
              {products.length >= 1 ? (
                products.map((item) => <Card key={item.id} {...item} />)
              ) : (
                <div className="text-center font-bold">
                  По вашему запросу {search}
                  <br /> ничего не найдено
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
