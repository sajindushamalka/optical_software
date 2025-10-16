import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Card, Tabs, Tab, Form, Container, Button, Modal, FormControl, Table } from 'react-bootstrap';
import avatar1 from '../../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../../assets/images/user/avatar-3.jpg';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useReactToPrint } from "react-to-print";

const AssistancePrescriptions = () => {
    const [allUsers, setAllUsers] = useState(['']);
    const [allPage, setAllPage] = useState(1);
    const allPerPage = 5;
    const [searchTerm, setSearchTerm] = useState('');
    const [isSelecetOne, setIsSelectOne] = useState(false);
    const [readinfTotal, setreadinfTotal] = useState('');
    const cardRef = useRef(); // Reference to the Card

    const handlePrint = useReactToPrint({
        contentRef: cardRef,
        documentTitle: "Prescription"
    });

    useEffect(() => {
        axios
            .get('http://localhost:2776/api/order/assitance/prescription')
            .then((res) => setAllUsers(res.data))
            .catch((err) => console.log(err));
    }, []);

    console.log(allUsers)

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
    const [SPEC_OD_SPH, set_SPEC_OD_SPH] = useState('');
    const [SPEC_OD_CYL, set_SPEC_OD_CYL] = useState('');
    const [SPEC_OD_AXIS, set_SPEC_OD_AXIS] = useState('');
    const [SPEC_OD_Prism, set_SPEC_OD_Prim] = useState('');
    const [SPEC_OD_Base, set_SPEC_OD_Base] = useState('');
    const [SPEC_OD_VA, set_SPEC_OD_VA] = useState('');
    const [SPEC_OD_near_full, set_SPEC_OD_type_near_full] = useState('');
    const [SPEC_OD_near_va, set_SPEC_OD_type_near_va] = useState('');
    const [SPEC_OS_SPH, set_SPEC_OS_SPH] = useState('');
    const [SPEC_OS_CYL, set_SPEC_OS_CYL] = useState('');
    const [SPEC_OS_AXIS, set_SPEC_OS_AXIS] = useState('');
    const [SPEC_OS_Prism, set_SPEC_OS_Prim] = useState('');
    const [SPEC_OS_Base, set_SPEC_OS_Base] = useState('');
    const [SPEC_OS_VA, set_SPEC_OS_VA] = useState('');
    const [SPEC_OS_near_full, set_SPEC_OS_type_near_full] = useState('');
    const [SPEC_OS_near_va, set_SPEC_OS_type_near_va] = useState('');
    const [SPEC_RE_OD_SPH, set_SPEC_RE_OD_SPH] = useState('');
    const [SPEC_RE_OD_CYL, set_SPEC_RE_OD_CYL] = useState('');
    const [SPEC_RE_OD_AXIS, set_SPEC_RE_OD_AXIS] = useState('');
    const [SPEC_RE_OD_Prism, set_SPEC_RE_OD_Prism] = useState('');
    const [SPEC_RE_OD_Base, set_SPEC_RE_OD_Base] = useState('');
    const [SPEC_RE_OD_VA, set_SPEC_RE_OD_VA] = useState('');
    const [SPEC_RE_OS_SPH, set_SPEC_RE_OS_SPH] = useState('');
    const [SPEC_RE_OS_CYL, set_SPEC_RE_OS_CYL] = useState('');
    const [SPEC_RE_OS_AXIS, set_SPEC_RE_OS_AXIS] = useState('');
    const [SPEC_RE_OS_Prism, set_SPEC_RE_OS_Prism] = useState('');
    const [SPEC_RE_OS_Base, set_SPEC_RE_OS_Base] = useState('');
    const [SPEC_RE_OS_VA, set_SPEC_RE_OS_VA] = useState('');
    const [selectUser, setSelectedUser] = useState('');

    const selectedUserdetailsFetch = async (a) => {
        setSelectedUserId(a.c_id);
        setSelectedcmd_id(a.cmd_id);
        setSelectedUser(a);
        setIsSelectOne(true);

        axios.get(`http://localhost:2776/api/order/assitance/subjective/${a.cmd_id}`).then((res) => {
            console.log(res.data)
            set_SPEC_OD_SPH(res.data.SPEC_OD_SPH)
            set_SPEC_OD_CYL(res.data.SPEC_OD_CYL)
            set_SPEC_OD_AXIS(res.data.SPEC_OD_AXIS)
            set_SPEC_OD_Prim(res.data.SPEC_OD_Prism)
            set_SPEC_OD_Base(res.data.SPEC_OD_Base)
            set_SPEC_OD_VA(res.data.SPEC_OD_VA)
            set_SPEC_OD_type_near_full(res.data.SPEC_OD_near_full)
            set_SPEC_OD_type_near_va(res.data.SPEC_OD_near_va)
            set_SPEC_OS_SPH(res.data.SPEC_OS_SPH)
            set_SPEC_OS_CYL(res.data.SPEC_OS_CYL)
            set_SPEC_OS_AXIS(res.data.SPEC_OS_AXIS)
            set_SPEC_OS_Prim(res.data.SPEC_OS_Prism)
            set_SPEC_OS_Base(res.data.SPEC_OS_Base)
            set_SPEC_OS_VA(res.data.SPEC_OS_VA)
            set_SPEC_OS_type_near_full(res.data.SPEC_OS_near_full)
            set_SPEC_OS_type_near_va(res.data.SPEC_OS_near_va)
            set_SPEC_RE_OD_SPH(res.data.SPEC_RE_OD_SPH)
            set_SPEC_RE_OD_CYL(res.data.SPEC_RE_OD_CYL)
            set_SPEC_RE_OD_AXIS(res.data.SPEC_RE_OD_AXIS)
            set_SPEC_RE_OD_Prism(res.data.SPEC_RE_OD_Prism)
            set_SPEC_RE_OD_Base(res.data.SPEC_RE_OD_Base)
            set_SPEC_RE_OD_VA(res.data.SPEC_RE_OD_VA)
            set_SPEC_RE_OS_SPH(res.data.SPEC_RE_OS_SPH)
            set_SPEC_RE_OS_CYL(res.data.SPEC_RE_OS_CYL)
            set_SPEC_RE_OS_AXIS(res.data.SPEC_RE_OS_AXIS)
            set_SPEC_RE_OS_Prism(res.data.SPEC_RE_OS_Prism)
            set_SPEC_RE_OS_Base(res.data.SPEC_RE_OS_Base)
            set_SPEC_RE_OS_VA(res.data.SPEC_RE_OS_VA)
            set_SPEC_UNA_DIS_OD(res.data.SPEC_UNA_DIS_OD)
            set_SPEC_UNA_NEAR_OD(res.data.SPEC_UNA_NEAR_OD)
            set_SPEC_UNA_DIS_OS(res.data.SPEC_UNA_DIS_OS)
            set_SPEC_UNA_NEAR_OS(res.data.SPEC_UNA_NEAR_OS)
            set_SPEC_Pin_OD(res.data.SPEC_Pin_OD)
            set_SPEC_Pin_OS(res.data.SPEC_Pin_OS)
            set_SPEC_IOP_OD(res.data.SPEC_IOP_OD)
            set_SPEC_remark(res.data.SPEC_remark)
        }).catch((err) => {
            console.log(err)
        })
    };

    const movetoFactory = () => {
        axios.put(`http://localhost:2776/api/order/factory/${selectedcmd_id}`).then((res) => {
            toast.success("Pass to Factory Interface")
        }).catch((err) => {
            toast.error("Error in passing!")
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
                                                            selectedUserdetailsFetch(a);
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
                <>
                    <Row>
                        <Col>
                            <Form.Group className="mt-3">
                                <Form.Label>Display Reading Total</Form.Label>
                                <div>
                                    <Form.Check
                                        inline
                                        type="radio"
                                        label="Reading Total"
                                        name="lensType"
                                        value="yes"
                                        checked={readinfTotal === "yes"}
                                        onChange={(e) => setreadinfTotal(e.target.value)}
                                    />
                                     <Form.Check
                                        inline
                                        type="radio"
                                        label="Remove Reading Total"
                                        name="lensType"
                                        value="no"
                                        checked={readinfTotal === "no"}
                                        onChange={(e) => setreadinfTotal(e.target.value)}
                                    />
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>

                    <div ref={cardRef} className="a5-card">
                        <Card>
                            <Card.Header>
                                <Container>
                                    <Row>
                                        <Col>
                                            <Card.Title as="h5" style={{ fontWeight: 'bold' }}>
                                                The Prescription
                                            </Card.Title>
                                        </Col>
                                    </Row>
                                </Container>
                            </Card.Header>
                            <Card.Body style={{ color: 'black' }}>
                                <Row style={{ padding: 10 }}>
                                    <Col md={9}>
                                        <Row>
                                            <Col md={3} className="border p-1 fw-bold">
                                                Name
                                            </Col>
                                            <Col md={9} className="border p-1">
                                                {selectUser.prefix} {selectUser.first_name} {selectUser.name}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={3} className="border p-1 fw-bold">
                                                Address
                                            </Col>
                                            <Col md={6} className="border p-1">
                                                {selectUser.address}
                                            </Col>
                                            <Col md={1} className="border p-1 fw-bold">
                                                City
                                            </Col>
                                            <Col md={2} className="border p-1">
                                                {selectUser.town}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md={2} className="border p-1 fw-bold">
                                                Age
                                            </Col>
                                            <Col md={2} className="border p-1">
                                                {selectUser.age}
                                            </Col>
                                            <Col md={2} className="border p-1 fw-bold">
                                                Mobile 1
                                            </Col>
                                            <Col md={2} className="border p-1">
                                                {selectUser.telephone}
                                            </Col>
                                            <Col md={2} className="border p-1 fw-bold">
                                                Mobile 2
                                            </Col>
                                            <Col md={2} className="border p-1">
                                                {selectUser.mobile2}
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col md={1}></Col>
                                    <Col md={2}>
                                        <div className="border p-1 text-center">
                                            <div className="fw-bold">Date</div>
                                            <div className="text-muted">{formatDate(today)}</div>
                                        </div>
                                        <div className="border p-1 text-center">
                                            <div className="fw-bold">Reference Number</div>
                                            <div className="text-muted">{formatDate(today)}</div>
                                        </div>
                                    </Col>
                                </Row>


                                <Row>
                                    <h6 className="text-success" style={{ fontWeight: '600', padding: 5, marginLeft: 10 }}>
                                        Rx For Spectacles 
                                    </h6>
                                    <Col>
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
                                                                    textAlign: 'center',
                                                                    color: 'black'
                                                                }}
                                                                value={SPEC_OD_SPH}
                                                                onChange={(e) => set_SPEC_OD_SPH(e.target.value)}
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
                                                                    textAlign: 'center',
                                                                    color: 'black'
                                                                }}
                                                                value={SPEC_OD_CYL}
                                                                onChange={(e) => set_SPEC_OD_CYL(e.target.value)}
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
                                                                    textAlign: 'center',
                                                                    color: 'black'
                                                                }}
                                                                value={SPEC_OD_AXIS}
                                                                onChange={(e) => set_SPEC_OD_AXIS(e.target.value)}
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
                                                                    textAlign: 'center',
                                                                    color: 'black'
                                                                }}
                                                                value={SPEC_OD_Prism}
                                                                onChange={(e) => set_SPEC_OD_Prim(e.target.value)}
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
                                                                    textAlign: 'center',
                                                                    color: 'black'
                                                                }}
                                                                value={SPEC_OD_Base}
                                                                onChange={(e) => set_SPEC_OD_Base(e.target.value)}
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
                                                                    textAlign: 'center',
                                                                    color: 'black'
                                                                }}
                                                                value={SPEC_OD_VA}
                                                                onChange={(e) => set_SPEC_OD_VA(e.target.value)}
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
                                                                    textAlign: 'center',
                                                                    color: 'black'
                                                                }}
                                                                value={SPEC_OD_near_full}
                                                                onChange={(e) => set_SPEC_OD_type_near_full(e.target.value)}
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
                                                                    textAlign: 'center',
                                                                    color: 'black'
                                                                }}
                                                                value={SPEC_OD_near_va}
                                                                onChange={(e) => set_SPEC_OD_type_near_va(e.target.value)}
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
                                                                    textAlign: 'center',
                                                                    color: 'black'
                                                                }}
                                                                value={SPEC_OS_SPH}
                                                                onChange={(e) => set_SPEC_OS_SPH(e.target.value)}
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
                                                                    textAlign: 'center',
                                                                    color: 'black'
                                                                }}
                                                                value={SPEC_OS_CYL}
                                                                onChange={(e) => set_SPEC_OS_CYL(e.target.value)}
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
                                                                    textAlign: 'center',
                                                                    color: 'black'
                                                                }}
                                                                value={SPEC_OS_AXIS}
                                                                onChange={(e) => set_SPEC_OS_AXIS(e.target.value)}
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
                                                                    textAlign: 'center',
                                                                    color: 'black'
                                                                }}
                                                                value={SPEC_OS_Prism}
                                                                onChange={(e) => set_SPEC_OS_Prim(e.target.value)}
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
                                                                    textAlign: 'center',
                                                                    color: 'black'
                                                                }}
                                                                value={SPEC_OS_Base}
                                                                onChange={(e) => set_SPEC_OS_Base(e.target.value)}
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
                                                                    textAlign: 'center',
                                                                    color: 'black'
                                                                }}
                                                                value={SPEC_OS_VA}
                                                                onChange={(e) => set_SPEC_OS_VA(e.target.value)}
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
                                                                    textAlign: 'center',
                                                                    color: 'black'
                                                                }}
                                                                value={SPEC_OS_near_full}
                                                                onChange={(e) => set_SPEC_OS_type_near_full(e.target.value)}
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
                                                                    textAlign: 'center',
                                                                    color: 'black'
                                                                }}
                                                                value={SPEC_OS_near_va}
                                                                onChange={(e) => set_SPEC_OS_type_near_va(e.target.value)}
                                                            />
                                                        </Form.Group>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Col>
                                </Row>

                                {readinfTotal === "yes" ?
                                    <Row>
                                        <h6 className="mt-2 text-success" style={{ fontWeight: '600', padding: 5, marginLeft: 10 }}>
                                            Reading Total
                                        </h6>
                                        <Col>
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
                                                                        textAlign: 'center',
                                                                        color: 'black'
                                                                    }}
                                                                    value={SPEC_RE_OD_SPH}
                                                                    onChange={(e) => set_SPEC_RE_OD_SPH(e.target.value)}
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
                                                                        textAlign: 'center',
                                                                        color: 'black'
                                                                    }}
                                                                    value={SPEC_RE_OD_CYL}
                                                                    onChange={(e) => set_SPEC_RE_OD_CYL(e.target.value)}
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
                                                                        textAlign: 'center',
                                                                        color: 'black'
                                                                    }}
                                                                    value={SPEC_RE_OD_AXIS}
                                                                    onChange={(e) => set_SPEC_RE_OD_AXIS(e.target.value)}
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
                                                                        textAlign: 'center',
                                                                        color: 'black'
                                                                    }}
                                                                    value={SPEC_RE_OD_Prism}
                                                                    onChange={(e) => set_SPEC_RE_OD_Prism(e.target.value)}
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
                                                                        textAlign: 'center',
                                                                        color: 'black'
                                                                    }}
                                                                    value={SPEC_RE_OD_Base}
                                                                    onChange={(e) => set_SPEC_RE_OD_Base(e.target.value)}
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
                                                                        textAlign: 'center',
                                                                        color: 'black'
                                                                    }}
                                                                    value={SPEC_RE_OD_VA}
                                                                    onChange={(e) => set_SPEC_RE_OD_VA(e.target.value)}
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
                                                                        textAlign: 'center',
                                                                        color: 'black'
                                                                    }}
                                                                    value={SPEC_RE_OS_SPH}
                                                                    onChange={(e) => set_SPEC_RE_OS_SPH(e.target.value)}
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
                                                                        textAlign: 'center',
                                                                        color: 'black'
                                                                    }}
                                                                    value={SPEC_RE_OS_CYL}
                                                                    onChange={(e) => set_SPEC_RE_OS_CYL(e.target.value)}
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
                                                                        textAlign: 'center',
                                                                        color: 'black'
                                                                    }}
                                                                    value={SPEC_RE_OS_AXIS}
                                                                    onChange={(e) => set_SPEC_RE_OS_AXIS(e.target.value)}
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
                                                                        textAlign: 'center',
                                                                        color: 'black'
                                                                    }}
                                                                    value={SPEC_RE_OS_Prism}
                                                                    onChange={(e) => set_SPEC_RE_OS_Prism(e.target.value)}
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
                                                                        textAlign: 'center',
                                                                        color: 'black'
                                                                    }}
                                                                    value={SPEC_RE_OS_Base}
                                                                    onChange={(e) => set_SPEC_RE_OS_Base(e.target.value)}
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
                                                                        textAlign: 'center',
                                                                        color: 'black'
                                                                    }}
                                                                    value={SPEC_RE_OS_VA}
                                                                    onChange={(e) => set_SPEC_RE_OS_VA(e.target.value)}
                                                                />
                                                            </Form.Group>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </Col>
                                    </Row>
                                    : null}


                                <Row>
                                    <h6 className="mt-2 text-success" style={{ fontWeight: '600', padding: 5, marginLeft: 10 }}>
                                        Lens Description
                                    </h6>
                                    <Col>
                                        <Table bordered hover responsive className="table-sm align-middle shadow-sm">
                                            <thead className="text-center" style={{ color: 'black' }}>
                                                <th>Lens Material</th>
                                                <th>Lens type</th>
                                                <th>Lens treatment</th>
                                                <th>Lens Colour</th>
                                                <th>Size</th>
                                                <th>Base</th>
                                                <th>Brand</th>
                                                <th>Lens At</th>
                                                <th>Order date</th>
                                            </thead>
                                            <tbody style={{ color: 'black' }}>
                                                <td>{selectUser.Lens_Material}</td>
                                                <td>{selectUser.Lenses_Type}</td>
                                                <td>{selectUser.Lens_Treatment}</td>
                                                <td>{selectUser.Lens_Colour}</td>
                                                <td>{selectUser.Lens_Size}</td>
                                                <td>{selectUser.Lens_Base}</td>
                                                <td>{selectUser.Lens_Brand}</td>
                                                <td>{selectUser.Lenses_At}</td>
                                                <td>{formatDate(selectUser.Lens_OrderDate)}</td>
                                            </tbody>
                                        </Table>
                                    </Col>
                                </Row>

                                <Row>
                                    <h6 className="mt-2 text-success" style={{ fontWeight: '600', padding: 5, marginLeft: 10 }}>
                                        Frame Description
                                    </h6>
                                    <Col>
                                        <Table bordered hover responsive className="table-sm align-middle shadow-sm">
                                            <thead className="text-center" style={{ color: 'black' }}>
                                                <th>Frame category</th>
                                                <th>Material</th>
                                                <th>Type</th>
                                                <th>Brand</th>
                                                <th>Model No</th>
                                                <th>Colour</th>
                                                <th>Brand</th>
                                                <th>B Size</th>
                                                <th>PD</th>
                                                <th>SEG</th>
                                            </thead>
                                            <tbody style={{ color: 'black' }}>
                                                <td>{selectUser.Frame_Category}</td>
                                                <td>{selectUser.Frame_Material}</td>
                                                <td>{selectUser.Frame_type}</td>
                                                <td>{selectUser.Frame_Brand}</td>
                                                <td>{selectUser.Model_number}</td>
                                                <td>{selectUser.Colour}</td>
                                                <td>{selectUser.Bridge_size}</td>
                                                <td>{selectUser.Lens_Material}</td>
                                                <td>{selectUser.PD}</td>
                                                <td>{selectUser.SEG}</td>
                                            </tbody>
                                        </Table>
                                    </Col>
                                </Row>
                                <Row style={{ padding: 10 }}>
                                    <Col md={1} className="border p-1 fw-bold">Due Date</Col>
                                    <Col md={2} className="border p-1">{selectUser.Frame_Category}</Col>
                                    <Col md={1} className="border p-1 fw-bold">Doctor Rx</Col>
                                    <Col md={2} className="border p-1">{selectUser.Doctor_Rx}</Col>
                                    <Col md={1} className="border p-1 fw-bold">Tested By</Col>
                                    <Col md={2} className="border p-1">{selectUser.Tested_By}</Col>
                                    <Col md={1} className="border p-1 fw-bold">Entered By</Col>
                                    <Col md={2} className="border p-1">{selectUser.Entered_By}</Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </div>

                    <Button variant="primary" onClick={handlePrint}>
                        Print
                    </Button>
                </>
            ) : null}
        </React.Fragment>
    );
};

export default AssistancePrescriptions;
