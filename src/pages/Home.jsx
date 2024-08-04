import React from "react";
import { Link } from "react-router-dom";

import { RundomProducts } from "../componets/rundomProducts/RundomProducts";

export const NavigateCategoryProducts = () => {
  const productsNavigate = [
    {
      imageUrl:
        "https://image.unicorngo.ru/_next/image?url=https://cdn.poizon.com/pro-img/origin-img/20231116/f7aefba5ee044abdb4f12d0cc1e615dc.jpg&w=1920&q=75",
      title: "Кросовки и кеды",
      category: "Street%20sneakers",
    },

    {
      imageUrl:
        "https://image.unicorngo.ru/_next/image?url=https://cdn.poizon.com/pro-img/origin-img/20230529/2ef5c4a7265248b6a6590e2059fcbc28.jpg&w=1920&q=75",
      title: "Cпортивные кросовки",
      category: "Sport%20sneakers",
    },
    {
      imageUrl:
        "https://image.unicorngo.ru/_next/image?url=https://cdn.poizon.com/pro-img/origin-img/20220913/7c3560bbb5594b42b1e0486485692113.jpg&w=1920&q=75",
      title: "Кастомные кросовки",
      category: "Custom%20sneakers",
    },
  ];

  return (
    <div className="container_navigate_category_product">
      {productsNavigate.map((item, index) => (
        <Link
          to={`/products/${item.category}`}
          key={index}
          className=" w-[100%] px-5 pt-4 pb-10 border border-gray-300 rounded-xl"
          onClick={() => window.scrollTo({ top: "0" })}
        >
          <div>
            <div className="font-bold text-xl">{item.title}</div>
            <img src={item.imageUrl} alt={item.title} />
          </div>
        </Link>
      ))}
    </div>
  );
};

export const BlockBrand = () => {
  const brand = [
    {
      brand: "Vans",
      imageUrl:
        "https://sneakers.by/image/cache/data/brands/518-vans-logo.crop-100x100.2d2252b073-100x100.jpg",
    },
    {
      brand: "Asics",
      imageUrl:
        "https://sneakers.by/image/cache/data/brands/asics_logo-100x100.png",
    },
    {
      brand: "Jordan",
      imageUrl:
        "https://sneakertown.kz/upload/iblock/a6a/a6aaad1767961cc2af2d2ec1e6e8298c.png",
    },
    {
      brand: "Nike",
      imageUrl:
        "https://sneakertown.kz/upload/iblock/11b/11b6091e46bdf1a239b576aa695eb6a9.png",
    },
    {
      brand: "Reebok",
      imageUrl:
        "https://sneaker-head.by/uploads/Brands/16/qU8Hs6c1b-bzQosaKxUw.svg",
    },
    {
      brand: "New Balance",
      imageUrl:
        "data:image/png;base64,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",
    },
  ];

  return (
    <div className="my-16">
      <div className="font-bold text-3xl mb-3">Бренды</div>
      <div className="flex items-center justify-between flex-wrap gap-4">
        {brand.map((item, index) => (
          <Link
            to={`product/${item.brand}`}
            key={index}
            onClick={() => window.scrollTo({ top: "0" })}
          >
            <div className="my-5">
              <img src={item.imageUrl} alt="logo" className="w-[100px]" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export const MotivationBlock = () => {
  const info = [
    {
      imageUrl:
        "https://www.lusio.ru/local/templates/lusio/img/about/10_years.svg",
      title: "10+ лет",
      description:
        "История бренда начинается с 2013 года и насчитывает более 30 магазинов в России и других странах",
    },
    {
      imageUrl:
        "https://www.lusio.ru/local/templates/lusio/img/about/natural_fabrics.svg",
      title: "Натуральные ткани",
      description:
        "Используются такие ткани как: кашемир, шелк, кожа, мех, шерсть, тенсел, хлоп",
    },
    {
      imageUrl:
        "https://www.lusio.ru/local/templates/lusio/img/about/own_production.svg",
      title: "Собственное производство",
      description:
        "На производстве ведется строгий контроль за качеством пошива с помощью самой передовой техники",
    },
  ];

  return (
    <div className="container_motivation_block">
      <div className="container_motivation_block_left_side">
        <img
          src="https://img01.rl0.ru/afisha/e1200x1200i/daily.afisha.ru/uploads/images/8/79/879f7f61d98ffa8c7a0f592a5efb59e2.png"
          alt="image_logo"
          className=" h-full"
        />
      </div>
      <div className="container_motivation_block_right_side">
        <div className="font-bold text-5xl mb-4">О бренде</div>
        <div className="mb-6">
          React sneakers – это международный бренд кросовок в сегменте премиум.
          Дизайн коллекций сочетает в себе элегантный минимализм, и модную
          версию разных стилей.
        </div>
        <div>
          {info.map((item, index) => (
            <div key={index}>
              <div className=" flex items-center mb-7">
                <img
                  src={item.imageUrl}
                  alt="image"
                  className="bg-gray-100 rounded-[50%] w-[65px] h-[65px] p-2"
                />
                <div className="ml-5">
                  <div className="font-bold text-2xl">{item.title}</div>
                  <div>{item.description}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="container">
      <NavigateCategoryProducts />
      <RundomProducts title={"Только что купили"} count={6} />
      <BlockBrand />
      <RundomProducts title={"Товар дня"} count={1} />
      <MotivationBlock />
    </div>
  );
};

export default Home;
