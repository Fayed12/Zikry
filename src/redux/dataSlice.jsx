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
  deleteActions: {
    loading: false,
    done: false,
    error: null,
  },
  addNewSuppActions: {
    loading: false,
    done: false,
    error: null,
  },
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

// delete value
export const deleteData = createAsyncThunk(
  "dataSlice/deleteData",
  async (prayerId, thunkAPI) => {
    const {error } = await supabase.from("data").delete().eq("id", prayerId);
    if (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    thunkAPI.dispatch(fetchData());
  }
);

// add new value
export const addNewValue = createAsyncThunk(
  "dataSlice/addNewValue",
  async (newPrayer, thunkAPI) => {
    const { data, error } = await supabase
      .from("data")
      .insert([
        {
          id: newPrayer.id,
          type: newPrayer.title,
          number: newPrayer.allNumber,
          text: newPrayer.text,
          virtue: newPrayer.virtue,
          time: newPrayer.time,
          is_fav: newPrayer.is_fav,
        },
      ])
      .select();

    if (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    thunkAPI.dispatch(fetchData());
    return data;
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    resetUpdateState: (state) => {
      state.updateLoading = false;
      state.updateDone = false;
      state.updateError = null;
    },
    resetDeleteState: (state) => {
      state.deleteActions = { loading: false, done: false, error: null };
    },
    resetAddNewValue: (state) => {
      state.addNewSuppActions = { loading: false, done: false, error: null };
    }
  },
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
    builder
      .addCase(deleteData.pending, (state) => {
        (state.deleteActions.loading = true),
          (state.deleteActions.error = null);
        state.deleteActions.done = false;
      })
      .addCase(deleteData.fulfilled, (state) => {
        (state.deleteActions.loading = false),
          (state.deleteActions.error = null);
        (state.deleteActions.done = true)
      })
      .addCase(deleteData.rejected, (state, action) => {
        (state.deleteActions.loading = false),
          (state.deleteActions.error = action.payload);
        state.deleteActions.done = false;
      });
    builder
      .addCase(addNewValue.pending, (state) => {
        (state.addNewSuppActions.loading = true),
          (state.addNewSuppActions.error = null);
        state.addNewSuppActions.done = false;
      })
      .addCase(addNewValue.fulfilled, (state) => {
        (state.addNewSuppActions.loading = false);
          (state.addNewSuppActions.error = null);
        (state.addNewSuppActions.done = true);
      })
      .addCase(addNewValue.rejected, (state, action) => {
        (state.addNewSuppActions.loading = false),
          (state.addNewSuppActions.error = action.payload);
        state.addNewSuppActions.done = false;
      });
  },
});

export const { resetUpdateState,resetDeleteState,resetAddNewValue } = dataSlice.actions;

export default dataSlice.reducer;
