import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Card, Row, Col, Container } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import SideNav from './SideNav';
import { Dropdown } from 'react-bootstrap';
import { FiLogOut } from 'react-icons/fi';
import { useNavigate} from 'react-router-dom';



import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Home = () => {
    const chartRef = useRef(null);
    const backendUrl = process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL;
    const token = localStorage.getItem('token');
    
    const [cartItemCount, setCartItemCount] = useState(0);
    const [dishCount, setDishCount] = useState(0);
    const [orderCount, setOrderCount] = useState(0);
    const [customerCount, setCustomerCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const cartRes = await axios.get(`${backendUrl}/admin/cartcount`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const orderRes = await axios.get(`${backendUrl}/admin/orders-count`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const customerRes = await axios.get(`${backendUrl}/admin/customer-count`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const dishRes = await axios.get(`${backendUrl}/admin/dishescount`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setDishCount(dishRes.data.count);
                setOrderCount(orderRes.data.totalOrderCount);
                setCartItemCount(cartRes.data.totalCartItemCount);
                setCustomerCount(customerRes.data.totalCustomerCount);

            } catch (err) {
                console.error('Error fetching counts:', err);
            }
        };

        fetchCounts();
    }, [backendUrl, token]);

    const handleLogout = async () => {
        try {
            const response = await axios.post(`${backendUrl}/admin/logout`, {}, { withCredentials: true });
    
            if (response.status === 200) {
                navigate('/', { replace: true }); // Redirect to the login page
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('An error occurred during logout', error);
        }
    };
    
    const data = {
        labels: [ 'Orders', 'Customers','Total Items', 'Items in Cart',],
        datasets: [
            {
                label: 'Counts',
                data: [orderCount, customerCount, dishCount, cartItemCount],
                backgroundColor: [
                    'rgba(0, 123, 255, 0.2)',  // #007bff (light blue for Total Orders)
                    'rgba(23, 162, 184, 0.2)',  // #17a2b8 (cyan for Customers)
                    'rgba(40, 167, 69, 0.2)',   // #28a745 (green for Total Items)
                    'rgba(255, 193, 7, 0.2)',   // #ffc107 (yellow for Items in Cart)
                ],
                borderColor: [
                    'rgba(0, 123, 255, 1)',  // #007bff (light blue for Total Orders)
                    'rgba(23, 162, 184, 1)',  // #17a2b8 (cyan for Customers)
                    'rgba(40, 167, 69, 1)',   // #28a745 (green for Total Items)
                    'rgba(255, 193, 7, 1)',   // #ffc107 (yellow for Items in Cart)
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Admin Dashboard Metrics',
                font: {
                    size: 18,
                    weight: 'bold',
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    useEffect(() => {
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, []);

    return (
        <div style={{ backgroundColor: "#f8f9fa", minHeight: '100vh' }}>
            <SideNav />
            <div className='whole'>
                <Container>
                    <Row className="mb-4">
                    <Col className="d-flex justify-content-between align-items-center">
                        <h2 className="font-weight-bold" style={{ color: '#343a40' }}>
                            Admin Dashboard
                        </h2>

                        {/* SVG Icon Dropdown for Logout */}
                        <Dropdown>
                            <Dropdown.Toggle as="div" id="dropdown-custom-components" className="d-flex align-items-center" style={{ cursor: 'pointer' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16" style={{ marginRight: '0.5rem' }}>
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                                </svg>
                                <span>Profile</span>
                            </Dropdown.Toggle>

                            <Dropdown.Menu align="right">
                                <Dropdown.Item onClick={handleLogout}>
                                    <FiLogOut size={20} style={{ marginRight: '0.5rem' }} />
                                    Logout
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    </Row>
                    <Row>
                    <Col md={3}>
                        <Card className="mb-4 shadow-sm" style={{ backgroundColor: '#007bff', color: 'white' }}>
                            <Card.Body className="d-flex align-items-center justify-content-between">
                                <div>
                                    <Card.Title>Total Orders</Card.Title>
                                    <Card.Text>{orderCount}</Card.Text>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-bag" viewBox="0 0 16 16">
                                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
                                </svg>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={3}>
                        <Card className="mb-4 shadow-sm" style={{ backgroundColor: '#17a2b8', color: 'white' }}>
                            <Card.Body className="d-flex align-items-center justify-content-between">
                                <div>
                                    <Card.Title>Customers</Card.Title>
                                    <Card.Text>{customerCount}</Card.Text>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                                </svg>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={3}>
                        <Card className="mb-4 shadow-sm" style={{ backgroundColor: '#28a745', color: 'white' }}>
                            <Card.Body className="d-flex align-items-center justify-content-between">
                                <div>
                                    <Card.Title>Total Items</Card.Title>
                                    <Card.Text>{dishCount}</Card.Text>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-bar-chart-fill" viewBox="0 0 16 16">
                                    <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z"/>
                                </svg>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={3}>
                        <Card className="mb-4 shadow-sm" style={{ backgroundColor: '#ffc107', color: 'white' }}>
                            <Card.Body className="d-flex align-items-center justify-content-between">
                                <div>
                                    <Card.Title>Items in Cart</Card.Title>
                                    <Card.Text>{cartItemCount}</Card.Text>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-cart-fill" viewBox="0 0 16 16">
                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                                </svg>
                            </Card.Body>
                        </Card>
                    </Col>

                    </Row>
                    <Row className="mt-5">
                        <Col>
                            <Bar ref={chartRef} data={data} options={options} />
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default Home;


// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import { Card, Row, Col } from 'react-bootstrap';
// import { Bar } from 'react-chartjs-2';
// import SideNav from './SideNav';

// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend
// } from 'chart.js';

// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend
// );

// const Home = () => {
//     const chartRef = useRef(null);
//     const backendUrl = process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL;
//     const token = localStorage.getItem('token'); // Get token from localStorage
//     const userId = localStorage.getItem('userId'); // Assuming user ID is stored here

//     const [mainCategoryCount, setMainCategoryCount] = useState(0);
//     const [categoryCount, setCategoryCount] = useState(0);
//     const [cartItemCount, setCartItemCount] = useState(0);
//     const [dishCount, setDishCount] = useState(0);
//     const [orderCount, setOrderCount] = useState(0);
//     const [customerCount, setCustomerCount] = useState(0);
//     console.log('cartcount',cartItemCount)

//     console.log('order counts are',orderCount)


//     useEffect(() => {
//         const fetchCounts = async () => {
//             try {
//                 const mainCategoryRes = await axios.get(`${backendUrl}/admin/maincategoriescount`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,  // Include token for authentication
//                     },
//                 });

//                 const categoryRes = await axios.get(`${backendUrl}/admin/categoriescount`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,  // Include token for authentication
//                     },
//                 });

//                 // Fetch cart count based on user ID
              
//                     const cartRes = await axios.get(`${backendUrl}/admin/cartcount`, {
//                         headers: {
//                             Authorization: `Bearer ${token}`,  // Include token for authentication
//                         },
//                     });
                   
             

//                 const orderRes = await axios.get(`${backendUrl}/admin/orders-count`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,  // Include token for authentication
//                     },
//                 });

//                 const customerRes = await axios.get(`${backendUrl}/admin/customer-count`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,  // Include token for authentication
//                     },
//                 });

//                 const dishRes = await axios.get(`${backendUrl}/admin/dishescount`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,  // Include token for authentication
//                     },
//                 });

//                 setMainCategoryCount(mainCategoryRes.data.count);
//                 setCategoryCount(categoryRes.data.count);
//                 setDishCount(dishRes.data.count);
//                 setOrderCount(orderRes.data.totalOrderCount);
//                 setCartItemCount(cartRes.data.totalCartItemCount);
//                 setCustomerCount(customerRes.data.totalCustomerCount
//                 );



//             } catch (err) {
//                 console.error('Error fetching counts:', err);
//             }
//         };

//         fetchCounts();
//     }, [backendUrl, token, userId]);

//     const data = {
//         labels: ['Total Items', 'Items in Cart', 'Main Categories', 'Categories','orders','customer'],
//         datasets: [
//             {
//                 label: 'Counts',
//                 data: [dishCount, cartItemCount, mainCategoryCount, categoryCount,orderCount,customerCount],
//                 backgroundColor: [
                   
//                     'rgba(75, 192, 192, 0.2)',
//                     'rgba(153, 102, 255, 0.2)',
//                     'rgba(255, 159, 64, 0.2)',
//                     'rgba(255, 99, 132, 0.2)',
//                 ],
//                 borderColor: [
                   
//                     'rgba(75, 192, 192, 1)',
//                     'rgba(153, 102, 255, 1)',
//                     'rgba(255, 159, 64, 1)',
//                     'rgba(255, 99, 132, 1)',
//                 ],
//                 borderWidth: 1,
//             },
//         ],
//     };

//     const options = {
//         responsive: true,
//         plugins: {
//             legend: {
//                 position: 'top',
//             },
//             title: {
//                 display: true,
//                 text: 'Admin Dashboard Metrics',
//             },
//         },
//         scales: {
//             y: {
//                 beginAtZero: true,
//             },
//         },
//     };

//     useEffect(() => {
//         return () => {
//             if (chartRef.current) {
//                 chartRef.current.destroy();
//             }
//         };
//     }, []);

//     return (
//         <div className='big' style={{ backgroundColor: "white", height: '100vh' }}>
//             <SideNav />
//             <div className="whole">
//                 <div>
//                     <div className="pl-3 row main-row">
//                         <div
//                             className="col-12 my-sm-0 my-md-5 p-3 montserrat-400"
//                             style={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 justifyContent: "space-between",
//                             }}
//                         >
//                             <h2 style={{ color: "black" }}><b>ADMIN DASHBOARD</b></h2>
//                         </div>
//                     </div>
//                     <Row className="mt-4">
//                         <Col md={3}>
//                             <Card style={{ color: "white", backgroundColor: "#b0d5dd", border: 'none' }}>
//                                 <Card.Body>
//                                     <Card.Title>Total Orders</Card.Title>
//                                     <Card.Text>{orderCount}</Card.Text>
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                         <Col md={3}>
//                             <Card style={{ color: "white", backgroundColor: "#b0d5dd", border: 'none' }}>
//                                 <Card.Body>
//                                     <Card.Title>Customers</Card.Title>
//                                     <Card.Text>{customerCount}</Card.Text>
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                         <Col md={3}>
//                             <Card style={{ color: "white", backgroundColor: "#b0d5dd", border: 'none' }}>
//                                 <Card.Body>
//                                     <Card.Title>Total Items</Card.Title>
//                                     <Card.Text>{dishCount}</Card.Text>
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                         <Col md={3}>
//                             <Card style={{ color: "white", backgroundColor: "rgb(202 176 221)", border: 'none' }}>
//                                 <Card.Body>
//                                     <Card.Title>Items in Cart</Card.Title>
//                                     <Card.Text>{cartItemCount}</Card.Text>
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                         {/* <Col md={3}>
//                             <Card style={{ color: "white", backgroundColor: "rgb(239 205 143)", border: 'none' }}>
//                                 <Card.Body>
//                                     <Card.Title>Main Categories</Card.Title>
//                                     <Card.Text>{mainCategoryCount}</Card.Text>
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                         <Col md={3}>
//                             <Card style={{ color: "white", backgroundColor: "#ec9fa6", border: 'none' }}>
//                                 <Card.Body>
//                                     <Card.Title>Categories</Card.Title>
//                                     <Card.Text>{categoryCount}</Card.Text>
//                                 </Card.Body>
//                             </Card>
//                         </Col> */}
//                     </Row>
//                     <div className="mt-5">
//                         <Bar ref={chartRef} data={data} options={options} />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Home;


// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import { Card, Row, Col } from 'react-bootstrap';
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend
// } from 'chart.js';
// import { Bar } from 'react-chartjs-2';
// import SideNav from './SideNav';

// // Register the necessary chart components
// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend
// );

// const Home = () => {
//     const chartRef = useRef(null);
//     const backendUrl = process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL;

//     const [mainCategoryCount, setMainCategoryCount] = useState(0);
//     const [categoryCount, setCategoryCount] = useState(0);
//     const [cartItemCount, setCartItemCount] = useState(0);
//     const [dishCount, setDishCount] = useState(0);
//     const token = localStorage.getItem('token'); // Get token from localStorage


//     useEffect(() => {
//         const fetchCounts = async () => {
//             try {
//                 const mainCategoryRes = await axios.get(`${backendUrl}/admin/maincategoriescount`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,  // Include token for authentication
//                     },
//                 });
//                 const categoryRes = await axios.get(`${backendUrl}/admin/categoriescount`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,  // Include token for authentication
//                     },
//                 });
//                 const cartRes = await axios.get(`${backendUrl}/admin/cartcount`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,  // Include token for authentication
//                     },
//                 });
//                 const dishRes = await axios.get(`${backendUrl}/admin/dishescount`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,  // Include token for authentication
//                     },
//                 });

//                 setMainCategoryCount(mainCategoryRes.data.count);
//                 setCategoryCount(categoryRes.data.count);
//                 setCartItemCount(cartRes.data.count);
//                 setDishCount(dishRes.data.count);
//             } catch (err) {
//                 console.error('Error fetching counts:', err);
//             }
//         };

//         fetchCounts();
//     }, []);

//     const data = {
//         labels: ['Total Items', 'Items in Cart', 'Main Categories', 'Categories'],
//         datasets: [
//             {
//                 label: 'Counts',
//                 data: [dishCount, cartItemCount, mainCategoryCount, categoryCount],
//                 backgroundColor: [
//                     'rgba(75, 192, 192, 0.2)',
//                     'rgba(153, 102, 255, 0.2)',
//                     'rgba(255, 159, 64, 0.2)',
//                     'rgba(255, 99, 132, 0.2)',
//                 ],
//                 borderColor: [
//                     'rgba(75, 192, 192, 1)',
//                     'rgba(153, 102, 255, 1)',
//                     'rgba(255, 159, 64, 1)',
//                     'rgba(255, 99, 132, 1)',
//                 ],
//                 borderWidth: 1,
//             },
//         ],
//     };

//     const options = {
//         responsive: true,
//         plugins: {
//             legend: {
//                 position: 'top',
//             },
//             title: {
//                 display: true,
//                 text: 'Admin Dashboard Metrics',
//             },
//         },
//         scales: {
//             y: {
//                 beginAtZero: true,
//             },
//         },
//     };

//     useEffect(() => {
//         // Properly cleanup the chart instance
//         return () => {
//             if (chartRef.current) {
//                 chartRef.current.destroy();
//             }
//         };
//     }, []);

//     return (
//         <div className='big' style={{ backgroundColor: "white", height: '100vh' }}>
//             <SideNav />
//             <div className="whole">
//                 <div>
//                     <div className="pl-3 row main-row">
//                         <div
//                             className="col-12 my-sm-0 my-md-5 p-3 montserrat-400"
//                             style={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 justifyContent: "space-between",
//                             }}
//                         >
//                             <h2 style={{ color: "black" }}><b>ADMIN DASHBOARD</b></h2>
//                         </div>
//                     </div>
//                     <Row className="mt-4">
//                         <Col md={3}>
//                             <Card style={{ color: "white", backgroundColor: "#b0d5dd", border: 'none' }}>
//                                 <Card.Body>
//                                     <Card.Title>Total Items</Card.Title>
//                                     <Card.Text>{dishCount}</Card.Text>
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                         <Col md={3}>
//                             <Card style={{ color: "white", backgroundColor: "rgb(202 176 221)", border: 'none' }}>
//                                 <Card.Body>
//                                     <Card.Title>Items in Cart</Card.Title>
//                                     <Card.Text>{cartItemCount}</Card.Text>
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                         <Col md={3}>
//                             <Card style={{ color: "white", backgroundColor: "rgb(239 205 143)", border: 'none' }}>
//                                 <Card.Body>
//                                     <Card.Title>Main Categories</Card.Title>
//                                     <Card.Text>{mainCategoryCount}</Card.Text>
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                         <Col md={3}>
//                             <Card style={{ color: "white", backgroundColor: "#ec9fa6", border: 'none' }}>
//                                 <Card.Body>
//                                     <Card.Title>Categories</Card.Title>
//                                     <Card.Text>{categoryCount}</Card.Text>
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                     </Row>
//                     <div className="mt-5">
//                         <Bar ref={chartRef} data={data} options={options} />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Home;


// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import { Card, Row, Col } from 'react-bootstrap';
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend
// } from 'chart.js';
// import { Bar } from 'react-chartjs-2';
// import SideNav from './SideNav';

// // Register the necessary chart components
// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend
// );

// const Home = () => {
//     const chartRef = useRef(null);
//     const [mainCategoryCount, setMainCategoryCount] = useState(0);
//     const [categoryCount, setCategoryCount] = useState(0);
//     const [cartItemCount, setCartItemCount] = useState(0);
//     const [dishCount, setDishCount] = useState(0);
    
    
    
//     useEffect(() => {
//         const fetchCounts = async () => {
//             try {
//                 const mainCategoryRes = await axios.get('/admin/maincategoriescount');
//                 const categoryRes = await axios.get('/admin/categoriescount');
//                 const cartRes = await axios.get('/admin/cartcount');
//                 const dishRes = await axios.get('/admin/dishescount');
    
//                 setMainCategoryCount(mainCategoryRes.data.count);
//                 setCategoryCount(categoryRes.data.count);
//                 setCartItemCount(cartRes.data.count);
//                 setDishCount(dishRes.data.count);
//             } catch (err) {
//                 console.error('Error fetching counts:', err);
//             }
//         };
    
//         fetchCounts();
//     }, []);

//     const data = {
//         labels: ['Total Items', 'Items in Cart', 'Main Categories', 'Categories'],
//         datasets: [
//             {
//                 label: 'Counts',
//                 data: [dishCount, cartItemCount, mainCategoryCount, categoryCount],
//                 backgroundColor: [
//                     'rgba(75, 192, 192, 0.2)',
//                     'rgba(153, 102, 255, 0.2)',
//                     'rgba(255, 159, 64, 0.2)',
//                     'rgba(255, 99, 132, 0.2)',
//                 ],
//                 borderColor: [
//                     'rgba(75, 192, 192, 1)',
//                     'rgba(153, 102, 255, 1)',
//                     'rgba(255, 159, 64, 1)',
//                     'rgba(255, 99, 132, 1)',
//                 ],
//                 borderWidth: 1,
//             },
//         ],
//     };
    
//     const options = {
//         responsive: true,
//         plugins: {
//             legend: {
//                 position: 'top',
//             },
//             title: {
//                 display: true,
//                 text: 'Admin Dashboard Metrics',
//             },
//         },
//         scales: {
//             y: {
//                 beginAtZero: true,
//             },
//         },
//     };
    

//     useEffect(() => {
//         return () => {
//             if (chartRef.current) {
//                 chartRef.current.chartInstance.destroy();
//             }
//         };
//     }, []);

//     return (
//         <div className='big' style={{ backgroundColor: "white", height: '100vh' }}>
//             <SideNav />
//             <div className="whole">
//                 <div>
//                     <div className="pl-3 row main-row">
//                         <div
//                             className="col-12 my-sm-0 my-md-5 p-3 montserrat-400"
//                             style={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 justifyContent: "space-between",
//                             }}
//                         >
//                             <h2 style={{ color: "black" }}><b>ADMIN DASHBOARD</b></h2>
//                         </div>
//                     </div>
//                     <Row className="mt-4">
//                         <Col md={3}>
//                             <Card style={{ color: "white", backgroundColor: "#b0d5dd", border: 'none' }}>
//                                 <Card.Body>
//                                     <Card.Title>Total Items</Card.Title>
//                                     <Card.Text>{dishCount}</Card.Text>
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                         <Col md={3}>
//                             <Card style={{ color: "white", backgroundColor: "rgb(202 176 221)", border: 'none' }}>
//                                 <Card.Body>
//                                     <Card.Title>Items in Cart</Card.Title>
//                                     <Card.Text>{cartItemCount}</Card.Text>
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                         <Col md={3}>
//                             <Card style={{ color: "white", backgroundColor: "rgb(239 205 143)", border: 'none' }}>
//                                 <Card.Body>
//                                     <Card.Title>Main Categories</Card.Title>
//                                     <Card.Text>{mainCategoryCount}</Card.Text>
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                         <Col md={3}>
//                             <Card style={{ color: "white", backgroundColor: "#ec9fa6", border: 'none' }}>
//                                 <Card.Body>
//                                     <Card.Title>Categories</Card.Title>
//                                     <Card.Text>{categoryCount}</Card.Text>
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                     </Row>
//                     <div className="mt-5">
//                         <Bar ref={chartRef} data={data} options={options} />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Home;


// import React, { useEffect, useState,useRef } from 'react';
// import axios from 'axios';


// import { Card, Row, Col } from 'react-bootstrap';
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend
// } from 'chart.js';
// import { Bar } from 'react-chartjs-2';
// import SideNav from './SideNav';

// // Register the necessary chart components
// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend
// );

// const Home = () => {
//     const chartRef = useRef(null);
//     const [mainCategoryCount, setMainCategoryCount] = useState(0);
//     const [categoryCount, setCategoryCount] = useState(0);
//     const [cartItemCount, setCartItemCount] = useState(0);
//     const [dishCount, setDishCount] = useState(0);

//     useEffect(() => {
//         const fetchCounts = async () => {
//             try {
//                 const mainCategoryRes = await axios.get('/admin/maincategoriescount');
//                 const categoryRes = await axios.get('/admin/categoriescount');
//                 const cartRes = await axios.get('/admin/cartcount');
//                 const dishRes = await axios.get('/admin/dishescount');

//                 setMainCategoryCount(mainCategoryRes.data.count);
//                 setCategoryCount(categoryRes.data.count);
//                 setCartItemCount(cartRes.data.count);
//                 setDishCount(dishRes.data.count);
//             } catch (err) {
//                 console.error('Error fetching counts:', err);
//             }
//         };

//         fetchCounts();
//     }, []);


//     // // Mock data for the demo
//     // const totalItems = 150;
//     // const itemsInCart = 45;
//     // const mainCategories = 10;
//     // const categories = 25;

//     const data = {
//         labels: ['Items', 'In Cart', 'Main Categories', 'Categories'],
//         datasets: [
//             {
//                 label: 'Counts',
//                 data: [totalItems, itemsInCart, mainCategories, categories],
//                 backgroundColor: [
//                     'rgba(75, 192, 192, 0.2)',
//                     'rgba(153, 102, 255, 0.2)',
//                     'rgba(255, 159, 64, 0.2)',
//                     'rgba(255, 99, 132, 0.2)',
//                 ],
//                 borderColor: [
//                     'rgba(75, 192, 192, 1)',
//                     'rgba(153, 102, 255, 1)',
//                     'rgba(255, 159, 64, 1)',
//                     'rgba(255, 99, 132, 1)',
//                 ],
//                 borderWidth: 1,
//             },
//         ],
//     };

//     const options = {
//         responsive: true,
//         plugins: {
//             legend: {
//                 position: 'top',
//             },
//             title: {
//                 display: true,
//                 text: 'Admin Dashboard Metrics',
//             },
//         },
//         scales: {
//             y: {
//                 beginAtZero: true,
//             },
//         },
//     };

//     useEffect(() => {
//         return () => {
//             if (chartRef.current) {
//                 chartRef.current.chartInstance.destroy();
//             }
//         };
//     }, []);

//     return (
//         <div className='big' style={{ backgroundColor: "white", height: '100vh' }}>
//             <SideNav />
//             <div className="whole">
//                 <div>
//                     <div className="pl-3 row main-row">
//                         <div
//                             className="col-12 my-sm-0 my-md-5 p-3 montserrat-400"
//                             style={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 justifyContent: "space-between",
//                             }}
//                         >
//                             <h2 style={{ color: "black" }}><b>ADMIN DASHBOARD</b></h2>
//                         </div>
//                     </div>
//                     <Row className="mt-4">
//                         <Col md={3}>
//                             <Card style={{color:"white",backgroundColor:"#b0d5dd",border:'none'}}>
//                                 <Card.Body>
//                                     <Card.Title>Total Items</Card.Title>
//                                     <Card.Text>{dishCount}</Card.Text>
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                         <Col md={3}>
//                             <Card style={{color:"white",backgroundColor:"rgb(202 176 221)",border:'none'}}>
//                                 <Card.Body>
//                                     <Card.Title>Items in Cart</Card.Title>
//                                     <Card.Text>{cartItemCount}</Card.Text>
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                         <Col md={3}>
//                             <Card style={{color:"white",backgroundColor:"rgb(239 205 143)",border:'none'}}>
//                                 <Card.Body>
//                                     <Card.Title>Main Categories</Card.Title>
//                                     <Card.Text>{mainCategoryCount}</Card.Text>
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                         <Col md={3}>
//                             <Card style={{color:"white",backgroundColor:"#ec9fa6",border:'none'}}>
//                                 <Card.Body>
//                                     <Card.Title>Categories</Card.Title>
//                                     <Card.Text> {categoryCount}</Card.Text>
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                     </Row>
//                     <div className="mt-5">
//                         <Bar ref={chartRef} data={data} options={options} />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Home;




// // src/components/Home.js
// import React from 'react';
// import SideNav from './SideNav';

// const Home = () => {

  

//     return (
//         <div className='big' style={{backgroundColor:"white",height:'100vh'}}> 
//             <SideNav />
//             <div className="whole">
//                 <div>
//                     <div className="pl-3 row main-row">
//                         <div
//                             className="col-12 my-sm-0 my-md-5 p-3 montserrat-400"
//                             style={{
//                                 display: "flex",
//                                 alignItems: "center",
//                                 justifyContent: "space-between",
//                             }}
//                         >
//                             <h2 style={{color:"black"}}><b>ADMIN DASHBOARD</b></h2>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//         </div>
//     );
// };

// export default Home;




// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import AuthService from '../../services/authService'; // Adjusted path
// import SideNav from './SideNav';

// const Home = () => {
//     const navigate = useNavigate();

//     const handleLogout = async () => {
//         await AuthService.logout();
//         navigate('/admin/login');
//     };

//     return (
//         <div>
//             <SideNav/>
//             <h2>Welcome to the Admin Dashboard</h2>
//             <button onClick={handleLogout}>Logout</button>
//         </div>
//     );
// };

// export default Home;
