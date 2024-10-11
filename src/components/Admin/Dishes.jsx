// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import SideNav from "./SideNav";
// import { Button, Modal ,Table} from "react-bootstrap";
// import { MdDelete } from "react-icons/md";
// import { FiEdit } from "react-icons/fi";
// import { IoIosAddCircle } from "react-icons/io";
// import Tooltip from "@mui/material/Tooltip";
// import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
// import PaginationSection from './PaginationSection';
// // import Swal from 'sweetalert2';

// function Dishes() {
//   const backendUrl = process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL;
//   const [uid, setUid] = useState(null); // Stores the id of the dish being edited 
//    const [show, setShow] = useState(false);
//   const [on, setOn] = useState(false);
//   const [dishes, setDishes] = useState("");
//   const [description, setDescription] = useState("");
//   const [oldprice, setOldPrice] = useState("");
//   const [newprice, setNewPrice] = useState("");
//   const [image, setImage] = useState([]);
//   const [Itemnumber, setItemnumber] = useState("");
//   const [manufacturer, setManufacturer] = useState("");
//   const [color, setColor] = useState("");
//   const [productcare, setProductcare] = useState("");
//   const [features, setFeatures] = useState("");
//   const [maincategory, setMaincategory] = useState('');
//   const [categories, setCategories] = useState('');
//   const [subcategories, setSubcategories] = useState('');
//   const [getMaincategories, setGetMaincategories] = useState([]);
//   const [getCategories, setGetCategories] = useState([]);
//   const [getSubcategories, setGetSubcategories] = useState([]);
//   const [getDishes, setGetDishes] = useState([]);
//   const [getColors, setGetColors] = useState([]);
//   const [imageFiles, setImageFiles] = useState({});
//   const [stocks, setStocks] = useState({});
//   const [selectedColors, setSelectedColors] = useState({}); // To manage selected colors for each item
//   const [selectedItem, setSelectedItem] = useState(null); // Track selected item for modal
//   const [showModal, setShowModal] = useState(false); // Modal visibility state
//   const [isEditing, setIsEditing] = useState(false);
//   const [getDishesById, setGetDishesById] = useState({
//     dishes: "",
//     oldprice: "",
//     newprice: "",
//     description: "",
//     Itemnumber: "",
//     manufacturer: "",
//     color: "",
//     productcare: "",
//     features: "",
//     mainCategory: "",
//     category: "",
//     subcategory: ""
//   });

//   const handleImage = (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     setImage(selectedFiles);
//   };

//   const handleImageUpload = (event, selectedColor) => {
//     const files = Array.from(event.target.files);
//     setImageFiles((prev) => ({
//       ...prev,
//       [selectedColor]: [...prev[selectedColor], ...files],
//     }));
//   };

//   const handleClose = () => setShow(false);
//   const handleShow = () => {
//     setGetDishesById({
//         dishes: "",
//         oldprice: "",
//         newprice: "",
//         description: "",
//         Itemnumber: "",
//         manufacturer: "",
//         color: "",
//         productcare: "",
//         features: "",
//         mainCategory: "",
//         category: "",
//         subcategory: ""
//     });
//     setIsEditing(false); // Set to false for add mode
//     setShow(true);
// };
//   const handleOff = () => setOn(false);

//   useEffect(() => {
//     const token = localStorage.getItem('token');

//     const fetchData = async () => {
//       try {
//         const [mainCatResponse, catResponse, subCatResponse, dishesResponse] = await Promise.all([
//           axios.get(`${backendUrl}/admin/getmaincategories`, { headers: { Authorization: `Bearer ${token}` } }),
//           axios.get(`${backendUrl}/admin/getcategories`, { headers: { Authorization: `Bearer ${token}` } }),
//           axios.get(`${backendUrl}/admin/getsubcategories`, { headers: { Authorization: `Bearer ${token}` } }),
//           axios.get(`${backendUrl}/admin/getdishes`, { headers: { Authorization: `Bearer ${token}` } }),
//         ]);

//         setGetMaincategories(mainCatResponse.data);
//         setGetCategories(catResponse.data);
//         setGetSubcategories(subCatResponse.data);
//         setGetDishes(dishesResponse.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     const fetchColors = async () => {
//       try {
//         const response = await axios.get(`${backendUrl}/admin/getcolors`, { headers: { Authorization: `Bearer ${token}` } });
//         setGetColors(response.data);
//       } catch (err) {
//         console.error(err);
//         alert('An error occurred while fetching colors.');
//       }
//     };

