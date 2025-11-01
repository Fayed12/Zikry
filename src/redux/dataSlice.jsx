// redux
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// local
import { supabase } from "../supabaseClient";

const initialState = {
  data: [],
  loading: false,
  error: null,
  updateLoading: false,
  updateDone: false,
  updateError: null,
};

// fetch all data
export const fetchData = createAsyncThunk(
  "dataSlice/fetchData",
  async (_, thunkAPI) => {
    const { data, error } = await supabase.from("data").select("*");
    if (error) return thunkAPI.rejectWithValue(error.message);
    return data;
  }
);

// update some data
export const updateData = createAsyncThunk(
  "dataSlice/updateData",
  async ({ prayerId, updateValue }, thunkAPI) => {
    const { data, error } = await supabase
      .from("data")
      .update(updateValue)
      .eq("id", prayerId)
      .select();
    if (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    return data;
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        (state.data = action.payload),
          (state.loading = false),
          (state.error = null);
      })
      .addCase(fetchData.rejected, (state, action) => {
        (state.error = action.payload), (state.loading = false);
      });
    builder
      .addCase(updateData.pending, (state) => {
        (state.updateLoading = true),
          (state.updateError = null),
          (state.updateDone = false);
      })
      .addCase(updateData.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.updateError = null;
        state.updateDone = true;
        const updatedPrayer = action.payload[0];
        const index = state.data.findIndex((p) => p.id === updatedPrayer.id);
        if (index !== -1) {
          state.data[index] = updatedPrayer;
        }
      })
      .addCase(updateData.rejected, (state, action) => {
        (state.updateLoading = false),
          (state.updateError = action.payload),
          (state.updateDone = false);
      });
  },
});

export default dataSlice.reducer;
