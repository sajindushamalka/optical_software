import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Tabs, Tab, Form, Container, Button, Modal, FormControl, Table } from 'react-bootstrap';
import avatar1 from '../../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../../assets/images/user/avatar-3.jpg';
import axios from 'axios';
import { toast } from 'react-toastify';

const reOrderList = [{ id: 0, text: "Fixed Error" }, { id: 1, text: "Mistake" }]

const AssistanceFactory = () => {
    const [allUsers, setAllUsers] = useState(['']);
    const [allPage, setAllPage] = useState(1);
    const allPerPage = 5;
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [LensesAt, setLensesAt] = useState(['']);
    const [selectedLensesAt, setSelectedLensesAt] = useState('');
    const [factory_remark, setfactory_remark] = useState('');
    const [reorderDetails, setreorderDetails] = useState('');
    const [factoryRemarks, setFactoryRemarks] = useState({});
    const [selectedCmd_ID, setselectedCmd_ID] = useState('');

    const [file, setFile] = useState(null);
    const [to, setTo] = useState('94717767117'); // recipient

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setShow(true);
        setselectedCmd_ID(id)
    };

    useEffect(() => {
        axios
            .get('http://localhost:2776/api/order/assitance/factory')
            .then((res) => setAllUsers(res.data))
            .catch((err) => console.log(err));

        axios
            .get('http://localhost:2776/api/root/lense/at')
            .then((res) => setLensesAt(res.data))
            .catch((err) => console.log(err));
    }, []);

    const today = new Date().toLocaleDateString();

    const searchFilteredUsers = allUsers.filter((user) => {
        const matchesSearch = Object.values(user).some((value) =>
            value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );

        let normalizedDate = null;

        if (user.Lens_OrderDate) {
            const userDateObj = new Date(user.Lens_OrderDate);

            if (!isNaN(userDateObj)) {
                if (userDateObj.getDate() >= 30) {
                    userDateObj.setMonth(userDateObj.getMonth() + 1);
                    userDateObj.setDate(1);
                }

                userDateObj.setDate(userDateObj.getDate() + 1);

                normalizedDate = userDateObj.toISOString().split("T")[0];
            }
        }
        console.log("Selected:", selectedDate, "User:", normalizedDate);
        const matchesDate = selectedDate
            ? normalizedDate === selectedDate
            : true; // if no date selected, show all

        const matchesLensShop = selectedLensesAt
            ? user.Lenses_At === selectedLensesAt
            : true; // if no shop selected, show all

        return matchesSearch && matchesDate && matchesLensShop;
    });


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

    const handlePass = (a, b) => {
        if (factory_remark != '') {
            const ob = {
                factory_remark
            }
            axios.put(`http://localhost:2776/api/order/factory/msg/${b}`, ob).then((res) => {
                console.log(res.data)

            }).catch((err) => {
                console.log(err)
                toast.error('Error in updating user msg')
            })
        }
        toast.success('Order sent to factory & updated')
    }

    const ReOrder = () => {
        const ob = {
            date: formatDate(today),
            cmd_id: selectedCmd_ID,
            message: reorderDetails
        }

        axios.post('http://localhost:2776/api/order/factory/reorder', ob).then((res) => {
            console.log(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    console.log(paginatedAllUsers)

    const handleSubmitWhatsApp = async (e) => {
        e.preventDefault();
        if (!file) return alert('Select PDF');
        const form = new FormData();
        form.append('pdf', file);
        form.append('to', to);
        form.append('caption', 'Here is your invoice');

        try {
            const resp = await axios.post('http://localhost:2776/api/whatsapp/send-pdf', form, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert('Sent: ' + JSON.stringify(resp.data));
        } catch (err) {
            console.error(err);
            alert('Error: ' + (err.response?.data?.error || err.message));
        }
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
                                            Send Invoices to the Factory
                                        </Card.Title>
                                    </Col>
                                </Row>
                            </Container>
                            <div className="d-flex flex-wrap align-items-center gap-2 mt-2">
                                {/* Date Picker */}
                                <Form.Group className="mb-0" style={{ minWidth: '180px' }}>
                                    <Form.Label className="mb-0 small text-muted">Select Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={selectedDate}
                                        onChange={(e) => {
                                            setSelectedDate(e.target.value);
                                            setAllPage(1);
                                        }}
                                    />
                                </Form.Group>

                                {/* Clear Date Button */}
                                <Button
                                    variant="outline-secondary"
                                    size="sm"
                                    onClick={() => setSelectedDate('')}
                                    style={{ marginTop: '22px' }}
                                >
                                    Clear Date
                                </Button>

                                {/* Lens Shop Dropdown */}
                                <Form.Group className="mb-0" style={{ minWidth: '200px' }}>
                                    <Form.Label className="mb-0 small text-muted">Select Lens Shop</Form.Label>
                                    <Form.Select
                                        value={selectedLensesAt}
                                        onChange={(e) => {
                                            setSelectedLensesAt(e.target.value);
                                            setAllPage(1);
                                        }}
                                    >
                                        <option value="">-- Select Lens Shop --</option>
                                        {LensesAt.map((lens, index) => (
                                            <option key={index} value={lens.text}>
                                                {lens.text}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>

                                {/* Clear Lens Shop Button */}
                                <Button
                                    variant="outline-secondary"
                                    size="sm"
                                    onClick={() => setSelectedLensesAt('')}
                                    style={{ marginTop: '22px' }}
                                >
                                    Clear Lens Shop
                                </Button>
                            </div>
                        </Card.Header>
                    </Card>
                </Col>
            </Row>
            <Card>
                <Card.Header>
                    <Container>
                        <Row>
                            <Col>
                                <Card.Title as="h5" style={{ fontWeight: 'bold' }}>
                                    Orders
                                </Card.Title>
                            </Col>
                        </Row>
                    </Container>
                </Card.Header>
                <Card.Body>
                    {/* <div className="rounded">
                        <h5 className="mb-4 text-primary" style={{ fontWeight: '600' }}>
                            Orders
                        </h5>
                    </div> */}

                    {paginatedAllUsers.map((r, index) => (
                        <Container>
                            <div style={{ paddingLeft: 25, paddingRight: 25 }}>
                                {/* No :  {index} */}
                                <Row>
                                    <Col md={2} className="border p-1">Job No</Col>
                                    <Col md={2} className="border p-1">{r.cmd_id}</Col>
                                    <Col md={2} className="border p-1">Wanted On</Col>
                                    <Col md={2} className="border p-1">{formatDate(r.Lens_wanted_on)}</Col>
                                    <Col md={1}></Col>
                                    <Col md={2} className="border p-1">Lens Size</Col>
                                    <Col md={1} className="border p-1">{r.Lens_Size}</Col>
                                </Row>
                                <Row>
                                    <Col md={2} className="border p-1"></Col>
                                    <Col md={1} className="border p-1">SPH</Col>
                                    <Col md={1} className="border p-1">CYL</Col>
                                    <Col md={1} className="border p-1">AXIS</Col>
                                    <Col md={1} className="border p-1">PRISM</Col>
                                    <Col md={1} className="border p-1">P.Base</Col>
                                    <Col md={1} className="border p-1">ADD</Col>
                                    <Col md={1}></Col>
                                    <Col md={2} className="border p-1">Lens Base</Col>
                                    <Col md={1} className="border p-1">{r.Lens_Base}</Col>
                                </Row>
                                <Row>
                                    <Col md={2} className="border p-1">Right (OD)</Col>
                                    <Col md={1} className="border p-1">{r.SPEC_OD_SPH}</Col>
                                    <Col md={1} className="border p-1">{r.SPEC_OD_CYL}</Col>
                                    <Col md={1} className="border p-1">{r.SPEC_OD_AXIS}</Col>
                                    <Col md={1} className="border p-1">{r.SPEC_OD_Prism}</Col>
                                    <Col md={1} className="border p-1">{r.SPEC_OD_Base}</Col>
                                    <Col md={1} className="border p-1">{r.SPEC_OD_near_full}</Col>
                                    <Col md={1}></Col>
                                    <Col md={2} className="border p-1">Lens Type</Col>
                                    <Col md={1} className="border p-1">{r.Lenses_Type}</Col>
                                </Row>
                                <Row>
                                    <Col md={2} className="border p-1">Left (OS)</Col>
                                    <Col md={1} className="border p-1">{r.SPEC_OS_SPH}</Col>
                                    <Col md={1} className="border p-1">{r.SPEC_OS_CYL}</Col>
                                    <Col md={1} className="border p-1">{r.SPEC_OS_AXIS}</Col>
                                    <Col md={1} className="border p-1">{r.SPEC_OS_Prism}</Col>
                                    <Col md={1} className="border p-1">{r.SPEC_OS_Base}</Col>
                                    <Col md={1} className="border p-1">{r.SPEC_OS_near_full}</Col>
                                    <Col md={1}></Col>
                                    <Col md={2} className="border p-1">Lens Material</Col>
                                    <Col md={1} className="border p-1">{r.Lens_Material}</Col>
                                </Row>
                                <Row>
                                    <Col md={2} className="border p-1">Pro. Add</Col>
                                    <Col md={2} className="border p-1">{r.SPEC_Pro_Add}</Col>
                                    <Col md={5}></Col>
                                    <Col md={2} className="border p-1">Lens Treatment</Col>
                                    <Col md={1} className="border p-1">{r.Lens_Treatment}</Col>
                                </Row>
                                <Row>
                                    <Col md={2} className="border p-1">Frame type</Col>
                                    <Col md={2} className="border p-1">{r.Frame_type}</Col>
                                    <Col md={1}></Col>
                                    <Col md={1} className="border p-1">PD</Col>
                                    <Col md={1} className="border p-1">{r.PD}</Col>
                                    <Col md={1}></Col>
                                    <Col md={1}></Col>
                                    <Col md={3} className="border p-1">
                                        {/* <Form.Control
                                            type="text"
                                            step="any"
                                            style={{
                                                border: 'none',
                                                width: '',
                                                padding: '4px 6px',
                                                textAlign: 'center'
                                            }}
                                            // value={r.factory_remark }
                                            value={factory_remark}
                                            onChange={(e) => setfactory_remark(e.target.value)}
                                        /> */}
                                        <Form.Control
                                            type="text"
                                            step="any"
                                            style={{
                                                border: 'none',
                                                padding: '4px 6px',
                                                textAlign: 'center',
                                            }}
                                            value={factoryRemarks[r.cmd_id] || r.factory_remark || ""} // 👈 each row unique
                                            onChange={(e) =>{
                                                setFactoryRemarks((prev) => ({
                                                    ...prev,
                                                    [r.cmd_id]: e.target.value, // 👈 update only this row
                                                }));
                                                setfactory_remark(e.target.value)
                                            }
                                            }
                                        />

                                    </Col>
                                </Row>
                            </div>
                            <Row style={{ paddingTop: 20 }}>
                                <Col className="text-start" style={{ marginLeft: 10 }}>
                                    <Button variant="warning" onClick={() => handleShow(r.cmd_id)}>
                                        Re-Order
                                    </Button>
                                </Col>

                                <Col className="text-end">
                                    <Button variant="success" onClick={() => handlePass(r.cmd_id, r.coaldid)}>
                                        Order
                                    </Button>
                                </Col>
                                <Col className="text-end">
                                    <Button
                                        variant="info"
                                        onClick={() => {
                                            // Replace with the number you want to message (use country code, no '+' or leading zeros)
                                            const phoneNumber = "94717767117"; // Example: Sri Lanka number
                                            const message = "hi";
                                            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                                            window.open(whatsappUrl, "_blank");
                                        }}
                                    >
                                        Send WhatsApp
                                    </Button>
                                </Col>

                            </Row>

                            <hr />

                            {/* <form onSubmit={handleSubmitWhatsApp}>
                                <div>
                                    <label>Recipient (international):</label>
                                    <input value={to} onChange={(e) => setTo(e.target.value)} />
                                </div>
                                <div>
                                    <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} />
                                </div>
                                <button type="submit">Send PDF via WhatsApp</button>
                            </form> */}

                        </Container>


                    ))}
                </Card.Body>
            </Card>

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Reorder Orders</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Container>
                            <Row>
                                <Col xs={12} md={12}>
                                    <Form.Group className="mb-3" controlId="formGender">
                                        <Form.Label>Titles</Form.Label>
                                        <div>
                                            {reOrderList.map((r) => (
                                                <Form.Check
                                                    key={r.id}
                                                    type="radio"
                                                    label={r.text}
                                                    name="titles" // group name so only one can be selected
                                                    value={r.text}
                                                    onChange={(e) => setreorderDetails(e.target.value)}
                                                    inline // keeps them in a row
                                                />
                                            ))}
                                        </div>
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
                    <Button variant="primary" onClick={ReOrder}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
};

export default AssistanceFactory;
