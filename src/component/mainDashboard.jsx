import React, { useEffect, useRef, useState } from "react";
import config from "../config"; // Adjust the path as necessary
import "../App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function MainDashboard({ active }) {
  //const backgroundImage= 'url(/dashboard4.jpg)'
  const [listing, setListing] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${config.apiBaseUrl}promptengineering/dashboard`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        const result = await response.json();
        console.log("Input fetching data:", result);
        const zeroShot = JSON.stringify(result.zeroShot);
        const oneShot = JSON.stringify(result.oneShot);
        const iterativeShot = JSON.stringify(result.iterativeShot);

        const data = {
          zeroShot,
          oneShot,
          iterativeShot,
        };
        setListing([...listing, data]);
      } catch (e) {
        const zeroShot = "0";
        const oneShot = "0";
        const iterativeShot = "0";

        const data = {
          zeroShot,
          oneShot,
          iterativeShot,
        };
        setListing([...listing, data]);
        console.log("Error:", e);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4" style={styles.image}>
      <div className="row">
        {listing.map((item) => (
          <div className="col-md-12">
            <Container>
              <Row style={{ marginTop: "150px" }}>
                <Col>
                  <p style={{ marginBottom: "0px" }}>
                    <strong className="counter">
                      {item.zeroShot.replace(/"/g, "")}
                    </strong>
                  </p>
                  <strong>Zero Shot Responses</strong>
                </Col>
                <Col>
                  <p style={{ marginBottom: "0px" }}>
                    <strong className="counter">
                      {item.oneShot.replace(/"/g, "")}
                    </strong>
                  </p>
                  <strong>One Shot Responses</strong>
                </Col>
                <Col>
                  <p style={{ marginBottom: "0px" }}>
                    <strong className="counter">
                      {item.iterativeShot.replace(/"/g, "")}
                    </strong>
                  </p>
                  <strong>iterative Shot Responses</strong>
                </Col>
              </Row>
            </Container>
          </div>
        ))}
      </div>
    </div>
  );
}
const styles = {
  image: {
    backgroundImage: "url(/dashboard.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    minHeight: "50vh",
    marginTop: "10px",
  },
};
export default MainDashboard;
