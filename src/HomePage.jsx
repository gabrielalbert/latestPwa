import React, { useState } from "react";
import "./App.css";
import NavBar from "./component/navBar";
import MainDashboard from "./component/mainDashboard";
import SideBar from "./component/sidebar";
import Footer from "./component/footer";
import Offerings from "./component/offerings";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function HomePages() {
  const [active, setActive] = useState("Dashboard");
  const [userName, setUserName] = useState("Gabriel");
  return (
    <div
      className="f-flex flex-column min-vh-100"
      style={{ backgroundColor: "#EAEAEA" }}
    >
      <NavBar />
      <div className="d-flex dashboardPage">
        <SideBar setActive={setActive} active={active} userName={userName} />
        <Container fluid className="overflow-auto">
          <Row>
            <Col>
              <MainDashboard active={active} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Offerings />
            </Col>
          </Row>
        </Container>
      </div>

      {/* <Footer /> */}
    </div>
  );
}

export default HomePages;
