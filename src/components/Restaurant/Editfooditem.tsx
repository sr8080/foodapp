import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import MainLayout from './MainLayout';
import { ObjectId } from 'bson';

interface Category {
  _id: string;
  name: string;
}

interface Cuisine {
  _id: string;
  name: string;
}

const EditFoodItem: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get food item ID from URL
  const navigate = useNavigate();
  const [foodName, setFoodName] = useState<string>('');
  const [foodImage, setFoodImage] = useState<File | null>(null);
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedCuisine, setSelectedCuisine] = useState<string>('');
  const [restaurantid, setRestaurantid] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [cuisines, setCuisines] = useState<Cuisine[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const restid = localStorage.getItem('restaurantid');
    if (restid) {
      try {
        const objectId = new ObjectId(restid);
        setRestaurantid(objectId.toHexString());
      } catch (error) {
        console.error("Invalid ObjectId string", error);
      }
    }

    // Fetch the food item details by ID
    if (id) {
      fetchFoodItemById(id);
    }

    fetchCategories();
    fetchCuisines();
  }, [id]);

  const fetchFoodItemById = async (foodItemId: string) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/restaurant/fetchfoodItems/${foodItemId}`);
      const foodItem = response.data;
      setFoodName(foodItem.name);
      setPrice(foodItem.price);
      setQuantity(foodItem.quantity);
      setSelectedCategory(foodItem.category);
      setSelectedCuisine(foodItem.cuisine);
    } catch (error) {
      console.error("Failed to fetch food item:", error);
      toast.error("Failed to fetch food item. Please try again.");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/restaurant/categories');
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      toast.error("Failed to fetch categories. Please try again.");
    }
  };

  const fetchCuisines = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/restaurant/cuisine');
      setCuisines(response.data);
    } catch (error) {
      console.error("Failed to fetch cuisines:", error);
      toast.error("Failed to fetch cuisines. Please try again.");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFoodImage(e.target.files[0]);
    }
  };

  const handleUpdateFoodItem = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (foodName.trim() === "") {
      toast.error("Food name is required.");
      return;
    }

    if (price <= 0) {
      toast.error("Price must be greater than 0.");
      return;
    }

    if (quantity <= 0) {
      toast.error("Quantity must be at least 1.");
      return;
    }

    if (selectedCategory === "") {
      toast.error("Please select a category.");
      return;
    }

    if (selectedCuisine === "") {
      toast.error("Please select a cuisine.");
      return;
    }

    const formData = new FormData();
    formData.append('name', foodName);
    formData.append('price', price.toString());
    formData.append('quantity', quantity.toString());
    // formData.append('category', selectedCategory);
    // formData.append('cuisine', selectedCuisine);
    // if (foodImage) {
    //   formData.append('image', foodImage);
    // }
    formData.append('restaurantid', restaurantid);

    try {
      setLoading(true);
      console.log(formData,"ff")
      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
      const rep=await axios.put(`http://localhost:5000/api/restaurant/updatefoodItems/${id}`, formData);
      console.log(rep.data,"repo data")
    //   toast.success("Food item updated successfully!");
      navigate('/restauranthome');
    } catch (error) {
      console.error("Failed to update food item:", error);
      toast.error("Failed to update food item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={handleUpdateFoodItem}>
            <h1 className="mb-3">Edit Food Item</h1>

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
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
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
                {cuisines.map((cui) => (
                  <option key={cui._id} value={cui._id}>
                    {cui.name}
                  </option>
                ))}
              </select>
            </div>

            {/* <div className="form-group">
              <label htmlFor="food_image_field">Food Image</label>
              <input
                type="file"
                id="food_image_field"
                className="form-control"
                onChange={handleImageChange}
                name="image"
              />
            </div> */}

            <button
              id="update_food_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Food Item'}
            </button>

          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default EditFoodItem;
