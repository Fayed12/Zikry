// redux
import { configureStore } from "@reduxjs/toolkit";

// local 
import dataReducer from "./dataSlice"

const store = configureStore({
    reducer: {
        data:  dataReducer
    }
})

export default store