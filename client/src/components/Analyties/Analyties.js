import React from "react";
import { Col, Row } from "react-bootstrap";
import { PieChart } from "react-minimal-pie-chart";
import "./analyties.css";
import Logo from "../../assests/Logo.png";
import DatatablePage from "./DatatablePage";

function Analyties() {
  const dataMock = [
    { title: "One", value: 10, color: "#E38627" },
    { title: "Two", value: 15, color: "#C13C37" },
    { title: "Three", value: 20, color: "#6A2135" },
  ];

  const defaultLabelStyle = {
    fontSize: "5px",
    fontFamily: "sans-serif",
  };
  return (
    <div className="container">
      <Row className="analyties-header mt-3">
        <Col className="logo-container">
          <img className="sgvp-logo" src={Logo} alt="d"></img>
        </Col>
        <Col className="mt-3">
          <div className="analyties-text">Team Meeting</div>
        </Col>
      </Row>
      <Row className="analyties-content mt-3" >
        <Col className="col-md-4 chart-container">
          <div className="pie-chart">
            <PieChart
              data={dataMock}
              label={({ dataEntry }) => Math.round(dataEntry.percentage) + "%"}
              labelStyle={defaultLabelStyle}
            />
          </div>
        </Col>
        <Col className="col-md-8 list-container">
          <div className="analyties-table"><DatatablePage responsive/></div>
        
        </Col>
      </Row>
    </div>
  );
}

export default Analyties;