import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const AppNavbar = ({isAuthed}) => {
    const isBorrower = () => sessionStorage.getItem("role")==="user"
    const isManager = () => sessionStorage.getItem("role")==="manager"

    return (
        <Navbar variant="dark" expand="md" className="navbar-parent">
            <Container className="navbar-container">
            <React.Fragment>
                <Navbar.Brand href="/">Bookerfly</Navbar.Brand>
                <Nav className="me-auto" hidden={!isAuthed || isManager()}>
                    <Nav.Link href="/checkOutRecord">借閱紀錄</Nav.Link>
                </Nav>
                <Nav className="me-auto" hidden={!isAuthed || isBorrower()}>
                    <Nav.Link href="/bookManagement">管理書籍</Nav.Link>
                </Nav> 
            </React.Fragment>
            </Container>
        </Navbar>
    )
}

export default AppNavbar;