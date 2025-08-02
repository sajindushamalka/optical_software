import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Tabs, Tab, Form, Container, Button, Modal, FormControl, Table, Dropdown } from 'react-bootstrap';
import avatar1 from '../../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../../assets/images/user/avatar-3.jpg';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const purposeofvisit = [
  { id: 1, text: 'Routine test' },
  { id: 2, text: 'Broken Spectacle' },
  { id: 3, text: 'Rx Complaint' },
  { id: 4, text: 'Measurement Complaint' },
  { id: 5, text: 'Lens Design complaint' },
  { id: 6, text: 'Other' }
];

const symptoms = [
  { id: 1, text: 'Blur Distance Vision' },
  { id: 2, text: 'Blur Near Vision' },
  { id: 3, text: 'Flashes' },
  { id: 4, text: 'Floaters' },
  { id: 5, text: 'Double Vision' },
  { id: 6, text: 'Pain' },
  { id: 7, text: 'Red eye/ Discharge' },
  { id: 8, text: 'Dryness/Irritation' },
  { id: 9, text: 'Blur Distance Vision' },
  { id: 10, text: 'Other' }
];

const generalhealth = [
  { id: 1, text: 'Diabetes' },
  { id: 2, text: 'Hypertension' },
  { id: 3, text: 'Cholesterol' },
  { id: 4, text: 'Arthritis' },
  { id: 5, text: 'Thyroid' },
  { id: 6, text: 'Other' }
];

const occularhealth = [
  { id: 1, text: 'Refractive Error' },
  { id: 2, text: 'IOP' },
  { id: 3, text: 'Keratoconus' },
  { id: 4, text: 'Cataracts' },
  { id: 5, text: 'IOL' },
  { id: 6, text: 'Strabismus' },
  { id: 7, text: 'Amblyopia' },
  { id: 8, text: 'Glaucoma' },
  { id: 9, text: 'Diabetic Retinopathy' },
  { id: 10, text: 'ARMD' },
  { id: 11, text: 'Colour Blindness' },
  { id: 12, text: 'Other' }
];

const typeofLense = [
  { id: 1, text: 'Distance only' },
  { id: 2, text: 'Reading only' },
  { id: 3, text: 'Bifocal' },
  { id: 4, text: 'Prograssive' }
];

