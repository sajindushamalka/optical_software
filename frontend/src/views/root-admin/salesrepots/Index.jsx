import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col, Card, Table, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RootAdminSalesReport = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    const [recepit, setRecepit] = useState([]);
    const [filteredReceipts, setFilteredReceipts] = useState([]);

    // Shared date range filter
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const fetchData = async () => {
        try {
            const res = await axios.get("http://localhost:2776/api/order/admin/invoices");
            setUsers(res.data);
            setFilteredUsers(res.data);

            const res2 = await axios.get("http://localhost:2776/api/order/admin/recepits");
            setRecepit(res2.data);
            setFilteredReceipts(res2.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Filter invoices & receipts by date range
    useEffect(() => {
        if (startDate && endDate) {
            const filteredInv = users.filter((p) => {
                const invoiceDate = new Date(p.date);
                return invoiceDate >= startDate && invoiceDate <= endDate;
            });
            setFilteredUsers(filteredInv);

            const filteredRec = recepit.filter((r) => {
                const receiptDate = new Date(r.date);
                return receiptDate >= startDate && receiptDate <= endDate;
            });
            setFilteredReceipts(filteredRec);
        } else {
            setFilteredUsers(users);
            setFilteredReceipts(recepit);
        }
    }, [startDate, endDate, users, recepit]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        if (isNaN(date)) return "N/A";
        return date.toISOString().split("T")[0];
    };

    // Totals for invoices
    const totalAmount = filteredUsers.reduce((acc, p) => acc + Number(p.total_amount || 0), 0);
    const advancePaid = filteredUsers.reduce((acc, p) => acc + Number(p.paeid_amount || 0), 0);
    const balanceToPay = filteredUsers.reduce(
        (acc, p) => acc + (Number(p.total_amount || 0) - Number(p.paeid_amount || 0)),
        0
    );

    // Total receipts paid
    const totalReceiptsPaid = filteredReceipts.reduce((acc, r) => acc + Number(r.amount || 0), 0);

    // Total from Invoices
    const totalInvoices = filteredUsers.reduce((acc, p) => acc + Number(p.total_amount || 0), 0);

    // Total from Receipts
    const totalReceipts = filteredReceipts.reduce((acc, r) => acc + Number(r.amount || 0), 0);

    // Combined total sales
    const totalSales = totalInvoices + totalReceipts;

    // Cash & Card payments from BOTH tables
    const cashPayments =
        filteredUsers
            .filter((p) => p.payment_method?.toLowerCase() === "cash")
            .reduce((acc, p) => acc + Number(p.total_amount || 0), 0) +
        filteredReceipts
            .filter((r) => r.payment_method?.toLowerCase() === "cash")
            .reduce((acc, r) => acc + Number(r.total_paid || 0), 0);

    const cardPayments =
        filteredUsers
            .filter((p) => p.payment_method?.toLowerCase() === "card")
            .reduce((acc, p) => acc + Number(p.total_amount || 0), 0) +
        filteredReceipts
            .filter((r) => r.payment_method?.toLowerCase() === "card")
            .reduce((acc, r) => acc + Number(r.total_paid || 0), 0);

    return (
        <React.Fragment>
            {/* Global Date Range Picker */}
            <Row className="mb-4">
                <Col md={4}>
                    <Form.Group>
                        <Form.Label>Start Date</Form.Label>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            className="form-control"
                            placeholderText="Select start date"
                        />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group>
                        <Form.Label>End Date</Form.Label>
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            className="form-control"
                            placeholderText="Select end date"
                        />
                    </Form.Group>
                </Col>
            </Row>

            {/* Invoice Reports */}
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Invoice Reports</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Table responsive hover>
                                <thead>
                                    <tr>
                                        <th>Invoice No</th>
                                        <th>Job No</th>
                                        <th>Total</th>
                                        <th>Date</th>
                                        <th>Payment Method</th>
                                        <th>Advance Paid</th>
                                        <th>Balance to Paid</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.length > 0 ? (
                                        filteredUsers.map((p) => (
                                            <tr key={p.invoice_no}>
                                                <td>{p.invoice_no}</td>
                                                <td>{p.cmd_id}</td>
                                                <td>{p.total_amount}</td>
                                                <td>{formatDate(p.date)}</td>
                                                <td>{p.payment_method}</td>
                                                <td>{p.paeid_amount}</td>
                                                <td>{Number(p.total_amount) - Number(p.paeid_amount)}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="text-center">
                                                No invoices found for selected range
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                                {filteredUsers.length > 0 && (
                                    <tfoot>
                                        <tr className="fw-bold">
                                            <td colSpan="2" className="text-end">Totals:</td>
                                            <td>{totalAmount}</td>
                                            <td></td>
                                            <td></td>
                                            <td>{advancePaid}</td>
                                            <td>{balanceToPay}</td>
                                        </tr>
                                    </tfoot>
                                )}
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Receipts Reports */}
            <Row className="mt-4">
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Receipts Reports</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Table responsive hover>
                                <thead>
                                    <tr>
                                        <th>Receipt No</th>
                                        <th>Invoice No</th>
                                        <th>Job No</th>
                                        <th>Date</th>
                                        <th>Payment Method</th>
                                        <th>Total Paid</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredReceipts.length > 0 ? (
                                        filteredReceipts.map((r) => (
                                            <tr key={r.receipt_no}>
                                                <td>{r.receipt_no}</td>
                                                <td>{r.invoice_no}</td>
                                                <td>{r.cmd_id}</td>
                                                <td>{formatDate(r.date)}</td>
                                                <td>{r.payment_method}</td>
                                                <td>{r.amount}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center">
                                                No receipts found for selected range
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                                {filteredReceipts.length > 0 && (
                                    <tfoot>
                                        <tr className="fw-bold">
                                            <td colSpan="5" className="text-end">Total Paid:</td>
                                            <td>{totalReceiptsPaid}</td>
                                        </tr>
                                    </tfoot>
                                )}
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mt-4">
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Summary</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Table bordered>
                                <tbody>
                                    <tr>
                                        <td><strong>Total Sale Amount</strong></td>
                                        <td>Rs. {totalSales}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Cash Payment</strong></td>
                                        <td>Rs. {cashPayments}</td>
                                    </tr>
                                    <tr>
                                        <td><strong>Card Payment</strong></td>
                                        <td>Rs. {cardPayments}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default RootAdminSalesReport;
