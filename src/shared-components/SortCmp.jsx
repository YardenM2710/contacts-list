import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import { Box, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
const sortSX = {
  display: 'flex',
  alignItems: 'center',
  padding: '15px',
  color: 'rgb(103, 103, 103)'
};

export function SortCmp({ sortBy, handleSort }) {
  const [arrowDir, setArrowDir] = useState();
  useEffect(() => {
    setArrowDir(sortBy);
  }, [sortBy]);

  const getArrowDir = tag => {
    if (!arrowDir) return;
    if (arrowDir.order === 'desc' && arrowDir.field === tag) {
      return {
        transform: `rotate(180deg)`
      };
    } else {
      return { transform: '' };
    }
  };
  return (
    <Box sx={sortSX} className="sort">
      <Box sx={{ cursor: 'pointer' }} display="flex" alignItems="center" className="text-sort " onClick={() => handleSort('name')}>
        <IconButton>
          <SortByAlphaIcon />
        </IconButton>
        <ArrowUpwardIcon style={getArrowDir('name')} />
      </Box>
      <Box sx={{ cursor: 'pointer' }} display="flex" alignItems="center" ml={2} className="age-sort " onClick={() => handleSort('age')}>
        <IconButton>
          <FormatListNumberedRtlIcon />
        </IconButton>
        <ArrowUpwardIcon style={getArrowDir('age')} />
      </Box>
    </Box>
  );
}