//     fetchData();
//     fetchColors();
//   }, [backendUrl]);


//   const postDishes = async () => {
//     const token = localStorage.getItem('token');
//     const formData = new FormData();
    
//     // Append basic details
//     formData.append("dishes", dishes);
//     formData.append("description", description);
//     formData.append("category", categories);
//     formData.append("maincategories", maincategory);
//     formData.append("subcategories", subcategories);
//     formData.append("oldprice", oldprice);
//     formData.append("newprice", newprice);
//     formData.append("Itemnumber", Itemnumber);
//     formData.append("manufacturer", manufacturer);
//     formData.append("productcare", productcare);
//     formData.append("features", features);
  
//     // Append images and stock for each color
//     for (const [colorKey, files] of Object.entries(imageFiles)) {
//       files.forEach((file, index) => {
//         formData.append(`images_${colorKey}_${index}`, file); // Append image
//         formData.append(`stock_${colorKey}`, stocks[colorKey] || 0); // Append stock for the color
//       });
//     }
  
//     try {
//       await axios.post(`${backendUrl}/admin/postdishes`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       window.location.reload();
//     } catch (err) {
//       console.log(err);
//     }
//   };


//   const updateDishes = async () => {
//     const token = localStorage.getItem('token');
//     const formData = new FormData();
    
//     // Append existing details for the dish
//     formData.append("dishes", getDishesById.dishes);
//     formData.append("description", getDishesById.description);
//     formData.append("oldprice", getDishesById.oldprice);
//     formData.append("newprice", getDishesById.newprice);
//     formData.append("category", getDishesById.category);
//     formData.append("maincategories", getDishesById.mainCategory);
//     formData.append("subcategories", getDishesById.subcategory);
//     formData.append("color", getDishesById.color);
//     formData.append("Itemnumber", getDishesById.Itemnumber);
//     formData.append("productcare", getDishesById.productcare);
//     formData.append("manufacturer", getDishesById.manufacturer);
//     formData.append("features", getDishesById.features);
  
//     // Loop through imageFiles and stocks to append new images and stock
//     for (const [colorKey, files] of Object.entries(imageFiles)) {
//       files.forEach((file, index) => {
//         formData.append(`images_${colorKey}_${index}`, file); // Append new image
//         formData.append(`stock_${colorKey}`, stocks[colorKey] || getDishesById.stock[colorKey] || 0); // Append stock for the color
//       });
//     }
  
//     try {
//       await axios.put(`${backendUrl}/admin/putdishes/${uid}`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       window.location.reload();
//     } catch (err) {
//       console.error('Error updating dish:', err);
//     }
//   };
  

//   const handleOn = async (id) => {
//     const token = localStorage.getItem('token');
//     setShow(true); // This triggers the modal to open
//     setUid(id);
//     setIsEditing(true); // Set to true for edit mode

//     try {
//         const response = await axios.get(`${backendUrl}/admin/getdishesbyid/${id}`, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//         const data = response.data;
//         setGetDishesById({
//             dishes: data.dishes,
//             oldprice: data.oldprice,
//             newprice: data.newprice,
//             description: data.description,
//             Itemnumber: data.Itemnumber,
//             manufacturer: data.manufacturer,
//             color: data.color,
//             productcare: data.productcare,
//             features: data.features,
//             mainCategory: data.mainCategory?._id || '',
//             category: data.category?._id || '',
//             subcategory: data.subcategory?._id || '',
//             image: data.image || [],
//         });
//         setMaincategory(data.mainCategory?._id || '');
//         setCategories(data.category?._id || '');
//     } catch (err) {
//         console.log(err);
//     }
// };


  
//   // Function to handle input changes in the edit modal
//   const handleUpdateChange = (e) => {
//     const { name, value } = e.target;
//     setGetDishesById((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };
//   const handleDelete = async (id) => {
//     const token = localStorage.getItem('token');
//     const windowConfirmation = window.confirm("Are you sure to Delete this item");
//     if (windowConfirmation) {
//       try {
//         await axios.delete(`${backendUrl}/admin/deletedishes/${id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         window.location.reload();
//       } catch (err) {
//         console.error(err);
//       }
//     }
//   };

