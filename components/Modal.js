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

const ModalComponent = ({
  open,
  statusCode,
  // submittedData
}) => {
  // let isSucces;
  // 501 - Not Implemented
  let status;
  if (statusCode === 200) {
    status = 'Success';
  } else if (statusCode === 408) {
    status = 'Request timeout';
  } else {
    status = 'Failure';
  }
  // if (submittedData && Object.entries(submittedData).length) {
  //   if (
  //     submittedData.firstName.length &&
  //     submittedData.lastName.length &&
  //     submittedData.dropDownItem.length &&
  //     submittedData.calendarData &&
  //     submittedData.gender
  //   ) {
  //     isSucces = true;
  //   } else {
  //     isSucces = false;
  //   }
  // } else {
  //   isSucces = false;
  // }

  return (
    <Modal hideBackdrop open={open}>
      <Box
        data-testid="modal-window"
        sx={{ ...style, borderColor: status === 'Success' ? 'green' : 'red' }}
      >
        <h2 style={{ color: status === 'Success' ? 'green' : 'red' }}>
          {/* {isSucces ? 'Success' : 'Failure '} */}
          {status}
        </h2>
      </Box>
    </Modal>
  );
};
export default ModalComponent;
