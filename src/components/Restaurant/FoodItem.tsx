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
import { fetchFoodItem, deleteitem } from '../../actions/RestaurantAction'; 
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { useNavigate } from 'react-router-dom';

interface Column {
  id: 'name' | 'description' | 'price' | 'quantity' | 'image' | 'action';
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Name', minWidth: 150, align: 'left' },
  { id: 'description', label: 'Description', minWidth: 250, align: 'left' },
  { id: 'price', label: 'Price', minWidth: 100, align: 'right' },
  { id: 'quantity', label: 'Quantity', minWidth: 100, align: 'right' },
  { id: 'image', label: 'Image', minWidth: 150, align: 'center' },
  { id: 'action', label: 'Action', minWidth: 150, align: 'center' },
];

interface FoodItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string; // Base64 or URL string for the image
}

export default function FoodItemTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { foodItem ,restaurant} = useSelector((state: RootState) => state.restaurant);
console.log(restaurant,"resttt")
  React.useEffect(() => {
    const restaurantid=localStorage.getItem('restaurantid')
    dispatch(fetchFoodItem(restaurantid));
  }, [dispatch]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleAddFoodItemClick = () => {
    navigate('/addfooditem'); 
  };

  const handleRemoveFoodItem = (id: string) => {
    dispatch(deleteitem(id)); 
    window.location.reload();
  };

  const handleEditFoodItem = (id: string) => {
    navigate(`/editfooditem/${id}`);
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
              {foodItem
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((foodItem: FoodItem) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={foodItem._id}>
                    {columns.map((column) => {
                      if (column.id === 'action') {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => handleEditFoodItem(foodItem._id)}
                              style={{ marginRight: '10px' }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() => handleRemoveFoodItem(foodItem._id)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        );
                      } else if (column.id === 'image') {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <img
                              src={`data:image/jpeg;base64,${foodItem.image}`}
                              alt={foodItem.name}
                              style={{ width: '100px', height: 'auto' }}
                            />
                          </TableCell>
                        );
                      }
                      const value = foodItem[column.id as keyof FoodItem];
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
          count={foodItem.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
          <Button variant="contained" color="primary" onClick={handleAddFoodItemClick}>
            Add Food Item
          </Button>
        </div>
      </Paper>
    </MainLayout>
  );
}
