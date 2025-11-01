import React, { useEffect, useState, useRef } from 'react';
import { Card, Button, CardGroup, Row, Col, Table, Form, Tabs, Tab, Modal, Container } from 'react-bootstrap';
import axios from 'axios';
import avatar1 from '../../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../../assets/images/user/avatar-3.jpg';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const boxStyle = {
  backgroundColor: '#D0DCF5',
  padding: 15,
  color: '#708090',
  borderRadius: 10,
  fontSize: 15,
  height: '100%',
  display: 'flex',
  flexDirection: 'column'
};

const labelStyle = {
  fontWeight: 'bold',
  marginBottom: 10
};

const ulStyle = {
  paddingLeft: '20px',
  marginBottom: 0,
  flex: 1
};


const typeofLense = [
  { id: 1, text: 'Distance only' },
  { id: 2, text: 'Reading only' },
  { id: 3, text: 'Bifocal' },
  { id: 4, text: 'Prograssive' }
];

const prescribe_spectacle = [
  { id: 1, text: 'Constant wear' },
  { id: 2, text: 'Near Only' },
  { id: 3, text: 'Distance Only' },
  { id: 4, text: 'Wear as needed' }
]

const timepreiod = [
  { id: 1, text: 'Refer to an ophthalmologist' },
  { id: 2, text: 'Retest' },
  { id: 3, text: 'Review in 3 Months' },
  { id: 4, text: 'Review in 6 Months' },
  { id: 5, text: 'Review in 1 Year' },
  { id: 6, text: 'Other' },
];


const LensRecommendation = [
  { id: 1, text: 'Single vision' },
  { id: 2, text: 'Bifocal' },
  { id: 3, text: 'Progressive' },
  { id: 4, text: 'Hi index' },
  { id: 5, text: 'ARC' },
  { id: 6, text: 'EPG' },
  { id: 7, text: 'Other' },
];

const OptometristOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const scrollRef = useRef(null);
  const [show, setShow] = useState(false);
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
  const [SPEC_RE_OD_SPH, set_SPEC_RE_OD_SPH] = useState(Number(SPEC_OD_SPH) - Number(SPEC_Pro_Add));
  const [SPEC_RE_OD_CYL, set_SPEC_RE_OD_CYL] = useState('');
  const [SPEC_RE_OD_AXIS, set_SPEC_RE_OD_AXIS] = useState('');
  const [SPEC_RE_OD_Prism, set_SPEC_RE_OD_Prism] = useState('');
  const [SPEC_RE_OD_Base, set_SPEC_RE_OD_Base] = useState('');
  const [SPEC_RE_OD_VA, set_SPEC_RE_OD_VA] = useState('');
  const [SPEC_RE_OS_SPH, set_SPEC_RE_OS_SPH] = useState(Number(SPEC_OS_SPH) - Number(SPEC_Pro_Add));
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
  const [file, setFile] = useState(null);
  const [myFiles, setMyFiles] = useState(['']);
  const [purposeofvisit, setpurposeofvisit] = useState([]);
  const [purpose_of_visit, set_purpose_of_visit] = useState('');
  const [purpose_of_visit_remark, set_purpose_of_visit_remark] = useState('');
  const [occular_health, set_occular_health] = useState('');
  const [occular_health_remark, set_occular_health_remark] = useState('');
  const [general_health, set_general_health] = useState('');
  const [general_health_medication, set_general_health_medication] = useState('');
  const [general_health_allergies, set_general_health_allergies] = useState('');
  const [general_health_remark, set_general_health_remark] = useState('');
  const [symptoms, set_symptoms] = useState('');
  const [symptoms_remark, set_symptoms_remark] = useState('');
  const [type_of_lenses_used, set_type_of_lenses_used] = useState('');
  const [generalhealth, setgeneralhealth] = useState([]);
  const [symptoms_list, setsymptoms_list] = useState([]);
  const [occularhealth, setoccularhealth] = useState([]);
  const [typeofLense, settypeofLense] = useState([]);
  const [WearerType, setWearerType] = useState([]);
  const [WearerTypeValue, set_WearerTypeValue] = useState('');
  const [LensTypeContactLense, setLensTypeContactLense] = useState([]);
  const [LensTypeContactLenseValue, set_LensTypeContactLenseValue] = useState('');
  const [SoftLensMaterial, setSoftLensMaterial] = useState([]);
  const [SoftLensMaterialValue, set_SoftLensMaterialValue] = useState('');
  const [SoftLensDesign, setSoftLensDesign] = useState([]);
  const [SoftLensDesignValue, set_SoftLensDesignValue] = useState('');
  const [WearerSchedule, setWearerSchedule] = useState([]);
  const [WearerScheduleValue, set_WearerScheduleValue] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
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


    axios.get('http://localhost:2776/api/root/purposeov').then((res) => {
      setpurposeofvisit(res.data)
    }).catch((err) => {
      console.log(err)
    })

    axios.get('http://localhost:2776/api/root/general').then((res) => {
      setgeneralhealth(res.data)
    }).catch((err) => {
      console.log(err)
    })

    axios.get('http://localhost:2776/api/root/symptoms').then((res) => {
      setsymptoms_list(res.data)
    }).catch((err) => {
      console.log(err)
    })

    axios.get('http://localhost:2776/api/root/occular').then((res) => {
      setoccularhealth(res.data)
    }).catch((err) => {
      console.log(err)
    })

    axios.get('http://localhost:2776/api/root/typeoflense').then((res) => {
      settypeofLense(res.data)
    }).catch((err) => {
      console.log(err)
    })

    axios.get('http://localhost:2776/api/root/wearertype').then((res) => {
      setWearerType(res.data)
    }).catch((err) => {
      console.log(err)
    })

    axios.get('http://localhost:2776/api/root/typecontactlensecon').then((res) => {
      setLensTypeContactLense(res.data)
    }).catch((err) => {
      console.log(err)
    })

    axios.get('http://localhost:2776/api/root/softlensmaterial').then((res) => {
      setSoftLensMaterial(res.data)
    }).catch((err) => {
      console.log(err)
    })

    axios.get('http://localhost:2776/api/root/softlensdesign').then((res) => {
      setSoftLensDesign(res.data)
    }).catch((err) => {
      console.log(err)
    })

    axios.get('http://localhost:2776/api/root/wearerschedule').then((res) => {
      setWearerSchedule(res.data)
    }).catch((err) => {
      console.log(err)
    })
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
    set_purpose_of_visit(order.purpose_of_visit);
    set_purpose_of_visit_remark(order.purpose_of_visit_remark);
    set_occular_health(order.occular_health);
    set_occular_health_remark(order.occular_health_remark);
    set_general_health(order.general_health);
    set_general_health_medication(order.general_health_medication);
    set_general_health_allergies(order.general_health_allergies);
    set_general_health_remark(order.general_health_remark);
    set_symptoms(order.symptoms);
    set_symptoms_remark(order.symptoms_remark);
    set_type_of_lenses_used(order.type_of_lenses_used);
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

    if (selectedCard === order.cmd_id) {
      setSelectedCard(null);
    } else {
      setSelectedCard(order.cmd_id);
    }

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

    const myFIle = {
      id: order.cmd_id,
      id2: order.c_id
    }

    axios.post('http://localhost:2776/api/order/upload/files', myFIle).then((res) => {
      console.log(res.data)
      setMyFiles(res.data)
    }).catch((err) => {
      console.log(err)
    })
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
        window.location.reload();
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
        SPECCON_remark,
        WearerType: WearerTypeValue,
        LensType: LensTypeContactLenseValue,
        SoftLensMaterial: SoftLensMaterialValue,
        SoftLensDesign: SoftLensDesignValue,
        WearerSchedule: WearerScheduleValue
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
        SPEC_OD_near_full: "+ Add " + SPEC_OD_near_full,
        SPEC_OD_near_va,
        SPEC_OS_SPH,
        SPEC_OS_CYL,
        SPEC_OS_AXIS,
        SPEC_OS_Prism,
        SPEC_OS_Base,
        SPEC_OS_VA,
        SPEC_OS_near_full: "+ Add " + SPEC_OS_near_full,
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
        SPEC_IOP_OD: SPEC_IOP_OD + " mmHG",
        SPEC_IOP_OS: SPEC_IOP_OS + " mmHG",
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

  const handleUpload = async (type) => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("cid", selectedcid);
    formData.append("cmd_id", selectedccmid);
    formData.append("type", type);
    formData.append("file_name", file.name);
    formData.append("upload_date", formatDate(today));

    const response = await fetch("http://localhost:2776/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      alert("File uploaded successfully!");
    } else {
      alert("Upload failed!");
    }
  };

  // Filter files for each tab
  const fundusFiles = myFiles.filter((f) => f.type === "Fundus");
  const otherFiles = myFiles.filter((f) => f.type === "Reports"); // example

  const UpdateAssistanceDetails = () => {
    //selectedccmid
    const ob = {
      purpose_of_visit,
      purpose_of_visit_remark,
      occular_health,
      occular_health_remark,
      general_health,
      general_health_allergies,
      general_health_medication,
      general_health_remark,
      symptoms,
      symptoms_remark,
      type_of_lenses_used
    }

    axios.put(`http://localhost:2776/api/order/assitacnce/${selectedccmid}`, ob).then((res) => {
      console.log(res.data)
      toast.success("Details Updated")
    }).catch((err) => {
      toast.error("Error!")
    })
  }

  // helper function to check if date is today
  const isToday = (dateStr) => {
    if (!dateStr) return false;

    const today = new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"

    const orderDate = new Date(dateStr);
    orderDate.setDate(orderDate.getDate() + 1); // shift by +1 day

    const shiftedDate = orderDate.toISOString().split("T")[0];

    return shiftedDate === today;
  };


  const [showAll, setShowAll] = useState(false);
  // const scrollRef = useRef(null);

  // const scroll = (direction) => {
  //   if (scrollRef.current) {
  //     scrollRef.current.scrollBy({
  //       left: direction === "left" ? -250 : 250,
  //       behavior: "smooth",
  //     });
  //   }
  // };

  // filter orders: today or all
  const displayedOrders = showAll
    ? allOrders
    : allOrders.filter((o) => isToday(o.date));

  const formatDate2 = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-GB"); // gives dd/mm/yyyy
  };
  const [selectedCard, setSelectedCard] = useState(null); // track selected


  // const handleCardClick = (order) => {
  //   // toggle selection if same card clicked again
  //   if (selectedCard === order.cmd_id) {
  //     setSelectedCard(null);
  //   } else {
  //     setSelectedCard(order.cmd_id);
  //   }
  // };


  return (
    <>
      <div style={{ position: "relative" }}>
        {/* Toggle Button */}
        <div style={{ textAlign: "center", marginBottom: "10px" }}>
          <Button
            variant={showAll ? "primary" : "outline-primary"}
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? "Show Today Only" : "Show All Orders"}
          </Button>
        </div>

        {/* Left Scroll Button */}
        <Button
          variant="light"
          onClick={() => scroll("left")}
          style={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
          }}
        >
          ◀
        </Button>

        {/* Orders Scroll Area */}
        <div
          ref={scrollRef}
          style={{
            display: "flex",
            overflowX: "auto",
            scrollBehavior: "smooth",
            gap: "1rem",
            padding: "1rem",
            margin: "0 2rem",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {displayedOrders.length === 0 ? (
            <p style={{ margin: "auto" }}>No orders found</p>
          ) : (
            displayedOrders.map((o, index) => (
              <Card
                key={index}
                onClick={() => handleCardClick(o)}
                style={{
                  minWidth: "220px",
                  flex: "0 0 auto",
                  borderRadius: "15px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  marginBottom: "1rem",
                  textAlign: "center",
                  cursor: "pointer",
                  backgroundColor:
                    selectedCard === o.cmd_id ? "#7bb9faff" : "#fff", // 🔵 selected = blue
                  color: selectedCard === o.cmd_id ? "#fff" : "#000", // white text on blue
                  transform:
                    selectedCard === o.cmd_id ? "scale(1.05)" : "scale(1)", // small zoom effect
                  transition: "all 0.2s ease-in-out",
                }}
              >
                <Card.Img
                  variant="top"
                  style={{
                    width: 40,
                    height: 40,
                    objectFit: "cover",
                    borderRadius: "50%",
                    margin: "10px auto 0 auto",
                    border: "2px solid #007bff",
                    padding: "2px",
                    backgroundColor: "#fff",
                  }}
                  src={
                    o.gender === "male"
                      ? avatar2
                      : o.gender === "female"
                        ? avatar3
                        : avatar1
                  }
                />

                <Card.Body>
                  <Card.Title style={{ fontSize: "0.9rem", color: "#6c757d" }}>
                    #Today No : {o.today_no || "ID"}
                  </Card.Title>
                  <Card.Title style={{ fontSize: "1rem", fontWeight: "600" }}>
                    {o.prefix || "Prefix"} {o.first_name || "FirstName"}{" "}
                    {o.name || "LastName"}
                  </Card.Title>
                  <Card.Title style={{ fontSize: "0.9rem", color: "#6c757d" }}>
                    Age : {o.age || "AGE"}
                  </Card.Title>
                  <Card.Title style={{ fontSize: "0.9rem", color: "#6c757d" }}>
                    Date : {formatDate2(o.date) || "Date"}
                  </Card.Title>
                </Card.Body>
              </Card>
            ))
          )}
        </div>

        {/* Right Scroll Button */}
        <Button
          variant="light"
          onClick={() => scroll("right")}
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
          }}
        >
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
            {/* <h5 className="mb-4 text-primary" style={{ fontWeight: '600' }}>
              👤 Basic Information
            </h5> */}
            <Col>
              <h5 className="mb-4 text-primary" style={{ fontWeight: "600" }}>
                👤 Basic Information
              </h5>
            </Col>
            <Col className="text-end">
              <Button
                variant="outline-primary"
                size="sm"
                className="px-3"
                onClick={handleShow}
              >
                Edit
              </Button>
            </Col>
            <Row className="mt-1">
              <Col md={3} className="mb-3">
                <small className="text-muted">Name</small>
                <h6 className="mb-0">{selectedOrder.prefix || 'N/A'} {selectedOrder.first_name || 'N/A'} {selectedOrder.name || 'N/A'}</h6>
              </Col>

              <Col md={3} className="mb-3">
                <small className="text-muted">Age</small>
                <h6 className="mb-0">{selectedOrder.age || 'N/A'}</h6>
              </Col>

              <Col md={6} className="mb-3">
                <small className="text-muted">Occupation</small>
                <h6 className="mb-0">{selectedOrder.occupation || 'N/A'}</h6>
              </Col>

              {/* <Col md={3} className="mb-3">
                <small className="text-muted">Address</small>
                <h6 className="mb-0">{selectedOrder.address || 'N/A'}</h6>
              </Col> */}

              {/* <Col md={3} className="mb-3">
                <small className="text-muted">Age</small>
                <h6 className="mb-0">{selectedOrder.age || 'N/A'}</h6>
              </Col> */}
            </Row>
            <Row>
              <Col md={12} className="mb-3">
                <small className="text-muted">Address</small>
                <h6 className="mb-0">{selectedOrder.address || 'N/A'}</h6>
              </Col>
            </Row>

            <div className=" mt-4 rounded">
              <h5 className="mb-4 text-primary" style={{ fontWeight: '600' }}>
                🧑‍⚕️ Medical Report Information
              </h5>
              <Row className="align-items-stretch">
                <Col md={3}>
                  <Form.Group className="mb-3 h-100" style={boxStyle}>
                    <Form.Label style={labelStyle}>Purpose of visit</Form.Label>
                    <ul style={ulStyle}>
                      {purpose_of_visit.split(", ").filter(Boolean).map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group className="mb-3 h-100" style={boxStyle}>
                    <Form.Label style={labelStyle}>Symptoms</Form.Label>
                    <ul style={ulStyle}>
                      {symptoms.split(", ").filter(Boolean).map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group className="mb-3 h-100" style={boxStyle}>
                    <Form.Label style={labelStyle}>General Health</Form.Label>
                    <ul style={ulStyle}>
                      {general_health.split(", ").filter(Boolean).map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </Form.Group>
                </Col>

                <Col md={3}>
                  <Form.Group className="mb-3 h-100" style={boxStyle}>
                    <Form.Label style={labelStyle}>Ocular Health</Form.Label>
                    <ul style={ulStyle}>
                      {occular_health.split(", ").filter(Boolean).map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </Form.Group>
                </Col>
              </Row>

              <h6 className="m-2 text-success" style={{ fontWeight: '600', paddingTop: 5 }}>
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
                              type="text"
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
                              type="text"
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
                              type="text"
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
                              type="text"
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
                              type="text"
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
                              type="text"
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
                              type="text"
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
                              type="text"
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
                              type="text"
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
                              type="text"
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
                              type="text"
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
                              type="text"
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
                                    type="text"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    value={SPEC_OD_SPH}
                                    // onChange={(e) => {
                                    //   set_SPEC_OD_SPH(e.target.value);
                                    //   SPEC_OD_near_full
                                    //     ? Number(SPEC_OD_near_full) > 0
                                    //       ? set_SPEC_RE_OD_SPH(Number(e.target.value) + Number(SPEC_OD_near_full))
                                    //       : null
                                    //     : ""
                                    // }}
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      set_SPEC_OD_SPH(value);

                                      if (SPEC_OD_near_full) {
                                        const nearFull = Number(SPEC_OD_near_full);
                                        if (nearFull > 0) {
                                          const result = Number(value) + nearFull;
                                          set_SPEC_RE_OD_SPH(result.toFixed(2)); // 👈 two decimal places
                                        }
                                      }
                                    }}

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
                                    value={SPEC_OD_CYL}
                                    onChange={(e) => { set_SPEC_OD_CYL(e.target.value); set_SPEC_RE_OD_CYL(e.target.value) }}
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
                                    value={SPEC_OD_AXIS}
                                    onChange={(e) => { set_SPEC_OD_AXIS(e.target.value); set_SPEC_RE_OD_AXIS(e.target.value) }}
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
                                    value={SPEC_OD_Prism}
                                    onChange={(e) => { set_SPEC_OD_Prim(e.target.value); set_SPEC_RE_OD_Prism(e.target.value) }}
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
                                    value={SPEC_OD_Base}
                                    onChange={(e) => { set_SPEC_OD_Base(e.target.value); set_SPEC_RE_OD_Base(e.target.value) }}
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
                                    value={SPEC_OD_VA}
                                    onChange={(e) => { set_SPEC_OD_VA(e.target.value); set_SPEC_RE_OD_VA(e.target.value) }}
                                  />
                                </Form.Group>
                              </td>
                            </tr>
                            <tr className="text-center">
                              <td className="fw-bold">Near</td>
                              <td colSpan="5" className="bg-light">
                                <Form.Group
                                  className="mb-0 d-flex align-items-center"
                                  controlId="formBasicFloat"
                                >
                                  <span
                                    style={{
                                      marginRight: "6px",
                                      cursor: "pointer"
                                    }}
                                  >
                                    + Add
                                  </span>
                                  <Form.Control
                                    type="text"
                                    step="any"
                                    style={{
                                      border: "none",
                                      padding: "4px 6px",
                                      textAlign: "center",
                                      flex: 1, // input takes remaining space
                                    }}
                                    value={SPEC_OD_near_full}
                                    // onChange={(e) => { set_SPEC_OD_type_near_full(e.target.value); set_SPEC_RE_OD_SPH(Number(SPEC_OD_SPH) + Number(e.target.value)); }}
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      set_SPEC_OD_type_near_full(value);

                                      const sph = Number(SPEC_OD_SPH);
                                      const nearFull = Number(value);

                                      if (!isNaN(sph) && !isNaN(nearFull)) {
                                        const result = sph + nearFull;
                                        set_SPEC_RE_OD_SPH(result.toFixed(2)); // 👈 ensures two decimal places
                                      }
                                    }}

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
                                    type="text"
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    value={SPEC_OS_SPH}
                                    // onChange={(e) => {
                                    //   set_SPEC_OS_SPH(e.target.value);
                                    //   SPEC_OS_near_full
                                    //     ? Number(SPEC_OS_near_full) > 0
                                    //       ? set_SPEC_RE_OS_SPH(Number(e.target.value) + Number(SPEC_OS_near_full))
                                    //       : null
                                    //     : ""
                                    // }}
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      set_SPEC_OS_SPH(value);

                                      if (SPEC_OS_near_full) {
                                        const nearFull = Number(SPEC_OS_near_full);
                                        if (nearFull > 0) {
                                          const result = Number(value) + nearFull;
                                          set_SPEC_RE_OS_SPH(result.toFixed(2)); // 👈 round to two decimal places
                                        }
                                      }
                                    }}

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
                                    value={SPEC_OS_CYL}
                                    onChange={(e) => { set_SPEC_OS_CYL(e.target.value); set_SPEC_RE_OS_CYL(e.target.value) }}
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
                                    value={SPEC_OS_AXIS}
                                    onChange={(e) => { set_SPEC_OS_AXIS(e.target.value); set_SPEC_RE_OS_AXIS(e.target.value) }}
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
                                    value={SPEC_OS_Prism}
                                    onChange={(e) => { set_SPEC_OS_Prim(e.target.value); set_SPEC_RE_OS_Prism(e.target.value) }}
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
                                    value={SPEC_OS_Base}
                                    onChange={(e) => { set_SPEC_OS_Base(e.target.value); set_SPEC_RE_OS_Base(e.target.value) }}
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
                                    value={SPEC_OS_VA}
                                    onChange={(e) => { set_SPEC_OS_VA(e.target.value); set_SPEC_RE_OS_VA(e.target.value) }}
                                  />
                                </Form.Group>
                              </td>
                            </tr>
                            <tr className="text-center">
                              <td className="fw-bold">Near</td>
                              <td colSpan="5" className="bg-light">
                                <Form.Group
                                  className="mb-0 d-flex align-items-center"
                                  controlId="formBasicFloat"
                                >
                                  <span style={{ marginRight: "6px", cursor: "pointer" }}>
                                    + Add
                                  </span>
                                  <Form.Control
                                    type="text"
                                    step="any"
                                    style={{
                                      border: "none",
                                      padding: "4px 6px",
                                      textAlign: "center",
                                      flex: 1, // make input take remaining space
                                    }}
                                    value={SPEC_OS_near_full}
                                    // onChange={(e) => { set_SPEC_OS_type_near_full(e.target.value); set_SPEC_RE_OS_SPH(Number(SPEC_OS_SPH) + Number(e.target.value)) }}
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      set_SPEC_OS_type_near_full(value);

                                      const sph = Number(SPEC_OS_SPH);
                                      const nearFull = Number(value);

                                      if (!isNaN(sph) && !isNaN(nearFull)) {
                                        const result = sph + nearFull;
                                        set_SPEC_RE_OS_SPH(result.toFixed(2)); // 👈 formats to two decimal places
                                      }
                                    }}

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
                            type="text"
                            step="any"
                            style={{
                              width: '',
                              padding: '4px 6px',
                              textAlign: 'center'
                            }}
                            value={SPEC_Pro_Add}
                            onChange={(e) => {
                              set_SPEC_Pro_Add(e.target.value)

                            }}

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
                                {/* <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="text"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    value={
                                      SPEC_RE_OD_SPH
                                        ? Number(SPEC_RE_OD_SPH) > 0
                                          ? `${SPEC_RE_OD_SPH}`
                                          : SPEC_RE_OD_SPH
                                        : ""
                                    }
                                    onChange={(e) => set_SPEC_RE_OD_SPH(e.target.value)}
                                  />
                                </Form.Group> */}
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="text"
                                    style={{
                                      border: 'none',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    value={
                                      SPEC_RE_OD_SPH !== "" && SPEC_RE_OD_SPH !== null && !isNaN(SPEC_RE_OD_SPH)
                                        ? `${Number(SPEC_RE_OD_SPH) >= 0 ? "+" : ""}${Number(SPEC_RE_OD_SPH).toFixed(2)}`
                                        : ""
                                    }
                                    onChange={(e) => {
                                      const val = e.target.value.replace(/[^\d.-]/g, ""); // Remove non-numeric characters except '.' and '-'
                                      set_SPEC_RE_OD_SPH(val);
                                    }}
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
                                    style={{
                                      border: 'none',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    value={
                                      SPEC_RE_OS_SPH !== "" && SPEC_RE_OS_SPH !== null && !isNaN(SPEC_RE_OS_SPH)
                                        ? `${Number(SPEC_RE_OS_SPH) >= 0 ? "+" : ""}${Number(SPEC_RE_OS_SPH).toFixed(2)}`
                                        : ""
                                    }
                                    onChange={(e) => {
                                      const val = e.target.value.replace(/[^\d.-]/g, ""); // Only keep digits, decimal, and minus sign
                                      set_SPEC_RE_OS_SPH(val);
                                    }}
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
                    <Row className="mt-3 align-items-stretch">
                      <Col md={4} className="d-flex">
                        <Table bordered hover responsive className="table-sm align-middle shadow-sm flex-fill" style={{ height: '150px' }}>
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
                      <Col md={2} className="d-flex">
                        <Table bordered hover responsive className="table-sm align-middle shadow-sm flex-fill" style={{ height: '150px' }}>
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
                      <Col md={2} className="d-flex">
                        <Table bordered hover responsive className="table-sm align-middle shadow-sm flex-fill" style={{ height: '150px' }}>
                          <thead className="bg-primary text-white text-center">
                            <tr>
                              <th colSpan={2}>IOP (NCT)</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>OD</td>
                              <td>
                                <Form.Group
                                  className="mb-0 d-flex align-items-center"
                                  controlId="formBasicFloat"
                                >
                                  <Form.Control
                                    type="text"
                                    step="any"
                                    style={{
                                      border: "none",
                                      padding: "4px 6px",
                                      textAlign: "center",
                                      flex: 1, // input takes remaining space
                                    }}
                                    value={SPEC_IOP_OD}
                                    onChange={(e) => set_SPEC_IOP_OD(e.target.value)}
                                  />
                                  <span
                                    style={{
                                      cursor: "pointer"
                                    }}
                                  >
                                    mmHG
                                  </span>
                                </Form.Group>
                              </td>

                            </tr>
                            <tr>
                              <td>OS</td>
                              <td>
                                <Form.Group
                                  className="mb-0 d-flex align-items-center"
                                  controlId="formBasicFloat"
                                >
                                  <Form.Control
                                    type="text"
                                    step="any"
                                    style={{
                                      border: "none",
                                      padding: "4px 6px",
                                      textAlign: "center",
                                      flex: 1, // input takes remaining space
                                    }}
                                    value={SPEC_IOP_OS}
                                    onChange={(e) => set_SPEC_IOP_OS(e.target.value)}
                                  />
                                  <span
                                    style={{
                                      cursor: "pointer"
                                    }}
                                  >
                                    mmHG
                                  </span>
                                </Form.Group>
                              </td>

                            </tr>
                          </tbody>
                        </Table>
                      </Col>
                      <Col md={4} className="d-flex">
                        <Table bordered hover responsive className="table-sm align-middle shadow-sm flex-fill" style={{ height: '150px' }}>
                          <thead className="bg-primary text-white text-center">
                            <tr>
                              <th colSpan={3}>K Reading</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>OD</td>
                              <td>
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="text"
                                    inputMode="decimal"
                                    style={{
                                      border: "none",
                                      padding: "4px 6px",
                                      textAlign: "center",
                                    }}
                                    value={SPEC_RED_OD_O}
                                    onChange={(e) => {
                                      let value = e.target.value;

                                      // Allow numbers, dot, and '@'
                                      value = value.replace(/[^0-9.@]/g, "");

                                      // Split into before and after '@'
                                      let [before, after] = value.split("@");

                                      // --- Handle before '@' ---
                                      if (before) {
                                        // Only allow one dot in before part
                                        const parts = before.split(".");
                                        if (parts.length > 2) {
                                          before = parts[0] + "." + parts[1]; // remove extra dots
                                        }

                                        // Limit total before '@' length to 5 (digits + dot)
                                        before = before.slice(0, 5);
                                      }

                                      // --- Handle after '@' ---
                                      if (after) {
                                        after = after.replace(/\./g, ""); // remove any dots after '@'
                                        after = after.slice(0, 3); // limit to 3 digits
                                      }

                                      // If user typed more than 5 chars before '@' but no '@', insert automatically
                                      if (!value.includes("@") && before.length === 5) {
                                        value = before + "@";
                                      } else if (value.includes("@")) {
                                        value = before + "@" + (after || "");
                                      } else {
                                        value = before;
                                      }

                                      set_SPEC_RED_OD_O(value);
                                    }}
                                  />

                                </Form.Group>
                              </td>
                              <td>
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="text"
                                    inputMode="decimal"
                                    style={{
                                      border: "none",
                                      padding: "4px 6px",
                                      textAlign: "center",
                                    }}
                                    value={SPEC_RED_OD_T}
                                    onChange={(e) => {
                                      let value = e.target.value;

                                      // Allow only digits, one dot, and '@'
                                      value = value.replace(/[^0-9.@]/g, "");

                                      // Split parts around '@'
                                      let [before, after] = value.split("@");

                                      // --- Handle before '@' ---
                                      if (before) {
                                        // Only one dot allowed before '@'
                                        const parts = before.split(".");
                                        if (parts.length > 2) {
                                          before = parts[0] + "." + parts[1];
                                        }

                                        // Limit total before '@' to 5 characters
                                        before = before.slice(0, 5);
                                      }

                                      // --- Handle after '@' ---
                                      if (after) {
                                        after = after.replace(/\./g, ""); // remove any dots after '@'
                                        after = after.slice(0, 3); // limit to 3 digits
                                      }

                                      // Auto-add '@' if 5 chars typed before and not yet added
                                      if (!value.includes("@") && before.length === 5) {
                                        value = before + "@";
                                      } else if (value.includes("@")) {
                                        value = before + "@" + (after || "");
                                      } else {
                                        value = before;
                                      }

                                      set_SPEC_RED_OD_T(value);
                                    }}
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
                                    inputMode="decimal"
                                    style={{
                                      border: "none",
                                      padding: "4px 6px",
                                      textAlign: "center",
                                    }}
                                    value={SPEC_RED_OS_O}
                                    onChange={(e) => {
                                      let value = e.target.value;

                                      // Allow only digits, one dot, and '@'
                                      value = value.replace(/[^0-9.@]/g, "");

                                      // Split parts around '@'
                                      let [before, after] = value.split("@");

                                      // --- Handle before '@' ---
                                      if (before) {
                                        // Only one dot allowed before '@'
                                        const parts = before.split(".");
                                        if (parts.length > 2) {
                                          before = parts[0] + "." + parts[1];
                                        }

                                        // Limit total before '@' to 5 characters
                                        before = before.slice(0, 5);
                                      }

                                      // --- Handle after '@' ---
                                      if (after) {
                                        after = after.replace(/\./g, ""); // remove any dots after '@'
                                        after = after.slice(0, 3); // limit to 3 digits
                                      }

                                      // Auto-add '@' if 5 chars typed before and not yet added
                                      if (!value.includes("@") && before.length === 5) {
                                        value = before + "@";
                                      } else if (value.includes("@")) {
                                        value = before + "@" + (after || "");
                                      } else {
                                        value = before;
                                      }

                                      set_SPEC_RED_OS_O(value);
                                    }}
                                  />
                                </Form.Group>

                              </td>
                              <td>
                                <Form.Group className="mb-0" controlId="formBasicFloat">
                                  <Form.Control
                                    type="text"
                                    inputMode="decimal"
                                    style={{
                                      border: "none",
                                      padding: "4px 6px",
                                      textAlign: "center",
                                    }}
                                    value={SPEC_RED_OS_T}
                                    onChange={(e) => {
                                      let value = e.target.value;

                                      // Allow only digits, one dot, and '@'
                                      value = value.replace(/[^0-9.@]/g, "");

                                      // Split parts around '@'
                                      let [before, after] = value.split("@");

                                      // --- Handle before '@' ---
                                      if (before) {
                                        // Allow only one dot before '@'
                                        const parts = before.split(".");
                                        if (parts.length > 2) {
                                          before = parts[0] + "." + parts[1];
                                        }

                                        // Limit before '@' to 5 characters total
                                        before = before.slice(0, 5);
                                      }

                                      // --- Handle after '@' ---
                                      if (after) {
                                        after = after.replace(/\./g, ""); // remove dots after '@'
                                        after = after.slice(0, 3); // limit to 3 digits
                                      }

                                      // Auto-add '@' if 5 chars typed and '@' not present yet
                                      if (!value.includes("@") && before.length === 5) {
                                        value = before + "@";
                                      } else if (value.includes("@")) {
                                        value = before + "@" + (after || "");
                                      } else {
                                        value = before;
                                      }

                                      set_SPEC_RED_OS_T(value);
                                    }}
                                  />
                                </Form.Group>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </Col>
                    </Row>
                    <Row className="border rounded">
                      <Col md={4}>
                        <h6 className="mt-4 fw-bold mb-4">Spectacle Recommendation</h6>
                        <Form.Group className="mb-3">
                          {prescribe_spectacle.map((t) => (
                            <Form.Check
                              key={t.id}
                              type="radio"
                              label={t.text}
                              id={`radio-${t.id}`}
                              name="spec-type-of-lenses" // 👈 ensures only one can be selected
                              value={t.text} // 👈 give each option its own value
                              checked={SPEC_Type_Of_lenses_Used === t.text} // 👈 keeps selection highlighted
                              onChange={(e) => set_SPEC_Type_Of_lenses_Used(e.target.value)}
                            />
                          ))}
                        </Form.Group>

                      </Col>
                      <Col md={4}>
                        <h6 className="mt-4 fw-bold mb-4">Lens Recommendation</h6>
                        <Form.Group className="mb-3">
                          {LensRecommendation.map((t) => (
                            <Form.Check
                              key={t.id}
                              type="radio"
                              label={t.text}
                              id={`radio-${t.id}`}
                              name="lens-recommendation"   // 👈 group radios together
                              value={t.text}               // 👈 set the real option value
                              checked={SPEC_Time_More === t.text} // 👈 control the selection
                              onChange={(e) => set_SPEC_Time_More(e.target.value)} // 👈 save to state
                            />
                          ))}
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <h6 className="mt-4 fw-bold mb-4">General Recommendation</h6>
                        <Form.Group className="mb-3">
                          {timepreiod.map((t) => (
                            <Form.Check
                              key={t.id}
                              type="radio"
                              label={t.text}
                              id={`radio-${t.id}`}
                              name="time-period" // 👈 groups radios together
                              value={t.text}     // 👈 each option has its own value
                              checked={SPEC_Time_Period === t.text} // 👈 highlights selected
                              onChange={(e) => set_SPEC_Time_Period(e.target.value)} // 👈 saves to state
                            />
                          ))}
                        </Form.Group>

                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group className="mt-4" controlId="formBasicFloat">
                          <Form.Control
                            as="textarea"
                            rows="6"
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
                                    type="text"
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
                                    type="text"
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
                                    type="text"
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
                                    type="text"
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
                                    type="text"
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
                                    type="text"
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
                                    type="text"
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
                                    type="text"
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
                                    type="text"
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
                                    type="text"
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
                                    type="text"
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
                                    type="text"
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
                    <Row>
                      <Col md={2}>
                        <h6 className="mt-4 fw-bold mb-4">Wearer Type</h6>
                        <Form.Group className="mb-3">
                          <Form.Select
                            value={WearerTypeValue}
                            onChange={(e) => set_WearerTypeValue(e.target.value)}
                          >
                            <option value="">Select Wearer Type</option>
                            {WearerType.map((t) => (
                              <option key={t.id} value={t.text}>
                                {t.text}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={2}>
                        <h6 className="mt-4 fw-bold mb-4">Lens Type</h6>
                        <Form.Group className="mb-3">
                          <Form.Select
                            value={LensTypeContactLenseValue}
                            onChange={(e) => set_LensTypeContactLenseValue(e.target.value)}
                          >
                            <option value="">Select Lens Type</option>
                            {LensTypeContactLense.map((t) => (
                              <option key={t.id} value={t.text}>
                                {t.text}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={2}>
                        <h6 className="mt-4 fw-bold mb-4">Soft Lens Material</h6>
                        <Form.Group className="mb-3">
                          <Form.Select
                            value={SoftLensMaterialValue}
                            onChange={(e) => set_SoftLensMaterialValue(e.target.value)}
                          >
                            <option value="">Select Soft Lens Material</option>
                            {SoftLensMaterial.map((t) => (
                              <option key={t.id} value={t.text}>
                                {t.text}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={3}>
                        <h6 className="mt-4 fw-bold mb-4">Soft Lens Design</h6>
                        <Form.Group className="mb-3">
                          <Form.Select
                            value={SoftLensDesignValue}
                            onChange={(e) => set_SoftLensDesignValue(e.target.value)}
                          >
                            <option value="">Select Soft Lens Design</option>
                            {SoftLensDesign.map((t) => (
                              <option key={t.id} value={t.text}>
                                {t.text}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={3}>
                        <h6 className="mt-4 fw-bold mb-4">Wearer Schedule</h6>
                        <Form.Group className="mb-3">
                          <Form.Select
                            value={WearerScheduleValue}
                            onChange={(e) => set_WearerScheduleValue(e.target.value)}
                          >
                            <option value="">Select Wearer Schedule</option>
                            {WearerSchedule.map((t) => (
                              <option key={t.id} value={t.text}>
                                {t.text}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>

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
                    <input type="file" onChange={handleFileChange} />
                    <button onClick={() => handleUpload('Fundus')}>Upload</button>
                    <div className="p-3">
                      {fundusFiles.length === 0 ? (
                        <p>No files uploaded for Fundus</p>
                      ) : (
                        <ul>
                          {fundusFiles.map((file) => (
                            <li key={file.id}>
                              {file.file_name} - {new Date(file.upload_date).toLocaleDateString()}
                              <a
                                href={`http://localhost:2776/uploads/${file.file_name}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ marginLeft: "10px" }}
                              >
                                View
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </Tab>
                  <Tab eventKey="reports" title="Reports">
                    <input type="file" onChange={handleFileChange} />
                    <button onClick={() => handleUpload('Reports')}>Upload</button>
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

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit medical Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Container>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" style={{ height: '220px' }}>
                    <Form.Label style={{ fontWeight: 'bold' }}>Purpose of visit</Form.Label>
                    <div>
                      {purposeofvisit.map((p) => (
                        <Form.Check
                          key={p.pov_id}
                          type="checkbox"
                          label={p.text}
                          value={p.text}
                          checked={purpose_of_visit.includes(p.text)}
                          onChange={(e) => {
                            let updated;
                            if (e.target.checked) {
                              // Add value
                              updated = [...purpose_of_visit.split(", ").filter(Boolean), p.text];
                            } else {
                              // Remove value
                              updated = purpose_of_visit
                                .split(", ")
                                .filter((val) => val !== p.text);
                            }
                            set_purpose_of_visit(updated.join(", "));
                          }}
                        />
                      ))}
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="remarksInput" style={{ color: '#708090', paddingLeft: 10 }}>
                    <Form.Label>Remark</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Purpose of Visit Remarks"
                      value={purpose_of_visit_remark}
                      onChange={(e) => set_purpose_of_visit_remark(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" style={{ height: '400px' }}>
                    <Form.Label style={{ fontWeight: 'bold' }}>Symptoms</Form.Label>
                    <div>
                      {symptoms_list.map((p, i) => (
                        <Form.Check
                          key={i}
                          type="checkbox"
                          label={p.text}
                          value={p.text}
                          checked={symptoms.includes(p.text)}
                          onChange={(e) => {
                            let updated;
                            if (e.target.checked) {
                              // Add selected symptom
                              updated = [...symptoms.split(", ").filter(Boolean), p.text];
                            } else {
                              // Remove unselected symptom
                              updated = symptoms
                                .split(", ")
                                .filter((val) => val !== p.text);
                            }
                            set_symptoms(updated.join(", "));
                          }}
                        />
                      ))}
                    </div>
                  </Form.Group>



                  <Form.Group className="mb-3" controlId="remarksInput" style={{ color: '#708090', paddingLeft: 10 }}>
                    <Form.Label>Remark</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Symptoms Remarks"
                      value={symptoms_remark}
                      onChange={(e) => set_symptoms_remark(e.target.value)}
                    />
                  </Form.Group>


                  <Form.Group className="mb-3" controlId="remarksInput" style={{ color: '#708090', paddingLeft: 10 }}>
                    <Form.Label style={{ fontWeight: 'bold' }}>Medication</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Medication"
                      value={general_health_medication}
                      onChange={(e) => set_general_health_medication(e.target.value)}
                    />
                  </Form.Group>

                  {/* <Form.Group className="mb-3" controlId="remarksInput" style={{ color: '#708090', paddingLeft: 10 }}>
                    <Form.Label style={{ fontWeight: 'bold' }}>Allergies</Form.Label>
                    <Form.Control type="text" placeholder="Allergies" value={general_health_allergies} onChange={(e) => set_general_health_allergies(e.target.value)} />
                  </Form.Group> */}
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" style={{ height: '220px' }}>
                    <Form.Label style={{ fontWeight: 'bold' }}>General Health</Form.Label>
                    <div>
                      {generalhealth.map((p, i) => (
                        <Form.Check
                          key={i}
                          type="checkbox"
                          label={p.text}
                          value={p.text}
                          checked={general_health.includes(p.text)}
                          onChange={(e) => {
                            let updated;
                            if (e.target.checked) {
                              // Add selected option
                              updated = [...general_health.split(", ").filter(Boolean), p.text];
                            } else {
                              // Remove unselected option
                              updated = general_health
                                .split(", ")
                                .filter((val) => val !== p.text);
                            }
                            set_general_health(updated.join(", "));
                          }}
                        />
                      ))}
                    </div>
                  </Form.Group>



                  <Form.Group className="mb-4" controlId="remarksInput" style={{ color: '#708090', paddingLeft: 10 }}>
                    <Form.Label>Remark</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter General Health Remarks"
                      value={general_health_remark}
                      onChange={(e) => set_general_health_remark(e.target.value)}
                    />
                  </Form.Group>


                  <Form.Group className="mb-3" style={{ height: '400px' }}>
                    <Form.Label style={{ fontWeight: 'bold' }}>Occular Health</Form.Label>
                    <div>
                      {occularhealth.map((p, i) => (
                        <Form.Check
                          key={i}
                          type="checkbox"
                          label={p.text}
                          value={p.text}
                          checked={occular_health.includes(p.text)}
                          onChange={(e) => {
                            let updated;
                            if (e.target.checked) {
                              // Add selected option
                              updated = [...occular_health.split(", ").filter(Boolean), p.text];
                            } else {
                              // Remove unselected option
                              updated = occular_health
                                .split(", ")
                                .filter((val) => val !== p.text);
                            }
                            set_occular_health(updated.join(", "));
                          }}
                        />
                      ))}
                    </div>
                  </Form.Group>



                  <Form.Group className="mb-3" controlId="remarksInput" style={{ color: '#708090', paddingLeft: 10 }}>
                    <Form.Label>Remark</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Occular Health Remarks"
                      value={occular_health_remark}
                      onChange={(e) => set_occular_health_remark(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="remarksInput" style={{ color: '#708090', paddingLeft: 10 }}>
                    <Form.Label style={{ fontWeight: 'bold' }}>Allergies</Form.Label>
                    <Form.Control type="text" placeholder="Allergies" value={general_health_allergies} onChange={(e) => set_general_health_allergies(e.target.value)} />
                  </Form.Group>
                  {/* <h6 className="mt-4 fw-bold mb-4">Type of Lenses Used</h6>
                  <Form.Group className="mb-3">
                    {typeofLense.map((t) => (
                      <Form.Check
                        key={t.tol_id}
                        inline
                        type="radio"
                        label={t.text} // show each lens type
                        id={`radio-${t.text}`}
                        value={t.text}
                        className="custom-radio"
                        checked={type_of_lenses_used === t.text} // mark correct one as selected
                        onChange={(e) => set_type_of_lenses_used(e.target.value)}
                      />
                    ))}
                  </Form.Group> */}
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label style={{ fontWeight: 'bold' }}>Type of Lenses Used</Form.Label>
                  <Form.Group className="mb-3">
                    {typeofLense.map((t) => (
                      <Form.Check
                        key={t.tol_id}
                        inline
                        type="radio"
                        label={t.text} // show each lens type
                        id={`radio-${t.text}`}
                        value={t.text}
                        className="custom-radio"
                        checked={type_of_lenses_used === t.text} // mark correct one as selected
                        onChange={(e) => set_type_of_lenses_used(e.target.value)}
                      />
                    ))}
                  </Form.Group></Col>
              </Row>
            </Container>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={UpdateAssistanceDetails}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OptometristOrders;




