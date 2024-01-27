import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
  amount: 0,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increase(state, action) {
      console.log(state.cartItems);
      const { id } = action.payload;
      const tempCart = state.cartItems.map((item) => {
        if (item.id === id) {
          return { ...item, amount: item.amount + 1 };
        }
        return item;
      });
      state.cartItems = tempCart;
      state.amount = state.amount + 1;
    },
    decrease(state, action) {
      const { id } = action.payload;
      if (state.amount <= 0) {
        return;
      }
      const tempCart = state.cartItems
        .map((item) => {
          if (item.id === id) {
            return { ...item, amount: item.amount - 1 };
          }
          return item;
        })
        .filter((item) => item.amount !== 0);
      state.cartItems = tempCart;
      if (state.amount > 0) {
        state.amount = state.amount - 1;
      }
    },
    removeItem(state, action) {
      const { id } = action.payload;
      const tempCart = state.cartItems.filter((item) => item.id !== id);
      state.cartItems = tempCart;
    },
    clearCart(state) {
      state.cartItems = [];
      localStorage.setItem("cartItems", []);
    },
    getTotals(state) {
      let { total, amount } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, amount } = cartItem;
          const itemTotal = price * amount;
          cartTotal.total += itemTotal;
          cartTotal.amount += amount;
          return cartTotal;
        },
        { total: 0, amount: 0 },
      );
      total = parseFloat(total.toFixed(2));
      state.total = total;
      state.amount = amount;
    },
    addCart(state, action) {
      console.log(action.payload);
      const { product } = action.payload;
      const { id, name, price, image } = product;
      const item = state.cartItems.find((item) => item.id === id);
      console.log(item);
      if (item) {
        state.cartItems = state.cartItems.map((item) => {
          if (item.id === id) {
            console.log(state.amount);
            console.log(item.price);
            console.log(item);
            console.log(state.cartItems);
            return {
              ...item,
              price: parseFloat(price) * parseFloat(state.amount),
            };
          }
          return item;
        });
        console.log("hello");
        window.localStorage.setItem(
          "cartItems",
          JSON.stringify(state.cartItems),
        );
      } else {
        console.log("fff");
        const newItem = {
          id,
          name,
          price: parseFloat(price) * parseFloat(state.amount),
          image,
        };
        console.log(state.cartItems);
        state.cartItems = [...state.cartItems, newItem];
        window.localStorage.setItem(
          "cartItems",
          JSON.stringify(state.cartItems),
        );
      }
    },
  },
});

console.log(cartSlice);
export const { addCart, increase, decrease, removeItem, clearCart, getTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
