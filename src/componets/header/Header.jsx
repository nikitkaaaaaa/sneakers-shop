import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export const SearchContainer = ({
  openSearchContainer,
  setOpenSearchContainer,
}) => {
  const [value, setValue] = useState("");

  const brands = ["New Balance", "Jordan", "Nike", "Asics", "Reebok", "Vans"];

  const [products, setProducts] = useState([]);

  const [filterProducts, setFilterProducts] = useState([]);

  const [lengthProducts, setLengthProducts] = useState(4);

  const containerRef = useRef(null);

  const handleBrand = (item) => {
    setLengthProducts(4);
    setValue(item);
  };

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setOpenSearchContainer(false);
    }
  };

  const handleNavigateProduct = () => {
    window.scrollTo({ top: "0" });
    setOpenSearchContainer(false);
  };

  useEffect(() => {
    setFilterProducts(
      products.filter((product) =>
        product.title.toLowerCase().includes(value.trim().toLowerCase())
      )
    );
  }, [value, products]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get(
        "https://9fa124965a5b597b.mokky.dev/items"
      );
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {openSearchContainer && (
        <div
          className="bg-white absolute top-0 left-0 w-full z-10"
          style={{ boxShadow: "0 9px 11px rgba(0, 0, 0, 0.09)" }}
          ref={containerRef}
        >
          <div className="container">
            <div className="flex mt-4 ">
              <div className="relative w-full">
                <input
                  type="text"
                  className="border border-black outline-none w-full py-1 pl-10 pr-10 rounded-sm"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
                <img
                  src="https://cdn-icons-png.flaticon.com/128/2319/2319177.png"
                  alt="lupa"
                  className="w-5 absolute top-1/2 left-2 transform -translate-y-1/2"
                />
                {value.length >= 1 && (
                  <img
                    onClick={() => setValue("")}
                    src="https://cdn-icons-png.flaticon.com/128/58/58253.png"
                    alt="delete_text"
                    className="w-5 absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
                  />
                )}
              </div>
              <button
                className="font-bold ml-8"
                onClick={() => setOpenSearchContainer(false)}
              >
                Закрыть
              </button>
            </div>
            <div className="mt-3">
              <div className="container_search">
                <div className="brands_container_search">
                  <div className="font-bold mb-2">Часто ищут</div>
                  {brands.map((item, index) => (
                    <ul key={index}>
                      <li
                        className="relative cursor-pointer"
                        onClick={() => handleBrand(item)}
                      >
                        <span className="ml-7">{item}</span>
                        <img
                          src="https://cdn-icons-png.flaticon.com/128/2319/2319177.png"
                          alt="lupa"
                          className="w-5 absolute top-1/2 left-0 transform -translate-y-1/2"
                        />
                      </li>
                    </ul>
                  ))}
                </div>
                <div className="content_container_search">
                  {value.trim().length >= 1 ? (
                    <>
                      {filterProducts.length > 0 ? (
                        <>
                          <div className="content">
                            {filterProducts
                              .slice(0, lengthProducts)
                              .map((item) => (
                                <Link
                                  to={`/product/${item.category}/${item.id}`}
                                  onClick={handleNavigateProduct}
                                >
                                  <div className="product">
                                    <img
                                      src={item.imageUrl[0]}
                                      alt={item.title}
                                    />
                                    <div className="font-bold">
                                      {item.price} ₽
                                    </div>
                                    <div className="text-sm">{item.title}</div>
                                  </div>
                                </Link>
                              ))}
                          </div>
                          {lengthProducts === 4 && (
                            <div className=" flex justify-center">
                              <button
                                onClick={() =>
                                  setLengthProducts(filterProducts.length)
                                }
                                className=" border border-black py-2 px-5 mt-12 rounded-sm text-black bg-white hover:bg-black hover:text-white transition-colors duration-300"
                              >
                                <b>Смотреть все результаты</b>
                              </button>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className=" font-bold mt-5  w-full">
                          <div className="text-center text-2xl">
                            По вашему запросу {value} <br /> ничего не найдено
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="font-bold mb-3">Популярные товары</div>
                      <div className="content">
                        {products.slice(0, 4).map((item) => (
                          <Link
                            key={item.id}
                            to={`/product/${item.category}/${item.id}`}
                            onClick={handleNavigateProduct}
                          >
                            <div className="product" key={item.id}>
                              <img src={item.imageUrl[0]} alt={item.title} />
                              <div className="font-bold">{item.price} ₽</div>
                              <div className="text-sm">{item.title}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Header = () => {
  const [openSearchContainer, setOpenSearchContainer] = useState(false);

  return (
    <div>
      <SearchContainer
        openSearchContainer={openSearchContainer}
        setOpenSearchContainer={setOpenSearchContainer}
      />
      <div className="header">
        <img
          src="https://cdn-icons-png.flaticon.com/128/2997/2997940.png"
          alt="lupa"
          className="w-6 cursor-pointer"
          onClick={() => setOpenSearchContainer(true)}
        />
        <Link to={"/"} className="font-bold text-2xl">
          react sneakers
        </Link>
        <div className="flex">
          <Link to={"/cart"}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/4903/4903482.png"
              alt="cart"
              className="w-8 mr-2"
            />
          </Link>
          <img
            src="https://cdn-icons-png.flaticon.com/128/14886/14886122.png"
            alt="acount"
            className="w-8 cursor-pointer"
          />
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Header;
