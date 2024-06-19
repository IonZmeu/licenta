import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Grid, Typography, TextField } from '@mui/material';
import axios from 'axios';

interface SorterProps {
  onApply: (sortBy: string, jobName: string, countryName: string, min: number | undefined, max: number | undefined) => void;
}

const Sorter: React.FC<SorterProps> = ({ onApply }) => {

  const [sortBy, setSortBy] = useState('new');
  const [jobName, setJobName] = useState('');
  const [countryName, setCountryName] = useState('');
  const [min, setMin] = useState<number | undefined>();
  const [max, setMax] = useState<number | undefined>();
  const [jobNames, setJobNames] = useState<string[]>([]);
  const [countryNames, setCountryNames] = useState<string[]>([]);

  useEffect(() => {
    const fetchJobNames = async () => {
      try {
        const response = await axios.get<string[]>(`http://localhost:4123/job/names`);
        setJobNames(response.data);
      } catch (error) {
        console.log('Error fetching data: ', error);
      }
    };

    const fetchCountryNames = async () => {
      try {
        const response = await axios.get<string[]>(`http://localhost:4123/job/countries`);
        setCountryNames(response.data);
      } catch (error) {
        console.log('Error fetching data: ', error);
      }
    };

    fetchCountryNames();
    fetchJobNames();
  }, []);

  const handleCountrySelectChange = (e: SelectChangeEvent<string>) => {
    setCountryName(e.target.value);
  };

  const handleJobNameSelectChange = (e: SelectChangeEvent<string>) => {
    setJobName(e.target.value);
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortBy(event.target.value);
  };

  const handleApplyClick = () => {
    onApply(sortBy, jobName, countryName, min, max);
  };

  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMin(event.target.value === '' ? undefined : Number(event.target.value));
  };

  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMax(event.target.value === '' ? undefined : Number(event.target.value));
  };

  const handleResetClick = () => {
    setSortBy('new');
    setJobName('');
    setCountryName('');
    setMin(undefined);
    setMax(undefined);
  };

  return (
    <Box
      sx={{
        margin:'auto',
        width: '90%',
        background: '#fff',
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px',
        '@media (max-width: 1200px)': {
          width: '100%',
          margin: '20px 0',
        },
      }}
    >
      <FormControl sx={{ minWidth: 120, margin: 1 }}>
        <Typography id="sort-label" gutterBottom>
          Sort By
        </Typography>
        <Select
          labelId="sort-label"
          value={sortBy}
          onChange={handleSortChange}
        >
          <MenuItem value="new">New</MenuItem>
          <MenuItem value="likes">Likes</MenuItem>
          <MenuItem value="hot">Hot</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 120, margin: 1 }}>
        <Typography id="job-label" gutterBottom>
          Job
        </Typography>
        <Select
          labelId="job-label"
          name="job"
          value={jobName}
          onChange={handleJobNameSelectChange}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 200,
                overflowY: 'auto'
              },
            },
          }}
        >
          {jobNames.map(job => (
            <MenuItem key={job} value={job}>{job}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 120, margin: 1 }}>
        <Typography id="country-label" gutterBottom>
          Country
        </Typography>
        <Select
          labelId="country-label"
          name="country"
          value={countryName}
          onChange={handleCountrySelectChange}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 200,
                overflowY: 'auto'
              },
            },
          }}
        >
          {countryNames.map(country => (
            <MenuItem key={country} value={country}>{country}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 120, margin: 1 }}>
        <Typography id="min-salary" gutterBottom>
          Minimum Salary USD
        </Typography>
        <TextField
          id="min-salary"
          type="number"
          value={min === undefined ? '' : min}
          onChange={handleMinChange}
          fullWidth
        />
      </FormControl>

      <FormControl sx={{ minWidth: 120, margin: 1 }}>
        <Typography id="max-salary" gutterBottom>
          Maximum Salary USD
        </Typography>
        <TextField
          id="max-salary"
          type="number"
          value={max === undefined ? '' : max}
          onChange={handleMaxChange}
          fullWidth
        />
      </FormControl>

      <FormControl sx={{ minWidth: 120, margin: 1 }}>
        <Button variant="contained" onClick={handleApplyClick}>Apply</Button>
      </FormControl>

      <FormControl sx={{ minWidth: 120, margin: 1 }}>
        <Button variant="contained" onClick={handleResetClick}>Reset</Button>
      </FormControl>
    </Box>
  );
}

export default Sorter;
