import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    notifications: [],
    unreadCount: 0,
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
            state.unreadCount += 1;
        },
        removeNotification: (state) => {
            state.notifications = [];
        },
        markAllasRead: (state) => {
            state.unreadCount = 0;
            state.notifications = state.notifications.map(notification => ({
                ...notification,
                read: true,
            }));
        }
    }
});

export const { addNotification, removeNotification, markAllasRead } = notificationSlice.actions;
export default notificationSlice.reducer;