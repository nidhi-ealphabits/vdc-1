import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import "./analyties.css";
import { MDBDataTable } from "mdbreact";
import "./table.css";
import { Chart } from "react-google-charts";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const options = {
  sliceVisibilityThreshold: 0, // 20%
  legend: {
    position: "none",
    alignment: "center",
    textStyle: {
      fontFamily: "Poppins",
    },
    maxLines: 2,
  },

  colors: ["#CD298E", "#187DF1", "#4153DE", "#FFAF43"],
};

function Analyties() {
  const [responseData, setResponseData] = useState();
  const [activeTab, setActiveTab] = useState("pie");
  const sessionId = sessionStorage.getItem("session_id");
  useEffect(() => {
    // fetch(`http://localhost:8000/emotions/${sessionId}`)
    // fetch(`https://15.206.231.201:8000/emotions/${sessionId}`)
    // // fetch(`https://testwebapp.ealphabits.com:8000/emotions/${sessionId}`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setResponseData(data);
    //   })
    //   .catch((error) => {
    //     console.error("error in the analytics", error);
    //   });
  }, []);

  // //tableData
  if (!Array.isArray(responseData)) {
    // console.error("rawDevices is not an array");
    return []; // or throw new Error("rawDevices is not an array");
  }

  // Calculate the total count for each emotion
  let totalHappy = 0;
  let totalSad = 0;
  let totalSurprise = 0;
  let totalNeutral = 0;

  // Iterate over each response to calculate the totals
  responseData.forEach((response) => {
    totalHappy = response.emotions.Happy;
    totalSad = response.emotions.Sad;
    totalSurprise = response.emotions.Surprise;
    totalNeutral = response.emotions.Neutral;
  });

  let totalEmotion = totalHappy + totalNeutral + totalSad + totalSurprise;

  // Calculate the average for each emotion
  const averageHappy = Math.round((totalHappy / totalEmotion) * 100);
  const averageSad = Math.round((totalSad / totalEmotion) * 100);
  const averageSurprise = Math.round((totalSurprise / totalEmotion) * 100);
  const averageNeutral = Math.round((totalNeutral / totalEmotion) * 100);

  const tableData = {
    columns: [
      {
        label: "No",
        field: "name",
        noSort: true, // disable sorting for this column
      },
      {
        label: "Student Name",
        field: "user_name",
        noSort: true, // disable sorting for this column
      },
      {
        label: "Happy",
        field: "happy",
        noSort: true, // disable sorting for this column
      },
      {
        label: "Sad",
        field: "sad",
        noSort: true, // disable sorting for this column
      },
      {
        label: "Surprise",
        field: "surprise",
        noSort: true, // disable sorting for this column
      },
      {
        label: "Neutral",
        field: "neutral",
        noSort: true, // disable sorting for this column
      },
    ],

    rows: responseData.map((response, index) => ({
      name: index + 1,
      user_name: response.username,
      happy: averageHappy + "%",
      sad: averageSad + "%",
      surprise: averageSurprise + "%",
      neutral: averageNeutral + "%",
    })),
  };

  const rows = tableData.rows;

  let avgHappy = 0;
  let avgSurprise = 0;
  let avgNeutral = 10;
  let avgSad = 0;

  for (let i = 0; i < responseData.length; i++) {
    const emotions = responseData[i].emotions;
    avgHappy += emotions.Happy || 0;
    avgSad += emotions.Sad || 0;
    avgSurprise += emotions.Surprise || 0;
    avgNeutral += emotions.Neutral || 0;
  }

  avgHappy /= responseData.length;
  avgSad /= responseData.length;
  avgSurprise /= responseData.length;
  avgNeutral /= responseData.length;

  const data = [
    ["Emotions", "percentage"],
    ["Happy", avgHappy],
    ["Neutral", avgNeutral],
    ["Sad", avgSad],
    ["Surprise", avgSurprise],
  ];

  const chartData = [
    // ["Year", "Sales", "Expenses", "Profit"],
    // ["2014", 1000, 400, 200],
    // ["2015", 1170, 460, 250],
    // ["2016", 660, 1120, 300],
    // ["2017", 1030, 540, 350],
    ["call Analyties","Happy", "Sad", "Surprise", "neutral"],
    ["emotions",averageHappy, averageSad, averageSurprise, averageNeutral],
  ];
  
 const chartOptions = {
  title: "Call Analyties",
    legend: { position: "none" },
  };
  // Function to handle tab selection
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Function to render the corresponding chart based on the active tab
  const renderChart = () => {
    if (activeTab === "pie") {
     return (
         <div className="pie-chart">
        <Chart
          chartType="PieChart"
          data={data}
          options={options}
          width={"100%"}
          height={"100%"}
        />
        <div>
        <div className="legend">
          <div className="first-div">
            <ul>
              <li className="first">Happy</li>
              <li className="second">Surprise</li>
            </ul>
          </div>
          <div className="second-div">
            <ul>
              <li className="third">Neutral</li>
              <li className="fourth">Sad</li>
            </ul>
          </div>
        </div>
      </div>
      </div>
      );;
    } else if (activeTab === "bar") {
       return (
        <>
        <div className="bar-chart">
        <Chart
          chartType="Bar"
          data={chartData}
          options={chartOptions}
          width={"100%"}
          height={"100%"}
        />
        </div>
        </>
      );
    }
  };

  return (
    <>
      <div className="parent">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Item className="left">
                <Typography className="call">Call Status</Typography>
                <div className="buttons">
                  <div
                    className={`blue-button ${
                      activeTab === "pie" ? "active" : ""
                    }`}
                    onClick={() => handleTabClick("pie")}
                  >
                    Pie Chart
                  </div>
                  <div
                    className={`grey-button ${
                      activeTab === "bar" ? "active" : ""
                    }`}
                    onClick={() => handleTabClick("bar")}
                  >
                    Bar Chart
                  </div>
                </div>
              {renderChart()}
              </Item>
            </Grid>
            <Grid item xs={12} md={8}>
              <Item className="right">
                <div className="mdb-table hide-sort-icons">
                  <MDBDataTable
                    noBottomColumns
                    searching={true}
                    data={tableData}
                    sortable={false}
                    responsive={true}
                    entriesLabel="Show entries"
                    autoWidth={false}
                    entries={12}
                  />
                </div>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
}

export default Analyties;
