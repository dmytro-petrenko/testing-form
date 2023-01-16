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
  const [dropDownItem, setDropDownItem] = useState('');
  const [calendarData, setCalendarData] = useState(null);
  const [radioVal, setRadioVal] = useState('male');
  const [submittedData, setSubmittedData] = useState({});
  const [openModal, setOpenModal] = useState(false);

  console.log('submittedData: ', submittedData);

  const firstNameHandler = (event) => {
    setFirstName(event.target.value);
  };

  const lastNameHandler = (event) => {
    setLastName(event.target.value);
  };

  const openModalHandler = () => {
    setOpenModal(true);
  };

  const closeModalHandler = () => {
    setOpenModal(false);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const subData = {
      firstName,
      lastName,
      dropDownItem,
      calendarData:
        calendarData &&
        calendarData.$d &&
        dayjs(calendarData.$d).format('MM/DD/YYYY'),
      gender: radioVal,
    };

    setSubmittedData(subData);

    // fetch('/api/form', {
    //   method: 'POST',
    //   body: subData,
    // }).then((res) => {
    //   if (res.status === 200) {
    //     console.log('SUCCESS!!!');
    //     openModalHandler();
    //   } else if (res.status === 408) {
    //     console.log('SOMETHING WENT WRONG');
    //     setSubmittedData({});
    //     openModalHandler();
    //   } else {
    //     console.log('FAILURE!!!');
    //     setSubmittedData({});
    //     openModalHandler();
    //   }
    // });

    setFirstName('');
    setLastName('');
    setDropDownItem('');
    setCalendarData(null);
    setRadioVal('male');

    openModalHandler();
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
            dropdownValue={dropDownItem}
            setDropDownValue={setDropDownItem}
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

      <ModalComponent open={openModal} submittedData={submittedData} />
    </main>
  );
}
