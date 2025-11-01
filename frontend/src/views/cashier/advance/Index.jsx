import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Card, Tabs, Tab, Form, Container, Button, Table } from 'react-bootstrap';
import avatar1 from '../../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../../assets/images/user/avatar-3.jpg';
import LOGO from '../../../assets/images/S_LOGO.jpg';
import axios from 'axios';
import { toast } from 'react-toastify';

const CashierHistory = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [invoiceItems, setinvoiceItems] = useState([]);
    const [allPage, setAllPage] = useState(1);
    const allPerPage = 5;
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const invoiceRef = useRef();
    const [tableDetals, setTableDetails] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [paymentType, setPaymentType] = useState("");
    const [enteredAmount, setEnteredAmount] = useState("");
    const [partialPayAmount, setPartialPaymAmount] = useState(0);
    const [invoiceRows, setInvoiceRows] = useState([]);
    const today = new Date().toLocaleDateString();
    const [invoiceNo, setInvoiceNo] = React.useState("");


    // Load users / invoices on mount
    useEffect(() => {
        axios
            .get('http://localhost:2776/api/order/advance')
            .then((res) => setAllUsers(res.data))
            .catch((err) => console.log(err));

        axios
            .get('http://localhost:2776/api/root/invoice')
            .then((res) => setinvoiceItems(res.data))
            .catch((err) => console.log(err));

        const lastInvoice = "2025/09/INV00005"; // example, null if none
        const newInvoice = generateInvoiceNumber(lastInvoice);
        setInvoiceNo(newInvoice);
    }, []);

    // Recalculate balance
    const balance = selectedUser
        ? (Number(selectedUser.total_amount || 0) - Number(selectedUser.paeid_amount || 0) - Number(partialPayAmount || 0))
        : 0;

    // Autofill for balance payment
    useEffect(() => {
        if (paymentType === "advance" && selectedUser) {
            setEnteredAmount(String(balance));
        } else if (paymentType === "full") {
            setEnteredAmount("");
        }
    }, [paymentType, selectedUser]); // eslint-disable-line

    // Reset invoice rows when selecting new user
    const handleUserClick = (user) => {
        console.log(user)
        setSelectedUser(user);
        setInvoiceRows([]);
        setPaymentType("");
        setPaymentMethod("");
        setEnteredAmount("");
        axios.get(`http://localhost:2776/api/root/complate/${user.ci_id}`)
            .then((res) => setTableDetails(res.data))
            .catch((err) => console.log(err));

        axios.get(`http://localhost:2776/api/order/cashier/recipt/${user.ci_id}`).then((res) => {
            console.log(res.data);
            setPartialPaymAmount(res.data.sum)
        }).catch((err) => {
            console.log(err)
        })
    };

    // Add payment logic
    const handleAddPayment = () => {
        if (!paymentType) {
            alert("Please select a payment type.");
            return;
        }
        if (!paymentMethod) {
            alert("Please select a payment method.");
            return;
        }

        const amt = Number(enteredAmount);

        if (paymentType === "full") {
            if (!enteredAmount || isNaN(amt) || amt <= 0) {
                alert("Enter a valid amount greater than 0.");
                return;
            }
            if (amt > balance) {
                alert(`Entered amount (${amt}) cannot exceed remaining balance (${balance}).`);
                return;
            }

            const newRow = {
                qty: 1,
                description: `Partial Payment`,
                amount: amt
            };
            setInvoiceRows(prev => {
                const withoutMethod = prev.filter(r => !r._isMethodRow);
                return [...withoutMethod, newRow, { _isMethodRow: true }];
            });
        } else if (paymentType === "advance") {
            const balanceAmt = balance;
            if (isNaN(balanceAmt) || balanceAmt <= 0) {
                alert("No remaining balance to pay.");
                return;
            }

            const newRow = {
                qty: 1,
                description: `Balance Payment`,
                amount: balanceAmt
            };
            setInvoiceRows(prev => {
                const withoutMethod = prev.filter(r => !r._isMethodRow);
                return [...withoutMethod, newRow, { _isMethodRow: true }];
            });
        }

        if (paymentType === "full") setEnteredAmount("");
    };

    // Compute total paid
    const totalPaid = invoiceRows
        .filter(r => !r._isMethodRow)
        .reduce((sum, r) => sum + Number(r.amount || 0), 0);

    // Search + pagination
    const searchFilteredUsers = allUsers.filter((user) =>
        Object.values(user).some((value) =>
            value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
    const allIndexLast = allPage * allPerPage;
    const allIndexFirst = allIndexLast - allPerPage;
    const paginatedAllUsers = searchFilteredUsers.slice(allIndexFirst, allIndexLast);
    const allTotalPages = Math.max(1, Math.ceil(searchFilteredUsers.length / allPerPage));

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        if (isNaN(date)) return "N/A";
        return date.toISOString().split("T")[0];
    };


    function generateInvoiceNumber(lastInvoiceNo) {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");

        // Financial year start (April)
        const financialYearStartMonth = 4;
        let financialYear;
        if (now.getMonth() + 1 >= financialYearStartMonth) {
            financialYear = year;
        } else {
            financialYear = year - 1;
        }

        let serial = 1;

        if (lastInvoiceNo) {
            // Match invoice format: YYYY/MM/INVxxxxx
            const match = lastInvoiceNo.match(/(\d{4})\/\d{2}\/INV(\d{5})/);
            if (match) {
                const lastYear = parseInt(match[1]);
                const lastSerial = parseInt(match[2]);

                if (lastYear === financialYear) {
                    serial = lastSerial + 1;
                }
            }
        }

        const serialFormatted = String(serial).padStart(5, "0");
        return `${year}/${month}/INV${serialFormatted}`;
    }

    // Function to call backend
    const handleSaveReceipt = async () => {
        try {
            if (paymentType === "advance") {
                const payload = {
                    ci_id: selectedUser.ci_id,  // make sure you have invoice id in state
                    amount: totalPaid,
                    pay_type: "Balance",
                    payment_method: paymentMethod,
                    recepit_Id: invoiceNo,
                    date: formatDate(today)
                };

                axios.post('http://localhost:2776/api/order/cashier/recipt', payload).then((res) => {
                    console.log(res.data);
                    axios.put(`http://localhost:2776/api/order/cashier/${selectedUser.cmd_id}`).then((res) => {
                        toast.success('Receipt Updated!')
                    }).catch((err) => {
                        toast.error("Error in updating receipt!")
                    })
                }).catch((err) => {
                    toast.error("Error in updating receipt!")
                })
            } else if (paymentType === "full") {
                const payload = {
                    ci_id: selectedUser.ci_id,  // make sure you have invoice id in state
                    amount: totalPaid,
                    pay_type: "Partial",
                    payment_method: paymentMethod,
                    recepit_Id: invoiceNo,
                    date: formatDate(today)
                };
                axios.post('http://localhost:2776/api/order/cashier/recipt', payload).then((res) => {
                    console.log(res.data);
                    toast.success('Receipt Updated!')
                }).catch((err) => {
                    toast.error("Error in updating receipt!")
                })
            }

        } catch (err) {
            console.error("Error saving receipt:", err);
            alert("Something went wrong");
        }
    };

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
                                            Receipt Invoices
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
                                                <h6 className="m-0 fw-bold">{user.prefix}{" "}{user.first_name}{" "}{user.name}</h6>
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
                    <Row className="mt-3">
                        <Col>
                            <Card className="shadow-sm border-0 rounded-3">
                                <Card.Body>
                                    <div className="d-flex justify-content-around text-center">
                                        <div>
                                            <h6 className="text-muted mb-1">Total Amount</h6>
                                            <h4 className="fw-bold text-primary">
                                                {Number(selectedUser.total_amount || 0).toFixed(2)}
                                            </h4>
                                        </div>
                                        <div>
                                            <h6 className="text-muted mb-1">Advance Paid</h6>
                                            <h4 className="fw-bold text-success">
                                                {Number(selectedUser.paeid_amount || 0).toFixed(2)}
                                            </h4>
                                        </div>
                                        <div>
                                            <h6 className="text-muted mb-1">Partial Paid</h6>
                                            <h4 className="fw-bold text-info">
                                                {Number(partialPayAmount || 0).toFixed(2)}
                                            </h4>
                                        </div>
                                        <div>
                                            <h6 className="text-muted mb-1">Remaining</h6>
                                            <h4 className="fw-bold text-danger">
                                                {Number(balance).toFixed(2)}
                                            </h4>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                )}

                {/* Payment controls */}
                {selectedUser && (
                    <div className="d-flex gap-3 flex-wrap align-items-end mt-3">
                        <Form.Group style={{ minWidth: "200px" }}>
                            <Form.Label>Payment Type</Form.Label>
                            <Form.Select
                                value={paymentType}
                                onChange={(e) => setPaymentType(e.target.value)}
                            >
                                <option value="">-- Select Payment Type --</option>
                                <option value="full">Partial payment</option>
                                <option value="advance">Balance payment</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group style={{ minWidth: "200px" }}>
                            <Form.Label>Payment Method</Form.Label>
                            <Form.Select
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            >
                                <option value="">-- Select Method --</option>
                                <option value="cash">Cash</option>
                                <option value="visa">Visa</option>
                            </Form.Select>
                        </Form.Group>

                        {paymentType && (
                            <Form.Group style={{ minWidth: "200px" }}>
                                <Form.Label>Amount</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={enteredAmount}
                                    onChange={(e) => setEnteredAmount(e.target.value)}
                                    placeholder={paymentType === "advance" ? String(Number(balance).toFixed(2)) : "Enter amount"}
                                    readOnly={paymentType === "advance"}
                                />
                            </Form.Group>
                        )}

                        <Button variant="primary" onClick={handleAddPayment}>
                            Add Payment
                        </Button>
                    </div>
                )}

                {selectedUser && (
                    <Col md={12} className="mt-4">
                        <Card className="shadow p-4">
                            <div ref={invoiceRef} id="invoice-print">
                                <div className="header-row mb-3 d-flex align-items-center">
                                    <div className="logo">
                                        <img src={LOGO} width={100} alt="Logo" />
                                    </div>
                                    <div className="header-text text-center flex-grow-1">
                                        <h5 className="fw-bold mb-0">A. A. Samarasinghe Optometrists (Pvt) Ltd.</h5>
                                        <p className="fw-bold" style={{ color: '#0F0B85' }}>Optometrists & Specialist in Contact Lenses</p>
                                        <p className="text-muted mb-0">N H Building Yatinuwara Street, Kandy</p>
                                        <p className="text-muted">Phone: 011-1234567</p>
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
                                                        <th>Job No</th>
                                                        <th>Date</th>
                                                        <th>Invoice No</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>{selectedUser.cmd_id}</td>
                                                        <td>{formatDate(selectedUser.date)}</td>
                                                        <td>{selectedUser.invoice_no}</td>
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

                                {/* Invoice Table */}
                                <Table bordered responsive className="mb-4">
                                    <thead className="table-light">
                                        <tr>
                                            <th>QTY</th>
                                            <th>Description</th>
                                            <th>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {invoiceRows.filter(r => !r._isMethodRow).length === 0 && (
                                            <tr>
                                                <td colSpan={3} className="text-center text-muted">No payments added yet.</td>
                                            </tr>
                                        )}

                                        {/* Payment rows */}
                                        {invoiceRows.filter(r => !r._isMethodRow).map((row, idx) => (
                                            <tr key={idx}>
                                                <td>{row.qty}</td>
                                                <td>{row.description}</td>
                                                <td>{Number(row.amount || 0).toFixed(2)}</td>
                                            </tr>
                                        ))}

                                        {/* Empty rows */}
                                        {invoiceRows.some(r => r._isMethodRow) && (
                                            <>
                                                <tr><td colSpan={3}>&nbsp;</td></tr>
                                            </>
                                        )}

                                        {/* Payment Method Row */}
                                        {invoiceRows.some(r => r._isMethodRow) && (
                                            <tr className="table-secondary">
                                                <td colSpan={2} className="fw-bold text-end">
                                                    Payment Method ({paymentMethod})
                                                </td>
                                                <td className="fw-bold">{totalPaid.toFixed(2)}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </div>
                        </Card>
                    </Col>
                )}

            </Row>
            <div className="mt-3 text-end">
                <Button variant="outline-primary" onClick={handlePrint}>
                    Print
                </Button>
                <button className="btn btn-success" onClick={handleSaveReceipt}>
                    Save Receipt
                </button>
            </div>
        </React.Fragment>
    );
};

export default CashierHistory;
