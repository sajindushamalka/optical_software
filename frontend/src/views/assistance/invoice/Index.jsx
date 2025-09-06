import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Tabs, Tab, Form, Container, Button, Modal, FormControl, Table } from 'react-bootstrap';
import avatar1 from '../../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../../assets/images/user/avatar-3.jpg';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AssistanceInvoice = () => {
  const [allUsers, setAllUsers] = useState(['']);
  const [LensMaterial, setLensMaterial] = useState(['']);
  const [LensesType, setLensesType] = useState(['']);
  const [LensTreatment, setLensTreatment] = useState(['']);
  const [LensColour, setLensColour] = useState(['']);
  const [LensSize, setLensSize] = useState(['']);
  const [LensBase, setLensBase] = useState(['']);
  const [LensBrand, setLensBrand] = useState(['']);
  const [LensesAt, setLensesAt] = useState(['']);
  const [FrameCategory, setFrameCategory] = useState(['']);
  const [FrameMaterial, setFrameMaterial] = useState(['']);
  const [Frametype, setFrametype] = useState(['']);
  const [FrameColor, setFrameColor] = useState(['']);
  const [DoctorRx, setDoctorRx] = useState(['']);
  const [TestedBy, setTestedBy] = useState(['']);
  const [EnteredBy, setEnteredBy] = useState(['']);
  const [allPage, setAllPage] = useState(1);
  const allPerPage = 5;
  const [searchTerm, setSearchTerm] = useState('');
  const [isSelecetOne, setIsSelectOne] = useState(false);
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:2776/api/order/assitance/process')
      .then((res) => setAllUsers(res.data))
      .catch((err) => console.log(err));

    axios
      .get('http://localhost:2776/api/root/lense')
      .then((res) => setLensMaterial(res.data))
      .catch((err) => console.log(err));

    axios
      .get('http://localhost:2776/api/root/lense/type')
      .then((res) => setLensesType(res.data))
      .catch((err) => console.log(err));

    axios
      .get('http://localhost:2776/api/root/lense/treatment')
      .then((res) => setLensTreatment(res.data))
      .catch((err) => console.log(err));

    axios
      .get('http://localhost:2776/api/root/lense/colour')
      .then((res) => setLensColour(res.data))
      .catch((err) => console.log(err));

    axios
      .get('http://localhost:2776/api/root/lense/size')
      .then((res) => setLensSize(res.data))
      .catch((err) => console.log(err));

    axios
      .get('http://localhost:2776/api/root/lense/base')
      .then((res) => setLensBase(res.data))
      .catch((err) => console.log(err));

    axios
      .get('http://localhost:2776/api/root/lense/brand')
      .then((res) => setLensBrand(res.data))
      .catch((err) => console.log(err));

    axios
      .get('http://localhost:2776/api/root/lense/at')
      .then((res) => setLensesAt(res.data))
      .catch((err) => console.log(err));

    axios
      .get('http://localhost:2776/api/root/frame/category')
      .then((res) => setFrameCategory(res.data))
      .catch((err) => console.log(err));

    axios
      .get('http://localhost:2776/api/root/frame/material')
      .then((res) => setFrameMaterial(res.data))
      .catch((err) => console.log(err));

    axios
      .get('http://localhost:2776/api/root/frame/type')
      .then((res) => setFrametype(res.data))
      .catch((err) => console.log(err));

    axios
      .get('http://localhost:2776/api/root/frame/color')
      .then((res) => setFrameColor(res.data))
      .catch((err) => console.log(err));

    axios
      .get('http://localhost:2776/api/root/doctor')
      .then((res) => setDoctorRx(res.data))
      .catch((err) => console.log(err));

    axios
      .get('http://localhost:2776/api/root/test')
      .then((res) => setTestedBy(res.data))
      .catch((err) => console.log(err));

    axios
      .get('http://localhost:2776/api/root/enter')
      .then((res) => setEnteredBy(res.data))
      .catch((err) => console.log(err));
  }, []);

  const today = new Date().toLocaleDateString();

  const searchFilteredUsers = allUsers.filter((user) =>
    Object.values(user).some((value) => value?.toString().toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  const allIndexLast = allPage * allPerPage;
  const allIndexFirst = allIndexLast - allPerPage;
  const paginatedAllUsers = searchFilteredUsers.slice(allIndexFirst, allIndexLast);
  const allTotalPages = Math.ceil(searchFilteredUsers.length / allPerPage);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedcmd_id, setSelectedcmd_id] = useState(null);
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
  const [report_status, set_report_status] = useState('');
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
  const [Lens_Material, setLens_Material] = useState('');
  const [Lenses_Type, setLenses_Type] = useState('');
  const [Lens_Treatment, setLens_Treatment] = useState('');
  const [Lens_Colour, setLens_Colour] = useState('');
  const [Lens_Size, setLens_Size] = useState('');
  const [Lens_Base, setLens_Base] = useState('');
  const [Lens_Brand, setLens_Brand] = useState('');
  const [Lenses_At, setLenses_At] = useState('');
  const [Lens_Price, setLens_Price] = useState('');
  const [Lens_OrderDate, setLens_OrderDate] = useState('');
  const [Lens_wanted_on, setLens_wanted_on] = useState('');
  const [Frame_Category, setFrame_Category] = useState('');
  const [Frame_Material, setFrame_Material] = useState('');
  const [Frame_type, setFrame_type] = useState('');
  const [Frame_Brand, setFrame_Brand] = useState('');
  const [Model_number, setModel_number] = useState('');
  const [Colour, setColour] = useState('');
  const [Front_size, setFront_size] = useState('');
  const [Bridge_size, setBridge_size] = useState('');
  const [Arm_Size, setArm_Size] = useState('');
  const [PD, setPD] = useState('');
  const [SEG, setSEG] = useState('');
  const [Lense_Description, setLense_Description] = useState('');
  const [Freame_Description, setFreame_Description] = useState('');
  const [Doctor_Rx, setDoctor_Rx] = useState('');
  const [Tested_By, setTested_By] = useState('');
  const [Entered_By, setEntered_By] = useState('');

  const selectedUserdetailsFetch = async (a) => {
    setSelectedUserId(a.c_id);
    setSelectedcmd_id(a.cmd_id);
    setIsSelectOne(true);
    set_purpose_of_visit(a.purpose_of_visit)
    set_purpose_of_visit_remark(a.purpose_of_visit_remark)
    set_occular_health(a.occular_health)
    set_occular_health_remark(a.occular_health_remark)
    set_general_health(a.general_health)
    set_general_health_medication(a.general_health_medication)
    set_general_health_allergies(a.general_health_allergies)
    set_general_health_remark(a.general_health_remark)
    set_symptoms(a.symptoms)
    set_symptoms_remark(a.symptoms_remark)
    set_type_of_lenses_used(a.type_of_lenses_used)
    set_report_status(a.report_status)
    set_HABI_OD_SPH(a.HABI_OD_SPH)
    set_HABI_OD_CYL(a.HABI_OD_CYL)
    set_HABI_OD_AXIS(a.HABI_OD_AXIS)
    set_HABI_OD_Prim(a.HABI_OD_Prim)
    set_HABI_OD_Prim(a.HABI_OD_Prim)
    set_HABI_OD_Base(a.HABI_OD_Base)
    set_HABI_OD_VA(a.HABI_OD_VA)
    set_HABI_OD_type_near_full(a.HABI_OD_type_near_full)
    set_HABI_OD_type_near_va(a.HABI_OD_type_near_va)
    set_HABI_OS_SPH(a.HABI_OS_SPH)
    set_HABI_OS_CYL(a.HABI_OS_CYL)
    set_HABI_OS_AXIS(a.HABI_OS_AXIS)
    set_HABI_OS_Prim(a.HABI_OS_Prim)
    set_HABI_OS_Base(a.HABI_OS_Base)
    set_HABI_OS_VA(a.HABI_OS_VA)
    set_HABI_OS_type_near_full(a.HABI_OS_type_near_full)
    set_HABI_OS_type_near_va(a.HABI_OS_type_near_va)

    axios.get(`http://localhost:2776/api/order/assitance/subjective/${a.cmd_id}`).then((res) => {
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

    axios.get(`http://localhost:2776/api/order/assitance/objective/${a.cmd_id}`).then((res) => {
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

    axios.get(`http://localhost:2776/api/order/assitance/contact/${a.cmd_id}`).then((res) => {
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

  };

  const submitInvocie = async () => {
    const date = formatDate(today);
    const ob = {
      date: date,
      cmd_id: selectedcmd_id,
      Lens_Material,
      Lenses_Type,
      Lens_Treatment,
      Lens_Colour,
      Lens_Size,
      Lens_Base,
      Lens_Brand,
      Lenses_At,
      Lens_Price,
      Lens_OrderDate,
      Lens_wanted_on,
      Frame_Category,
      Frame_Material,
      Frame_type,
      Frame_Brand,
      Model_number,
      Colour,
      Front_size,
      Bridge_size,
      Arm_Size,
      PD,
      SEG,
      Lense_Description,
      Freame_Description,
      Doctor_Rx,
      Tested_By,
      Entered_By
    }
    await axios.post('http://localhost:2776/api/order/assitance/second', ob).then((res) => {
      console.log(res.data)
      axios.put(`http://localhost:2776/api/order/assitance/update/${selectedcmd_id}`).then((res) => {
        console.log(res.data)
        toast.success("Order Updated!")
      }).catch((err) => {
        console.log(err)
        toast.error("Error!")
      })
    }).catch((err) => {
      toast.error("Error!")
    })
  };

  console.log(Lens_Base)

  return (
    <React.Fragment>
      <Row>
        <Col md={12} xl={12} className="user-activity">
          <Card>
            <Card.Header>
              <Container>
                <Row>
                  <Col>
                    <Card.Title as="h5" style={{ fontWeight: 'bold', paddingBlock: 5 }}>
                      Recent Invoices
                    </Card.Title>
                  </Col>
                </Row>
              </Container>

              <Form.Control
                type="text"
                placeholder="Search users..."
                className="mt-2"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                  setAllPage(1);
                }}
              />
            </Card.Header>
            <Tabs defaultActiveKey="all" id="uncontrolled-tab-example">
              <Tab eventKey="all" title="All">
                {paginatedAllUsers.map((a, ind) => {
                  const isSelected = selectedUserId === a.c_id;
                  const isDimmed = selectedUserId !== null && !isSelected;

                  return (
                    <div
                      key={ind}
                      className={`d-flex friendlist-box align-items-center justify-content-center m-b-10 m-t-20 ${isDimmed ? 'dimmed-user' : ''}`}
                      style={{ opacity: isDimmed ? 0.4 : 1, transition: 'opacity 0.3s ease' }}
                    >
                      <div className="m-r-10 photo-table flex-shrink-0">
                        <img
                          className="rounded-circle"
                          style={{ width: '40px' }}
                          src={a.gender === 'male' ? avatar2 : a.gender === 'female' ? avatar3 : avatar1}
                          alt="activity-user"
                        />
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <span className="float-end d-flex align-items-center">
                          <i
                            className={`fa fa-caret-down f-22 m-r-10 ${isSelected ? 'text-c-green' : 'text-c-red'}`}
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              // perform other actions here
                              selectedUserdetailsFetch(a);
                            }}
                          />
                          # {a.c_id}
                        </span>
                        <h6 className="m-0 d-inline fw-bold">{a.name}</h6>
                        <h6 className="m-3 d-inline">{a.email}</h6>
                        <h6 className="m-3 d-inline">{a.age}</h6>
                        <h6 className="m-3 d-inline">{a.telephone}</h6>
                        <h6 className="m-3 d-inline">{a.nic}</h6>
                        <h6 className="m-3 d-inline">{new Date(a.dob).toLocaleDateString()}</h6>
                        <br />
                        <h6 className="m-0 d-inline">{a.address}</h6>
                      </div>
                    </div>
                  );
                })}

                <div className="d-flex justify-content-center mt-3">
                  <button
                    className="btn btn-outline-secondary m-1 btn-sm"
                    onClick={() => setAllPage((prev) => Math.max(prev - 1, 1))}
                    disabled={allPage === 1}
                  >
                    Prev
                  </button>
                  <span className="m-2">
                    Page {allPage} of {allTotalPages}
                  </span>
                  <button
                    className="btn btn-outline-secondary m-1 btn-sm"
                    onClick={() => setAllPage((prev) => Math.min(prev + 1, allTotalPages))}
                    disabled={allPage === allTotalPages}
                  >
                    Next
                  </button>
                </div>
              </Tab>
            </Tabs>
          </Card>
        </Col>
      </Row>
      {isSelecetOne ? (
        <Card>
          <Card.Header>
            <Container>
              <Row>
                <Col>
                  <Card.Title as="h5" style={{ fontWeight: 'bold' }}>
                    Report Deatils
                  </Card.Title>
                </Col>
              </Row>
            </Container>
          </Card.Header>
          <Card.Body>
            <div className=" mt-4 rounded">
              <h5 className="mb-4 text-primary" style={{ fontWeight: '600' }}>
                🧑‍⚕️ Medical Report Information
              </h5>

              <Row>
                <Col md={3} className="mb-4">
                  <small className="text-muted d-block mb-1">Purpose of Visit</small>
                  <h6 className="mb-2">{purpose_of_visit || 'N/A'}</h6>
                  <small className="text-muted d-block mb-1">Remarks</small>
                  <h6 className="mb-0">{purpose_of_visit_remark || 'N/A'}</h6>
                  <small className="text-muted d-block mt-5 mb-1">Type of Lenses used</small>
                  <h6 className="mb-0">{type_of_lenses_used || 'N/A'}</h6>
                </Col>

                <Col md={3} className="mb-4">
                  <small className="text-muted d-block mb-1">General Health</small>
                  <h6 className="mb-2">{general_health || 'N/A'}</h6>
                  <small className="text-muted d-block mb-1">Remarks</small>
                  <h6 className="mb-2">{general_health_remark || 'N/A'}</h6>
                  <small className="text-muted d-block mb-1">Allergies</small>
                  <h6 className="mb-2">{general_health_allergies || 'N/A'}</h6>
                  <small className="text-muted d-block mb-1">Medication</small>
                  <h6 className="mb-0">{general_health_medication || 'N/A'}</h6>
                </Col>

                <Col md={3} className="mb-4">
                  <small className="text-muted d-block mb-1">Occular Health</small>
                  <h6 className="mb-2">{occular_health || 'N/A'}</h6>
                  <small className="text-muted d-block mb-1">Remarks</small>
                  <h6 className="mb-0">{occular_health_remark || 'N/A'}</h6>
                </Col>

                <Col md={3} className="mb-4">
                  <small className="text-muted d-block mb-1">Symptoms</small>
                  <h6 className="mb-2">{symptoms || 'N/A'}</h6>
                  <small className="text-muted d-block mb-1">Remarks</small>
                  <h6 className="mb-0">{symptoms_remark || 'N/A'}</h6>
                </Col>
              </Row>
            </div>
          </Card.Body>


          <h6 className="mt-3 text-success" style={{ fontWeight: '600', padding: 5, marginLeft: 15 }}>
            Habitual Rx - Assistance Informations
          </h6>
          <Row style={{ padding: 15 }}>
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
              <h6 className="text-success" style={{ fontWeight: '600', padding: 5, marginLeft: 15 }}>
                Rx For Spectacles - Optometrist Informations
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
                              type="text"
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
                              type="text"
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

              <h6 className="mt-2 text-success" style={{ fontWeight: '600', padding: 5, marginLeft: 15 }}>
                Reading Total - Optometrist Informations
              </h6>

              <Row style={{ padding: 15 }}>
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
                              value={SPEC_RE_OD_SPH}
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
                              value={SPEC_RE_OS_SPH}
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
              <Row style={{ padding: 15 }}>
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
              <h6 style={{ fontWeight: '600', marginTop: 15 }}>Recommendation</h6>
              <Row style={{ padding: 15, textAlign: 'center' }}>
                <Col md={4}>
                  <small className="text-muted d-blockmb-1">Prescribe Spectacle</small>
                  <h6 className="mb-0">{SPEC_Type_Of_lenses_Used || 'N/A'}</h6>
                </Col>
                <Col md={4}>
                  <small className="text-muted d-blockmb-1">_</small>
                  <h6 className="mb-0">{SPEC_Time_Period || 'N/A'}</h6>
                </Col>
                <Col md={4}>
                  <small className="text-muted d-blockmb-1">Lens Recommendatio</small>
                  <h6 className="mb-0">{SPEC_Time_More || 'N/A'}</h6>
                </Col>
              </Row>
              <Row>
                <Col md={12} style={{ padding: 20 }}>
                  <small className="text-muted d-blockmb-1">Remark</small>
                  <h6 className="mb-0">{SPEC_remark || 'N/A'}</h6>
                </Col>
              </Row>
            </Tab>
            <Tab eventKey="Objective" title="Objective">
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
            </Tab>
            <Tab eventKey="Contact Lenses" title="Contact Lenses">
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
                <Form.Control as="textarea" rows="3" value={SPECCON_remark} />
              </Form.Group>
            </Tab>
          </Tabs>


          <Row className="align-items-center py-3 px-2 bg-light rounded shadow-sm" style={{ margin: '1rem' }}>
            <Col md={6} style={{ textAlign: 'center' }}>
              <div>
                <h6 className="mb-3">Lens Description</h6>
              </div>
              <Table bordered hover responsive className="table-sm align-middle shadow-sm">
                <thead className="bg-primary text-white text-center">
                </thead>
                <tbody className="text-center">
                  <tr>
                    <td>01</td>
                    <td>Lens Material</td>
                    <td>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Select
                          value={Lens_Material}
                          onChange={(e) => setLens_Material(e.target.value)}
                        >
                          <option value="">-- Lens Material --</option>
                          {LensMaterial.map((remark, index) => (
                            <option key={index} value={remark.text}>
                              {remark.text}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </td>
                  </tr>
                  <tr>
                    <td>02</td>
                    <td>Lenses Type</td>
                    <td>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Select
                          value={Lenses_Type}
                          onChange={(e) => setLenses_Type(e.target.value)}
                        >
                          <option value="">-- Lenses_Type --</option>
                          {LensesType.map((remark, index) => (
                            <option key={index} value={remark.text}>
                              {remark.text}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </td>
                  </tr>
                  <tr>
                    <td>03</td>
                    <td>Lens Treatment</td>
                    <td>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Select
                          value={Lens_Treatment}
                          onChange={(e) => setLens_Treatment(e.target.value)}
                        >
                          <option value="">-- Lens Treatment --</option>
                          {LensTreatment.map((remark, index) => (
                            <option key={index} value={remark.text}>
                              {remark.text}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </td>
                  </tr>
                  <tr>
                    <td>04</td>
                    <td>Lens Colour</td>
                    <td>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Select
                          value={Lens_Colour}
                          onChange={(e) => setLens_Colour(e.target.value)}
                        >
                          <option value="">-- Lens Colour --</option>
                          {LensColour.map((remark, index) => (
                            <option key={index} value={remark.text}>
                              {remark.text}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </td>
                  </tr>
                  <tr>
                    <td>05</td>
                    <td>Lens Size</td>
                    <td>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Select
                          value={Lens_Size}
                          onChange={(e) => setLens_Size(e.target.value)}
                        >
                          <option value="">-- Lens Size --</option>
                          {LensSize.map((remark, index) => (
                            <option key={index} value={remark.text}>
                              {remark.text}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </td>
                  </tr>
                  <tr>
                    <td>06</td>
                    <td>Lens Base</td>
                    <td>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Select
                          value={Lens_Base}
                          onChange={(e) => setLens_Base(e.target.value)}
                        >
                          <option value="">-- Lens Base --</option>
                          {LensBase.map((remark, index) => (
                            <option key={index} value={remark.text}>
                              {remark.text}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </td>
                  </tr>
                  <tr>
                    <td>07</td>
                    <td>Lens Brand</td>
                    <td>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Select
                          value={Lens_Brand}
                          onChange={(e) => setLens_Brand(e.target.value)}
                        >
                          <option value="">-- Lens Brand --</option>
                          {LensBrand.map((remark, index) => (
                            <option key={index} value={remark.text}>
                              {remark.text}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </td>
                  </tr>
                  <tr>
                    <td>08</td>
                    <td>Lenses At</td>
                    <td>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Select
                          value={Lenses_At}
                          onChange={(e) => setLenses_At(e.target.value)}
                        >
                          <option value="">-- Lenses At --</option>
                          {LensesAt.map((remark, index) => (
                            <option key={index} value={remark.text}>
                              {remark.text}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </td>
                  </tr>
                  <tr>
                    <td>09</td>
                    <td>Lens Price</td>
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
                          value={Lens_Price}
                          onChange={(e) => setLens_Price(e.target.value)}
                        />
                      </Form.Group>
                    </td>
                  </tr>
                  <tr>
                    <td>10</td>
                    <td>Lens order Date</td>
                    <td>
                      <Form.Group controlId="lensOrderDate">
                        <Form.Control
                          type="date"
                          value={Lens_OrderDate}
                          onChange={(e) => setLens_OrderDate(e.target.value)}
                        />
                      </Form.Group>
                    </td>
                  </tr>
                  <tr>
                    <td>11</td>
                    <td>Lens wanted on</td>
                    <td>
                      <Form.Group controlId="lensOrderDate">
                        <Form.Control
                          type="date"
                          value={Lens_wanted_on}
                          onChange={(e) => setLens_wanted_on(e.target.value)}
                        />
                      </Form.Group>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Remarks</Form.Label>
                <Form.Control as="textarea" rows="3" onChange={(e) => setLense_Description(e.target.value)} />
              </Form.Group>
            </Col>
            <Col md={6} style={{ textAlign: 'center' }}>
              <div>
                <h6 className="mb-3">Frame Description</h6>
              </div>
              <Table bordered hover responsive className="table-sm align-middle shadow-sm">
                <thead className="bg-primary text-white text-center">
                </thead>
                <tbody className="text-center">
                  <tr>
                    <td>01</td>
                    <td>Frame Category</td>
                    <td>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Select
                          value={Frame_Category}
                          onChange={(e) => setFrame_Category(e.target.value)}
                        >
                          <option value="">-- Frame Category --</option>
                          {FrameCategory.map((remark, index) => (
                            <option key={index} value={remark.text}>
                              {remark.text}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </td>
                  </tr>
                  <tr>
                    <td>02</td>
                    <td>Frame Material </td>
                    <td>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Select
                          value={Frame_Material}
                          onChange={(e) => setFrame_Material(e.target.value)}
                        >
                          <option value="">-- Frame Material --</option>
                          {FrameMaterial.map((remark, index) => (
                            <option key={index} value={remark.text}>
                              {remark.text}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </td>
                  </tr>
                  <tr>
                    <td>03</td>
                    <td>Frame type</td>
                    <td>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Select
                          value={Frame_type}
                          onChange={(e) => setFrame_type(e.target.value)}
                        >
                          <option value="">-- Frame type --</option>
                          {Frametype.map((remark, index) => (
                            <option key={index} value={remark.text}>
                              {remark.text}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </td>
                  </tr>
                  <tr>
                    <td>04</td>
                    <td>Frame Brand</td>
                    <td>
                      <Form.Group className="mb-0" controlId="formBasicFloat">
                        <Form.Control
                          type="text"
                          step="any"
                          style={{
                            border: 'none',
                            width: '',
                            padding: '6px 8px',
                            textAlign: 'center'
                          }}
                          value={Frame_Brand}
                          onChange={(e) => setFrame_Brand(e.target.value)}
                        />
                      </Form.Group>
                    </td>
                  </tr>
                  <tr>
                    <td>05</td>
                    <td>Model number</td>
                    <td>
                      <Form.Group className="mb-0" controlId="formBasicFloat">
                        <Form.Control
                          type="text"
                          step="any"
                          style={{
                            border: 'none',
                            width: '',
                            padding: '6px 8px',
                            textAlign: 'center'
                          }}
                          value={Model_number}
                          onChange={(e) => setModel_number(e.target.value)}
                        />
                      </Form.Group>
                    </td>
                  </tr>
                  <tr>
                    <td>06</td>
                    <td>Colour</td>
                    <td>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Select
                          value={Colour}
                          onChange={(e) => setColour(e.target.value)}
                        >
                          <option value="">-- Lens Base --</option>
                          {FrameColor.map((remark, index) => (
                            <option key={index} value={remark.text}>
                              {remark.text}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </td>
                  </tr>
                  <tr>
                    <td>07</td>
                    <td>Front size</td>
                    <td>
                      <Form.Group className="mb-0" controlId="formBasicFloat">
                        <Form.Control
                          type="text"
                          step="any"
                          style={{
                            border: 'none',
                            width: '',
                            padding: '6px 8px',
                            textAlign: 'center'
                          }}
                          value={Front_size}
                          onChange={(e) => setFront_size(e.target.value)}
                        />
                      </Form.Group>
                    </td>
                  </tr>
                  <tr>
                    <td>08</td>
                    <td>Bridge size</td>
                    <td>
                      <Form.Group className="mb-0" controlId="formBasicFloat">
                        <Form.Control
                          type="text"
                          step="any"
                          style={{
                            border: 'none',
                            width: '',
                            padding: '6px 8px',
                            textAlign: 'center'
                          }}
                          value={Bridge_size}
                          onChange={(e) => setBridge_size(e.target.value)}
                        />
                      </Form.Group>
                    </td>
                  </tr>
                  <tr>
                    <td>09</td>
                    <td>Arm Size</td>
                    <td>
                      <Form.Group className="mb-0" controlId="formBasicFloat">
                        <Form.Control
                          type="text"
                          step="any"
                          style={{
                            border: 'none',
                            width: '',
                            padding: '6px 8px',
                            textAlign: 'center'
                          }}
                          value={Arm_Size}
                          onChange={(e) => setArm_Size(e.target.value)}
                        />
                      </Form.Group>
                    </td>
                  </tr>
                  <tr>
                    <td>10</td>
                    <td>PD</td>
                    <td>
                      <Form.Group className="mb-0" controlId="formBasicFloat">
                        <Form.Control
                          type="text"
                          step="any"
                          style={{
                            border: 'none',
                            width: '',
                            padding: '6px 8px',
                            textAlign: 'center'
                          }}
                          value={PD}
                          onChange={(e) => setPD(e.target.value)}
                        />
                      </Form.Group>
                    </td>
                  </tr>
                  <tr>
                    <td>11</td>
                    <td>SEG</td>
                    <td>
                      <Form.Group className="mb-0" controlId="formBasicFloat">
                        <Form.Control
                          type="text"
                          step="any"
                          style={{
                            border: 'none',
                            width: '',
                            padding: '6px 8px',
                            textAlign: 'center'
                          }}
                          value={SEG}
                          onChange={(e) => setSEG(e.target.value)}
                        />
                      </Form.Group>
                    </td>
                  </tr>
                </tbody>
              </Table>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Remarks</Form.Label>
                <Form.Control as="textarea" rows="3" onChange={(e) => setFreame_Description(e.target.value)} />
              </Form.Group>

            </Col>
            <Col md={4}>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Doctor Rx</Form.Label>
                <Form.Select
                  value={Doctor_Rx}
                  onChange={(e) => setDoctor_Rx(e.target.value)}
                >
                  <option value="">-- Doctor Rx --</option>
                  {DoctorRx.map((remark, index) => (
                    <option key={index} value={remark.text}>
                      {remark.text}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Tested By</Form.Label>
                <Form.Select
                  value={Tested_By}
                  onChange={(e) => setTested_By(e.target.value)}
                >
                  <option value="">-- Tested By --</option>
                  {TestedBy.map((remark, index) => (
                    <option key={index} value={remark.text}>
                      {remark.text}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Entered By</Form.Label>
                <Form.Select
                  value={Entered_By}
                  onChange={(e) => setEntered_By(e.target.value)}
                >
                  <option value="">-- Entered By --</option>
                  {EnteredBy.map((remark, index) => (
                    <option key={index} value={remark.text}>
                      {remark.text}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            {/* <Col md={4}>
              <Form.Group controlId="formBasicFloat">
                <Form.Control
                  type="text"
                  step="any"
                  placeholder="Blue Cut"
                  className="text-center"
                  style={{
                    border: '1px solid #ced4da',
                    borderRadius: '0.375rem',
                    height: '40px',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
                  }}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </Form.Group>
            </Col> */}



            <Col md={3} style={{ marginTop: 40 }}>
              <Button variant="outline-primary" size="sm" className="px-4" onClick={submitInvocie}>
                Submit
              </Button>
            </Col>
          </Row>
        </Card>
      ) : null}
    </React.Fragment>
  );
};

export default AssistanceInvoice;
