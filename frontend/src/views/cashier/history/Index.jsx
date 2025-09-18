import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Card, Form, Table, Button } from 'react-bootstrap';
import axios from 'axios';
import LOGO from '../../../assets/images/S_LOGO.jpg';

const CashierHistory = () => {
    const [allInvoice, setAllInvoice] = useState([]);
    const [searchType, setSearchType] = useState('invoice'); // default: invoice
    const [searchTerm, setSearchTerm] = useState('');
    const [invoiceMainDetails, setInvoiceMainDetails] = useState('');
    const [customerDeatils, setCustomerDeatils] = useState('');
    const [invoiceSubDetails, setInvoiceSubDetails] = useState([]);
    const [recepitDetails, setRecepitDetails] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const invoiceRef = useRef();

    useEffect(() => {
        axios
            .get('http://localhost:2776/api/order/admin/recepits')
            .then((res) => {
                setAllInvoice(res.data);
                setFilteredData(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // 🔎 Handle filtering based on search type
    const handleSearch = () => {
        const ob = {
            id: searchTerm
        }
        axios.post(`http://localhost:2776/api/order/cashier/invoice`, ob).then((res) => {
            setInvoiceMainDetails(res.data)
            const ob2 = {
                id: res.data.ci_id
            }
            console.log(ob2)
            axios.post(`http://localhost:2776/api/order/cashier/invoice/table`, ob2).then((res) => {
                setInvoiceSubDetails(res.data)
            }).catch((err) => {
                console.log(err)
            })
            axios.post(`http://localhost:2776/api/order/cashier/recepit`, ob2).then((res) => {
                setRecepitDetails(res.data)
            }).catch((err) => {
                console.log(err)
            })

            const ob3 = {
                id: res.data.cmd_id
            }

            axios.post(`http://localhost:2776/api/order/cashier/customer`, ob3).then((res) => {
                setCustomerDeatils(res.data)
            }).catch((err) => {
                console.log(err)
            })
        }).catch((err) => {
            console.log(err)
        })

        if (searchType == 'job') {
            const ob8 = {
                id: searchTerm
            }
            axios.post(`http://localhost:2776/api/order/cashier/jobid`, ob8).then((res) => {
                const ob = {
                    id: res.data.invoice_no
                }
                axios.post(`http://localhost:2776/api/order/cashier/invoice`, ob).then((res) => {
                    setInvoiceMainDetails(res.data)
                    const ob2 = {
                        id: res.data.ci_id
                    }
                    console.log(ob2)
                    axios.post(`http://localhost:2776/api/order/cashier/invoice/table`, ob2).then((res) => {
                        setInvoiceSubDetails(res.data)
                    }).catch((err) => {
                        console.log(err)
                    })
                    axios.post(`http://localhost:2776/api/order/cashier/recepit`, ob2).then((res) => {
                        setRecepitDetails(res.data)
                    }).catch((err) => {
                        console.log(err)
                    })

                    const ob3 = {
                        id: res.data.cmd_id
                    }

                    axios.post(`http://localhost:2776/api/order/cashier/customer`, ob3).then((res) => {
                        setCustomerDeatils(res.data)
                    }).catch((err) => {
                        console.log(err)
                    })
                }).catch((err) => {
                    console.log(err)
                })
            }).catch((err) => {
                console.log(err)
            })
        }
    };

    // Calculate subtotal (sum of price * qty)
    const subTotal = invoiceSubDetails.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // VAT amount
    const vatAmount = invoiceMainDetails.vat
        ? (subTotal * invoiceMainDetails.vat) / 100
        : 0;

    // Discount amount
    const discountAmount = invoiceMainDetails.discount
        ? (subTotal * invoiceMainDetails.discount) / 100
        : 0;

    // Grand total = subtotal + VAT - Discount
    const grandTotal = subTotal + vatAmount - discountAmount;

    // Advance amount (paid)
    const advanceAmount = invoiceMainDetails.paeid_amount
        ? Number(invoiceMainDetails.paeid_amount)
        : 0;

    // Remaining balance
    const remainingAmount = grandTotal - advanceAmount;


    return (
        <React.Fragment>
            <Row>
                <Col md={12} xl={12} className="user-activity">
                    <Card>
                        <Card.Header>
                            <h5 className="mb-3">Cashier History</h5>

                            {/* Radio Buttons + Input */}
                            <div className="d-flex align-items-center">
                                <Form.Check
                                    inline
                                    label="Invoice"
                                    name="searchType"
                                    type="radio"
                                    value="invoice"
                                    checked={searchType === 'invoice'}
                                    onChange={(e) => setSearchType(e.target.value)}
                                />
                                <Form.Check
                                    inline
                                    label="Receipt"
                                    name="searchType"
                                    type="radio"
                                    value="recepit"
                                    checked={searchType === 'recepit'}
                                    onChange={(e) => setSearchType(e.target.value)}
                                />
                                <Form.Check
                                    inline
                                    label="Job Number"
                                    name="searchType"
                                    type="radio"
                                    value="job"
                                    checked={searchType === 'job'}
                                    onChange={(e) => setSearchType(e.target.value)}
                                />

                                <Form.Control
                                    type="text"
                                    placeholder={`Search by ${searchType}`}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{ width: '300px', marginLeft: '15px' }}
                                />

                                <Button style={{ marginLeft: '15px' }} onClick={handleSearch}>Search</Button>
                            </div>
                        </Card.Header>

                        <Card.Body>
                            {invoiceMainDetails && (
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
                                                    <p className="mb-1">Customer Name : {customerDeatils.name}</p>
                                                    <p className="mb-1">Address : {customerDeatils.address}</p>
                                                    <p className="mb-1">Phone : {customerDeatils.telephone}</p>
                                                    <p className="mb-1">Email : {customerDeatils.email}</p>
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
                                                                    <td>{customerDeatils.cmd_id}</td>
                                                                    <td>{formatDate(customerDeatils.date)}</td>
                                                                    <td>{invoiceMainDetails.invoice_no}</td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        {/* <p className="mb-0">
                                                            <strong>Reference No :</strong>{" "}
                                                            {selectedUser.date ? new Date(selectedUser.date).toLocaleDateString() : "N/A"}
                                                        </p> */}
                                                    </div>
                                                </Col>
                                            </Row>


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
                                                    {invoiceSubDetails.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{item.order_description}</td>
                                                            <td>{item.quantity}</td>
                                                            <td>Rs.{item.price.toFixed(2)}</td>
                                                            <td>Rs.{(item.price * item.quantity).toFixed(2)}</td>
                                                        </tr>
                                                    ))}

                                                    {/* Subtotal */}
                                                    <tr style={{ backgroundColor: "#E3E3E3", fontWeight: "bold" }}>
                                                        <td colSpan="3">Subtotal</td>
                                                        <td>Rs.{subTotal.toFixed(2)}</td>
                                                    </tr>

                                                    {/* VAT */}
                                                    {invoiceMainDetails.vat && (
                                                        <tr>
                                                            <td colSpan="3">VAT ({invoiceMainDetails.vat}%)</td>
                                                            <td>Rs.{vatAmount.toFixed(2)}</td>
                                                        </tr>
                                                    )}

                                                    {/* Discount */}
                                                    {invoiceMainDetails.discount && (
                                                        <tr>
                                                            <td colSpan="3">Discount ({invoiceMainDetails.discount}%)</td>
                                                            <td>- Rs.{discountAmount.toFixed(2)}</td>
                                                        </tr>
                                                    )}

                                                    {/* Grand Total */}
                                                    <tr style={{ backgroundColor: "#D3D3D3", fontWeight: "bold" }}>
                                                        <td colSpan="3">Grand Total</td>
                                                        <td>Rs.{grandTotal.toFixed(2)}</td>
                                                    </tr>

                                                    {/* Advance Paid */}
                                                    {invoiceMainDetails.paeid_amount && (
                                                        <tr>
                                                            <td colSpan="3">
                                                                Advance Paid / Payment Method : {invoiceMainDetails.payment_method}
                                                            </td>
                                                            <td>Rs.{advanceAmount.toFixed(2)}</td>
                                                        </tr>
                                                    )}

                                                    {/* Remaining Balance */}
                                                    {invoiceMainDetails.paeid_amount && (
                                                        <tr>
                                                            <td colSpan="3">Remaining Payment</td>
                                                            <td>Rs.{remainingAmount.toFixed(2)}</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </Table>



                                            <Row style={{ padding: 10 }}>
                                                <Col className="border p-1">
                                                    <h6 style={{ fontWeight: 'bold', paddingTop: 30, paddingLeft: 30, paddingBottom: 10 }}>Terms and Conditions</h6>
                                                    <p style={{ paddingLeft: 30 }}>* Please collect your goods within 90 days</p>
                                                    <p style={{ paddingLeft: 30 }}>* Orders once booked cannot be cancelled</p>
                                                    <p style={{ paddingLeft: 30 }}>* Once paid cannot be refunded</p>
                                                </Col>
                                            </Row>
                                        </div>

                                    </Card>
                                </Col>
                            )}

                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                {recepitDetails && (
                    recepitDetails.map((r) => (
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
                                            <p className="mb-1">Customer Name : {customerDeatils.name}</p>
                                            <p className="mb-1">Address : {customerDeatils.address}</p>
                                            <p className="mb-1">Phone : {customerDeatils.telephone}</p>
                                            <p className="mb-1">Email : {customerDeatils.email}</p>
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
                                                            <td>{customerDeatils.cmd_id}</td>
                                                            <td>{formatDate(customerDeatils.date)}</td>
                                                            <td>{r.recepit_Id}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </Col>
                                    </Row>

                                    {/* Invoice Table */}
                                    <Table bordered responsive className="mb-4">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Description</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{r.pay_type} Payment</td>
                                                <td>{Number(r.amount || 0).toFixed(2)}</td>
                                            </tr>
                                            <tr className="table-secondary">
                                                <td></td>
                                                <td colSpan={2} className="fw-bold text-start">
                                                    Payment Method ({r.payment_method})
                                                </td>
                                                {/* <td className="fw-bold">{totalPaid.toFixed(2)}</td> */}
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </Card>
                        </Col>
                    ))

                )}

            </Row>
        </React.Fragment>
    );
};

export default CashierHistory;
