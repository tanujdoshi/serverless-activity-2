import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";

const Navigation = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">
          User Management
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Navigation;
