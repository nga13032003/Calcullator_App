import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalculatorFilled, DiffFilled, HomeFilled, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Menu } from 'antd';
import '../assets/styles/Calculator.css'; // Import your CSS file

const items = [
  {
    label: 'Home',
    key: 'home',
    icon: <HomeFilled />,
  },
  {
    label: 'Calculator',
    key: 'calculator',
    icon: <CalculatorFilled />,
  },
  {
    label: 'Other',
    key: 'SubMenu',
    icon: <DiffFilled />,
    children: [
      {
        type: 'group',
        label: 'Item 1',
        children: [
          {
            label: 'Option 1',
            key: 'setting:1',
          },
          {
            label: 'Option 2',
            key: 'setting:2',
          },
        ],
      },
      {
        type: 'group',
        label: 'Item 2',
        children: [
          {
            label: 'Option 3',
            key: 'setting:3',
          },
          {
            label: 'Option 4',
            key: 'setting:4',
          },
        ],
      },
    ],
  },
];

const Sidebar = () => {
  const [current, setCurrent] = useState('home');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); 

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onClick = (e) => {
    setCurrent(e.key);
    if (e.key === 'calculator') {
      navigate('/calculator');
    } else if (e.key === 'home') {
      navigate('/');
    }
  };

  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div style={{ width: isCollapsed ? 80 : 256 }}>
      <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
        {isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="inline"
        inlineCollapsed={isCollapsed}
        items={items}
        className={`sidebar ${isCollapsed ? 'sidebar-collapsed' : ''}`}
      />
    </div>
  );
};

export default Sidebar;
