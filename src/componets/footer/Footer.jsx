import React from "react";

export const InfoForStore = () => {
  const infoforstore = [
    "Оплата",
    "Доставка",
    "Помощь",
    "Гарантия и безопасность",
    "Проверка на оригинальность",
  ];

  return (
    <div>
      <h3>МАГАЗИН</h3>
      {infoforstore.map((item, index) => (
        <div className="my-4 text-gray-400" key={index}>
          {item}
        </div>
      ))}
      <div className="text-gray-400">Как выбрать размер</div>
    </div>
  );
};

export const Catalog = () => {
  const catalog = ["Кроссовки", "Все бренды", "Jordan", "Nike", "Asics"];

  return (
    <div>
      <h3>КАТАЛОГ</h3>
      {catalog.map((item, index) => (
        <div className="my-4 text-gray-400" key={index}>
          {item}
        </div>
      ))}
      <div className="text-gray-400">New Balance</div>
    </div>
  );
};

export const Comapny = () => {
  const company = ["Приложение", "Команда", "Отзывы"];

  return (
    <div>
      <h3>КОМАНДА</h3>
      {company.map((item, index) => (
        <div className="my-4 text-gray-400" key={index}>
          {item}
        </div>
      ))}
      <div className="text-gray-400">Контакты</div>
    </div>
  );
};

export const Brand = () => {
  const brand = ["Nike", "Jordan", "Помощь", "New Balance", "Reebok"];

  return (
    <div>
      <h3>БРЕНДЫ</h3>
      {brand.map((item, index) => (
        <div className="my-4 text-gray-400" key={index}>
          {item}
        </div>
      ))}
      <div className="text-gray-400">Vans</div>
    </div>
  );
};

const Footer = () => {
  return (
    <div className="bg-black text-white py-[100px] mt-[100px]">
      <div className="footer">
        <InfoForStore />
        <Catalog />
        <Comapny />
        <Brand />
      </div>
    </div>
  );
};

export default Footer;
