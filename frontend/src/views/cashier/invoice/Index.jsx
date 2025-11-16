import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Card, Tabs, Tab, Form, Container, Button, Table } from 'react-bootstrap';
import avatar1 from '../../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../../assets/images/user/avatar-3.jpg';
import axios from 'axios';
import { toast } from 'react-toastify';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";


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

  const [enableVAT, setEnableVAT] = useState(false);
  const [vatPercent, setVatPercent] = useState(0);
  const [enableDiscount, setEnableDiscount] = useState(false);
  const [discountPercent, setDiscountPercent] = useState(0);
  const componentRef = useRef();

  const handlePrintNext = async () => {
    const element = componentRef.current;

    // Capture the div as canvas
    const canvas = await html2canvas(element, {
      scale: 2, // higher quality
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");

    // A5 landscape page setup
    const pdf = new jsPDF({
      orientation: "landscape", // ✅ Change to landscape
      unit: "mm",
      format: "a5",
    });

    // Landscape A5 size (mm)ccs
    const pdfWidth = 210;
    const pdfHeight = 148;

    // Add the captured image to the PDF
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    // Save file
    pdf.save("Prescription.pdf");
  };


  //   const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  //   documentTitle: "Invoice",
  //   pageStyle: `
  //     @page {
  //       size: A5;
  //       margin: 10mm;
  //     }
  //     @media print {
  //       body {
  //         -webkit-print-color-adjust: exact;
  //         print-color-adjust: exact;
  //         background: white;
  //       }
  //     }
  //   `,
  // });

  function generateInvoiceNumber(lastInvoiceNo) {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");

    const financialYearStartMonth = 4;
    let financialYear;
    if (now.getMonth() + 1 >= financialYearStartMonth) {
      financialYear = year;
    } else {
      financialYear = year - 1;
    }

    let serial = 1;

    if (lastInvoiceNo) {
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

    axios.get('http://localhost:2776/api/order/lastinvoice')
      .then((res) => {
        const lastInvoice = res.data.invoice_no;
        console.log(res.data)
        const newInvoice = generateInvoiceNumber(lastInvoice);
        setInvoiceNo(newInvoice);
      })
      .catch((err) => console.log(err));


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
      total_amount: grandTotal
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


  return (
    <>
      <React.Fragment>
        <Row>
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
          {selectedUser && (
            <>
              <Row className="gy-3 mb-4">
                <Col md={2}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Payment Type</Form.Label>
                    <Form.Select
                      value={paymentType}
                      onChange={(e) => setPaymentType(e.target.value)}
                    >
                      <option value="">-- Select --</option>
                      <option value="full">Full Payment</option>
                      <option value="advance">Advance Payment</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">
                      {paymentType === "advance"
                        ? "Advance Amount"
                        : "Paid Amount"}
                    </Form.Label>
                    <Form.Control
                      type="number"
                      inputMode="decimal"
                      min="0"
                      value={advanceAmount === 0 ? "" : advanceAmount}
                      onChange={(e) =>
                        setAdvanceAmount(
                          e.target.value === "" ? 0 : parseFloat(e.target.value)
                        )
                      }
                      style={{
                        appearance: "textfield",
                        MozAppearance: "textfield",
                        WebkitAppearance: "none",
                      }}
                      onWheel={(e) => e.target.blur()}
                    />
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Payment Method</Form.Label>
                    <Form.Select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                      <option value="">-- Select --</option>
                      <option value="Cash">Cash</option>
                      <option value="VISA">VISA</option>
                      <option value="Cash/VISA">Cash/VISA</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={2}>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Select Item</Form.Label>
                    <Form.Select
                      className="shadow-sm"
                      onChange={(e) => {
                        const selectedId = e.target.value;
                        const item = invoiceItems.find(
                          (i) => i.cid_id === parseInt(selectedId)
                        );
                        if (item) {
                          setSelectedItems((prev) => {
                            const exists = prev.find(
                              (p) => p.cid_id === item.cid_id
                            );
                            return exists
                              ? prev.map((p) =>
                                p.cid_id === item.cid_id
                                  ? { ...p, qty: p.qty + 1 }
                                  : p
                              )
                              : [...prev, { ...item, qty: 1 }];
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
                </Col>
                <Col md={2}>
                  <Form.Group>
                    <Form.Check
                      type="checkbox"
                      label="Enable VAT"
                      checked={enableVAT}
                      onChange={(e) => setEnableVAT(e.target.checked)}
                    />
                    {enableVAT && (
                      <Form.Control
                        type="number"
                        inputMode="decimal"
                        min="0"
                        max="100"
                        className="mt-2"
                        value={vatPercent === 0 ? "" : vatPercent}
                        placeholder="VAT %"
                        onChange={(e) =>
                          setVatPercent(
                            e.target.value === ""
                              ? 0
                              : parseFloat(e.target.value)
                          )
                        }
                        style={{
                          appearance: "textfield",
                          WebkitAppearance: "none",
                          MozAppearance: "textfield",
                        }}
                        onWheel={(e) => e.target.blur()}
                      />
                    )}
                  </Form.Group>
                </Col>

                <Col md={2}>
                  <Form.Group>
                    <Form.Check
                      type="checkbox"
                      label="Enable Discount"
                      checked={enableDiscount}
                      onChange={(e) => setEnableDiscount(e.target.checked)}
                    />
                    {enableDiscount && (
                      <Form.Control
                        type="number"
                        inputMode="decimal"
                        min="0"
                        max="100"
                        className="mt-2"
                        value={discountPercent === 0 ? "" : discountPercent}
                        placeholder="Discount %"
                        onChange={(e) =>
                          setDiscountPercent(
                            e.target.value === ""
                              ? 0
                              : parseFloat(e.target.value)
                          )
                        }
                        style={{
                          appearance: "textfield",
                          WebkitAppearance: "none",
                          MozAppearance: "textfield",
                        }}
                        onWheel={(e) => e.target.blur()}
                      />
                    )}
                  </Form.Group>
                </Col>

              </Row>

              {/* Disable rest until paymentType selected */}
              {paymentType && (
                <>
                  <Row className="align-items-center mb-4">
                    <Col md={12}>
                      <h6 className="fw-semibold mb-2">Selected Items</h6>
                      <div
                        className="p-3 border rounded bg-light"
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "10px",
                          minHeight: "50px",
                        }}
                      >
                        {selectedItems.map((item) => (
                          <div
                            key={item.cid_id}
                            className="d-flex align-items-center border rounded px-3 py-2 bg-white shadow-sm"
                            style={{
                              gap: "8px",
                            }}
                          >
                            <span className="text-dark fw-semibold">
                              {item.title} (x{item.qty})
                            </span>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              className="py-0 px-2"
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
                    </Col>
                  </Row>

                  {selectedItems.length > 0 && (
                    <>
                      <Row className="mb-2">

                      </Row>

                      <Row className="gy-3">

                      </Row>
                    </>
                  )}
                </>
              )}
            </>
          )}


          {selectedUser && (
            <Col md={12} className="mt-4">
              <Card className="shadow p-4">
                <div
                //  ref={invoiceRef} id="invoice-print"
                >
                  {/* <div className="header-row mb-3 d-flex align-items-center" style={{ height: 150 }}>
                  <div className="logo">
                    {/* <img src={LOGO} width={100} alt="Logo" /> 
                  </div>
                  <div className="header-text text-center flex-grow-1">
                    {/* <h5 className="fw-bold mb-0">A. A. Samarasinghe Optometrists (Pvt) Ltd.</h5>
                    <p className="fw-bold" style={{ color: '#0F0B85' }}>Optometrists & Specialist in Contact Lenses</p>
                    <p className="text-muted mb-0">N H Building Yatinuwara Street, Kandy</p>
                    <p className="text-muted">Phone: 011-1234567</p>
                  </div>
                </div>

                <hr />
                 */}
                  <Row className="mb-3">
                    <Col md={6}>
                      <h6 className="fw-bold">Billed To:</h6>
                      <p className="mb-1">Customer Name :{selectedUser.prefix} {" "} {selectedUser.first_name}  {" "} {selectedUser.name}</p>
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
                              <td>{selectedUser.job_no}</td>
                              <td>{formatDate(selectedUser.date)}</td>
                              <td>{invoiceNo}</td>
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
                        <th>QTY</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedItems.map((item, index) => (
                        <tr key={index}>
                          {/* <td>
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
                        </td> */}
                          <td>
                            <Form.Control
                              type="number"
                              min="1"
                              value={item.qty === 0 ? "" : item.qty}
                              onChange={(e) => {
                                const value = e.target.value;
                                setSelectedItems((prev) =>
                                  prev.map((p, i) =>
                                    i === index
                                      ? { ...p, qty: value === "" ? 0 : parseInt(value) }
                                      : p
                                  )
                                );
                              }}
                              onBlur={(e) => {
                                // If the field is left empty, reset to 1 on blur
                                if (e.target.value === "") {
                                  setSelectedItems((prev) =>
                                    prev.map((p, i) => (i === index ? { ...p, qty: 1 } : p))
                                  );
                                }
                              }}
                              style={{
                                width: "60px",
                                textAlign: "center",
                                border: "none",
                                outline: "none",
                                boxShadow: "none",
                                backgroundColor: "transparent",
                                padding: 0,
                                fontWeight: "500",
                                color: "#000",
                              }}
                            />
                          </td>


                          <td>{item.title}</td>
                          {/* <td>
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
                        </td> */}
                          <td>
                            <Form.Control
                              type="number"
                              min="0"
                              value={item.price === 0 ? "" : item.price}
                              onChange={(e) => {
                                const value = e.target.value;
                                setSelectedItems((prev) =>
                                  prev.map((p, i) =>
                                    i === index
                                      ? { ...p, price: value === "" ? 0 : parseFloat(value) }
                                      : p
                                  )
                                );
                              }}
                              onBlur={(e) => {
                                // Reset to 0 if user leaves field empty
                                if (e.target.value === "") {
                                  setSelectedItems((prev) =>
                                    prev.map((p, i) => (i === index ? { ...p, price: 0 } : p))
                                  );
                                }
                              }}
                              style={{
                                width: "100px",
                                textAlign: "center",
                                border: "none",
                                outline: "none",
                                boxShadow: "none",
                                backgroundColor: "transparent",
                                padding: 0,
                                fontWeight: "500",
                                color: "#000",
                              }}
                            />
                          </td>

                          <td>Rs.{item.price * item.qty}</td>
                        </tr>
                      ))}

                      <tr style={{ backgroundColor: "#E3E3E3", fontWeight: "bold" }}>
                        <td>Subtotal</td>
                        <td>{selectedItems.reduce((sum, item) => sum + item.qty, 0)}</td>
                        <td colSpan="2">Rs.{subTotal}</td>
                      </tr>

                      {enableVAT && (
                        <tr>
                          <td colSpan="3">VAT ({vatPercent}%)</td>
                          <td>Rs.{vatAmount.toFixed(2)}</td>
                        </tr>
                      )}

                      {enableDiscount && (
                        <tr>
                          <td colSpan="3">Discount ({discountPercent}%)</td>
                          <td>- Rs.{discountAmount.toFixed(2)}</td>
                        </tr>
                      )}

                      <tr style={{ backgroundColor: "#D3D3D3", fontWeight: "bold" }}>
                        <td colSpan="3">Grand Total</td>
                        <td>Rs.{grandTotal.toFixed(2)}</td>
                      </tr>

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
                  {/* <Row style={{ padding: 10 }}>
                  <Col className="border p-1">
                    <h6 style={{ fontWeight: 'bold', paddingTop: 30, paddingLeft: 30, paddingBottom: 10 }}>Terms and Conditions</h6>
                    <p style={{ paddingLeft: 30 }}>* Please collect your goods within 90 days</p>
                    <p style={{ paddingLeft: 30 }}>* Orders once booked cannot be cancelled</p>
                    <p style={{ paddingLeft: 30 }}>* Once paid cannot be refunded</p>

                  </Col>
                </Row> */}
                </div>
                <div className="text-end mt-4">
                  <Button variant="outline-primary" onClick={handlePrintNext}>
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
      </React.Fragment >

      <style>
        {`
@media print {
  body {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  #invoice-print {
    width: 148mm !important;
    height: 210mm !important;
    margin: 0 !important;
    padding: 15px !important;
    border: none !important;
    box-shadow: none !important;
  }

  .no-flex-print {
    display: block !important;
  }

  table, th, td {
    border: 1px solid black !important;
    border-collapse: collapse !important;
  }

  th, td {
    padding: 4px !important;
  }
}
`}
      </style>


      {selectedUser && (
        <div
          ref={componentRef}
          className="a5-card"
          style={{
            width: "210mm",
            height: "148mm",
            margin: "0 auto",
            backgroundColor: "#fff",
            padding: '20px'
          }}
        >

          <div style={{ height: 100 }}>

          </div>

          <hr />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "12px",
            }}
          >
            {/* Left Side (Billed To) */}
            <div style={{ flex: 1 }}>
              <p className="fw-bold mb-1" style={{ fontSize: 11 }}>Billed To:</p>
              <p className="mb-1" style={{ fontSize: 10 }}>Customer Name: {selectedUser.prefix} {selectedUser.first_name} {selectedUser.name}</p>
              <p className="mb-1" style={{ fontSize: 10 }}>Address: {selectedUser.address}</p>
              <p className="mb-1" style={{ fontSize: 10 }}>Phone: {selectedUser.telephone}</p>
              <p className="mb-1" style={{ fontSize: 10 }}>Email: {selectedUser.email}</p>
            </div>

            {/* Right Side (Invoice Info) */}
            <div style={{ textAlign: "right", flex: 1 }}>
              <p className="fw-bold mb-1" style={{ fontSize: 11 }}>Invoice</p>
              <table className="table table-bordered table-sm" style={{ fontSize: 10 }}>
                <thead className="table-light">
                  <tr>
                    <th>Job No</th>
                    <th>Date</th>
                    <th>Invoice No</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{selectedUser.job_no}</td>
                    <td>{formatDate(selectedUser.date)}</td>
                    <td>{invoiceNo}</td>
                  </tr>
                </tbody>
              </table>
              {/* <p className="mb-0" style={{ fontSize: 10 }}>
                <strong>Reference No :</strong>{" "}
                {selectedUser.date ? new Date(selectedUser.date).toLocaleDateString() : "N/A"}
              </p> */}
            </div>
          </div>


          <Table
            style={{
              borderCollapse: "collapse",
              border: "1px solid black",
              margin: "auto",
            }}
          >
            <thead>
              <tr style={{ fontSize: 10, backgroundColor: "#f5f5f5" }}>
                <th style={{ border: "1px solid black", padding: "4px", textAlign: "center" }}>QTY</th>
                <th style={{ border: "1px solid black", padding: "4px", textAlign: "center" }}>Description</th>
                <th style={{ border: "1px solid black", padding: "4px", textAlign: "center" }}>Price</th>
                <th style={{ border: "1px solid black", padding: "4px", textAlign: "center" }}>Total</th>
              </tr>
            </thead>

            <tbody>
              {selectedItems.map((item, index) => (
                <tr key={index} style={{ fontSize: 10 }}>
                  {/* QTY */}
                  <td style={{ border: "1px solid black", textAlign: "center", padding: "2px" }}>
                    {item.qty}
                  </td>

                  {/* Description */}
                  <td style={{ border: "1px solid black", padding: "4px" }}>{item.title}</td>

                  {/* Price */}
                  <td style={{ border: "1px solid black", textAlign: "center", padding: "2px" }}>
                    {item.price}
                  </td>

                  {/* Total */}
                  <td style={{ border: "1px solid black", textAlign: "right", padding: "4px" }}>
                    Rs.{(item.price * item.qty).toFixed(2)}
                  </td>
                </tr>
              ))}

              {/* Subtotal */}
              <tr
                style={{
                  backgroundColor: "#E3E3E3",
                  fontWeight: "bold",
                  fontSize: 10,
                }}
              >
                <td style={{ border: "1px solid black", padding: "4px", textAlign: 'center' }}>{selectedItems.reduce((sum, item) => sum + item.qty, 0)}</td>
                <td style={{ border: "1px solid black", padding: "4px", textAlign: "left" }}>
                  Subtotal
                </td>
                <td colSpan="2" style={{ border: "1px solid black", padding: "4px", textAlign: "right" }}>
                  Rs.{subTotal.toFixed(2)}
                </td>
              </tr>

              {/* VAT */}
              {enableVAT && (
                <tr style={{ fontSize: 10 }}>
                  <td colSpan="3" style={{ border: "1px solid black", padding: "4px" }}>
                    VAT ({vatPercent}%)
                  </td>
                  <td style={{ border: "1px solid black", padding: "4px", textAlign: "right" }}>
                    Rs.{vatAmount.toFixed(2)}
                  </td>
                </tr>
              )}

              {/* Discount */}
              {enableDiscount && (
                <tr style={{ fontSize: 10 }}>
                  <td colSpan="3" style={{ border: "1px solid black", padding: "4px" }}>
                    Discount ({discountPercent}%)
                  </td>
                  <td style={{ border: "1px solid black", padding: "4px", textAlign: "right" }}>
                    - Rs.{discountAmount.toFixed(2)}
                  </td>
                </tr>
              )}

              {/* Grand Total */}
              <tr
                style={{
                  backgroundColor: "#D3D3D3",
                  fontWeight: "bold",
                  fontSize: 10,
                }}
              >
                <td colSpan="3" style={{ border: "1px solid black", padding: "4px" }}>
                  Grand Total
                </td>
                <td style={{ border: "1px solid black", padding: "4px", textAlign: "right" }}>
                  Rs.{grandTotal.toFixed(2)}
                </td>
              </tr>

              {/* Advance Payment */}
              {paymentType === "advance" && (
                <>
                  <tr style={{ fontSize: 10 }}>
                    <td colSpan="3" style={{ border: "1px solid black", padding: "4px" }}>
                      Advance Paid / Payment Method : {paymentMethod}
                    </td>
                    <td style={{ border: "1px solid black", padding: "4px", textAlign: "right" }}>
                      Rs.{advanceAmount}
                    </td>
                  </tr>
                  <tr style={{ fontSize: 10 }}>
                    <td colSpan="3" style={{ border: "1px solid black", padding: "4px" }}>
                      Remaining Payment
                    </td>
                    <td style={{ border: "1px solid black", padding: "4px", textAlign: "right" }}>
                      Rs.{(grandTotal - advanceAmount).toFixed(2)}
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </Table>

          <div style={{ fontSize: 10, marginTop: 10, border: "1px solid #ddd", }}>
            <p className="mb-1" style={{ fontWeight: 'bold', fontSize: 10, paddingTop: 2, paddingLeft: 10, paddingBottom: 2 }}>Terms and Conditions</p>
            <p className="mb-1" style={{ paddingLeft: 10, fontSize: 10 }}>* Please collect your goods within 90 days</p>
            <p className="mb-1" style={{ paddingLeft: 10, fontSize: 10 }}>* Orders once booked cannot be cancelled</p>
            <p className="mb-1" style={{ paddingLeft: 10, fontSize: 10 }}>* Once paid cannot be refunded</p>
          </div>
        </div>
      )}
    </>
  );
};

export default CashierInvoice;
