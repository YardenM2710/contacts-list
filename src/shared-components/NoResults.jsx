import { Box, Typography } from '@mui/material';
import noResultsIcon from '../icons/no-results.png';
export function NoResults() {
  return (
    <section className="no-results">
      <Box sx={{ textAlign: 'center' }} mt={5} display="flex" flexDirection="column" alignItems="center" className="no-results-container">
        <Box className="no-results-text">
          <Typography variant="h5" component="h1">
            Whoopps...
          </Typography>
        </Box>
        <Box my={2} width="220px" className="no-results-img">
          <img style={{ borderRadius: '20px' }} src={noResultsIcon} alt="no-results" />
        </Box>
        <Typography variant="h5" component="h1">
          No results
        </Typography>
      </Box>
    </section>
  );
}
