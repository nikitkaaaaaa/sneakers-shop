import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import {
  addProduct,
  removeProduct,
  clearCart,
  removeOneProduct,
} from "../../redux/productsSlice";

export const LeftSideCart = ({ productsCart }) => {
  const [parent, enableAnimations] = useAutoAnimate();

  const dispatch = useDispatch();

  const OnAddOneProduct = (item) => {
    dispatch(addProduct({ id: item.id, size: item.size }));
  };

  const OnRemoveOneProduct = (item) => {
    dispatch(removeOneProduct({ id: item.id, size: item.size }));
  };

  const removeItemCart = (item) => {
    dispatch(removeProduct({ id: item.id, size: item.size }));
  };

  const clearFullCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="left_side_cart">
      <div ref={parent}>
        <div className="flex justify-between items-center pb-6">
          <h3 className="font-bold text-xl">Ваш заказ</h3>
          <div className="cursor-pointer" onClick={clearFullCart}>
            Очистить корзину
          </div>
        </div>
        {productsCart.map((item) => (
          <div
            key={item.id}
            className="products_cart"
            style={{ borderTop: "2px solid #f3f3f3" }}
          >
            <div className="info_product_cart">
              <img
                src={item.imageUrl[0]}
                alt={item.title}
                className="max-w-[150px] h-[100px]"
              />
              <div className="ml-[50px]">
                <div className="mt-4">{item.title}</div>
                <div className="my-1">
                  <b>size : {item.size}</b>
                </div>
                <img
                  onClick={() => removeItemCart(item)}
                  src="https://cdn-icons-png.flaticon.com/128/1214/1214428.png"
                  alt="remove item"
                  className="w-5 mt-3 cursor-pointer"
                />
              </div>
            </div>
            <div className="price_and_adding_product">
              <div className="flex items-center justify-between ">
                <button
                  className="flex"
                  onClick={() => OnRemoveOneProduct(item)}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/2550/2550003.png"
                    alt="remove one item"
                    className="w-6 cursor-pointer"
                  />
                </button>
                <div className="mx-5">{item.count}</div>
                <button className="flex" onClick={() => OnAddOneProduct(item)}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/2549/2549959.png"
                    alt="plus one item"
                    className="w-6 cursor-pointer"
                  />
                </button>
              </div>
              <div>
                <b>{item.price} ₽</b>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const RightSideCart = () => {
  const totalPrice = useSelector((state) => state.productsSlice.totalPrice);

  return (
    <div className="right_side_cart">
      <h3
        style={{
          borderBottom: "2px solid #f3f3f3",
        }}
        className="pb-[42px] text-center text-[1.17em] font-bold"
      >
        Сумма заказа
      </h3>
      <div className="flex justify-between items-center mt-7">
        <div>Стоимость</div>
        <div>
          <b>{totalPrice} ₽</b>
        </div>
      </div>
      <div className="flex justify-between items-center mt-7">
        <div>Общая Стоимость </div>
        <div>
          <b>{totalPrice} ₽</b>
        </div>
      </div>
      <div className="flex justify-center mt-8 ">
        <button className="cursor: pointer py-2.5 px-4 mt-3 text-white rounded-md bg-[#0a3241] w-full">
          Оформить заказ
        </button>
      </div>
    </div>
  );
};

export const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <div className="mb-[28px]">
      <div className="pt-[115px]">
        <h1 className="text-center mb-[30px] text-2xl">
          <b>Ваша корзина пуста</b>
        </h1>
        <div className="text-center mt-[3-px]">
          Вы можете перейти в каталог и выбрать то, что вам понравиться
        </div>
        <div className="mt-[30px] flex justify-center">
          <button
            onClick={() => navigate("/")}
            style={{
              background: "rgb(10, 50, 65)",
            }}
            className="p-3 text-white rounded-md w-[50%]"
          >
            Перейти в каталог
          </button>
        </div>
      </div>
    </div>
  );
};

const CartCard = () => {
  const productsCart = useSelector((state) => state.productsSlice.cartProducts);

  const naviagate = useNavigate();

  return (
    <div className="mt-[40px]">
      <div className="my-[55px]">
        <span
          onClick={() => naviagate("/")}
          className="mt-[10px] cursor-pointer mr-2"
        >
          <b>Главная </b>
        </span>
        <b>/</b>
        <span className="ml-[10px]">
          <b>корзина</b>
        </span>
      </div>
      <div>
        {productsCart.length >= 1 ? (
          <div className="container_cart">
            <LeftSideCart productsCart={productsCart} />
            <RightSideCart />
          </div>
        ) : (
          <EmptyCart />
        )}
      </div>
    </div>
  );
};

export default CartCard;
