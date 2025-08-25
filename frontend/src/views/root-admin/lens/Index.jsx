import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col, Card, Table, Button, Modal, Form } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";

const RootAdminLenses = () => {
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

  const [lens_base, setlens_base] = useState([]);
  const [showModallens_base, setShowModallens_base] = useState(false);
  const [newTextlens_base, setNewTextlens_base] = useState("");
  const [editIdlens_base, setEditIdlens_base] = useState(null);

  const [lens_brand, setlens_brand] = useState([]);
  const [showModallens_brand, setShowModallens_brand] = useState(false);
  const [newTextlens_brand, setNewTextlens_brand] = useState("");
  const [editIdlens_brand, setEditIdlens_brand] = useState(null);

  const [lenses_at, setlenses_at] = useState([]);
  const [showModallenses_at, setShowModallenses_at] = useState(false);
  const [newTextlenses_at, setNewTextlenses_at] = useState("");
  const [editIdlenses_at, setEditIdlenses_at] = useState(null);

  // Fetch data
  const fetchPurpose = async () => {
    try {
      const res = await axios.get("http://localhost:2776/api/root/lense");
      setLensMaterial(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchlenses_type = async () => {
    try {
      const res = await axios.get("http://localhost:2776/api/root/lense/type");
      setlenses_type(res.data);
    } catch (err) {
      console.error(err);
    }
  };


  const fetchlens_treatment = async () => {
    try {
      const res = await axios.get("http://localhost:2776/api/root/lense/treatment");
      setlens_treatment(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchlens_colour = async () => {
    try {
      const res = await axios.get("http://localhost:2776/api/root/lense/colour");
      setlens_colour(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchlens_size = async () => {
    try {
      const res = await axios.get("http://localhost:2776/api/root/lense/size");
      setlens_size(res.data);
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
    fetchlenses_type();
    fetchlens_treatment();
    fetchlens_colour();
    fetchlens_size();
    fetchlens_base();
    fetchlens_brand();
    fetchlenses_at();
  }, []);

  // Handle create or update
  const handleSave = async () => {
    try {
      if (editId) {
        // Update
        await axios.put(`http://localhost:2776/api/root/lense/${editId}`, {
          text: newText,
        });
      } else {
        // Create
        await axios.post("http://localhost:2776/api/root/lense", {
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
        await axios.put(`http://localhost:2776/api/root/lense/type/${editIdlenses_type}`, {
          text: newTextlenses_type,
        });
      } else {
        // Create
        await axios.post("http://localhost:2776/api/root/lense/type", {
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
        await axios.put(`http://localhost:2776/api/root/lense/treatment/${editIdlens_treatment}`, {
          text: newTextlens_treatment,
        });
      } else {
        // Create
        await axios.post("http://localhost:2776/api/root/lense/treatment", {
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
        await axios.put(`http://localhost:2776/api/root/lense/colour/${editIdlens_colour}`, {
          text: newTextlens_colour,
        });
      } else {
        // Create
        await axios.post("http://localhost:2776/api/root/lense/colour", {
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
        await axios.put(`http://localhost:2776/api/root/lense/size/${editIdlens_size}`, {
          text: newTextlens_size,
        });
      } else {
        // Create
        await axios.post("http://localhost:2776/api/root/lense/size", {
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

  const handleSavelens_base = async () => {
    try {
      if (editIdlens_base) {
        // Update
        await axios.put(`http://localhost:2776/api/root/lense/base/${editIdlens_base}`, {
          text: newTextlens_base,
        });
      } else {
        // Create
        await axios.post("http://localhost:2776/api/root/lense/base", {
          text: newTextlens_base,
        });
      }
      setShowModallens_base(false);
      setNewTextlens_base("");
      setEditIdlens_base(null);
      fetchlens_base();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSavelens_brand = async () => {
    try {
      if (editIdlens_brand) {
        // Update
        await axios.put(`http://localhost:2776/api/root/lense/brand/${editIdlens_brand}`, {
          text: newTextlens_brand,
        });
      } else {
        // Create
        await axios.post("http://localhost:2776/api/root/lense/brand", {
          text: newTextlens_brand,
        });
      }
      setShowModallens_brand(false);
      setNewTextlens_brand("");
      setEditIdlens_brand(null);
      fetchlens_brand();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSavelenses_at = async () => {
    try {
      if (editIdlenses_at) {
        // Update
        await axios.put(`http://localhost:2776/api/root/lense/at/${editIdlenses_at}`, {
          text: newTextlenses_at,
        });
      } else {
        // Create
        await axios.post("http://localhost:2776/api/root/lense/at", {
          text: newTextlenses_at,
        });
      }
      setShowModallenses_at(false);
      setNewTextlenses_at("");
      setEditIdlenses_at(null);
      fetchlenses_at();
    } catch (err) {
      console.error(err);
    }
  };


  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await axios.delete(`http://localhost:2776/api/root/lense/${id}`);
        fetchPurpose();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleDeletelenses_type = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await axios.delete(`http://localhost:2776/api/root/lense/type/${id}`);
        fetchlenses_type();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleDeletelens_treatment = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await axios.delete(`http://localhost:2776/api/root/lense/treatment/${id}`);
        fetchlens_treatment();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleDeletelens_colour = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await axios.delete(`http://localhost:2776/api/root/lense/colour/${id}`);
        fetchlens_colour();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleDeletelens_size = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await axios.delete(`http://localhost:2776/api/root/lense/size/${id}`);
        fetchlens_size();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleDeletelens_base = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await axios.delete(`http://localhost:2776/api/root/lense/base/${id}`);
        fetchlens_base();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleDeletelens_brand = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await axios.delete(`http://localhost:2776/api/root/lense/brand/${id}`);
        fetchlens_brand();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleDeletelenses_at = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await axios.delete(`http://localhost:2776/api/root/lense/at/${id}`);
        fetchlenses_at();
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Open modal for edit
  const handleEdit = (p) => {
    setNewText(p.text);
    setEditId(p.lm_id);
    setShowModal(true);
  };

  const handleEditlenses_type = (p) => {
    setNewTextlenses_type(p.text);
    setEditIdlenses_type(p.lt_id);
    setShowModallenses_type(true);
  };

  const handleEditlenses_treatment = (p) => {
    setNewTextlens_treatment(p.text);
    setEditIdlens_treatment(p.lt_id);
    setShowModallens_treatment(true);
  };

  const handleEditlens_colour = (p) => {
    setNewTextlens_colour(p.text);
    setEditIdlens_colour(p.lc_id);
    setShowModallens_colour(true);
  };

  const handleEditlens_size = (p) => {
    setNewTextlens_size(p.text);
    setEditIdlens_size(p.ls_id);
    setShowModallens_size(true);
  };

  const handleEditlens_base = (p) => {
    setNewTextlens_base(p.text);
    setEditIdlens_base(p.lb_id);
    setShowModallens_base(true);
  };

  const handleEditlens_brand = (p) => {
    setNewTextlens_brand(p.text);
    setEditIdlens_brand(p.lb_id);
    setShowModallens_brand(true);
  };

  const handleEditlenses_at = (p) => {
    setNewTextlenses_at(p.text);
    setEditIdlenses_at(p.la_id);
    setShowModallenses_at(true);
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

  const handleCreatelens_base = () => {
    setNewTextlens_base("");
    setEditIdlens_base(null);
    setShowModallens_base(true);
  };

  const handleCreatelens_brand = () => {
    setNewTextlens_brand("");
    setEditIdlens_brand(null);
    setShowModallens_brand(true);
  };

  const handleCreatelenses_at = () => {
    setNewTextlenses_at("");
    setEditIdlenses_at(null);
    setShowModallenses_at(true);
  };

  return (
    <React.Fragment>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <div>
                <Card.Title as="h5">Lens Material</Card.Title>
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
                    <tr key={p.lm_id}>
                      <td>{p.lm_id}</td>
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
                          onClick={() => handleDelete(p.lm_id)}
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
                <Card.Title as="h5">Lenses Type</Card.Title>
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
                    <tr key={p.lt_id}>
                      <td>{p.lt_id}</td>
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
                          onClick={() => handleDeletelenses_type(p.lt_id)}
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
                <Card.Title as="h5">Lens Treatment</Card.Title>
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
                    <tr key={p.lt_id}>
                      <td>{p.lt_id}</td>
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
                          onClick={() => handleDeletelens_treatment(p.lt_id)}
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
                <Card.Title as="h5">Lens Colour</Card.Title>
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
                    <tr key={p.lc_id}>
                      <td>{p.lc_id}</td>
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
                          onClick={() => handleDeletelens_colour(p.lc_id)}
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
                <Card.Title as="h5">Lens Size</Card.Title>
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
                    <tr key={p.ls_id}>
                      <td>{p.ls_id}</td>
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
                          onClick={() => handleDeletelens_size(p.ls_id)}
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
                <Card.Title as="h5">Lens Base</Card.Title>
                <span className="d-block m-t-5">
                  use props <code>hover</code> with <code>Table</code> component
                </span>
              </div>
              <Button variant="primary" onClick={handleCreatelens_base}>
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
                  {lens_base.map((p) => (
                    <tr key={p.lb_id}>
                      <td>{p.lb_id}</td>
                      <td>{p.text}</td>
                      <td>
                        <Button
                          variant="warning"
                          size="sm"
                          className="me-2"
                          onClick={() => handleEditlens_base(p)}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeletelens_base(p.lb_id)}
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
                <Card.Title as="h5">Lens Brand</Card.Title>
                <span className="d-block m-t-5">
                  use props <code>hover</code> with <code>Table</code> component
                </span>
              </div>
              <Button variant="primary" onClick={handleCreatelens_brand}>
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
                  {lens_brand.map((p) => (
                    <tr key={p.lb_id}>
                      <td>{p.lb_id}</td>
                      <td>{p.text}</td>
                      <td>
                        <Button
                          variant="warning"
                          size="sm"
                          className="me-2"
                          onClick={() => handleEditlens_brand(p)}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeletelens_brand(p.lb_id)}
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
                <Card.Title as="h5">Lenses At</Card.Title>
                <span className="d-block m-t-5">
                  use props <code>hover</code> with <code>Table</code> component
                </span>
              </div>
              <Button variant="primary" onClick={handleCreatelenses_at}>
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
                  {lenses_at.map((p) => (
                    <tr key={p.la_id}>
                      <td>{p.la_id}</td>
                      <td>{p.text}</td>
                      <td>
                        <Button
                          variant="warning"
                          size="sm"
                          className="me-2"
                          onClick={() => handleEditlenses_at(p)}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeletelenses_at(p.la_id)}
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
            {editId ? "Edit Lens Material" : "Create New Lens Material"}
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
                placeholder="Enter Lens Material"
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
            {editIdlenses_type ? "Edit Lenses Type" : "Create New Lenses Type Text"}
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
                placeholder="Enter Lenses Type"
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
            {editIdlens_treatment ? "Edit LensTreatment" : "Create New LensTreatment Text"}
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
                placeholder="Enter LensTreatment"
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
            {editIdlens_colour ? "Edit Lens Colour" : "Create New Lens Colour Text"}
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
                placeholder="Enter Lens Colour"
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
            {editIdlens_size ? "Edit Lense Size" : "Create New Lense Size Text"}
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
                placeholder="Enter Lense Size"
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


      <Modal show={showModallens_base} onHide={() => setShowModallens_base(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editIdlens_base ? "Edit Lense Base" : "Create New Lense Base Text"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Text</Form.Label>
              <Form.Control
                type="text"
                value={newTextlens_base}
                onChange={(e) => setNewTextlens_base(e.target.value)}
                placeholder="Enter Lense Base"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModallens_base(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSavelens_base}>
            {editIdlens_base ? "Update" : "Create"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModallens_brand} onHide={() => setShowModallens_brand(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editIdlens_brand ? "Edit Lense Brand" : "Create New Lense Brand Text"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Text</Form.Label>
              <Form.Control
                type="text"
                value={newTextlens_brand}
                onChange={(e) => setNewTextlens_brand(e.target.value)}
                placeholder="Enter Lense Brand"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModallens_brand(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSavelens_brand}>
            {editIdlens_brand ? "Update" : "Create"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModallenses_at} onHide={() => setShowModallenses_at(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editIdlenses_at ? "Edit Lenses At" : "Create New Lenses At Text"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Text</Form.Label>
              <Form.Control
                type="text"
                value={newTextlenses_at}
                onChange={(e) => setNewTextlenses_at(e.target.value)}
                placeholder="Enter Lenses At"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModallenses_at(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSavelenses_at}>
            {editIdlenses_at ? "Update" : "Create"}
          </Button>
        </Modal.Footer>
      </Modal>


    </React.Fragment>
  );
};

export default RootAdminLenses;
