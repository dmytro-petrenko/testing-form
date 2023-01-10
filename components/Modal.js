import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const style = {
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 400,
  bgcolor: 'background.paper',
  border: '2px solid',
  borderRadius: 3,
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const ModalComponent = ({ open, submittedData }) => {
  let isSucces;
  if (submittedData && Object.entries(submittedData).length) {
    if (
      submittedData.text1.length &&
      submittedData.text2.length &&
      submittedData.dropDownItem.length &&
      submittedData.calendarData &&
      submittedData.gender
    ) {
      isSucces = true;
    } else {
      isSucces = false;
    }
  } else {
    isSucces = false;
  }

  return (
    <Modal hideBackdrop open={open}>
      <Box sx={{ ...style, borderColor: isSucces ? 'green' : 'red' }}>
        <h2 style={{ color: isSucces ? 'green' : 'red' }}>
          {isSucces ? 'Success' : 'Failure '}
        </h2>
      </Box>
    </Modal>
  );
};
export default ModalComponent;
