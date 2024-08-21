import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout} from 'antd';
import Sidebar from './components/Sidebar';
import Calculator from './components/Calculator';
import Budget from './components/home'; 
import './App.css'; 
// import logo from './assets/images/calculator.png';

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Router>
      <Layout className="app-layout">
        <Sidebar />
        <Layout className="main-layout">
          <Header className="site-header">
            <div className="logo">
              {/* <img src={logo} alt="Logo" /> */}
              <p>Header Page</p>
            </div>
          </Header>
          <Content className="site-content">
            <Routes>
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/" element={<Budget />} />
            </Routes>
          </Content>
          <Footer className="site-footer">
            Thanh Nga ©{new Date().getFullYear()} Calculator
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
