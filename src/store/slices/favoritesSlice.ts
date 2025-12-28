import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ContentItem } from './contentSlice';

interface FavoritesState {
  items: ContentItem[];
}

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<ContentItem>) => {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearFavorites: (state) => {
      state.items = [];
    },
    reorderFavorites: (state, action: PayloadAction<{ sourceIndex: number; destinationIndex: number }>) => {
      const { sourceIndex, destinationIndex } = action.payload;
      const [reorderedItem] = state.items.splice(sourceIndex, 1);
      state.items.splice(destinationIndex, 0, reorderedItem);
    },
  },
});

export const {
  addToFavorites,
  removeFromFavorites,
  clearFavorites,
  reorderFavorites,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;