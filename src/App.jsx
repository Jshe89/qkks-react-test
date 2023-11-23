import { Grid, Box } from '@mui/material';

import { Form, MoviesTable } from 'src/components';

const App = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Grid container p="40px 30px" spacing={5} sx={{ maxWidth: '1440px' }}>
        <Grid item xs={4}>
          <Form />
        </Grid>
        <Grid item xs={8}>
          <MoviesTable />
        </Grid>
      </Grid>
    </Box>
  );
};

export default App;
