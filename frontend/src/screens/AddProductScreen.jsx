import React, { useState } from 'react';
import axios from 'axios';

import { Form, Button, Row, Col } from 'react-bootstrap';
import Message from '../components/shared/Message';
import Loader from '../components/shared/Loader';

const AddProductScreen = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [image] = useState('/images/mouse.jpg');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [reviews] = useState([]);
  const [countInStock] = useState(10);
  const [rating, setRating] = useState(4.3);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setSuccess(false);

    try {
      await axios.post(`/api/products/addProduct`, {
        name,
        image,
        brand,
        category,
        description,
        reviews,
        numReviews: 23,
        rating,
        price: parseFloat(price),
        countInStock,
      });

      setName('');
      setBrand('');
      setCategory('');
      setDescription('');
      setRating('');
      setSuccess(true);
      setLoading(false);
      console.log('added');
    } catch (error) {
      console.log(error);
      setError(true);
      setLoading(false);
    }
  };

  return (
    <>
      <Row>
        <Col md={12}>
          <h4>Add Product</h4>
          {error && (
            <Message varient="danger">Error adding new Product</Message>
          )}
          {success && <Message variant="success">Product Added</Message>}
          {loading ? (
            <Loader />
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Product Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              {/* <Form.Group controlId="name">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Product Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group> */}

              <Form.Group controlId="brand">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button
                type="submit"
                varient="primary"
                className="btn-md rounded btn-dark"
              >
                Add Product
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </>
  );
};

export default AddProductScreen;