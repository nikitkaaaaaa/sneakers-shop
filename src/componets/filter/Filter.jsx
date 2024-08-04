import { useState } from "react";

export const Choise = ({ setChoise }) => {
  const handleChoise = (event) => {
    setChoise(event.target.value);
  };

  return (
    <select className="choise_content" onChange={handleChoise}>
      <option value="-price">По цене высокая</option>
      <option value="price">По цене низкая</option>
      <option value="-rating">По рейтингу</option>
      <option value="title">По названию</option>
    </select>
  );
};

export const Search = ({ setSearch }) => {
  const [value, setValue] = useState("");

  const handleSearch = (event) => {
    setValue(event.target.value);
    setSearch(event.target.value);
  };
  return (
    <div>
      <input
        onChange={handleSearch}
        value={value}
        type="text"
        placeholder="Поиск товаров ..."
        className="search_content"
      />
    </div>
  );
};

export const ChoiseBrand = ({ onBrandChange, selectedBrand }) => {
  const brands = ["New Balance", "Jordan", "Nike", "Asics", "Reebok", "Vans"];

  return (
    <div className="container_brand_choise">
      <h2 className="font-bold text-xl mb-3">Бренды</h2>
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
    </div>
  );
};
