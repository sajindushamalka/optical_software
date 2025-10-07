// import React from 'react';
// import { Row, Col } from 'react-bootstrap';

// import Card from '../../components/Card/MainCard';

// const SamplePage = () => {
//   return (
//     <React.Fragment>
//       <Row>
//         <Col>
//           <Card title="Hello Card" isOption>
//             <p>
//               &quot;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
//               aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
//               irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
//               non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.&quot;
//             </p>
//           </Card>
//         </Col>
//       </Row>
//     </React.Fragment>
//   );
// };

// export default SamplePage;
// import React, { useEffect, useState } from 'react';
// import { Row, Col, Card, Tabs, Tab, Form, Container, Button, Modal, FormControl, Table, Dropdown } from 'react-bootstrap';
// import avatar1 from '../../../assets/images/user/avatar-1.jpg';
// import avatar2 from '../../../assets/images/user/avatar-2.jpg';
// import avatar3 from '../../../assets/images/user/avatar-3.jpg';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';
// import { BsArrowCounterclockwise } from "react-icons/bs";
// import { BsCalendarDate } from "react-icons/bs";
// import { title } from 'process';

// const AssistanceOrder = () => {
//   const [allUsers, setAllUsers] = useState([]);
//   const [purposeofvisit, setpurposeofvisit] = useState([]);
//   const [generalhealth, setgeneralhealth] = useState([]);
//   const [symptoms_list, setsymptoms_list] = useState([]);
//   const [occularhealth, setoccularhealth] = useState([]);
//   const [typeofLense, settypeofLense] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   const [allPage, setAllPage] = useState(1);
//   const allPerPage = 5;

//   const [allPage1, setAllPage1] = useState(1);
//   const allPerPage1 = 5;

//   const [searchTerm, setSearchTerm] = useState('');
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
//   const navigate = useNavigate();

//   const [prevOrders, setPrevOrders] = useState([]);
//   const [showEditModal2, setShowEditModal2] = useState(false);
//   const [editData, setEditData] = useState(''); // copy current customer data
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   };

//   const formatDate2 = (date) => {
//     return date.toISOString().split("T")[0]; // YYYY-MM-DD
//   };

//   const today2 = new Date();

//   useEffect(() => {
//     // Get stored date + counter
//     const storedDate = localStorage.getItem("todayDate");
//     const storedNo = localStorage.getItem("todayNo");

//     const currentDate = formatDate2(today2);

//     if (storedDate === currentDate && storedNo) {
//       setTodayNo2(parseInt(storedNo, 10)); // continue sequence
//     } else {
//       // Reset for new day
//       localStorage.setItem("todayDate", currentDate);
//       localStorage.setItem("todayNo", 1);
//       setTodayNo2(1);
//     }
//   }, []);


//   const today = new Date().toLocaleDateString();

//   useEffect(() => {
//     axios
//       .get('http://localhost:2776/api/customer')
//       .then((res) => setAllUsers(res.data))
//       .catch((err) => console.log(err));
//     axios.get('http://localhost:2776/api/root/purposeov').then((res) => {
//       setpurposeofvisit(res.data)
//     }).catch((err) => {
//       console.log(err)
//     })

//     axios.get('http://localhost:2776/api/root/general').then((res) => {
//       setgeneralhealth(res.data)
//     }).catch((err) => {
//       console.log(err)
//     })

//     axios.get('http://localhost:2776/api/root/symptoms').then((res) => {
//       setsymptoms_list(res.data)
//     }).catch((err) => {
//       console.log(err)
//     })

//     axios.get('http://localhost:2776/api/root/occular').then((res) => {
//       setoccularhealth(res.data)
//     }).catch((err) => {
//       console.log(err)
//     })

//     axios.get('http://localhost:2776/api/root/typeoflense').then((res) => {
//       settypeofLense(res.data)
//     }).catch((err) => {
//       console.log(err)
//     })
//   }, []);


//   const searchFilteredUsers = allUsers.filter((user) =>
//     Object.values(user).some((value) => value?.toString().toLowerCase().includes(searchTerm.toLowerCase()))
//   );

//   const filteredTodayUsers = searchFilteredUsers.filter((a) => new Date(a.reg_date).toLocaleDateString() === today);

