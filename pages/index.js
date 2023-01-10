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
  const [firstText, setFirstText] = useState('');
  const [secondText, setSecondText] = useState('');
  const [dropDownItem, setDropDownItem] = useState('');
  const [calendarData, setCalendarData] = useState(null);
  const [radioVal, setRadioVal] = useState('male');
  const [submittedData, setSubmittedData] = useState({});
  const [openModal, setOpenModal] = useState(false);

  console.log('submittedData: ', submittedData);

  const firstTextHandler = (event) => {
    setFirstText(event.target.value);
  };

  const secondTextHandler = (event) => {
    setSecondText(event.target.value);
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
      text1: firstText,
      text2: secondText,
      dropDownItem,
      calendarData:
        calendarData &&
        calendarData.$d &&
        dayjs(calendarData.$d).format('MM/DD/YYYY'),
      gender: radioVal,
    };
    setSubmittedData(subData);
    setFirstText('');
    setSecondText('');
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
            label="Text 1"
            variant="outlined"
            value={firstText}
            onChange={firstTextHandler}
            sx={{ width: '225px' }}
          />
          <DropdownComponent
            dropdownValue={dropDownItem}
            setDropDownValue={setDropDownItem}
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
          <TextField
            data-testid="first-text-input"
            label="Text 2"
            variant="outlined"
            value={secondText}
            onChange={secondTextHandler}
            sx={{ width: '225px' }}
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
      <div>
        <ModalComponent open={openModal} submittedData={submittedData} />
      </div>
    </main>
  );
}
