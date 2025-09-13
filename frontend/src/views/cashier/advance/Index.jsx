import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Card, Tabs, Tab, Form, Container, Button, Table } from 'react-bootstrap';
import avatar1 from '../../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../../assets/images/user/avatar-3.jpg';
import LOGO from '../../../assets/images/S_LOGO.jpg';
import axios from 'axios';

const CashierHistory = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [invoiceItems, setinvoiceItems] = useState([]);
    const [allPage, setAllPage] = useState(1);
    const allPerPage = 5;
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const invoiceRef = useRef();
    const [tableDetals, setTableDetails] = useState([]);
    const [isEditing, setIsEditing] = useState(false); // ✅ toggle edit mode
    const [ediedVersion, setEdiedVersion] = useState(false); // ✅ toggle edit mode

    useEffect(() => {
        axios
            .get('http://localhost:2776/api/order/advance')
            .then((res) => setAllUsers(res.data))
            .catch((err) => console.log(err));

        axios
            .get('http://localhost:2776/api/root/invoice')
            .then((res) => setinvoiceItems(res.data))
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
        axios.get(`http://localhost:2776/api/root/complate/${user.ci_id}`)
            .then((res) => setTableDetails(res.data))
            .catch((err) => console.log(err));
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    console.log(allUsers)


    const updateTabele = () => {
        setIsEditing(false)
        tableDetals.map((t) => {
            const ob = {
                edited_price: t.price
            }
            console.log(ob)
            axios.put(`http://localhost:2776/api/root/cashier/${t.ciit_id}`, ob).then((res) => {
                console.log(res.data)
            }).catch((err) => {
                console.log(err)
            })
        })

        const ob2 = {
            edited_date: formatDate(selectedUser.date)
        }

        axios.put(`http://localhost:2776/api/root/cashier/date/${tableDetals[0].ci_id}`, ob2).then((res) => {
            console.log(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }


    const handlePrint = () => {
        const printContents = invoiceRef.current.innerHTML;
        const newWindow = window.open("", "_blank", "width=900,height=1200");

        newWindow.document.write(`
    <html>
      <head>
        <title>Invoice</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
        <style>
           @media print {
    body * { visibility: hidden; }
    #invoice-print, #invoice-print * { visibility: visible; }
    #invoice-print {
      position: absolute;
      left: 0;
      top: 0;
      width: 210mm;
      min-height: 297mm;
      padding: 10mm;
      box-sizing: border-box;
    }

    /* Keep two columns side by side */
    #invoice-print .row { display: flex; flex-wrap: nowrap !important; }
    #invoice-print .col-md-6 { flex: 0 0 50% !important; max-width: 50% !important; }

    /* Table styles */
    table { width: 100% !important; border-collapse: collapse !important; }
    table, th, td { border: 1px solid #000 !important; padding: 4px !important; }

    /* Header styles */
    #invoice-print h5 { font-size: 30px; font-weight: bold; margin-bottom: 0; }
    #invoice-print p.fw-bold { font-size: 20px; color: #0F0B85; margin: 0; }
    #invoice-print p.text-muted { font-size: 15px; margin: 0; }
    #invoice-print img { max-width: 150px; height: auto; }
  }

  #invoice-print .header-row {
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    justify-content: flex-start !important;
    gap: 10px;
}

#invoice-print .header-row .logo {
    flex: 0 0 auto;
}

#invoice-print .header-row .header-text {
    flex: 1 1 auto;
    text-align: center;
}

  @page { size: A4 portrait; margin: 10mm; }
        </style>
      </head>
      <body>
        <div id="invoice-print" class="container">${printContents}</div>
      </body>
    </html>
  `);

        newWindow.document.close();
        newWindow.focus();
        newWindow.print();
        newWindow.close();
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
                                        <Card.Title as="h5" style={{ fontWeight: 'bold' }}>
                                            Full Invoices
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
                                            className={`d-flex friendlist-box align-items-center justify-content-center m-b-10 m-t-20 ${isSelected ? 'bg-light shadow-sm rounded' : ''}`}
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => handleUserClick(user)}
                                        >
                                            <div className="m-r-10 photo-table flex-shrink-0">
                                                <img
                                                    className="rounded-circle"
                                                    style={{ width: '40px' }}
                                                    src={user.gender === 'male' ? avatar2 : user.gender === 'female' ? avatar3 : avatar1}
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
                        <Card className="shadow p-4">


                            <div ref={invoiceRef} id="invoice-print">
                                <div className="header-row mb-3 d-flex">
                                    <div className="logo me-3">
                                        <img src={LOGO} width={100} alt="Logo" />
                                    </div>
                                    <div className="header-text" style={{ textAlign: 'center' }}>
                                        <h5 className="fw-bold mb-0" style={{ fontSize: 30 }}>A. A. Samarasinghe Optometrists (Pvt) Ltd.</h5>
                                        <p className="fw-bold" style={{ fontSize: 20, color: '#0F0B85' }}>Optometrists & Specialist in Contact Lenses</p>
                                        <p className="text-muted mb-0" style={{ fontSize: 15 }}>N H Building Yatinuwara Street, Kandy</p>
                                        <p className="text-muted" style={{ fontSize: 15 }}>Phone: 011-1234567</p>
                                    </div>
                                </div>

                                <hr />
                                <Row className="mb-3">
                                    <Col md={6}>
                                        <h6 className="fw-bold">Billed To:</h6>
                                        <p className="mb-1">Customer Name : {selectedUser.name}</p>
                                        <p className="mb-1">Address : {selectedUser.address}</p>
                                        <p className="mb-1">Phone : {selectedUser.telephone}</p>
                                        <p className="mb-1">Email : {selectedUser.email}</p>
                                    </Col>
                                    <Col md={6}>
                                        <div className="text-end">
                                            <h6 className="fw-bold">Invoice</h6>
                                            <table className="table table-bordered table-sm w-auto ms-auto">
                                                <thead className="table-light">
                                                    <tr>
                                                        <th>Invoice No</th>
                                                        <th>Date</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>{selectedUser.cmd_id}</td>
                                                        <td>
                                                            {isEditing ? (
                                                                <Form.Control
                                                                    type="date"
                                                                    value={ediedVersion
                                                                        ? formatDate(selectedUser.edited_date || selectedUser.date)
                                                                        : formatDate(selectedUser.date)}
                                                                    onChange={(e) =>
                                                                        setSelectedUser((prev) => ({
                                                                            ...prev,
                                                                            ...(ediedVersion
                                                                                ? { edited_date: e.target.value } // update edited_date
                                                                                : { date: e.target.value })       // update original date
                                                                        }))
                                                                    }
                                                                    style={{ width: "150px" }}
                                                                />
                                                            ) : (
                                                                ediedVersion
                                                                    ? formatDate(selectedUser.edited_date || selectedUser.date)
                                                                    : formatDate(selectedUser.date)
                                                            )}
                                                        </td>

                                                    </tr>
                                                </tbody>
                                            </table>
                                            <p className="mb-0">
                                                <strong>Reference No :</strong>{" "}
                                                {selectedUser.date ? new Date(selectedUser.date).toLocaleDateString() : "N/A"}
                                            </p>
                                        </div>
                                    </Col>
                                </Row>

                                {/* ✅ Editable Table */}
                                <Table bordered responsive className="mb-4">
                                    <thead className="table-light">
                                        <tr>
                                            <th>Description</th>
                                            <th>QTY</th>
                                            <th>Price</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableDetals.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.order_description}</td>
                                                <td>{item.quantity}</td>

                                                <td>
                                                    {isEditing ? (
                                                        <Form.Control
                                                            type="number"
                                                            value={ediedVersion ? item.edited_price || item.price : item.price}
                                                            onChange={(e) => {
                                                                const newPrice = parseFloat(e.target.value) || 0;
                                                                setTableDetails((prev) =>
                                                                    prev.map((p, i) =>
                                                                        i === index
                                                                            ? ediedVersion
                                                                                ? { ...p, edited_price: newPrice } // editing edited_price
                                                                                : { ...p, price: newPrice }        // editing price
                                                                            : p
                                                                    )
                                                                );
                                                            }}
                                                            style={{ width: "100px", textAlign: "center" }}
                                                        />
                                                    ) : (
                                                        `Rs.${ediedVersion ? item.edited_price || item.price : item.price}`
                                                    )}
                                                </td>


                                                <td>
                                                    Rs.{(item.quantity || 0) * (ediedVersion ? (item.edited_price || item.price || 0) : (item.price || 0))}
                                                </td>

                                            </tr>
                                        ))}

                                        <tr style={{ backgroundColor: "#E3E3E3", fontWeight: "bold" }}>
                                            <td>Total</td>
                                            <td>{tableDetals.reduce((sum, item) => sum + (item.quantity || 0), 0)}</td>
                                            <td></td>
                                            <td>
                                                Rs.{tableDetals.reduce(
                                                    (sum, item) =>
                                                        sum +
                                                        (item.quantity || 0) *
                                                        (ediedVersion ? (item.edited_price || item.price || 0) : (item.price || 0)),
                                                    0
                                                )}
                                            </td>

                                        </tr>

                                        <tr>
                                            <td colSpan="4">
                                                Payment Type : {selectedUser?.payment_type || "-"} / Payment Method : {selectedUser?.payment_method || "-"}
                                            </td>

                                        </tr>
                                        <tr>
                                            <td colSpan={3}>Paid Amount</td>
                                            <td>Rs.{selectedUser?.paeid_amount || 0}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </Card>
                    </Col>
                )}
                <div className="text-end mt-4">
                    <Button variant="outline-primary" onClick={handlePrint}>
                        Print
                    </Button>
                </div>
            </Row>
        </React.Fragment>
    );
};

export default CashierHistory;