//   const now = new Date();
//   const startOfWeek = new Date(now);
//   startOfWeek.setDate(now.getDate() - now.getDay());
//   startOfWeek.setHours(0, 0, 0, 0);

//   const endOfWeek = new Date(startOfWeek);
//   endOfWeek.setDate(startOfWeek.getDate() + 6);
//   endOfWeek.setHours(23, 59, 59, 999);

//   const filteredThisWeekUsers = searchFilteredUsers.filter((user) => {
//     const regDate = new Date(user.reg_date);
//     return regDate >= startOfWeek && regDate <= endOfWeek;
//   });

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentUsers = filteredTodayUsers.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredTodayUsers.length / itemsPerPage);
//   const allIndexLast = allPage * allPerPage;
//   const allIndexFirst = allIndexLast - allPerPage;
//   const paginatedAllUsers = searchFilteredUsers.slice(allIndexFirst, allIndexLast);
//   const allTotalPages = Math.ceil(searchFilteredUsers.length / allPerPage);
//   const indexOfLastItem1 = allPage1 * allPerPage1;
//   const indexOfFirstItem1 = indexOfLastItem1 - allPerPage1;
//   const currentUsersWeek = filteredThisWeekUsers.slice(indexOfFirstItem1, indexOfLastItem1);
//   const allTotalPagesWeek = Math.ceil(currentUsersWeek.length / allPerPage1);
//   const [selectedUserId, setSelectedUserId] = useState(null);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [purpose_of_visit, set_purpose_of_visit] = useState('');
//   const [purpose_of_visit_remark, set_purpose_of_visit_remark] = useState('');
//   const [occular_health, set_occular_health] = useState('');
//   const [occular_health_remark, set_occular_health_remark] = useState('');
//   const [general_health, set_general_health] = useState('');
//   const [general_health_medication, set_general_health_medication] = useState('');
//   const [general_health_allergies, set_general_health_allergies] = useState('');
//   const [general_health_remark, set_general_health_remark] = useState('');
//   const [symptoms, set_symptoms] = useState('');
//   const [symptoms_remark, set_symptoms_remark] = useState('');


 
//   const handleSelect = (user) => {
 
//   };



//   const resetSelectedValues = (user) => {
   
//   };

//   const selectedUserExcuteFunction = (id) => {
//     axios
//       .get(`http://localhost:2776/api/order/${id}`)
//       .then((res) => setPrevOrders(res.data))
//       .catch((err) => console.log(err));
//   }

//   return (
//     <React.Fragment>
//       <Row>
//         <Col md={12} xl={12} className="user-activity">
//           <Card>
//             <Card.Header>
//               <Container>
//                 <Row>
//                   <Col>
//                     <Card.Title as="h5" style={{ fontWeight: 'bold' }}>
//                       Recent Users
//                     </Card.Title>
//                   </Col>
//                   <Col>
//                     <Button
//                       className="float-end d-flex align-items-center text-capitalize"
//                       variant="outline-primary"
//                       size="sm"
//                       onClick={handleShow}
//                     >
//                       New
//                     </Button>
//                   </Col>
//                 </Row>
//               </Container>

//               <Form.Control
//                 type="text"
//                 placeholder="Search users..."
//                 className="mt-2"
//                 value={searchTerm}
//                 onChange={(e) => {
//                   setSearchTerm(e.target.value);
//                   setCurrentPage(1);
//                   setAllPage(1);
//                 }}
//               />
//             </Card.Header>
//             <Tabs defaultActiveKey="today" id="uncontrolled-tab-example">
//               <Tab eventKey="today" title="Today">
//                 {currentUsers.map((a, ind) => {
//                   const isSelected = selectedUserId === a.c_id;
//                   const isDimmed = selectedUserId !== null && !isSelected;

