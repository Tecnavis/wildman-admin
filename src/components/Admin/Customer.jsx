import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import SideNav from './SideNav';
import Tooltip from "@mui/material/Tooltip";
import { MdDelete } from "react-icons/md";



function Customer() {
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
        setError('Error fetching customers since no orders are placed. Please try again later.');
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

  const deleteOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await axios.delete(`${backendUrl}/admin/deleteOrder/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`,  // Include token for authentication
          },
        });
        // Remove the deleted order from state
        setOrders(orders.filter(order => order._id !== orderId));
        alert("Order deleted successfully.");
      } catch (error) {
        console.error('Error deleting order:', error);
        alert('Failed to delete order. Please try again later.');
      }
    }
  };
  
  // Add the delete button in the table
  
  

  return (
    // <div>
    //   <SideNav />
    //   <div className="whole">
    //     <div className="main-content">
    //       <div className="pl-3 row main-row">
    //         <div className="col-12 my-sm-0 my-md-5 p-3 montserrat-400" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
    //           <h2><b>CUSTOMER MANAGEMENT</b></h2>
    //         </div>

    //         {/* Handle loading, error, and no orders found */}
    //         {loading ? (
    //           <p>Loading...</p>
    //         ) : error ? (
    //           <p className="text-danger">{error}</p>
    //         ) : orders.length === 0 ? (
    //           <p>No orders found.</p>
    //         ) : (
    //           <Table striped bordered hover>
    //             <thead>
    //               <tr>
    //                 <th>User Name</th>
    //                 <th>User Email</th>
    //                 <th>Phone</th>

    //                 <th>Status</th>
    //                 <th>Payment Method</th>
    //                 <th>Total Amount</th>
    //                 <th>Shipping Address</th>
    //                 <th>Order Items</th>
    //                 <th>Actions</th>
    //               </tr>
    //             </thead>
    //             <tbody>
    //               {orders.map((order) => (
    //                 <tr key={order._id}>
    //                   <td>{order.user.username}</td>
    //                   <td>{order.user.email}</td>
    //                   <td>{order.user.phonenumber}</td>

    //                   <td>{order.orderStatus}</td>
    //                   <td>{order.paymentMethod}</td>
    //                   <td>Rs{order.totalAmount}</td>

    //                   {/* Shipping Address */}
    //                   <td>
    //                     <strong>Name:</strong> {order.shippingAddress?.name}<br />
    //                     <strong>Mobile:</strong> {order.shippingAddress?.mobileNo}<br />
    //                     <strong>Address:</strong> {order.shippingAddress?.address}, {order.shippingAddress?.locality}, {order.shippingAddress?.pinCode}
    //                   </td>

    //                   {/* Order Items */}
    //                   <td>
    //                     {order.orderItems.map((item, index) => (
    //                       <div key={index}>
    //                         <p><strong>{item.dishes}</strong> - {item.color}</p>
    //                         <p>Price: ${item.newprice}</p>
    //                         <p>Quantity: {item.quantity}</p>
    //                         <hr />
    //                       </div>
    //                     ))}
    //                   </td>
    //                   <td>
    //                     <Tooltip title="Delete">
    //                         <MdDelete
    //                         onClick={() => deleteOrder(order._id)} 
    //                         className="delete-icon"
    //                         />
    //                     </Tooltip>
    //                     </td>
    //                 </tr>
    //               ))}
    //             </tbody>
    //           </Table>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="container-fluid">
       <SideNav />
      <div className="whole">


  <div className="row">
    <div className="col-12">
      <div className="card shadow-sm mt-4">
        <div className="card-header bg-dark text-white">
          <h4 className="mb-0">Customer Management</h4>
        </div>
        <div className="card-body">
          {loading ? (
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : error ? (
            <p className="text-danger text-center">{error}</p>
          ) : orders.length === 0 ? (
            <p className="text-center">No customers found.</p>
          ) : (
            // Add overflow-x for horizontal scroll when needed
            <div style={{ overflowX: 'auto' }}>
              <Table striped bordered hover className="table-sm">
                <thead className="thead-dark">
                  <tr>
                    <th>User Name</th>
                    <th>User Email</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Payment Method</th>
                    <th>Total Amount</th>
                    <th>Shipping Address</th>
                    <th>Order Items</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order.user.username}</td>
                      <td>{order.user.email}</td>
                      <td>{order.user.phonenumber}</td>
                      <td>{order.orderStatus}</td>
                      <td>{order.paymentMethod}</td>
                      <td>Rs {order.totalAmount}</td>

                      {/* Shipping Address */}
                      <td>
                        <strong>{order.shippingAddress?.name}</strong><br />
                        {order.shippingAddress?.mobileNo}<br />
                        {order.shippingAddress?.address}, {order.shippingAddress?.locality}, {order.shippingAddress?.pinCode}
                      </td>

                      {/* Order Items */}
                      <td>
                        {order.orderItems.map((item, index) => (
                          <div key={index} className="mb-2">
                            <p><strong>{item.dishes}</strong> - {item.color}</p>
                            <p>Price: Rs {item.newprice}</p>
                            <p>Quantity: {item.quantity}</p>
                            <hr />
                          </div>
                        ))}
                      </td>

                      {/* Actions */}
                      <td>
                        <Tooltip title="Delete">
                          <MdDelete
                            onClick={() => deleteOrder(order._id)} 
                            className="delete-icon"
                          />
                        </Tooltip>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
  </div>
</div>

  );
}

export default Customer;
