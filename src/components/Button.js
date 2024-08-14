// components/Button.js
import React from 'react';

const Button = ({ onClick, children, className }) => (
  <button
    onClick={onClick}
    className={`button p-2 m-1 border rounded-md ${className}`}
  >
    {children}
  </button>
);

export default React.memo(Button);