//                   return (
//                     <div
//                       key={ind}
//                       className={`d-flex friendlist-box align-items-center justify-content-center m-b-10 m-t-20 ${isDimmed ? 'dimmed-user' : ''}`}
//                       style={{ opacity: isDimmed ? 0.4 : 1, transition: 'opacity 0.3s ease' }}
//                     >
//                       <div className="m-r-10 photo-table flex-shrink-0">
//                         <img
//                           className="rounded-circle"
//                           style={{ width: '40px' }}
//                           src={a.gender === 'male' ? avatar2 : a.gender === 'female' ? avatar3 : avatar1}
//                           alt="activity-user"
//                         />
//                       </div>
//                       <div className="flex-grow-1 ms-3">
//                         <span className="float-end d-flex align-items-center">
//                           <i
//                             className={`fa fa-caret-down f-22 m-r-10 ${isSelected ? 'text-c-green' : 'text-c-red'}`}
//                             style={{ cursor: 'pointer' }}
//                             onClick={() => {
//                               setSelectedUserId(a.c_id);
//                               setSelectedUserEmail(a.email);
//                               selectedUserExcuteFunction(a.c_id)
//                               // perform other actions here
//                             }}
//                           />
//                           # {a.c_id}
//                         </span>
//                         <h6 className="m-0 d-inline fw-bold">Name : {a.prefix}</h6>
//                         <h6 className="m-0 d-inline fw-bold">{a.first_name}</h6>
//                         <h6 className="m-0 d-inline fw-bold">{a.name}</h6>
//                         <h6 className="m-3 d-inline">Email : {a.email}</h6>
//                         <h6 className="m-3 d-inline">Age : {a.age}</h6>
//                         <h6 className="m-3 d-inline">Mobile : {a.telephone || a.lan_phone || a.mobile2}</h6>
//                         <h6 className="m-3 d-inline">NIC : {a.nic}</h6>
//                         <h6 className="m-3 d-inline">DOB : {new Date(a.dob).toLocaleDateString()}</h6>
//                         <br />
//                         <h6 className="m-0 d-inline">Home Address : {a.address}</h6>
//                         <h6 className="m-3 d-inline">City : {a.town}</h6>
//                       </div>
//                     </div>
//                   );
//                 })}
//                 <div className="d-flex justify-content-center mt-3">
//                   <button
//                     className="btn btn-outline-primary m-1 btn-sm"
//                     onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                     disabled={currentPage === 1}
//                   >
//                     Prev
//                   </button>
//                   <span className="m-2">
//                     Page {currentPage} of {totalPages}
//                   </span>
//                   <button
//                     className="btn btn-outline-primary m-1 btn-sm"
//                     onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//                     disabled={currentPage === totalPages}
//                   >
//                     Next
//                   </button>
//                 </div>
//               </Tab>

//               <Tab eventKey="week" title="This Week">
//                 {currentUsersWeek.map((a, ind) => {
//                   const isSelected = selectedUserId === a.c_id;
//                   const isDimmed = selectedUserId !== null && !isSelected;

//                   return (
//                     <div
//                       key={ind}
//                       className={`d-flex friendlist-box align-items-center justify-content-center m-b-10 m-t-20 ${isDimmed ? 'dimmed-user' : ''}`}
//                       style={{ opacity: isDimmed ? 0.4 : 1, transition: 'opacity 0.3s ease' }}
//                     >
//                       <div className="m-r-10 photo-table flex-shrink-0">
//                         <img
//                           className="rounded-circle"
//                           style={{ width: '40px' }}
//                           src={a.gender === 'male' ? avatar2 : a.gender === 'female' ? avatar3 : avatar1}
//                           alt="activity-user"
//                         />
//                       </div>
//                       <div className="flex-grow-1 ms-3">
//                         <span className="float-end d-flex align-items-center">
//                           <i
//                             className={`fa fa-caret-down f-22 m-r-10 ${isSelected ? 'text-c-green' : 'text-c-red'}`}
//                             style={{ cursor: 'pointer' }}
//                             onClick={() => {
//                               setSelectedUserId(a.c_id);
//                               setSelectedUserEmail(a.email);
//                               selectedUserExcuteFunction(a.c_id)
//                               // perform other actions here
//                             }}
//                           />
//                           # {a.c_id}
//                         </span>
//                         <h6 className="m-0 d-inline fw-bold">Name : {a.prefix}</h6>
//                         <h6 className="m-0 d-inline fw-bold">{a.first_name}</h6>
//                         <h6 className="m-0 d-inline fw-bold">{a.name}</h6>
//                         <h6 className="m-3 d-inline">Email : {a.email}</h6>
//                         <h6 className="m-3 d-inline">Age : {a.age}</h6>
//                         <h6 className="m-3 d-inline">Mobile : {a.telephone || a.lan_phone || a.mobile2}</h6>
//                         <h6 className="m-3 d-inline">NIC : {a.nic}</h6>
//                         <h6 className="m-3 d-inline">DOB : {new Date(a.dob).toLocaleDateString()}</h6>
//                         <br />
//                         <h6 className="m-0 d-inline">Home Address : {a.address}</h6>
//                         <h6 className="m-3 d-inline">City : {a.town}</h6>
//                       </div>
//                     </div>
//                   );
//                 })}
//                 <div className="d-flex justify-content-center mt-3">
//                   <button
//                     className="btn btn-outline-secondary m-1 btn-sm"
//                     onClick={() => setAllPage1((prev) => Math.max(prev - 1, 1))}
//                     disabled={allPage1 === 1}
//                   >
//                     Prev
//                   </button>
//                   <span className="m-2">
//                     Page {allPage1} of {allTotalPagesWeek}
//                   </span>
//                   <button
//                     className="btn btn-outline-secondary m-1 btn-sm"
//                     onClick={() => setAllPage1((prev) => Math.min(prev + 1, allTotalPagesWeek))}
//                     disabled={allPage1 === allTotalPagesWeek}
//                   >
//                     Next
//                   </button>
//                 </div>
//               </Tab>

