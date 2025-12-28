import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface ContentItem {
  id: string;
  type: 'news' | 'movie' | 'music' | 'social';
  title: string;
  description: string;
  imageUrl: string;
  url: string;
  category: string;
  publishedAt: string;
  source?: string;
  author?: string;
  rating?: number;
  isTrending?: boolean;
}

interface ContentState {
  items: ContentItem[];
  trendingItems: ContentItem[];
  loading: boolean;
  error: string | null;
  searchResults: ContentItem[];
  searchLoading: boolean;
  currentPage: number;
  hasMore: boolean;
}

const initialState: ContentState = {
  items: [],
  trendingItems: [],
  loading: false,
  error: null,
  searchResults: [],
  searchLoading: false,
  currentPage: 1,
  hasMore: true,
};

// Mock API call - replace with real API integrations
export const fetchPersonalizedContent = createAsyncThunk(
  'content/fetchPersonalized',
  async (preferences: string[]) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock data generation based on preferences
    const mockContent: ContentItem[] = [];
    
    preferences.forEach((category, index) => {
      const items = generateMockItems(category, 3);
      mockContent.push(...items);
    });
    
    return mockContent;
  }
);

export const fetchTrendingContent = createAsyncThunk(
  'content/fetchTrending',
  async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return [
      ...generateMockItems('technology', 2, true),
      ...generateMockItems('entertainment', 2, true),
      ...generateMockItems('sports', 1, true),
    ];
  }
);

export const searchContent = createAsyncThunk(
  'content/search',
  async (query: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock search results
    return generateMockItems('search', 5).map(item => ({
      ...item,
      title: `${query} - ${item.title}`,
    }));
  }
);

// Helper function to generate mock content
function generateMockItems(category: string, count: number, isTrending = false): ContentItem[] {
  const items: ContentItem[] = [];
  const types: ContentItem['type'][] = ['news', 'movie', 'music', 'social'];
  
  for (let i = 0; i < count; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    items.push({
      id: `${category}-${type}-${Date.now()}-${i}`,
      type,
      title: `${category.charAt(0).toUpperCase() + category.slice(1)} ${type} content ${i + 1}`,
      description: `This is a detailed description for ${category} ${type} content. It provides engaging information about the topic.`,
      imageUrl: `https://picsum.photos/400/300?random=${Date.now() + i}`,
      url: `#${category}-${type}-${i}`,
      category,
      publishedAt: new Date(Date.now() - Math.random() * 86400000 * 7).toISOString(),
      source: `${category.charAt(0).toUpperCase() + category.slice(1)} Source`,
      author: `Author ${i + 1}`,
      rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
      isTrending,
    });
  }
  
  return items;
}

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
    reorderContent: (state, action: PayloadAction<{ sourceIndex: number; destinationIndex: number }>) => {
      const { sourceIndex, destinationIndex } = action.payload;
      const [reorderedItem] = state.items.splice(sourceIndex, 1);
      state.items.splice(destinationIndex, 0, reorderedItem);
    },
  },
  extraReducers: (builder) => {
    builder
      // Personalized content
      .addCase(fetchPersonalizedContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPersonalizedContent.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPersonalizedContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch content';
      })
      // Trending content
      .addCase(fetchTrendingContent.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTrendingContent.fulfilled, (state, action) => {
        state.loading = false;
        state.trendingItems = action.payload;
      })
      .addCase(fetchTrendingContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch trending content';
      })
      // Search
      .addCase(searchContent.pending, (state) => {
        state.searchLoading = true;
      })
      .addCase(searchContent.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchContent.rejected, (state, action) => {
        state.searchLoading = false;
        state.error = action.error.message || 'Search failed';
      });
  },
});

export const { clearSearchResults, reorderContent } = contentSlice.actions;
export default contentSlice.reducer;