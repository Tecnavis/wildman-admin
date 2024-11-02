



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import SideNav from "./SideNav";
// import { Button, Modal } from "react-bootstrap";
// import { MdDelete } from "react-icons/md";
// import { FiEdit } from "react-icons/fi";
// import { IoIosAddCircle } from "react-icons/io";
// import Tooltip from "@mui/material/Tooltip";

// function CardBanners() {
//   const backendUrl = process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL;
//   const [uid, setUid] = useState("");
//   const [show, setShow] = useState(false);
//   const [on, setOn] = useState(false);
 
//   const [image, setImage] = useState([]);
  
//   const [getBanner, setGetBanner] = useState([]);
// const [getBannerById, setGetBannerById] = useState([]);

  
   
 

//   const handleImage = (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     setImage(selectedFiles); // Store multiple files
//   };

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
//   const handleOff = () => setOn(false);
//   const [file, setFile] = useState("");

  
//   // Fetch dishes from the backend on component mount
//   useEffect(() => {
//     const fetch = async () => {
//       const token = localStorage.getItem('token'); // Get token from localStorage
//       try {
//         const response = await axios.get(`${backendUrl}/admin/getcardbanner`, {
//           headers: {
//             Authorization: `Bearer ${token}`,  // Include token for authentication
//           },
//         });
//         const data = response.data;
//         setGetBanner(data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     fetch();
//   }, [backendUrl]);
  
  
//   // Function to handle POST banners (with image upload)
//   const postDishes = async () => {
//     const token = localStorage.getItem('token');
//     const formData = new FormData();
  
//     // Append each file to formData
//     for (let i = 0; i < image.length; i++) {
//       formData.append("image", image[i]);
//     }
  
//     try {
//       await axios.post(`${backendUrl}/admin/postcardbanner`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,  // Include token for authentication
//           'Content-Type': 'multipart/form-data',  // Set content type for file upload
//         },
//       });
//       window.location.reload(); // Refresh page after successful post
//     } catch (err) {
//       console.log(err);
//     }
//   };
  
  
//   // Function to handle updating banners (with image upload)
//   const updateDishes = async () => {
//     const token = localStorage.getItem('token');
//     const formData = new FormData();
  
//     if (image) {
//       image.forEach(file => formData.append("image", file));
//     }
  
//     try {
//       await axios.put(`${backendUrl}/admin/putcardbanner/${uid}`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,  // Include token for authentication
//           'Content-Type': 'multipart/form-data',  // Set content type for file upload
//         },
//       });
//       window.location.reload(); // Refresh after update
//     } catch (err) {
//       console.error('Error updating dish:', err);
//     }
//   };
  
  
//   // Function to handle retrieving a banner by ID
//   const handleOn = async (id) => {
//     const token = localStorage.getItem('token');
//     setOn(true);
//     setUid(id);
  
//     try {
//       const response = await axios.get(`${backendUrl}/admin/getcardbannerbyid/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,  // Include token for authentication
//         },
//       });
//       const data = response.data;
//       setGetBannerById({
//         image: data.image || [], // Initialize image array
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };
  
  
//   // Function to handle deletion of banners
//   const handleDelete = async (id) => {
//     const token = localStorage.getItem('token');
//     const windowConfirmation = window.confirm("Are you sure to Delete this item");
//     if (windowConfirmation) {
//       try {
//         await axios.delete(`${backendUrl}/admin/deletecardbanner/${id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,  // Include token for authentication
//           },
//         });
//         window.location.reload(); // Refresh page after successful deletion
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   };
  
  



//   // JSX rendering with dynamic data
//   return (
//     <div>
//       <SideNav />
//       <div className="whole">
//         <div className=" main-contenet">
//           <div className="pl-3 row main-row">
//             <div className="col-12 my-sm-0 my-md-5 p-3 montserrat-400"
//                  style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
//               <h2><b>Banner</b></h2>
//               <Tooltip className="add_btn" title="Add">
//                 <IoIosAddCircle className="add_btn" onClick={handleShow} />
//               </Tooltip>
//             </div>
//             <div className="container table-responsive">
//               <table className="table table-striped table-bordered">
//                 <thead className="thead-dark">
//                   <tr>
//                     <th scope="col">Image</th>
                    
//                     <th scope="col">Actions</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {getBanner.map((items, index) => (
//                     <tr key={index}>
//                       <td>
//                         <div className="image-container">
//                           {items.image.map((image, idx) => (
//                             <img key={idx} className="avatar" src={`${backendUrl}/images/${image}`} alt={`Image ${idx + 1}`} />
//                           ))}
//                         </div>
//                       </td>
                     
//                       <td>
//                         <Tooltip title="Edit">
//                           <FiEdit style={{ color: "black", cursor: "pointer" }} onClick={() => handleOn(items._id)} />
//                         </Tooltip>
//                         <Tooltip title="Delete">
//                           <MdDelete style={{ color: "black", cursor: "pointer" }} onClick={() => handleDelete(items._id)} />
//                         </Tooltip>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
               
              
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Modal for adding dishes */}
//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add Banners</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <input className="my-3 input-style" style={{ width: "100%" }} type="file" name="image"  multiple    onChange={handleImage} />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={postDishes}>
//             Save
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       <Modal show={on} onHide={handleOff} className="montserrat-400">
//         <Modal.Header closeButton>
//           <Modal.Title>EDIT</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {/* Input fields for adding dishes */}
//           <input className="my-3 input-style" style={{ width: "100%" }} type="file" name="image" multiple onChange={handleImage} />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleOff}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={updateDishes}>
//             Save
//           </Button>
//         </Modal.Footer>
//       </Modal>
     


//     </div>
//   );
// }

