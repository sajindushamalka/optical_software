import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col, Card, Table, Button, Modal, Form } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";

const RootAdminInvoice = () => {
    const [doctor_rx, setdoctor_rx] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newText, setNewText] = useState("");
    const [priceA, setpriceA] = useState(0);
    const [editId, setEditId] = useState(null);

    const [tested_by, settested_by] = useState([]);
    const [showModaltested_by, setShowModaltested_by] = useState(false);
    const [newTexttested_by, setNewTexttested_by] = useState("");
    const [editIdtested_by, setEditIdtested_by] = useState(null);

    const [entered_by, setentered_by] = useState([]);
    const [showModalentered_by, setShowModalentered_by] = useState(false);
    const [newTextentered_by, setNewTextentered_by] = useState("");
    const [editIdentered_by, setEditIdentered_by] = useState(null);


    const [users, setusers] = useState([]);
    const [showModalusers, setShowModalusers] = useState(false);
    const [newTextusers, setNewTextusers] = useState("");
    const [newTextusername, setNewTextusername] = useState("");
    const [newTextuserpassword, setNewTextuserpassword] = useState("");
    const [newTextusertype, setNewTextusertype] = useState("");
    const [newTextusermobile, setNewTextusermobile] = useState("");
    const [newTextuseremail, setNewTextuseremail] = useState("");
    const [newTextusernic, setNewTextusernic] = useState("");
    const [editIdusers, setEditIdusers] = useState(null);

    // Fetch data
    const fetchPurpose = async () => {
        try {
            const res = await axios.get("http://localhost:2776/api/root/invoice");
            setdoctor_rx(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    // const fetchtest_by = async () => {
    //     try {
    //         const res = await axios.get("http://localhost:2776/api/root/test");
    //         settested_by(res.data);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };


    // const fetchentered_by = async () => {
    //     try {
    //         const res = await axios.get("http://localhost:2776/api/root/enter");
    //         setentered_by(res.data);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    // const fetchusers = async () => {
    //     try {
    //         const res = await axios.get("http://localhost:2776/api/root/user");
    //         setusers(res.data);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    useEffect(() => {
        fetchPurpose();
        // fetchtest_by();
        // fetchentered_by();
        // fetchusers();
    }, []);

    // Handle create or update
    const handleSave = async () => {
        try {
            if (editId) {
                // Update
                await axios.put(`http://localhost:2776/api/root/invoice/${editId}`, {
                    title: newText,
                    price: priceA,
                });
            } else {
                // Create
                await axios.post("http://localhost:2776/api/root/invoice", {
                    title: newText,
                    price: priceA,
                });
            }
            setShowModal(false);
            setNewText("");
            setpriceA("");
            setEditId(null);
            fetchPurpose();
        } catch (err) {
            console.error(err);
        }
    };

    // const handleSavetest_by = async () => {
    //     try {
    //         if (editIdtested_by) {
    //             // Update
    //             await axios.put(`http://localhost:2776/api/root/test/${editIdtested_by}`, {
    //                 text: newTexttested_by,
    //             });
    //         } else {
    //             // Create
    //             await axios.post("http://localhost:2776/api/root/test", {
    //                 text: newTexttested_by,
    //             });
    //         }
    //         setShowModaltested_by(false);
    //         setNewTexttested_by("");
    //         setEditIdtested_by(null);
    //         fetchtest_by();
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };


    // const handleentered_by = async () => {
    //     try {
    //         if (editIdentered_by) {
    //             // Update
    //             await axios.put(`http://localhost:2776/api/root/enter/${editIdentered_by}`, {
    //                 text: newTextentered_by,
    //             });
    //         } else {
    //             // Create
    //             await axios.post("http://localhost:2776/api/root/enter", {
    //                 text: newTextentered_by,
    //             });
    //         }
    //         setShowModalentered_by(false);
    //         setNewTextentered_by("");
    //         setEditIdentered_by(null);
    //         fetchentered_by();
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    // const handleusers = async () => {
    //     try {
    //         if (editIdusers) {
    //             // Update
    //             await axios.put(`http://localhost:2776/api/root/user/${editIdusers}`, {
    //                 name: newTextusers,
    //                 username: newTextusername,
    //                 password: newTextuserpassword,
    //                 u_type: newTextusertype,
    //                 email: newTextuseremail,
    //                 mobile: newTextusermobile,
    //                 nic: newTextusernic,
    //             });
    //         } else {
    //             // Create
    //             await axios.post("http://localhost:2776/api/root/user", {
    //                 name: newTextusers,
    //                 username: newTextusername,
    //                 password: newTextuserpassword,
    //                 u_type: newTextusertype,
    //                 email: newTextuseremail,
    //                 mobile: newTextusermobile,
    //                 nic: newTextusernic,
    //             });
    //         }
    //         setShowModalusers(false);
    //         setNewTextusers("");
    //         setNewTextuseremail("");
    //         setNewTextusermobile("");
    //         setNewTextusername("");
    //         setNewTextusernic("");
    //         setNewTextuserpassword("");
    //         setNewTextusertype("");
    //         setEditIdusers(null);
    //         fetchusers();
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };


    // Handle delete
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this record?")) {
            try {
                await axios.delete(`http://localhost:2776/api/root/invoice/${id}`);
                fetchPurpose();
            } catch (err) {
                console.error(err);
            }
        }
    };

    // const handleDeletetest_by = async (id) => {
    //     if (window.confirm("Are you sure you want to delete this record?")) {
    //         try {
    //             await axios.delete(`http://localhost:2776/api/root/test/${id}`);
    //             fetchtest_by();
    //         } catch (err) {
    //             console.error(err);
    //         }
    //     }
    // };

    // const handleDeleteentered_by = async (id) => {
    //     if (window.confirm("Are you sure you want to delete this record?")) {
    //         try {
    //             await axios.delete(`http://localhost:2776/api/root/enter/${id}`);
    //             fetchentered_by();
    //         } catch (err) {
    //             console.error(err);
    //         }
    //     }
    // };

    // const handleDeleteusers = async (id) => {
    //     if (window.confirm("Are you sure you want to delete this record?")) {
    //         try {
    //             await axios.delete(`http://localhost:2776/api/root/user/${id}`);
    //             fetchusers();
    //         } catch (err) {
    //             console.error(err);
    //         }
    //     }
    // };

    // Open modal for edit
    const handleEdit = (p) => {
        setNewText(p.title);
        setpriceA(p.price);
        setEditId(p.cid_id);
        setShowModal(true);
    };

    // const handleEdittest_by = (p) => {
    //     setNewTexttested_by(p.text);
    //     setEditIdtested_by(p.tb_id);
    //     setShowModaltested_by(true);
    // };

    // const handleEditentered_by = (p) => {
    //     setNewTextentered_by(p.text);
    //     setEditIdentered_by(p.eb_id);
    //     setShowModalentered_by(true);
    // };

    // const handleEdituser = (p) => {
    //     setNewTextusers(p.name);
    //     setNewTextusermobile(p.mobile);
    //     setNewTextusernic(p.nic);
    //     setNewTextuserpassword(p.password);
    //     setNewTextusertype(p.u_type);
    //     setNewTextusername(p.username);
    //     setNewTextuseremail(p.email);
    //     setEditIdusers(p.u_id);
    //     setShowModalusers(true);
    // };

    // Open modal for create
    const handleCreate = () => {
        setNewText("");
        setpriceA("");
        setEditId(null);
        setShowModal(true);
    };

    // const handleCreatetest_by = () => {
    //     setNewTexttested_by("");
    //     setEditIdtested_by(null);
    //     setShowModaltested_by(true);
    // };

    // const handleCreateentered_by = () => {
    //     setNewTextentered_by("");
    //     setEditIdentered_by(null);
    //     setShowModalentered_by(true);
    // };

    // const handleCreateuser = () => {
    //     setNewTextusers("");
    //     setNewTextuseremail("");
    //     setNewTextusermobile("");
    //     setNewTextusername("");
    //     setNewTextusernic("");
    //     setNewTextuserpassword("");
    //     setNewTextusertype("");
    //     setEditIdusers(null);
    //     setShowModalusers(true);
    // };

    return (
        <React.Fragment>
            <Row>
                <Col >
                    <Card>
                        <Card.Header className="d-flex justify-content-between align-items-center">
                            <div>
                                <Card.Title as="h5">Invoice Dropdown</Card.Title>
                                <span className="d-block m-t-5">
                                    use props <code>hover</code> with <code>Table</code> component
                                </span>
                            </div>
                            <Button variant="primary" onClick={handleCreate}>
                                + New Create
                            </Button>
                        </Card.Header>
                        <Card.Body>
                            <Table responsive hover>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Title</th>
                                        <th>Price</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {doctor_rx.map((p) => (
                                        <tr key={p.cid_id}>
                                            <td>{p.cid_id}</td>
                                            <td>{p.title}</td>
                                            <td>{p.price}</td>
                                            <td>
                                                <Button
                                                    variant="warning"
                                                    size="sm"
                                                    className="me-2"
                                                    onClick={() => handleEdit(p)}
                                                >
                                                    <FaEdit />
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => handleDelete(p.cid_id)}
                                                >
                                                    <FaTrash />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {/* <Row>
                <Col md={6}>
                    <Card>
                        <Card.Header className="d-flex justify-content-between align-items-center">
                            <div>
                                <Card.Title as="h5">Doctor Rx</Card.Title>
                                <span className="d-block m-t-5">
                                    use props <code>hover</code> with <code>Table</code> component
                                </span>
                            </div>
                            <Button variant="primary" onClick={handleCreate}>
                                + New Create
                            </Button>
                        </Card.Header>
                        <Card.Body>
                            <Table responsive hover>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Text</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {doctor_rx.map((p) => (
                                        <tr key={p.dr_id}>
                                            <td>{p.dr_id}</td>
                                            <td>{p.text}</td>
                                            <td>
                                                <Button
                                                    variant="warning"
                                                    size="sm"
                                                    className="me-2"
                                                    onClick={() => handleEdit(p)}
                                                >
                                                    <FaEdit />
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => handleDelete(p.dr_id)}
                                                >
                                                    <FaTrash />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>

                <Col md={6}>
                    <Card>
                        <Card.Header className="d-flex justify-content-between align-items-center">
                            <div>
                                <Card.Title as="h5">Tested By</Card.Title>
                                <span className="d-block m-t-5">
                                    use props <code>hover</code> with <code>Table</code> component
                                </span>
                            </div>
                            <Button variant="primary" onClick={handleCreatetest_by}>
                                + New Create
                            </Button>
                        </Card.Header>
                        <Card.Body>
                            <Table responsive hover>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Text</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tested_by.map((p) => (
                                        <tr key={p.tb_id}>
                                            <td>{p.tb_id}</td>
                                            <td>{p.text}</td>
                                            <td>
                                                <Button
                                                    variant="warning"
                                                    size="sm"
                                                    className="me-2"
                                                    onClick={() => handleEdittest_by(p)}
                                                >
                                                    <FaEdit />
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => handleDeletetest_by(p.tb_id)}
                                                >
                                                    <FaTrash />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>


            <Row>
                <Col md={6}>
                    <Card>
                        <Card.Header className="d-flex justify-content-between align-items-center">
                            <div>
                                <Card.Title as="h5">Entered By</Card.Title>
                                <span className="d-block m-t-5">
                                    use props <code>hover</code> with <code>Table</code> component
                                </span>
                            </div>
                            <Button variant="primary" onClick={handleCreateentered_by}>
                                + New Create
                            </Button>
                        </Card.Header>
                        <Card.Body>
                            <Table responsive hover>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Text</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {entered_by.map((p) => (
                                        <tr key={p.eb_id}>
                                            <td>{p.eb_id}</td>
                                            <td>{p.text}</td>
                                            <td>
                                                <Button
                                                    variant="warning"
                                                    size="sm"
                                                    className="me-2"
                                                    onClick={() => handleEditentered_by(p)}
                                                >
                                                    <FaEdit />
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => handleDeleteentered_by(p.eb_id)}
                                                >
                                                    <FaTrash />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row> */}


            {/* Modal for Create/Edit */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {editId ? "Edit Cashier Dropdown Item" : "Create New Cashier Dropdown Item"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Text</Form.Label>
                            <Form.Control
                                type="text"
                                value={newText}
                                onChange={(e) => setNewText(e.target.value)}
                                placeholder="Enter Title"
                            />
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                step="any"
                                value={priceA}
                                onChange={(e) => setpriceA(e.target.value)}
                                placeholder="Enter Price"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSave}>
                        {editId ? "Update" : "Create"}
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* <Modal show={showModaltested_by} onHide={() => setShowModaltested_by(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {editIdtested_by ? "Edit Tested By" : "Create New Tested By Text"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Text</Form.Label>
                            <Form.Control
                                type="text"
                                value={newTexttested_by}
                                onChange={(e) => setNewTexttested_by(e.target.value)}
                                placeholder="Enter Tested By"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModaltested_by(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSavetest_by}>
                        {editIdtested_by ? "Update" : "Create"}
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showModalentered_by} onHide={() => setShowModalentered_by(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {editIdentered_by ? "Edit Entered By" : "Create New Entered By Text"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Text</Form.Label>
                            <Form.Control
                                type="text"
                                value={newTextentered_by}
                                onChange={(e) => setNewTextentered_by(e.target.value)}
                                placeholder="Enter Entered By"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModalentered_by(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleentered_by}>
                        {editIdentered_by ? "Update" : "Create"}
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showModalusers} onHide={() => setShowModalusers(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {editIdusers ? "Edit User" : "Create New User Text"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={newTextusers}
                                onChange={(e) => setNewTextusers(e.target.value)}
                                placeholder="Enter Name"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>UserName</Form.Label>
                            <Form.Control
                                type="text"
                                value={newTextusername}
                                onChange={(e) => setNewTextusername(e.target.value)}
                                placeholder="Enter Username"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="text"
                                value={newTextuserpassword}
                                onChange={(e) => setNewTextuserpassword(e.target.value)}
                                placeholder="Enter User Password"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>User Type</Form.Label>
                            <Form.Select
                                value={newTextusertype}
                                onChange={(e) => setNewTextusertype(e.target.value)}
                            >
                                <option value="">-- Select User Type --</option>
                                <option value="Assistance">Assistance</option>
                                <option value="Optometrist">Optometrist</option>
                                <option value="Cashier">Cashier</option>
                                <option value="RootAdmin">RootAdmin</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Mobile</Form.Label>
                            <Form.Control
                                type="text"
                                value={newTextusermobile}
                                onChange={(e) => setNewTextusermobile(e.target.value)}
                                placeholder="Enter User Mobile"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>EMail</Form.Label>
                            <Form.Control
                                type="text"
                                value={newTextuseremail}
                                onChange={(e) => setNewTextuseremail(e.target.value)}
                                placeholder="Enter User EMail"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>NIC</Form.Label>
                            <Form.Control
                                type="text"
                                value={newTextusernic}
                                onChange={(e) => setNewTextusernic(e.target.value)}
                                placeholder="Enter User NIC"
                            />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModalusers(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleusers}>
                        {editIdusers ? "Update" : "Create"}
                    </Button>
                </Modal.Footer>
            </Modal> */}



        </React.Fragment>
    );
};

export default RootAdminInvoice;