const AssistanceOrder = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [allPage, setAllPage] = useState(1);
  const allPerPage = 5;

  const [allPage1, setAllPage1] = useState(1);
  const allPerPage1 = 5;

  const [searchTerm, setSearchTerm] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:2776/api/customer')
      .then((res) => setAllUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  const today = new Date().toLocaleDateString();

  const searchFilteredUsers = allUsers.filter((user) =>
    Object.values(user).some((value) => value?.toString().toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredTodayUsers = searchFilteredUsers.filter((a) => new Date(a.reg_date).toLocaleDateString() === today);

  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  const filteredThisWeekUsers = searchFilteredUsers.filter((user) => {
    const regDate = new Date(user.reg_date);
    return regDate >= startOfWeek && regDate <= endOfWeek;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredTodayUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTodayUsers.length / itemsPerPage);
  const allIndexLast = allPage * allPerPage;
  const allIndexFirst = allIndexLast - allPerPage;
  const paginatedAllUsers = searchFilteredUsers.slice(allIndexFirst, allIndexLast);
  const allTotalPages = Math.ceil(searchFilteredUsers.length / allPerPage);
  const indexOfLastItem1 = allPage1 * allPerPage1;
  const indexOfFirstItem1 = indexOfLastItem1 - allPerPage1;
  const currentUsersWeek = filteredThisWeekUsers.slice(indexOfFirstItem1, indexOfLastItem1);
  const allTotalPagesWeek = Math.ceil(currentUsersWeek.length / allPerPage1);
  const [dob, setDob] = useState(new Date('2000-01-01'));
  const [dob1, setDob1] = useState(new Date('2000-01-01'));
  const [age, setAge] = useState(0);
  const [name, setname] = useState('NULL');
  const [address, setaddress] = useState('NULL');
  const [email, setemail] = useState('NULL');
  const [telephone, settelephone] = useState(0);
  const [occupation, setoccupation] = useState('NULL');
  const [mobile2, setmobile2] = useState(0);
  const [nic, setnic] = useState('NULL');
  const [gender, setgender] = useState('NULL');
  const [reg_date, setreg_date] = useState(today);
  const [selectedOccularHealth, setSelectedOccularHealth] = useState('NULL');
  const [remarksOccularHealth, setRemarksOccularHealth] = useState('NULL');
  const [selectPurposeofvisit, setSelectedPurposeofvisit] = useState('NULL');
  const [remarksPurposeofVisit, setRemarksPurposeofVisit] = useState('NULL');
  const [selectSymptoms, setselectedSymptoms] = useState('NULL');
  const [remarksSymptoms, setRemarksSymptoms] = useState('NULL');
  const [selectGeneralHealth, setselectedGeneralHealth] = useState('NULL');
  const [remarksGeneralHealth, setRemarksGeneralHealth] = useState('NULL');
  const [medication, setMedication] = useState('NULL');
  const [allergies, setAllergies] = useState('NULL');
  const [selectTypeofLense, setSelectTypeofLense] = useState('NULL');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserEMail, setSelectedUserEmail] = useState(null);
  const [odsph, setodsph] = useState(0);
  const [odcyl, setodcyl] = useState(0);
  const [odaxis, setodaxis] = useState(0);
  const [odprism, setodprism] = useState(0);
  const [odbase, setodbase] = useState(0);
  const [odsva, setodsva] = useState(0);
  const [odnearfull, setodnearfull] = useState(0);
  const [odnearva, setodnearva] = useState(0);
  const [ossph, setossph] = useState(0);
  const [oscyl, setoscyl] = useState(0);
  const [osaxis, setosaxis] = useState(0);
  const [osprism, setosprism] = useState(0);
  const [osbase, setosbase] = useState(0);
  const [ossva, setossva] = useState(0);
  const [osnearfull, setosnearfull] = useState(0);
  const [osnearva, setosnearva] = useState(0);
  const [userHistory, setUserHistory] = useState(['']);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserRX, setSelectedUserRX] = useState(['']);

  const handleSelect = (user) => {
    setSelectedUser(user);
    console.log(user)

    const ob = {
      ccmd_id: user.cmd_id,
      date: formatDate(user.date)
    }

    axios.post('http://localhost:2776/api/customer/med/rx/history', ob).then((res) => {
      console.log(res.data);
      setSelectedUserRX(res.data);
    }).catch((err) => {
      console.log(err);
    })
  };

  const handleDobChange = (e) => {
    const birthDate = new Date(e.target.value);
    setDob(e.target.value);
    setDob1(new Date(e.target.value).toLocaleDateString());

    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }
    setAge(calculatedAge);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const submitNewCustomer = () => {
    const ob = {
      name,
      email,
      telephone,
      mobile2,
      address,
      occupation,
      dob: formatDate(dob1),
      age,
      nic,
      gender,
      reg_date: formatDate(reg_date)
    };
    console.log(ob);
    axios
      .post('http://localhost:2776/api/customer', ob)
      .then((res) => {
        console.log(res.data);
        toast('New Customer Created!');
        handleClose();
        navigate('/assistance/order');
      })
      .catch((err) => {
        console.log(err);
        toast.error('Submission failed. Please try again.');
      });
  };

  const submitMedDeatils = () => {
    const medOb = {
      date: formatDate(today),
      purpose_of_visit: selectPurposeofvisit,
      purpose_of_visit_remark: remarksPurposeofVisit,
      occular_health: selectedOccularHealth,
      occular_health_remark: remarksOccularHealth,
      general_health: selectGeneralHealth,
      general_health_medication: medication,
      general_health_allergies: allergies,
      general_health_remark: remarksGeneralHealth,
      symptoms: selectSymptoms,
      symptoms_remark: remarksSymptoms,
      cid: selectedUserId,
      type_of_lenses_used: selectTypeofLense,
      report_status: 'Pass_to_optometrist',
      contact_len_type: 'Null',
      amount: 0
    };


    axios
      .post('http://localhost:2776/api/customer/med', medOb)
      .then((res) => {
        const medrxobod = {
          date: formatDate(today),
          cid: selectedUserId,
          SPH: odsph,
          CYL: odcyl,
          AXIS: odaxis,
          Prim: odprism,
          Base: odbase,
          VA: odsva,
          type_od_os: 'OD',
          type_near_full: odnearfull,
          type_near_va: odnearva,
          ccmd_id: res.data.id
        };

        const medrxobos = {
          date: formatDate(today),
          cid: selectedUserId,
          SPH: ossph,
          CYL: oscyl,
          AXIS: osaxis,
          Prim: osprism,
          Base: osbase,
          VA: ossva,
          type_od_os: 'OS',
          type_near_full: osnearfull,
          type_near_va: osnearva,
          ccmd_id: res.data.id
        };

        axios
          .post('http://localhost:2776/api/customer/med/rx', medrxobod)
          .then((res) => {
            axios
              .post('http://localhost:2776/api/customer/med/rx', medrxobos)
              .then((res) => {

                const obemail = {
                  to: selectedUserEMail,
                  subject: "A.A. Samarasinhage Optical Shop Order is Confirmed",
                  message: `
                            Dear Customer,

                            Thank you for shopping with us!
                            Your order has been successfully confirmed.
                            We are now processing your order and will notify you once it's ready for pickup or delivery.
                            If you have any questions, feel free to contact our optical shop team.
                            
                            Best regards,
                            A.A. Samarasinhage Optical Shop
                          `
                };

                axios.post('http://localhost:2776/api/email/notify', obemail).then((res) => {
                  console.log('Email Sent')
                }).catch((err) => {
                  console.log('Email sent error')
                })
                toast('Customer Report Created!');
                navigate('/assistance/order');
              })
              .catch((err) => {
                console.log(err);
                toast.error('Submission failed. Please try again.');
              });
          })
          .catch((err) => {
            console.log(err);
            toast.error('Submission failed. Please try again.');
          });
      })
      .catch((err) => {
        console.log(err);
        toast.error('Submission failed. Please try again.');
      });
  };

  console.log(allUsers);

  const submitHistory = () => {
    axios
      .get(`http://localhost:2776/api/customer/med/history/${selectedUserId}`)
      .then((res) => {
        console.log(res.data);
        setUserHistory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <React.Fragment>
      <Row>
        <Col md={12} xl={12} className="user-activity">
          <Card>
            <Card.Header>
              <Container>
                <Row>
                  <Col>
                    <Card.Title as="h5" style={{ fontWeight: 'bold' }}>
                      Recent Users
                    </Card.Title>
                  </Col>
                  <Col>
                    <Button
                      className="float-end d-flex align-items-center text-capitalize"
                      variant="outline-primary"
                      size="sm"
                      onClick={handleShow}
                    >
                      New
                    </Button>
                  </Col>
                </Row>
              </Container>

              <Form.Control
                type="text"
                placeholder="Search users..."
                className="mt-2"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                  setAllPage(1);
                }}
              />
            </Card.Header>
            <Tabs defaultActiveKey="today" id="uncontrolled-tab-example">
              <Tab eventKey="today" title="Today">
                {currentUsers.map((a, ind) => {
                  const isSelected = selectedUserId === a.c_id;
                  const isDimmed = selectedUserId !== null && !isSelected;

                  return (
                    <div
                      key={ind}
                      className={`d-flex friendlist-box align-items-center justify-content-center m-b-10 m-t-20 ${isDimmed ? 'dimmed-user' : ''}`}
                      style={{ opacity: isDimmed ? 0.4 : 1, transition: 'opacity 0.3s ease' }}
                    >
                      <div className="m-r-10 photo-table flex-shrink-0">
                        <img
                          className="rounded-circle"
                          style={{ width: '40px' }}
                          src={a.gender === 'male' ? avatar2 : a.gender === 'female' ? avatar3 : avatar1}
                          alt="activity-user"
                        />
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <span className="float-end d-flex align-items-center">
                          <i
                            className={`fa fa-caret-down f-22 m-r-10 ${isSelected ? 'text-c-green' : 'text-c-red'}`}
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              setSelectedUserId(a.c_id);
                              setSelectedUserEmail(a.email);
                              // perform other actions here
                            }}
                          />
                          # {a.c_id}
                        </span>
                        <h6 className="m-0 d-inline fw-bold">{a.name}</h6>
                        <h6 className="m-3 d-inline">{a.email}</h6>
                        <h6 className="m-3 d-inline">{a.age}</h6>
                        <h6 className="m-3 d-inline">{a.telephone}</h6>
                        <h6 className="m-3 d-inline">{a.nic}</h6>
                        <h6 className="m-3 d-inline">{new Date(a.dob).toLocaleDateString()}</h6>
                        <br />
                        <h6 className="m-0 d-inline">{a.address}</h6>
                      </div>
                    </div>
                  );
                })}
                <div className="d-flex justify-content-center mt-3">
                  <button
                    className="btn btn-outline-primary m-1 btn-sm"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Prev
                  </button>
                  <span className="m-2">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    className="btn btn-outline-primary m-1 btn-sm"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </Tab>

              <Tab eventKey="week" title="This Week">
                {currentUsersWeek.map((a, ind) => {
                  const isSelected = selectedUserId === a.c_id;
                  const isDimmed = selectedUserId !== null && !isSelected;

                  return (
                    <div
                      key={ind}
                      className={`d-flex friendlist-box align-items-center justify-content-center m-b-10 m-t-20 ${isDimmed ? 'dimmed-user' : ''}`}
                      style={{ opacity: isDimmed ? 0.4 : 1, transition: 'opacity 0.3s ease' }}
                    >
                      <div className="m-r-10 photo-table flex-shrink-0">
                        <img
                          className="rounded-circle"
                          style={{ width: '40px' }}
                          src={a.gender === 'male' ? avatar2 : a.gender === 'female' ? avatar3 : avatar1}
                          alt="activity-user"
                        />
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <span className="float-end d-flex align-items-center">
                          <i
                            className={`fa fa-caret-down f-22 m-r-10 ${isSelected ? 'text-c-green' : 'text-c-red'}`}
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              setSelectedUserId(a.c_id);
                              setSelectedUserEmail(a.email);
                              // perform other actions here
                            }}
                          />
                          # {a.c_id}
                        </span>
                        <h6 className="m-0 d-inline fw-bold">{a.name}</h6>
                        <h6 className="m-3 d-inline">{a.email}</h6>
                        <h6 className="m-3 d-inline">{a.age}</h6>
                        <h6 className="m-3 d-inline">{a.telephone}</h6>
                        <h6 className="m-3 d-inline">{a.nic}</h6>
                        <h6 className="m-3 d-inline">{new Date(a.dob).toLocaleDateString()}</h6>
                        <br />
                        <h6 className="m-0 d-inline">{a.address}</h6>
                      </div>
                    </div>
                  );
                })}
                <div className="d-flex justify-content-center mt-3">
                  <button
                    className="btn btn-outline-secondary m-1 btn-sm"
                    onClick={() => setAllPage1((prev) => Math.max(prev - 1, 1))}
                    disabled={allPage1 === 1}
                  >
                    Prev
                  </button>
                  <span className="m-2">
                    Page {allPage1} of {allTotalPagesWeek}
                  </span>
                  <button
                    className="btn btn-outline-secondary m-1 btn-sm"
                    onClick={() => setAllPage1((prev) => Math.min(prev + 1, allTotalPagesWeek))}
                    disabled={allPage1 === allTotalPagesWeek}
                  >
                    Next
                  </button>
                </div>
              </Tab>

              <Tab eventKey="all" title="All">
                {paginatedAllUsers.map((a, ind) => {
                  const isSelected = selectedUserId === a.c_id;
                  const isDimmed = selectedUserId !== null && !isSelected;

                  return (
                    <div
                      key={ind}
                      className={`d-flex friendlist-box align-items-center justify-content-center m-b-10 m-t-20 ${isDimmed ? 'dimmed-user' : ''}`}
                      style={{ opacity: isDimmed ? 0.4 : 1, transition: 'opacity 0.3s ease' }}
                    >
                      <div className="m-r-10 photo-table flex-shrink-0">
                        <img
                          className="rounded-circle"
                          style={{ width: '40px' }}
                          src={a.gender === 'male' ? avatar2 : a.gender === 'female' ? avatar3 : avatar1}
                          alt="activity-user"
                        />
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <span className="float-end d-flex align-items-center">
                          <i
                            className={`fa fa-caret-down f-22 m-r-10 ${isSelected ? 'text-c-green' : 'text-c-red'}`}
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              setSelectedUserId(a.c_id);
                              setSelectedUserEmail(a.email);
                              // perform other actions here
                            }}
                          />
                          # {a.c_id}
                        </span>
                        <h6 className="m-0 d-inline fw-bold">{a.name}</h6>
                        <h6 className="m-3 d-inline">{a.email}</h6>
                        <h6 className="m-3 d-inline">{a.age}</h6>
                        <h6 className="m-3 d-inline">{a.telephone}</h6>
                        <h6 className="m-3 d-inline">{a.nic}</h6>
                        <h6 className="m-3 d-inline">{new Date(a.dob).toLocaleDateString()}</h6>
                        <br />
                        <h6 className="m-0 d-inline">{a.address}</h6>
                      </div>
                    </div>
                  );
                })}

                <div className="d-flex justify-content-center mt-3">
                  <button
                    className="btn btn-outline-secondary m-1 btn-sm"
                    onClick={() => setAllPage((prev) => Math.max(prev - 1, 1))}
                    disabled={allPage === 1}
                  >
                    Prev
                  </button>
                  <span className="m-2">
                    Page {allPage} of {allTotalPages}
                  </span>
                  <button
                    className="btn btn-outline-secondary m-1 btn-sm"
                    onClick={() => setAllPage((prev) => Math.min(prev + 1, allTotalPages))}
                    disabled={allPage === allTotalPages}
                  >
                    Next
                  </button>
                </div>
              </Tab>
            </Tabs>
          </Card>
        </Col>
      </Row>

      {selectedUserId ? (
        <Card>
          <Card.Header>
            <Container>
              <Row>
                <Col>
                  <Card.Title as="h5" style={{ fontWeight: 'bold' }}>
                    Medical Card
                  </Card.Title>
                </Col>
              </Row>
            </Container>
          </Card.Header>
          <Tabs
            variant="pills"
            defaultActiveKey="home"
            onSelect={(key) => {
              if (key === 'history') {
                submitHistory();
              }
            }}
          >
            <Tab eventKey="home" title="NEW">
              <Form style={{ color: 'black' }}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                      <Form.Label>Purpose of visit</Form.Label>
                      <Form.Select
                        multiple
                        onChange={(e) => {
                          const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
                          const joinedValues = selectedOptions.join(' , '); // Join with space
                          setSelectedPurposeofvisit(joinedValues);
                        }}
                      >
                        {purposeofvisit.map((p, i) => (
                          <option key={i}>{p.text}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>

                    {selectPurposeofvisit && (
                      <Form.Group className="mb-3" controlId="remarksInput" style={{ color: '#708090', paddingLeft: 10 }}>
                        <Form.Label>Remark</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Purpose of Visit Remarks"
                          onChange={(e) => setRemarksPurposeofVisit(e.target.value)}
                        />
                      </Form.Group>
                    )}

                    <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                      <Form.Label>Symptoms</Form.Label>
                      <Form.Select
                        multiple
                        onChange={(e) => {
                          const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
                          const joinedValues = selectedOptions.join(' , '); // Join with space
                          setselectedSymptoms(joinedValues);
                        }}
                      >
                        {symptoms.map((p, i) => (
                          <option key={i}>{p.text}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>

                    {selectSymptoms && (
                      <Form.Group className="mb-3" controlId="remarksInput" style={{ color: '#708090', paddingLeft: 10 }}>
                        <Form.Label>Remark</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Symptoms Remarks"
                          onChange={(e) => setRemarksSymptoms(e.target.value)}
                        />
                      </Form.Group>
                    )}

                    <Form.Group className="mb-3" controlId="remarksInput" style={{ color: '#708090', paddingLeft: 10 }}>
                      <Form.Label>Medication</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Medication"
                        value={medication}
                        onChange={(e) => setMedication(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                      <Form.Label> General Health</Form.Label>
                      <Form.Select
                        multiple
                        onChange={(e) => {
                          const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
                          const joinedValues = selectedOptions.join(' , '); // Join with space
                          setselectedGeneralHealth(joinedValues);
                        }}
                      >
                        {generalhealth.map((p, i) => (
                          <option key={i}>{p.text}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>

                    {selectGeneralHealth && (
                      <Form.Group className="mb-3" controlId="remarksInput" style={{ color: '#708090', paddingLeft: 10 }}>
                        <Form.Label>Remark</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter General Health Remarks"
                          onChange={(e) => setRemarksGeneralHealth(e.target.value)}
                        />
                      </Form.Group>
                    )}

                    <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                      <Form.Label> Occular Health</Form.Label>
                      <Form.Select
                        multiple
                        onChange={(e) => {
                          const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
                          const joinedValues = selectedOptions.join(' , '); // Join with space
                          setSelectedOccularHealth(joinedValues);
                        }}
                      >
                        {occularhealth.map((p, i) => (
                          <option key={i}>{p.text}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>

                    {selectedOccularHealth && (
                      <Form.Group className="mb-3" controlId="remarksInput" style={{ color: '#708090', paddingLeft: 10 }}>
                        <Form.Label>Remark</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Occular Health Remarks"
                          onChange={(e) => setRemarksOccularHealth(e.target.value)}
                        />
                      </Form.Group>
                    )}

                    <Form.Group className="mb-3" controlId="remarksInput" style={{ color: '#708090', paddingLeft: 10 }}>
                      <Form.Label>Allergies</Form.Label>
                      <Form.Control type="text" placeholder="Allergies" onChange={(e) => setAllergies(e.target.value)} />
                    </Form.Group>
                  </Col>
                </Row>
                <h6 className="mt-4 fw-bold mb-3">Habitual Rx </h6>
                <Row>
                  <Col md={6}>
                    <Table bordered hover responsive className="table-sm align-middle shadow-sm">
                      <thead className="bg-primary text-white text-center">
                        <tr>
                          <th></th>
                          <th colSpan="6">OD</th>
                        </tr>
                        <tr className="bg-light text-dark">
                          <th></th>
                          <th>SPH</th>
                          <th>CYL</th>
                          <th>AXIS</th>
                          <th>Prism</th>
                          <th>Base</th>
                          <th>VA</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="text-center">
                          <td className="fw-bold">Distance</td>
                          <td>
                            <Form.Group className="mb-0" controlId="formBasicFloat">
                              <Form.Control
                                type="number"
                                step="any"
                                style={{
                                  border: 'none',
                                  width: '',
                                  padding: '4px 6px',
                                  textAlign: 'center'
                                }}
                                onChange={(e) => setodsph(e.target.value)}
                              />
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group className="mb-0" controlId="formBasicFloat">
                              <Form.Control
                                type="number"
                                step="any"
                                style={{
                                  border: 'none',
                                  width: '',
                                  padding: '4px 6px',
                                  textAlign: 'center'
                                }}
                                onChange={(e) => setodcyl(e.target.value)}
                              />
                            </Form.Group>
                          </td>
                          <td>
                            {' '}
                            <Form.Group className="mb-0" controlId="formBasicFloat">
                              <Form.Control
                                type="number"
                                step="any"
                                style={{
                                  border: 'none',
                                  width: '',
                                  padding: '4px 6px',
                                  textAlign: 'center'
                                }}
                                onChange={(e) => setodaxis(e.target.value)}
                              />
                            </Form.Group>
                          </td>
                          <td>
                            {' '}
                            <Form.Group className="mb-0" controlId="formBasicFloat">
                              <Form.Control
                                type="number"
                                step="any"
                                style={{
                                  border: 'none',
                                  width: '',
                                  padding: '4px 6px',
                                  textAlign: 'center'
                                }}
                                onChange={(e) => setodprism(e.target.value)}
                              />
                            </Form.Group>
                          </td>
                          <td>
                            {' '}
                            <Form.Group className="mb-0" controlId="formBasicFloat">
                              <Form.Control
                                type="number"
                                step="any"
                                style={{
                                  border: 'none',
                                  width: '',
                                  padding: '4px 6px',
                                  textAlign: 'center'
                                }}
                                onChange={(e) => setodbase(e.target.value)}
                              />
                            </Form.Group>
                          </td>
                          <td>
                            {' '}
                            <Form.Group className="mb-0" controlId="formBasicFloat">
                              <Form.Control
                                type="number"
                                step="any"
                                style={{
                                  border: 'none',
                                  width: '',
                                  padding: '4px 6px',
                                  textAlign: 'center'
                                }}
                                onChange={(e) => setodsva(e.target.value)}
                              />
                            </Form.Group>
                          </td>
                        </tr>
                        <tr className="text-center">
                          <td className="fw-bold">Near</td>
                          <td colSpan="5" className="bg-light">
                            <Form.Group className="mb-0" controlId="formBasicFloat">
                              <Form.Control
                                type="text"
                                step="any"
                                style={{
                                  border: 'none',
                                  width: '',
                                  padding: '4px 6px',
                                  textAlign: 'center'
                                }}
                                onChange={(e) => setodnearfull(e.target.value)}
                              />
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group className="mb-0" controlId="formBasicFloat">
                              <Form.Control
                                type="text"
                                step="any"
                                style={{
                                  border: 'none',
                                  width: '',
                                  padding: '4px 6px',
                                  textAlign: 'center'
                                }}
                                onChange={(e) => setodnearva(e.target.value)}
                              />
                            </Form.Group>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                  <Col md={6}>
                    <Table bordered hover responsive className="table-sm align-middle shadow-sm">
                      <thead className="bg-primary text-white text-center">
                        <tr>
                          <th></th>
                          <th colSpan="6">OS</th>
                        </tr>
                        <tr className="bg-light text-dark">
                          <th></th>
                          <th>SPH</th>
                          <th>CYL</th>
                          <th>AXIS</th>
                          <th>Prism</th>
                          <th>Base</th>
                          <th>VA</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="text-center">
                          <td className="fw-bold">Distance</td>
                          <td>
                            <Form.Group className="mb-0" controlId="formBasicFloat">
                              <Form.Control
                                type="number"
                                step="any"
                                style={{
                                  border: 'none',
                                  width: '',
                                  padding: '4px 6px',
                                  textAlign: 'center'
                                }}
                                onChange={(e) => setossph(e.target.value)}
                              />
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group className="mb-0" controlId="formBasicFloat">
                              <Form.Control
                                type="number"
                                step="any"
                                style={{
                                  border: 'none',
                                  width: '',
                                  padding: '4px 6px',
                                  textAlign: 'center'
                                }}
                                onChange={(e) => setoscyl(e.target.value)}
                              />
                            </Form.Group>
                          </td>
                          <td>
                            {' '}
                            <Form.Group className="mb-0" controlId="formBasicFloat">
                              <Form.Control
                                type="number"
                                step="any"
                                style={{
                                  border: 'none',
                                  width: '',
                                  padding: '4px 6px',
                                  textAlign: 'center'
                                }}
                                onChange={(e) => setosaxis(e.target.value)}
                              />
                            </Form.Group>
                          </td>
                          <td>
                            {' '}
                            <Form.Group className="mb-0" controlId="formBasicFloat">
                              <Form.Control
                                type="number"
                                step="any"
                                style={{
                                  border: 'none',
                                  width: '',
                                  padding: '4px 6px',
                                  textAlign: 'center'
                                }}
                                onChange={(e) => setosprism(e.target.value)}
                              />
                            </Form.Group>
                          </td>
                          <td>
                            {' '}
                            <Form.Group className="mb-0" controlId="formBasicFloat">
                              <Form.Control
                                type="number"
                                step="any"
                                style={{
                                  border: 'none',
                                  width: '',
                                  padding: '4px 6px',
                                  textAlign: 'center'
                                }}
                                onChange={(e) => setosbase(e.target.value)}
                              />
                            </Form.Group>
                          </td>
                          <td>
                            {' '}
                            <Form.Group className="mb-0" controlId="formBasicFloat">
                              <Form.Control
                                type="number"
                                step="any"
                                style={{
                                  border: 'none',
                                  width: '',
                                  padding: '4px 6px',
                                  textAlign: 'center'
                                }}
                                onChange={(e) => setossva(e.target.value)}
                              />
                            </Form.Group>
                          </td>
                        </tr>
                        <tr className="text-center">
                          <td className="fw-bold">Near</td>
                          <td colSpan="5" className="bg-light">
                            <Form.Group className="mb-0" controlId="formBasicFloat">
                              <Form.Control
                                type="text"
                                step="any"
                                style={{
                                  border: 'none',
                                  width: '',
                                  padding: '4px 6px',
                                  textAlign: 'center'
                                }}
                                onChange={(e) => setosnearfull(e.target.value)}
                              />
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group className="mb-0" controlId="formBasicFloat">
                              <Form.Control
                                type="text"
                                step="any"
                                style={{
                                  border: 'none',
                                  width: '',
                                  padding: '4px 6px',
                                  textAlign: 'center'
                                }}
                                onChange={(e) => setosnearva(e.target.value)}
                              />
                            </Form.Group>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h6 className="mt-4 fw-bold mb-4">Type of Lenses Used</h6>
                    <Form.Group className="mb-3">
                      {typeofLense.map((t) => (
                        <Form.Check
                          key={t.id}
                          inline
                          type="radio"
                          label={t.text}
                          id={`radio-${t.text}`}
                          value={t.text}
                          className="custom-radio"
                          onChange={(e) => setSelectTypeofLense(e.target.value)}
                        />
                      ))}
                    </Form.Group>
                    <Button variant="outline-primary" size="sm" className="mt-3" onClick={submitMedDeatils}>
                      Submit
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Tab>
            <Tab eventKey="history" title="History">
              <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                  {selectedUser ? formatDate(selectedUser.date) : "Select Date"}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {userHistory.map((u, index) => (
                    <Dropdown.Item key={index} onClick={() => handleSelect(u)}>
                      {formatDate(u.date)}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>

              {selectedUser ?
                <Row>
                  <div className=" mt-4 rounded">
                    <h5 className="mb-4 text-primary" style={{ fontWeight: '600' }}>
                      🧑‍⚕️ Medical Report Information
                    </h5>

                    <Row>
                      <Col md={3} className="mb-4">
                        <small className="text-muted d-block mb-1">Purpose of Visit</small>
                        <h6 className="mb-2">{selectedUser.purpose_of_visit || 'N/A'}</h6>
                        <small className="text-muted d-block mb-1">Remarks</small>
                        <h6 className="mb-0">{selectedUser.purpose_of_visit_remark || 'N/A'}</h6>
                        <small className="text-muted d-block mt-5 mb-1">Type of Lenses used</small>
                        <h6 className="mb-0">{selectedUser.type_of_lenses_used || 'N/A'}</h6>
                      </Col>

                      <Col md={3} className="mb-4">
                        <small className="text-muted d-block mb-1">General Health</small>
                        <h6 className="mb-2">{selectedUser.general_health || 'N/A'}</h6>
                        <small className="text-muted d-block mb-1">Remarks</small>
                        <h6 className="mb-2">{selectedUser.general_health_remark || 'N/A'}</h6>
                        <small className="text-muted d-block mb-1">Allergies</small>
                        <h6 className="mb-2">{selectedUser.general_health_allergies || 'N/A'}</h6>
                        <small className="text-muted d-block mb-1">Medication</small>
                        <h6 className="mb-0">{selectedUser.general_health_medication || 'N/A'}</h6>
                      </Col>

                      <Col md={3} className="mb-4">
                        <small className="text-muted d-block mb-1">Occular Health</small>
                        <h6 className="mb-2">{selectedUser.occular_health || 'N/A'}</h6>
                        <small className="text-muted d-block mb-1">Remarks</small>
                        <h6 className="mb-0">{selectedUser.occular_health_remark || 'N/A'}</h6>
                      </Col>

                      <Col md={3} className="mb-4">
                        <small className="text-muted d-block mb-1">Symptoms</small>
                        <h6 className="mb-2">{selectedUser.symptoms || 'N/A'}</h6>
                        <small className="text-muted d-block mb-1">Remarks</small>
                        <h6 className="mb-0">{selectedUser.symptoms_remark || 'N/A'}</h6>
                      </Col>
                    </Row>
                  </div>
                </Row>
                : null}

            </Tab>
          </Tabs>
        </Card>
      ) : null}

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Register New Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Container>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Customer Name" onChange={(e) => setname(e.target.value)} />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="abc@gmail.com" onChange={(e) => setemail(e.target.value)} />
                  </Form.Group>
                </Col>

                <Col xs={12} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Mobile 1</Form.Label>
                    <Form.Control type="tel" placeholder="011 2 300 300" onChange={(e) => settelephone(e.target.value)} />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Mobile 2</Form.Label>
                    <Form.Control type="tel" placeholder="072 222 2222" onChange={(e) => setmobile2(e.target.value)} />
                  </Form.Group>
                </Col>

                <Col xs={12} md={6}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Home Address</Form.Label>
                    <Form.Control as="textarea" rows="3" onChange={(e) => setaddress(e.target.value)} />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Occupation</Form.Label>
                    <Form.Control as="textarea" rows="3" onChange={(e) => setoccupation(e.target.value)} />
                  </Form.Group>
                </Col>

                <Col xs={12} md={6}>
                  <Form.Group className="mb-3" controlId="dob">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control type="date" value={dob} onChange={handleDobChange} />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3" controlId="age">
                    <Form.Label>Age</Form.Label>
                    <Form.Control type="number" value={age} readOnly />
                    <Form.Text className="text-muted">This&apos;s automatically genorated.</Form.Text>
                  </Form.Group>
                </Col>

                <Col xs={12} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>NIC</Form.Label>
                    <Form.Control type="text" placeholder="1212121212112 V" onChange={(e) => setnic(e.target.value)} />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3" controlId="formGender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select onChange={(e) => setgender(e.target.value)}>
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            </Container>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={submitNewCustomer}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default AssistanceOrder;
