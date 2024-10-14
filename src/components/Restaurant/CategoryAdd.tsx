import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../store';
import { addCategory } from "../../actions/categoryAction";
import { toast } from 'react-toastify';
import MainLayout from "./MainLayout";

const Category: React.FC = () => {
  const [categoryName, setCategoryName] = useState<string>("");
  const [categoryDescription, setCategoryDescription] = useState<string>("");
  const [categoryImage, setCategoryImage] = useState<File | null>(null);

  const dispatch = useDispatch();
  const { isAuthenticated, loading, error } = useSelector((state: RootState) => state.restaurant);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCategoryImage(e.target.files[0]);
    }
  };

  const handleAddCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

   
    if (!categoryName.trim()) {
      toast.error("Category name is required.");
      return;
    }

    if (categoryName.length < 3 || categoryName.length > 50) {
      toast.error("Category name must be between 3 and 50 characters.");
      return;
    }

    
    if (!categoryDescription.trim()) {
      toast.error("Category description is required.");
      return;
    }

    if (categoryDescription.length < 10 || categoryDescription.length > 200) {
      toast.error("Category description must be between 10 and 200 characters.");
      return;
    }

   
    if (!categoryImage) {
      toast.error("Please select an image for the category.");
      return;
    }

    const allowedFileTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedFileTypes.includes(categoryImage.type)) {
      toast.error("Only JPG, PNG, and GIF formats are allowed.");
      return;
    }

    if (categoryImage.size > 2 * 1024 * 1024) {
      toast.error("Image size should not exceed 2MB.");
      return;
    }

    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("description", categoryDescription);
    formData.append("avatar", categoryImage);

    dispatch(addCategory(formData) as any);
  };

  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Category added successfully!");
      setCategoryName("");
      setCategoryDescription("");
      setCategoryImage(null);
      window.location.href = "/restauranthome";
    }
    if (error) {
      console.log(error);
      toast.error("Failed to add category. Please try again.");
    }
  }, [dispatch, isAuthenticated, error]);

  return (
    <MainLayout>
      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form className="shadow-lg" onSubmit={handleAddCategory}>
            <h1 className="mb-3">Add New Category</h1>

            <div className="form-group">
              <label htmlFor="category_name_field">Category Name</label>
              <input
                type="text"
                id="category_name_field"
                className="form-control"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category_description_field">Category Description</label>
              <textarea
                id="category_description_field"
                className="form-control"
                value={categoryDescription}
                onChange={(e) => setCategoryDescription(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category_image_field">Category Image</label>
              <input
                type="file"
                id="category_image_field"
                className="form-control"
                onChange={handleImageChange}
                name="avatar"
                required
              />
            </div>

            <button
              id="add_category_button"
              type="submit"
              className="btn btn-block py-3"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Category"}
            </button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default Category;
