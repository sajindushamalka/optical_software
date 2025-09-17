import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Form, Table, Button } from 'react-bootstrap';
import axios from 'axios';

const CashierHistory = () => {
    const [allInvoice, setAllInvoice] = useState([]);
    const [searchType, setSearchType] = useState('invoice'); // default: invoice
    const [searchTerm, setSearchTerm] = useState('');
    const [invoiceMainDetails, setInvoiceMainDetails] = useState('');
    const [invoiceSubDetails, setInvoiceSubDetails] = useState([]);
    const [recepitDetails, setRecepitDetails] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

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
        if (searchType === 'invoice') {
            const ob = {
                id: searchTerm
            }
            axios.post(`http://localhost:2776/api/order/cashier/invoice`, ob).then((res) => {
                setInvoiceMainDetails(res.data)
                console.log(res.data)
                const ob2 = {
                    id: res.data.ci_id
                }
                console.log(ob2)
                axios.post(`http://localhost:2776/api/order/cashier/invoice/table`, ob2).then((res) => {
                    setInvoiceSubDetails(res.data)
                    console.log(res.data)
                }).catch((err) => {
                    console.log(err)
                })
            }).catch((err) => {
                console.log(err)
            })
        }
        if (searchType === 'recepit') {
            const ob = {
                id: searchTerm
            }
            axios.post(`http://localhost:2776/api/order/cashier/invoice`, ob).then((res) => {
                setInvoiceMainDetails(res.data)
                console.log(res.data)
                const ob2 = {
                    id: res.data.ci_id
                }
                console.log(ob2)
                axios.post(`http://localhost:2776/api/order/cashier/invoice/table`, ob2).then((res) => {
                    setInvoiceSubDetails(res.data)
                    console.log(res.data)
                }).catch((err) => {
                    console.log(err)
                })
                axios.post(`http://localhost:2776/api/order/cashier/recepit`, ob2).then((res) => {
                    setRecepitDetails(res.data)
                    console.log(res.data)
                }).catch((err) => {
                    console.log(err)
                })
            }).catch((err) => {
                console.log(err)
            })
        }
        if (searchType === 'job') {
            const ob = {
                id: searchTerm
            }
            axios.post(`http://localhost:2776/api/order/cashier/invoice`, ob).then((res) => {
                setInvoiceMainDetails(res.data)
                console.log(res.data)
                const ob2 = {
                    id: res.data.ci_id
                }
                console.log(ob2)
                axios.post(`http://localhost:2776/api/order/cashier/invoice/table`, ob2).then((res) => {
                    setInvoiceSubDetails(res.data)
                    console.log(res.data)
                }).catch((err) => {
                    console.log(err)
                })
                axios.post(`http://localhost:2776/api/order/cashier/recepit`, ob2).then((res) => {
                    setRecepitDetails(res.data)
                    console.log(res.data)
                }).catch((err) => {
                    console.log(err)
                })
            }).catch((err) => {
                console.log(err)
            })
        }
    };

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

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default CashierHistory;
