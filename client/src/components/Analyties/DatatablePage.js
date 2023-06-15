import React from "react";
import { MDBDataTable } from "mdbreact";
import "./table.css";

const DatatablePage = (props) => {
  const emotionResponse = props.response;

  if (!Array.isArray(emotionResponse)) {
    console.error("rawDevices is not an array");
    return []; // or throw new Error("rawDevices is not an array");
  }

  // Calculate the total count for each emotion
  let totalHappy = 0;
  let totalSad = 0;
  let totalSurprise = 0;
  let totalNeutral = 0;

  // let sumHappy = 0;
  // let sumSad = 0;
  // let sumSurprise = 0;
  // let sumNeutral = 0;

  // Iterate over each response to calculate the totals
  emotionResponse.forEach((response) => {
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

  // // Iterate over each response to calculate the sums
  // emotionResponse.forEach((response) => {
  //   sumHappy += response.emotions.Happy;
  //   sumSad += response.emotions.Sad;
  //   sumSurprise += response.emotions.Surprise;
  //   sumNeutral += response.emotions.Neutral;
  // });

  // const alltotalEmotion = emotionResponse.length;

  // // Calculate the overall average for each emotion
  // const allaverageHappy = (sumHappy / totalEmotion).toFixed(2);
  // const allaverageSad = (sumSad / totalEmotion).toFixed(2);
  // const allaverageSurprise = (sumSurprise / totalEmotion).toFixed(2);
  // const allaverageNeutral = (sumNeutral / totalEmotion).toFixed(2);

// console.log("all averageHappy",allaverageHappy,"all averageSad",allaverageSad,"all averageSurprise",allaverageSurprise,"all average Neutral",allaverageNeutral)

  const data = {
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
    // rows: emotionResponse.map((response, index) => ({
    //   name: index + 1,
    //   user_name: response.username,
    //   happy: response.emotions.Happy,
    //   sad: response.emotions.Sad,
    //   surprise: response.emotions.Surprise,
    //   neutral: response.emotions.Neutral,
    // })),
    rows: emotionResponse.map((response, index) => ({
      name: index + 1,
      user_name: response.username,
      happy: averageHappy + "%",
      sad: averageSad + "%",
      surprise: averageSurprise + "%",
      neutral: averageNeutral + "%",
    })),
  };

  // const options = {
  //   searchLabel: 'Search', // change the search placeholder from right to left
  // };

  return (
    <>
      <div className="mdb-table hide-sort-icons">
        <MDBDataTable
          noBottomColumns
          searching={true}
          data={data}
          sortable={false}
          responsive={true}
          entriesLabel="Show entries"
          autoWidth={false}
          entries={15}
          // autoWidth={true}
          // fixed={true}
          // scrollY={true}
          // scrollX={true}
        />
      </div>
    </>
  );
};

export default DatatablePage;
