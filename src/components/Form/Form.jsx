import { useSelector, useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Grid, Button, Box } from '@mui/material';

import { Input } from 'src/components';
import { addMovie, removeMovies } from 'src/redux/features';
import { schema } from './schema';

export const Form = () => {
  const { movies } = useSelector(state => state.moviesRating);

  const isDisableDeleteButton = movies.some(({ checked }) => checked);

  const dispatch = useDispatch();

  const createMovie = movie => dispatch(addMovie(movie));
  const deleteMovie = movie => dispatch(removeMovies(movie));

  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      time: '',
      rating: '',
    },
    mode: 'onSubmit',
    shouldUnregister: true,
  });

  const handleDeleteMovie = () => {
    const selectedMovies = movies.filter(({ checked }) => checked);

    deleteMovie(selectedMovies);
  };

  const handleSubmitForm = data => {
    createMovie({
      id: (Math.random() * 10000).toFixed(),
      checked: false,
      ...data,
    });
    reset();
  };

  return (
    <form noValidate onSubmit={handleSubmit(handleSubmitForm)}>
      <Grid container>
        <Grid item>
          <Box>Please enter movie info</Box>
          <Box mb="15px" sx={{ color: 'grey', fontSize: '12px' }}>
            Fields, marked with *, are required to fill.
          </Box>
        </Grid>
        <Grid item container spacing="24px" mb="24px">
          <Grid item xs={12}>
            <Controller
              name="name"
              control={control}
              shouldUnregister
              rules={{ required: true }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <>
                  <Input
                    value={value}
                    label="Name"
                    variant="outlined"
                    error={error}
                    size="small"
                    required
                    fullWidth
                    onBlur={onBlur}
                    onChange={onChange}
                  />
                </>
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="time"
              control={control}
              rules={{ required: true }}
              shouldUnregister
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <>
                  <Input
                    label="Time"
                    value={value}
                    variant="outlined"
                    error={error}
                    size="small"
                    required
                    fullWidth
                    onBlur={onBlur}
                    onChange={onChange}
                  />
                </>
              )}
            />
          </Grid>
        </Grid>

        <Grid item container spacing="24px">
          <Grid item xs={12}>
            <Controller
              name="rating"
              control={control}
              rules={{ required: true }}
              shouldUnregister
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <>
                  <Input
                    type="number"
                    label="Rating"
                    value={value}
                    variant="outlined"
                    error={error}
                    size="small"
                    required
                    fullWidth
                    onBlur={onBlur}
                    onChange={onChange}
                  />
                </>
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <Button type="submit" variant="contained" fullWidth>
              Add Movie
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              onClick={handleDeleteMovie}
              disabled={!isDisableDeleteButton}
              fullWidth
            >
              Delete Movie(s)
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};
