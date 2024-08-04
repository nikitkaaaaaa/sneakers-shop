import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import Slider from "react-slick";
import { addProduct } from "../redux/productsSlice";
import Card from "../componets/card/Card";

export const LeftSide = ({ product, currentImageUrl, setCurrentImageUrl }) => {
  return (
    <div className="container_leftSide_product">
      <img src={currentImageUrl} alt={product.title} className="w-[650px]" />

      <div className=" flex justify-between">
        {product.imageUrl?.map((item, index) => (
          <div key={index}>
            <img
              style={{
                border:
                  currentImageUrl === item
                    ? "2px solid black"
                    : "2px solid white",
              }}
              onClick={() => setCurrentImageUrl(item)}
              src={item}
              alt="sneakers"
              className="imageUrlProduct"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export const RightSide = ({ product, size, selectedSize, setSelectedSize }) => {
  const infoToMotivaitonBlock = [
    {
      imageSvg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="tabler-icon tabler-icon-truck-delivery"
        >
          <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
          <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
          <path d="M5 17h-2v-4m-1 -8h11v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5"></path>
          <path d="M3 9l4 0"></path>
        </svg>
      ),
      title: "Привезём из-за границы",
      description:
        "Займёт 20-25 дней, а о статусе расскажем в личном кабинете.",
    },
    {
      imageSvg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="tabler-icon tabler-icon-box"
        >
          <path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5"></path>
          <path d="M12 12l8 -4.5"></path>
          <path d="M12 12l0 9"></path>
          <path d="M12 12l-8 -4.5"></path>
        </svg>
      ),
      title: "Доставим или отдадим в магазине",
      description:
        "Доставка оплачивается при получении, обычно это около 300₽.",
    },
    {
      imageSvg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="tabler-icon tabler-icon-shield"
        >
          <path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3"></path>
        </svg>
      ),
      title: "Гарантируем оригинальность",
      description:
        "Если приедет не оригинал — вернём тройную стоимость заказа.",
    },
  ];

  const [showIfoProduct, setShowIfoProduct] = useState(false);

  const [showSizeTable, setShowSizeTable] = useState(false);

  const sizeTable = [
    [
      38, 38.5, 39, 40, 40.5, 41, 42, 42, 5, 43, 44, 44.5, 45, 45.5, 46, 47,
      47.5,
    ],
    [
      240, 240, 245, 250, 255, 260, 265, 270, 275, 280, 285, 290, 295, 300, 305,
      310, 315,
    ],
    [
      5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13,
      13.5,
    ],
    [5, 5.5, 6, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5],
    [
      37, 37.5, 38, 39, 39.5, 40, 41, 41.5, 42, 43, 43.5, 44, 44.5, 45, 46,
      46.5, 47,
    ],
  ];

  const [showModelCart, setShowModelCart] = useState(false);

  return (
    <div className="container_rightSide_product">
      <ModelInfoProduct
        showIfoProduct={showIfoProduct}
        setShowIfoProduct={setShowIfoProduct}
        product={product}
      />
      <ModelSizeProduct
        showSizeTable={showSizeTable}
        setShowSizeTable={setShowSizeTable}
        sizeTable={sizeTable}
      />
      <ModelCartProduct
        showModelCart={showModelCart}
        setShowModelCart={setShowModelCart}
        product={product}
        selectedSize={selectedSize}
      />
      <div className="font-bold text-3xl">
        <div className="">{product.title}</div>
      </div>
      <hr className="my-5" />
      <div className="mt-1">
        Кроссовки {product.title} обладают следующими особенностями:
      </div>
      <ul className="info_for_sneakers">
        {product.peculiarities?.map((item, index) => (
          <li
            key={index}
            style={{
              margin: "8px 0px",
            }}
            className="dot"
          >
            {item}
          </li>
        ))}
      </ul>
      <button className="cursor pointer mt-3 flex items-center border-none font-bold">
        <h3 className="pr-1 underline" onClick={() => setShowIfoProduct(true)}>
          Показать еще
        </h3>
        <img
          src="https://cdn-icons-png.flaticon.com/128/54/54833.png"
          alt=""
          className="w-3"
        />
      </button>
      <hr className="my-5" />
      <div className="font-bold text-2xl ">Выберите размер (EU)</div>
      <div className="mt-3 mr-5 text-gray-500">
        Размер лучше посмотреть на язычке ваших кроссовок или измерить стельку.
      </div>
      <div className="flex flex-wrap mb-2.5">
        {size.map((item, index) => (
          <div
            key={index}
            className={`size cursor-pointer p-2 ${
              selectedSize === item
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
            onClick={() => setSelectedSize(item)}
          >
            {item}
          </div>
        ))}
      </div>
      <div
        className="underline cursor-pointer"
        onClick={() => setShowSizeTable(true)}
      >
        Таблица размеров
      </div>
      <hr className="mt-8" />
      <MotivationBlockProductId infoToMotivaitonBlock={infoToMotivaitonBlock} />
      <div style={{ display: "flex" }}>
        <button
          onClick={() => setShowModelCart(true)}
          className="mt-9 text-white rounded-md w-full py-3"
          style={{ backgroundColor: "rgb(10, 50, 65)" }}
        >
          Добавить в корзину
        </button>
      </div>
    </div>
  );
};

export const ModelInfoProduct = ({
  showIfoProduct,
  setShowIfoProduct,
  product,
}) => {
  const handleCloseModal = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      setShowIfoProduct(false);
    }
  };

  return (
    <div>
      <div
        className={`modal-overlay ${showIfoProduct ? "show" : ""}`}
        onClick={handleCloseModal}
      >
        <div className="modal-content">
          <div className="flex justify-between items-center position : relative">
            <h2 className="my-4 text-center text-2xl font-bold">Особенности</h2>
          </div>
          <div className="pt-1">
            <div className="pb-1">
              Кроссовки {product?.title} обладают следующими особенностями:
            </div>
            <ul className="ml-5">
              {product.peculiarities?.map((item, index) => (
                <li key={index} className="dot">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ModelSizeProduct = ({
  showSizeTable,
  setShowSizeTable,
  sizeTable,
}) => {
  const handleCloseModal = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      setShowSizeTable(false);
    }
  };

  return (
    <div>
      <div
        className={`modal-overlay ${showSizeTable ? "show" : ""}`}
        onClick={handleCloseModal}
      >
        <div className="modal-content">
          <div className="flex justify-between items-center">
            <div className="my-4 text-center text-2xl font-bold">
              Таблица размеров
            </div>
          </div>
          <div className="flex justify-between">
            <div className="mt-4">
              <div>EU</div>
              {sizeTable[0].map((item, index) => (
                <li className="my-3 list-none" key={index}>
                  <b>{item}</b>
                </li>
              ))}
            </div>
            <div className="mt-4">
              <div>MM</div>
              {sizeTable[1].map((item, index) => (
                <li className="my-3 list-none" key={index}>
                  {item}
                </li>
              ))}
            </div>
            <div className="mt-4">
              <div>US</div>
              {sizeTable[2].map((item, index) => (
                <li className="my-3 list-none" key={index}>
                  {item}
                </li>
              ))}
            </div>
            <div className="mt-4">
              <div>UK</div>
              {sizeTable[3].map((item, index) => (
                <li className="my-3 list-none" key={index}>
                  {item}
                </li>
              ))}
            </div>
            <div className="mt-4">
              <div>RU</div>
              {sizeTable[4].map((item, index) => (
                <li className="my-3 list-none" key={index}>
                  {item}
                </li>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const MotivationBlockProductId = ({ infoToMotivaitonBlock }) => {
  return (
    <div>
      {infoToMotivaitonBlock?.map((item, index) => (
        <div key={index} className="flex items-center m-[25px]">
          <div className="pr-5">{item.imageSvg}</div>
          <div>
            <b>{item.title}</b>
            <div className="text-[14px] mt-1">{item.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const ModelCartProduct = ({
  showModelCart,
  setShowModelCart,
  product,
  selectedSize,
}) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleCloseModal = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      setShowModelCart(false);
    }
  };

  const onAddToCart = (goingCart) => {
    if (goingCart) {
      dispatch(
        addProduct({
          id: product.id,
          imageUrl: product.imageUrl,
          price: product.price,
          title: product.title,
          size: selectedSize,
        })
      );
      navigate("/cart");
    } else {
      dispatch(
        addProduct({
          id: product.id,
          imageUrl: product.imageUrl,
          price: product.price,
          title: product.title,
          size: selectedSize,
        })
      );
      setShowModelCart(false);
    }
    window.scrollTo({ top: "0" });
  };

  return (
    <div>
      <div
        className={`modal-overlay ${showModelCart ? "show" : ""}`}
        onClick={handleCloseModal}
      >
        <div className="modal-content">
          <h2 className="my-4 text-center text-2xl font-bold">
            ДОБАВЛЕН В КОРЗИНУ
          </h2>
          <div className=" flex py-12">
            <img
              src={
                product.imageUrl && product.imageUrl[0]
                  ? product.imageUrl[0]
                  : ""
              }
              alt={product?.title}
              className="w-52"
            />
            <div className="ml-7 flex flex-col justify-center">
              <div className="text-[14px] ">
                <b>{product?.title}</b>
              </div>
              <div className="mt-2 text-[14px]">{product?.price} ₽</div>
              <div className="mt-2">
                <b>{selectedSize} (EU)</b>
              </div>
            </div>
          </div>
          <div className="my-4 flex justify-between">
            <button
              className="py-2 px-3 border-none text-black cursor-pointer"
              onClick={() => onAddToCart(false)}
            >
              <b>Продолжить покупки</b>
            </button>
            <button
              onClick={() => onAddToCart(true)}
              style={{
                borderRadius: "5px",
                background: "rgb(10, 50, 65)",
              }}
              className="p-3 border-none text-white cursor-pointer"
            >
              Перейти в корзину
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const LeftSideSmallScreen = ({ product }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const renderImage = (index) => {
    if (product?.imageUrl && product.imageUrl[index]) {
      return (
        <div key={index}>
          <img src={product.imageUrl[index]} alt="" className="" />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="left_side_small_screen">
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      <Slider {...settings}>{[0, 1, 2, 3].map(renderImage)}</Slider>
    </div>
  );
};

export const SimilarBrand = ({ brand }) => {
  const [products, setProducts] = useState([]);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const shuffledProducts = shuffleArray([...products]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `https://9fa124965a5b597b.mokky.dev/items?brand=${brand}`
        );
        setProducts(response.data);
      } catch (error) {
        alert(error);
      }
    };
    fetchProducts();
  }, [brand]);

  return (
    <div>
      <hr className="my-9" />
      <div className="font-bold text-xl mb-6">{brand}</div>
      <div className="content">
        {shuffledProducts.slice(0, 4).map((item) => (
          <Card key={item.id} {...item} />
        ))}
      </div>
      <div className="flex justify-center mt-9 ">
        <Link to={`/product/${brand}`}>
          <button
            className="border border-black font-bold py-3 px-5 rounded-md  hover:bg-black hover:text-white transition-colors duration-300"
            onClick={() => window.scrollTo({ top: "0" })}
          >
            Показать больше {brand}
          </button>
        </Link>
      </div>
    </div>
  );
};

const Product = () => {
  const [product, setProduct] = useState([]);

  const [currentImageUrl, setCurrentImageUrl] = useState("");

  const { id } = useParams();

  const size = [
    38, 38.5, 39, 40, 40.5, 41, 42, 42.5, 43, 44, 44.5, 45, 45.5, 46, 47.5,
  ];

  const [selectedSize, setSelectedSize] = useState(size[0]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `https://9fa124965a5b597b.mokky.dev/items/${id}`
        );
        setProduct(response.data);
        setCurrentImageUrl(response.data.imageUrl[0]);
      } catch (error) {
        alert(error);
      }
    };
    fetchProducts();
  }, [id]);

  return (
    <div className="container">
      <div className="container_product">
        <LeftSide
          product={product}
          currentImageUrl={currentImageUrl}
          setCurrentImageUrl={setCurrentImageUrl}
        />
        <LeftSideSmallScreen product={product} />
        <RightSide
          product={product}
          size={size}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
        />
      </div>
      <SimilarBrand brand={product.brand} />
    </div>
  );
};

export default Product;
