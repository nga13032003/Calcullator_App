import React, { useState, useEffect } from 'react';
import { Table, Input, Popover, Button } from 'antd';

const defaultMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const BudgetBuilder = () => {
    const [data, setData] = useState([]);
    const [focusedCell, setFocusedCell] = useState({ row: 0, col: 0 });

    // Khởi tạo dữ liệu ban đầu
    useEffect(() => {
        const initialData = [
            { category: 'Income', values: Array(12).fill(0) },
            { category: 'Expenses', values: Array(12).fill(0) },
            { category: 'Profit/Loss', values: Array(12).fill(0) }
        ];
        setData(initialData);
    }, []);

    // Hàm xử lý di chuyển và cập nhật giá trị
    const handleKeyDown = (e, rowIndex, colIndex) => {
        const newData = [...data];
        let { key } = e;

        if (key === 'Enter' || key === 'Tab') {
            e.preventDefault();
            if (colIndex < defaultMonths.length - 1) {
                setFocusedCell({ row: rowIndex, col: colIndex + 1 });
            } else if (rowIndex < data.length - 1) {
                setFocusedCell({ row: rowIndex + 1, col: 0 });
            }
        } else if (key === 'ArrowUp' && rowIndex > 0) {
            setFocusedCell({ row: rowIndex - 1, col: colIndex });
        } else if (key === 'ArrowDown' && rowIndex < data.length - 1) {
            setFocusedCell({ row: rowIndex + 1, col: colIndex });
        } else if (key === 'ArrowLeft' && colIndex > 0) {
            setFocusedCell({ row: rowIndex, col: colIndex - 1 });
        } else if (key === 'ArrowRight' && colIndex < defaultMonths.length - 1) {
            setFocusedCell({ row: rowIndex, col: colIndex + 1 });
        } else {
            newData[rowIndex].values[colIndex] = parseInt(e.key, 10) || 0;
            setData(newData);
            calculateProfitLoss(newData);
        }
    };

    // Hàm tính toán lợi nhuận/lỗ
    const calculateProfitLoss = (updatedData) => {
        const newData = updatedData.map((row, rowIndex) => {
            if (row.category === 'Profit/Loss') {
                row.values = row.values.map((val, colIndex) => {
                    const income = updatedData.find(r => r.category === 'Income').values[colIndex];
                    const expenses = updatedData.find(r => r.category === 'Expenses').values[colIndex];
                    return income - expenses;
                });
            }
            return row;
        });
        setData(newData);
    };

    // Hàm cập nhật giá trị ô
    const handleCellChange = (e, rowIndex, colIndex) => {
        const newData = [...data];
        newData[rowIndex].values[colIndex] = parseFloat(e.target.value) || 0;
        setData(newData);
        calculateProfitLoss(newData);
    };

    // Hàm xóa dòng
    const deleteRow = (rowIndex) => {
        const newData = [...data];
        newData.splice(rowIndex, 1);
        setData(newData);
    };

    // Hàm áp dụng giá trị cho tất cả các ô trong cùng một hàng
    const applyToAll = (rowIndex, colIndex) => {
        const value = data[rowIndex].values[colIndex];
        const newData = [...data];
        newData[rowIndex].values = newData[rowIndex].values.map(() => value);
        setData(newData);
        calculateProfitLoss(newData);
    };

    // Cột của bảng
    const columns = [
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: (text, record, rowIndex) => (
                <div>
                    {text} {['Income', 'Expenses'].includes(text) && (
                        <Button type="link" danger onClick={() => deleteRow(rowIndex)}>Delete</Button>
                    )}
                </div>
            ),
        },
        ...defaultMonths.map((month, colIndex) => ({
            title: month,
            dataIndex: `month-${colIndex}`,
            key: `month-${colIndex}`,
            render: (text, record, rowIndex) => {
                const isFocused = focusedCell.row === rowIndex && focusedCell.col === colIndex;
                return (
                    <Popover
                        content={<Button onClick={() => applyToAll(rowIndex, colIndex)}>Apply to all</Button>}
                        trigger="contextMenu"
                    >
                        <Input
                            autoFocus={isFocused}
                            value={data[rowIndex].values[colIndex]}
                            onChange={(e) => handleCellChange(e, rowIndex, colIndex)}
                            onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
                        />
                    </Popover>
                );
            },
        }))
    ];

    return (
        <div>
            <Table
                columns={columns}
                dataSource={data.map((item, index) => ({ key: index, ...item }))}
                pagination={false}
            />
        </div>
    );
};

export default BudgetBuilder;
