import React, { ReactNode, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  Select,
  MenuItem,
  Typography,
  TextField,
  InputAdornment,
  Divider,
  SelectChangeEvent,
  useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SorterProps {
  onApply: (sortBy: string, searchQuery: string) => void;
}

const Sorter: React.FC<SorterProps> = ({ onApply }) => {
  const [sortBy, setSortBy] = useState('new');
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useTheme();
  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortBy(event.target.value as string);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleApplyClick = () => {
    setSearchQuery("");
    onApply(sortBy, searchQuery);
  };

  const handleSearch = () => {
    onApply(sortBy, searchQuery);
  };


  return (
    <Box
      sx={{
        margin: 'auto',
        width: { xs: '100%', md: '70%' }, // Adjust width for different screen sizes
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' }, // Stack vertically on small screens
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px',
        flexWrap: 'wrap', // Enable wrapping for responsiveness
        '@media (max-width: 1200px)': {
          width: '100%',
          margin: '20px 0',
        },
      }}
    >
      {/* First Box */}
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: { xs: '100%', md: 'auto' } }}>
        <FormControl sx={{ minWidth: 120, margin: 1 }}>
          <Select
            labelId="sort-label"
            value={sortBy}
            onChange={handleSortChange}
            sx={{ marginTop: 0 }}
          >
            <MenuItem value="new">New</MenuItem>
            <MenuItem value="likes">Likes</MenuItem>
            <MenuItem value="hot">Hot</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120, margin: 1 }}>
          <Button sx={{ height: "100%" }} variant="contained" onClick={handleApplyClick}>
            Apply
          </Button>
        </FormControl>
      </Box>

      {/* Vertical Divider */}
      <Divider
        orientation="vertical"
        flexItem
        sx={{
          display: { xs: 'none', md: 'block' }, // Hide divider on small screens
          margin: '16px 16px',
          color: theme.palette.mode === 'dark' ? "white" : "black",
          backgroundColor: theme.palette.mode === 'dark' ? "white" : "black",
          borderWidth: "1px",
        }}
      />

      {/* Second Box */}
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: { xs: '100%', md: 'auto' } }}>
        <FormControl sx={{ flex: 1, margin: 1 }}>
          <TextField
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              borderRadius: '4px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '4px',
              },
              width: '100%',
            }}
          />
        </FormControl>

        <FormControl sx={{ minWidth: 120, margin: 1 }}>
          <Button variant="contained" onClick={handleSearch}>Search</Button>
        </FormControl>
      </Box>
    </Box>
  );
};

export default Sorter;
