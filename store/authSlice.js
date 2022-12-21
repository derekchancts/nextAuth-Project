import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

import { parseCookies } from "nookies";
import { useSession } from "next-auth/react";


// const cookies = parseCookies();
// const user = cookies?.user ? JSON.parse(cookies.user) : "" 


// Initial state
const initialState = {
  //currentUser: user,
  currentUser: null,
  loading: false,
  error: null
};

// Actual Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.currentUser = action.payload
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...state,
          ...action.payload.auth,
        };
      },
    },


  },
});


export const { setUser } = authSlice.actions;

// export const selectAuthState = (state) => state.auth.dbUser;
// export const selectUserState = (state) => state.auth.currentUser;

export default authSlice.reducer;