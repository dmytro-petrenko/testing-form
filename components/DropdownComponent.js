import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { styled } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const StyledMenu = styled((props) => (
  <Menu
    // elevation={0}
    // anchorOrigin={{
    //   vertical: 'bottom',
    //   horizontal: 'right',
    // }}
    // transformOrigin={{
    //   vertical: 'top',
    //   horizontal: 'right',
    // }}
    // id="menu"
    // MenuListProps={{
    //   'aria-labelledby': 'fade-button',
    // }}
    // anchorEl={anchorEl}
    // open={open}
    // onClose={handleClose}
    // TransitionComponent={Fade}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 225,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      textAlign: 'center',
    },
  },
}));

const MenuItemsArr = ['Menu item 1', 'Menu item 2', 'Menu item 3'];

const DropdownComponent = ({ dropdownValue, setDropDownValue }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (item) => {
    setAnchorEl(null);
    setDropDownValue(item);
  };

  return (
    <div>
      <Button
        id="button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{
          width: '225px',
          border: '1px solid blue',
          backgroundColor: '#1976d2',
          color: '#fff',
          fontWeight: 500,
          padding: '16.5px 14px',
          '&:hover': {
            color: 'blue',
            fontWeight: 500,
          },
        }}
      >
        {dropdownValue.length ? dropdownValue : 'Select item'}
      </Button>
      <StyledMenu
        id="menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        // value={dropdownValue}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {MenuItemsArr.map((item, index) => (
          <MenuItem key={index} onClick={() => handleClose(item)}>
            {item}
          </MenuItem>
        ))}
      </StyledMenu>
    </div>
  );
};
export default DropdownComponent;
