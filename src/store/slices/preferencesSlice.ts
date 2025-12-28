import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserPreferences {
  categories: string[];
  contentTypes: ('news' | 'movie' | 'music' | 'social')[];
  language: string;
  region: string;
}

interface PreferencesState {
  preferences: UserPreferences;
  isConfigured: boolean;
}

const initialState: PreferencesState = {
  preferences: {
    categories: ['technology', 'entertainment', 'sports'],
    contentTypes: ['news', 'movie', 'music', 'social'],
    language: 'en',
    region: 'us',
  },
  isConfigured: false,
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    updateCategories: (state, action: PayloadAction<string[]>) => {
      state.preferences.categories = action.payload;
      state.isConfigured = true;
    },
    updateContentTypes: (state, action: PayloadAction<('news' | 'movie' | 'music' | 'social')[]>) => {
      state.preferences.contentTypes = action.payload;
    },
    updateLanguage: (state, action: PayloadAction<string>) => {
      state.preferences.language = action.payload;
    },
    updateRegion: (state, action: PayloadAction<string>) => {
      state.preferences.region = action.payload;
    },
    setPreferences: (state, action: PayloadAction<UserPreferences>) => {
      state.preferences = action.payload;
      state.isConfigured = true;
    },
    resetPreferences: (state) => {
      state.preferences = initialState.preferences;
      state.isConfigured = false;
    },
  },
});

export const {
  updateCategories,
  updateContentTypes,
  updateLanguage,
  updateRegion,
  setPreferences,
  resetPreferences,
} = preferencesSlice.actions;

export default preferencesSlice.reducer;