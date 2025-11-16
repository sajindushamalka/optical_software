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
    const [selectedStep, setSelectedStep] = useState(0);


    useEffect(() => {
        axios
            .get('http://localhost:2776/api/order/assitance/job')
            .then((res) => setAllUsers(res.data))
            .catch((err) => console.log(err));
    }, []);

    const searchFilteredUsers = allUsers.filter((a) =>
        searchCmdID ? a.job_no?.toString().toLowerCase().includes(searchCmdID.toLowerCase()) : true
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

        console.log(ob)

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
                window.location.reload();
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
            {searchCmdID ? 
            <Row className="mt-1">
                <Col>
                    <Tabs defaultActiveKey="all" id="job-status-tabs">
                        <Tab eventKey="all" title="All">
                            <Table bordered hover responsive className="table-sm align-middle shadow-sm text-center">
                                <thead className="bg-primary text-white">
                                    <tr>
                                        <th>Job No</th>
                                        <th>Date</th>
                                        <th>Name</th>
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
                                                    <td>{a.job_no}</td>
                                                    <td>{formatDate(a.date)}</td>
                                                    <td>{a.prefix} {" "} {a.first_name} {" "} {a.name}</td>
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

            : null}

            <Card className="mt-4 shadow-sm border-0 rounded-3">
                <Card.Header className="text-white rounded-top-1">
                    <Container fluid>
                        <Row className="align-items-center">
                            <Col>
                                <Card.Title as="h5" className="fw-bold mb-0">
                                    Job Details
                                </Card.Title>
                            </Col>
                        </Row>
                    </Container>
                </Card.Header>

                <Card.Body className="bg-light" style={{ fontSize: 13 }}>
                    {selectedUserId ? (
                        <>
                            {/* Reference Info */}
                            <Row className="m-1">
                                <Col md={{ span: 3, offset: 6 }}>
                                    <div className="bg-white border shadow-sm  px-3 py-2 fw-semibold text-dark">
                                        Job No : {myselectDetails.job_no}
                                    </div>
                                </Col>
                                <Col md={3}>
                                    <div className="bg-white border shadow-sm  px-3 py-2 fw-semibold text-dark">
                                        Date : {formatDate(today)}
                                    </div>
                                </Col>
                            </Row>

                            {/* Basic Info */}
                            <Row className="align-items-center m-1 pt-3">
                                <Col md={1} className="fw-semibold text-dark">
                                    Name
                                </Col>
                                <Col md={4} className="border bg-white rounded-2 py-2 text-dark">
                                    {myselectDetails.prefix} {myselectDetails.first_name} {myselectDetails.name}
                                </Col>

                                <Col md={1}></Col>

                                <Col md={3} className="text-center fw-semibold text-dark bg-primary-subtle border  py-2">
                                    Lens
                                </Col>
                                <Col md={3} className="text-center fw-semibold text-dark bg-primary-subtle border  py-2">
                                    Frame
                                </Col>
                            </Row>

                            <Row className="align-items-center m-1">
                                <Col md={1} className="fw-semibold text-dark">City</Col>
                                <Col md={4} className="border bg-white rounded-2 py-2 text-dark">{myselectDetails.town}</Col>

                                <Col md={1}></Col>

                                <Col md={1} className="fw-semibold text-dark bg-primary-subtle border  py-2 text-center">
                                    Type
                                </Col>
                                <Col md={2} className="border bg-white py-2 text-dark text-center">
                                    {myselectDetails.Lenses_Type}
                                </Col>

                                <Col md={1} className="fw-semibold text-dark bg-primary-subtle border  py-2 text-center">
                                    Category
                                </Col>
                                <Col md={2} className="border bg-white  py-2 text-dark text-center">
                                    {myselectDetails.Frame_Category}
                                </Col>
                            </Row>

                            <Row className="align-items-center m-1">
                                <Col md={1} className="fw-semibold text-dark">Mobile</Col>
                                <Col md={4} className="border bg-white rounded-2 py-2 text-dark">{myselectDetails.telephone}</Col>

                                <Col md={1}></Col>

                                <Col md={1} className="fw-semibold text-dark bg-primary-subtle border  py-2 text-center">
                                    Lens At
                                </Col>
                                <Col md={2} className="border bg-white  py-2 text-dark text-center">{myselectDetails.Lenses_At}</Col>

                                <Col md={1} className="fw-semibold text-dark bg-primary-subtle border  py-2 text-center">
                                    Type
                                </Col>
                                <Col md={2} className="border bg-white  py-2 text-dark text-center">{myselectDetails.Frame_type}</Col>
                            </Row>

                            <Row className="align-items-center m-1 ">
                                <Col md={1} className="fw-semibold text-dark">Mobile 2</Col>
                                <Col md={4} className="border bg-white rounded-2 py-2 text-dark">{myselectDetails.mobile2}</Col>

                                <Col md={1}></Col>

                                <Col md={3} className="fw-semibold text-dark bg-primary-subtle border py-2 text-center">
                                    Lens Reorder Date
                                </Col>
                                <Col md={3} className="border bg-white py-2 text-dark text-center">
                                    {formatDate(myselectDetails.Lens_OrderDate)}
                                </Col>
                            </Row>

                            {/* Job Status + Notifications */}
                            <Row className="mt-4 mb-3">
                                {/* <Col md={6} >
                                    <Card className="border-0 shadow-sm rounded-3 h-100">
                                        <Card.Body>
                                            <Form.Group>
                                                <Form.Label className="fw-bold text-dark mb-4">Job Status</Form.Label>
                                                <div className="d-flex flex-wrap gap-3">
                                                    {jobstatustype.map((p) => (
                                                        <Form.Check
                                                            key={p.id}
                                                            type="checkbox"
                                                            label={<span className="text-dark">{p.text}</span>}
                                                            checked={selectedJobStatus.includes(p.text)}
                                                            onChange={() => toggleJobStatus(p.text)}
                                                        />
                                                    ))}
                                                </div>
                                            </Form.Group>
                                        </Card.Body>
                                    </Card>
                                </Col> */}

                                <Col md={6}>
                                    <Card className="border-0 shadow-sm rounded-3 h-100">
                                        <Card.Body>
                                            <Form.Group>
                                                <Form.Label className="fw-bold text-dark mb-4">Job Status</Form.Label>
                                                <div className="d-flex flex-wrap gap-3">
                                                    {jobstatustype.map((p, index) => (
                                                        <Form.Check
                                                            key={p.id}
                                                            type="radio"
                                                            name="jobStatus" // radio group name
                                                            label={p.text}
                                                            value={p.text}
                                                            checked={selectedJobStatus[0] === p.text} // only one selection
                                                            onChange={() => setSelectedJobStatus([p.text])}
                                                            disabled={index > selectedJobStatus.length}
                                                        // disables next options until previous selected
                                                        />
                                                    ))}
                                                </div>
                                            </Form.Group>
                                        </Card.Body>
                                    </Card>
                                </Col>

                                <Col md={6}>
                                    <Card className="border-0 shadow-sm rounded-3 h-100" >
                                        <Card.Body>
                                            <Form.Group>
                                                <Form.Label className="fw-bold text-dark mb-4">Customer Notification</Form.Label>
                                                <div className="d-flex flex-wrap gap-3">
                                                    {notificationOptions.map((opt) => (
                                                        <Form.Check
                                                            key={opt.id}
                                                            type="checkbox"
                                                            id={`notif-${opt.id}`}
                                                            label={
                                                                <span className="d-flex align-items-center gap-2 text-dark">
                                                                    {opt.icon} {opt.text}
                                                                </span>
                                                            }
                                                            checked={selectedNotifications.includes(opt.text)}
                                                            onChange={() => toggleNotification(opt.text)}
                                                        />
                                                    ))}
                                                </div>
                                            </Form.Group>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>

                            {/* Date Fields */}
                            <Row className="mt-3">
                                <Col md={6}>
                                    <Form.Group className="d-flex align-items-center gap-3">
                                        <Form.Label className="fw-semibold text-dark mb-0">Removed Date:</Form.Label>
                                        <Form.Control
                                            type="date"
                                            size="sm"
                                            value={removeDate || ""}
                                            onChange={(e) => setRemoveDate(e.target.value)}
                                            style={{ maxWidth: "250px" }}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="d-flex align-items-center gap-3">
                                        <Form.Label className="fw-semibold text-dark mb-0">Sent Date:</Form.Label>
                                        <Form.Control
                                            type="date"
                                            size="sm"
                                            value={notificationDate || ""}
                                            onChange={(e) => setNotificationDate(e.target.value)}
                                            style={{ maxWidth: "250px" }}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            {/* Buttons */}
                            <Row className="mt-4">
                                <Col className="d-flex justify-content-between">
                                    <Button
                                        variant="primary"
                                        onClick={() => updateStatus(myselectDetails.coaldid)}
                                        className="px-4 fw-semibold"
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        variant="success"
                                        onClick={() => complateOrder(myselectDetails.cmd_id)}
                                        className="px-4 fw-semibold"
                                    >
                                        Complete Order
                                    </Button>
                                </Col>
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
