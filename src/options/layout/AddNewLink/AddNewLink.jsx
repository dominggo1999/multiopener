import React from 'react';
import { useLocation } from 'react-router-dom';

const AddNewLink = () => {
  const a = useLocation();

  console.log(a);

  return (
    <div>AddNewLink</div>
  );
};

export default AddNewLink;
