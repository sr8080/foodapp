import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

const UncontrolledExample: React.FC = () => {
  return (
    <Carousel style={{ margin: '0 100px' }}> {/* Add margin to create space from sides */}
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://media.istockphoto.com/id/1829241109/photo/enjoying-a-brunch-together.jpg?b=1&s=612x612&w=0&k=20&c=Mn_EPBAGwtzh5K6VyfDmd7Q5eJFXSHhGWVr3T4WDQRo="
          alt="First slide"
          style={{ height: '300px', objectFit: 'cover' }}
        />
        <Carousel.Caption>
          <h3>Explore your foody</h3>
          
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://media.istockphoto.com/id/1829241109/photo/enjoying-a-brunch-together.jpg?b=1&s=612x612&w=0&k=20&c=Mn_EPBAGwtzh5K6VyfDmd7Q5eJFXSHhGWVr3T4WDQRo="
          alt="Second slide"
          style={{ height: '300px', objectFit: 'cover' }}
        />
        <Carousel.Caption>
          <h3>Explore your foody</h3>
          
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://media.istockphoto.com/id/1829241109/photo/enjoying-a-brunch-together.jpg?b=1&s=612x612&w=0&k=20&c=Mn_EPBAGwtzh5K6VyfDmd7Q5eJFXSHhGWVr3T4WDQRo="
          alt="Third slide"
          style={{ height: '300px', objectFit: 'cover' }}
        />
        <Carousel.Caption>
          <h3>Explore your foody</h3>
          
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default UncontrolledExample;
