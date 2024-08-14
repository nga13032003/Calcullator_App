// components/Display.js
import React from 'react';

const Display = ({ input, result }) => {
    return (
        <div className="display mb-4 p-2 border rounded-md">
            <div className="input text-right text-xl">{input || '0'}</div>
            <div className="result text-right text-2xl font-bold">{result || '0'}</div>
        </div>
    );
};

export default Display;
