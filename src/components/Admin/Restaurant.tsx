import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import MainLayout from './MainLayout';
import { fetchRestaurants, blockUnblockRestaurant } from '../../actions/AdminAction';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { useNavigate } from 'react-router-dom';

interface Column {
  id: 'Image' | 'restaurantName' | 'address' | 'phoneNumber' | 'status' | 'reports' | 'action';
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
}

const columns: readonly Column[] = [
  { id: 'Image', label: 'Image', minWidth: 150, align: 'center' },
  { id: 'restaurantName', label: 'Restaurant Name', minWidth: 200, align: 'left' },
  { id: 'address', label: 'Address', minWidth: 250, align: 'left' },
  { id: 'phoneNumber', label: 'Phone Number', minWidth: 150, align: 'left' },
  { id: 'status', label: 'Status', minWidth: 100, align: 'center' },
  { id: 'reports', label: 'Reports', minWidth: 100, align: 'center' },  // Add reports column
  { id: 'action', label: 'Action', minWidth: 150, align: 'center' },
];

interface Restaurant {
  _id: string;
  restaurantName: string;
  address: string;
  phoneNumber: string;
  avatar: string;
  isBlocked: boolean;
  reports: { userId: string; reportDate: Date }[];  // Add reports array
}

export default function RestaurantTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate(); 

  const { restaurant } = useSelector((state: RootState) => state.admin);

  React.useEffect(() => {
    dispatch(fetchRestaurants());
  }, [dispatch]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleBlockUnblock = (restaurantId: string, isBlocked: boolean) => {
    const newStatus = !isBlocked; 
    dispatch(blockUnblockRestaurant(restaurantId, newStatus)); 
    window.location.reload();
  };

  const handleRegisterClick = () => {
    navigate('/restaurantregister'); 
  };

  return (
    <MainLayout>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurant
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((restaurant: Restaurant) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={restaurant._id}>
                    {columns.map((column) => {
                      if (column.id === 'action') {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <Button
                              variant="contained"
                              color={restaurant.isBlocked ? 'success' : 'error'}
                              onClick={() => handleBlockUnblock(restaurant._id, restaurant.isBlocked)}
                            >
                              {restaurant.isBlocked ? 'Unblock' : 'Block'}
                            </Button>
                          </TableCell>
                        );
                      }
                      if (column.id === 'Image') {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <img src={restaurant?.avatar} style={{ width: '75px', height: '75px' }} />
                          </TableCell>
                        );
                      }
                      if (column.id === 'reports') {
                        const reportCount = restaurant.reports.length;
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {reportCount} Report(s)
                          </TableCell>
                        );
                      }
                      
                      // Get the value to display in the table cell
                      const value = column.id === 'status' 
                        ? (restaurant.isBlocked ? 'Blocked' : 'Active') 
                        : restaurant[column.id as keyof Restaurant];

                      // Check if value is an array, and handle it
                      if (Array.isArray(value)) {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value.length} item(s)
                          </TableCell>
                        );
                      }

                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={restaurant.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <Button
            variant="contained"
            onClick={handleRegisterClick}
          >
            Register New Restaurant
          </Button>
        </div>
      </Paper>
    </MainLayout>
  );
}
