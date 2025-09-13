import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Tabs, Tab, Form, Container, Button, Table } from 'react-bootstrap';
import axios from 'axios';
import { FaPhone, FaEnvelope, FaWhatsapp, FaSms, FaRegAddressCard } from 'react-icons/fa';
import { toast } from 'react-toastify';

const jobstatustype = [
    { id: 0, text: "Lens Ready" },
    { id: 1, text: "Lens Reorder" },
    { id: 2, text: "Job Ready" },
    { id: 3, text: "Removed" }
];

const notificationOptions = [
    { id: 0, text: "Call", icon: <FaPhone /> },
    { id: 1, text: "Postcard", icon: <FaRegAddressCard /> },
    { id: 2, text: "WhatsApp", icon: <FaWhatsapp /> },
    { id: 3, text: "Mail", icon: <FaEnvelope /> },
    { id: 4, text: "Message", icon: <FaSms /> }
];

const AssistanceJobStatus = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [searchCmdID, setSelectCmdID] = useState('');
    const [allPage, setAllPage] = useState(1);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [myselectDetails, setMySelectDeatils] = useState({});
    const [selectedJobStatus, setSelectedJobStatus] = useState([]);
    const [selectedNotifications, setSelectedNotifications] = useState([]);
    const [removeDate, setRemoveDate] = useState('');
    const [notificationDate, setNotificationDate] = useState('');

    useEffect(() => {
        axios
            .get('http://localhost:2776/api/order/assitance/job')
            .then((res) => setAllUsers(res.data))
            .catch((err) => console.log(err));
    }, []);

    const searchFilteredUsers = allUsers.filter((a) =>
        searchCmdID ? a.cmd_id?.toString().toLowerCase().includes(searchCmdID.toLowerCase()) : true
    );

    // Better formatDate that returns yyyy-mm-dd (works for input type=date)
    const formatDate = (value) => {
        if (!value) return "";
        const date = value instanceof Date ? value : new Date(value);
        if (isNaN(date.getTime())) return "";
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const today = formatDate(new Date());

    const allPerPage = 5;
    const allIndexLast = allPage * allPerPage;
    const allIndexFirst = allIndexLast - allPerPage;
    const paginatedAllUsers = searchFilteredUsers.slice(allIndexFirst, allIndexLast);
    const allTotalPages = Math.ceil(searchFilteredUsers.length / allPerPage) || 1;

    const selectDetails = (a) => {
        // set selected row id as well
        setSelectedUserId(a.c_id);
        setMySelectDeatils(a);

        // initialize date inputs from the data (convert to yyyy-mm-dd)
        setRemoveDate(formatDate(a.removed_date || a.removedDate || ''));
        setNotificationDate(formatDate(a.notification_date || a.notificationDate || ''));

        // initialize checkboxes: if backend gives comma-separated string, split it
        const initJobStatus = a.job_status
            ? (Array.isArray(a.job_status) ? a.job_status : String(a.job_status).split(',').map(s => s.trim()))
            : [];
        setSelectedJobStatus(initJobStatus);

        const initNotifs = a.notification_type
            ? (Array.isArray(a.notification_type) ? a.notification_type : String(a.notification_type).split(',').map(s => s.trim()))
            : [];
        setSelectedNotifications(initNotifs);
    };

    const toggleJobStatus = (status) => {
        setSelectedJobStatus((prev) =>
            prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
        );
    };

    const toggleNotification = (option) => {
        setSelectedNotifications((prev) =>
            prev.includes(option) ? prev.filter((s) => s !== option) : [...prev, option]
        );
    };

    const updateStatus = (a) => {
        const ob = {
            notificationDate: notificationDate || null,
            selectedNotifications: selectedNotifications.length ? selectedNotifications.join(', ') : '',
            selectedJobStatus: selectedJobStatus.length ? selectedJobStatus.join(', ') : '',
            removeDate: removeDate || null
        };

        axios.put(`http://localhost:2776/api/order/jobstatus/${a}`, ob).then((res) => {
            console.log('DOne')
            toast.success("Status Updated!")
        }).catch((err) => {
            console.log("Error in updating status")
        })
    };

    const complateOrder = (a) => {
        if (myselectDetails.report_status == "Complete_Full_Payment") {
            axios.put(`http://localhost:2776/api/order/finished/${a}`).then((res) => {
                toast.success("Status Updated!")
            }).catch((err) => {
                console.log("Error in updating status")
            })
        } else if (myselectDetails.report_status == "Complete_Full_Advance") {
            toast.error("Payment doesnt complate - Advance payment done!")
        } else {
            toast.error("System Error!")
        }

    }

    console.log(myselectDetails)

    return (
        <React.Fragment>
            {/* Search Bar */}
            <Row>
                <Col md={12} xl={12}>
                    <Card>
                        <Card.Header>
                            <Container>
                                <Row className="align-items-center">
                                    <Col>
                                        <Card.Title as="h5" style={{ fontWeight: 'bold' }}>
                                            Check Job Status
                                        </Card.Title>
                                    </Col>
                                </Row>
                            </Container>
                            <div className="d-flex flex-wrap align-items-end gap-2 mt-2">
                                <Form.Group style={{ minWidth: '200px' }}>
                                    <Form.Label className="mb-0 small text-muted">Enter Job No</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={searchCmdID}
                                        onChange={(e) => {
                                            setSelectCmdID(e.target.value);
                                            setAllPage(1);
                                        }}
                                    />
                                </Form.Group>

                                <Button
                                    variant="outline-secondary"
                                    size="sm"
                                    onClick={() => {
                                        setSelectCmdID('');
                                        setAllPage(1);
                                    }}
                                >
                                    Clear Data
                                </Button>
                            </div>
                        </Card.Header>
                    </Card>
                </Col>
            </Row>

            {/* Users Table */}
            <Row className="mt-1">
                <Col>
                    <Tabs defaultActiveKey="all" id="job-status-tabs">
                        <Tab eventKey="all" title="All">
                            <Table bordered hover responsive className="table-sm align-middle shadow-sm text-center">
                                <thead className="bg-primary text-white">
                                    <tr>
                                        <th>Job No</th>
                                        <th>Date</th>
                                        <th>First Name</th>
                                        <th>Email</th>
                                        <th>Mobile</th>
                                        <th>Age</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedAllUsers.length > 0 ? (
                                        paginatedAllUsers.map((a) => {
                                            const isSelected = selectedUserId === a.c_id;
                                            return (
                                                <tr
                                                    key={a.c_id}
                                                    onClick={() => setSelectedUserId(a.c_id)}
                                                    style={{
                                                        cursor: 'pointer',
                                                        backgroundColor: isSelected ? '#dbeafe' : 'transparent',
                                                        fontWeight: isSelected ? 'bold' : 'normal'
                                                    }}
                                                >
                                                    <td>{a.cmd_id}</td>
                                                    <td>{formatDate(a.date)}</td>
                                                    <td>{a.name}</td>
                                                    <td>{a.email}</td>
                                                    <td>{a.telephone}</td>
                                                    <td>{a.age}</td>
                                                    <td>
                                                        <Button variant="primary" onClick={() => selectDetails(a)}>
                                                            View
                                                        </Button>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="text-muted">
                                                No jobs found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>

                            <div className="d-flex justify-content-center mt-3">
                                <Button
                                    variant="outline-secondary"
                                    size="sm"
                                    className="m-1"
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
                                    className="m-1"
                                    onClick={() => setAllPage((prev) => Math.min(prev + 1, allTotalPages))}
                                    disabled={allPage === allTotalPages}
                                >
                                    Next
                                </Button>
                            </div>
                        </Tab>
                    </Tabs>
                </Col>
            </Row>

            {/* Job Details */}
            <Card className="mt-3">
                <Card.Header>
                    <Container>
                        <Row>
                            <Col>
                                <Card.Title as="h5" style={{ fontWeight: 'bold' }}>
                                    Job Details
                                </Card.Title>
                            </Col>
                        </Row>
                    </Container>
                </Card.Header>
                <Card.Body>
                    {selectedUserId ? (
                        <>
                            <Row className="mb-3">
                                <Col md={6}></Col>
                                <Col md={1}></Col>
                                <Col
                                    md={3}
                                    className="border rounded shadow-sm py-2"
                                    style={{ textAlign: "center", fontWeight: "600", color: "black", backgroundColor: "#f8f9fa" }}
                                >
                                    Reference Number : {myselectDetails.cmd_id}
                                </Col>
                                <Col
                                    md={2}
                                    className="border rounded shadow-sm py-2"
                                    style={{ textAlign: "center", fontWeight: "600", color: "black", backgroundColor: "#f8f9fa" }}
                                >
                                    Date : {formatDate(today)}
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col md={1} className="py-2 fw-semibold" style={{ color: "black" }}>
                                    Name
                                </Col>
                                <Col md={4} className="border rounded py-2" style={{ color: "black", backgroundColor: "#ffffff" }}>
                                    {myselectDetails.prefix} {myselectDetails.first_name} {myselectDetails.name}
                                </Col>
                                <Col md={1}></Col>
                                <Col md={3} className="border rounded py-2 fw-semibold text-center" style={{ backgroundColor: "#f8f9fa", color: "black" }}>
                                    Lens
                                </Col>
                                <Col md={3} className="border rounded py-2 fw-semibold text-center" style={{ backgroundColor: "#f8f9fa", color: "black" }}>
                                    Frame
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col md={1} className="py-2 fw-semibold" style={{ color: "black" }}>
                                    City
                                </Col>
                                <Col md={4} className="border rounded py-2" style={{ color: "black", backgroundColor: "#ffffff" }}>
                                    {myselectDetails.town}
                                </Col>
                                <Col md={1}></Col>
                                <Col md={1} className="border rounded py-2 fw-semibold" style={{ backgroundColor: "#f8f9fa", color: "black" }}>
                                    Type
                                </Col>
                                <Col md={2} className="border rounded py-2" style={{ backgroundColor: "#ffffff", color: "black" }}>
                                    {myselectDetails.Lenses_Type}
                                </Col>
                                <Col md={1} className="border rounded py-2 fw-semibold" style={{ backgroundColor: "#f8f9fa", color: "black" }}>
                                    Category
                                </Col>
                                <Col md={2} className="border rounded py-2" style={{ backgroundColor: "#ffffff", color: "black" }}>
                                    {myselectDetails.Frame_Category}
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col md={1} className="py-2 fw-semibold" style={{ color: "black" }}>
                                    Mobile
                                </Col>
                                <Col md={4} className="border rounded py-2" style={{ backgroundColor: "#ffffff", color: "black" }}>
                                    {myselectDetails.telephone}
                                </Col>
                                <Col md={1}></Col>
                                <Col md={1} className="border rounded py-2 fw-semibold" style={{ backgroundColor: "#f8f9fa", color: "black" }}>
                                    Lens At
                                </Col>
                                <Col md={2} className="border rounded py-2" style={{ backgroundColor: "#ffffff", color: "black" }}>
                                    {myselectDetails.Lenses_At}
                                </Col>
                                <Col md={1} className="border rounded py-2 fw-semibold" style={{ backgroundColor: "#f8f9fa", color: "black" }}>
                                    Type
                                </Col>
                                <Col md={2} className="border rounded py-2" style={{ backgroundColor: "#ffffff", color: "black" }}>
                                    {myselectDetails.Frame_type}
                                </Col>
                            </Row>

                            <Row className="mb-3">
                                <Col md={1} className="py-2 fw-semibold" style={{ color: "black" }}>
                                    Mobile 2
                                </Col>
                                <Col md={4} className="border rounded py-2" style={{ backgroundColor: "#ffffff", color: "black" }}>
                                    {myselectDetails.mobile2}
                                </Col>
                                <Col md={1}></Col>
                                <Col md={3} className="border rounded py-2 fw-semibold text-center" style={{ backgroundColor: "#f8f9fa", color: "black" }}>
                                    Lens Reorder Date
                                </Col>
                                <Col md={3} className="border rounded py-2 text-center" style={{ backgroundColor: "#ffffff", color: "black" }}>
                                    {formatDate(myselectDetails.Lens_OrderDate)}
                                </Col>
                            </Row>


                            {/* ... other fields omitted for brevity, unchanged ... */}

                            {/* Job Status + Notification */}
                            <Row style={{ paddingTop: 40 }}>
                                {/* Job Status */}
                                <Col md={5}>
                                    <Container style={{ backgroundColor: "#fdfdfd" }}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-bold fs-5 text-dark">Job Status</Form.Label>

                                            <div className="d-flex flex-column gap-2 mt-2">
                                                {jobstatustype.map((p) => (
                                                    <Form.Check
                                                        key={p.id}
                                                        type="checkbox"
                                                        label={<span className="d-flex align-items-center gap-2 text-dark">{p.text}</span>}
                                                        value={p.text}
                                                        checked={selectedJobStatus.includes(p.text)}
                                                        onChange={() => toggleJobStatus(p.text)}
                                                    />
                                                ))}

                                                {/* Removed Date */}
                                                <Row className="align-items-center mt-3">
                                                    <Col xs="auto">
                                                        <Form.Label className="fw-semibold text-dark me-3">Removed Date</Form.Label>
                                                    </Col>
                                                    <Col>
                                                        {/* Controlled input bound to removeDate */}
                                                        <Form.Control
                                                            type="date"
                                                            value={removeDate || ''}
                                                            onChange={(e) => setRemoveDate(e.target.value)}
                                                        />
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Form.Group>
                                    </Container>
                                </Col>

                                <Col md={2}></Col>

                                {/* Customer Notification */}
                                <Col md={5}>
                                    <Container style={{ backgroundColor: "#fdfdfd" }}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-bold fs-5 text-dark">Customer Notification</Form.Label>

                                            <div className="d-flex flex-column gap-2 mt-2">
                                                {notificationOptions.map((opt) => (
                                                    <Form.Check
                                                        key={opt.id}
                                                        type="checkbox"
                                                        id={`notif-${opt.id}`}
                                                        label={<span className="d-flex align-items-center gap-2 text-dark">{opt.icon} {opt.text}</span>}
                                                        checked={selectedNotifications.includes(opt.text)}
                                                        onChange={() => toggleNotification(opt.text)}
                                                    />
                                                ))}

                                                {/* Sent Date */}
                                                <Row className="align-items-center mt-3">
                                                    <Col xs="auto">
                                                        <Form.Label className="fw-semibold text-dark me-3">Sent Date</Form.Label>
                                                    </Col>
                                                    <Col>
                                                        {/* Controlled input bound to notificationDate */}
                                                        <Form.Control
                                                            type="date"
                                                            value={notificationDate || ''}
                                                            onChange={(e) => setNotificationDate(e.target.value)}
                                                        />
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Form.Group>
                                    </Container>
                                </Col>
                            </Row>

                            <Row style={{ paddingTop: 20 }}>
                                <Button variant="primary" onClick={() => updateStatus(myselectDetails.coaldid)}>
                                    Update
                                </Button>
                            </Row>

                            <Row style={{ paddingTop: 20 }}>
                                <Button variant="success" onClick={() => complateOrder(myselectDetails.cmd_id)}>
                                    Complete Order
                                </Button>
                            </Row>
                        </>
                    ) : (
                        <p className="text-muted">Select a job to view details.</p>
                    )}
                </Card.Body>
            </Card>
        </React.Fragment>
    );
};

export default AssistanceJobStatus;
