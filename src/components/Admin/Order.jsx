import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import SideNav from './SideNav';

function Order() {
  const backendUrl = process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);  // To manage loading state
  const [error, setError] = useState(null);  // To manage any error
  const token = localStorage.getItem('token'); 

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${backendUrl}/admin/getOrder`, {
          headers: {
            Authorization: `Bearer ${token}`,  // Include token for authentication
          },
        });

        setOrders(response.data.orders);
      } catch (error) {
        setError('Error fetching orders. Please try again later.');
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);  // Stop loading once the request completes
      }
    };

    if (token) {
      fetchOrders();  // Only attempt to fetch orders if token is present
    } else {
      setError('No authentication token found. Please log in.');
      setLoading(false);
    }
  }, [backendUrl, token]);

  return (
    <div>
      <SideNav />
      <div className="whole">
        <div className="main-content">
          <div className="pl-3 row main-row">
            <div className="col-12 my-sm-0 my-md-5 p-3 montserrat-400" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2><b>ORDER MANAGEMENT</b></h2>
            </div>

            {/* Handle loading, error, and no orders found */}
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-danger">{error}</p>
            ) : orders.length === 0 ? (
              <p>No orders found.</p>
            ) : (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Status</th>
                    <th>Payment Method</th>
                    <th>Total Amount</th>
                    <th>Shipping Address</th>
                    <th>Order Items</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.orderStatus}</td>
                      <td>{order.paymentMethod}</td>
                      <td>${order.totalAmount}</td>

                      {/* Shipping Address */}
                      <td>
                        <strong>Name:</strong> {order.shippingAddress?.name}<br />
                        <strong>Mobile:</strong> {order.shippingAddress?.mobileNo}<br />
                        <strong>Address:</strong> {order.shippingAddress?.address}, {order.shippingAddress?.locality}, {order.shippingAddress?.pinCode}
                      </td>

                      {/* Order Items */}
                      <td>
                        {order.orderItems.map((item, index) => (
                          <div key={index}>
                            <p><strong>{item.dishes}</strong> - {item.color}</p>
                            <p>Price: ${item.newprice}</p>
                            <p>Quantity: {item.quantity}</p>
                            <hr />
                          </div>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;


