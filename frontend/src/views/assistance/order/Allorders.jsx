import React, { useEffect, useState } from 'react';
import {
  Row, Col, Card, Tabs, Tab, Form, Container, Button, Table, Badge,
} from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const AssistanceAllOrder = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allOrders, setAllOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [optimistEnterDetails, setoptimistEnterDetails] = useState(['']);
  const [optimistReadlEnterDetails, setoptimistRealEnterDetails] = useState(['']);
  const [optimistReadlSecEnterDetails, setoptimistRealSecEnterDetails] = useState(['']);
  const [optimistReadlNextEnterDetails, setoptimistRealNextEnterDetails] = useState(['']);
  const [optimistObjDetails, setoptimistObjDetails] = useState(['']);
  const [optimistObjRemarkDetails, setoptimistObjRemarkDetails] = useState('');
  const [optimistConRemarkDetails, setoptimistConRemarkDetails] = useState('');
  const [optimistConDetails, setoptimistConDetails] = useState(['']);
  const [optimistMoreDetails, setoptimistMoreDetails] = useState('');

  useEffect(() => {
    axios.get('http://localhost:2776/api/customer/med/all')
      .then((res) => setAllOrders(res.data))
      .catch((err) => console.error(err));
  }, []);

  console.log(allOrders)

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const filteredOrders = allOrders.filter(order =>
    order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.nic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginate = (items) => {
    const start = (currentPage - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  };

  const renderTab = (status) => {
    const orders = status ? filteredOrders.filter(a => a.report_status === status) : filteredOrders;
    const paginated = paginate(orders);

    return (
      <>
        <Table striped bordered hover responsive className="mt-3">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>NIC</th>
              <th>Age</th>
              <th>Telephone</th>
              <th>DOB</th>
              <th>Address</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((a, ind) => (
              <tr key={ind}>
                <td>{(currentPage - 1) * itemsPerPage + ind + 1}</td>
                <td>{a.name}</td>
                <td>{a.email}</td>
                <td>{a.nic}</td>
                <td>{a.age}</td>
                <td>{a.telephone}</td>
                <td>{new Date(a.dob).toLocaleDateString()}</td>
                <td>{a.address}</td>
                <td>
                  <Badge bg={
                    a.report_status === "Completed" ? "success" :
                      a.report_status === "Pass_to_Cashier" ? "info" :
                        a.report_status === "Pass_to_Assistance" ? "warning" :
                          a.report_status === "Pass_to_optometrist" ? "primary" :
                            "secondary"
                  }>
                    {a.report_status.replace(/_/g, ' ')}
                  </Badge>
                </td>
                <td>
                  <Button size="sm" variant="outline-primary" onClick={() => { setSelectedOrder(a); getOtherMedDeatils(a) }}>
                    Select
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="d-flex justify-content-between p-3">
          <Button
            variant="outline-secondary"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => setCurrentPage(prev => (orders.length > prev * itemsPerPage ? prev + 1 : prev))}
            disabled={orders.length <= currentPage * itemsPerPage}
          >
            Next
          </Button>
        </div>
      </>
    );
  };

  const getOtherMedDeatils = (ob) => {
    const ob2 = {
      date: formatDate(ob.date),
      ccmd_id: ob.cmd_id,
      cid: ob.cid
    }

    axios.post('http://localhost:2776/api/customer/med/rx/selected', ob2).then((res) => {
      setoptimistEnterDetails(res.data)
    }).catch((err) => {
      console.log(err)
    })

    const ob3 = {
      date: formatDate(ob.date),
      ccmd_id: ob.cmd_id,
    }

    axios.post('http://localhost:2776/api/opt/med/history', ob3).then((res) => {
      setoptimistRealEnterDetails(res.data)
    }).catch((err) => {
      console.log(err)
    })

    axios.post('http://localhost:2776/api/opt/med/history/thi', ob3).then((res) => {
      setoptimistRealSecEnterDetails(res.data)
    }).catch((err) => {
      console.log(err)
    })

    axios.post('http://localhost:2776/api/opt/med/history/sec', ob3).then((res) => {
      setoptimistRealNextEnterDetails(res.data)
    }).catch((err) => {
      console.log(err)
    })

    axios.post('http://localhost:2776/api/opt/med/history/obj', ob3).then((res) => {
      setoptimistObjDetails(res.data)
    }).catch((err) => {
      console.log(err)
    })

    const ob4 = {
      date: formatDate(ob.date),
      ccmd_id: ob.cmd_id,
      category: "Objective"
    }


    axios.post('http://localhost:2776/api/opt/med/history/obj/remark', ob4).then((res) => {
      setoptimistObjRemarkDetails(res.data)
    }).catch((err) => {
      console.log(err)
    })

    axios.post('http://localhost:2776/api/opt/med/history/con', ob3).then((res) => {
      setoptimistConDetails(res.data)
    }).catch((err) => {
      console.log(err)
    })

    const ob5 = {
      date: formatDate(ob.date),
      ccmd_id: ob.cmd_id,
      category: "Contact Lenses"
    }

    axios.post('http://localhost:2776/api/opt/med/history/obj/remark', ob5).then((res) => {
      setoptimistConRemarkDetails(res.data)
    }).catch((err) => {
      console.log(err)
    })

    axios.post('http://localhost:2776/api/opt/med/history/more', ob3).then((res) => {
      setoptimistMoreDetails(res.data)
      console.log(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <Container fluid className="mt-4">
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Row className="align-items-center">
                <Col>
                  <Card.Title as="h5" className="fw-bold mb-0">All Orders</Card.Title>
                </Col>
                <Col md="4">
                  <Form.Control
                    type="text"
                    placeholder="Search by name, email, or NIC..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </Col>
              </Row>
            </Card.Header>

            <Card.Body>
              <Tabs defaultActiveKey="optometrist" id="order-tabs" className="mb-3">
                <Tab eventKey="optometrist" title="Optometrist">
                  {renderTab("Pass_to_optometrist")}
                </Tab>
                <Tab eventKey="assistance" title="Assistance">
                  {renderTab("Pass_to_Assistance")}
                </Tab>
                <Tab eventKey="cashier" title="Cashier">
                  {renderTab("Pass_to_Cashier")}
                </Tab>
                <Tab eventKey="completed" title="Completed">
                  {renderTab("Completed")}
                </Tab>
                <Tab eventKey="all" title="All">
                  {renderTab(null)}
                </Tab>
              </Tabs>

              {selectedOrder && (
                <div className=" mt-5 rounded">
                  <h5 className="mb-4 text-primary" style={{ fontWeight: '600' }}>
                    🧑‍⚕️ Medical Report Information
                  </h5>

                  <Row style={{ padding: 15 }}>
                    <Col md={3} className="mb-4">
                      <small className="text-muted d-block mb-1">Purpose of Visit</small>
                      <h6 className="mb-2">{selectedOrder.purpose_of_visit || 'N/A'}</h6>
                      <small className="text-muted d-block mb-1">Remarks</small>
                      <h6 className="mb-0">{selectedOrder.purpose_of_visit_remark || 'N/A'}</h6>
                      <small className="text-muted d-block mt-5 mb-1">Type of Lenses used</small>
                      <h6 className="mb-0">{selectedOrder.type_of_lenses_used || 'N/A'}</h6>
                    </Col>

                    <Col md={3} className="mb-4">
                      <small className="text-muted d-block mb-1">General Health</small>
                      <h6 className="mb-2">{selectedOrder.general_health || 'N/A'}</h6>
                      <small className="text-muted d-block mb-1">Remarks</small>
                      <h6 className="mb-2">{selectedOrder.general_health_remark || 'N/A'}</h6>
                      <small className="text-muted d-block mb-1">Allergies</small>
                      <h6 className="mb-2">{selectedOrder.general_health_allergies || 'N/A'}</h6>
                      <small className="text-muted d-block mb-1">Medication</small>
                      <h6 className="mb-0">{selectedOrder.general_health_medication || 'N/A'}</h6>
                    </Col>

                    <Col md={3} className="mb-4">
                      <small className="text-muted d-block mb-1">Occular Health</small>
                      <h6 className="mb-2">{selectedOrder.occular_health || 'N/A'}</h6>
                      <small className="text-muted d-block mb-1">Remarks</small>
                      <h6 className="mb-0">{selectedOrder.occular_health_remark || 'N/A'}</h6>
                        <small className="text-muted d-block mb-1">Amount</small>
                      <h6 className="mb-0">{selectedOrder.amount || 'N/A'}</h6>
                    </Col>

                    <Col md={3} className="mb-4">
                      <small className="text-muted d-block mb-1">Symptoms</small>
                      <h6 className="mb-2">{selectedOrder.symptoms || 'N/A'}</h6>
                      <small className="text-muted d-block mb-1">Remarks</small>
                      <h6 className="mb-0">{selectedOrder.symptoms_remark || 'N/A'}</h6>
                    </Col>
                  </Row>

                  <h6 className="m-3 text-info" style={{ fontWeight: '600' }}>
                    Assistance Informations
                  </h6>

                  <Row style={{ padding: 15 }}>
                    {optimistEnterDetails.map((r) => (
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


                  {optimistReadlEnterDetails ?
                    <Row style={{ padding: 15 }}>
                      <h6 className="text-info" style={{ fontWeight: '600' }}>
                        Optometrist Informations - Subjective
                      </h6>
                      {optimistReadlEnterDetails.map((r) => (
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

                    </Row> : null

                  }

                  {optimistReadlSecEnterDetails ?
                    <Row style={{ padding: 15 }}>
                      {optimistReadlSecEnterDetails.map((m) => (
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
                    : null
                  }

                  {optimistReadlNextEnterDetails ?
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
                            {optimistReadlNextEnterDetails.map((un) => (
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
                            {optimistReadlNextEnterDetails.map((un) => (
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
                            {optimistReadlNextEnterDetails.map((un) => (
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
                            {optimistReadlNextEnterDetails.map((un) => (
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
                    : null
                  }

                  {optimistObjDetails ?


                    <Row style={{ padding: 15 }}>

                      <h6 className="text-info" style={{ fontWeight: '600' }}>
                        Optometrist Informations - Objective
                      </h6>

                      {optimistObjDetails.map((a) =>
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

                      {optimistObjRemarkDetails ?
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                          <Form.Label>Remarks</Form.Label>
                          {optimistObjRemarkDetails.map((r) => (
                            <>{r.cateogry == 'Objective' ? <Form.Control as="textarea" rows="3" value={r.remark} /> : null}</>
                          ))}
                        </Form.Group>
                        : null}
                    </Row>
                    : null
                  }


                  {optimistConDetails ?

                    <div style={{ padding: 15 }}>
                      <h6 className="text-info" style={{ fontWeight: '600' }}>
                        Optometrist Informations - Contact Lense
                      </h6>


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
                          {optimistConDetails.map((c) => (
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
                      {optimistConRemarkDetails ?
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                          <Form.Label>Remarks</Form.Label>
                          {optimistConRemarkDetails.map((r) => (
                            <>{r.cateogry == 'Contact Lenses' ? <Form.Control as="textarea" rows="3" value={r.remark} /> : null}</>
                          ))}
                        </Form.Group>
                        : null}
                    </div>
                    : null}

                  {optimistMoreDetails ?

                    <Row style={{ padding: 15, textAlign: 'center' }}>
                      <Col md={4}>
                        <small className="text-muted d-blockmb-1">Type of Lenses used</small>
                        <h6 className="mb-0">{optimistMoreDetails.type_od_lense || 'N/A'}</h6>
                      </Col>
                      <Col md={4}>
                        <small className="text-muted d-blockmb-1">Time Period</small>
                        <h6 className="mb-0">{optimistMoreDetails.time_period || 'N/A'}</h6>
                      </Col>
                      <Col md={4}>
                        <small className="text-muted d-blockmb-1">More Info</small>
                        <h6 className="mb-0">{optimistMoreDetails.more || 'N/A'}</h6>
                      </Col>
                    </Row>
                    : null}


                </div>


              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AssistanceAllOrder;