//               <Tab eventKey="all" title="All">
//                 {paginatedAllUsers.map((a, ind) => {
//                   const isSelected = selectedUserId === a.c_id;
//                   const isDimmed = selectedUserId !== null && !isSelected;

//                   return (
//                     <div
//                       key={ind}
//                       className={`d-flex friendlist-box align-items-center justify-content-center m-b-10 m-t-20 ${isDimmed ? 'dimmed-user' : ''}`}
//                       style={{ opacity: isDimmed ? 0.4 : 1, transition: 'opacity 0.3s ease' }}
//                     >
//                       <div className="m-r-10 photo-table flex-shrink-0">
//                         <img
//                           className="rounded-circle"
//                           style={{ width: '40px' }}
//                           src={a.gender === 'male' ? avatar2 : a.gender === 'female' ? avatar3 : avatar1}
//                           alt="activity-user"
//                         />
//                       </div>
//                       <div className="flex-grow-1 ms-3">
//                         <span className="float-end d-flex align-items-center">
//                           <i
//                             className={`fa fa-caret-down f-22 m-r-10 ${isSelected ? 'text-c-green' : 'text-c-red'}`}
//                             style={{ cursor: 'pointer' }}
//                             onClick={() => {
//                               setSelectedUserId(a.c_id);
//                               setSelectedUserEmail(a.email);
//                               selectedUserExcuteFunction(a.c_id)
//                               // perform other actions here
//                             }}
//                           />
//                           # {a.c_id}
//                         </span>
//                         <h6 className="m-0 d-inline fw-bold">Name : {a.prefix}</h6>
//                         <h6 className="m-0 d-inline fw-bold">{a.first_name}</h6>
//                         <h6 className="m-0 d-inline fw-bold">{a.name}</h6>
//                         <h6 className="m-3 d-inline">Email : {a.email}</h6>
//                         <h6 className="m-3 d-inline">Age : {a.age}</h6>
//                         <h6 className="m-3 d-inline">Mobile : {a.telephone || a.lan_phone || a.mobile2}</h6>
//                         <h6 className="m-3 d-inline">NIC : {a.nic}</h6>
//                         <h6 className="m-3 d-inline">DOB : {new Date(a.dob).toLocaleDateString()}</h6>
//                         <br />
//                         <h6 className="m-0 d-inline">Home Address : {a.address}</h6>
//                         <h6 className="m-3 d-inline">City : {a.town}</h6>
//                         <Button
//                           variant="warning"
//                           size="sm"
//                           className="ms-3"
//                           onClick={() => { setShowEditModal2(true); setEditData(a) }}
//                         >
//                           ✏️ Edit
//                         </Button>
//                       </div>
//                     </div>
//                   );
//                 })}