//   // Filtering logic
//   const filteredCategories = getCategories.filter(cat => 
//     cat.maincategoriesData && cat.maincategoriesData._id === maincategory
//   );

//   const filteredSubcategories = getSubcategories.filter(subCat => 
//     subCat.category && subCat.category._id === categories
//   );

//   const handleStockChange = (e, colorKey) => {
//     setStocks((prevStocks) => ({
//       ...prevStocks,
//       [colorKey]: e.target.value, // Update stock for the selected color
//     }));
//   };

//   // const handleColorChange = (itemId, color) => {
//   //   setSelectedColors((prev) => ({ ...prev, [itemId]: color }));
//   //   if (color && !stocks[color]) {
//   //     setStocks((prevStocks) => ({ ...prevStocks, [color]: 0 })); // Initialize stock if it's a new color
//   //   }
//   // };
//   // const handleColorChange = (itemId, selectedColor) => {
//   //   // Update the selected color for the item
//   //   setSelectedColors((prevSelectedColors) => ({
//   //     ...prevSelectedColors,
//   //     [itemId]: selectedColor,
//   //   }));
  
//   //   // Find the stock value for the selected color
//   //   const selectedColorStock = items.images[selectedColor]?.[0]?.stock || 0;
  
//   //   // Update the stocks state for the selected color
//   //   setStocks((prevStocks) => ({
//   //     ...prevStocks,
//   //     [selectedColor]: selectedColorStock,
//   //   }));
//   // };
//   const [currentPage, setCurrentPage] = useState(1);
//   const [dataPerPage] = useState(10); // Number of items per page

//   // Logic for pagination
//   const indexOfLastData = currentPage * dataPerPage;
//   const indexOfFirstData = indexOfLastData - dataPerPage;
//   const currentData = getDishes.slice(indexOfFirstData, indexOfLastData);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const totalPages = Math.ceil(getDishes.length / dataPerPage);
//   const pageNumbers = [];
//   for (let i = 1; i <= totalPages; i++) {
//     pageNumbers.push(i);
//   }
//   const handleViewMore = (item) => {
//     setSelectedItem(item); // Set the selected item to display in the modal
//     setShowModal(true); // Show the modal
//   };

//   // Handle modal close
//   const handleClosemodal = () => {
//     setShowModal(false); // Hide the modal
//     setSelectedItem(null); // Clear selected item
//   };
// return (
//     <div>
//       <SideNav />
//       <div className="whole">
//       <div className="main-content">
//         <div className="pl-3 row main-row">
//           <div className="col-12 my-sm-0 my-md-5 p-3 montserrat-400"
//                style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//             <h2><b>ITEMS</b></h2>
//             <Tooltip className="add_btn" title="Add">
//               <IoIosAddCircle className="add_btn" onClick={handleShow} />
//             </Tooltip>
//           </div>

//           <div className="container">
//             {/* Scrollable table container */}
//             <OverlayScrollbarsComponent>
//               <Table className="table table-striped table-bordered">
//                 <thead className="thead-dark">
//                   <tr>
//                     <th scope="col">Images</th>
//                     <th scope="col">Item Number</th>
//                     <th scope="col">Name</th>
//                     <th scope="col">Old Price</th>
//                     <th scope="col">New Price</th>
//                     <th scope="col">Color/Stock-status</th>
//                     {/* <th scope="col">Description</th>
//                     <th scope="col">Manufacturer</th>
//                     <th scope="col">Product Care</th>
//                     <th scope="col">Features</th>
//                     <th scope="col">Category</th> */}
//                     <th scope="col">Viewmore</th>
//                     <th scope="col">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {currentData.length === 0 ? (
//                     <tr>
//                       <td colSpan="12" className="text-center">No products have been added yet.</td>
//                     </tr>
//                   ) : (
//                     currentData.map((items, index) => (
//                       <tr key={index}>
//                         <td>
//                           <div className="image-container">
//                             {items.images && Object.keys(items.images).map((colorKey) => (
//                               items.images[colorKey].map((image, imageIdx) => (
//                                 <img
//                                   key={imageIdx}
//                                   className="avatar"
//                                   src={`${backendUrl}/images/${image.image}`}
//                                   alt={`Dish Image ${imageIdx + 1}`}
//                                 />
//                               ))
//                             ))}
//                           </div>
//                         </td>
//                         <td className="text-black item-text">{items.Itemnumber}</td>
//                         <td className="text-black item-text"><b>{items.dishes}</b></td>
//                         <td className="text-black item-text">{items.oldprice}</td>
//                         <td className="text-black item-text">{items.newprice}</td>

