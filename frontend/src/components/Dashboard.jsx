import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  {
    field: 'serialNo',
    headerName: 'S.No',
    width: 100,
    editable: false, // S.No is not editable
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 200,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 250,
    editable: true,
  },
  {
    field: 'phoneNumber',
    headerName: 'Phone Number',
    width: 180,
    editable: true,
  },
  {
    field: 'codeforcesHandle',
    headerName: 'Codeforces Handle',
    width: 180,
    editable: true,
  },
  {
    field: 'currentRating',
    headerName: 'Current Rating',
    type: 'number',
    width: 180,
    editable: false,
  },
  {
    field: 'maxRating',
    headerName: 'Max Rating',
    type: 'number',
    width: 180,
    editable: false,
  },
];

const rows = [
  { id: 1, serialNo: 1, codeforcesHandle: 'tourist', name: 'Tourist', email: 'tourist@example.com', phoneNumber: '+1-555-1001', currentRating: 3777, maxRating: 3800 },
  { id: 2, serialNo: 2, codeforcesHandle: 'jiangly', name: 'Jiangly', email: 'jiangly@example.com', phoneNumber: '+1-555-1002', currentRating: 3756, maxRating: 3800 },
  { id: 3, serialNo: 3, codeforcesHandle: 'orzdevinwang', name: 'Orzdevinwang', email: 'orzdevinwang@example.com', phoneNumber: '+1-555-1003', currentRating: 3696, maxRating: 3750 },
  { id: 4, serialNo: 4, codeforcesHandle: 'Kevin114514', name: 'Kevin114514', email: 'kevin114514@example.com', phoneNumber: '+1-555-1004', currentRating: 3647, maxRating: 3700 },
  { id: 5, serialNo: 5, codeforcesHandle: 'Radewoosh', name: 'Radewoosh', email: 'radewoosh@example.com', phoneNumber: '+1-555-1005', currentRating: 3631, maxRating: 3650 },
  { id: 6, serialNo: 6, codeforcesHandle: 'ksun48', name: 'Ksun48', email: 'ksun48@example.com', phoneNumber: '+1-555-1006', currentRating: 3574, maxRating: 3600 },
  { id: 7, serialNo: 7, codeforcesHandle: 'maroonrk', name: 'Maroonrk', email: 'maroonrk@example.com', phoneNumber: '+1-555-1007', currentRating: 3565, maxRating: 3600 },
  { id: 8, serialNo: 8, codeforcesHandle: 'Benq', name: 'Benq', email: 'benq@example.com', phoneNumber: '+1-555-1008', currentRating: 3527, maxRating: 3550 },
  { id: 9, serialNo: 9, codeforcesHandle: 'ecnerwala', name: 'Ecnerwala', email: 'ecnerwala@example.com', phoneNumber: '+1-555-1009', currentRating: 3526, maxRating: 3550 },
  { id: 10, serialNo: 10, codeforcesHandle: 'Um_nik', name: 'Um Nik', email: 'um_nik@example.com', phoneNumber: '+1-555-1010', currentRating: 3400, maxRating: 3500 }
];


const Dashboard = () => {
  return (
    <Box sx={{ height: 526, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 8,
            },
          },
        }}
        pageSizeOptions={[8]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default Dashboard;
