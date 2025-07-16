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
        removeFromCart: (state, action) => {
            state.cartItems = Math.max(state.cartItems - action.payload, 0);
        },
        setCartItemRedux: (state, action) => {
            state.cartItems = action.payload;
        },
    },
});

export const { addToCart, removeFromCart, setCartItemRedux } = cartSlice.actions;
export default cartSlice.reducer;