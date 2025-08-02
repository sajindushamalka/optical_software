import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Card, Tabs, Tab, Form, Container, Button, Table } from 'react-bootstrap';
import avatar1 from '../../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../../assets/images/user/avatar-3.jpg';
import axios from 'axios';

const CashierHistory = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [allPage, setAllPage] = useState(1);
    const allPerPage = 5;
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const invoiceRef = useRef();
    const today = new Date().toLocaleDateString();

    useEffect(() => {
        axios
            .get('http://localhost:2776/api/cahsier')
            .then((res) => setAllUsers(res.data))
            .catch((err) => console.log(err));
    }, []);

    const searchFilteredUsers = allUsers.filter((user) =>
        Object.values(user).some((value) =>
            value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const allIndexLast = allPage * allPerPage;
    const allIndexFirst = allIndexLast - allPerPage;
    const paginatedAllUsers = searchFilteredUsers.slice(allIndexFirst, allIndexLast);
    const allTotalPages = Math.ceil(searchFilteredUsers.length / allPerPage);

    const handleUserClick = (user) => {
        setSelectedUser(user);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const finishOrder = () => {
        axios.put(`http://localhost:2776/api/customer/med/cashier/finish/${selectedUser.cmd_id}`).then((res) => {
            console.log(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const complateOrder = () => {
        const ob = {
            opt_id: selectedUser.cmd_id,
            date: formatDate(today),
            full_amount: selectedUser.full_amount.toFixed(2),
            quarter_amount: 0,
            count: 0,
            half: selectedUser.full_amount.toFixed(2) - selectedUser.half.toFixed(2),
            noneMes: 'null',
            typep: 'half'
        }
        axios.post(`http://localhost:2776/api/cahsier`, ob).then((res) => {
            axios.put(`http://localhost:2776/api/customer/med/cashier/finish/${selectedUser.cmd_id}`).then((res) => {
                console.log('Done')
            }).catch((err) => {
                console.log('Error')
            })

        }).catch((err) => {
            console.log(err)
        })
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
                                            Invoices History
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
                                            className={`d-flex friendlist-box align-items-center justify-content-center m-b-10 m-t-20 ${isSelected ? 'bg-light shadow-sm rounded' : ''
                                                }`}
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => handleUserClick(user)}
                                        >
                                            <div className="m-r-10 photo-table flex-shrink-0">
                                                <img
                                                    className="rounded-circle"
                                                    style={{ width: '40px' }}
                                                    src={
                                                        user.gender === 'male'
                                                            ? avatar2
                                                            : user.gender === 'female'
                                                                ? avatar3
                                                                : avatar1
                                                    }
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
                        <div ref={invoiceRef} className="p-4 bg-white border rounded shadow-sm" id="invoice-section">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <div>
                                    <h4 className="fw-bold mb-1">INVOICE</h4>
                                    <p className="text-muted mb-0">Invoice Date: {formatDate(selectedUser.date)}</p>
                                    <p className="text-muted">Invoice No: INV-{selectedUser.c_id}</p>
                                </div>
                                <div className="text-end">
                                    <h6 className="fw-bold mb-1">{selectedUser.name}</h6>
                                    <p className="mb-0">{selectedUser.email}</p>
                                    <p className="mb-0">{selectedUser.telephone}</p>
                                    <p className="mb-0">{selectedUser.address}</p>
                                </div>
                            </div>

                            <h6 className="fw-bold border-bottom pb-2 mb-3">Personal Details</h6>
                            <Row>
                                <Col md={6}>
                                    <p><strong>NIC:</strong> {selectedUser.nic}</p>
                                    <p><strong>Gender:</strong> {selectedUser.gender}</p>
                                    <p><strong>Age:</strong> {selectedUser.age}</p>
                                    <p><strong>DOB:</strong> {formatDate(selectedUser.dob)}</p>
                                    <p><strong>Occupation:</strong> {selectedUser.occupation}</p>
                                </Col>
                                <Col md={6}>
                                    <p><strong>Registered Date:</strong> {formatDate(selectedUser.reg_date)}</p>
                                    <p><strong>Mobile 2:</strong> {selectedUser.mobile2}</p>
                                    <p><strong>Type of Lenses:</strong> {selectedUser.type_of_lenses_used}</p>
                                    <p><strong>Purpose of Visit:</strong> {selectedUser.purpose_of_visit}</p>
                                </Col>
                            </Row>

                            <h6 className="fw-bold border-bottom pb-2 mt-4 mb-3">Medical Details</h6>
                            <Row>
                                <Col md={6}>
                                    <p><strong>Symptoms:</strong> {selectedUser.symptoms}</p>
                                    <p><strong>General Health:</strong> {selectedUser.general_health}</p>
                                </Col>
                                <Col md={6}>
                                    <p><strong>Occular Health:</strong> {selectedUser.occular_health}</p>
                                </Col>
                            </Row>

                            <h6 className="fw-bold border-bottom pb-2 mt-4 mb-3">Payment Details</h6>
                            <Table bordered>
                                <thead>
                                    <tr>
                                        <th>Payment Type</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedUser.full_amount > 0 && (
                                        <tr>
                                            <td>Full Payment</td>
                                            <td>Rs. {selectedUser.full_amount.toFixed(2)}</td>
                                        </tr>
                                    )}
                                    {selectedUser.half > 0 && (
                                        <tr>
                                            <td>Half Payment</td>
                                            <td>Rs. {selectedUser.half.toFixed(2)}</td>
                                        </tr>
                                    )}
                                    {/* {selectedUser.quarter_amount > 0 && (
                                        <tr>
                                            <td>Quarter Payment</td>
                                            <td>Rs. {selectedUser.quarter_amount.toFixed(2)}</td>
                                        </tr>
                                    )} */}
                                    {selectedUser.typep === 'none' && selectedUser.noneMes !== 'null' && (
                                        <tr>
                                            <td>No Payment</td>
                                            <td>{selectedUser.noneMes}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </div>

                        <div className="text-end mt-3 d-print-none">
                            {/* Conditionally Render Completion Buttons */}
                            {selectedUser.typep === 'half' ? (
                                <Button variant="warning" className="me-2" onClick={complateOrder}>
                                    Complete Payment
                                </Button>
                            ) : selectedUser.typep === 'full' ? (
                                <Button variant="success" className="me-2" onClick={finishOrder}>
                                    Mark as Finished
                                </Button>
                            ) : null}

                            {/* Print Button */}
                            <Button
                                variant="primary"
                                onClick={() => {
                                    const originalContents = document.body.innerHTML;
                                    const printContents = invoiceRef.current.innerHTML;
                                    document.body.innerHTML = printContents;
                                    window.print();
                                    document.body.innerHTML = originalContents;
                                    window.location.reload();
                                }}
                            >
                                Print Invoice
                            </Button>
                        </div>
                    </Col>
                )}
            </Row>
        </React.Fragment>
    );
};

export default CashierHistory;
