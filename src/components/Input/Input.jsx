import PropTypes from 'prop-types';
import { TextField, Box } from '@mui/material';

import { errorStyles } from 'src/components/Form/styles';

export const Input = ({ error, ...rest }) => {
  return (
    <>
      <TextField {...rest} error={Boolean(error) || false} />
      <Box sx={errorStyles}>{error?.message}</Box>
    </>
  );
};

Input.propTypes = {
  error: PropTypes.shape({ message: PropTypes.string }),
};
