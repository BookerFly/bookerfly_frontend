import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const AppNavbar = () => {
    return (
        <Navbar variant="dark" expand="md" className="navbar-parent">
            <Container className="navbar-container">
                <Navbar.Brand href="/">Bookerfly</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                {/* <Navbar.Collapse id="basic-navbar-nav"> */}
                <Nav className="me-auto">
                    <Nav.Link href="/checkOutRecord">借閱紀錄</Nav.Link>
                </Nav>
                <Nav className="me-auto">
                    <Nav.Link href="/bookManagement">管理書籍</Nav.Link>
                </Nav>
                {/* </Navbar.Collapse> */}
            </Container>
        </Navbar>
    )
}

export default AppNavbar;