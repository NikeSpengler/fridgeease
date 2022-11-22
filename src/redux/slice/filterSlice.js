import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    filteredProducts: []
}

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
      FILTER_BY_CATEGORY(state, action) {
        const {products, category} = action.payload
        let tempProducts = []
        if(category === "Allt") {
            tempProducts = products
        } else {
            tempProducts = products.filter((product) => products.category === category);
        }
        state.filteredProducts = tempProducts;
      }, 
    },
});

export const {FILTER_BY_CATEGORY} = filterSlice.actions

const  selectFilteredProducts = (state) => state.filter.filteredProducts

export default filterSlice.reducer