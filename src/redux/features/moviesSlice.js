import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  movies: [],
};

export const moviesSlice = createSlice({
  name: 'moviesSlice',
  initialState,
  reducers: {
    addMovie: (state, action) => {
      state.movies = [...state.movies, action.payload];
    },
    removeMovies: (state, action) => {
      state.movies = state.movies.filter(
        movie => !action.payload.some(({ id }) => movie.id === id),
      );
    },
    checkMovies: (state, action) => {
      state.movies = state.movies.map(movie => {
        if (action.payload.includes(movie.id)) {
          return { ...movie, checked: true };
        }
        return { ...movie, checked: false };
      });
    },
  },
});

export const { addMovie, removeMovies, checkMovies } = moviesSlice.actions;

export const moviesReducer = moviesSlice.reducer;