//                 <div className="d-flex justify-content-center mt-3">
//                   <button
//                     className="btn btn-outline-secondary m-1 btn-sm"
//                     onClick={() => setAllPage((prev) => Math.max(prev - 1, 1))}
//                     disabled={allPage === 1}
//                   >
//                     Prev
//                   </button>
//                   <span className="m-2">
//                     Page {allPage} of {allTotalPages}
//                   </span>
//                   <button
//                     className="btn btn-outline-secondary m-1 btn-sm"
//                     onClick={() => setAllPage((prev) => Math.min(prev + 1, allTotalPages))}
//                     disabled={allPage === allTotalPages}
//                   >
//                     Next
//                   </button>
//                 </div>
//               </Tab>
//             </Tabs>
//           </Card>
//         </Col>
//       </Row>

//       {selectedUserId ? (
//         <Card>
//           <Card.Header>
//             <Container>
//               <Row>
//                 <Col>
//                   <Card.Title as="h5" style={{ fontWeight: 'bold' }}>
//                     Medical Card
//                   </Card.Title>
//                 </Col>
//               </Row>
//             </Container>
//           </Card.Header>
//           <Card.Body>
//             <div className="p-3 rounded shadow-sm bg-white" >
//               <div className="d-flex justify-content-between align-items-center mb-3">
//                 {prevOrders && prevOrders.length > 0 ? (
//                   <>
//                     <Dropdown>
//                       <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
//                         <BsCalendarDate className="me-2" />
//                         {selectedUser ? formatDate(selectedUser.date) : "Select Date"}
//                       </Dropdown.Toggle>
//                       <Dropdown.Menu>
//                         {prevOrders.map((u, index) => (
//                           <Dropdown.Item key={index} onClick={() => handleSelect(u)}>
//                             {formatDate(u.date)}
//                           </Dropdown.Item>
//                         ))}
//                       </Dropdown.Menu>
//                     </Dropdown>
//                     <div className="text-center">
//                       <h6 className="fw-bold text-secondary">Selected Date</h6>
//                       <h5 className="fw-bold text-primary mt-2">
//                         {date ? formatDate(date) : "--"}
//                       </h5>
//                     </div>

//                     <div className="text-center">
//                       <h6 className="fw-bold text-secondary">Order Status</h6>
//                       <h5 className="fw-bold text-primary mt-2">
//                         {report_status ? report_status : "--"}
//                       </h5>
//                     </div>
//                   </>
//                 ) : (
//                   <span className="text-muted">No previous orders</span>
//                 )}

//                 <Button variant="outline-danger" onClick={resetSelectedValues}>
//                   <BsArrowCounterclockwise />
//                 </Button>
//               </div>


//             </div>
//             <Form style={{ color: 'black', paddingTop: 20 }}>
//               <Row>
//                 <Col md={6}>
//                   <Form.Group className="mb-3">
//                     <Form.Label style={{ fontWeight: 'bold' }}>Purpose of visit</Form.Label>
//                     <div>
//                       {purposeofvisit.map((p) => (
//                         <Form.Check
//                           key={p.pov_id}
//                           type="checkbox"
//                           label={p.text}
//                           value={p.text}
//                           checked={purpose_of_visit.includes(p.text)}
//                           onChange={(e) => {
//                             let updated;
//                             if (e.target.checked) {
//                               // Add value
//                               updated = [...purpose_of_visit.split(", ").filter(Boolean), p.text];
//                             } else {
//                               // Remove value
//                               updated = purpose_of_visit
//                                 .split(", ")
//                                 .filter((val) => val !== p.text);
//                             }
//                             set_purpose_of_visit(updated.join(", "));
//                           }}
//                         />
//                       ))}
//                     </div>
//                   </Form.Group>



//                   <Form.Group className="mb-3" controlId="remarksInput" style={{ color: '#708090', paddingLeft: 10 }}>
//                     <Form.Label>Remark</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="Enter Purpose of Visit Remarks"
//                       value={purpose_of_visit_remark}
//                       onChange={(e) => set_purpose_of_visit_remark(e.target.value)}
//                     />
//                   </Form.Group>


//                   <Form.Group className="mb-3">
//                     <Form.Label style={{ fontWeight: 'bold' }}>Symptoms</Form.Label>
//                     <div>
//                       {symptoms_list.map((p, i) => (
//                         <Form.Check
//                           key={i}
//                           type="checkbox"
//                           label={p.text}
//                           value={p.text}
//                           checked={symptoms.includes(p.text)}
//                           onChange={(e) => {
//                             let updated;
//                             if (e.target.checked) {
//                               // Add selected symptom
//                               updated = [...symptoms.split(", ").filter(Boolean), p.text];
//                             } else {
//                               // Remove unselected symptom
//                               updated = symptoms
//                                 .split(", ")
//                                 .filter((val) => val !== p.text);
//                             }
//                             set_symptoms(updated.join(", "));
//                           }}
//                         />
//                       ))}
//                     </div>
//                   </Form.Group>



