import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Calculator from './components/Calculator';
import { Layout } from 'antd';
import './App.css'; 

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Router>
      <Layout className="app-layout">
        <Sidebar />
        <Layout className="main-layout">
          <Header className="site-header">
            <div className="header-content">Header Content</div>
          </Header>
          <Content className="site-content">
            <Routes>
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/" element={<h1>Home Page</h1>} />
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
