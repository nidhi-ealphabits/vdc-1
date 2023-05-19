import React from 'react';
import { MDBDataTable } from 'mdbreact';
import './table.css'
// import { toBeRequired } from '@testing-library/jest-dom/dist/matchers';

const DatatablePage = () => {
  const data = {
    columns: [
      {
        label: 'No',
        field: 'name',
        noSort: true // disable sorting for this column
        
      },
      {
        label: 'Student Name',
        field: 'position',
        noSort: true // disable sorting for this column

      },
      {
        label: 'Happy',
        field: 'office',
        noSort: true // disable sorting for this column

      },
      {
        label: 'Neutral',
        field: 'age',
        noSort: true // disable sorting for this column

      },
      {
        label: 'Average',
        field: 'date',
        noSort: true // disable sorting for this column

      },
      {
        label: 'Bad',
        field: 'salary',
        noSort: true // disable sorting for this column

      }
    ],
    rows: [
      {
        name: '1',
        position: 'Palash Siyal',
        office: '50%',
        age: '30%',
        date: '15%',
        salary: '5%'
      },
      {
        name: '2',
        position: 'Nidhi Patel',
        office: '50%',
        age: '30%',
        date: '15%',
        salary: '5%'
      },
      {
        name: '3',
        position: 'Mahendra Rajput',
        office: '50%',
        age: '30%',
        date: '15%',
        salary: '5%'
      },
      {
        name: '4',
        position: 'Aneri Panchal',
        office: '50%',
        age: '30%',
        date: '15%',
        salary: '5%'
      },
      {
        name: '5',
        position: 'Avinash Kumar',
        office: '50%',
        age: '30%',
        date: '15%',
        salary: '5%'
      },
      {
        name: '6',
        position: 'Abhishek Majhi',
        office: '50%',
        age: '30%',
        date: '15%',
        salary: '5%'
      },
      {
        name: '7',
        position: 'Harsh Chauhan',
        office: '50%',
        age: '30%',
        date: '15%',
        salary: '5%'
      },
      {
        name: '8',
        position: 'Dilip Joshi',
        office: '50%',
        age: '30%',
        date: '15%',
        salary: '5%'
      },
      {
        name: '9',
        position: 'Virat Kohli',
        office: '50%',
        age: '30%',
        date: '15%',
        salary: '5%'
      },
      {
        name: '10',
        position: 'Yuvraj Singh',
        office: '50%',
        age: '30%',
        date: '15%',
        salary: '5%'
      },
      {
        name: '11',
        position: 'Rahul Dravid',
        office: '50%',
        age: '30%',
        date: '15%',
        salary: '5%'
      },
      {
        name: '12',
        position: 'Sachin Tendulkar',
        office: '50%',
        age: '30%',
        date: '15%',
        salary: '5%'
      },
      {
        name: '13',
        position: 'Viv Richards',
        office: '50%',
        age: '30%',
        date: '15%',
        salary: '5%'
      },
      {
        name: '14',
        position: 'Ricky Ponting',
        office: '50%',
        age: '30%',
        date: '15%',
        salary: '5%'
      },
      {
        name: '15',
        position: 'Brain Lara',
        office: '50%',
        age: '30%',
        date: '15%',
        salary: '5%'
      },
      {
        name: '1',
        position: 'Marketing Designer',
        office: '50%',
        age: '30%',
        date: '15%',
        salary: '5%'
      },
      {
        name: '1',
        position: 'Chief Financial Officer (CFO)',
        office: '50%',
        age: '30%',
        date: '15%',
        salary: '5%'
      },
      {
        name: '1',
        position: 'Systems Administrator',
        office: '50%',
        age: '30%',
        date: '15%',
        salary: '5%'
      },
      {
        name: '1',
        position: 'Software Engineer',
        office: '50%',
        age: '30%',
        date: '15%',
        salary: '5%'
      },
      {
        name: '1',
        position: 'Personnel Lead',
        office: '50%',
        age: '30%',
        date: '15%',
        salary: '5%'
      },
      {
        name: '1',
        position: 'Development Lead',
        office: '50%',
        age: '30%',
        date: '15%',
        salary: '5%'
      },
      {
        name: '1',
        position: 'Chief Marketing Officer (CMO)',
        office: '50%',
        age: '30%',
        date: '15%',
        salary: '5%'
      },
      {
        name: '1',
        position: 'Pre-Sales Support',
        office: '50%',
        age: '30%',
        date: '15%',
        salary: '5%'
      },
      {
        name: '1',
        position: 'Sales Assistant',
        office: '50%',
        age: '30%',
        date: '15%',
        salary: '5%'
      },
      {
        name: '1',
        position: 'Chief Executive Officer (CEO)',
        office: '50%',
        age: '30%',
        date: '15%',
        salary: '5%'
      },
      {
        name: '1',
        position: 'Developer',
        office: '50%',
        age: '30%',
        date: '15%',
        salary: '5%'
      },
      {
        name: '1',
        position: 'Regional Director',
        office: '50%',
        age: '30%',
        date: '15%',
        salary: '5%'
      },
      {
        name: '1',
        position: 'Software Engineer',
        office: '50%',
        age: '30%',
        date: '15%',
        salary: '5%'
      },
      {
        name: '1',
        position: 'Chief Operating Officer (COO)',
        office: '50%',
        age: '30%',
        date: '15%',
        salary: '5%'
      },
      {
        name: '1',
        position: 'Regional Marketing',
        office: '50%',
        age: '30%',
        date: '15%',
        salary: '5%'
      },
      {
        name: '1',
        position: 'Integration Specialist',
        office: '50%',
        age: '30%',
        date: '15%',
        salary: '5%'
      },
      {
        name: '1',
        position: 'Developer',
        office: '50%',
        age: '30%',
        date: '15%',
        salary: '5%'
      },
      {
        name: '1',
        position: 'Technical Author',
        office: '50%',
        age: '30%',
        date: '15%',
        salary: '5%'
      },
      {
        name: '1',
        position: 'Team Leader',
        office: '50%',
        age: '30%',
        date: '15%',
        salary: '5%'
      },
      {
        name: '1',
        position: 'Post-Sales support',
        office: '50%',
        age: '30%',
        date: '15%',
        salary: '5%'
      },
      {
        name: '1',
        position: 'Marketing Designer',
        office: '50%',
        age: '30%',
        date: '15%',
        salary: '5%'
      },
      {
        name: '1',
        position: 'Office Manager',
        office: '50%',
        age: '30%',
        date: '15%',
        salary: '5%'
      },
      {
        name: '1',
        position: 'Secretary',
        office: '50%',
        age: '30%',
        date: '15%',
        salary: '5%'
      },
      {
        name: '1',
        position: 'Financial Controller',
        office: '50%',
        age: '30%',
        date: '15%',
        salary: '5%'
      },
      {
        name: '1',
        position: 'Office Manager',
        office: '50%',
        age: '30%',
        date: '15%',
        salary: '5%'
      },
      {
        name: '1',
        position: 'Director',
        office: '50%',
        age: '30%',
        date: '15%',
        salary: '5%'
      },
      {
        name: '1',
        position: 'Support Engineer',
        office: '50%',
        age: '30%',
        date: '15%',
        salary: '5%'
      },
      {
        name: '1',
        position: 'Software Engineer',
        office: '50%',
        age: '30%',
        date: '15%',
        salary: '5%'
      },
      {
        name: '1',
        position: 'Support Engineer',
        office: '50%',
        age: '30%',
        date: '15%',
        salary: '5%'
      },
      {
        name: '1',
        position: 'Developer',
        office: '50%',
        age: '30%',
        date: '15%',
        salary: '5%'
      },
      {
        name: '1',
        position: 'Support Engineer',
        office: '50%',
        age: '30%',
        date: '15%',
        salary: '5%'
      },
      {
        name: '1',
        position: 'Data Coordinator',
        office: '50%',
        age: '30%',
        date: '15%',
        salary: '5%'
      },
      {
        name: '1',
        position: 'Software Engineer',
        office: '50%',
        age: '30%',
        date: '15%',
        salary: '5%'
      },
      {
        name: '1',
        position: 'Software Engineer',
        office: '50%',
        age: '30%',
        date: '15%',
        salary: '5%'
      },
      {
        name: '1',
        position: 'Junior Javascript Developer',
        office: '50%',
        age: '30%',
        date: '15%',
        salary: '5%'
      },
      {
        name: '1',
        position: 'Sales Assistant',
        office: '50%',
        age: '30%',
        date: '15%',
        salary: '5%'
      },
      {
        name: '1',
        position: 'Regional Director',
        office: '50%',
        age: '30%',
        date: '15%',
        salary: '5%'
      },
      {
        name: '1',
        position: 'Systems Administrator',
        office: '50%',
        age: '30%',
        date: '15%',
        salary: '5%'
      },
      {
        name: '1',
        position: 'Developer',
        office: '50%',
        age: '30%',
        date: '15%',
        salary: '5%'
      },
      {
        name: '1',
        position: 'Regional Director',
        office: '50%',
        age: '30%',
        date: '15%',
        salary: '5%'
      },
      {
        name: '1',
        position: 'Javascript Developer',
        office: '50%',
        age: '30%',
        date: '15%',
        salary: '5%'
      },
      {
        name: '1',
        position: 'Customer Support',
        office: '50%',
        age: '30%',
        date: '15%',
        salary: '5%'
      }
    ]
  };
  
  // const options = {
  //   searchLabel: 'Search', // change the search placeholder from right to left
  // };

  return (
    <>
    <div className='mdb-table hide-sort-icons'> 
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
}

export default DatatablePage;