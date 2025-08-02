import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Card, Tabs, Tab, Form, Container, Button, Modal, Table } from 'react-bootstrap';
import avatar1 from '../../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../../assets/images/user/avatar-3.jpg';
import axios from 'axios';

const CashierInvoice = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [allPage, setAllPage] = useState(1);
  const allPerPage = 5;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedPaymentType, setSelectedPaymentType] = useState('');
  const invoiceRef = useRef();

  useEffect(() => {
    axios
      .get('http://localhost:2776/api/customer/med/cashier/invoice')
      .then((res) => setAllUsers(res.data))
      .catch((err) => console.log(err));
  }, []);

  const searchFilteredUsers = allUsers.filter((user) =>
    Object.values(user).some((value) => value?.toString().toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const allIndexLast = allPage * allPerPage;
  const allIndexFirst = allIndexLast - allPerPage;
  const paginatedAllUsers = searchFilteredUsers.slice(allIndexFirst, allIndexLast);
  const allTotalPages = Math.ceil(searchFilteredUsers.length / allPerPage);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };
  const today = new Date().toLocaleDateString();
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };


  const handlePrint = () => {
    const printContents = invoiceRef.current.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // Reload to restore app state
  };

  const [halfDetails, setHalfDetails] = useState({ full: '', half: '' });
  const [fullAmount, setFullAmount] = useState('');
  const [quarterDetails, setQuarterDetails] = useState({ full: '', count: '', quarter: '' });
  const [noPayment, setNoPayment] = useState('');

  const submitPyament = (aa) => {
    if (aa == "full") {
      const ob = {
        opt_id: selectedUser.cmd_id,
        date: formatDate(today),
        full_amount: fullAmount,
        quarter_amount: 0,
        count: 0,
        half: 0,
        noneMes: 'null',
        typep:'full'
      }
      console.log(ob)

      axios.post('http://localhost:2776/api/cahsier', ob).then((res) => {

        axios.put(`http://localhost:2776/api/customer/med/cashier/${selectedUser.cmd_id}`).then((res) => {
          console.log('Done')
        }).catch((err) => {
          console.log('Error')
        })

      }).catch((err) => {
        console.log('Error')
      })
    } else if (aa == "half") {
      const ob = {
        opt_id: selectedUser.cmd_id,
        date: formatDate(today),
        full_amount: halfDetails.full,
        quarter_amount: 0,
        count: 0,
        half: halfDetails.half,
        noneMes: 'null',
        typep:'half'
      }
      console.log(ob)
      axios.post('http://localhost:2776/api/cahsier', ob).then((res) => {

        axios.put(`http://localhost:2776/api/customer/med/cashier/${selectedUser.cmd_id}`).then((res) => {
          console.log('Done')
        }).catch((err) => {
          console.log('Error')
        })

      }).catch((err) => {
        console.log('Error')
      })
    }
    else if (aa == "quarter") {
      const ob = {
        opt_id: selectedUser.cmd_id,
        date: formatDate(today),
        full_amount: quarterDetails.full,
        quarter_amount: quarterDetails.quarter,
        count: quarterDetails.count,
        half: 0,
        noneMes: 'null',
        typep:'quarter'
      }
      console.log(ob)
      axios.post('http://localhost:2776/api/cahsier', ob).then((res) => {

        axios.put(`http://localhost:2776/api/customer/med/cashier/${selectedUser.cmd_id}`).then((res) => {
          console.log('Done')
        }).catch((err) => {
          console.log('Error')
        })

      }).catch((err) => {
        console.log('Error')
      })
    }
    else if (aa == "none") {
      const ob = {
        opt_id: selectedUser.cmd_id,
        date: formatDate(today),
        full_amount: 0,
        quarter_amount: 0,
        count: 0,
        half: 0,
        noneMes: noPayment,
        typep:'none'
      }
      console.log(ob)
      axios.post('http://localhost:2776/api/cahsier', ob).then((res) => {

        axios.put(`http://localhost:2776/api/customer/med/cashier/${selectedUser.cmd_id}`).then((res) => {
          console.log('Done')
        }).catch((err) => {
          console.log('Error')
        })

      }).catch((err) => {
        console.log('Error')
      })
    }
  }


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
                      Recent Invoices
                    </Card.Title>
                  </Col>
                </Row>
                <Form.Control
                  type="text"
                  placeholder="Search users..."
                  className="mt-2"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setAllPage(1);
                  }}
                />
              </Container>
            </Card.Header>

            <Tabs defaultActiveKey="all" id="invoice-tabs">
              <Tab eventKey="all" title="All">
                {paginatedAllUsers.map((user, index) => {
                  const isSelected = selectedUser?.c_id === user.c_id;

                  return (
                    <div
                      key={index}
                      className={`d-flex friendlist-box align-items-center justify-content-center m-b-10 m-t-20 ${isSelected ? 'bg-light shadow-sm rounded' : ''}`}
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleUserClick(user)}
                    >
                      <div className="m-r-10 photo-table flex-shrink-0">
                        <img
                          className="rounded-circle"
                          style={{ width: '40px' }}
                          src={user.gender === 'male' ? avatar2 : user.gender === 'female' ? avatar3 : avatar1}
                          alt="avatar"
                        />
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h6 className="m-0 fw-bold">{user.name}</h6>
                        <small>
                          {user.email} | Age: {user.age} | Tel: {user.telephone}
                        </small>
                      </div>
                    </div>
                  );
                })}

                <div className="d-flex justify-content-center mt-3">
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => setAllPage((prev) => Math.max(prev - 1, 1))}
                    disabled={allPage === 1}
                  >
                    Prev
                  </Button>
                  <span className="m-2">
                    Page {allPage} of {allTotalPages}
                  </span>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => setAllPage((prev) => Math.min(prev + 1, allTotalPages))}
                    disabled={allPage === allTotalPages}
                  >
                    Next
                  </Button>
                </div>
              </Tab>
            </Tabs>
          </Card>
        </Col>

        {selectedUser && (
          <Col md={12} className="mt-4">
            <Card className="shadow p-4">
              <div ref={invoiceRef}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h5 className="fw-bold">A.A. Samarasinghe Opticians</h5>
                    <p className="text-muted mb-0">123, Main Street, Colombo, Sri Lanka</p>
                    <p className="text-muted">Phone: 011-1234567</p>
                  </div>
                  <div className="text-end">
                    <h6 className="fw-bold">Invoice</h6>
                    <p className="mb-0">
                      <strong>Date:</strong> {selectedUser.date ? new Date(selectedUser.date).toLocaleDateString() : 'N/A'}
                    </p>
                    <p>
                      <strong>Invoice #:</strong> {selectedUser.cmd_id}
                    </p>
                  </div>
                </div>
                <hr />
                <Row className="mb-3">
                  <Col md={6}>
                    <h6 className="fw-bold">Billed To:</h6>
                    <p className="mb-1">{selectedUser.name}</p>
                    <p className="mb-1">{selectedUser.address}</p>
                    <p className="mb-1">Phone: {selectedUser.telephone}</p>
                    <p className="mb-1">Email: {selectedUser.email}</p>
                  </Col>
                </Row>
                <Table bordered responsive className="mb-4">
                  <thead className="table-light">
                    <tr>
                      <th>Description</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Purpose of Visit</td>
                      <td>{selectedUser.purpose_of_visit}</td>
                    </tr>
                    <tr>
                      <td>Purpose Remark</td>
                      <td>{selectedUser.purpose_of_visit_remark}</td>
                    </tr>
                    <tr>
                      <td>General Health</td>
                      <td>{selectedUser.general_health}</td>
                    </tr>
                    <tr>
                      <td>Medication</td>
                      <td>{selectedUser.general_health_medication}</td>
                    </tr>
                    <tr>
                      <td>Allergies</td>
                      <td>{selectedUser.general_health_allergies}</td>
                    </tr>
                    <tr>
                      <td>General Remarks</td>
                      <td>{selectedUser.general_health_remark}</td>
                    </tr>
                    <tr>
                      <td>Occular Health</td>
                      <td>{selectedUser.occular_health}</td>
                    </tr>
                    <tr>
                      <td>Occular Remarks</td>
                      <td>{selectedUser.occular_health_remark}</td>
                    </tr>
                    <tr>
                      <td>Symptoms</td>
                      <td>{selectedUser.symptoms}</td>
                    </tr>
                    <tr>
                      <td>Symptoms Remarks</td>
                      <td>{selectedUser.symptoms_remark}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>

              <Form>
                <Form.Group controlId="paymentType">
                  <Form.Label>Payment Type</Form.Label>
                  <Form.Select
                    value={selectedPaymentType || ''}
                    onChange={(e) =>
                      setSelectedPaymentType(e.target.value)
                    }
                  >
                    <option value="">-- Select Payment Type --</option>
                    <option value="full">Full Payment</option>
                    <option value="half">Half Payment</option>
                    {/* <option value="quarter">Quarter Payment</option> */}
                    <option value="none">No Payment</option>
                  </Form.Select>
                </Form.Group>
              </Form>

              {selectedPaymentType && (
                <>
                  {selectedPaymentType === 'full' && (
                    <Form.Group className="mt-3">
                      <Form.Label>Enter Full Amount</Form.Label>
                      <Form.Control type="number" placeholder="Full amount" onChange={(e) => setFullAmount(e.target.value)} />
                    </Form.Group>
                  )}

                  {selectedPaymentType === 'half' && (
                    <>
                      <Form.Group className="mt-3">
                        <Form.Label>Enter Full Amount</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Full amount"
                          onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            setHalfDetails({
                              full: val,
                              half: isNaN(val) ? '' : (val / 2).toFixed(2)
                            });
                          }}
                        />
                      </Form.Group>
                      <Form.Group className="mt-2">
                        <Form.Label>Half Amount</Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          value={halfDetails.half}
                        />
                      </Form.Group>
                    </>
                  )}

                  {selectedPaymentType === 'quarter' && (
                    <>
                      <Form.Group className="mt-3">
                        <Form.Label>Enter Full Amount</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Full amount"
                          onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            setQuarterDetails((prev) => ({
                              ...prev,
                              full: val,
                              quarter: isNaN(val) || !prev.count ? '' : (val / prev.count).toFixed(2)
                            }));
                          }}
                        />
                      </Form.Group>
                      <Form.Group className="mt-2">
                        <Form.Label>Enter Number of Quarters</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="E.g., 4"
                          onChange={(e) => {
                            const count = parseInt(e.target.value);
                            setQuarterDetails((prev) => ({
                              ...prev,
                              count,
                              quarter: isNaN(prev.full) || isNaN(count) || count === 0 ? '' : (prev.full / count).toFixed(2)
                            }));
                          }}
                        />
                      </Form.Group>
                      <Form.Group className="mt-2">
                        <Form.Label>Each Quarter Amount</Form.Label>
                        <Form.Control
                          type="text"
                          readOnly
                          value={quarterDetails.quarter}
                        />
                      </Form.Group>
                    </>
                  )}

                  {selectedPaymentType === 'none' && (
                    <Form.Group className="mt-3">
                      <Form.Label>Reason for No Payment</Form.Label>
                      <Form.Control as="textarea" rows={3} placeholder="Enter reason or note" onChange={(e) => setNoPayment(e.target.value)} />
                    </Form.Group>
                  )}
                </>
              )}

              <div className="text-end mt-4">
                <Button variant="outline-primary" onClick={() => submitPyament(selectedPaymentType)}>
                  Proceed
                </Button>
              </div>

            </Card>
          </Col>
        )}

      </Row>
    </React.Fragment>
  );
};

export default CashierInvoice;