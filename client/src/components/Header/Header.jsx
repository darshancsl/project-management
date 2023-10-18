import React from "react";
import { Container } from "react-bootstrap";
import "./Header.css";

const Header = () => {
  return (
    <nav className='navbar bg-light p-4'>
      <Container>
        <a className='navbar-brand' href='/'>
          <div className='d-flex'>
            <p className='logo-heading fw-bold fs-4'>Project Management App</p>
          </div>
        </a>
      </Container>
    </nav>
  );
};

export default Header;