//                   <Form.Group className="mb-3" controlId="remarksInput" style={{ color: '#708090', paddingLeft: 10 }}>
//                     <Form.Label>Remark</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="Enter Symptoms Remarks"
//                       value={symptoms_remark}
//                       onChange={(e) => set_symptoms_remark(e.target.value)}
//                     />
//                   </Form.Group>


//                   <Form.Group className="mb-3" controlId="remarksInput" style={{ color: '#708090', paddingLeft: 10 }}>
//                     <Form.Label style={{ fontWeight: 'bold' }}>Medication</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="Medication"
//                       value={general_health_medication}
//                       onChange={(e) => set_general_health_medication(e.target.value)}
//                     />
//                   </Form.Group>

//                   <Form.Group className="mb-3" controlId="remarksInput" style={{ color: '#708090', paddingLeft: 10 }}>
//                     <Form.Label style={{ fontWeight: 'bold' }}>Allergies</Form.Label>
//                     <Form.Control type="text" placeholder="Allergies" value={general_health_allergies} onChange={(e) => set_general_health_allergies(e.target.value)} />
//                   </Form.Group>
//                 </Col>
//                 <Col md={6}>
//                   <Form.Group className="mb-3">
//                     <Form.Label style={{ fontWeight: 'bold' }}>General Health</Form.Label>
//                     <div>
//                       {generalhealth.map((p, i) => (
//                         <Form.Check
//                           key={i}
//                           type="checkbox"
//                           label={p.text}
//                           value={p.text}
//                           checked={general_health.includes(p.text)}
//                           onChange={(e) => {
//                             let updated;
//                             if (e.target.checked) {
//                               // Add selected option
//                               updated = [...general_health.split(", ").filter(Boolean), p.text];
//                             } else {
//                               // Remove unselected option
//                               updated = general_health
//                                 .split(", ")
//                                 .filter((val) => val !== p.text);
//                             }
//                             set_general_health(updated.join(", "));
//                           }}
//                         />
//                       ))}
//                     </div>
//                   </Form.Group>



//                   <Form.Group className="mb-3" controlId="remarksInput" style={{ color: '#708090', paddingLeft: 10 }}>
//                     <Form.Label>Remark</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="Enter General Health Remarks"
//                       value={general_health_remark}
//                       onChange={(e) => set_general_health_remark(e.target.value)}
//                     />
//                   </Form.Group>


//                   <Form.Group className="mb-3">
//                     <Form.Label style={{ fontWeight: 'bold' }}>Occular Health</Form.Label>
//                     <div>
//                       {occularhealth.map((p, i) => (
//                         <Form.Check
//                           key={i}
//                           type="checkbox"
//                           label={p.text}
//                           value={p.text}
//                           checked={occular_health.includes(p.text)}
//                           onChange={(e) => {
//                             let updated;
//                             if (e.target.checked) {
//                               // Add selected option
//                               updated = [...occular_health.split(", ").filter(Boolean), p.text];
//                             } else {
//                               // Remove unselected option
//                               updated = occular_health
//                                 .split(", ")
//                                 .filter((val) => val !== p.text);
//                             }
//                             set_occular_health(updated.join(", "));
//                           }}
//                         />
//                       ))}
//                     </div>
//                   </Form.Group>

//                   <Form.Group className="mb-3" controlId="remarksInput" style={{ color: '#708090', paddingLeft: 10 }}>
//                     <Form.Label>Remark</Form.Label>
//                     <Form.Control
//                       type="text"
//                       placeholder="Enter Occular Health Remarks"
//                       value={occular_health_remark}
//                       onChange={(e) => set_occular_health_remark(e.target.value)}
//                     />
//                   </Form.Group>

//                 </Col>
//               </Row>   
//               </Form>
//               </Card.Body>
//               </Card> 
//     </React.Fragment>
//   );
// };

// export default AssistanceOrder;