//                         <td className="text-black item-text">
//                           {items.images && Object.keys(items.images).map((colorKey) => (
//                             items.images[colorKey].map((image, imageIdx) => (
//                               <div key={imageIdx}>
//                                 {colorKey} - Stock: {image.stock} - 
//                                 {image.stock === 0 ? (
//                                   <span className="text-danger">Out of Stock</span>
//                                 ) : image.stock < 10 ? (
//                                   <span className="text-warning">Only Few Left</span>
//                                 ) : (
//                                   <span className="text-success">In Stock</span>
//                                 )}
//                               </div>
//                             ))
//                           ))}
//                         </td>
//                         <td className="text-center">
//                           <button  onClick={() => handleViewMore(items)} style={{backgroundColor:'white',border:'none'}}>
//                             ViewMore
//                           </button>
//                         </td>
//                         {/* <td className="text-black item-text">{items.description}</td>
//                         <td className="text-black item-text">{items.manufacturer}</td>
//                         <td className="text-black item-text">{items.productcare}</td>
//                         <td className="text-black item-text">{items.features}</td>
//                         <td>{items.category?.name || 'No Category'}</td> */}
//                         <td className="text-black item-text">
//                           <Tooltip title="Edit">
//                             <FiEdit onClick={() => handleOn(items._id)} className="edit-icon" />
//                           </Tooltip>
//                           <Tooltip title="Delete">
//                             <MdDelete onClick={() => handleDelete(items._id)} className="delete-icon" />
//                           </Tooltip>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </Table>
//             </OverlayScrollbarsComponent>

//             {/* Pagination Section */}
//             <PaginationSection
//               currentPage={currentPage}
//               totalPages={totalPages}
//               paginate={paginate}
//               pageNumbers={pageNumbers}
//             />
//           </div>
//         </div>
//       </div>
//     </div>

//        {/* Bootstrap Modal for View More */}
//        <Modal show={showModal} onHide={handleClosemodal} size="lg">
//         <Modal.Header closeButton>
//           <Modal.Title>Product Details</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {selectedItem && (
//             <div>
//               <p><strong>Description:</strong> {selectedItem.description}</p>
//               <p><strong>Manufacturer:</strong> {selectedItem.manufacturer}</p>
//               <p><strong>Product Care:</strong> {selectedItem.productcare}</p>
//               <p><strong>Features:</strong> {selectedItem.features}</p>
//               <p><strong>Category:</strong> {selectedItem.category?.name || 'No Category'}</p>
//             </div>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClosemodal}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
      
//       {/* Modal for adding/editing dishes */}
//       <Modal show={show} onHide={handleClose} size="lg">
//         <Modal.Header closeButton>
//           <Modal.Title>Add Products</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="container">
//             <form>
//               <label>Item Number</label>
//               <input type="text" className="form-control" value={Itemnumber} onChange={(e) => setItemnumber(e.target.value)} />
              
//               <label>Product</label>
//               <input type="text" className="form-control" value={dishes} onChange={(e) => setDishes(e.target.value)} />
              
//               <label>Old Price</label>
//               <input type="number" className="form-control" placeholder="Enter Old Price" value={oldprice} onChange={(e) => setOldPrice(e.target.value)} />
              
//               <label>New Price</label>
//               <input type="number" className="form-control" placeholder="Enter New Price" value={newprice} onChange={(e) => setNewPrice(e.target.value)} />
              
//               <label>Description</label>
//               <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
              
//               <label>Manufacturer</label>
//               <textarea type="text" className="form-control" placeholder="Enter Manufacturer" value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} />
              
//               <label>Product Care</label>
//               <textarea type="text" className="form-control" placeholder="Enter Product Care" value={productcare} onChange={(e) => setProductcare(e.target.value)} />
              