// export default  CardBanners;

import React, { useEffect, useState } from "react";
import axios from "axios";
import SideNav from "./SideNav";
import { Button, Modal } from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { IoIosAddCircle } from "react-icons/io";
import Tooltip from "@mui/material/Tooltip";

function CardBanners() {
  const backendUrl = process.env.REACT_APP_MACHINE_TEST_1_BACKEND_URL;
  const [uid, setUid] = useState("");
  const [show, setShow] = useState(false);
  const [on, setOn] = useState(false);
  const [image, setImage] = useState([]);
  const [title, setTitle] = useState("");
  const [sentence, setSentence] = useState("");
  const [getBanner, setGetBanner] = useState([]);
  const [getBannerById, setGetBannerById] = useState([]);

  const handleImage = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setImage(selectedFiles); // Store multiple files
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleOff = () => setOn(false);

  // Fetch banners from the backend on component mount
  useEffect(() => {
    const fetch = async () => {
      const token = localStorage.getItem("token"); // Get token from localStorage
      try {
        const response = await axios.get(`${backendUrl}/admin/getcardbanner`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token for authentication
          },
        });
        const data = response.data;
        setGetBanner(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, [backendUrl]);

  // Function to handle POST banners (with image upload)
  const postDishes = async () => {
    const token = localStorage.getItem("token");
    const formData = new FormData();

    // Append title, sentence, and each file to formData
    formData.append("title", title);
    formData.append("sentence", sentence);
    for (let i = 0; i < image.length; i++) {
      formData.append("image", image[i]);
    }

    try {
      await axios.post(`${backendUrl}/admin/postcardbanner`, formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token for authentication
          "Content-Type": "multipart/form-data", // Set content type for file upload
        },
      });
      window.location.reload(); // Refresh page after successful post
    } catch (err) {
      console.log(err);
    }
  };

  // Function to handle updating banners (with image upload)
  const updateDishes = async () => {
    const token = localStorage.getItem("token");
    const formData = new FormData();

    formData.append("title", title);
    formData.append("sentence", sentence);
    if (image.length) {
      image.forEach((file) => formData.append("image", file));
    }

    try {
      await axios.put(`${backendUrl}/admin/putcardbanner/${uid}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token for authentication
          "Content-Type": "multipart/form-data", // Set content type for file upload
        },
      });
      window.location.reload(); // Refresh after update
    } catch (err) {
      console.error("Error updating banner:", err);
    }
  };

  // Function to handle retrieving a banner by ID
  const handleOn = async (id) => {
    const token = localStorage.getItem("token");
    setOn(true);
    setUid(id);

    try {
      const response = await axios.get(`${backendUrl}/admin/getcardbannerbyid/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token for authentication
        },
      });
      const data = response.data;
      setGetBannerById({
        title: data.title || "",
        sentence: data.sentence || "",
        image: data.image || [], // Initialize image array
      });
      setTitle(data.title || "");
      setSentence(data.sentence || "");
    } catch (err) {
      console.log(err);
    }
  };

  // Function to handle deletion of banners
  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    const windowConfirmation = window.confirm("Are you sure to Delete this item");
    if (windowConfirmation) {
      try {
        await axios.delete(`${backendUrl}/admin/deletecardbanner/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token for authentication
          },
        });
        window.location.reload(); // Refresh page after successful deletion
      } catch (err) {
        console.log(err);
      }
    }
  };

  // JSX rendering with dynamic data
  return (
    <div>
      <SideNav />
      <div className="whole">
        <div className="main-content">
          <div className="pl-3 row main-row">
            <div className="col-12 my-sm-0 my-md-5 p-3 montserrat-400" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h2>
                <b>Banner</b>
              </h2>
              <Tooltip className="add_btn" title="Add">
                <IoIosAddCircle className="add_btn" onClick={handleShow} />
              </Tooltip>
            </div>
            <div className="container table-responsive">
              <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Title</th>
                    <th scope="col">Sentence</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {getBanner.map((items, index) => (
                    <tr key={index}>
                      <td>
                        <div className="image-container">
                          {items.image.map((image, idx) => (
                            <img key={idx} className="avatar" src={`${backendUrl}/images/${image}`} alt={`Image ${idx + 1}`} />
                          ))}
                        </div>
                      </td>
                      <td>{items.title}</td>
                      <td>{items.sentence}</td>
                      <td>
                        <Tooltip title="Edit">
                          <FiEdit style={{ color: "black", cursor: "pointer" }} onClick={() => handleOn(items._id)} />
                        </Tooltip>
                        <Tooltip title="Delete">
                          <MdDelete style={{ color: "black", cursor: "pointer" }} onClick={() => handleDelete(items._id)} />
                        </Tooltip>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for adding banners */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Banner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input className="my-3 input-style" style={{ width: "100%" }} type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input className="my-3 input-style" style={{ width: "100%" }} type="text" placeholder="Sentence" value={sentence} onChange={(e) => setSentence(e.target.value)} />
          <input className="my-3 input-style" style={{ width: "100%" }} type="file" name="image" multiple onChange={handleImage} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={postDishes}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for editing banners */}
      <Modal show={on} onHide={handleOff} className="montserrat-400">
        <Modal.Header closeButton>
          <Modal.Title>Edit Banner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input className="my-3 input-style" style={{ width: "100%" }} type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input className="my-3 input-style" style={{ width: "100%" }} type="text" placeholder="Sentence" value={sentence} onChange={(e) => setSentence(e.target.value)} />
          <input className="my-3 input-style" style={{ width: "100%" }} type="file" name="image" multiple onChange={handleImage} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleOff}>
            Close
          </Button>
          <Button variant="primary" onClick={updateDishes}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CardBanners;
