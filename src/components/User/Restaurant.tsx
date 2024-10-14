import React from 'react';
import { Link } from "react-router-dom";

interface RestaurantProps {
  restaurant: {
    _id: string;
    name: string;
    address: string;
    ratings: number;
    numOfReviews: number;
    avatar: string;
  };
}

const Restaurant: React.FC<RestaurantProps> = ({ restaurant }) => {
  console.log(restaurant,"carddd")
  return (
    <div className="col-sm-12 col-md-6 col-lg-3 my-3">
      <div className="card p-3 rounded">
        <Link to={`/restaurant/${restaurant._id}`} className="btn btn-block">
          <img
            className="card-img-top mx-auto"
            src={restaurant.avatar}
            alt="image"
          />

        </Link>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{restaurant.name}</h5>
          <p className="rest_adress">
            {restaurant.address}
          </p>
          <div className="ratings mt-auto">
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(restaurant.ratings / 5) * 100}%` }}
              ></div>
            </div>
            <span id="no_of_reviews">(10 Reviews)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
