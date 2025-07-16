import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    cartItems: 0,
};


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state) => {
            state.cartItems += 1;
        },
        removeFromCart: (state) => {
            state.cartItems = Math.max(state.cartItems - 1, 0);
        },
        setCartItems: (state, action) => {
            state.cartItems = action.payload;
        },
    },
});

export const { addToCart, removeFromCart, setCartItems } = cartSlice.actions;
export default cartSlice.reducer;