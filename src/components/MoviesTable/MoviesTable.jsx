import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Search } from '@mui/icons-material';

import { checkMovies } from 'src/redux/features';
import { columns } from './columns';

export const MoviesTable = () => {
  const { movies } = useSelector(state => state.moviesRating);

  const [searchName, setSearchName] = useState('');
  const [sortModel, setSortModel] = useState([
    {
      field: 'name',
      sort: 'asc',
    },
  ]);

  const dispatch = useDispatch();

  const selectMovie = selected => dispatch(checkMovies(selected));

  const onRowSelectionModelChange = newSelection => {
    selectMovie(newSelection);
  };

  const handleChangeSearch = e => {
    setSearchName(e.target.value);
  };

  const rows = searchName
    ? movies.filter(
        ({ name }) =>
          name.toLowerCase().slice(0, 3) ===
          searchName.toLowerCase().slice(0, 3),
      )
    : movies;

  return (
    <>
      <TextField
        label="Search by movie name"
        sx={{ mb: 2 }}
        fullWidth
        size="small"
        InputProps={{
          endAdornment: <Search />,
        }}
        onChange={handleChangeSearch}
      />
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        disableColumnMenu
        sortModel={sortModel}
        onSortModelChange={model => setSortModel(model)}
        onRowSelectionModelChange={onRowSelectionModelChange}
      />
    </>
  );
};
