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

const RootAdminDashboard = () => {
  const [allOrders, setAllOrders] = useState([]);
  const scrollRef = useRef(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedccmid, setSelectedccmid] = useState(null);
  const [selectedcid, setSelectedcid] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const today = new Date().toLocaleDateString();
  const navigate = useNavigate();
  const [HABI_OD_SPH, set_HABI_OD_SPH] = useState('');
  const [HABI_OD_CYL, set_HABI_OD_CYL] = useState('');
  const [HABI_OD_AXIS, set_HABI_OD_AXIS] = useState('');
  const [HABI_OD_Prim, set_HABI_OD_Prim] = useState('');
  const [HABI_OD_Base, set_HABI_OD_Base] = useState('');
  const [HABI_OD_VA, set_HABI_OD_VA] = useState('');
  const [HABI_OD_type_near_full, set_HABI_OD_type_near_full] = useState('');
  const [HABI_OD_type_near_va, set_HABI_OD_type_near_va] = useState('');
  const [HABI_OS_SPH, set_HABI_OS_SPH] = useState('');
  const [HABI_OS_CYL, set_HABI_OS_CYL] = useState('');
  const [HABI_OS_AXIS, set_HABI_OS_AXIS] = useState('');
  const [HABI_OS_Prim, set_HABI_OS_Prim] = useState('');
  const [HABI_OS_Base, set_HABI_OS_Base] = useState('');
  const [HABI_OS_VA, set_HABI_OS_VA] = useState('');
  const [HABI_OS_type_near_full, set_HABI_OS_type_near_full] = useState('');
  const [HABI_OS_type_near_va, set_HABI_OS_type_near_va] = useState('');
  const [SPEC_OD_SPH, set_SPEC_OD_SPH] = useState('');
  const [SPEC_OD_CYL, set_SPEC_OD_CYL] = useState('');
  const [SPEC_OD_AXIS, set_SPEC_OD_AXIS] = useState('');
  const [SPEC_OD_Prism, set_SPEC_OD_Prim] = useState('');
  const [SPEC_OD_Base, set_SPEC_OD_Base] = useState('');
  const [SPEC_OD_VA, set_SPEC_OD_VA] = useState('');
  const [SPEC_OD_near_full, set_SPEC_OD_type_near_full] = useState('');
  const [SPEC_OD_near_va, set_SPEC_OD_type_near_va] = useState('');
  const [SPEC_OS_SPH, set_SPEC_OS_SPH] = useState('');
  const [SPEC_OS_CYL, set_SPEC_OS_CYL] = useState('');
  const [SPEC_OS_AXIS, set_SPEC_OS_AXIS] = useState('');
  const [SPEC_OS_Prism, set_SPEC_OS_Prim] = useState('');
  const [SPEC_OS_Base, set_SPEC_OS_Base] = useState('');
  const [SPEC_OS_VA, set_SPEC_OS_VA] = useState('');
  const [SPEC_OS_near_full, set_SPEC_OS_type_near_full] = useState('');
  const [SPEC_OS_near_va, set_SPEC_OS_type_near_va] = useState('');
  const [SPEC_Pro_Add, set_SPEC_Pro_Add] = useState('');
  const [SPEC_RE_OD_SPH, set_SPEC_RE_OD_SPH] = useState('');
  const [SPEC_RE_OD_CYL, set_SPEC_RE_OD_CYL] = useState('');
  const [SPEC_RE_OD_AXIS, set_SPEC_RE_OD_AXIS] = useState('');
  const [SPEC_RE_OD_Prism, set_SPEC_RE_OD_Prism] = useState('');
  const [SPEC_RE_OD_Base, set_SPEC_RE_OD_Base] = useState('');
  const [SPEC_RE_OD_VA, set_SPEC_RE_OD_VA] = useState('');
  const [SPEC_RE_OS_SPH, set_SPEC_RE_OS_SPH] = useState('');
  const [SPEC_RE_OS_CYL, set_SPEC_RE_OS_CYL] = useState('');
  const [SPEC_RE_OS_AXIS, set_SPEC_RE_OS_AXIS] = useState('');
  const [SPEC_RE_OS_Prism, set_SPEC_RE_OS_Prism] = useState('');
  const [SPEC_RE_OS_Base, set_SPEC_RE_OS_Base] = useState('');
  const [SPEC_RE_OS_VA, set_SPEC_RE_OS_VA] = useState('');
  const [SPEC_UNA_DIS_OD, set_SPEC_UNA_DIS_OD] = useState('');
  const [SPEC_UNA_NEAR_OD, set_SPEC_UNA_NEAR_OD] = useState('');
  const [SPEC_UNA_DIS_OS, set_SPEC_UNA_DIS_OS] = useState('');
  const [SPEC_UNA_NEAR_OS, set_SPEC_UNA_NEAR_OS] = useState('');
  const [SPEC_Pin_OD, set_SPEC_Pin_OD] = useState('');
  const [SPEC_Pin_OS, set_SPEC_Pin_OS] = useState('');
  const [SPEC_IOP_OD, set_SPEC_IOP_OD] = useState('');
  const [SPEC_IOP_OS, set_SPEC_IOP_OS] = useState('');
  const [SPEC_RED_OD_O, set_SPEC_RED_OD_O] = useState('');
  const [SPEC_RED_OD_T, set_SPEC_RED_OD_T] = useState('');
  const [SPEC_RED_OS_O, set_SPEC_RED_OS_O] = useState('');
  const [SPEC_RED_OS_T, set_SPEC_RED_OS_T] = useState('');
  const [SPEC_Type_Of_lenses_Used, set_SPEC_Type_Of_lenses_Used] = useState('');
  const [SPEC_Time_Period, set_SPEC_Time_Period] = useState('');
  const [SPEC_Time_More, set_SPEC_Time_More] = useState('');
  const [SPEC_remark, set_SPEC_remark] = useState('');
  const [SPECOB_OD_SPH, set_SPECOB_OD_SPH] = useState('');
  const [SPECOB_OD_CYL, set_SPECOB_OD_CYL] = useState('');
  const [SPECOB_OD_AXIS, set_SPECOB_OD_AXIS] = useState('');
  const [SPECOB_OD_Prism, set_SPECOB_OD_Prim] = useState('');
  const [SPECOB_OD_Base, set_SPECOB_OD_Base] = useState('');
  const [SPECOB_OD_VA, set_SPECOB_OD_VA] = useState('');
  const [SPECOB_OD_near_full, set_SPECOB_OD_type_near_full] = useState('');
  const [SPECOB_OD_near_va, set_SPECOB_OD_type_near_va] = useState('');
  const [SPECOB_OS_SPH, set_SPECOB_OS_SPH] = useState('');
  const [SPECOB_OS_CYL, set_SPECOB_OS_CYL] = useState('');
  const [SPECOB_OS_AXIS, set_SPECOB_OS_AXIS] = useState('');
  const [SPECOB_OS_Prism, set_SPECOB_OS_Prim] = useState('');
  const [SPECOB_OS_Base, set_SPECOB_OS_Base] = useState('');
  const [SPECOB_OS_VA, set_SPECOB_OS_VA] = useState('');
  const [SPECOB_OS_near_full, set_SPECOB_OS_type_near_full] = useState('');
  const [SPECOB_OS_near_va, set_SPECOB_OS_type_near_va] = useState('');
  const [SPECOB_remark, set_SPECOB_remark] = useState('');
  const [SPECCON_OD_SPH, set_SPECCON_OD_SPH] = useState('');
  const [SPECCON_OD_CYL, set_SPECCON_OD_CYL] = useState('');
  const [SPECCON_OD_AXIS, set_SPECCON_OD_AXIS] = useState('');
  const [SPECCON_OD_VA, set_SPECCON_OD_VA] = useState('');
  const [SPECCON_OD_B_Curve, set_SPECCON_OD_B_Curve] = useState('');
  const [SPECCON_OD_Diam, set_SPECCON_OD_Diam] = useState('');
  const [SPECCON_OD_Design, set_SPECCON_OD_Design] = useState('');
  const [SPECCON_OS_SPH, set_SPECCON_OS_SPH] = useState('');
  const [SPECCON_OS_CYL, set_SPECCON_OS_CYL] = useState('');
  const [SPECCON_OS_AXIS, set_SPECCON_OS_AXIS] = useState('');
  const [SPECCON_OS_VA, set_SPECCON_OS_VA] = useState('');
  const [SPECCON_OS_B_Curve, set_SPECCON_OS_B_Curve] = useState('');
  const [SPECCON_OS_Diam, set_SPECCON_OS_Diam] = useState('');
  const [SPECCON_OS_Design, set_SPECCON_OS_Design] = useState('');
  const [SPECCON_remark, set_SPECCON_Remark] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);


  // When user selects files
  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  useEffect(() => {
    axios
      .get('http://localhost:2776/api/order')
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
    set_SPEC_Time_More(e.target.value);
  };

  const handleCardClick = (order) => {
    setSelectedOrder(order);
    set_HABI_OD_SPH(order.HABI_OD_SPH)
    set_HABI_OD_CYL(order.HABI_OD_CYL)
    set_HABI_OD_AXIS(order.HABI_OD_AXIS)
    set_HABI_OD_Prim(order.HABI_OD_Prim)
    set_HABI_OD_Base(order.HABI_OD_Base)
    set_HABI_OD_VA(order.HABI_OD_VA)
    set_HABI_OD_type_near_full(order.HABI_OD_type_near_full)
    set_HABI_OD_type_near_va(order.HABI_OD_type_near_va)
    set_HABI_OS_SPH(order.HABI_OS_SPH)
    set_HABI_OS_CYL(order.HABI_OS_CYL)
    set_HABI_OS_AXIS(order.HABI_OS_AXIS)
    set_HABI_OS_Prim(order.HABI_OS_Prim)
    set_HABI_OS_Base(order.HABI_OS_Base)
    set_HABI_OS_VA(order.HABI_OS_VA)
    set_HABI_OS_type_near_full(order.HABI_OS_type_near_full)
    set_HABI_OS_type_near_va(order.HABI_OS_type_near_va)
    setSelectedccmid(order.cmd_id);
    setSelectedcid(order.c_id);
    console.log(order);

    axios.get(`http://localhost:2776/api/order/submit/${order.cmd_id}`).then((res) => {
      console.log(res.data)
      set_SPEC_OD_SPH(res.data.SPEC_OD_SPH)
      set_SPEC_OD_CYL(res.data.SPEC_OD_CYL)
      set_SPEC_OD_AXIS(res.data.SPEC_OD_AXIS)
      set_SPEC_OD_Prim(res.data.SPEC_OD_Prism)
      set_SPEC_OD_Base(res.data.SPEC_OD_Base)
      set_SPEC_OD_VA(res.data.SPEC_OD_VA)
      set_SPEC_OD_type_near_full(res.data.SPEC_OD_near_full)
      set_SPEC_OD_type_near_va(res.data.SPEC_OD_near_va)
      set_SPEC_OS_SPH(res.data.SPEC_OS_SPH)
      set_SPEC_OS_CYL(res.data.SPEC_OS_CYL)
      set_SPEC_OS_AXIS(res.data.SPEC_OS_AXIS)
      set_SPEC_OS_Prim(res.data.SPEC_OS_Prism)
      set_SPEC_OS_Base(res.data.SPEC_OS_Base)
      set_SPEC_OS_VA(res.data.SPEC_OS_VA)
      set_SPEC_OS_type_near_full(res.data.SPEC_OS_near_full)
      set_SPEC_OS_type_near_va(res.data.SPEC_OS_near_va)
      set_SPEC_Pro_Add(res.data.SPEC_Pro_Add)
      set_SPEC_RE_OD_SPH(res.data.SPEC_RE_OD_SPH)
      set_SPEC_RE_OD_CYL(res.data.SPEC_RE_OD_CYL)
      set_SPEC_RE_OD_AXIS(res.data.SPEC_RE_OD_AXIS)
      set_SPEC_RE_OD_Prism(res.data.SPEC_RE_OD_Prism)
      set_SPEC_RE_OD_Base(res.data.SPEC_RE_OD_Base)
      set_SPEC_RE_OD_VA(res.data.SPEC_RE_OD_VA)
      set_SPEC_RE_OS_SPH(res.data.SPEC_RE_OS_SPH)
      set_SPEC_RE_OS_CYL(res.data.SPEC_RE_OS_CYL)
      set_SPEC_RE_OS_AXIS(res.data.SPEC_RE_OS_AXIS)
      set_SPEC_RE_OS_Prism(res.data.SPEC_RE_OS_Prism)
      set_SPEC_RE_OS_Base(res.data.SPEC_RE_OS_Base)
      set_SPEC_RE_OS_VA(res.data.SPEC_RE_OS_VA)
      set_SPEC_UNA_DIS_OD(res.data.SPEC_UNA_DIS_OD)
      set_SPEC_UNA_NEAR_OD(res.data.SPEC_UNA_NEAR_OD)
      set_SPEC_UNA_DIS_OS(res.data.SPEC_UNA_DIS_OS)
      set_SPEC_UNA_NEAR_OS(res.data.SPEC_UNA_NEAR_OS)
      set_SPEC_Pin_OD(res.data.SPEC_Pin_OD)
      set_SPEC_Pin_OS(res.data.SPEC_Pin_OS)
      set_SPEC_IOP_OD(res.data.SPEC_IOP_OD)
      set_SPEC_IOP_OS(res.data.SPEC_IOP_OS)
      set_SPEC_RED_OD_O(res.data.SPEC_RED_OD_O)
      set_SPEC_RED_OD_T(res.data.SPEC_RED_OD_T)
      set_SPEC_RED_OS_O(res.data.SPEC_RED_OS_O)
      set_SPEC_RED_OS_T(res.data.SPEC_RED_OS_T)
      set_SPEC_Type_Of_lenses_Used(res.data.SPEC_Type_Of_lenses_Used)
      set_SPEC_Time_Period(res.data.SPEC_Time_Period)
      set_SPEC_Time_More(res.data.SPEC_Time_More)
      set_SPEC_remark(res.data.SPEC_remark)
    }).catch((err) => {
      console.log(err)
    })

    axios.get(`http://localhost:2776/api/order/objective/${order.cmd_id}`).then((res) => {
      console.log(res.data)
      set_SPECOB_OD_SPH(res.data.SPECOB_OD_SPH)
      set_SPECOB_OD_CYL(res.data.SPECOB_OD_CYL)
      set_SPECOB_OD_AXIS(res.data.SPECOB_OD_AXIS)
      set_SPECOB_OD_Prim(res.data.SPECOB_OD_Prism)
      set_SPECOB_OD_Base(res.data.SPECOB_OD_Base)
      set_SPECOB_OD_VA(res.data.SPECOB_OD_VA)
      set_SPECOB_OD_type_near_full(res.data.SPECOB_OD_near_full)
      set_SPECOB_OD_type_near_va(res.data.SPECOB_OD_near_va)
      set_SPECOB_OS_SPH(res.data.SPECOB_OS_SPH)
      set_SPECOB_OS_CYL(res.data.SPECOB_OS_CYL)
      set_SPECOB_OD_SPH(res.data.SPECOB_OD_SPH)
      set_SPECOB_OS_AXIS(res.data.SPECOB_OS_AXIS)
      set_SPECOB_OS_Prim(res.data.SPECOB_OS_Prism)
      set_SPECOB_OS_Base(res.data.SPECOB_OS_Base)
      set_SPECOB_OS_VA(res.data.SPECOB_OS_VA)
      set_SPECOB_OS_type_near_full(res.data.SPECOB_OS_near_full)
      set_SPECOB_OS_type_near_va(res.data.SPECOB_OS_near_va)
      set_SPECOB_remark(res.data.SPECOB_remark)
    }).catch((err) => {
      console.log(err)
    })

    axios.get(`http://localhost:2776/api/order/conatct/${order.cmd_id}`).then((res) => {
      console.log(res.data)
      set_SPECCON_OD_SPH(res.data.SPECCON_OD_SPH)
      set_SPECCON_OD_CYL(res.data.SPECCON_OD_CYL)
      set_SPECCON_OD_AXIS(res.data.SPECCON_OD_AXIS)
      set_SPECCON_OD_VA(res.data.SPECCON_OD_VA)
      set_SPECCON_OD_B_Curve(res.data.SPECCON_OD_B_Curve)
      set_SPECCON_OD_Diam(res.data.SPECCON_OD_Diam)
      set_SPECCON_OD_Design(res.data.SPECCON_OD_Design)
      set_SPECCON_OS_SPH(res.data.SPECCON_OS_SPH)
      set_SPECCON_OS_CYL(res.data.SPECCON_OS_CYL)
      set_SPECCON_OD_SPH(res.data.SPECCON_OD_SPH)
      set_SPECCON_OS_AXIS(res.data.SPECCON_OS_AXIS)
      set_SPECCON_OS_VA(res.data.SPECCON_OS_VA)
      set_SPECCON_OS_B_Curve(res.data.SPECCON_OS_B_Curve)
      set_SPECCON_OS_Diam(res.data.SPECCON_OS_Diam)
      set_SPECCON_OS_Design(res.data.SPECCON_OS_Design)
      set_SPECCON_Remark(res.data.SPECCON_remark)
    }).catch((err) => {
      console.log(err)
    })

    axios.get(`http://localhost:2776/api/order/user/${order.cid}`)
      .then((res) => {
        console.log(res.data)
        setSelectedFiles(res.data)
      }).catch((err) => {
        console.log(err)
      });
  };

  const completeOrder = async () => {
    try {
      axios.put(`http://localhost:2776/api/order/${selectedccmid}`).then((res) => {
        console.log(res.data)
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
      }).catch((err) => {
        console.log(err)
      })

    } catch (error) {
      console.error('Error submitting med details:', error);
      toast.error('Failed to Complete the Order!');
    }
  };

  const submitContactLen = async () => {
    try {
      const date = formatDate(today);
      const ob = {
        date: date,
        cmd_id: selectedccmid,
        SPECCON_OD_SPH,
        SPECCON_OD_CYL,
        SPECCON_OD_AXIS,
        SPECCON_OD_VA,
        SPECCON_OD_B_Curve,
        SPECCON_OD_Diam,
        SPECCON_OD_Design,
        SPECCON_OS_SPH,
        SPECCON_OS_CYL,
        SPECCON_OS_AXIS,
        SPECCON_OS_VA,
        SPECCON_OS_B_Curve,
        SPECCON_OS_Diam,
        SPECCON_OS_Design,
        SPECCON_remark
      }

      axios.post('http://localhost:2776/api/order/new/contact', ob).then((res) => {
        console.log(res.data)
        toast('Submitted!');
      }).catch((err) => {
        console.log(err)
      })
    } catch (error) {
      console.error('Error submitting med details:', error);
      toast.error('Failed to Submit!');
    }
  };

  const submitMedObjective = async () => {
    try {
      const date = formatDate(today);
      const ob = {
        date: date,
        cmd_id: selectedccmid,
        SPECOB_OD_SPH,
        SPECOB_OD_CYL,
        SPECOB_OD_AXIS,
        SPECOB_OD_Prism,
        SPECOB_OD_Base,
        SPECOB_OD_VA,
        SPECOB_OD_near_full,
        SPECOB_OD_near_va,
        SPECOB_OS_SPH,
        SPECOB_OS_CYL,
        SPECOB_OS_AXIS,
        SPECOB_OS_Prism,
        SPECOB_OS_Base,
        SPECOB_OS_VA,
        SPECOB_OS_near_full,
        SPECOB_OS_near_va,
        SPECOB_remark
      }

      axios.post('http://localhost:2776/api/order/new/objective', ob).then((res) => {
        console.log(res.data)
        toast('Submitted!');
      }).catch((err) => {
        console.log(err)
      })


      console.log('All submissions completed successfully.');
    } catch (error) {
      console.error('Error submitting med details:', error);
      toast.error('Failed to Submit!');
    }
  };

  const submitMedDeatils = async () => {
    try {
      const date = formatDate(today);

      const ob = {
        date: date,
        cmd_id: selectedccmid,
        SPEC_OD_SPH,
        SPEC_OD_CYL,
        SPEC_OD_AXIS,
        SPEC_OD_Prism,
        SPEC_OD_Base,
        SPEC_OD_VA,
        SPEC_OD_near_full,
        SPEC_OD_near_va,
        SPEC_OS_SPH,
        SPEC_OS_CYL,
        SPEC_OS_AXIS,
        SPEC_OS_Prism,
        SPEC_OS_Base,
        SPEC_OS_VA,
        SPEC_OS_near_full,
        SPEC_OS_near_va,
        SPEC_Pro_Add,
        SPEC_RE_OD_SPH,
        SPEC_RE_OD_CYL,
        SPEC_RE_OD_AXIS,
        SPEC_RE_OD_Prism,
        SPEC_RE_OD_Base,
        SPEC_RE_OD_VA,
        SPEC_RE_OS_SPH,
        SPEC_RE_OS_CYL,
        SPEC_RE_OS_AXIS,
        SPEC_RE_OS_Prism,
        SPEC_RE_OS_Base,
        SPEC_RE_OS_VA,
        SPEC_UNA_DIS_OD,
        SPEC_UNA_NEAR_OD,
        SPEC_UNA_DIS_OS,
        SPEC_UNA_NEAR_OS,
        SPEC_Pin_OD,
        SPEC_Pin_OS,
        SPEC_IOP_OD,
        SPEC_IOP_OS,
        SPEC_RED_OD_O,
        SPEC_RED_OD_T,
        SPEC_RED_OS_O,
        SPEC_RED_OS_T,
        SPEC_Type_Of_lenses_Used,
        SPEC_Time_Period,
        SPEC_Time_More,
        SPEC_remark,
      }

      axios.post('http://localhost:2776/api/order/new', ob).then((res) => {
        console.log(res.data)
      }).catch((err) => {
        console.log(err)
      })

      toast('Submitted!');
    } catch (error) {
      console.error('Error submitting med details:', error);
      toast.error('Failed to Submit!');
    }
  };

  // When user clicks upload
  const handleUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      alert("Please select files first!");
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("files", selectedFiles[i]);
    }
    formData.append("userId", selectedcid);
    formData.append("type", "fundus"); // or "reports"

    try {
      await axios.post("http://localhost:2776/api/order/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Files uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
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
                              value={HABI_OD_SPH}
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
                              value={HABI_OD_CYL}
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
                              value={HABI_OD_AXIS}
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
                              value={HABI_OD_Prim}
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
                              value={HABI_OD_Base}
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
                              value={HABI_OD_VA}
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
                              value={HABI_OD_type_near_full}
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
                              value={HABI_OD_type_near_va}
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
                              value={HABI_OS_SPH}
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
                              value={HABI_OS_CYL}
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
                              value={HABI_OS_AXIS}
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
                              value={HABI_OS_Prim}
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
                              value={HABI_OS_Base}
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
                              value={HABI_OS_VA}
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
                              value={HABI_OS_type_near_full}
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
                              value={HABI_OS_type_near_va}
                            />
                          </Form.Group>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
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
                                    value={SPEC_OD_SPH}
                                    onChange={(e) => set_SPEC_OD_SPH(e.target.value)}
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
                                    value={SPEC_OD_CYL}
                                    onChange={(e) => set_SPEC_OD_CYL(e.target.value)}
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
                                    value={SPEC_OD_AXIS}
                                    onChange={(e) => set_SPEC_OD_AXIS(e.target.value)}
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
                                    value={SPEC_OD_Prism}
                                    onChange={(e) => set_SPEC_OD_Prim(e.target.value)}
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
                                    value={SPEC_OD_Base}
                                    onChange={(e) => set_SPEC_OD_Base(e.target.value)}
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
                                    value={SPEC_OD_VA}
                                    onChange={(e) => set_SPEC_OD_VA(e.target.value)}
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
                                    value={SPEC_OD_near_full}
                                    onChange={(e) => set_SPEC_OD_type_near_full(e.target.value)}
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
                                    value={SPEC_OD_near_va}
                                    onChange={(e) => set_SPEC_OD_type_near_va(e.target.value)}
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
                                    value={SPEC_OS_SPH}
                                    onChange={(e) => set_SPEC_OS_SPH(e.target.value)}
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
                                    value={SPEC_OS_CYL}
                                    onChange={(e) => set_SPEC_OS_CYL(e.target.value)}
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
                                    value={SPEC_OS_AXIS}
                                    onChange={(e) => set_SPEC_OS_AXIS(e.target.value)}
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
                                    value={SPEC_OS_Prism}
                                    onChange={(e) => set_SPEC_OS_Prim(e.target.value)}
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
                                    value={SPEC_OS_Base}
                                    onChange={(e) => set_SPEC_OS_Base(e.target.value)}
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
                                    value={SPEC_OS_VA}
                                    onChange={(e) => set_SPEC_OS_VA(e.target.value)}
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
                                    value={SPEC_OS_near_full}
                                    onChange={(e) => set_SPEC_OS_type_near_full(e.target.value)}
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
                                    value={SPEC_OS_near_va}
                                    onChange={(e) => set_SPEC_OS_type_near_va(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </Col>
                    </Row>
                    <Row style={{ padding: 2 }}>
                      <Col md={4}>
                        <Form.Group className="mb-0" controlId="formBasicFloat">
                          <Form.Label>Pro. ADD</Form.Label>
                          <Form.Control
                            type="number"
                            step="any"
                            style={{
                              width: '',
                              padding: '4px 6px',
                              textAlign: 'center'
                            }}
                            value={SPEC_Pro_Add}
                            onChange={(e) => set_SPEC_Pro_Add(e.target.value)}
                          />
                        </Form.Group></Col>
                    </Row>
                    <Row>
                      <h6 style={{ fontWeight: '600', marginTop: 15 }}>Reading Total</h6>
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
                                    value={Number(SPEC_OD_SPH)-Number(SPEC_Pro_Add)}
                                    onChange={(e) => set_SPEC_RE_OD_SPH(e.target.value)}
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
                                    value={SPEC_RE_OD_CYL}
                                    onChange={(e) => set_SPEC_RE_OD_CYL(e.target.value)}
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
                                    value={SPEC_RE_OD_AXIS}
                                    onChange={(e) => set_SPEC_RE_OD_AXIS(e.target.value)}
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
                                    value={SPEC_RE_OD_Prism}
                                    onChange={(e) => set_SPEC_RE_OD_Prism(e.target.value)}
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
                                    value={SPEC_RE_OD_Base}
                                    onChange={(e) => set_SPEC_RE_OD_Base(e.target.value)}
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
                                    value={SPEC_RE_OD_VA}
                                    onChange={(e) => set_SPEC_RE_OD_VA(e.target.value)}
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
                                    value={Number(SPEC_OS_SPH)-Number(SPEC_Pro_Add)}
                                    onChange={(e) => set_SPEC_RE_OS_SPH(e.target.value)}
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
                                    value={SPEC_RE_OS_CYL}
                                    onChange={(e) => set_SPEC_RE_OS_CYL(e.target.value)}
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
                                    value={SPEC_RE_OS_AXIS}
                                    onChange={(e) => set_SPEC_RE_OS_AXIS(e.target.value)}
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
                                    value={SPEC_RE_OS_Prism}
                                    onChange={(e) => set_SPEC_RE_OS_Prism(e.target.value)}
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
                                    value={SPEC_RE_OS_Base}
                                    onChange={(e) => set_SPEC_RE_OS_Base(e.target.value)}
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
                                    value={SPEC_RE_OS_VA}
                                    onChange={(e) => set_SPEC_RE_OS_VA(e.target.value)}
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
                                    value={SPEC_UNA_DIS_OD}
                                    onChange={(e) => set_SPEC_UNA_DIS_OD(e.target.value)}
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
                                    value={SPEC_UNA_NEAR_OD}
                                    onChange={(e) => set_SPEC_UNA_NEAR_OD(e.target.value)}
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
                                    value={SPEC_UNA_DIS_OS}
                                    onChange={(e) => set_SPEC_UNA_DIS_OS(e.target.value)}
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
                                    value={SPEC_UNA_NEAR_OS}
                                    onChange={(e) => set_SPEC_UNA_NEAR_OS(e.target.value)}
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
                                    value={SPEC_Pin_OD}
                                    onChange={(e) => set_SPEC_Pin_OD(e.target.value)}
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
                                    value={SPEC_Pin_OS}
                                    onChange={(e) => set_SPEC_Pin_OS(e.target.value)}
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
                                    value={SPEC_IOP_OD}
                                    onChange={(e) => set_SPEC_IOP_OD(e.target.value)}
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
                                    value={SPEC_IOP_OS}
                                    onChange={(e) => set_SPEC_IOP_OS(e.target.value)}
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
                                    value={SPEC_RED_OD_O}
                                    onChange={(e) => set_SPEC_RED_OD_O(e.target.value)}
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
                                    value={SPEC_RED_OD_T}
                                    onChange={(e) => set_SPEC_RED_OD_T(e.target.value)}
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
                                    value={SPEC_RED_OS_O}
                                    onChange={(e) => set_SPEC_RED_OS_O(e.target.value)}
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
                                    value={SPEC_RED_OS_T}
                                    onChange={(e) => set_SPEC_RED_OS_T(e.target.value)}
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
                              className="custom-radio"
                              value={SPEC_Type_Of_lenses_Used}
                              onChange={(e) => set_SPEC_Type_Of_lenses_Used(e.target.value)}
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
                              value={SPEC_Time_Period}
                              className="custom-radio"
                              onChange={(e) => set_SPEC_Time_Period(e.target.value)}
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
                        </Form.Group>
                        <Form.Group className="mt-4" controlId="formBasicFloat">
                          <Form.Control
                            type="text"
                            step="any"
                            style={{
                              width: '',
                              padding: '10px 6px',
                            }}
                            placeholder='Remark'
                            value={SPEC_remark}
                            onChange={(e) => set_SPEC_remark(e.target.value)}
                          />
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
                                    value={SPECOB_OD_SPH}
                                    onChange={(e) => set_SPECOB_OD_SPH(e.target.value)}
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
                                    value={SPECOB_OD_CYL}
                                    onChange={(e) => set_SPECOB_OD_CYL(e.target.value)}
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
                                    value={SPECOB_OD_AXIS}
                                    onChange={(e) => set_SPECOB_OD_AXIS(e.target.value)}
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
                                    value={SPECOB_OD_Prism}
                                    onChange={(e) => set_SPECOB_OD_Prim(e.target.value)}
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
                                    value={SPECOB_OD_Base}
                                    onChange={(e) => set_SPECOB_OD_Base(e.target.value)}
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
                                    value={SPECOB_OD_VA}
                                    onChange={(e) => set_SPECOB_OD_VA(e.target.value)}
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
                                    value={SPECOB_OD_near_full}
                                    onChange={(e) => set_SPECOB_OD_type_near_full(e.target.value)}
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
                                    value={SPECOB_OD_near_va}
                                    onChange={(e) => set_SPECOB_OD_type_near_va(e.target.value)}
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
                                    value={SPECOB_OS_SPH}
                                    onChange={(e) => set_SPECOB_OS_SPH(e.target.value)}
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
                                    value={SPECOB_OS_CYL}
                                    onChange={(e) => set_SPECOB_OS_CYL(e.target.value)}
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
                                    value={SPECOB_OS_AXIS}
                                    onChange={(e) => set_SPECOB_OS_AXIS(e.target.value)}
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
                                    value={SPECOB_OS_Prism}
                                    onChange={(e) => set_SPECOB_OS_Prim(e.target.value)}
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
                                    value={SPECOB_OS_Base}
                                    onChange={(e) => set_SPECOB_OS_Base(e.target.value)}
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
                                    value={SPECOB_OS_VA}
                                    onChange={(e) => set_SPECOB_OS_VA(e.target.value)}
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
                                    value={SPECOB_OS_near_full}
                                    onChange={(e) => set_SPECOB_OS_type_near_full(e.target.value)}
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
                                    value={SPECOB_OS_near_va}
                                    onChange={(e) => set_SPECOB_OS_type_near_va(e.target.value)}
                                  />
                                </Form.Group>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </Col>
                      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Remarks</Form.Label>
                        <Form.Control as="textarea" rows="3" value={SPECOB_remark} onChange={(e) => set_SPECOB_remark(e.target.value)} />
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
                                value={SPECCON_OD_SPH}
                                onChange={(e) => set_SPECCON_OD_SPH(e.target.value)}
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
                                value={SPECCON_OD_CYL}
                                onChange={(e) => set_SPECCON_OD_CYL(e.target.value)}
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
                                value={SPECCON_OD_AXIS}
                                onChange={(e) => set_SPECCON_OD_AXIS(e.target.value)}
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
                                value={SPECCON_OD_VA}
                                onChange={(e) => set_SPECCON_OD_VA(e.target.value)}
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
                                value={SPECCON_OD_B_Curve}
                                onChange={(e) => set_SPECCON_OD_B_Curve(e.target.value)}
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
                                value={SPECCON_OD_Diam}
                                onChange={(e) => set_SPECCON_OD_Diam(e.target.value)}
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
                                value={SPECCON_OD_Design}
                                onChange={(e) => set_SPECCON_OD_Design(e.target.value)}
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
                                value={SPECCON_OS_SPH}
                                onChange={(e) => set_SPECCON_OS_SPH(e.target.value)}
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
                                value={SPECCON_OS_CYL}
                                onChange={(e) => set_SPECCON_OS_CYL(e.target.value)}
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
                                value={SPECCON_OS_AXIS}
                                onChange={(e) => set_SPECCON_OS_AXIS(e.target.value)}
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
                                value={SPECCON_OS_VA}
                                onChange={(e) => set_SPECCON_OS_VA(e.target.value)}
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
                                value={SPECCON_OS_B_Curve}
                                onChange={(e) => set_SPECCON_OS_B_Curve(e.target.value)}
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
                                value={SPECCON_OS_Diam}
                                onChange={(e) => set_SPECCON_OS_Diam(e.target.value)}
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
                                value={SPECCON_OS_Design}
                                onChange={(e) => set_SPECCON_OS_Design(e.target.value)}
                              />
                            </Form.Group>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Remarks</Form.Label>
                      <Form.Control as="textarea" rows="3" value={SPECCON_remark} onChange={(e) => set_SPECCON_Remark(e.target.value)} />
                    </Form.Group>

                    <Row>
                      <Col>
                        <Button variant="outline-primary" size="sm" className="mt-3" onClick={submitContactLen}>
                          Submit
                        </Button>
                      </Col>
                    </Row>
                  </Tab>
                  <Tab eventKey="fundus" title="Fundus">
                    <div>
                      <input type="file" multiple onChange={handleFileChange} />
                      <button onClick={handleUpload}>Upload</button>
                    </div>
                    {/* {selectedFiles.map((file) => (
                      <div key={file.id}>
                        {file.file_type.startsWith("image/") ? (
                          <img
                            src={`http://localhost:2776/api/order/${file.file_name}`}
                            alt={file.file_name}
                            style={{ width: "200px", margin: "10px" }}
                          />
                        ) : (
                          <a
                            href={`http://localhost:2776/api/order/${file.file_name}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {file.file_name}
                          </a>
                        )}
                      </div>
                    ))} */}

                  </Tab>
                  <Tab eventKey="reports" title="Reports">

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

export default RootAdminDashboard;




