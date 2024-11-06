


import React from 'react';
import { Link } from 'react-router-dom';


function SideNav() {

  
  
 

  return (
    <div className="container">
      <div>
        <div className="side-nav" >
          {/* <div className="sn1section mt-3">
            <img className="logo" src={Logs} alt="Logo" />
          </div> */}

          <div className="sn2section mt-5">
            <ul className="montserrat-400">
              <Link to="/home" className="link" activeClassName="active">
                <li className="py-3" >
                  {/* <span className="icon">📂</span>  */}
                  <span className="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">
                    <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5"/>
                  </svg>
                  </span> 

                  <span className="text">Dashboard</span>
                </li>
              </Link>
                <Link to="/orders" className="link" activeClassName="active">
                  <li className="py-3" >
                    <span className="icon">📂</span> {/* replace with your icon */}
                    <span className="text">Orders</span>
                  </li>
                </Link>
                <Link to="/customer" className="link" activeClassName="active">
                  <li className="py-3" >
                    <span className="icon">📂</span> {/* replace with your icon */}
                    <span className="text">Customer</span>
                  </li>
                </Link>
              <Link to="/cardbanner" className="link" activeClassName="active">
                  <li className="py-3" >
                    <span className="icon">📂</span> {/* replace with your icon */}
                    <span className="text">CardBanner</span>
                  </li>
                </Link>
                <Link to="/banners" className="link" activeClassName="active">
                  <li className="py-3" >
                    <span className="icon">📂</span> {/* replace with your icon */}
                    <span className="text">Banner</span>
                  </li>
                </Link>
              {/* <Link to="/home" className="link" activeClassName="active">
                <li className="py-3" >
                  <span className="icon">📂</span> 
                  <span className="text">DASHBOARD</span>
                </li>
              </Link> */}
                <Link to="/colors" className="link" activeClassName="active">
                <li className="py-3" >
                  <span className="icon">📂</span> {/* replace with your icon */}
                  <span className="text">Colors</span>
                </li>
              </Link>
              <Link to="/maincategories" className="link" activeClassName="active">
                <li className="py-3" >
                  <span className="icon">📂</span> {/* replace with your icon */}
                  <span className="text">MainCategories</span>
                </li>
              </Link>
              <Link to="/categories" className="link" activeClassName="active">
                <li className="py-3" >
                  <span className="icon">📂</span> {/* replace with your icon */}
                  <span className="text">Categories</span>
                </li>
              </Link>
              <Link to="/subcategories" className="link" activeClassName="active">
                <li className="py-3" >
                  <span className="icon">📂</span> {/* replace with your icon */}
                  <span className="text">Subcategories</span>
                </li>
              </Link>
              <Link to="/coupon" className="link" activeClassName="active">
                <li className="py-3" >
                  <span className="icon">📂</span> {/* replace with your icon */}
                  <span className="text">Coupon</span>
                </li>
              </Link>
              <Link to="/demo" className="link" activeClassName="active">
                <li className="py-3">
                <span className="icon">📂</span> {/* replace with your icon */}
                  <span className="text">Items</span>
                </li>
              </Link>
              <Link to="/settings" className="link" activeClassName="active">
                <li className="py-3">
                  <span className="icon">📂</span>
                  <span className="text">Settings</span>
                </li>
              </Link>
                     
            </ul>
              {/* <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', border: 'none', backgroundColor: '#f44336', color: 'white', borderRadius: '4px', cursor: 'pointer' ,marginTop:'4rem',marginLeft:'3rem'}}>
                <FiLogOut size={20} />
                Logout
              </button> */}
              
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideNav;







// import React from 'react'
// import Logs from '../Images/bgg.png';
// import {Link} from 'react-router-dom'
// function SideNav() {
//   return (
//     <div>
//         <div className="container">
//             <div className="row">
//                 <div className="col-3 side-nav" style={{width:'15%'}}>
//                   <div className="sn1section mt-3">
//                         <img className='logo' src={Logs} alt="" />
//                   </div>
//                   <div>
//                     {/* <h3 style={{color:"#b20769"}}>Dashboard</h3> */}
//                   </div>
//                   <div className='sn2section mt-5'>
//                     <ul className='montserrat-400'  style={{listStyle:'none', cursor:'pointer'}}>
                        
//                        {/* <Link style={{textDecoration:'none'}} to='/categories'><li className='py-3 text-light'>DASHBORD</li></Link>  */}
//                        <Link style={{textDecoration:'none'}} to='/categories'><li className='py-3' style={{color:"#b20769"}}><b>CATEGORIES</b></li></Link> 
//                        <Link style={{textDecoration:'none'}} to='/dishes'><li className='py-3' style={{color:"#b20769"}}><b>ITEMS</b></li></Link> 
//                     </ul>
//                   </div>
//                 </div>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default SideNav
