import React, { useEffect, useState, useRef } from 'react';
import { Card, Button, CardGroup, Row, Col, Table, Form, Tabs, Tab } from 'react-bootstrap';
import axios from 'axios';
import avatar1 from '../../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../../assets/images/user/avatar-3.jpg';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const typeofLense = [
  { id: 1, text: 'Distance only' },
  { id: 2, text: 'Reading only' },
  { id: 3, text: 'Bifocal' },
  { id: 4, text: 'Prograssive' }
];

const timepreiod = [
  { id: 1, text: ' Prescribe Spectacle' },
  { id: 2, text: 'Review in 3 Months' },
  { id: 3, text: 'Review in 6 Months' },
  { id: 4, text: 'Review in 1 Year' }
];

const OptometristOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [allOrdersRx, setAllOrdersRx] = useState([]);
  const scrollRef = useRef(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedccmid, setSelectedccmid] = useState(null);
  const [selectedcid, setSelectedcid] = useState(null);
  const [odsph, setodsph] = useState(0);
  const [odcyl, setodcyl] = useState(0);
  const [odaxis, setodaxis] = useState(0);
  const [odprism, setodprism] = useState(0);
  const [odbase, setodbase] = useState(0);
  const [odsva, setodsva] = useState(0);
  const [odnearfull, setodnearfull] = useState(0);
  const [odnearva, setodnearva] = useState(0);
  const [ossph, setossph] = useState(0);
  const [oscyl, setoscyl] = useState(0);
  const [osaxis, setosaxis] = useState(0);
  const [osprism, setosprism] = useState(0);
  const [osbase, setosbase] = useState(0);
  const [ossva, setossva] = useState(0);
  const [osnearfull, setosnearfull] = useState(0);
  const [osnearva, setosnearva] = useState(0);
  const [selectTypeofLense, setSelectTypeofLense] = useState('NULL');
  const [selectTimeP, setSelectTimeP] = useState('NULL');
  const [selectedOption, setSelectedOption] = useState('');
  const [remarkText, setRemarkText] = useState('');
  const today = new Date().toLocaleDateString();
  const [redtotsph, setredtotsph] = useState(0);
  const [redtotcyl, setredtotcyl] = useState(0);
  const [redtotaxis, setredtotaxis] = useState(0);
  const [redtotprism, setredtotprism] = useState(0);
  const [redtotbase, setredtotbase] = useState(0);
  const [redtotva, setredtotva] = useState(0);
  const [redtotossph, setredtotossph] = useState(0);
  const [redtotoscyl, setredtotoscyl] = useState(0);
  const [redtotosaxis, setredtotosaxis] = useState(0);
  const [redtotosprism, setredtotosprism] = useState(0);
  const [redtotosbase, setredtotosbase] = useState(0);
  const [redtotosva, setredtotosva] = useState(0);
  const [redtotundis, setredtotundis] = useState(0);
  const [redtotunnear, setredtotunnear] = useState(0);
  const [redtotosundis, setredtotosundis] = useState(0);
  const [redtotosunnear, setredtotosunnear] = useState(0);
  const [redtotpin, setredtotpin] = useState(0);
  const [redtotospin, setredtotospin] = useState(0);
  const [redtotiop, setredtotiop] = useState(0);
  const [redtotosiop, setredtotosiop] = useState(0);
  const [redtotredcol, setredtotredcol] = useState(0);
  const [redtotredcol2, setredtotredcol2] = useState(0);
  const [redtotredcolos, setredtotredcolos] = useState(0);
  const [redtotredcolos2, setredtotredcolos2] = useState(0);
  const [objodsph, setobjodsph] = useState(0);
  const [objodcyl, setobjodcyl] = useState(0);
  const [objodaxis, setobjodaxis] = useState(0);
  const [objodprism, setobjodprism] = useState(0);
  const [objodbase, setobjodbase] = useState(0);
  const [objodsva, setobjodsva] = useState(0);
  const [objodnearfull, setobjodnearfull] = useState(0);
  const [objodnearva, setobjodnearva] = useState(0);
  const [objossph, setobjossph] = useState(0);
  const [objoscyl, setobjoscyl] = useState(0);
  const [objosaxis, setobjosaxis] = useState(0);
  const [objosprism, setobjosprism] = useState(0);
  const [objosbase, setobjosbase] = useState(0);
  const [objossva, setobjossva] = useState(0);
  const [objosnearfull, setobjosnearfull] = useState(0);
  const [objosnearva, setobjosnearva] = useState(0);
  const [objRemark, setObjRemark] = useState('');
  const [odconsph, setodconsph] = useState(0);
  const [odconcyl, setodconcyl] = useState(0);
  const [odconaxis, setodconaxis] = useState(0);
  const [odconbcurve, setodconbcurve] = useState(0);
  const [odcondiam, setodcondiam] = useState(0);
  const [odconsva, setodconsva] = useState(0);
  const [odcondesign, setodcondesign] = useState(0);
  const [osconsph, setosconsph] = useState(0);
  const [osconcyl, setosconcyl] = useState(0);
  const [osconaxis, setosconaxis] = useState(0);
  const [osconbcurve, setosconbcurve] = useState(0);
  const [oscondiam, setoscondiam] = useState(0);
  const [osconsva, setosconsva] = useState(0);
  const [oscondesign, setoscondesign] = useState(0);
  const [conLenRemark, setConLenRemark] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:2776/api/customer/med/optometrist/order')
      .then((res) => {
        setAllOrders(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const scroll = (direction) => {
    const scrollAmount = 320; // Approx card width
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    if (e.target.value !== 'Remark') {
      setRemarkText(''); // Clear remark if another option is selected
    }
  };

  const handleCardClick = (order) => {
    setSelectedOrder(order);
    setSelectedccmid(order.cmd_id);
    setSelectedcid(order.c_id);
    console.log(order);
    const ob = {
      date: formatDate(order.date),
      ccmd_id: order.cmd_id,
      cid: order.cid
    };
    axios
      .post('http://localhost:2776/api/customer/med/rx/selected', ob)
      .then((res) => {
        console.log(res.data);
        setAllOrdersRx(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const completeOrder = async () => {
    try {
      const ob = {
        cmd_id: selectedccmid
      };
      console.log(ob)
      await axios.put(`http://localhost:2776/api/customer/med/status/${selectedccmid}`);
      console.log('All submissions completed successfully.');

      const obemail = {
        to: selectedOrder.email,
        subject: "A.A. Samarasinhage Optical Shop - Optometrist is Confirmed",
        message: `
                            Dear Customer,

                            Thank you for shopping with us!
                            Your order has been successfully confirmed.
                            We are now processing your order and will notify you once it's ready for pickup or delivery.
                            If you have any questions, feel free to contact our optical shop team.
                            
                            Best regards,
                            A.A. Samarasinhage Optical Shop
                          `
      };

      axios.post('http://localhost:2776/api/email/notify', obemail).then((res) => {
        console.log('Email Sent')
      }).catch((err) => {
        console.log('Email sent error')
      })

      toast('Order Completed!');
      navigate('/optometrist/orders/');
    } catch (error) {
      console.error('Error submitting med details:', error);
      toast.error('Failed to Complete the Order!');
    }
  };

  const submitContactLen = async () => {
    try {
      const date = formatDate(today);
      const createMedRxContactLen = (type, values) => ({
        date,
        cid: selectedcid,
        SPH: values.SPH,
        CYL: values.CYL,
        AXIS: values.AXIS,
        bcurve: values.bcurve,
        diam: values.diam,
        VA: values.VA,
        type_od_os: type,
        desgin: values.design,
        ccmd_id: selectedccmid
      });

      const od = createMedRxContactLen('OD', {
        SPH: odconsph,
        CYL: odconcyl,
        AXIS: odconaxis,
        bcurve: odconbcurve,
        diam: odcondiam,
        VA: odconsva,
        desgin: odcondesign
      });

      const os = createMedRxContactLen('OS', {
        SPH: osconsph,
        CYL: osconcyl,
        AXIS: osconaxis,
        bcurve: osconbcurve,
        diam: oscondiam,
        VA: osconsva,
        design: oscondesign
      });

      await axios.post('http://localhost:2776/api/opt/med/contact', od);
      await axios.post('http://localhost:2776/api/opt/med/contact', os);

      if (conLenRemark) {
        const ob = {
          date: date,
          remark: conLenRemark,
          cateogry: 'Contact Lenses',
          cid: selectedcid,
          ccmd_id: selectedccmid
        };
        await axios.post('http://localhost:2776/api/opt/med/remark', ob);
      }
      toast('Submitted!');
    } catch (error) {
      console.error('Error submitting med details:', error);
      toast.error('Failed to Submit!');
    }
  };

  const submitMedObjective = async () => {
    try {
      const date = formatDate(today);

      const createMedRxObjective = (type, values) => ({
        date,
        cid: selectedcid,
        SPH: values.SPH,
        CYL: values.CYL,
        AXIS: values.AXIS,
        Prim: values.Prim,
        Base: values.Base,
        VA: values.VA,
        type_od_os: type,
        type_near_full: values.type_near_full,
        type_near_va: values.type_near_va,
        ccmd_id: selectedccmid
      });

      const od = createMedRxObjective('OD', {
        SPH: objodsph,
        CYL: objodcyl,
        AXIS: objodaxis,
        Prim: objodprism,
        Base: objodbase,
        VA: objodsva,
        type_near_full: objodnearfull,
        type_near_va: objodnearva
      });

      const os = createMedRxObjective('OS', {
        SPH: objossph,
        CYL: objoscyl,
        AXIS: objosaxis,
        Prim: objosprism,
        Base: objosbase,
        VA: objossva,
        type_near_full: objosnearfull,
        type_near_va: objosnearva
      });
      await axios.post('http://localhost:2776/api/opt/med/objective', od);
      await axios.post('http://localhost:2776/api/opt/med/objective', os);

      if (objRemark) {
        const ob = {
          date: date,
          remark: objRemark,
          cateogry: 'Objective',
          cid: selectedcid,
          ccmd_id: selectedccmid
        };
        await axios.post('http://localhost:2776/api/opt/med/remark', ob);
      }
      toast('Submitted!');
      console.log('All submissions completed successfully.');
    } catch (error) {
      console.error('Error submitting med details:', error);
      toast.error('Failed to Submit!');
    }
  };

  const submitMedDeatils = async () => {
    try {
      const date = formatDate(today);

      const createMedRx = (type, values) => ({
        date,
        cid: selectedcid,
        SPH: values.SPH,
        CYL: values.CYL,
        AXIS: values.AXIS,
        Prim: values.Prim,
        Base: values.Base,
        VA: values.VA,
        type_od_os: type,
        type_near_full: values.type_near_full,
        type_near_va: values.type_near_va,
        ccmd_id: selectedccmid
      });

      const od = createMedRx('OD', {
        SPH: odsph,
        CYL: odcyl,
        AXIS: odaxis,
        Prim: odprism,
        Base: odbase,
        VA: odsva,
        type_near_full: odnearfull,
        type_near_va: odnearva
      });

      const os = createMedRx('OS', {
        SPH: ossph,
        CYL: oscyl,
        AXIS: osaxis,
        Prim: osprism,
        Base: osbase,
        VA: ossva,
        type_near_full: osnearfull,
        type_near_va: osnearva
      });

      // Step 1: Primary Rx
      await axios.post('http://localhost:2776/api/opt/med', od);
      await axios.post('http://localhost:2776/api/opt/med', os);

      // Step 2: Second Rx
      const secondRxOD = {
        date,
        SPH: redtotsph,
        CYL: redtotcyl,
        AXIS: redtotaxis,
        Prim: redtotprism,
        Base: redtotbase,
        VA: redtotva,
        cid: selectedcid,
        type_od_os: 'OD',
        ccmd_id: selectedccmid
      };

      const secondRxOS = {
        date,
        cid: selectedcid,
        SPH: redtotossph,
        CYL: redtotoscyl,
        AXIS: redtotosaxis,
        Prim: redtotosprism,
        Base: redtotosbase,
        VA: redtotosva,
        type_od_os: 'OS',
        ccmd_id: selectedccmid
      };

      await axios.post('http://localhost:2776/api/opt/med/second', secondRxOD);
      await axios.post('http://localhost:2776/api/opt/med/second', secondRxOS);

      // Step 3: Unpiiore
      const unpiioreOD = {
        date,
        un_distance: redtotundis,
        un_near: redtotunnear,
        pin: redtotpin,
        iop: redtotiop,
        re_col1: redtotredcol,
        re_col2: redtotredcolos,
        cid: selectedcid,
        type_od_os: 'OD',
        ccmd_id: selectedccmid
      };

      const unpiioreOS = {
        date,
        un_distance: redtotosundis,
        un_near: redtotosunnear,
        pin: redtotospin,
        iop: redtotosiop,
        re_col1: redtotredcol2,
        re_col2: redtotredcolos2,
        cid: selectedcid,
        type_od_os: 'OS',
        ccmd_id: selectedccmid
      };

      await axios.post('http://localhost:2776/api/opt/med/unpiiore', unpiioreOD);
      await axios.post('http://localhost:2776/api/opt/med/unpiiore', unpiioreOS);

      // Step 4: More Info
      const moreInfo = {
        date,
        more: selectedOption,
        time_period: selectTimeP,
        cid: selectedcid,
        type_od_lense: selectTypeofLense,
        ccmd_id: selectedccmid
      };

      await axios.post('http://localhost:2776/api/opt/med/more', moreInfo);

      console.log('All submissions completed successfully.');
      toast('Submitted!');
    } catch (error) {
      console.error('Error submitting med details:', error);
      toast.error('Failed to Submit!');
    }
  };

  return (
    <>
      <div style={{ position: 'relative' }}>
        <Button variant="light" onClick={() => scroll('left')} style={{ position: 'absolute', left: 0, top: '40%', zIndex: 10 }}>
          ◀
        </Button>

        <div
          ref={scrollRef}
          style={{
            display: 'flex',
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            gap: '1rem',
            padding: '1rem',
            margin: '0 2rem',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {allOrders.map((o, index) => (
            <Card
              key={index}
              onClick={() => handleCardClick(o)}
              style={{
                minWidth: '220px',
                flex: '0 0 auto',
                borderRadius: '15px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                marginBottom: '1rem',
                textAlign: 'center'
              }}
            >
              <Card.Img
                variant="top"
                style={{
                  width: 70,
                  height: 70,
                  objectFit: 'cover',
                  borderRadius: '50%',
                  margin: '10px auto 0 auto',
                  border: '2px solid #007bff',
                  padding: '2px'
                }}
                src={o.gender === 'male' ? avatar2 : o.gender === 'female' ? avatar3 : avatar1}
              />

              <Card.Body>
                <Card.Title style={{ fontSize: '0.9rem', color: '#6c757d' }}>#Token {o.cmd_id || 'ID'}</Card.Title>
                <Card.Title style={{ fontSize: '1.1rem', fontWeight: '600' }}>{o.name || 'Name'}</Card.Title>
                <Card.Text style={{ fontSize: '0.9rem' }}>
                  {o.email || 'N/A'} <br />
                  {o.mobile2 || o.telephone || 'N/A'}
                </Card.Text>
              </Card.Body>

              <Card.Footer style={{ fontSize: '0.8rem', backgroundColor: '#f8f9fa', borderTop: '1px solid #dee2e6' }}>
                <small className="text-muted">🕒 {formatDate(o.date)}</small>
              </Card.Footer>
            </Card>
          ))}
        </div>

        <Button variant="light" onClick={() => scroll('right')} style={{ position: 'absolute', right: 0, top: '40%', zIndex: 10 }}>
          ▶
        </Button>
      </div>

      {selectedOrder && (
        <Card
          style={{
            margin: '2rem',
            padding: '1rem',
            borderRadius: '5px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        >
          <Row>
            <h5 className="mb-4 text-primary" style={{ fontWeight: '600' }}>
              👤 Basic Information
            </h5>
            <Row className="mt-1">
              <Col md={3} className="mb-3">
                <small className="text-muted">Name</small>
                <h6 className="mb-0">{selectedOrder.name || 'N/A'}</h6>
              </Col>

              <Col md={3} className="mb-3">
                <small className="text-muted">Email</small>
                <h6 className="mb-0">{selectedOrder.email || 'N/A'}</h6>
              </Col>

              <Col md={3} className="mb-3">
                <small className="text-muted">Mobile</small>
                <h6 className="mb-0">{selectedOrder.mobile2 || selectedOrder.telephone || 'N/A'}</h6>
              </Col>

              <Col md={3} className="mb-3">
                <small className="text-muted">Address</small>
                <h6 className="mb-0">{selectedOrder.address || 'N/A'}</h6>
              </Col>
            </Row>

            <div className=" mt-4 rounded">
              <h5 className="mb-4 text-primary" style={{ fontWeight: '600' }}>
                🧑‍⚕️ Medical Report Information
              </h5>

              <Row>
                <Col md={3} className="mb-4">
                  <small className="text-muted d-block mb-1">Purpose of Visit</small>
                  <h6 className="mb-2">{selectedOrder.purpose_of_visit || 'N/A'}</h6>
                  <small className="text-muted d-block mb-1">Remarks</small>
                  <h6 className="mb-0">{selectedOrder.purpose_of_visit_remark || 'N/A'}</h6>
                  <small className="text-muted d-block mt-5 mb-1">Type of Lenses used</small>
                  <h6 className="mb-0">{selectedOrder.type_of_lenses_used || 'N/A'}</h6>
                </Col>

                <Col md={3} className="mb-4">
                  <small className="text-muted d-block mb-1">General Health</small>
                  <h6 className="mb-2">{selectedOrder.general_health || 'N/A'}</h6>
                  <small className="text-muted d-block mb-1">Remarks</small>
                  <h6 className="mb-2">{selectedOrder.general_health_remark || 'N/A'}</h6>
                  <small className="text-muted d-block mb-1">Allergies</small>
                  <h6 className="mb-2">{selectedOrder.general_health_allergies || 'N/A'}</h6>
                  <small className="text-muted d-block mb-1">Medication</small>
                  <h6 className="mb-0">{selectedOrder.general_health_medication || 'N/A'}</h6>
                </Col>

                <Col md={3} className="mb-4">
                  <small className="text-muted d-block mb-1">Occular Health</small>
                  <h6 className="mb-2">{selectedOrder.occular_health || 'N/A'}</h6>
                  <small className="text-muted d-block mb-1">Remarks</small>
                  <h6 className="mb-0">{selectedOrder.occular_health_remark || 'N/A'}</h6>
                </Col>

                <Col md={3} className="mb-4">
                  <small className="text-muted d-block mb-1">Symptoms</small>
                  <h6 className="mb-2">{selectedOrder.symptoms || 'N/A'}</h6>
                  <small className="text-muted d-block mb-1">Remarks</small>
                  <h6 className="mb-0">{selectedOrder.symptoms_remark || 'N/A'}</h6>
                </Col>
              </Row>
              <h6 className="m-2 text-success" style={{ fontWeight: '600' }}>
                Habitual Rx
              </h6>
              <Row>
                {allOrdersRx.map((r) => (
                  <Col md={6}>
                    {r.type_od_os == 'OD' ? (
                      <Table bordered hover responsive className="table-sm align-middle shadow-sm">
                        <thead className="bg-primary text-white text-center">
                          <tr>
                            <th></th>
                            <th colSpan="6">OD</th>
                          </tr>
                          <tr className="bg-light text-dark">
                            <th></th>
                            <th>SPH</th>
                            <th>CYL</th>
                            <th>AXIS</th>
                            <th>Prism</th>
                            <th>Base</th>
                            <th>VA</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="text-center">
                            <td className="fw-bold">Distance</td>
                            <td>
                              <Form.Group className="mb-0" controlId="formBasicFloat">
                                <Form.Control
                                  type="number"
                                  step="any"
                                  style={{
                                    border: 'none',
                                    width: '',
                                    padding: '4px 6px',
                                    textAlign: 'center'
                                  }}
                                  value={r.SPH}
                                />
                              </Form.Group>
                            </td>
                            <td>
                              <Form.Group className="mb-0" controlId="formBasicFloat">
                                <Form.Control
                                  type="number"
                                  step="any"
                                  style={{
                                    border: 'none',
                                    width: '',
                                    padding: '4px 6px',
                                    textAlign: 'center'
                                  }}
                                  value={r.CYL}
                                />
                              </Form.Group>
                            </td>
                            <td>
                              {' '}
                              <Form.Group className="mb-0" controlId="formBasicFloat">
                                <Form.Control
                                  type="number"
                                  step="any"
                                  style={{
                                    border: 'none',
                                    width: '',
                                    padding: '4px 6px',
                                    textAlign: 'center'
                                  }}
                                  value={r.AXIS}
                                />
                              </Form.Group>
                            </td>
                            <td>
                              {' '}
                              <Form.Group className="mb-0" controlId="formBasicFloat">
                                <Form.Control
                                  type="number"
                                  step="any"
                                  style={{
                                    border: 'none',
                                    width: '',
                                    padding: '4px 6px',
                                    textAlign: 'center'
                                  }}
                                  value={r.Prim}
                                />
                              </Form.Group>
                            </td>
                            <td>
                              {' '}
                              <Form.Group className="mb-0" controlId="formBasicFloat">
                                <Form.Control
                                  type="number"
                                  step="any"
                                  style={{
                                    border: 'none',
                                    width: '',
                                    padding: '4px 6px',
                                    textAlign: 'center'
                                  }}
                                  value={r.Base}
                                />
                              </Form.Group>
                            </td>
                            <td>
                              {' '}
                              <Form.Group className="mb-0" controlId="formBasicFloat">
                                <Form.Control
                                  type="number"
                                  step="any"
                                  style={{
                                    border: 'none',
                                    width: '',
                                    padding: '4px 6px',
                                    textAlign: 'center'
                                  }}
                                  value={r.VA}
                                />
                              </Form.Group>
                            </td>
                          </tr>
                          <tr className="text-center">
                            <td className="fw-bold">Near</td>
                            <td colSpan="5" className="bg-light">
                              <Form.Group className="mb-0" controlId="formBasicFloat">
                                <Form.Control
                                  type="text"
                                  step="any"
                                  style={{
                                    border: 'none',
                                    width: '',
                                    padding: '4px 6px',
                                    textAlign: 'center'
                                  }}
                                  value={r.type_near_full}
                                />
                              </Form.Group>
                            </td>
                            <td>
                              <Form.Group className="mb-0" controlId="formBasicFloat">
                                <Form.Control
                                  type="text"
                                  step="any"
                                  style={{
                                    border: 'none',
                                    width: '',
                                    padding: '4px 6px',
                                    textAlign: 'center'
                                  }}
                                  value={r.type_near_va}
                                />
                              </Form.Group>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    ) : r.type_od_os == 'OS' ? (
                      <Table bordered hover responsive className="table-sm align-middle shadow-sm">
                        <thead className="bg-primary text-white text-center">
                          <tr>
                            <th></th>
                            <th colSpan="6">OS</th>
                          </tr>
                          <tr className="bg-light text-dark">
                            <th></th>
                            <th>SPH</th>
                            <th>CYL</th>
                            <th>AXIS</th>
                            <th>Prism</th>
                            <th>Base</th>
                            <th>VA</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="text-center">
                            <td className="fw-bold">Distance</td>
                            <td>
                              <Form.Group className="mb-0" controlId="formBasicFloat">
                                <Form.Control
                                  type="number"
                                  step="any"
                                  style={{
                                    border: 'none',
                                    width: '',
                                    padding: '4px 6px',
                                    textAlign: 'center'
                                  }}
                                  value={r.SPH}
                                />
                              </Form.Group>
                            </td>
                            <td>
                              <Form.Group className="mb-0" controlId="formBasicFloat">
                                <Form.Control
                                  type="number"
                                  step="any"
                                  style={{
                                    border: 'none',
                                    width: '',
                                    padding: '4px 6px',
                                    textAlign: 'center'
                                  }}
                                  value={r.CYL}
                                />
                              </Form.Group>
                            </td>
                            <td>
                              {' '}
                              <Form.Group className="mb-0" controlId="formBasicFloat">
                                <Form.Control
                                  type="number"
                                  step="any"
                                  style={{
                                    border: 'none',
                                    width: '',
                                    padding: '4px 6px',
                                    textAlign: 'center'
                                  }}
                                  value={r.AXIS}
                                />
                              </Form.Group>
                            </td>
                            <td>
                              {' '}
                              <Form.Group className="mb-0" controlId="formBasicFloat">
                                <Form.Control
                                  type="number"
                                  step="any"
                                  style={{
                                    border: 'none',
                                    width: '',
                                    padding: '4px 6px',
                                    textAlign: 'center'
                                  }}
                                  value={r.Prim}
                                />
                              </Form.Group>
                            </td>
                            <td>
                              {' '}
                              <Form.Group className="mb-0" controlId="formBasicFloat">
                                <Form.Control
                                  type="number"
                                  step="any"
                                  style={{
                                    border: 'none',
                                    width: '',
                                    padding: '4px 6px',
                                    textAlign: 'center'
                                  }}
                                  value={r.Base}
                                />
                              </Form.Group>
                            </td>
                            <td>
                              {' '}
                              <Form.Group className="mb-0" controlId="formBasicFloat">
                                <Form.Control
                                  type="number"
                                  step="any"
                                  style={{
                                    border: 'none',
                                    width: '',
                                    padding: '4px 6px',
                                    textAlign: 'center'
                                  }}
                                  value={r.VA}
                                />
                              </Form.Group>
                            </td>
                          </tr>
                          <tr className="text-center">
                            <td className="fw-bold">Near</td>
                            <td colSpan="5" className="bg-light">
                              <Form.Group className="mb-0" controlId="formBasicFloat">
                                <Form.Control
                                  type="text"
                                  step="any"
                                  style={{
                                    border: 'none',
                                    width: '',
                                    padding: '4px 6px',
                                    textAlign: 'center'
                                  }}
                                  value={r.type_near_full}
                                />
                              </Form.Group>
                            </td>
                            <td>
                              <Form.Group className="mb-0" controlId="formBasicFloat">
                                <Form.Control
                                  type="text"
                                  step="any"
                                  style={{
                                    border: 'none',
                                    width: '',
                                    padding: '4px 6px',
                                    textAlign: 'center'
                                  }}
                                  value={r.type_near_va}
                                />
                              </Form.Group>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    ) : null}
                  </Col>
                ))}
              </Row>

              <h6 className="mt-4 text-success" style={{ fontWeight: '600' }}>
                Optometrist Informations
              </h6>

              <Row className="mt-2">
                <Tabs
                  variant="pills"
                  defaultActiveKey="home"
                //   onSelect={(key) => {
                //     if (key === 'history') {
                //       submitHistory();
                //     }
                //   }}
                >
                  <Tab eventKey="home" title="Subjective">
                    <h6 className="fw-bold mb-3">Rx For Spectacles </h6>
                    <Row>
                      <Col md={6}>
                        <Table bordered hover responsive className="table-sm align-middle shadow-sm">
                          <thead className="bg-primary text-white text-center">
                            <tr>
                              <th></th>
                              <th colSpan="6">OD</th>
                            </tr>
                            <tr className="bg-light text-dark">
                              <th></th>
                              <th>SPH</th>
                              <th>CYL</th>
                              <th>AXIS</th>
                              <th>Prism</th>
                              <th>Base</th>
                              <th>VA</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="text-center">
                              <td className="fw-bold">Distance</td>
                              <td>
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="number"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    onChange={(e) => setodsph(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                              <td>
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="number"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    onChange={(e) => setodcyl(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                              <td>
                                {' '}
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="number"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    onChange={(e) => setodaxis(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                              <td>
                                {' '}
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="number"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    onChange={(e) => setodprism(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                              <td>
                                {' '}
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="number"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    onChange={(e) => setodbase(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                              <td>
                                {' '}
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="number"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    onChange={(e) => setodsva(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                            </tr>
                            <tr className="text-center">
                              <td className="fw-bold">Near</td>
                              <td colSpan="5" className="bg-light">
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="text"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    onChange={(e) => setodnearfull(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                              <td>
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="text"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    onChange={(e) => setodnearva(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </Col>
                      <Col md={6}>
                        <Table bordered hover responsive className="table-sm align-middle shadow-sm">
                          <thead className="bg-primary text-white text-center">
                            <tr>
                              <th></th>
                              <th colSpan="6">OS</th>
                            </tr>
                            <tr className="bg-light text-dark">
                              <th></th>
                              <th>SPH</th>
                              <th>CYL</th>
                              <th>AXIS</th>
                              <th>Prism</th>
                              <th>Base</th>
                              <th>VA</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="text-center">
                              <td className="fw-bold">Distance</td>
                              <td>
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="number"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    onChange={(e) => setossph(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                              <td>
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="number"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    onChange={(e) => setoscyl(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                              <td>
                                {' '}
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="number"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    onChange={(e) => setosaxis(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                              <td>
                                {' '}
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="number"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    onChange={(e) => setosprism(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                              <td>
                                {' '}
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="number"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    onChange={(e) => setosbase(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                              <td>
                                {' '}
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="number"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    onChange={(e) => setossva(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                            </tr>
                            <tr className="text-center">
                              <td className="fw-bold">Near</td>
                              <td colSpan="5" className="bg-light">
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="text"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    onChange={(e) => setosnearfull(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                              <td>
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="text"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    onChange={(e) => setosnearva(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </Col>
                    </Row>
                    <Row>
                      <h6 style={{ fontWeight: '600', marginTop: 10 }}>Reading Total</h6>
                      <Col md={6}>
                        <Table bordered hover responsive className="table-sm align-middle shadow-sm">
                          <thead className="bg-primary text-white text-center">
                            <tr>
                              <th colSpan={6}>OD</th>
                            </tr>
                            <tr>
                              <th>SPH</th>
                              <th>CYL</th>
                              <th>AXIS</th>
                              <th>Prism</th>
                              <th>Base</th>
                              <th>VA</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="text-center">
                              <td>
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="text"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    onChange={(e) => setredtotsph(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                              <td>
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="text"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    onChange={(e) => setredtotcyl(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                              <td>
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="text"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    onChange={(e) => setredtotaxis(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                              <td>
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="text"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    onChange={(e) => setredtotprism(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                              <td>
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="text"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    onChange={(e) => setredtotbase(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                              <td>
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="text"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    onChange={(e) => setredtotva(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </Col>
                      <Col md={6}>
                        <Table bordered hover responsive className="table-sm align-middle shadow-sm">
                          <thead className="bg-primary text-white text-center">
                            <tr>
                              <th colSpan={6}>OS</th>
                            </tr>
                            <tr>
                              <th>SPH</th>
                              <th>CYL</th>
                              <th>AXIS</th>
                              <th>Prism</th>
                              <th>Base</th>
                              <th>VA</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="text-center">
                              <td>
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="text"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    onChange={(e) => setredtotossph(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                              <td>
                                {' '}
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="text"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    onChange={(e) => setredtotoscyl(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                              <td>
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="text"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    onChange={(e) => setredtotosaxis(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                              <td>
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="text"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    onChange={(e) => setredtotosprism(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                              <td>
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="text"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    onChange={(e) => setredtotosbase(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                              <td>
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="text"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    onChange={(e) => setredtotosva(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col md={4}>
                        <Table bordered hover responsive className="table-sm align-middle shadow-sm">
                          <thead className="bg-primary text-white text-center">
                            <tr>
                              <th colSpan={3}>Unaided Vision</th>
                            </tr>
                            <tr>
                              <th></th>
                              <th>Distance</th>
                              <th>Near</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>OD</td>
                              <td>
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="text"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    onChange={(e) => setredtotundis(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                              <td>
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="text"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    onChange={(e) => setredtotunnear(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                            </tr>
                            <tr>
                              <td>OS</td>
                              <td>
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="text"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    onChange={(e) => setredtotosundis(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                              <td>
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="text"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    onChange={(e) => setredtotosunnear(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </Col>
                      <Col md={2}>
                        <Table bordered hover responsive className="table-sm align-middle shadow-sm">
                          <thead className="bg-primary text-white text-center">
                            <tr>
                              <th colSpan={2}>Pinholevision</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>OD</td>
                              <td>
                                {' '}
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="text"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    onChange={(e) => setredtotpin(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                            </tr>
                            <tr>
                              <td>OS</td>
                              <td>
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="text"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    onChange={(e) => setredtotospin(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </Col>
                      <Col md={2}>
                        <Table bordered hover responsive className="table-sm align-middle shadow-sm">
                          <thead className="bg-primary text-white text-center">
                            <tr>
                              <th colSpan={2}>IOP</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>OD</td>
                              <td>
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="text"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    onChange={(e) => setredtotiop(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                            </tr>
                            <tr>
                              <td>OS</td>
                              <td>
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="text"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    onChange={(e) => setredtotosiop(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </Col>
                      <Col md={4}>
                        <Table bordered hover responsive className="table-sm align-middle shadow-sm">
                          <thead className="bg-primary text-white text-center">
                            <tr>
                              <th colSpan={3}>Reading</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>OD</td>
                              <td>
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="text"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    onChange={(e) => setredtotredcol(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                              <td>
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="text"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    onChange={(e) => setredtotredcol2(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                            </tr>
                            <tr>
                              <td>OS</td>
                              <td>
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="text"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    onChange={(e) => setredtotredcolos(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                              <td>
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="text"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    onChange={(e) => setredtotredcolos2(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={4}>
                        <h6 className="mt-4 fw-bold mb-4">Type of Lenses Used</h6>
                        <Form.Group className="mb-3">
                          {typeofLense.map((t) => (
                            <Form.Check
                              key={t.id}
                              type="radio"
                              label={t.text}
                              id={`radio-${t.text}`}
                              value={t.text}
                              className="custom-radio"
                              onChange={(e) => setSelectTypeofLense(e.target.value)}
                            />
                          ))}
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <h6 className="mt-4 fw-bold mb-4">Time Period</h6>
                        <Form.Group className="mb-3">
                          {timepreiod.map((t) => (
                            <Form.Check
                              key={t.id}
                              type="radio"
                              label={t.text}
                              id={`radio-${t.text}`}
                              value={t.text}
                              className="custom-radio"
                              onChange={(e) => setSelectTimeP(e.target.value)}
                            />
                          ))}
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <h6 className="mt-4 fw-bold mb-4">More</h6>
                        <Form.Group className="mb-3">
                          <Form.Check
                            type="radio"
                            label="Refer to an ophthalmologist"
                            id="1"
                            value="Refer to an ophthalmologist"
                            checked={selectedOption === 'Refer to an ophthalmologist'}
                            onChange={handleOptionChange}
                          />
                          <Form.Check
                            type="radio"
                            label="Retest"
                            id="2"
                            value="Retest"
                            checked={selectedOption === 'Retest'}
                            onChange={handleOptionChange}
                          />
                          <Form.Check
                            type="radio"
                            label="Remark"
                            id="3"
                            value="Remark"
                            checked={selectedOption === 'Remark'}
                            onChange={handleOptionChange}
                          />

                          {/* Only show this if "Remark" is selected */}
                          {selectedOption === 'Remark' && (
                            <Form.Control
                              className="mt-2"
                              type="text"
                              placeholder="Enter your remark"
                              value={remarkText}
                              onChange={(e) => setRemarkText(e.target.value)}
                            />
                          )}
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Button variant="outline-primary" size="sm" className="mt-3" onClick={submitMedDeatils}>
                          Submit
                        </Button>
                      </Col>
                    </Row>
                  </Tab>
                  <Tab eventKey="objective" title="Objective">
                    <Row>
                      <Col md={6}>
                        <Table bordered hover responsive className="table-sm align-middle shadow-sm">
                          <thead className="bg-primary text-white text-center">
                            <tr>
                              <th></th>
                              <th colSpan="6">OS</th>
                            </tr>
                            <tr className="bg-light text-dark">
                              <th></th>
                              <th>SPH</th>
                              <th>CYL</th>
                              <th>AXIS</th>
                              <th>Prism</th>
                              <th>Base</th>
                              <th>VA</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="text-center">
                              <td className="fw-bold">Distance</td>
                              <td>
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="number"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    onChange={(e) => setobjodsph(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                              <td>
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="number"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    onChange={(e) => setobjodcyl(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                              <td>
                                {' '}
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="number"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    onChange={(e) => setobjodaxis(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                              <td>
                                {' '}
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="number"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    onChange={(e) => setobjodprism(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                              <td>
                                {' '}
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="number"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    onChange={(e) => setobjodbase(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                              <td>
                                {' '}
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="number"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    onChange={(e) => setobjodsva(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                            </tr>
                            <tr className="text-center">
                              <td className="fw-bold">Near</td>
                              <td colSpan="5" className="bg-light">
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="text"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    onChange={(e) => setobjodnearfull(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                              <td>
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="text"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    onChange={(e) => setobjodnearva(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </Col>
                      <Col md={6}>
                        <Table bordered hover responsive className="table-sm align-middle shadow-sm">
                          <thead className="bg-primary text-white text-center">
                            <tr>
                              <th></th>
                              <th colSpan="6">OS</th>
                            </tr>
                            <tr className="bg-light text-dark">
                              <th></th>
                              <th>SPH</th>
                              <th>CYL</th>
                              <th>AXIS</th>
                              <th>Prism</th>
                              <th>Base</th>
                              <th>VA</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="text-center">
                              <td className="fw-bold">Distance</td>
                              <td>
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="number"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    onChange={(e) => setobjossph(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                              <td>
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="number"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    onChange={(e) => setobjoscyl(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                              <td>
                                {' '}
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="number"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    onChange={(e) => setobjosaxis(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                              <td>
                                {' '}
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="number"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    onChange={(e) => setobjosprism(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                              <td>
                                {' '}
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="number"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    onChange={(e) => setobjosbase(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                              <td>
                                {' '}
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="number"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    onChange={(e) => setobjossva(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                            </tr>
                            <tr className="text-center">
                              <td className="fw-bold">Near</td>
                              <td colSpan="5" className="bg-light">
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="text"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    onChange={(e) => setobjosnearfull(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                              <td>
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="text"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    onChange={(e) => setobjosnearva(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </Col>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Remarks</Form.Label>
                        <Form.Control as="textarea" rows="3" onChange={(e) => setObjRemark(e.target.value)} />
                      </Form.Group>
                    </Row>

                    <Row>
                      <Col>
                        <Button variant="outline-primary" size="sm" className="mt-3" onClick={submitMedObjective}>
                          Submit
                        </Button>
                      </Col>
                    </Row>
                  </Tab>
                  <Tab eventKey="contact_lenses" title="Contact Lenses">
                    <Table bordered hover responsive className="table-sm align-middle shadow-sm">
                      <thead className="bg-primary text-white text-center">
                        <tr>
                          <th></th>
                          <th>SPH</th>
                          <th>CYL</th>
                          <th>AXIS</th>
                          <th></th>
                          <th>VA</th>
                          <th>B.Curve</th>
                          <th>Diam.</th>
                          <th>Design</th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        <tr>
                          <td>OD</td>
                          <td>
                            <Form.Group className="mb-0" controlId="formBasicFloat">
                              <Form.Control
                                type="text"
                                step="any"
                                style={{
                                  border: 'none',
                                  width: '',
                                  padding: '4px 6px',
                                  textAlign: 'center'
                                }}
                                onChange={(e) => setodconsph(e.target.value)}
                              />
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group className="mb-0" controlId="formBasicFloat">
                              <Form.Control
                                type="text"
                                step="any"
                                style={{
                                  border: 'none',
                                  width: '',
                                  padding: '4px 6px',
                                  textAlign: 'center'
                                }}
                                onChange={(e) => setodconcyl(e.target.value)}
                              />
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group className="mb-0" controlId="formBasicFloat">
                              <Form.Control
                                type="text"
                                step="any"
                                style={{
                                  border: 'none',
                                  width: '',
                                  padding: '4px 6px',
                                  textAlign: 'center'
                                }}
                                onChange={(e) => setodconaxis(e.target.value)}
                              />
                            </Form.Group>
                          </td>
                          <td></td>
                          <td>
                            <Form.Group className="mb-0" controlId="formBasicFloat">
                              <Form.Control
                                type="text"
                                step="any"
                                style={{
                                  border: 'none',
                                  width: '',
                                  padding: '4px 6px',
                                  textAlign: 'center'
                                }}
                                onChange={(e) => setodconsva(e.target.value)}
                              />
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group className="mb-0" controlId="formBasicFloat">
                              <Form.Control
                                type="text"
                                step="any"
                                style={{
                                  border: 'none',
                                  width: '',
                                  padding: '4px 6px',
                                  textAlign: 'center'
                                }}
                                onChange={(e) => setodconbcurve(e.target.value)}
                              />
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group className="mb-0" controlId="formBasicFloat">
                              <Form.Control
                                type="text"
                                step="any"
                                style={{
                                  border: 'none',
                                  width: '',
                                  padding: '4px 6px',
                                  textAlign: 'center'
                                }}
                                onChange={(e) => setodcondiam(e.target.value)}
                              />
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group className="mb-0" controlId="formBasicFloat">
                              <Form.Control
                                type="text"
                                step="any"
                                style={{
                                  border: 'none',
                                  width: '',
                                  padding: '4px 6px',
                                  textAlign: 'center'
                                }}
                                onChange={(e) => setodcondesign(e.target.value)}
                              />
                            </Form.Group>
                          </td>
                        </tr>
                        <tr>
                          <td>OS</td>
                          <td>
                            <Form.Group className="mb-0" controlId="formBasicFloat">
                              <Form.Control
                                type="text"
                                step="any"
                                style={{
                                  border: 'none',
                                  width: '',
                                  padding: '4px 6px',
                                  textAlign: 'center'
                                }}
                                onChange={(e) => setosconsph(e.target.value)}
                              />
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group className="mb-0" controlId="formBasicFloat">
                              <Form.Control
                                type="text"
                                step="any"
                                style={{
                                  border: 'none',
                                  width: '',
                                  padding: '4px 6px',
                                  textAlign: 'center'
                                }}
                                onChange={(e) => setosconcyl(e.target.value)}
                              />
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group className="mb-0" controlId="formBasicFloat">
                              <Form.Control
                                type="text"
                                step="any"
                                style={{
                                  border: 'none',
                                  width: '',
                                  padding: '4px 6px',
                                  textAlign: 'center'
                                }}
                                onChange={(e) => setosconaxis(e.target.value)}
                              />
                            </Form.Group>
                          </td>
                          <td></td>
                          <td>
                            <Form.Group className="mb-0" controlId="formBasicFloat">
                              <Form.Control
                                type="text"
                                step="any"
                                style={{
                                  border: 'none',
                                  width: '',
                                  padding: '4px 6px',
                                  textAlign: 'center'
                                }}
                                onChange={(e) => setosconsva(e.target.value)}
                              />
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group className="mb-0" controlId="formBasicFloat">
                              <Form.Control
                                type="text"
                                step="any"
                                style={{
                                  border: 'none',
                                  width: '',
                                  padding: '4px 6px',
                                  textAlign: 'center'
                                }}
                                onChange={(e) => setosconbcurve(e.target.value)}
                              />
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group className="mb-0" controlId="formBasicFloat">
                              <Form.Control
                                type="text"
                                step="any"
                                style={{
                                  border: 'none',
                                  width: '',
                                  padding: '4px 6px',
                                  textAlign: 'center'
                                }}
                                onChange={(e) => setoscondiam(e.target.value)}
                              />
                            </Form.Group>
                          </td>
                          <td>
                            <Form.Group className="mb-0" controlId="formBasicFloat">
                              <Form.Control
                                type="text"
                                step="any"
                                style={{
                                  border: 'none',
                                  width: '',
                                  padding: '4px 6px',
                                  textAlign: 'center'
                                }}
                                onChange={(e) => setoscondesign(e.target.value)}
                              />
                            </Form.Group>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Remarks</Form.Label>
                      <Form.Control as="textarea" rows="3" onChange={(e) => setConLenRemark(e.target.value)} />
                    </Form.Group>

                    <Row>
                      <Col>
                        <Button variant="outline-primary" size="sm" className="mt-3" onClick={submitContactLen}>
                          Submit
                        </Button>
                      </Col>
                    </Row>
                  </Tab>
                </Tabs>
              </Row>
            </div>
          </Row>
          <Row>
            <Col md={10}></Col>
            <Col md={2}>
              <Button variant="outline-secondary" size="sm" className="mt-3" onClick={completeOrder}>
                Complete
              </Button>
            </Col>
          </Row>
        </Card>
      )}
    </>
  );
};

export default OptometristOrders;
