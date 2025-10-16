import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Card, Tabs, Tab, Form, Container, Button, Table } from 'react-bootstrap';
import avatar1 from '../../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../../assets/images/user/avatar-3.jpg';
import LOGO from '../../../assets/images/S_LOGO.jpg';
import axios from 'axios';
import { toast } from 'react-toastify';

const CashierInvoice = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [invoiceItems, setinvoiceItems] = useState([]);
  const [allPage, setAllPage] = useState(1);
  const allPerPage = 5;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const invoiceRef = useRef();
  const [selectedItems, setSelectedItems] = useState([]);
  const [paymentType, setPaymentType] = useState("");  // full / advance
  const [paymentMethod, setPaymentMethod] = useState(""); // cash / visa
  const [advanceAmount, setAdvanceAmount] = useState(0);

  // VAT & Discount
  const [enableVAT, setEnableVAT] = useState(false);
  const [vatPercent, setVatPercent] = useState(0);
  const [enableDiscount, setEnableDiscount] = useState(false);
  const [discountPercent, setDiscountPercent] = useState(0);

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


  const [invoiceNo, setInvoiceNo] = React.useState("");

  useEffect(() => {
    axios
      .get('http://localhost:2776/api/order/cahsierhi')
      .then((res) => setAllUsers(res.data))
      .catch((err) => console.log(err));

    axios
      .get('http://localhost:2776/api/root/invoice')
      .then((res) => setinvoiceItems(res.data))
      .catch((err) => console.log(err));

    // Suppose you fetch last invoice no from DB
    const lastInvoice = "2025/09/INV00005"; // example, null if none
    const newInvoice = generateInvoiceNumber(lastInvoice);
    setInvoiceNo(newInvoice);
  }, []);

  const searchFilteredUsers = allUsers.filter((user) =>
    Object.values(user).some((value) => value?.toString().toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const allIndexLast = allPage * allPerPage;
  const allIndexFirst = allIndexLast - allPerPage;
  const paginatedAllUsers = searchFilteredUsers.slice(allIndexFirst, allIndexLast);
  const allTotalPages = Math.ceil(searchFilteredUsers.length / allPerPage);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const today = new Date().toLocaleDateString();
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Totals with VAT & Discount
  const subTotal = selectedItems.reduce((sum, item) => sum + item.qty * item.price, 0);
  const vatAmount = enableVAT ? (subTotal * vatPercent) / 100 : 0;
  const discountAmount = enableDiscount ? (subTotal * discountPercent) / 100 : 0;
  const grandTotal = subTotal + vatAmount - discountAmount;

  console.log(grandTotal)
  const submitOrder = () => {
    const ob = {
      date: formatDate(today),
      cmd_id: selectedUser.cmd_id,
      payment_type: paymentType,
      payment_method: paymentMethod,
      paeid_amount: advanceAmount,
      discount: discountPercent,
      vat: vatPercent,
      invoice_no: invoiceNo,
      total_amount:grandTotal
    };

    if (paymentType === "full" || paymentType === "advance") {
      axios.post('http://localhost:2776/api/order/new/cahser', ob).then((res) => {
        selectedItems.forEach(item => {
          let ob = {
            ci_id: res.data.id,
            order_description: item.title,
            quantity: item.qty,
            price: item.price,
          };
          axios.post('http://localhost:2776/api/order/new/cahser/items', ob).catch(() => {
            toast.error("Error adding item!");
          });
        });

        const updateUrl = paymentType === "full"
          ? `http://localhost:2776/api/order/cashier/${selectedUser.cmd_id}`
          : `http://localhost:2776/api/order/cashier/advance/${selectedUser.cmd_id}`;

        axios.put(updateUrl).then(() => {
          toast.success("Order Updated!");
        }).catch(() => toast.error("Error updating order!"));

      }).catch(() => toast.error("System Error!"));
    }
  };

  const handlePrint = () => {
    const printContents = invoiceRef.current.innerHTML;
    const newWindow = window.open("", "_blank", "width=900,height=1200");

    //   newWindow.document.write(`
    //   <html>
    //     <head>
    //       <title>Invoice</title>
    //       <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    //     </head>
    //     <body>
    //       <div id="invoice-print" class="container">${printContents}</div>
    //     </body>
    //   </html>
    // `);

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
        {/* Left Side Users */}
        <Col md={12} xl={12} className="user-activity">
          <Card>
            <Card.Header>
              <Container>
                <Row>
                  <Col>
                    <Card.Title as="h5" style={{ fontWeight: 'bold' }}>
                      Full Payments
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
                        <h6 className="m-0 fw-bold">{user.prefix} {" "} {user.first_name}  {" "} {user.name}</h6>
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

        {/* Right Side Invoice */}
        <Col>
          <Form.Group className="mb-3 d-flex">
            <Form.Select
              onChange={(e) => {
                const selectedId = e.target.value;
                const item = invoiceItems.find((i) => i.cid_id === parseInt(selectedId));
                if (item) {
                  setSelectedItems((prev) => {
                    const exists = prev.find((p) => p.cid_id === item.cid_id);
                    if (exists) {
                      return prev.map((p) =>
                        p.cid_id === item.cid_id ? { ...p, qty: p.qty + 1 } : p
                      );
                    } else {
                      return [...prev, { ...item, qty: 1 }];
                    }
                  });
                }
                e.target.value = "";
              }}
            >
              <option value="">-- Select Item --</option>
              {invoiceItems.map((item) => (
                <option key={item.cid_id} value={item.cid_id}>
                  {item.title} - Rs.{item.price}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {/* Payment Options + VAT/Discount */}
          {selectedItems.length > 0 && (
            <>
              <div className="mb-3 d-flex gap-3 flex-wrap">
                <Form.Group style={{ minWidth: "200px" }}>
                  <Form.Label>Payment Type</Form.Label>
                  <Form.Select
                    value={paymentType}
                    onChange={(e) => setPaymentType(e.target.value)}
                  >
                    <option value="">-- Select Payment Type --</option>
                    <option value="full">Full Payment</option>
                    <option value="advance">Advance Payment</option>
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

                {/* Advance / Full Paid */}
                {paymentType && (
                  <Form.Group style={{ minWidth: "150px" }}>
                    <Form.Label>{paymentType === "advance" ? "Advance Amount" : "Paid Amount"}</Form.Label>
                    <Form.Control
                      type="number"
                      min="0"
                      value={advanceAmount}
                      onChange={(e) => setAdvanceAmount(parseFloat(e.target.value) || 0)}
                    />
                  </Form.Group>
                )}

                {/* VAT */}
                <Form.Group style={{ minWidth: "150px" }}>
                  <Form.Check
                    type="checkbox"
                    label="Enable VAT"
                    checked={enableVAT}
                    onChange={(e) => setEnableVAT(e.target.checked)}
                  />
                  {enableVAT && (
                    <Form.Control
                      type="number"
                      min="0"
                      max="100"
                      value={vatPercent}
                      placeholder="VAT %"
                      onChange={(e) => setVatPercent(parseFloat(e.target.value) || 0)}
                    />
                  )}
                </Form.Group>

                {/* Discount */}
                <Form.Group style={{ minWidth: "150px" }}>
                  <Form.Check
                    type="checkbox"
                    label="Enable Discount"
                    checked={enableDiscount}
                    onChange={(e) => setEnableDiscount(e.target.checked)}
                  />
                  {enableDiscount && (
                    <Form.Control
                      type="number"
                      min="0"
                      max="100"
                      value={discountPercent}
                      placeholder="Discount %"
                      onChange={(e) => setDiscountPercent(parseFloat(e.target.value) || 0)}
                    />
                  )}
                </Form.Group>
              </div>
            </>
          )}
        </Col>

        <div className="mb-3">
          <h6>Selected Items:</h6>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {selectedItems.map((item) => (
              <div
                key={item.cid_id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  padding: "4px 10px",
                  background: "#f8f9fa",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span>{item.title} (x{item.qty})</span>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() =>
                    setSelectedItems((prev) =>
                      prev.filter((p) => p.cid_id !== item.cid_id)
                    )
                  }
                >
                  ✖
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Invoice Preview */}
        {selectedUser && (
          <Col md={12} className="mt-4">
            <Card className="shadow p-4">
              <div ref={invoiceRef} id="invoice-print">
                {/* Header */}
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
                            <td>{invoiceNo}</td>
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

                {/* Items */}
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
                    {selectedItems.map((item, index) => (
                      <tr key={index}>
                        <td>{item.title}</td>
                        <td>
                          <Form.Control
                            type="number"
                            min="1"
                            value={item.qty}
                            onChange={(e) => {
                              const newQty = parseInt(e.target.value) || 1;
                              setSelectedItems((prev) =>
                                prev.map((p, i) => (i === index ? { ...p, qty: newQty } : p))
                              );
                            }}
                            style={{ width: "80px", textAlign: "center" }}
                          />
                        </td>
                        <td>
                          <Form.Control
                            type="number"
                            min="0"
                            value={item.price}
                            onChange={(e) => {
                              const newPrice = parseFloat(e.target.value) || 0;
                              setSelectedItems((prev) =>
                                prev.map((p, i) => (i === index ? { ...p, price: newPrice } : p))
                              );
                            }}
                            style={{ width: "100px", textAlign: "center" }}
                          />
                        </td>
                        <td>Rs.{item.price * item.qty}</td>
                      </tr>
                    ))}

                    {/* Subtotal */}
                    <tr style={{ backgroundColor: "#E3E3E3", fontWeight: "bold" }}>
                      <td>Subtotal</td>
                      <td>{selectedItems.reduce((sum, item) => sum + item.qty, 0)}</td>
                      <td colSpan="2">Rs.{subTotal}</td>
                    </tr>

                    {/* VAT */}
                    {enableVAT && (
                      <tr>
                        <td colSpan="3">VAT ({vatPercent}%)</td>
                        <td>Rs.{vatAmount.toFixed(2)}</td>
                      </tr>
                    )}

                    {/* Discount */}
                    {enableDiscount && (
                      <tr>
                        <td colSpan="3">Discount ({discountPercent}%)</td>
                        <td>- Rs.{discountAmount.toFixed(2)}</td>
                      </tr>
                    )}

                    {/* Grand Total */}
                    <tr style={{ backgroundColor: "#D3D3D3", fontWeight: "bold" }}>
                      <td colSpan="3">Grand Total</td>
                      <td>Rs.{grandTotal.toFixed(2)}</td>
                    </tr>

                    {/* Advance Payment */}
                    {paymentType === "advance" && (
                      <>
                        <tr>
                          <td colSpan="3">
                            Advance Paid / Payment Method : {paymentMethod}
                          </td>
                          <td>Rs.{advanceAmount}</td>
                        </tr>
                        <tr>
                          <td colSpan="3">Remaining Payment</td>
                          <td>Rs.{grandTotal - advanceAmount}</td>
                        </tr>
                      </>
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

              <div className="text-end mt-4">
                <Button variant="outline-primary" onClick={handlePrint}>
                  Print
                </Button>
                <Button variant="outline-primary" onClick={submitOrder}>
                  Proceed
                </Button>
              </div>


            </Card>
          </Col>
        )}
      </Row>
    </React.Fragment>
  );
};

export default CashierInvoice;
