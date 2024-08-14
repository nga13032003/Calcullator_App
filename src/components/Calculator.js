import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { evaluate } from 'mathjs';
import Button from './Button';
import Display from './Display';
import './Calculator.css';
import useResponsive from '../hooks/useResponsive';

const Calculator = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');
    const { width } = useResponsive();

    const handleButtonClick = useCallback((value) => {
        setInput(prevInput => prevInput + value);
    }, []);

    const handleClear = useCallback(() => {
        setInput('');
        setResult('');
    }, []);

    const handleDelete = useCallback(() => {
        setInput(prevInput => prevInput.slice(0, -1));
    }, []);

    const handleCalculate = useCallback(() => {
        try {
            setResult(evaluate(input));
        } catch (error) {
            setResult('Error');
        }
    }, [input]);

    const handleSpecialOperation = useCallback((operation) => {
        let currentInput = input;
        switch (operation) {
            case '1/x':
                currentInput = `1/(${currentInput})`;
                break;
            case '√':
                currentInput = `sqrt(${currentInput})`;
                break;
            case 'x²':
                currentInput = `(${currentInput})^2`;
                break;
            case 'sin':
            case 'cos':
            case 'tan':
            case 'cot':
                currentInput = `${operation}(${currentInput})`;
                break;
            default:
                break;
        }
        setInput(currentInput);
    }, [input]);

    const handleKeyPress = useCallback((event) => {
        const key = event.key;
        if (!isNaN(key) || ['+', '-', '*', '/', '.', '%'].includes(key)) {
            handleButtonClick(key);
        } else if (key === 'Enter') {
            handleCalculate();
        } else if (key === 'Backspace') {
            handleDelete();
        } else if (key === 'Escape') {
            handleClear();
        } else if (key === '^') {
            handleSpecialOperation('x²');
        }
    }, [handleButtonClick, handleCalculate, handleDelete, handleClear, handleSpecialOperation]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]);

    const buttons = useMemo(() => [
        '1', '2', '3', '+',
        '4', '5', '6', '-',
        '7', '8', '9', '*',
        '0', '/', '%', '1/x',
        'sin', 'cos', 'tan', 'cot',
        '.', '√', 'x²', '=',
        'CE', 'C'
    ], []);

    const renderButton = (button) => {
        switch (button) {
            case 'C':
                return <Button key={button} onClick={handleClear} className="clear-button">{button}</Button>;
            case 'CE':
                return <Button key={button} onClick={handleDelete} className="delete-button">{button}</Button>;
            case '=':
                return <Button key={button} onClick={handleCalculate} className="equals-button">{button}</Button>;
            case '1/x':
            case '√':
            case 'x²':
            case 'sin':
            case 'cos':
            case 'tan':
            case 'cot':
                return <Button key={button} onClick={() => handleSpecialOperation(button)}>{button}</Button>;
            default:
                return <Button key={button} onClick={() => handleButtonClick(button)}>{button}</Button>;
        }
    };

    return (
        <div className={`calculator p-4 md:p-8 ${width < 768 ? 'bg-gray-100' : 'bg-gray-200'} rounded-lg shadow-md max-w-md mx-auto`}>
            <Display input={input} result={result} />
            <div className="buttons">
                {buttons.map(button => renderButton(button))}
            </div>
        </div>
    );
};

export default Calculator;
