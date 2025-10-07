import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col, Card, Table, Button, Modal, Form } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";

const AdminContactLens = () => {
    const [LensMaterial, setLensMaterial] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newText, setNewText] = useState("");
    const [editId, setEditId] = useState(null);

    const [lenses_type, setlenses_type] = useState([]);
    const [showModallenses_type, setShowModallenses_type] = useState(false);
    const [newTextlenses_type, setNewTextlenses_type] = useState("");
    const [editIdlenses_type, setEditIdlenses_type] = useState(null);

    const [lens_treatment, setlens_treatment] = useState([]);
    const [showModallens_treatment, setShowModallens_treatment] = useState(false);
    const [newTextlens_treatment, setNewTextlens_treatment] = useState("");
    const [editIdlens_treatment, setEditIdlens_treatment] = useState(null);

    const [lens_colour, setlens_colour] = useState([]);
    const [showModallens_colour, setShowModallens_colour] = useState(false);
    const [newTextlens_colour, setNewTextlens_colour] = useState("");
    const [editIdlens_colour, setEditIdlens_colour] = useState(null);

    const [lens_size, setlens_size] = useState([]);
    const [showModallens_size, setShowModallens_size] = useState(false);
    const [newTextlens_size, setNewTextlens_size] = useState("");
    const [editIdlens_size, setEditIdlens_size] = useState(null);

    // Fetch data
    const fetchPurpose = async () => {
        try {
            const res = await axios.get("http://localhost:2776/api/root/wearertype");
            setLensMaterial(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchlenses_type = async () => {
        try {
            const res = await axios.get("http://localhost:2776/api/root/typecontactlensecon");
            setlenses_type(res.data);
        } catch (err) {
            console.error(err);
        }
    };


    const fetchlens_treatment = async () => {
        try {
            const res = await axios.get("http://localhost:2776/api/root/softlensmaterial");
            setlens_treatment(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchlens_colour = async () => {
        try {
            const res = await axios.get("http://localhost:2776/api/root/softlensdesign");
            setlens_colour(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchlens_size = async () => {
        try {
            const res = await axios.get("http://localhost:2776/api/root/wearerschedule");
            setlens_size(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchPurpose();
        fetchlenses_type();
        fetchlens_treatment();
        fetchlens_colour();
        fetchlens_size();
    }, []);

    // Handle create or update
    const handleSave = async () => {
        try {
            if (editId) {
                // Update
                await axios.put(`http://localhost:2776/api/root/wearertype/${editId}`, {
                    text: newText,
                });
            } else {
                // Create
                await axios.post("http://localhost:2776/api/root/wearertype", {
                    text: newText,
                });
            }
            setShowModal(false);
            setNewText("");
            setEditId(null);
            fetchPurpose();
        } catch (err) {
            console.error(err);
        }
    };

    const handleSavelenses_type = async () => {
        try {
            if (editIdlenses_type) {
                // Update
                await axios.put(`http://localhost:2776/api/root/typecontactlensecon/${editIdlenses_type}`, {
                    text: newTextlenses_type,
                });
            } else {
                // Create
                await axios.post("http://localhost:2776/api/root/typecontactlensecon", {
                    text: newTextlenses_type,
                });
            }
            setShowModallenses_type(false);
            setNewTextlenses_type("");
            setEditIdlenses_type(null);
            fetchlenses_type();
        } catch (err) {
            console.error(err);
        }
    };


    const handlelens_treatment = async () => {
        try {
            if (editIdlens_treatment) {
                // Update
                await axios.put(`http://localhost:2776/api/root/softlensmaterial/${editIdlens_treatment}`, {
                    text: newTextlens_treatment,
                });
            } else {
                // Create
                await axios.post("http://localhost:2776/api/root/softlensmaterial", {
                    text: newTextlens_treatment,
                });
            }
            setShowModallens_treatment(false);
            setNewTextlens_treatment("");
            setEditIdlens_treatment(null);
            fetchlens_treatment();
        } catch (err) {
            console.error(err);
        }
    };

    const handleSavelens_colour = async () => {
        try {
            if (editIdlens_colour) {
                // Update
                await axios.put(`http://localhost:2776/api/root/softlensdesign/${editIdlens_colour}`, {
                    text: newTextlens_colour,
                });
            } else {
                // Create
                await axios.post("http://localhost:2776/api/root/softlensdesign", {
                    text: newTextlens_colour,
                });
            }
            setShowModallens_colour(false);
            setNewTextlens_colour("");
            setEditIdlens_colour(null);
            fetchlens_colour();
        } catch (err) {
            console.error(err);
        }
    };

    const handleSavelens_size = async () => {
        try {
            if (editIdlens_size) {
                // Update
                await axios.put(`http://localhost:2776/api/root/wearerschedule/${editIdlens_size}`, {
                    text: newTextlens_size,
                });
            } else {
                // Create
                await axios.post("http://localhost:2776/api/root/wearerschedule", {
                    text: newTextlens_size,
                });
            }
            setShowModallens_size(false);
            setNewTextlens_size("");
            setEditIdlens_size(null);
            fetchlens_size();
        } catch (err) {
            console.error(err);
        }
    };

    // Handle delete
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this record?")) {
            try {
                await axios.delete(`http://localhost:2776/api/root/wearertype/${id}`);
                fetchPurpose();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleDeletelenses_type = async (id) => {
        if (window.confirm("Are you sure you want to delete this record?")) {
            try {
                await axios.delete(`http://localhost:2776/api/root/typecontactlensecon/${id}`);
                fetchlenses_type();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleDeletelens_treatment = async (id) => {
        if (window.confirm("Are you sure you want to delete this record?")) {
            try {
                await axios.delete(`http://localhost:2776/api/root/softlensmaterial/${id}`);
                fetchlens_treatment();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleDeletelens_colour = async (id) => {
        if (window.confirm("Are you sure you want to delete this record?")) {
            try {
                await axios.delete(`http://localhost:2776/api/root/softlensdesign/${id}`);
                fetchlens_colour();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleDeletelens_size = async (id) => {
        if (window.confirm("Are you sure you want to delete this record?")) {
            try {
                await axios.delete(`http://localhost:2776/api/root/wearerschedule/${id}`);
                fetchlens_size();
            } catch (err) {
                console.error(err);
            }
        }
    };

    // Open modal for edit
    const handleEdit = (p) => {
        setNewText(p.text);
        setEditId(p.wt_id);
        setShowModal(true);
    };

    const handleEditlenses_type = (p) => {
        setNewTextlenses_type(p.text);
        setEditIdlenses_type(p.ltct_id);
        setShowModallenses_type(true);
    };

    const handleEditlenses_treatment = (p) => {
        setNewTextlens_treatment(p.text);
        setEditIdlens_treatment(p.slm_id);
        setShowModallens_treatment(true);
    };

    const handleEditlens_colour = (p) => {
        setNewTextlens_colour(p.text);
        setEditIdlens_colour(p.sld_id);
        setShowModallens_colour(true);
    };

    const handleEditlens_size = (p) => {
        setNewTextlens_size(p.text);
        setEditIdlens_size(p.ws_id);
        setShowModallens_size(true);
    };

    // Open modal for create
    const handleCreate = () => {
        setNewText("");
        setEditId(null);
        setShowModal(true);
    };

    const handleCreatelenses_type = () => {
        setNewTextlenses_type("");
        setEditIdlenses_type(null);
        setShowModallenses_type(true);
    };

    const handleCreatelens_treatment = () => {
        setNewTextlens_treatment("");
        setEditIdlens_treatment(null);
        setShowModallens_treatment(true);
    };

    const handleCreatelens_colour = () => {
        setNewTextlens_colour("");
        setEditIdlens_colour(null);
        setShowModallens_colour(true);
    };

    const handleCreatelens_size = () => {
        setNewTextlens_size("");
        setEditIdlens_size(null);
        setShowModallens_size(true);
    };

    return (
        <React.Fragment>
            <Row>
                <Col md={6}>
                    <Card>
                        <Card.Header className="d-flex justify-content-between align-items-center">
                            <div>
                                <Card.Title as="h5">Wearer Type</Card.Title>
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
                                    {LensMaterial.map((p) => (
                                        <tr key={p.wt_id}>
                                            <td>{p.wt_id}</td>
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
                                                    onClick={() => handleDelete(p.wt_id)}
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
                                <Card.Title as="h5">Lens Type</Card.Title>
                                <span className="d-block m-t-5">
                                    use props <code>hover</code> with <code>Table</code> component
                                </span>
                            </div>
                            <Button variant="primary" onClick={handleCreatelenses_type}>
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
                                    {lenses_type.map((p) => (
                                        <tr key={p.ltct_id}>
                                            <td>{p.ltct_id}</td>
                                            <td>{p.text}</td>
                                            <td>
                                                <Button
                                                    variant="warning"
                                                    size="sm"
                                                    className="me-2"
                                                    onClick={() => handleEditlenses_type(p)}
                                                >
                                                    <FaEdit />
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => handleDeletelenses_type(p.ltct_id)}
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
                                <Card.Title as="h5">Soft Lens Material</Card.Title>
                                <span className="d-block m-t-5">
                                    use props <code>hover</code> with <code>Table</code> component
                                </span>
                            </div>
                            <Button variant="primary" onClick={handleCreatelens_treatment}>
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
                                    {lens_treatment.map((p) => (
                                        <tr key={p.slm_id}>
                                            <td>{p.slm_id}</td>
                                            <td>{p.text}</td>
                                            <td>
                                                <Button
                                                    variant="warning"
                                                    size="sm"
                                                    className="me-2"
                                                    onClick={() => handleEditlenses_treatment(p)}
                                                >
                                                    <FaEdit />
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => handleDeletelens_treatment(p.slm_id)}
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
                                <Card.Title as="h5">Soft Lens Design</Card.Title>
                                <span className="d-block m-t-5">
                                    use props <code>hover</code> with <code>Table</code> component
                                </span>
                            </div>
                            <Button variant="primary" onClick={handleCreatelens_colour}>
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
                                    {lens_colour.map((p) => (
                                        <tr key={p.sld_id}>
                                            <td>{p.sld_id}</td>
                                            <td>{p.text}</td>
                                            <td>
                                                <Button
                                                    variant="warning"
                                                    size="sm"
                                                    className="me-2"
                                                    onClick={() => handleEditlens_colour(p)}
                                                >
                                                    <FaEdit />
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => handleDeletelens_colour(p.sld_id)}
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
                                <Card.Title as="h5">Wearer Schedule</Card.Title>
                                <span className="d-block m-t-5">
                                    use props <code>hover</code> with <code>Table</code> component
                                </span>
                            </div>
                            <Button variant="primary" onClick={handleCreatelens_size}>
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
                                    {lens_size.map((p) => (
                                        <tr key={p.ws_id}>
                                            <td>{p.ws_id}</td>
                                            <td>{p.text}</td>
                                            <td>
                                                <Button
                                                    variant="warning"
                                                    size="sm"
                                                    className="me-2"
                                                    onClick={() => handleEditlens_size(p)}
                                                >
                                                    <FaEdit />
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => handleDeletelens_size(p.ws_id)}
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

            {/* Modal for Create/Edit */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {editId ? "Edit Wearer Type" : "Create New Wearer Type"}
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
                                placeholder="Enter Wearer Type"
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

            <Modal show={showModallenses_type} onHide={() => setShowModallenses_type(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {editIdlenses_type ? "Edit Lens Type" : "Create New Lens Type Text"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Text</Form.Label>
                            <Form.Control
                                type="text"
                                value={newTextlenses_type}
                                onChange={(e) => setNewTextlenses_type(e.target.value)}
                                placeholder="Enter Lens Type"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModallenses_type(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSavelenses_type}>
                        {editIdlenses_type ? "Update" : "Create"}
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showModallens_treatment} onHide={() => setShowModallens_treatment(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {editIdlens_treatment ? "Edit Soft Lens Material" : "Create New Soft Lens Material Text"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Text</Form.Label>
                            <Form.Control
                                type="text"
                                value={newTextlens_treatment}
                                onChange={(e) => setNewTextlens_treatment(e.target.value)}
                                placeholder="Enter Soft Lens Material"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModallens_treatment(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handlelens_treatment}>
                        {editIdlens_treatment ? "Update" : "Create"}
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showModallens_colour} onHide={() => setShowModallens_colour(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {editIdlens_colour ? "Edit Soft Lens Design" : "Create New Soft Lens Design Text"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Text</Form.Label>
                            <Form.Control
                                type="text"
                                value={newTextlens_colour}
                                onChange={(e) => setNewTextlens_colour(e.target.value)}
                                placeholder="Enter Soft Lens Design"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModallens_colour(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSavelens_colour}>
                        {editIdlens_colour ? "Update" : "Create"}
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showModallens_size} onHide={() => setShowModallens_size(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {editIdlens_size ? "Edit Wearer Schedule" : "Create New Wearer Schedule Text"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Text</Form.Label>
                            <Form.Control
                                type="text"
                                value={newTextlens_size}
                                onChange={(e) => setNewTextlens_size(e.target.value)}
                                placeholder="Enter Wearer Schedule"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModallens_size(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSavelens_size}>
                        {editIdlens_size ? "Update" : "Create"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
};

export default AdminContactLens;
