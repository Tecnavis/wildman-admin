import React, { useEffect, useState } from "react";
import axios from "axios";
import SideNav from "./SideNav";
import { Button, Modal, Table } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { IoIosAddCircle } from "react-icons/io";
import Tooltip from "@mui/material/Tooltip";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import PaginationSection from "./PaginationSection";
// import Swal from 'sweetalert2';

function Dishes() {
  const backendUrl = process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL;
  const [uid, setUid] = useState(null); // Stores the id of the dish being edited
  const [show, setShow] = useState(false);
  const [on, setOn] = useState(false);
  const [dishes, setDishes] = useState("");
  const [description, setDescription] = useState("");
  const [oldprice, setOldPrice] = useState("");
  const [newprice, setNewPrice] = useState("");

  const [purchaseprice, setPurchasePrice] = useState("");
  const [gst, setGst] = useState("");
  const [Hsncode, setHsncode] = useState("");
  const [sku, setSku] = useState("");
  const [length, setLength] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [status, setStatus] = useState("");
  const [Coverimage, setCoverimage] = useState(null);

  console.log("profile is", Coverimage)


  const [image, setImage] = useState([]);
  const [Itemnumber, setItemnumber] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [color, setColor] = useState("");
  const [productcare, setProductcare] = useState("");
  const [features, setFeatures] = useState("");
  const [maincategory, setMaincategory] = useState("");
  const [categories, setCategories] = useState("");
  const [subcategories, setSubcategories] = useState("");
  const [getMaincategories, setGetMaincategories] = useState([]);
  const [getCategories, setGetCategories] = useState([]);
  const [getSubcategories, setGetSubcategories] = useState([]);
  const [getDishes, setGetDishes] = useState([]);
  const [getColors, setGetColors] = useState([]);
  const [additionalDetails, setAdditionalDetails] = useState([]); // Initialize as an empty array
  


  const [imageFiles, setImageFiles] = useState({});
  const [stocks, setStocks] = useState({});
  const [selectedColors, setSelectedColors] = useState({}); // To manage selected colors for each item
  const [selectedItem, setSelectedItem] = useState(null); // Track selected item for modal
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [isEditing, setIsEditing] = useState(false);
  const [getDishesById, setGetDishesById] = useState({
    purchaseprice:"",
    gst:"",
    Hsncode:"",
    sku:"",
    length:"",
    width:"",
    height:"",
    weight:"",
    status:"",
    dishes: "",
    oldprice: "",
    newprice: "",
    description: "",
    Itemnumber: "",
    manufacturer: "",
    color: "",
    productcare: "",
    features: "",
    mainCategory: "",
    category: "",
    subcategory: "",
    Coverimage: "",  // Add Coverimage here

  });

  const handleCoverImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setGetDishesById((prevState) => ({
        ...prevState,
        Coverimage: selectedFile,
    }));
};

  const handleImage = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImage(selectedFiles);
  };

  const  handleImageUpload = (event, selectedColor) => {
    const files = Array.from(event.target.files);
    setImageFiles((prev) => ({
      ...prev,
      [selectedColor]: [...prev[selectedColor], ...files],
    }));
  };

       

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setGetDishesById({
      purchaseprice:"",
      gst:"",
      Hsncode:"",
      sku:"",
      length:"",
      width:"",
      height:"",
      weight:"",
      status:"",
      dishes: "",
      oldprice: "",
      newprice: "",
      description: "",
      Itemnumber: "",
      manufacturer: "",
      color: "",
      productcare: "",
      features: "",
      mainCategory: "",
      category: "",
      subcategory: "",
      Coverimage: "",  // Add Coverimage here
    });
    setIsEditing(false); // Set to false for add mode
    setShow(true);
  };
  const handleOff = () => setOn(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        const [mainCatResponse, catResponse, subCatResponse, dishesResponse] =
          await Promise.all([
            axios.get(`${backendUrl}/admin/getmaincategories`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get(`${backendUrl}/admin/getcategories`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get(`${backendUrl}/admin/getsubcategories`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get(`${backendUrl}/admin/getdishes`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
          ]);

        setGetMaincategories(mainCatResponse.data);
        setGetCategories(catResponse.data);
        setGetSubcategories(subCatResponse.data);
        setGetDishes(dishesResponse.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchColors = async () => {
      try {
        const response = await axios.get(`${backendUrl}/admin/getcolors`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGetColors(response.data);
      } catch (err) {
        console.error(err);
        alert("An error occurred while fetching colors.");
      }
    };

    fetchData();
    fetchColors();
  }, [backendUrl]);

  // const postDishes = async () => {
  //   const token = localStorage.getItem("token");
  //   const formData = new FormData();

  //   // Append basic details
  //   formData.append("dishes", dishes);
  //   formData.append("description", description);
  //   formData.append("category", categories);
  //   formData.append("maincategories", maincategory);
  //   formData.append("subcategories", subcategories);
  //   formData.append("oldprice", oldprice);
  //   formData.append("newprice", newprice);
  //   formData.append("Itemnumber", Itemnumber);
  //   formData.append("manufacturer", manufacturer);
  //   formData.append("productcare", productcare);
  //   formData.append("features", features);
  //   formData.append("purchaseprice", purchaseprice);
  //   formData.append("gst", gst);
  //   formData.append("Hsncode", Hsncode);
  //   formData.append("sku", sku);
  //   formData.append("length", length);
  //   formData.append("width", width);
  //   formData.append("height", height);
  //   formData.append("weight", weight);



  //   // Append images and stock for each color
  //   for (const [colorKey, files] of Object.entries(imageFiles)) {
  //     files.forEach((file, index) => {
  //       formData.append(`images_${colorKey}_${index}`, file); // Append image
  //       formData.append(`stock_${colorKey}`, stocks[colorKey] || 0); // Append stock for the color
  //     });
  //   }

  //   try {
  //     await axios.post(`${backendUrl}/admin/postdishes`, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     window.location.reload();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleAddDetail = () => {
    setAdditionalDetails([...additionalDetails, { heading: '', details: '' }]); // Correct field name is "details"
};

const handleDetailChange = (index, field, value) => {
  const updatedDetails = additionalDetails.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
  );
  setAdditionalDetails(updatedDetails);
};

  const postDishes = async () => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
  
    // Append basic details
    formData.append("dishes", dishes);
    formData.append("description", description);
    formData.append("category", categories); // Ensure consistency with backend key
    formData.append("mainCategory", maincategory); // Matches backend's 'mainCategory'
    formData.append("subcategories", subcategories); // Consistent with backend key
    formData.append("oldprice", oldprice);
    formData.append("newprice", newprice);
    formData.append("Itemnumber", Itemnumber);
    formData.append("manufacturer", manufacturer);
    formData.append("productcare", productcare);
    formData.append("features", features);
    formData.append("purchaseprice", purchaseprice);
    formData.append("gst", gst);
    formData.append("Hsncode", Hsncode);
    formData.append("sku", sku);
    formData.append("length", length);
    formData.append("width", width);
    formData.append("height", height);
    formData.append("weight", weight);
    formData.append("status", status);
    if (Coverimage) {
      formData.append("Coverimage", Coverimage);
  }
  // Append additional details
  additionalDetails.forEach((detail, index) => {
    formData.append(`additionalDetails[${index}][heading]`, detail.heading);
    formData.append(`additionalDetails[${index}][details]`, detail.details);
});
  
    // Append images and stock for each color
    for (const [colorKey, files] of Object.entries(imageFiles)) {
      files.forEach((file, index) => {
        formData.append(`images_${colorKey}_${index}`, file); // Append image
        formData.append(`stock_${colorKey}`, stocks[colorKey] || 0); // Append stock for the color
      });
    }
  
    try {
      await axios.post(`${backendUrl}/admin/postdishes`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  
  const handleEdit = async (id) => {
    const token = localStorage.getItem("token");
    setShow(true); // This triggers the modal to open
    setUid(id);
    setIsEditing(true); // Set to true for edit mode

    try {
      const response = await axios.get(`${backendUrl}/admin/product/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.data; // Assuming the data is nested under 'data' key
      setGetDishesById({
        dishes: data.dishes,
        oldprice: data.oldprice,
        newprice: data.newprice,
        description: data.description,
        Itemnumber: data.Itemnumber,
        manufacturer: data.manufacturer,
        color: data.color,
        productcare: data.productcare,
        features: data.features,
        purchaseprice:data.purchaseprice,
        gst:data.gst,
        Hsncode:data.Hsncode,
        sku:data.sku,
        status:data.status,
        length:data.length,
        width:data.width,
        height:data.height,
        weight:data.weight,
        mainCategory: data.category?.mainCategory?._id || "",
        category: data.category?._id || "",
        subcategory: data.subcategory?._id || "",
        image: data.images || {},
        Coverimage: data.Coverimage, // Set Coverimage here
      });
      setMaincategory(data.category?.mainCategory?._id || "");
      setCategories(data.category?._id || "");
      setSubcategories(data.subcategory?._id || "");

      // Set other state variables as needed
      setDishes(data.dishes);
      setOldPrice(data.oldprice);
      setNewPrice(data.newprice);
      setDescription(data.description);
      setItemnumber(data.Itemnumber);
      setManufacturer(data.manufacturer);
      setProductcare(data.productcare);
      setFeatures(data.features);
      setPurchasePrice(data.purchaseprice);
      setGst(data.gst);
      setHsncode(data.Hsncode);
      setSku(data.sku);
      setLength(data.length);
      setWidth(data.width);
      setHeight(data.height);
      setWeight(data.weight);
      setStatus(data.status);


      

      // Set image files and stocks
      setImageFiles(data.images || {});
      setStocks(
        Object.fromEntries(
          Object.entries(data.images || {}).map(([color, images]) => [
            color,
            images[0]?.stock || 0,
          ])
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  // Function to handle input changes in the edit modal
  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setGetDishesById((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const updateDishes = async () => {
    const token = localStorage.getItem("token");
    const formData = new FormData();

    // Append Cover Image only if it's a new file
  if (getDishesById.Coverimage instanceof File) {
    formData.append("Coverimage", getDishesById.Coverimage);
  }


    // Append stock and images to the form data
  Object.entries(imageFiles).forEach(([colorKey, files]) => {
    files.forEach((file, index) => {
      if (file instanceof File) {
        formData.append(`image_${colorKey}_${index}`, file);
      }
    });
    if (stocks[colorKey] !== undefined) {
      formData.append(`stock_${colorKey}`, stocks[colorKey]);
    }
  });

  
    // Helper function to append non-empty values
    const appendIfNotEmpty = (key, value) => {
      if (value && value !== "") {
        formData.append(key, value);
      }
    };

    // Append existing details for the dish
    appendIfNotEmpty("dishes", getDishesById.dishes);
    appendIfNotEmpty("description", getDishesById.description);
    appendIfNotEmpty("oldprice", getDishesById.oldprice);
    appendIfNotEmpty("newprice", getDishesById.newprice);
    appendIfNotEmpty("category", getDishesById.category);
    appendIfNotEmpty("subcategory", getDishesById.subcategory);
    appendIfNotEmpty("Itemnumber", getDishesById.Itemnumber);
    appendIfNotEmpty("productcare", getDishesById.productcare);
    appendIfNotEmpty("manufacturer", getDishesById.manufacturer);
    appendIfNotEmpty("features", getDishesById.features);

    appendIfNotEmpty("purchaseprice", getDishesById.purchaseprice);
    appendIfNotEmpty("gst", getDishesById.gst);
    appendIfNotEmpty("Hsncode", getDishesById.Hsncode);
    appendIfNotEmpty("sku", getDishesById.sku);
    appendIfNotEmpty("length", getDishesById.length);
    appendIfNotEmpty("width", getDishesById.width);
    appendIfNotEmpty("weight", getDishesById.weight);
    appendIfNotEmpty("height", getDishesById.height);
    appendIfNotEmpty("status", getDishesById.status);



    // Loop through imageFiles and stocks to append new images and stock
    Object.entries(imageFiles).forEach(([colorKey, files]) => {
      files.forEach((file, index) => {
        if (file instanceof File) {
          formData.append(`image_${colorKey}_${index}`, file);
        }
      });
      if (stocks[colorKey] !== undefined) {
        formData.append(`stock_${colorKey}`, stocks[colorKey]);
      }
    });

    try {
      const response = await axios.put(
        `${backendUrl}/admin/product/${uid}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log("Product updated successfully");
        window.location.reload();
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (err) {
      console.error("Error updating dish:", err.response?.data || err.message);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    const windowConfirmation = window.confirm(
      "Are you sure to Delete this item"
    );
    if (windowConfirmation) {
      try {
        await axios.delete(`${backendUrl}/admin/deletedishes/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        window.location.reload();
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Filtering logic
  const filteredCategories = getCategories.filter(
    (cat) =>
      cat.maincategoriesData && cat.maincategoriesData._id === maincategory
  );

  const filteredSubcategories = getSubcategories.filter(
    (subCat) => subCat.category && subCat.category._id === categories
  );

  const handleStockChange = (e, colorKey) => {
    setStocks((prevStocks) => ({
      ...prevStocks,
      [colorKey]: e.target.value, // Update stock for the selected color
    }));
  };



  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10); // Number of items per page

  // Logic for pagination
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = getDishes.slice(indexOfFirstData, indexOfLastData);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(getDishes.length / dataPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  const handleViewMore = (item) => {
    setSelectedItem(item); // Set the selected item to display in the modal
    setShowModal(true); // Show the modal
  };

  // Handle modal close
  const handleClosemodal = () => {
    setShowModal(false); // Hide the modal
    setSelectedItem(null); // Clear selected item
  };
  return (
    <div>
      <SideNav />
      <div className="whole">
        <div className="main-content">
          <div className="pl-3 row main-row">
            <div
              className="col-12 my-sm-0 my-md-5 p-3 montserrat-400"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <h2>
                <b>ITEMS</b>
              </h2>
              <Tooltip className="add_btn" title="Add">
                <IoIosAddCircle className="add_btn" onClick={handleShow} />
              </Tooltip>
            </div>

            <div className="container">
              {/* Scrollable table container */}
              <OverlayScrollbarsComponent>
                <Table className="table table-striped table-bordered">
                  <thead className="thead-dark">
                    <tr>
                    <th scope="col">Cover-Image</th>

                      <th scope="col">Images</th>
                      <th scope="col">Item Number</th>
                      <th scope="col">Name</th>
                      <th scope="col">MRP Price</th>
                      <th scope="col">Sale Price</th>
                      <th scope="col">Color/Stock-status</th>
                      <th scope="col">Status</th>

                      

                      <th scope="col">Viewmore</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.length === 0 ? (
                      <tr>
                        <td colSpan="12" className="text-center">
                          No products have been added yet.
                        </td>
                      </tr>
                    ) : (
                      currentData.map((items, index) => (
                        <tr key={index}>
                          <td>
                            {items.Coverimage && (
                              <div className="cover-image-container">
                                <img
                                  className="avatar"
                                  src={`${backendUrl}/images/${items.Coverimage}`}
                                  alt="Cover Image"
                                />
                              </div>
                            )}
                          </td>
                          <td>
                            <div className="image-container">
                              {items.images &&
                                Object.keys(items.images).map((colorKey) =>
                                  items.images[colorKey].map(
                                    (image, imageIdx) => (
                                      <img
                                        key={imageIdx}
                                        className="avatar"
                                        src={`${backendUrl}/images/${image.image}`}
                                        alt={`Dish Image ${imageIdx + 1}`}
                                      />
                                    )
                                  )
                                )}
                            </div>
                          </td>
                          <td className="text-black item-text">
                            {items.Itemnumber}
                          </td>
                          <td className="text-black item-text">
                            <b>{items.dishes}</b>
                          </td>
                          <td className="text-black item-text">
                            {items.oldprice}
                          </td>
                          <td className="text-black item-text">
                            {items.newprice}
                          </td>

                          <td className="text-black item-text">
                            {items.images &&
                              Object.keys(items.images).map((colorKey) =>
                                items.images[colorKey].map(
                                  (image, imageIdx) => (
                                    <div key={imageIdx}>
                                      {colorKey} - Stock: {image.stock} -
                                      {image.stock === 0 ? (
                                        <span className="text-danger">
                                          Out of Stock
                                        </span>
                                      ) : image.stock < 10 ? (
                                        <span className="text-warning">
                                          Only Few Left
                                        </span>
                                      ) : (
                                        <span className="text-success">
                                          In Stock
                                        </span>
                                      )}
                                    </div>
                                  )
                                )
                              )}
                          </td>
                          <td className="text-black item-text">
                            <b>{items.status}</b>
                          </td>
                          <td className="text-center">
                            <button
                              onClick={() => handleViewMore(items)}
                              style={{
                                backgroundColor: "white",
                                border: "none",
                              }}
                            >
                              ViewMore
                            </button>
                          </td>
                          <td className="text-black item-text">
                            <Tooltip title="Edit">
                              <FiEdit
                                onClick={() => handleEdit(items._id)}
                                className="edit-icon"
                              />
                            </Tooltip>
                            <Tooltip title="Delete">
                              <MdDelete
                                onClick={() => handleDelete(items._id)}
                                className="delete-icon"
                              />
                            </Tooltip>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </OverlayScrollbarsComponent>

              {/* Pagination Section */}
              <PaginationSection
                currentPage={currentPage}
                totalPages={totalPages}
                paginate={paginate}
                pageNumbers={pageNumbers}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bootstrap Modal for View More */}
      <Modal show={showModal} onHide={handleClosemodal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <div>
              <p>
                <strong>Description:</strong> {selectedItem.description}
              </p>
              <p>
                <strong>Manufacturer:</strong> {selectedItem.manufacturer}
              </p>
              <p>
                <strong>Product Care:</strong> {selectedItem.productcare}
              </p>
              <p>
                <strong>Features:</strong> {selectedItem.features}
              </p>
              <p>
                <strong>Category:</strong>{" "}
                {selectedItem.category?.name || "No Category"}
              </p>
              <p>
                <strong>SKU:</strong> {selectedItem.sku}
              </p>
              <p>
                <strong>Hsncode:</strong> {selectedItem.Hsncode}
              </p>
              <p>
                <strong>purchaseprice:</strong> RS:{selectedItem.purchaseprice}
              </p>
              <p>
                <strong>gst:</strong> {selectedItem.gst}%
              </p>
              <p>
                <strong>length:</strong> {selectedItem.length}
              </p>
              <p>
                <strong>width:</strong> {selectedItem.width}
              </p>
              <p>
                <strong>height:</strong> {selectedItem.height}
              </p>
              <p>
                <strong>weight:</strong> {selectedItem.weight}
              </p>
              {selectedItem.additionalDetails && selectedItem.additionalDetails.length > 0 ? (
                    selectedItem.additionalDetails.map((detail, index) => (
                        <div key={index} className="mb-3">
                            <p>
                                <strong>{detail.heading}:</strong> {detail.details}
                            </p>
                        </div>
                    ))
                ) : (
                    <p>No additional details available.</p>
                )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosemodal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for adding/editing dishes */}
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditing ? "Edit Product" : "Add Product"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <form>

              <label>Item Number</label>
              <input
                type="text"
                className="form-control"
                name="Itemnumber"
                value={isEditing ? getDishesById.Itemnumber : Itemnumber}
                onChange={
                  isEditing
                    ? handleUpdateChange
                    : (e) => setItemnumber(e.target.value)
                }
              />

            <label>Cover Image</label>
            <input
                type="file"
                className="form-control"
                name="Coverimage"
                onChange={
                  isEditing
                    ? handleCoverImageChange
                  : (e) => setCoverimage(e.target.files[0])
                }

            />


              <label>Product</label>
              <input
                type="text"
                className="form-control"
                name="dishes"
                value={isEditing ? getDishesById.dishes : dishes}
                onChange={
                  isEditing
                    ? handleUpdateChange
                    : (e) => setDishes(e.target.value)
                }
              />
              
              <div className="row">
              <div className="col-md-3">  
                <label>MRP Price</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="MRP Price"
                  name="oldprice"
                  value={isEditing ? getDishesById.oldprice : oldprice}
                  onChange={
                    isEditing
                      ? handleUpdateChange
                      : (e) => setOldPrice(e.target.value)
                  }
                />
              </div>
              <div className="col-md-3">
                <label>SALE Price</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="(GST excluded)"
                  name="newprice"
                  value={isEditing ? getDishesById.newprice : newprice}
                  onChange={
                    isEditing
                      ? handleUpdateChange
                      : (e) => setNewPrice(e.target.value)
                  }
                />
              </div>
              <div className="col-md-3">
                <label>Purchase Price</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder=" Purchase Price"
                    name="purchaseprice"
                    value={isEditing ? getDishesById.purchaseprice : purchaseprice}
                    onChange={
                      isEditing
                        ? handleUpdateChange
                        : (e) => setPurchasePrice(e.target.value)
                    }
                  />
              </div>
              <div className="col-md-3">
                <label>GST Rate</label>
                <select
                  className="form-select"  // Updated class for better Bootstrap styling and dropdown arrow
                  name="gst"
                  value={isEditing ? getDishesById.gst : gst}
                  onChange={
                    isEditing
                      ? handleUpdateChange
                      : (e) => setGst(e.target.value)
                  }
                >
                  <option value="">Select GST Rate</option>
                  <option value="0">0%</option>
                  <option value="0.1">0.1%</option>
                  <option value="0.25">0.25%</option>
                  <option value="1">1%</option>
                  <option value="1.5">1.5%</option>
                  <option value="3">3%</option>
                  <option value="5">5%</option>
                  <option value="6">6%</option>
                  <option value="7.5">7.5%</option>
                  <option value="12">12%</option>
                  <option value="18">18%</option>
                  <option value="28">28%</option>
                  <option value="Exempted">Exempted</option>
                  <option value="No GST">No GST</option>
                </select>
              </div>
              </div>
              
              <div className='row'>
              <div className="col-md-4">
                  <div className="form-group">
                    <label htmlFor="maincategory">Main Category</label>
                    <select
                      className="form-control"
                      id="maincategory"
                      name="mainCategory"
                      value={getDishesById.mainCategory}
                      onChange={(e) => {
                        setMaincategory(e.target.value);
                        handleUpdateChange(e);
                      }}
                    >
                      <option value="">Select Main Category</option>
                      {getMaincategories.map((mainCat) => (
                        <option key={mainCat._id} value={mainCat._id}>
                          {mainCat.maincategories}
                        </option>
                      ))}
                    </select>
                  </div>
              </div>
              <div className="col-md-4">
                      
                <div className="form-group">
                  <label htmlFor="categories">Category</label>
                  <select
                    className="form-control"
                    id="categories"
                    name="category"
                    value={getDishesById.category}
                    onChange={(e) => {
                      setCategories(e.target.value);
                      handleUpdateChange(e);
                    }}
                  >
                    <option value="">Select Category</option>
                    {filteredCategories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="subcategories">Subcategory</label>
                  <select
                    className="form-control"
                    id="subcategories"
                    name="subcategory"
                    value={getDishesById.subcategory}
                    onChange={handleUpdateChange}
                  >
                    <option value="">Select Subcategory</option>
                    {filteredSubcategories.map((subCat) => (
                      <option key={subCat._id} value={subCat._id}>
                        {subCat.name}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              </div>
            
              <div className='row'>
                <div className='col-md-6'>
                  <label>SKU / Good code</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter product SKU here"
                      name="sku"
                      value={isEditing ? getDishesById.sku : sku}
                      onChange={
                        isEditing
                          ? handleUpdateChange
                          : (e) => setSku(e.target.value)
                      }
                    />
                </div>
                <div className='col-md-6'>
                  <label>HSN code</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="4-8 digit code"
                      name="Hsncode"
                      value={isEditing ? getDishesById.Hsncode : Hsncode}
                      onChange={
                        isEditing
                          ? handleUpdateChange
                          : (e) => setHsncode(e.target.value)
                      }
                    />
                </div>

              </div>

              
              
              <label>Description</label>
              <textarea
                className="form-control"
                value={isEditing ? getDishesById.description : description}
                name="description"
                onChange={
                  isEditing
                    ? handleUpdateChange
                    : (e) => setDescription(e.target.value)
                }
              />

              <div className='row'>
                <div className='col-md-3'>
                  <label>Length</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Length"
                      name="length"
                      value={isEditing ? getDishesById.length : length}
                      onChange={
                        isEditing
                          ? handleUpdateChange
                          : (e) => setLength(e.target.value)
                      }
                    />
                </div>
                <div className='col-md-3'>
                <label>width</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter width"
                      name="width"
                      value={isEditing ? getDishesById.width : width}
                      onChange={
                        isEditing
                          ? handleUpdateChange
                          : (e) => setWidth(e.target.value)
                      }
                    />
                </div>
                <div className='col-md-3'>
                <label>Height</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter height"
                      name="height"
                      value={isEditing ? getDishesById.height : height}
                      onChange={
                        isEditing
                          ? handleUpdateChange
                          : (e) => setHeight(e.target.value)
                      }
                    />
                </div>
                <div className='col-md-3'>
                <label>weight</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter weight"
                      name="weight"
                      value={isEditing ? getDishesById.weight : weight}
                      onChange={
                        isEditing
                          ? handleUpdateChange
                          : (e) => setWeight(e.target.value)
                      }
                    />
                </div>
              </div>

             
                        


              <label>Manufacturer</label>
              <textarea
                type="text"
                className="form-control"
                placeholder="Enter Manufacturer"
                value={isEditing ? getDishesById.manufacturer : manufacturer}
                name="manufacturer"

                onChange={
                  isEditing
                    ? handleUpdateChange
                    : (e) => setManufacturer(e.target.value)
                }
              />

              <label>Product Care</label>
              <textarea
                type="text"
                className="form-control"
                placeholder="Enter Product Care"
                name="productcare"

                value={isEditing ? getDishesById.productcare : productcare}
                onChange={
                  isEditing
                    ? handleUpdateChange
                    : (e) => setProductcare(e.target.value)
                }
              />

              <label>Features</label>
              <textarea
                type="text"
                className="form-control"
                name="features"
                value={isEditing ? getDishesById.features : features}
                onChange={
                  isEditing
                    ? handleUpdateChange
                    : (e) => setFeatures(e.target.value)
                }
              />

                            
              <div>
                <label>Status:</label>
                <div>
                  <label>
                    <input 
                      type="radio" 
                      name="status" 
                      value="active" 
                      checked={status === 'active'} 
                      onChange={(e) => setStatus(e.target.value)} 
                    /> 
                    Active
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="status" 
                      value="inactive" 
                      checked={status === 'inactive'} 
                      onChange={(e) => setStatus(e.target.value)} 
                    /> 
                    Inactive
                  </label>
                </div>
                <div style={{ marginTop: '10px' }}>
                  <span
                      style={{
                          color: status === 'active' ? 'green' : 'red',
                          fontWeight: 'bold',
                      }}
                  >
                      {status === 'active' ? 'Active' : 'Inactive'}
                  </span>
              </div>
           
              </div>

              <div>
              
                <button type="button" className="btn btn-success" onClick={handleAddDetail}>
                    Add More 
                </button>

                {additionalDetails.map((detail, index) => (
                  <div key={index} className="mt-2">
                      <label> Heading</label>
                      <input
                          type="text"
                          className="form-control"
                          value={detail.heading}
                          onChange={(e) => handleDetailChange(index, 'heading', e.target.value)} 
                      />

                      <label>Details</label>
                      <textarea
                          className="form-control"
                          value={detail.details} 
                          onChange={(e) => handleDetailChange(index, 'details', e.target.value)} 
                      />
                  </div>
              ))}

              </div>


              
              <div className="col-md-3 mb-3">
                <label>Color</label>
                <select
                  className="form-select" 
                  id="color"
                  name="color"
                  value={color}
                  onChange={(e) => {
                    setColor(e.target.value);
                    if (!imageFiles[e.target.value]) {
                      setImageFiles((prev) => ({
                        ...prev,
                        [e.target.value]: [],
                      })); 
                    }
                    if (!stocks[e.target.value]) {
                      setStocks((prevStocks) => ({
                        ...prevStocks,
                        [e.target.value]: 0,
                      })); 
                    }
                  }}
                >
                  <option value="">Select Color</option>
                  {getColors.map((colorOption) => (
                    <option key={colorOption._id} value={colorOption.name}>
                      {colorOption.Color}
                    </option>
                  ))}
                </select>
              </div>

              {color && (
                <div className="mb-3">
                  <div className="form-group mb-3">
                    <label htmlFor="image" className="form-label">Upload Images</label>
                    <input
                      type="file"
                      className="form-control"
                      id="image"
                      multiple
                      onChange={(e) => handleImageUpload(e, color)}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="stock" className="form-label">Stock for {color}</label>
                    <input
                      type="number"
                      className="form-control"
                      id="stock"
                      value={stocks[color] || ""}
                      onChange={(e) => handleStockChange(e, color)}
                      placeholder="Enter stock quantity"
                    />
                  </div>
                </div>
              )}

              <div className="mb-3">
                {Object.keys(imageFiles).map((colorKey) => (
                  <div key={colorKey} className="border rounded p-3 mb-3">
                    <h5 className="text-primary">Uploaded Images for {colorKey}:</h5>
                    <div className="mb-2">
                      {imageFiles[colorKey].map((file, index) => (
                        <span key={index} className="badge bg-secondary me-2">
                          {file.name}
                        </span> 
                      ))}
                    </div>
                    <p><strong>Stock:</strong> {stocks[colorKey] || "No stock set"}</p>
                  </div>
                ))}
              </div>


            

   
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              if (isEditing) {
                updateDishes();
              } else {
                postDishes();
              }
              handleClose();
            }}
          >
            {isEditing ? "Update" : "Add"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Dishes;
