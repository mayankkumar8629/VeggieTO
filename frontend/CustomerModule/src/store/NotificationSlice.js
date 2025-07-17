import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    notifications: [],
}


const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        addNotification: (state, action) => {
            state.notifications.push({
                message: action.payload,
                timestamp: new Date().toString(),
            });
        },
        removeNotification: (state) => {
            state.notification = [];
        }
    }
});

export const { addNotification, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;