import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import { IconButton } from '@mui/material';
import { useEffect, useState } from 'react';

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
    <div className="sort">
      <div className="text-sort " onClick={() => handleSort('name')}>
        <IconButton>
          <SortByAlphaIcon />
        </IconButton>
        <ArrowUpwardIcon style={getArrowDir('name')} />
      </div>
      <div className="age-sort " onClick={() => handleSort('age')}>
        <IconButton>
          <FormatListNumberedRtlIcon />
        </IconButton>
        <ArrowUpwardIcon style={getArrowDir('age')} />
      </div>
    </div>
  );
}