//               <label>Features</label>
//               <textarea type="text" className="form-control" value={features} onChange={(e) => setFeatures(e.target.value)} />
              
//               <div className="form-group">
//                 <label htmlFor="maincategory">Main Category</label>
//                 <select className="form-control" id="maincategory" name="mainCategory" value={getDishesById.mainCategory} onChange={(e) => {
//                   setMaincategory(e.target.value);
//                   handleUpdateChange(e);
//                 }}>
//                   <option value="">Select Main Category</option>
//                   {getMaincategories.map(mainCat => (
//                     <option key={mainCat._id} value={mainCat._id}>{mainCat.maincategories}</option>
//                   ))}
//                 </select>
//               </div>
              
//               <div className="form-group">
//                 <label htmlFor="categories">Category</label>
//                 <select className="form-control" id="categories" name="category" value={getDishesById.category} onChange={(e) => {
//                   setCategories(e.target.value);
//                   handleUpdateChange(e);
//                 }}>
//                   <option value="">Select Category</option>
//                   {filteredCategories.map(cat => (
//                     <option key={cat._id} value={cat._id}>{cat.name}</option>
//                   ))}
//                 </select>
//               </div>
              
//               <div className="form-group">
//                 <label htmlFor="subcategories">Subcategory</label>
//                 <select className="form-control" id="subcategories" name="subcategory" value={getDishesById.subcategory} onChange={handleUpdateChange}>
//                   <option value="">Select Subcategory</option>
//                   {filteredSubcategories.map(subCat => (
//                     <option key={subCat._id} value={subCat._id}>{subCat.name}</option>
//                   ))}
//                 </select>
//               </div>

            

              

//               <label>Color</label>
//                   <select
//                     className="form-control"
//                     id="color"
//                     name="color"
//                     value={color}
//                     onChange={(e) => {
//                       setColor(e.target.value);
//                       if (!imageFiles[e.target.value]) {
//                         setImageFiles((prev) => ({ ...prev, [e.target.value]: [] })); // Initialize an empty array for the new color
//                       }
//                       if (!stocks[e.target.value]) {
//                         setStocks((prevStocks) => ({ ...prevStocks, [e.target.value]: 0 })); // Initialize stock for the new color
//                       }
//                     }}
//                   >
//                     <option value="">Select Color</option>
//                     {getColors.map((colorOption) => (
//                       <option key={colorOption._id} value={colorOption.name}>
//                         {colorOption.Color}
//                       </option>
//                     ))}
//                   </select>

//                   {/* Image Upload Section */}
//                   {color && (
//                     <>
//                       <div className="form-group">
//                         <label htmlFor="image">Upload Images</label>
//                         <input
//                           type="file"
//                           className="form-control-file"
//                           id="image"
//                           multiple
//                           onChange={(e) => handleImageUpload(e, color)}
//                         />
//                       </div>

//                       {/* Stock Input Section */}
//                       <div className="form-group">
//                         <label htmlFor="stock">Stock for {color}</label>
//                         <input
//                           type="number"
//                           className="form-control"
//                           id="stock"
//                           value={stocks[color] || ""}
//                           onChange={(e) => handleStockChange(e, color)}
//                           placeholder="Enter stock quantity"
//                         />
//                       </div>
//                     </>
//                   )}

//                   {/* Display Uploaded Images and Stocks */}
//                   <div>
//                     {Object.keys(imageFiles).map((colorKey) => (
//                       <div key={colorKey}>
//                         <h5>Uploaded Images for {colorKey}:</h5>
//                         {imageFiles[colorKey].map((file, index) => (
//                           <p key={index}>{file.name}</p> // Display image names
//                         ))}
//                         {/* Display stock for each color */}
//                         <p>Stock: {stocks[colorKey] || "No stock set"}</p>
//                       </div>
//                     ))}
//                   </div>

//             </form>
//           </div>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>Close</Button>
//           <Button variant="primary" onClick={() => {
//             if (uid) {
//               updateDishes();
//             } else {
//               postDishes();
//             }
//             handleClose();
//           }}>
//             {uid ? "Update" : "Add"}
//           </Button>
//         </Modal.Footer>
//       </Modal>





      
//     </div>
//   );
// }

// export default Dishes;