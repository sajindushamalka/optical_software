import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col, Card, Table, Button, Modal, Form } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";

const RootAdminAssistance = () => {
  const [purpose_of_visit, setPurposeOfVisit] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newText, setNewText] = useState("");
  const [editId, setEditId] = useState(null);


  const [generalhealth, setgeneralhealth] = useState([]);
  const [showModalGeneral, setShowModalGeneral] = useState(false);
  const [newTextGeneral, setNewTextGeneral] = useState("");
  const [editIdGeneral, setEditIdGeneral] = useState(null);

  const [symptoms_list, setsymptoms_list] = useState([]);
  const [showModalsymptoms_list, setShowModalsymptoms_list] = useState(false);
  const [newTextsymptoms_list, setNewTextsymptoms_list] = useState("");
  const [editIdsymptoms_list, setEditIdsymptoms_list] = useState(null);


  const [occular_health, setoccular_health] = useState([]);
  const [showModaloccular_health, setShowModaloccular_health] = useState(false);
  const [newTextoccular_health, setNewTextoccular_health] = useState("");
  const [editIdoccular_health, setEditIdoccular_health] = useState(null);

  const [type_of_lense, settype_of_lense] = useState([]);
  const [showModaltype_of_lense, setShowModaltype_of_lense] = useState(false);
  const [newTexttype_of_lense, setNewTexttype_of_lense] = useState("");
  const [editIdtype_of_lense, setEditIdtype_of_lense] = useState(null);

  // Fetch data
  const fetchPurpose = async () => {
    try {
      const res = await axios.get("http://localhost:2776/api/root/purposeov");
      setPurposeOfVisit(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPurposeGeneralHealth = async () => {
    try {
      const res = await axios.get("http://localhost:2776/api/root/general");
      setgeneralhealth(res.data);
    } catch (err) {
      console.error(err);
    }
  };


  const fetchsymptoms = async () => {
    try {
      const res = await axios.get("http://localhost:2776/api/root/symptoms");
      setsymptoms_list(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchoccular_health = async () => {
    try {
      const res = await axios.get("http://localhost:2776/api/root/occular");
      setoccular_health(res.data);
    } catch (err) {
      console.error(err);
    }
  };

   const fetchtype_of_lense = async () => {
    try {
      const res = await axios.get("http://localhost:2776/api/root/typeoflense");
      settype_of_lense(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPurpose();
    fetchPurposeGeneralHealth();
    fetchsymptoms();
    fetchoccular_health();
    fetchtype_of_lense();
  }, []);

  // Handle create or update
  const handleSave = async () => {
    try {
      if (editId) {
        // Update
        await axios.put(`http://localhost:2776/api/root/purposeov/${editId}`, {
          text: newText,
        });
      } else {
        // Create
        await axios.post("http://localhost:2776/api/root/purposeov", {
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

  const handleSaveGeneralHealth = async () => {
    try {
      if (editIdGeneral) {
        // Update
        await axios.put(`http://localhost:2776/api/root/general/${editIdGeneral}`, {
          text: newTextGeneral,
        });
      } else {
        // Create
        await axios.post("http://localhost:2776/api/root/general", {
          text: newTextGeneral,
        });
      }
      setShowModalGeneral(false);
      setNewTextGeneral("");
      setEditIdGeneral(null);
      fetchPurposeGeneralHealth();
    } catch (err) {
      console.error(err);
    }
  };


  const handleSavesymptoms = async () => {
    try {
      if (editIdsymptoms_list) {
        // Update
        await axios.put(`http://localhost:2776/api/root/symptoms/${editIdsymptoms_list}`, {
          text: newTextsymptoms_list,
        });
      } else {
        // Create
        await axios.post("http://localhost:2776/api/root/symptoms", {
          text: newTextsymptoms_list,
        });
      }
      setShowModalsymptoms_list(false);
      setNewTextsymptoms_list("");
      setEditIdsymptoms_list(null);
      fetchsymptoms();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveoccular_health = async () => {
    try {
      if (editIdoccular_health) {
        // Update
        await axios.put(`http://localhost:2776/api/root/occular/${editIdoccular_health}`, {
          text: newTextoccular_health,
        });
      } else {
        // Create
        await axios.post("http://localhost:2776/api/root/occular", {
          text: newTextoccular_health,
        });
      }
      setShowModaloccular_health(false);
      setNewTextoccular_health("");
      setEditIdoccular_health(null);
      fetchoccular_health();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSavetype_of_lense = async () => {
    try {
      if (editIdtype_of_lense) {
        // Update
        await axios.put(`http://localhost:2776/api/root/typeoflense/${editIdtype_of_lense}`, {
          text: newTexttype_of_lense,
        });
      } else {
        // Create
        await axios.post("http://localhost:2776/api/root/typeoflense", {
          text: newTexttype_of_lense,
        });
      }
      setShowModaltype_of_lense(false);
      setNewTexttype_of_lense("");
      setEditIdtype_of_lense(null);
      fetchtype_of_lense();
    } catch (err) {
      console.error(err);
    }
  };


  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await axios.delete(`http://localhost:2776/api/root/purposeov/${id}`);
        fetchPurpose();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleDeleteGeneralHealth = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await axios.delete(`http://localhost:2776/api/root/general/${id}`);
        fetchPurposeGeneralHealth();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleDeletesymptoms = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await axios.delete(`http://localhost:2776/api/root/symptoms/${id}`);
        fetchsymptoms();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleDeleteoccular_health = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await axios.delete(`http://localhost:2776/api/root/occular/${id}`);
        fetchoccular_health();
      } catch (err) {
        console.error(err);
      }
    }
  };

   const handleDeletetype_of_lense = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        await axios.delete(`http://localhost:2776/api/root/typeoflense/${id}`);
        fetchtype_of_lense();
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Open modal for edit
  const handleEdit = (p) => {
    setNewText(p.text);
    setEditId(p.pov_id);
    setShowModal(true);
  };

  const handleEditGeneralHealth = (p) => {
    setNewTextGeneral(p.text);
    setEditIdGeneral(p.gh_id);
    setShowModalGeneral(true);
  };

  const handleEditsymptoms = (p) => {
    setNewTextsymptoms_list(p.text);
    setEditIdsymptoms_list(p.s_id);
    setShowModalsymptoms_list(true);
  };

  const handleEditoccular_health = (p) => {
    setNewTextoccular_health(p.text);
    setEditIdoccular_health(p.oh_id);
    setShowModaloccular_health(true);
  };

    const handleEdittype_of_lense = (p) => {
    setNewTexttype_of_lense(p.text);
    setEditIdtype_of_lense(p.tol_id);
    setShowModaltype_of_lense(true);
  };

  // Open modal for create
  const handleCreate = () => {
    setNewText("");
    setEditId(null);
    setShowModal(true);
  };

  const handleCreateGeneralHealth = () => {
    setNewTextGeneral("");
    setEditIdGeneral(null);
    setShowModalGeneral(true);
  };

  const handleCreatesymptoms = () => {
    setNewTextsymptoms_list("");
    setEditIdsymptoms_list(null);
    setShowModalsymptoms_list(true);
  };

  const handleCreateoccular_health = () => {
    setNewTextoccular_health("");
    setEditIdoccular_health(null);
    setShowModaloccular_health(true);
  };

    const handleCreatetype_of_lense = () => {
    setNewTexttype_of_lense("");
    setEditIdtype_of_lense(null);
    setShowModaltype_of_lense(true);
  };

  return (
    <React.Fragment>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <div>
                <Card.Title as="h5">Purpose of Visit</Card.Title>
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
                  {purpose_of_visit.map((p) => (
                    <tr key={p.pov_id}>
                      <td>{p.pov_id}</td>
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
                          onClick={() => handleDelete(p.pov_id)}
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
                <Card.Title as="h5">General Health</Card.Title>
                <span className="d-block m-t-5">
                  use props <code>hover</code> with <code>Table</code> component
                </span>
              </div>
              <Button variant="primary" onClick={handleCreateGeneralHealth}>
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
                  {generalhealth.map((p) => (
                    <tr key={p.gh_id}>
                      <td>{p.gh_id}</td>
                      <td>{p.text}</td>
                      <td>
                        <Button
                          variant="warning"
                          size="sm"
                          className="me-2"
                          onClick={() => handleEditGeneralHealth(p)}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteGeneralHealth(p.gh_id)}
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
                <Card.Title as="h5">Symptoms</Card.Title>
                <span className="d-block m-t-5">
                  use props <code>hover</code> with <code>Table</code> component
                </span>
              </div>
              <Button variant="primary" onClick={handleCreatesymptoms}>
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
                  {symptoms_list.map((p) => (
                    <tr key={p.s_id}>
                      <td>{p.s_id}</td>
                      <td>{p.text}</td>
                      <td>
                        <Button
                          variant="warning"
                          size="sm"
                          className="me-2"
                          onClick={() => handleEditsymptoms(p)}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeletesymptoms(p.s_id)}
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
                <Card.Title as="h5">Occular Health</Card.Title>
                <span className="d-block m-t-5">
                  use props <code>hover</code> with <code>Table</code> component
                </span>
              </div>
              <Button variant="primary" onClick={handleCreateoccular_health}>
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
                  {occular_health.map((p) => (
                    <tr key={p.oh_id}>
                      <td>{p.oh_id}</td>
                      <td>{p.text}</td>
                      <td>
                        <Button
                          variant="warning"
                          size="sm"
                          className="me-2"
                          onClick={() => handleEditoccular_health(p)}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteoccular_health(p.oh_id)}
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
                <Card.Title as="h5">Type of Lenses Used</Card.Title>
                <span className="d-block m-t-5">
                  use props <code>hover</code> with <code>Table</code> component
                </span>
              </div>
              <Button variant="primary" onClick={handleCreatetype_of_lense}>
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
                  {type_of_lense.map((p) => (
                    <tr key={p.tol_id}>
                      <td>{p.tol_id}</td>
                      <td>{p.text}</td>
                      <td>
                        <Button
                          variant="warning"
                          size="sm"
                          className="me-2"
                          onClick={() => handleEdittype_of_lense(p)}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeletetype_of_lense(p.tol_id)}
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
                <Card.Title as="h5">Occular Health</Card.Title>
                <span className="d-block m-t-5">
                  use props <code>hover</code> with <code>Table</code> component
                </span>
              </div>
              <Button variant="primary" onClick={handleCreateoccular_health}>
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
                  {occular_health.map((p) => (
                    <tr key={p.oh_id}>
                      <td>{p.oh_id}</td>
                      <td>{p.text}</td>
                      <td>
                        <Button
                          variant="warning"
                          size="sm"
                          className="me-2"
                          onClick={() => handleEditoccular_health(p)}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteoccular_health(p.oh_id)}
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
            {editId ? "Edit Purpose of Visit" : "Create New Purpose of Visit"}
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
                placeholder="Enter purpose text"
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

      <Modal show={showModalGeneral} onHide={() => setShowModalGeneral(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editIdGeneral ? "Edit General Health" : "Create New General Health Text"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Text</Form.Label>
              <Form.Control
                type="text"
                value={newTextGeneral}
                onChange={(e) => setNewTextGeneral(e.target.value)}
                placeholder="Enter General Health"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModalGeneral(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveGeneralHealth}>
            {editIdGeneral ? "Update" : "Create"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModalsymptoms_list} onHide={() => setShowModalsymptoms_list(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editIdsymptoms_list ? "Edit Symptoms" : "Create New Symptoms Text"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Text</Form.Label>
              <Form.Control
                type="text"
                value={newTextsymptoms_list}
                onChange={(e) => setNewTextsymptoms_list(e.target.value)}
                placeholder="Enter Symptoms"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModalsymptoms_list(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSavesymptoms}>
            {editIdsymptoms_list ? "Update" : "Create"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModaloccular_health} onHide={() => setShowModaloccular_health(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editIdoccular_health ? "Edit Occular Health" : "Create New Occular Health Text"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Text</Form.Label>
              <Form.Control
                type="text"
                value={newTextoccular_health}
                onChange={(e) => setNewTextoccular_health(e.target.value)}
                placeholder="Enter Occular Health"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModaloccular_health(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveoccular_health}>
            {editIdoccular_health ? "Update" : "Create"}
          </Button>
        </Modal.Footer>
      </Modal>

       <Modal show={showModaltype_of_lense} onHide={() => setShowModaltype_of_lense(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {editIdtype_of_lense ? "Edit Type Of Lense" : "Create New Type Of Lense Text"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Text</Form.Label>
              <Form.Control
                type="text"
                value={newTexttype_of_lense}
                onChange={(e) => setNewTexttype_of_lense(e.target.value)}
                placeholder="Enter Type Of Lense"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModaltype_of_lense(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSavetype_of_lense}>
            {editIdtype_of_lense ? "Update" : "Create"}
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default RootAdminAssistance;
