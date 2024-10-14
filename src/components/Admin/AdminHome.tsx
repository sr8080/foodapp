import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import MainLayout from './MainLayout';


export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  

  return (
    <MainLayout>
   <div><h1>ADMIN HOME</h1></div>
    </MainLayout>
  );
}
