import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavbarBootstrap from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import './Navbar.css';


function Navbar() {
    return (
        <NavbarBootstrap expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <NavbarBootstrap.Brand as={NavLink} to="/">
                    <img
                        src="/assets/LogoN.svg"
                        alt="Logo"
                        className="navbar-brand-image d-inline-block align-text-top me-2"
                    />
                    GGames
                </NavbarBootstrap.Brand>
                <NavbarBootstrap.Toggle aria-controls="navbar-nav-content" />
                <NavbarBootstrap.Collapse id="navbar-nav-content">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/" end>
                            Home
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/MonthlyTop">Monthly top</Nav.Link>
                        <Nav.Link as={NavLink} to="/TopDevs">Top developers</Nav.Link>
                        <Nav.Link as={NavLink} to="/Calendar">Calendar</Nav.Link>
                    </Nav>
                </NavbarBootstrap.Collapse>
            </Container>
        </NavbarBootstrap>
    );
}

export default Navbar;
