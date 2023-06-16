import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import "./analyties.css";
import DatatablePage from "./DatatablePage";
import { Chart } from "react-google-charts";
import Header from "../Header/Header";
import Bottombar1 from "../Bottombar/Bottombar1";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const data = [
  ["Emotions", "percentage"],
  ["Happy", 44],
  ["Average", 33],
  ["Neutral", 26],
  ["Bad", 22],
];

const options = {
  sliceVisibilityThreshold: 0, // 20%
  legend: {
    position: "none",
    alignment: "center",
    textStyle: {
      // fontSize:14,
      // bold: true,
      fontFamily: "Poppins",
    },
    maxLines: 2,
  },

  colors: ["#CD298E", "#187DF1", "#4153DE", "#FFAF43"],
};

function Analyties() {
  const [responseData, setResponseData] = useState();
  const sessionId = sessionStorage.getItem("session_id");
  useEffect(() => {
    fetch(`http://localhost:8000/emotions/${sessionId}`)
    // fetch(`https://15.206.231.201/emotions/${sessionId}`)

      .then((response) => response.json())
      .then((data) => {
        setResponseData(data);
      })
      .catch((error) => {
        console.error("error in the analytics",error);
      });
  });

  return (
    <>
      <div>
        <div className="parent">
          <Header />
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Item className="left">
                  <Typography className="call">Call Status</Typography>
                  <div className="buttons">
                    <div className="blue-button">Pie Chart</div>
                    <div className="grey-button">Bar Chart</div>
                  </div>
                  <div className="pie-chart">
                    <Chart
                      chartType="PieChart"
                      data={data}
                      options={options}
                      width={"100%"}
                      height={"100%"}
                      // legend
                    />
                    <div>
                      <div className="legend">
                        <div className="first-div">
                          <ul>
                            <li className="first">Happy</li>
                            <li className="second">Average</li>
                          </ul>
                        </div>
                        <div className="second-div">
                          <ul>
                            <li className="third">Neutral</li>
                            <li className="fourth">Bad</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </Item>
              </Grid>
              <Grid item xs={12} md={8}>
                <Item className="right">
                  <DatatablePage response={responseData} />
                </Item>
              </Grid>
            </Grid>
          </Box>
        </div>
        <Bottombar1 />
      </div>
    </>
  );
}

export default Analyties;
