import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Tabs, Tab, Form, Container, Button, Modal, FormControl, Table } from 'react-bootstrap';
import avatar1 from '../../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../../assets/images/user/avatar-3.jpg';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const AssistanceInvoice = () => {
  const [allUsers, setAllUsers] = useState(['']);
  const [allPage, setAllPage] = useState(1);
  const allPerPage = 5;

  const [searchTerm, setSearchTerm] = useState('');
  const [isSelecetOne, setIsSelectOne] = useState(false);
  const [allOrdersRx, setAllOrdersRx] = useState(['']);
  const [allOrdersOptRx, setAllOrdersOPtRx] = useState(['']);
  const [allOrdersOptSecondRx, setAllOrdersOPtSecondRx] = useState(['']);
  const [allOrdersOptUnIrIoRe, setAllOrdersOPtUnIrIoRe] = useState(['']);
  const [allOrdersOptMore, setAllOrdersOPtMore] = useState('');
  const [allOrdersOptObj, setAllOrdersOPtObj] = useState(['']);
  const [allOrdersOptCon, setAllOrdersOPtCon] = useState(['']);
  const [allOrdersOptRemarks, setAllOrdersOPtRemarks] = useState(['']);
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:2776/api/customer/med/assistance/invoice')
      .then((res) => setAllUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  const today = new Date().toLocaleDateString();

  const searchFilteredUsers = allUsers.filter((user) =>
    Object.values(user).some((value) => value?.toString().toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  const allIndexLast = allPage * allPerPage;
  const allIndexFirst = allIndexLast - allPerPage;
  const paginatedAllUsers = searchFilteredUsers.slice(allIndexFirst, allIndexLast);
  const allTotalPages = Math.ceil(searchFilteredUsers.length / allPerPage);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedcmd_id, setSelectedcmd_id] = useState(null);
 
  const selectedUserdetailsFetch = async (a, b, c) => {
    setSelectedUserId(a);
    setSelectedcmd_id(b);
    setIsSelectOne(true);

    const ob = {
      ccmd_id: b,
      cid: a,
      date: formatDate(c)
    };
    await axios
      .post('http://localhost:2776/api/customer/med/rx/selected', ob)
      .then((res) => {
        setAllOrdersRx(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    await axios
      .post('http://localhost:2776/api/customer/med/assistance/rx', ob)
      .then((res) => {
        setAllOrdersOPtRx(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    await axios
      .post('http://localhost:2776/api/customer/med/assistance/rx/second', ob)
      .then((res) => {
        setAllOrdersOPtSecondRx(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    await axios
      .post('http://localhost:2776/api/customer/med/assistance/unpiiore', ob)
      .then((res) => {
        setAllOrdersOPtUnIrIoRe(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    await axios
      .post('http://localhost:2776/api/customer/med/assistance/more', ob)
      .then((res) => {
        setAllOrdersOPtMore(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    await axios
      .post('http://localhost:2776/api/customer/med/assistance/obj', ob)
      .then((res) => {
        setAllOrdersOPtObj(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    await axios
      .post('http://localhost:2776/api/customer/med/assistance/con', ob)
      .then((res) => {
        setAllOrdersOPtCon(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    await axios
      .post('http://localhost:2776/api/customer/med/assistance/remarks', ob)
      .then((res) => {
        setAllOrdersOPtRemarks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    
  };

  const submitInvocie = async () => {
    const ob = {
      contact_len_type: amount
    };
    await axios
      .put(`http://localhost:2776/api/customer/med/assistance/status/${selectedcmd_id}`, ob)
      .then((res) => {
        console.log(res.data);
        toast("Invoice Passed to the Cashier!")
        navigate('/assistance/invoice')
      })
      .catch((err) => {
        console.log(err);
        toast.error("Invoice Passing Error!")
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
                    <Card.Title as="h5" style={{ fontWeight: 'bold', paddingBlock: 5 }}>
                      Recent Invoices
                    </Card.Title>
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
            <Tabs defaultActiveKey="all" id="uncontrolled-tab-example">
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
                              // perform other actions here
                              selectedUserdetailsFetch(a.c_id, a.cmd_id, a.date);
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
      {isSelecetOne ? (
        <Card>
          <Card.Header>
            <Container>
              <Row>
                <Col>
                  <Card.Title as="h5" style={{ fontWeight: 'bold' }}>
                    Report Deatils
                  </Card.Title>
                </Col>
              </Row>
            </Container>
          </Card.Header>
          <h6 className="mt-3 text-success" style={{ fontWeight: '600', padding: 5, marginLeft: 15 }}>
            Habitual Rx - Assistance Informations
          </h6>
          <Row style={{ padding: 15 }}>
            {allOrdersRx.map((r) => (
              <Col md={6}>
                {r.type_od_os == 'OD' ? (
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
                              value={r.SPH}
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
                              value={r.CYL}
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
                              value={r.AXIS}
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
                              value={r.Prim}
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
                              value={r.Base}
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
                              value={r.VA}
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
                              value={r.type_near_full}
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
                              value={r.type_near_va}
                            />
                          </Form.Group>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                ) : r.type_od_os == 'OS' ? (
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
                              value={r.SPH}
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
                              value={r.CYL}
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
                              value={r.AXIS}
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
                              value={r.Prim}
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
                              value={r.Base}
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
                              value={r.VA}
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
                              value={r.type_near_full}
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
                              value={r.type_near_va}
                            />
                          </Form.Group>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                ) : null}
              </Col>
            ))}
          </Row>

          <Tabs
            variant="pills"
            defaultActiveKey="home"
          //   onSelect={(key) => {
          //     if (key === 'history') {
          //       submitHistory();
          //     }
          //   }}
          >
            <Tab eventKey="home" title="Subjective">
              <h6 className="text-success" style={{ fontWeight: '600', padding: 5, marginLeft: 15 }}>
                Rx For Spectacles - Optometrist Informations
              </h6>
              <Row style={{ padding: 15 }}>
                {allOrdersOptRx.map((r) => (
                  <Col md={6}>
                    {r.type_od_os == 'OD' ? (
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
                                  value={r.SPH}
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
                                  value={r.CYL}
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
                                  value={r.AXIS}
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
                                  value={r.Prim}
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
                                  value={r.Base}
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
                                  value={r.VA}
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
                                  value={r.type_near_full}
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
                                  value={r.type_near_va}
                                />
                              </Form.Group>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    ) : r.type_od_os == 'OS' ? (
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
                                  value={r.SPH}
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
                                  value={r.CYL}
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
                                  value={r.AXIS}
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
                                  value={r.Prim}
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
                                  value={r.Base}
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
                                  value={r.VA}
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
                                  value={r.type_near_full}
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
                                  value={r.type_near_va}
                                />
                              </Form.Group>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    ) : null}
                  </Col>
                ))}
              </Row>

              <h6 className="mt-2 text-success" style={{ fontWeight: '600', padding: 5, marginLeft: 15 }}>
                Reading Total - Optometrist Informations
              </h6>

              <Row style={{ padding: 15 }}>
                {allOrdersOptSecondRx.map((m) => (
                  <Col md={6}>
                    {m.type_od_os == 'OD' ? (
                      <Table bordered hover responsive className="table-sm align-middle shadow-sm">
                        <thead className="bg-primary text-white text-center">
                          <tr>
                            <th colSpan={6}>OD</th>
                          </tr>
                          <tr>
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
                                  value={m.SPH}
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
                                  value={m.CYL}
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
                                  value={m.AXIS}
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
                                  value={m.Prim}
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
                                  value={m.Base}
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
                                  value={m.VA}
                                />
                              </Form.Group>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    ) : m.type_od_os == 'OS' ? (
                      <Table bordered hover responsive className="table-sm align-middle shadow-sm">
                        <thead className="bg-primary text-white text-center">
                          <tr>
                            <th colSpan={6}>OS</th>
                          </tr>
                          <tr>
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
                                  value={m.SPH}
                                />
                              </Form.Group>
                            </td>
                            <td>
                              {' '}
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
                                  value={m.CYL}
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
                                  value={m.AXIS}
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
                                  value={m.Prim}
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
                                  value={m.Base}
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
                                  value={m.VA}
                                />
                              </Form.Group>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    ) : null}
                  </Col>
                ))}
              </Row>
              <Row style={{ padding: 15 }}>
                <Col md={4}>
                  <Table bordered hover responsive className="table-sm align-middle shadow-sm">
                    <thead className="bg-primary text-white text-center">
                      <tr>
                        <th colSpan={3}>Unaided Vision</th>
                      </tr>
                      <tr>
                        <th></th>
                        <th>Distance</th>
                        <th>Near</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allOrdersOptUnIrIoRe.map((un) => (
                        <>
                          {un.type_od_os == 'OD' ? (
                            <tr>
                              <td>OD</td>
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
                                    value={un.un_distance}
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
                                    value={un.un_near}
                                  />
                                </Form.Group>
                              </td>
                            </tr>
                          ) : un.type_od_os == 'OS' ? (
                            <tr>
                              <td>OS</td>
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
                                    value={un.un_distance}
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
                                    value={un.un_near}
                                  />
                                </Form.Group>
                              </td>
                            </tr>
                          ) : null}
                        </>
                      ))}
                    </tbody>
                  </Table>
                </Col>
                <Col md={2}>
                  <Table bordered hover responsive className="table-sm align-middle shadow-sm">
                    <thead className="bg-primary text-white text-center">
                      <tr>
                        <th colSpan={2}>Pinholevision</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allOrdersOptUnIrIoRe.map((un) => (
                        <>
                          {un.type_od_os == 'OD' ? (
                            <tr>
                              <td>OD</td>
                              <td>
                                {' '}
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
                                    value={un.pin}
                                  />
                                </Form.Group>
                              </td>
                            </tr>
                          ) : un.type_od_os == 'OS' ? (
                            <tr>
                              <td>OS</td>
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
                                    value={un.pin}
                                  />
                                </Form.Group>
                              </td>
                            </tr>
                          ) : null}
                        </>
                      ))}
                    </tbody>
                  </Table>
                </Col>
                <Col md={2}>
                  <Table bordered hover responsive className="table-sm align-middle shadow-sm">
                    <thead className="bg-primary text-white text-center">
                      <tr>
                        <th colSpan={2}>IOP</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allOrdersOptUnIrIoRe.map((un) => (
                        <>
                          {un.type_od_os == 'OD' ? (
                            <tr>
                              <td>OD</td>
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
                                    value={un.iop}
                                  />
                                </Form.Group>
                              </td>
                            </tr>
                          ) : un.type_od_os == 'OS' ? (
                            <tr>
                              <td>OS</td>
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
                                    value={un.iop}
                                  />
                                </Form.Group>
                              </td>
                            </tr>
                          ) : null}
                        </>
                      ))}
                    </tbody>
                  </Table>
                </Col>
                <Col md={4}>
                  <Table bordered hover responsive className="table-sm align-middle shadow-sm">
                    <thead className="bg-primary text-white text-center">
                      <tr>
                        <th colSpan={3}>Reading</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allOrdersOptUnIrIoRe.map((un) => (
                        <>
                          {un.type_od_os == 'OD' ? (
                            <tr>
                              <td>OD</td>
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
                                    value={un.re_col1}
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
                                    value={un.re_col2}
                                  />
                                </Form.Group>
                              </td>
                            </tr>
                          ) : un.type_od_os == 'OS' ? (
                            <tr>
                              <td>OS</td>
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
                                    value={un.re_col1}
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
                                    value={un.re_col2}
                                  />
                                </Form.Group>
                              </td>
                            </tr>
                          ) : null}
                        </>
                      ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>
              <Row style={{ padding: 15, textAlign: 'center' }}>
                <Col md={4}>
                  <small className="text-muted d-blockmb-1">Type of Lenses used</small>
                  <h6 className="mb-0">{allOrdersOptMore.type_od_lense || 'N/A'}</h6>
                </Col>
                <Col md={4}>
                  <small className="text-muted d-blockmb-1">Time Period</small>
                  <h6 className="mb-0">{allOrdersOptMore.time_period || 'N/A'}</h6>
                </Col>
                <Col md={4}>
                  <small className="text-muted d-blockmb-1">More Info</small>
                  <h6 className="mb-0">{allOrdersOptMore.more || 'N/A'}</h6>
                </Col>
              </Row>
            </Tab>
            <Tab eventKey="Objective" title="Objective">
              <Row>
                {allOrdersOptObj.map((a) =>
                  a.type_od_os == 'OD' ? (
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
                                  value={a.SPH}
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
                                  value={a.CYL}
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
                                  value={a.AXIS}
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
                                  value={a.Prim}
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
                                  value={a.Base}
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
                                  value={a.VA}
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
                                  value={a.type_near_full}
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
                                  value={a.type_near_va}
                                />
                              </Form.Group>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </Col>
                  ) : a.type_od_os == 'OS' ? (
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
                                  value={a.SPH}
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
                                  value={a.CYL}
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
                                  value={a.AXIS}
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
                                  value={a.Prim}
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
                                  value={a.Base}
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
                                  value={a.VA}
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
                                  value={a.type_near_full}
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
                                  value={a.type_near_va}
                                />
                              </Form.Group>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </Col>
                  ) : null
                )}

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Remarks</Form.Label>
                  {allOrdersOptRemarks.map((r) => (
                    <>{r.cateogry == 'Objective' ? <Form.Control as="textarea" rows="3" value={r.remark} /> : null}</>
                  ))}
                </Form.Group>
              </Row>
            </Tab>
            <Tab eventKey="Contact Lenses" title="Contact Lenses">
              <Table bordered hover responsive className="table-sm align-middle shadow-sm">
                <thead className="bg-primary text-white text-center">
                  <tr>
                    <th></th>
                    <th>SPH</th>
                    <th>CYL</th>
                    <th>AXIS</th>
                    <th></th>
                    <th>VA</th>
                    <th>B.Curve</th>
                    <th>Diam.</th>
                    <th>Design</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {allOrdersOptCon.map((c) => (
                    <>
                      {c.type_od_os == 'OD' ? (
                        <tr>
                          <td>OD</td>
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
                                value={c.SPH}
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
                                value={c.CYL}
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
                                value={c.AXIS}
                              />
                            </Form.Group>
                          </td>
                          <td></td>
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
                                value={c.VA}
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
                                value={c.bcurve}
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
                                value={c.diam}
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
                                value={c.desgin}
                              />
                            </Form.Group>
                          </td>
                        </tr>
                      ) : c.type_od_os == 'OS' ? (
                        <tr>
                          <td>OS</td>
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
                                value={c.SPH}
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
                                value={c.CYL}
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
                                value={c.AXIS}
                              />
                            </Form.Group>
                          </td>
                          <td></td>
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
                                value={c.VA}
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
                                value={c.bcurve}
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
                                value={c.diam}
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
                                value={c.desgin}
                              />
                            </Form.Group>
                          </td>
                        </tr>
                      ) : null}
                    </>
                  ))}
                </tbody>
              </Table>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Remarks</Form.Label>
                {allOrdersOptRemarks.map((r) => (
                  <>{r.cateogry == 'Contact Lenses' ? <Form.Control as="textarea" rows="3" value={r.remark} /> : null}</>
                ))}
              </Form.Group>
            </Tab>
          </Tabs>

          <Row className="align-items-center py-3 px-2 bg-light rounded shadow-sm" style={{ margin: '1rem' }}>
            <Col md={2} className="text-center">
              <div>
                <small className="text-muted d-block mb-1">Type of</small>
                <h6 className="mb-0">Contact Lenses</h6>
              </div>
            </Col>

            <Col md={4}>
              <Form.Group controlId="formBasicFloat">
                <Form.Control
                  type="text"
                  step="any"
                  placeholder="Blue Cut"
                  className="text-center"
                  style={{
                    border: '1px solid #ced4da',
                    borderRadius: '0.375rem',
                    height: '40px',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
                  }}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col md={3}></Col>

            <Col md={3} className="text-end">
              <Button variant="outline-primary" size="sm" className="px-4" onClick={submitInvocie}>
                Invoice
              </Button>
            </Col>
          </Row>
        </Card>
      ) : null}
    </React.Fragment>
  );
};

export default AssistanceInvoice;
