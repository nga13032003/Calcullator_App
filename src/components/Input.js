import React from 'react';

const Input = ({ value, onChange }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    className="input mb-4 p-2 w-full border rounded-md"
  />
);

export default React.memo(Input);