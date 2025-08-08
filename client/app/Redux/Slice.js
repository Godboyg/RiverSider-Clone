import { createSlice, current } from '@reduxjs/toolkit';
import { Actor } from 'next/font/google';

const initialState = {
  user: null,
  open: false,
  IsOpen: false,
  allUsers: [],
};

const StateSlice = createSlice({
    name : "State",
    initialState,
    reducers : {
        toggleSlide : (state) => {
            state.open = !state.open;
        },
        toggle: (state) => {
            state.IsOpen = !state.IsOpen
        },
        currentUser: (state , action) => {
            state.user = action.payload
        },
        addUsers : (state, action) => {
            state.allUsers.push(action.payload)
        },
        userAdded: (state,action) => {
            const userName = action.payload;
            const user =  state.allUsers.find((us) => us.user === userName);
            if(user){
                user.joined = true;
            }
        },
        removeUser: (state, action) => {
         state.allUsers = state.allUsers.filter(user => user.name !== action.payload);
        },
        clearRoom: (state) => {
            state.allUsers = [];
        }
    }
})

export const { toggleSlide , toggle , currentUser , addUsers , userAdded , clearRoom} = StateSlice.actions;

export default StateSlice.reducer;