import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { toast } from 'react-toastify';
import { addFoodItem, fetchCategories, fetchCuisine } from '../../actions/RestaurantAction';
import MainLayout from './MainLayout';
import { ObjectId } from 'bson';

// Define interfaces for Category and Cuisine
interface Category {
  _id: string;
  name: string;
}

interface Cuisine {
  _id: string;
  name: string;
}

const AddFoodItem: React.FC = () => {
  const [foodName, setFoodName] = useState<string>('');
  const [foodImage, setFoodImage] = useState<File | null>(null);
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedCuisine, setSelectedCuisine] = useState<string>('');
  const [selectedFoodType, setSelectedFoodType] = useState<string>('');
  const [restaurantid, setRestaurantid] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const restid = localStorage.getItem('restaurantid');
    if (restid) {
      try {
        const objectId = new ObjectId(restid); // Convert to ObjectId
        setRestaurantid(objectId.toHexString()); // Convert to 24-character hexadecimal string
      } catch (error) {
        console.error("Invalid ObjectId string", error);
      }
    }
  }, []);

  const dispatch = useDispatch();
  const { category, cuisine, isAuthenticated, loading, error } = useSelector(
    (state: RootState) => state.restaurant
  );

  useEffect(() => {
    dispatch(fetchCategories() as any);
    dispatch(fetchCuisine() as any);
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Food item added successfully!");
      setFoodName('');
      setFoodImage(null);
      setPrice(0);
      setQuantity(1);
      setSelectedCategory('');
      setSelectedCuisine('');
      setSelectedFoodType("")
      window.location.href = '/restauranthome';
    }
    if (error) {
      toast.error("Failed to add food item. Please try again.");
    }
  }, [dispatch, isAuthenticated, error]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFoodImage(e.target.files[0]);
    }
  };

  const handleAddFoodItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation checks
    if (foodName.trim() === '') {
      toast.error('Food name is required.');
      return;
    }

    if (price <= 0) {
      toast.error('Price must be greater than 0.');
      return;
    }

    if (quantity <= 0) {
      toast.error('Quantity must be at least 1.');
      return;
    }

    if (selectedCategory === '') {
      toast.error('Please select a category.');
      return;
    }

    if (selectedCuisine === '') {
      toast.error('Please select a cuisine.');
      return;
    }

    if (selectedFoodType === "") { // Validate Veg/Non-Veg selection
      toast.error('Please select veg or non veg');
    }

    if (!foodImage) {
      toast.error('Please select an image for the food item.');
      return;
    }

    const formData = new FormData();
    formData.append('name', foodName);
    formData.append('price', price.toString());
    formData.append('quantity', quantity.toString());
    formData.append('category', selectedCategory);
    formData.append('cuisine', selectedCuisine);
    formData.append('image', foodImage);
    formData.append('restaurantid', restaurantid);
    formData.append('foodType', selectedFoodType); 
    dispatch(addFoodItem(formData) as any);
  };

  return (
    <MainLayout>
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={handleAddFoodItem}>
            <h1 className="mb-3">Add New Food Item</h1>

            <div className="form-group">
              <label htmlFor="food_name_field">Food Name</label>
              <input
                type="text"
                id="food_name_field"
                className="form-control"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="price_field">Price</label>
              <input
                type="number"
                id="price_field"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="quantity_field">Quantity</label>
              <input
                type="number"
                id="quantity_field"
                className="form-control"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category_field">Category</label>
              <select
                id="category_field"
                className="form-control"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                {category.map((catagory: Category) => (
                  <option key={catagory._id} value={catagory._id}>
                    {catagory.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="cuisine_field">Cuisine</label>
              <select
                id="cuisine_field"
                className="form-control"
                value={selectedCuisine}
                onChange={(e) => setSelectedCuisine(e.target.value)}
                required
              >
                <option value="">Select Cuisine</option>
                {cuisine.map((cuisine: Cuisine) => (
                  <option key={cuisine._id} value={cuisine._id}>
                    {cuisine.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Veg/Non-Veg Dropdown */}
            <div className="form-group">
              <label htmlFor="food_type_field">Veg/Non-Veg</label>
              <select
                id="food_type_field"
                className={`form-control ${errors.selectedFoodType ? 'is-invalid' : ''}`}
                value={selectedFoodType}
                onChange={(e) => setSelectedFoodType(e.target.value)}
                required
              >
                <option value="">Select Food Type</option>
                <option value="Veg">Veg</option>
                <option value="Non-Veg">Non-Veg</option>
              </select>
              {errors.selectedFoodType && <div className="invalid-feedback">{errors.selectedFoodType}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="food_image_field">Food Image</label>
              <input
                type="file"
                id="food_image_field"
                className="form-control"
                onChange={handleImageChange}
                name="image"
                required
              />
            </div>

            <button
              id="add_food_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Food Item'}
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default AddFoodItem;
