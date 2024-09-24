import React from 'react';
import Header from './com/header';
import Footer from './com/footer';

const schedulerlayout = ({ children }) => (
  <div>
    <Header />
    {children}
    <Footer />
  </div>
);

export default schedulerlayout;




