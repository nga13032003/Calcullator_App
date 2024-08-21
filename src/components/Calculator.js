import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { evaluate } from 'mathjs';
import Button from './Button';
import Display from './Display';
import '../assets/styles/Calculator.css';
import useResponsive from '../hooks/useResponsive';
import { FaHistory } from 'react-icons/fa'; 
import { BiChevronDown } from "react-icons/bi";
import { setInput, setResult, clear } from '../redux/actions';

const Calculator = () => {
    const input = useSelector((state) => state.input);
    const result = useSelector((state) => state.result);
    const history = useSelector((state) => state.history);
    const dispatch = useDispatch();
    const { width } = useResponsive();
    const [showHistory, setShowHistory] = useState(false);

    const handleButtonClick = useCallback((value) => {
        dispatch(setInput(input + value));
    }, [dispatch, input]);

    const handleClear = useCallback(() => {
        dispatch(clear());
    }, [dispatch]);

    const handleDelete = useCallback(() => {
        dispatch(setInput(input.slice(0, -1)));
    }, [dispatch, input]);

    const handleCalculate = useCallback(() => {
        try {
            const evaluatedResult = evaluate(input);
            dispatch(setResult(evaluatedResult));
            dispatch({ type: 'ADD_TO_HISTORY', payload: `${input} = ${evaluatedResult}` });
        } catch (error) {
            dispatch(setResult('Error'));
        }
    }, [dispatch, input]);

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
        dispatch(setInput(currentInput));
    }, [dispatch, input]);

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (/[0-9+\-*/.]/.test(e.key)) {
                handleButtonClick(e.key);
            } else if (e.key === 'Enter') {
                handleCalculate();
            } else if (e.key === 'Backspace') {
                handleDelete();
            } else if (e.key.toLowerCase() === 'c') {
                handleClear();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [handleButtonClick, handleCalculate, handleClear, handleDelete]);

    return (
        <div className={`calculator p-4 md:p-8 ${width < 768 ? 'bg-gray-100' : 'bg-gray-200'} rounded-lg shadow-md max-w-md mx-auto`}>
            <Display input={input} result={result} />
            {!showHistory && (
                <div className="buttons">
                    {['1', '2', '3', '+', '4', '5', '6', '-', '7', '8', '9', '*', '0', '/', '%', '1/x', 'sin', 'cos', 'tan', 'cot', '.', '√', 'x²', '=', 'CE', 'C']
                        .map(button => (
                            <Button
                                key={button}
                                onClick={() => {
                                    switch (button) {
                                        case 'C':
                                            handleClear();
                                            break;
                                        case 'CE':
                                            handleDelete();
                                            break;
                                        case '=':
                                            handleCalculate();
                                            break;
                                        case '1/x':
                                        case '√':
                                        case 'x²':
                                        case 'sin':
                                        case 'cos':
                                        case 'tan':
                                        case 'cot':
                                            handleSpecialOperation(button);
                                            break;
                                        default:
                                            handleButtonClick(button);
                                    }
                                }}
                            >
                                {button}
                            </Button>
                        ))}
                        <Button onClick={() => setShowHistory(!showHistory)} className="history-toggle-button">
                            {showHistory ? <BiChevronDown /> : <FaHistory />}
                        </Button>
                </div>
            )}

            {showHistory && (
                <div className="history">
                    {history.length ? (
                        history.map((entry, index) => (
                            <div key={index} className="history-entry">
                                {entry}
                            </div>
                        ))
                    ) : (
                        <div className="no-history">No history available.</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Calculator;
