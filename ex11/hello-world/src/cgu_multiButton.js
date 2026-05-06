import React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AlarmIcon from '@mui/icons-material/Alarm';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const MultiButton = () => {
  return (
    <div>
      <IconButton color="primary" aria-label="add to shopping cart">
        <AddShoppingCartIcon />
      </IconButton>
      <IconButton color="primary" aria-label="delete">
        <DeleteIcon />
      </IconButton>
      <IconButton color="primary" aria-label="add an alarm">
        <AlarmIcon />
      </IconButton>
    </div>
  );
};

export default MultiButton;