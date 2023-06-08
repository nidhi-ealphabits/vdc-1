import React from "react";
import { MDBDataTable } from "mdbreact";
import "./table.css";
// import { toBeRequired } from '@testing-library/jest-dom/dist/matchers';

const DatatablePage = (props) => {
  const emotionResponse=props.response;

  // if (!Array.isArray(emotionResponse)) {
  //   console.error("rawDevices is not an array");
  //   return []; // or throw new Error("rawDevices is not an array");
  // }


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
    rows: emotionResponse.map((response, index) => ({
      name: index + 1,
      user_name: response.username,
      happy: response.emotions.Happy,
      sad: response.emotions.Sad,
      surprise: response.emotions.Surprise,
      neutral: response.emotions.Neutral,
    })),
    // rows: [
    //   {
    //     name: "1",
    //     user_name: "Palash Siyal",
    //     happy: "50%",
    //     sad: "30%",
    //     surprise: "15%",
    //     neutral: "5%",
    //   },
    //   {
    //     name: "2",
    //     user_name: "Nidhi Patel",
    //     happy: "50%",
    //     sad: "30%",
    //     surprise: "15%",
    //     neutral: "5%",
    //   },
    //   {
    //     name: "3",
    //     user_name: "Mahendra Rajput",
    //     happy: "50%",
    //     sad: "30%",
    //     surprise: "15%",
    //     neutral: "5%",
    //   },
    //   {
    //     name: "4",
    //     user_name: "Aneri Panchal",
    //     happy: "50%",
    //     sad: "30%",
    //     surprise: "15%",
    //     neutral: "5%",
    //   },
    //   {
    //     name: "5",
    //     user_name: "Avinash Kumar",
    //     happy: "50%",
    //     sad: "30%",
    //     surprise: "15%",
    //     neutral: "5%",
    //   },
    //   {
    //     name: "6",
    //     user_name: "Abhishek Majhi",
    //     happy: "50%",
    //     sad: "30%",
    //     surprise: "15%",
    //     neutral: "5%",
    //   },
    //   {
    //     name: "7",
    //     user_name: "Harsh Chauhan",
    //     happy: "50%",
    //     sad: "30%",
    //     surprise: "15%",
    //     neutral: "5%",
    //   },
    //   {
    //     name: "8",
    //     user_name: "Dilip Joshi",
    //     happy: "50%",
    //     sad: "30%",
    //     surprise: "15%",
    //     neutral: "5%",
    //   }
    // ],
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
