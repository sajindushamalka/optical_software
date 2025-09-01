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

  useEffect(() => {
    axios.get('http://localhost:2776/api/order/all/optimistric')
      .then((res) => setAllOrders(res.data))
      .catch((err) => console.error(err));
  }, []);

  console.log(allOrders)

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
                    a.report_status === "Complete" ? "success" :
                      a.report_status === "Pass_to_Cash" ? "info" :
                        a.report_status === "Pass_to_Ass" ? "warning" :
                          a.report_status === "Pass_to_O" ? "primary" :
                            "secondary"
                  }>
                    {a.report_status.replace(/_/g, ' ')}
                  </Badge>
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
                  {renderTab("Pass_to_O")}
                </Tab>
                <Tab eventKey="assistance" title="Assistance">
                  {renderTab("Pass_to_Ass")}
                </Tab>
                <Tab eventKey="cashier" title="Cashier">
                  {renderTab("Pass_to_Cash")}
                </Tab>
                <Tab eventKey="completed" title="Completed">
                  {renderTab("Complete")}
                </Tab>
                <Tab eventKey="all" title="All">
                  {renderTab(null)}
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AssistanceAllOrder;
