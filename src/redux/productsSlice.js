import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ choise, search, selectedBrand, category }) => {
    try {
      const brandFilter = selectedBrand ? `&brand=${selectedBrand}` : "";
      const response = await axios.get(
        `https://9fa124965a5b597b.mokky.dev/items?category=${category}&sortBy=${choise}&title=*${search}*${brandFilter}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const initialState = {
  products: [],
  cartProducts: [],
  loading: false,
  totalPrice: 0,
};

const productsSlice = createSlice({
  name: "productsSlice",

  initialState: initialState,

  reducers: {
    addProduct: (state, action) => {
      const find = state.cartProducts.find(
        (item) =>
          item.id == action.payload.id && item.size == action.payload.size
      );
      if (find) {
        find.count++;
      } else {
        state.cartProducts.push({ ...action.payload, count: 1 });
      }
      state.totalPrice = state.cartProducts.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    removeOneProduct: (state, action) => {
      const find = state.cartProducts.find(
        (item) =>
          item.id === action.payload.id && item.size === action.payload.size
      );
      if (find) {
        if (find.count > 1) {
          find.count--;
        } else {
          return;
        }
      }
      state.totalPrice = state.cartProducts.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },

    removeProduct: (state, action) => {
      state.cartProducts = state.cartProducts.filter(
        (item) =>
          !(item.id == action.payload.id && item.size == action.payload.size)
      );
      state.totalPrice = state.cartProducts.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },

    clearCart: (state) => {
      state.cartProducts = [];
      state.totalProce = 0;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { addProduct, removeProduct, clearCart, removeOneProduct } =
  productsSlice.actions;
export default productsSlice.reducer;
