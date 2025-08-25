import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col, Card, Table, Button, Modal, Form } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";

const RootAdminFrame = () => {
    const [frame_category, setframe_category] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newText, setNewText] = useState("");
    const [editId, setEditId] = useState(null);

    const [frame_material, setframe_material] = useState([]);
    const [showModalframe_material, setShowModalframe_material] = useState(false);
    const [newTextframe_material, setNewTextframe_material] = useState("");
    const [editIdframe_material, setEditIdframe_material] = useState(null);

    const [frame_type, setframe_type] = useState([]);
    const [showModalframe_type, setShowModalframe_type] = useState(false);
    const [newTextframe_type, setNewTextframe_type] = useState("");
    const [editIdframe_type, setEditIdframe_type] = useState(null);


    const [frame_color, setframe_color] = useState([]);
    const [showModalframe_color, setShowModalframe_color] = useState(false);
    const [newTextframe_color, setNewTextframe_color] = useState("");
    const [editIdframe_color, setEditIdframe_color] = useState(null);

    // Fetch data
    const fetchPurpose = async () => {
        try {
            const res = await axios.get("http://localhost:2776/api/root/frame/category");
            setframe_category(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchframe_material = async () => {
        try {
            const res = await axios.get("http://localhost:2776/api/root/frame/material");
            setframe_material(res.data);
        } catch (err) {
            console.error(err);
        }
    };


    const fetchframe_type = async () => {
        try {
            const res = await axios.get("http://localhost:2776/api/root/frame/type");
            setframe_type(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchframe_color = async () => {
        try {
            const res = await axios.get("http://localhost:2776/api/root/frame/color");
            setframe_color(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchlens_base = async () => {
        try {
            const res = await axios.get("http://localhost:2776/api/root/lense/base");
            setlens_base(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchlens_brand = async () => {
        try {
            const res = await axios.get("http://localhost:2776/api/root/lense/brand");
            setlens_brand(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchlenses_at = async () => {
        try {
            const res = await axios.get("http://localhost:2776/api/root/lense/at");
            setlenses_at(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchPurpose();
        fetchframe_material();
        fetchframe_type();
        fetchframe_color();
    }, []);

    // Handle create or update
    const handleSave = async () => {
        try {
            if (editId) {
                // Update
                await axios.put(`http://localhost:2776/api/root/frame/category/${editId}`, {
                    text: newText,
                });
            } else {
                // Create
                await axios.post("http://localhost:2776/api/root/frame/category", {
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

    const handleSaveframe_material = async () => {
        try {
            if (editIdframe_material) {
                // Update
                await axios.put(`http://localhost:2776/api/root/frame/material/${editIdframe_material}`, {
                    text: newTextframe_material,
                });
            } else {
                // Create
                await axios.post("http://localhost:2776/api/root/frame/material", {
                    text: newTextframe_material,
                });
            }
            setShowModalframe_material(false);
            setNewTextframe_material("");
            setEditIdframe_material(null);
            fetchframe_material();
        } catch (err) {
            console.error(err);
        }
    };


    const handleframe_type = async () => {
        try {
            if (editIdframe_type) {
                // Update
                await axios.put(`http://localhost:2776/api/root/frame/type/${editIdframe_type}`, {
                    text: newTextframe_type,
                });
            } else {
                // Create
                await axios.post("http://localhost:2776/api/root/frame/type", {
                    text: newTextframe_type,
                });
            }
            setShowModalframe_type(false);
            setNewTextframe_type("");
            setEditIdframe_type(null);
            fetchframe_type();
        } catch (err) {
            console.error(err);
        }
    };

    const handleSaveframe_Color = async () => {
        try {
            if (editIdframe_color) {
                // Update
                await axios.put(`http://localhost:2776/api/root/frame/color/${editIdframe_color}`, {
                    text: newTextframe_color,
                });
            } else {
                // Create
                await axios.post("http://localhost:2776/api/root/frame/color", {
                    text: newTextframe_color,
                });
            }
            setShowModalframe_color(false);
            setNewTextframe_color("");
            setEditIdframe_color(null);
            fetchframe_color();
        } catch (err) {
            console.error(err);
        }
    };


    // Handle delete
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this record?")) {
            try {
                await axios.delete(`http://localhost:2776/api/root/frame/category/${id}`);
                fetchPurpose();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleDeleteframe_material = async (id) => {
        if (window.confirm("Are you sure you want to delete this record?")) {
            try {
                await axios.delete(`http://localhost:2776/api/root/frame/material/${id}`);
                fetchframe_material();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleDeleteframe_type = async (id) => {
        if (window.confirm("Are you sure you want to delete this record?")) {
            try {
                await axios.delete(`http://localhost:2776/api/root/frame/type/${id}`);
                fetchframe_type();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleDeleteframe_color = async (id) => {
        if (window.confirm("Are you sure you want to delete this record?")) {
            try {
                await axios.delete(`http://localhost:2776/api/root/frame/color/${id}`);
                fetchframe_color();
            } catch (err) {
                console.error(err);
            }
        }
    };

    // Open modal for edit
    const handleEdit = (p) => {
        setNewText(p.text);
        setEditId(p.fc_id);
        setShowModal(true);
    };

    const handleEditframe_material = (p) => {
        setNewTextframe_material(p.text);
        setEditIdframe_material(p.fm_id);
        setShowModalframe_material(true);
    };

    const handleEditframe_type = (p) => {
        setNewTextframe_type(p.text);
        setEditIdframe_type(p.ft_id);
        setShowModalframe_type(true);
    };

    const handleEditframe_color = (p) => {
        setNewTextframe_color(p.text);
        setEditIdframe_color(p.fc_id);
        setShowModalframe_color(true);
    };

    // Open modal for create
    const handleCreate = () => {
        setNewText("");
        setEditId(null);
        setShowModal(true);
    };

    const handleCreateframe_material = () => {
        setNewTextframe_material("");
        setEditIdframe_material(null);
        setShowModalframe_material(true);
    };

    const handleCreateframe_type = () => {
        setNewTextframe_type("");
        setEditIdframe_type(null);
        setShowModalframe_type(true);
    };

    const handleCreateframe_color = () => {
        setNewTextframe_color("");
        setEditIdframe_color(null);
        setShowModalframe_color(true);
    };

    return (
        <React.Fragment>
            <Row>
                <Col md={6}>
                    <Card>
                        <Card.Header className="d-flex justify-content-between align-items-center">
                            <div>
                                <Card.Title as="h5">Frame Category</Card.Title>
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
                                    {frame_category.map((p) => (
                                        <tr key={p.fc_id}>
                                            <td>{p.fc_id}</td>
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
                                                    onClick={() => handleDelete(p.fc_id)}
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
                                <Card.Title as="h5">Frame Material</Card.Title>
                                <span className="d-block m-t-5">
                                    use props <code>hover</code> with <code>Table</code> component
                                </span>
                            </div>
                            <Button variant="primary" onClick={handleCreateframe_material}>
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
                                    {frame_material.map((p) => (
                                        <tr key={p.fm_id}>
                                            <td>{p.fm_id}</td>
                                            <td>{p.text}</td>
                                            <td>
                                                <Button
                                                    variant="warning"
                                                    size="sm"
                                                    className="me-2"
                                                    onClick={() => handleEditframe_material(p)}
                                                >
                                                    <FaEdit />
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => handleDeleteframe_material(p.fm_id)}
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
                                <Card.Title as="h5">Frame Type</Card.Title>
                                <span className="d-block m-t-5">
                                    use props <code>hover</code> with <code>Table</code> component
                                </span>
                            </div>
                            <Button variant="primary" onClick={handleCreateframe_type}>
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
                                    {frame_type.map((p) => (
                                        <tr key={p.ft_id}>
                                            <td>{p.ft_id}</td>
                                            <td>{p.text}</td>
                                            <td>
                                                <Button
                                                    variant="warning"
                                                    size="sm"
                                                    className="me-2"
                                                    onClick={() => handleEditframe_type(p)}
                                                >
                                                    <FaEdit />
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => handleDeleteframe_type(p.ft_id)}
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
                                <Card.Title as="h5">Frame Color</Card.Title>
                                <span className="d-block m-t-5">
                                    use props <code>hover</code> with <code>Table</code> component
                                </span>
                            </div>
                            <Button variant="primary" onClick={handleCreateframe_color}>
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
                                    {frame_color.map((p) => (
                                        <tr key={p.fc_id}>
                                            <td>{p.fc_id}</td>
                                            <td>{p.text}</td>
                                            <td>
                                                <Button
                                                    variant="warning"
                                                    size="sm"
                                                    className="me-2"
                                                    onClick={() => handleEditframe_color(p)}
                                                >
                                                    <FaEdit />
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    onClick={() => handleDeleteframe_color(p.fc_id)}
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
                        {editId ? "Edit Frame Category" : "Create New Frame Category"}
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
                                placeholder="Enter Frame Category"
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

            <Modal show={showModalframe_material} onHide={() => setShowModalframe_material(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {editIdframe_material ? "Edit Frame Material" : "Create New Frame Material Text"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Text</Form.Label>
                            <Form.Control
                                type="text"
                                value={newTextframe_material}
                                onChange={(e) => setNewTextframe_material(e.target.value)}
                                placeholder="Enter Frame Material"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModalframe_material(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSaveframe_material}>
                        {editIdframe_material ? "Update" : "Create"}
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showModalframe_type} onHide={() => setShowModalframe_type(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {editIdframe_type ? "Edit Frame Type" : "Create New Frame Type Text"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Text</Form.Label>
                            <Form.Control
                                type="text"
                                value={newTextframe_type}
                                onChange={(e) => setNewTextframe_type(e.target.value)}
                                placeholder="Enter Frame Type"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModalframe_type(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleframe_type}>
                        {editIdframe_type ? "Update" : "Create"}
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showModalframe_color} onHide={() => setShowModalframe_color(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {editIdframe_color ? "Edit Frame Colour" : "Create New Frame Colour Text"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Text</Form.Label>
                            <Form.Control
                                type="text"
                                value={newTextframe_color}
                                onChange={(e) => setNewTextframe_color(e.target.value)}
                                placeholder="Enter Frame Colour"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModalframe_color(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSaveframe_Color}>
                        {editIdframe_color ? "Update" : "Create"}
                    </Button>
                </Modal.Footer>
            </Modal>



        </React.Fragment>
    );
};

export default RootAdminFrame;
