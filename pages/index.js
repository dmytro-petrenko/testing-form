import React, { useState } from 'react';
import { Inter } from '@next/font/google';
import styles from '../styles/Home.module.css';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import DropdownComponent from '../components/DropdownComponent';
import CalendarPicker from '../components/CalendarPicker';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import ModalComponent from '../components/Modal';
import dayjs from 'dayjs';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dropdownItem, setDropdownItem] = useState('');
  const [calendarData, setCalendarData] = useState(null);
  const [radioVal, setRadioVal] = useState('male');
  const [submittedData, setSubmittedData] = useState({});
  const [openModal, setOpenModal] = useState({ open: false, statusCode: 200 });

  console.log('submittedData: ', submittedData);

  const firstNameHandler = (event) => {
    setFirstName(event.target.value);
  };

  const lastNameHandler = (event) => {
    setLastName(event.target.value);
  };

  const openModalHandler = (open, statusCode) => {
    setOpenModal({ open, statusCode });
  };

  const closeModalHandler = () => {
    setOpenModal({ ...openModal, open: false });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const subData = {
      firstName,
      lastName,
      dropdownItem,
      calendarData:
        calendarData &&
        calendarData.$d &&
        dayjs(calendarData.$d).format('MM/DD/YYYY'),
      gender: radioVal,
    };

    setSubmittedData(subData);

    let response = await fetch('/api/form', {
      method: 'POST',
      body: JSON.stringify(subData),
    });
    if (response.status === 200) {
      console.log('SUCCESS!!!');
      openModalHandler(true, 200);
      let data = await response.json();
      console.log('Data from Fetch: ', data.body);
    } else if (response.status === 408) {
      console.log('SOMETHING WENT WRONG');
      setSubmittedData({});
      openModalHandler(true, 408);
    } else {
      console.log('FAILURE!!!');
      setSubmittedData({});
      openModalHandler(true, response.status);
    }

    setFirstName('');
    setLastName('');
    setDropdownItem('');
    setCalendarData(null);
    setRadioVal('male');
  };

  return (
    <main className={styles.main} onClick={closeModalHandler}>
      <Box
        data-testid="form"
        component="form"
        method="POST"
        onSubmit={(event) => submitHandler(event)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '500px',
        }}
      >
        <Box
          component="div"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            mb: '20px',
          }}
        >
          <TextField
            id="first-name-input"
            label="First Name"
            variant="outlined"
            value={firstName}
            onChange={firstNameHandler}
            sx={{ width: '225px' }}
          />
          <TextField
            id="last-name-input"
            label="Last Name"
            variant="outlined"
            value={lastName}
            onChange={lastNameHandler}
            sx={{ width: '225px' }}
          />
        </Box>
        <Box
          component="div"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            mb: '20px',
          }}
        >
          <DropdownComponent
            dropdownValue={dropdownItem}
            setDropDownValue={setDropdownItem}
          />
          <CalendarPicker
            calendarData={calendarData}
            setCalendarData={setCalendarData}
          />
        </Box>
        <Box
          component="div"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            mb: '20px',
          }}
        >
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="male"
              name="radio-buttons-group"
              sx={{
                display: 'flex',
                flexDirection: 'row',
              }}
              // value={radioVal}
              onChange={(event) => setRadioVal(event.target.value)}
            >
              <FormControlLabel
                value="male"
                control={<Radio />}
                label="Male"
                sx={{
                  mr: '25px',
                }}
              />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
          </FormControl>
        </Box>

        <Button
          type="submit"
          variant="contained"
          sx={{ width: '250px', height: '45px', m: '0 auto' }}
        >
          Submit
        </Button>
      </Box>

      <ModalComponent
        open={openModal.open}
        statusCode={openModal.statusCode}
      />
    </main>
  );
}
