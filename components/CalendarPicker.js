import React from 'react';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import dayjs from 'dayjs';

const CalendarPicker = ({ calendarData, setCalendarData }) => {
  // console.log('value: ', value && dayjs(value.$d).format('MM/DD/YYYY'));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        id="datepicker-input"
        label="Select date"
        value={calendarData}
        onChange={(val) => {
          setCalendarData(val);
        }}
        renderInput={(params) => (
          <TextField sx={{ width: '225px' }} {...params} />
        )}
        sx={{
          display: 'block',
          width: '225px',
          textTransform: 'capitilize',
        }}
      />
    </LocalizationProvider>
  );
};
export default CalendarPicker;
