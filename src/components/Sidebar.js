import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalculatorFilled, DiffFilled, HomeFilled } from '@ant-design/icons';
import { Menu } from 'antd';

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
  const navigate = useNavigate();

  const onClick = (e) => {
    setCurrent(e.key);
    if (e.key === 'calculator') {
      navigate('/calculator');
    } else if (e.key === 'home') {
      navigate('/');
    }
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="vertical"
      items={items}
      style={{ width: 256, height: '100vh', position: 'fixed', top: 0, left: 0 }}
    />
  );
};

export default Sidebar;
