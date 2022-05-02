import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const AppNavbar = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="md">
            <Container className="navbar-container">
                <Navbar.Brand href="/">Bookerfly</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                {/* <Navbar.Collapse id="basic-navbar-nav"> */}
                <Nav className="me-auto">
                    <Nav.Link href="/checkOutRecord">checkOutRecord</Nav.Link>
                </Nav>
                {/* </Navbar.Collapse> */}
            </Container>
        </Navbar>
    )
}

export default AppNavbar;