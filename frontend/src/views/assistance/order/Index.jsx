import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Tabs, Tab, Form, Container, Button, Modal, FormControl, Table, Dropdown, ListGroup } from 'react-bootstrap';
import avatar1 from '../../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../../assets/images/user/avatar-3.jpg';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { BsArrowCounterclockwise } from "react-icons/bs";
import { BsCalendarDate } from "react-icons/bs";
import { title } from 'process';

const AssistanceOrder = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [purposeofvisit, setpurposeofvisit] = useState([]);
  const [generalhealth, setgeneralhealth] = useState([]);
  const [symptoms_list, setsymptoms_list] = useState([]);
  const [occularhealth, setoccularhealth] = useState([]);
  const [typeofLense, settypeofLense] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [allPage, setAllPage] = useState(1);
  const allPerPage = 5;

  const [allPage1, setAllPage1] = useState(1);
  const allPerPage1 = 5;

  const [searchTerm, setSearchTerm] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  const [prevOrders, setPrevOrders] = useState([]);
  const [todayNo, setTodayNo] = useState(1);
  const [showEditModal2, setShowEditModal2] = useState(false);
  const [editData, setEditData] = useState(''); // copy current customer data
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatDate2 = (date) => {
    return date.toISOString().split("T")[0]; // YYYY-MM-DD
  };

  const today2 = new Date();

  const [todayNo2, setTodayNo2] = useState(1);

  useEffect(() => {
    // Get stored date + counter
    const storedDate = localStorage.getItem("todayDate");
    const storedNo = localStorage.getItem("todayNo");

    const currentDate = formatDate2(today2);

    if (storedDate === currentDate && storedNo) {
      setTodayNo2(parseInt(storedNo, 10)); // continue sequence
    } else {
      // Reset for new day
      localStorage.setItem("todayDate", currentDate);
      localStorage.setItem("todayNo", 1);
      setTodayNo2(1);
    }
  }, []);


  const today = new Date().toLocaleDateString();
  const todayDate = formatDate(today);

  useEffect(() => {
    axios
      .get('http://localhost:2776/api/customer')
      .then((res) => setAllUsers(res.data))
      .catch((err) => console.log(err));

    // axios
    //   .get('http://localhost:2776/api/order/1')
    //   .then((res) => setPrevOrders(res.data))
    //   .catch((err) => console.log(err));

    // const savedDate = localStorage.getItem("lastDate");
    // const savedCount = localStorage.getItem("todayNo");

    // if (savedDate === todayDate) {
    //   setTodayNo(Number(savedCount) + 1);
    // } else {
    //   setTodayNo(1);
    // }

    // // Save on mount
    // localStorage.setItem("lastDate", todayDate);
    // localStorage.setItem("todayNo", 1);

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
  }, []);


  const searchFilteredUsers = allUsers.filter((user) =>
    Object.values(user).some((value) => value?.toString().toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredTodayUsers = searchFilteredUsers.filter((a) => new Date(a.reg_date).toLocaleDateString() === today);

  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  const filteredThisWeekUsers = searchFilteredUsers.filter((user) => {
    const regDate = new Date(user.reg_date);
    return regDate >= startOfWeek && regDate <= endOfWeek;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredTodayUsers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTodayUsers.length / itemsPerPage);
  const allIndexLast = allPage * allPerPage;
  const allIndexFirst = allIndexLast - allPerPage;
  const paginatedAllUsers = searchFilteredUsers.slice(allIndexFirst, allIndexLast);
  const allTotalPages = Math.ceil(searchFilteredUsers.length / allPerPage);
  const indexOfLastItem1 = allPage1 * allPerPage1;
  const indexOfFirstItem1 = indexOfLastItem1 - allPerPage1;
  const currentUsersWeek = filteredThisWeekUsers.slice(indexOfFirstItem1, indexOfLastItem1);
  const allTotalPagesWeek = Math.ceil(currentUsersWeek.length / allPerPage1);
  const [dob, setDob] = useState(new Date('2000-01-01'));
  const [dob1, setDob1] = useState(new Date('2000-01-01'));
  const [age, setAge] = useState(0);
  const [name, setname] = useState('NULL');
  const [firstName, setfirstName] = useState('NULL');
  const [address, setaddress] = useState('NULL');
  const [city, setcity] = useState('NULL');
  const [email, setemail] = useState('NULL');
  const [telephone, settelephone] = useState(0);
  const [occupation, setoccupation] = useState('NULL');
  const [mobile2, setmobile2] = useState(0);
  const [lanMobile, setlanMobile] = useState(0);
  const [nic, setnic] = useState('');
  const [gender, setgender] = useState('NULL');
  const [titles, settitles] = useState('NULL');
  const [reg_date, setreg_date] = useState(today);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserEMail, setSelectedUserEmail] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);


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
  const [Oprimistic_Filed, set_Oprimistic_Filed] = useState('');

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
  const [Oprimistic_Filed2, set_Oprimistic_Filed2] = useState('');

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
  const [Oprimistic_Filed3, set_Oprimistic_Filed3] = useState('');

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
  const [Oprimistic_Filed4, set_Oprimistic_Filed4] = useState('');
  const [date, set_Date] = useState('');
  const [Button_Show_Status, set_Button_Show_Status] = useState(true);

  const handleSelect = (user) => {
    set_Button_Show_Status(false)
    set_purpose_of_visit(user.purpose_of_visit)
    set_Date(user.date)
    set_purpose_of_visit_remark(user.purpose_of_visit_remark)
    set_occular_health(user.occular_health)
    set_occular_health_remark(user.occular_health_remark)
    set_general_health(user.general_health)
    set_general_health_medication(user.general_health_medication)
    set_general_health_allergies(user.general_health_allergies)
    set_general_health_remark(user.general_health_remark)
    set_symptoms(user.symptoms)
    set_symptoms_remark(user.symptoms_remark)
    set_type_of_lenses_used(user.type_of_lenses_used)
    set_report_status(user.report_status)
    set_HABI_OD_SPH(user.HABI_OD_SPH)
    set_HABI_OD_CYL(user.HABI_OD_CYL)
    set_HABI_OD_AXIS(user.HABI_OD_AXIS)
    set_HABI_OD_Prim(user.HABI_OD_Prim)
    set_HABI_OD_Prim(user.HABI_OD_Prim)
    set_HABI_OD_Base(user.HABI_OD_Base)
    set_HABI_OD_VA(user.HABI_OD_VA)
    set_HABI_OD_type_near_full(user.HABI_OD_type_near_full)
    set_HABI_OD_type_near_va(user.HABI_OD_type_near_va)
    set_HABI_OS_SPH(user.HABI_OS_SPH)
    set_HABI_OS_CYL(user.HABI_OS_CYL)
    set_HABI_OS_AXIS(user.HABI_OS_AXIS)
    set_HABI_OS_Prim(user.HABI_OS_Prim)
    set_HABI_OS_Base(user.HABI_OS_Base)
    set_HABI_OS_VA(user.HABI_OS_VA)
    set_HABI_OS_type_near_full(user.HABI_OS_type_near_full)
    set_HABI_OS_type_near_va(user.HABI_OS_type_near_va)

    set_SPEC_OD_SPH('')
    set_SPEC_OD_CYL('')
    set_SPEC_OD_AXIS('')
    set_SPEC_OD_Prim('')
    set_SPEC_OD_Base('')
    set_SPEC_OD_VA('')
    set_SPEC_OD_type_near_full('')
    set_SPEC_OD_type_near_va('')
    set_SPEC_OS_SPH('')
    set_SPEC_OS_CYL('')
    set_SPEC_OS_AXIS('')
    set_SPEC_OS_Prim('')
    set_SPEC_OS_Base('')
    set_SPEC_OS_VA('')
    set_SPEC_OS_type_near_full('')
    set_SPEC_OS_type_near_va('')
    set_SPEC_Pro_Add('')
    set_SPEC_RE_OD_SPH('')
    set_SPEC_RE_OD_CYL('')
    set_SPEC_RE_OD_AXIS('')
    set_SPEC_RE_OD_Prism('')
    set_SPEC_RE_OD_Base('')
    set_SPEC_RE_OD_VA('')
    set_SPEC_RE_OS_SPH('')
    set_SPEC_RE_OS_CYL('')
    set_SPEC_RE_OS_AXIS('')
    set_SPEC_RE_OS_Prism('')
    set_SPEC_RE_OS_Base('')
    set_SPEC_RE_OS_VA('')
    set_SPEC_UNA_DIS_OD('')
    set_SPEC_UNA_NEAR_OD('')
    set_SPEC_UNA_DIS_OS('')
    set_SPEC_UNA_NEAR_OS('')
    set_SPEC_Pin_OD('')
    set_SPEC_Pin_OS('')
    set_SPEC_IOP_OD('')
    set_SPEC_IOP_OS('')
    set_SPEC_RED_OD_O('')
    set_SPEC_RED_OD_T('')
    set_SPEC_RED_OS_O('')
    set_SPEC_RED_OS_T('')
    set_SPEC_Type_Of_lenses_Used('')
    set_SPEC_Time_Period('')
    set_SPEC_Time_More('')
    set_SPEC_remark('')
    set_SPECOB_OD_SPH('')
    set_SPECOB_OD_CYL('')
    set_SPECOB_OD_AXIS('')
    set_SPECOB_OD_Prim('')
    set_SPECOB_OD_Base('')
    set_SPECOB_OD_VA('')
    set_SPECOB_OD_type_near_full('')
    set_SPECOB_OD_type_near_va('')
    set_SPECOB_OS_SPH('')
    set_SPECOB_OS_CYL('')
    set_SPECOB_OD_SPH('')
    set_SPECOB_OS_AXIS('')
    set_SPECOB_OS_Prim('')
    set_SPECOB_OS_Base('')
    set_SPECOB_OS_VA('')
    set_SPECOB_OS_type_near_full('')
    set_SPECOB_OS_type_near_va('')
    set_SPECOB_remark('')
    set_SPECCON_OD_SPH('')
    set_SPECCON_OD_CYL('')
    set_SPECCON_OD_AXIS('')
    set_SPECCON_OD_VA('')
    set_SPECCON_OD_B_Curve('')
    set_SPECCON_OD_Diam('')
    set_SPECCON_OD_Design('')
    set_SPECCON_OS_SPH('')
    set_SPECCON_OS_CYL('')
    set_SPECCON_OD_SPH('')
    set_SPECCON_OS_AXIS('')
    set_SPECCON_OS_VA('')
    set_SPECCON_OS_B_Curve('')
    set_SPECCON_OS_Diam('')
    set_SPECCON_OS_Design('')
    set_SPECCON_Remark('')
    set_Oprimistic_Filed3('')
    set_Oprimistic_Filed2('')
    set_Oprimistic_Filed('')
    setLens_Material('')
    setLenses_Type('')
    setLens_Treatment('')
    setLens_Colour('')
    setLens_Size('')
    setLens_Base('')
    setLens_Price('')
    setLens_OrderDate('')
    setLens_wanted_on('')
    setFrame_Category('')
    setFrame_Material('')
    setFrame_type('')
    setFrame_Brand('')
    setModel_number('')
    setColour('')
    setFront_size('')
    setBridge_size('')
    setArm_Size('')
    setPD('')
    setSEG('')
    setLense_Description('')
    setFreame_Description('')
    setDoctor_Rx('')
    setTested_By('')
    setEntered_By('')

    axios.get(`http://localhost:2776/api/order/submit/${user.cmd_id}`).then((res) => {
      set_Oprimistic_Filed(res.data.cood_id)
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
      console.log(res.data)
      set_SPEC_Time_Period(res.data.SPEC_Time_Period)
      set_SPEC_Time_More(res.data.SPEC_Time_More)
      set_SPEC_remark(res.data.SPEC_remark)
    }).catch((err) => {
      console.log(err)
    })

    axios.get(`http://localhost:2776/api/order/objective/${user.cmd_id}`).then((res) => {
      set_Oprimistic_Filed2(res.data.cooo_id)
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

    axios.get(`http://localhost:2776/api/order/conatct/${user.cmd_id}`).then((res) => {
      set_Oprimistic_Filed3(res.data.coocl_id)
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

    axios.get(`http://localhost:2776/api/order/assitance/second/${user.cmd_id}`).then((res) => {
      console.log(res.data)
      set_Oprimistic_Filed4(res.data.coaldid)
      setLens_Material(res.data.Lens_Material)
      setLenses_Type(res.data.Lenses_Type)
      setLens_Treatment(res.data.Lens_Treatment)
      setLens_Colour(res.data.Lens_Colour)
      setLens_Size(res.data.Lens_Size)
      setLens_Base(res.data.Lens_Base)
      setLens_Price(res.data.Lens_Price)
      setLens_Brand(res.data.Lens_Brand)
      setLenses_At(res.data.Lenses_At)
      setLens_OrderDate(res.data.Lens_OrderDate)
      setLens_wanted_on(res.data.Lens_wanted_on)
      setFrame_Category(res.data.Frame_Category)
      setFrame_Material(res.data.Frame_Material)
      setFrame_type(res.data.Frame_type)
      setFrame_Brand(res.data.Frame_Brand)
      setModel_number(res.data.Model_number)
      setColour(res.data.Colour)
      setFront_size(res.data.Front_size)
      setBridge_size(res.data.Bridge_size)
      setArm_Size(res.data.Arm_Size)
      setPD(res.data.PD)
      setSEG(res.data.SEG)
      setLense_Description(res.data.Lense_Description)
      setFreame_Description(res.data.Freame_Description)
      setDoctor_Rx(res.data.Doctor_Rx)
      setTested_By(res.data.Tested_By)
      setEntered_By(res.data.Entered_By)
    }).catch((err) => {
      console.log(err)
    })
  };

  const [buttonvalue, setbuttonvalue] = useState(false);

  const deatilsPickup = () => {
    setbuttonvalue(true)
    toast.success("Details Saved!");
  }
  const resetSelectedValues = (user) => {
    if (buttonvalue == true) {
      set_Date('')
      set_Button_Show_Status(true)
      set_purpose_of_visit('')
      set_purpose_of_visit_remark('')
      set_occular_health('')
      set_occular_health_remark('')
      set_general_health('')
      set_general_health_medication('')
      set_general_health_allergies('')
      set_general_health_remark('')
      set_symptoms('')
      set_symptoms_remark('')
      set_type_of_lenses_used('')
      set_report_status('')
      set_HABI_OD_SPH('')
      set_HABI_OD_CYL('')
      set_HABI_OD_AXIS('')
      set_HABI_OD_Prim('')
      set_HABI_OD_Prim('')
      set_HABI_OD_Base('')
      set_HABI_OD_VA('')
      set_HABI_OD_type_near_full('')
      set_HABI_OD_type_near_va('')
      set_HABI_OS_SPH('')
      set_HABI_OS_CYL('')
      set_HABI_OS_AXIS('')
      set_HABI_OS_Prim('')
      set_HABI_OS_Base('')
      set_HABI_OS_VA('')
      set_HABI_OS_type_near_full('')
      set_HABI_OS_type_near_va('')
      set_HABI_OD_SPH(SPEC_OD_SPH)
      set_HABI_OD_CYL(SPEC_OD_CYL)
      set_HABI_OD_AXIS(SPEC_OD_AXIS)
      set_HABI_OD_Prim(SPEC_OD_Prism)
      set_HABI_OD_Base(SPEC_OD_Base)
      set_HABI_OD_VA(SPEC_OD_VA)
      set_HABI_OD_type_near_full(SPEC_OD_near_full)
      set_HABI_OD_type_near_va(SPEC_OD_near_va)
      set_HABI_OS_SPH(SPEC_OS_SPH)
      set_HABI_OS_CYL(SPEC_OS_CYL)
      set_HABI_OS_AXIS(SPEC_OS_AXIS)
      set_HABI_OS_Prim(SPEC_OS_Prism)
      set_HABI_OS_Base(SPEC_OS_Base)
      set_HABI_OS_VA(SPEC_OS_VA)
      set_HABI_OS_type_near_full(SPEC_OS_near_full)
      set_HABI_OS_type_near_va(SPEC_OS_near_va)
      set_SPEC_Pro_Add('')
      set_SPEC_RE_OD_SPH('')
      set_SPEC_RE_OD_CYL('')
      set_SPEC_RE_OD_AXIS('')
      set_SPEC_RE_OD_Prism('')
      set_SPEC_RE_OD_Base('')
      set_SPEC_RE_OD_VA('')
      set_SPEC_RE_OS_SPH('')
      set_SPEC_RE_OS_CYL('')
      set_SPEC_RE_OS_AXIS('')
      set_SPEC_RE_OS_Prism('')
      set_SPEC_RE_OS_Base('')
      set_SPEC_RE_OS_VA('')
      set_SPEC_UNA_DIS_OD('')
      set_SPEC_UNA_NEAR_OD('')
      set_SPEC_UNA_DIS_OS('')
      set_SPEC_UNA_NEAR_OS('')
      set_SPEC_Pin_OD('')
      set_SPEC_Pin_OS('')
      set_SPEC_IOP_OD('')
      set_SPEC_IOP_OS('')
      set_SPEC_RED_OD_O('')
      set_SPEC_RED_OD_T('')
      set_SPEC_RED_OS_O('')
      set_SPEC_RED_OS_T('')
      set_SPEC_Type_Of_lenses_Used('')
      set_SPEC_Time_Period('')
      set_SPEC_Time_More('')
      set_SPEC_remark('')
      set_SPECOB_OD_SPH('')
      set_SPECOB_OD_CYL('')
      set_SPECOB_OD_AXIS('')
      set_SPECOB_OD_Prim('')
      set_SPECOB_OD_Base('')
      set_SPECOB_OD_VA('')
      set_SPECOB_OD_type_near_full('')
      set_SPECOB_OD_type_near_va('')
      set_SPECOB_OS_SPH('')
      set_SPECOB_OS_CYL('')
      set_SPECOB_OD_SPH('')
      set_SPECOB_OS_AXIS('')
      set_SPECOB_OS_Prim('')
      set_SPECOB_OS_Base('')
      set_SPECOB_OS_VA('')
      set_SPECOB_OS_type_near_full('')
      set_SPECOB_OS_type_near_va('')
      set_SPECOB_remark('')
      set_SPECCON_OD_SPH('')
      set_SPECCON_OD_CYL('')
      set_SPECCON_OD_AXIS('')
      set_SPECCON_OD_VA('')
      set_SPECCON_OD_B_Curve('')
      set_SPECCON_OD_Diam('')
      set_SPECCON_OD_Design('')
      set_SPECCON_OS_SPH('')
      set_SPECCON_OS_CYL('')
      set_SPECCON_OD_SPH('')
      set_SPECCON_OS_AXIS('')
      set_SPECCON_OS_VA('')
      set_SPECCON_OS_B_Curve('')
      set_SPECCON_OS_Diam('')
      set_SPECCON_OS_Design('')
      set_SPECCON_Remark('')
      set_Oprimistic_Filed3('')
      set_Oprimistic_Filed2('')
      set_Oprimistic_Filed('')
      setLens_Material('')
      setLenses_Type('')
      setLens_Treatment('')
      setLens_Colour('')
      setLens_Size('')
      setLens_Base('')
      setLens_Price('')
      setLens_OrderDate('')
      setLens_wanted_on('')
      setFrame_Category('')
      setFrame_Material('')
      setFrame_type('')
      setFrame_Brand('')
      setModel_number('')
      setColour('')
      setFront_size('')
      setBridge_size('')
      setArm_Size('')
      setPD('')
      setSEG('')
      setLense_Description('')
      setFreame_Description('')
      setDoctor_Rx('')
      setTested_By('')
      setEntered_By('')
      set_Oprimistic_Filed4('')
      set_Oprimistic_Filed2('')
      set_Oprimistic_Filed('')
      setbuttonvalue(false)
    } else {
      set_Date('')
      set_Button_Show_Status(true)
      set_purpose_of_visit('')
      set_purpose_of_visit_remark('')
      set_occular_health('')
      set_occular_health_remark('')
      set_general_health('')
      set_general_health_medication('')
      set_general_health_allergies('')
      set_general_health_remark('')
      set_symptoms('')
      set_symptoms_remark('')
      set_type_of_lenses_used('')
      set_report_status('')
      set_HABI_OD_SPH('')
      set_HABI_OD_CYL('')
      set_HABI_OD_AXIS('')
      set_HABI_OD_Prim('')
      set_HABI_OD_Prim('')
      set_HABI_OD_Base('')
      set_HABI_OD_VA('')
      set_HABI_OD_type_near_full('')
      set_HABI_OD_type_near_va('')
      set_HABI_OS_SPH('')
      set_HABI_OS_CYL('')
      set_HABI_OS_AXIS('')
      set_HABI_OS_Prim('')
      set_HABI_OS_Base('')
      set_HABI_OS_VA('')
      set_HABI_OS_type_near_full('')
      set_HABI_OS_type_near_va('')
      set_SPEC_OD_SPH('')
      set_SPEC_OD_CYL('')
      set_SPEC_OD_AXIS('')
      set_SPEC_OD_Prim('')
      set_SPEC_OD_Base('')
      set_SPEC_OD_VA('')
      set_SPEC_OD_type_near_full('')
      set_SPEC_OD_type_near_va('')
      set_SPEC_OS_SPH('')
      set_SPEC_OS_CYL('')
      set_SPEC_OS_AXIS('')
      set_SPEC_OS_Prim('')
      set_SPEC_OS_Base('')
      set_SPEC_OS_VA('')
      set_SPEC_OS_type_near_full('')
      set_SPEC_OS_type_near_va('')
      set_SPEC_Pro_Add('')
      set_SPEC_RE_OD_SPH('')
      set_SPEC_RE_OD_CYL('')
      set_SPEC_RE_OD_AXIS('')
      set_SPEC_RE_OD_Prism('')
      set_SPEC_RE_OD_Base('')
      set_SPEC_RE_OD_VA('')
      set_SPEC_RE_OS_SPH('')
      set_SPEC_RE_OS_CYL('')
      set_SPEC_RE_OS_AXIS('')
      set_SPEC_RE_OS_Prism('')
      set_SPEC_RE_OS_Base('')
      set_SPEC_RE_OS_VA('')
      set_SPEC_UNA_DIS_OD('')
      set_SPEC_UNA_NEAR_OD('')
      set_SPEC_UNA_DIS_OS('')
      set_SPEC_UNA_NEAR_OS('')
      set_SPEC_Pin_OD('')
      set_SPEC_Pin_OS('')
      set_SPEC_IOP_OD('')
      set_SPEC_IOP_OS('')
      set_SPEC_RED_OD_O('')
      set_SPEC_RED_OD_T('')
      set_SPEC_RED_OS_O('')
      set_SPEC_RED_OS_T('')
      set_SPEC_Type_Of_lenses_Used('')
      set_SPEC_Time_Period('')
      set_SPEC_Time_More('')
      set_SPEC_remark('')
      set_SPECOB_OD_SPH('')
      set_SPECOB_OD_CYL('')
      set_SPECOB_OD_AXIS('')
      set_SPECOB_OD_Prim('')
      set_SPECOB_OD_Base('')
      set_SPECOB_OD_VA('')
      set_SPECOB_OD_type_near_full('')
      set_SPECOB_OD_type_near_va('')
      set_SPECOB_OS_SPH('')
      set_SPECOB_OS_CYL('')
      set_SPECOB_OD_SPH('')
      set_SPECOB_OS_AXIS('')
      set_SPECOB_OS_Prim('')
      set_SPECOB_OS_Base('')
      set_SPECOB_OS_VA('')
      set_SPECOB_OS_type_near_full('')
      set_SPECOB_OS_type_near_va('')
      set_SPECOB_remark('')
      set_SPECCON_OD_SPH('')
      set_SPECCON_OD_CYL('')
      set_SPECCON_OD_AXIS('')
      set_SPECCON_OD_VA('')
      set_SPECCON_OD_B_Curve('')
      set_SPECCON_OD_Diam('')
      set_SPECCON_OD_Design('')
      set_SPECCON_OS_SPH('')
      set_SPECCON_OS_CYL('')
      set_SPECCON_OD_SPH('')
      set_SPECCON_OS_AXIS('')
      set_SPECCON_OS_VA('')
      set_SPECCON_OS_B_Curve('')
      set_SPECCON_OS_Diam('')
      set_SPECCON_OS_Design('')
      set_SPECCON_Remark('')
      set_Oprimistic_Filed3('')
      set_Oprimistic_Filed2('')
      set_Oprimistic_Filed('')
      setLens_Material('')
      setLenses_Type('')
      setLens_Treatment('')
      setLens_Colour('')
      setLens_Size('')
      setLens_Base('')
      setLens_Price('')
      setLens_OrderDate('')
      setLens_wanted_on('')
      setFrame_Category('')
      setFrame_Material('')
      setFrame_type('')
      setFrame_Brand('')
      setModel_number('')
      setColour('')
      setFront_size('')
      setBridge_size('')
      setArm_Size('')
      setPD('')
      setSEG('')
      setLense_Description('')
      setFreame_Description('')
      setDoctor_Rx('')
      setTested_By('')
      setEntered_By('')
      set_Oprimistic_Filed4('')
      set_Oprimistic_Filed2('')
      set_Oprimistic_Filed('')
    }
  };



  const valueSaveForNextStep = () => {

  };

  const [nicError, setNicError] = useState("");

  const handleNicChange = (e) => {
    let value = e.target.value.toUpperCase();

    // Allow only digits and at most 1 letter (V or X) at the end
    value = value.replace(/[^0-9VX]/gi, "");

    // If letter appears in the middle, push it to the end
    if (/[A-Z]/.test(value.slice(0, -1))) {
      value = value.replace(/([A-Z])(.*)/, "$2$1");
    }

    // Limit length (12 digits OR 9 digits + 1 letter)
    if (value.length > 12) {
      value = value.slice(0, 12);
    }

    setnic(value);

    // Validation rules
    if (
      (value.length === 12 && /^\d{12}$/.test(value)) || // 12-digit NIC
      (value.length === 10 && /^\d{9}[VX]$/.test(value)) // old 10-char NIC (9 digits + V/X)
    ) {
      setNicError("");
    } else if (value.length > 0) {
      setNicError("NIC must be 12 digits or 9 digits + V/X");
    } else {
      setNicError("");
    }
  };


  const handleDobChange = (e) => {
    const birthDate = new Date(e.target.value);
    setDob(e.target.value);
    setDob1(new Date(e.target.value).toLocaleDateString());

    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }
    setAge(calculatedAge);
  };
  const cleanValue = (val) => {
    if (!val || val.trim() === "-" || val.trim() === "") return null;
    return val;
  };


  const handlePhoneChange = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    if (value.length > 3) {
      value = `(${value.slice(0, 3)}) ${value.slice(3, 10)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }
    settelephone(value);
  };

  const getPhoneError = (number) => {
    if (!number) return "";
    const digits = number.replace(/\D/g, "");
    return digits.length !== 10 ? "Phone number must be 10 digits" : "";
  };

  const handlePhoneChange2 = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    if (value.length > 3) {
      value = `(${value.slice(0, 3)}) ${value.slice(3, 10)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }
    setmobile2(value);
  };

  const getPhoneError2 = (number) => {
    if (!number) return "";
    const digits = number.replace(/\D/g, "");
    return digits.length !== 10 ? "Phone number must be 10 digits" : "";
  };


  const handlePhoneChange3 = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, "");
    if (value.length > 3) {
      value = `(${value.slice(0, 3)}) ${value.slice(3, 10)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }
    setlanMobile(value);
  };

  const getPhoneError3 = (number) => {
    if (!number) return "";
    const digits = number.replace(/\D/g, "");
    return digits.length !== 10 ? "Phone number must be 10 digits" : "";
  };

  const submitNewCustomer = () => {
    if (nic) {
      const ob = {
        first_name: firstName,
        name,
        email: cleanValue(email),
        telephone: cleanValue(telephone),
        mobile2: cleanValue(mobile2),
        lan_phone: cleanValue(lanMobile),
        town: city,
        prefix: titles,
        address,
        occupation,
        dob: formatDate(dob1),
        age,
        nic,
        gender,
        reg_date: formatDate(reg_date)
      };
      console.log(ob);
      axios
        .post('http://localhost:2776/api/customer', ob)
        .then((res) => {
          console.log(res.data);
          toast('New Customer Created!');
          handleClose();
          navigate('/assistance/order');
        })
        .catch((err) => {
          console.log(err);
          toast.error('Submission failed.');
        });
    } else {
      toast.error('NIC Required!.');
    }

  };


  const selectedUserExcuteFunction = (id) => {
    axios
      .get(`http://localhost:2776/api/order/${id}`)
      .then((res) => setPrevOrders(res.data))
      .catch((err) => console.log(err));
  }

  const submitNewOrder = () => {
    let status = ""
    if (purpose_of_visit == "Broken Spectacle") {
      status = "Pass_to_Prev"
    } else {
      status = "Pass_to_O"
    }
    const ob = {
      purpose_of_visit,
      purpose_of_visit_remark,
      occular_health,
      occular_health_remark,
      general_health,
      general_health_medication,
      general_health_allergies,
      general_health_remark,
      symptoms,
      symptoms_remark,
      type_of_lenses_used,
      report_status: status,
      HABI_OD_SPH,
      HABI_OD_CYL,
      HABI_OD_AXIS,
      HABI_OD_Prim,
      HABI_OD_Base,
      HABI_OD_VA,
      HABI_OD_type_near_full,
      HABI_OD_type_near_va,
      HABI_OS_SPH,
      HABI_OS_CYL,
      HABI_OS_AXIS,
      HABI_OS_Prim,
      HABI_OS_Base,
      HABI_OS_VA,
      HABI_OS_type_near_full,
      HABI_OS_type_near_va,
      date: formatDate(today),
      cid: selectedUserId,
      today_no: todayNo2
    }

    axios.post('http://localhost:2776/api/order', ob).then((res) => {
      console.log(res.data)
      toast('New Order Created!');
      // Increment and save for today
      const newNo = todayNo2 + 1;
      setTodayNo2(newNo);
      localStorage.setItem("todayNo", newNo);
    }).catch((err) => {
      console.log(err)
    })
  }

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle save (you can call API here)
  const handleSave = () => {
    console.log("Updated customer data:", editData);
    const payload = {
      ...editData,
      dob: formatDate(editData.dob),
      reg_date: formatDate(editData.reg_date),
    };

    axios.put(`http://localhost:2776/api/order/customer/${editData.c_id}`, payload).then((res) => {
      console.log(res.data)
    }).catch((err) => {
      console.log(err)
    })
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
                      Recent Users
                    </Card.Title>
                  </Col>
                  <Col>
                    <Button
                      className="float-end d-flex align-items-center text-capitalize"
                      variant="outline-primary"
                      size="sm"
                      onClick={handleShow}
                    >
                      New
                    </Button>
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
            <Tabs defaultActiveKey="today" id="uncontrolled-tab-example">
              <Tab eventKey="today" title="Today">
                {currentUsers.map((a, ind) => {
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
                              setSelectedUserId(a.c_id);
                              setSelectedUserEmail(a.email);
                              selectedUserExcuteFunction(a.c_id)
                              // perform other actions here
                            }}
                          />
                          # {a.c_id}
                        </span>
                        <h6 className="m-3 d-inline fw-bold">Name : {a.prefix}</h6>
                        <h6 className="m-0 d-inline fw-bold">{a.first_name}</h6>
                        <h6 className="m-0 d-inline fw-bold">{a.name}</h6>
                        <h6 className="m-3 d-inline">NIC : {a.nic}</h6>
                        <h6 className="m-3 d-inline fw-bold">Occupation : {a.occupation}</h6>
                      </div>
                    </div>
                  );
                })}
                <div className="d-flex justify-content-center mt-3">
                  <button
                    className="btn btn-outline-primary m-1 btn-sm"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Prev
                  </button>
                  <span className="m-2">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    className="btn btn-outline-primary m-1 btn-sm"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </Tab>

              <Tab eventKey="week" title="This Week">
                {currentUsersWeek.map((a, ind) => {
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
                              setSelectedUserId(a.c_id);
                              setSelectedUserEmail(a.email);
                              selectedUserExcuteFunction(a.c_id)
                              // perform other actions here
                            }}
                          />
                          # {a.c_id}
                        </span>
                        <h6 className="m-3 d-inline fw-bold">Name : {a.prefix}</h6>
                        <h6 className="m-0 d-inline fw-bold">{a.first_name}</h6>
                        <h6 className="m-0 d-inline fw-bold">{a.name}</h6>
                        <h6 className="m-3 d-inline">NIC : {a.nic}</h6>
                        <h6 className="m-3 d-inline fw-bold">Occupation : {a.occupation}</h6>
                      </div>
                    </div>
                  );
                })}
                <div className="d-flex justify-content-center mt-3">
                  <button
                    className="btn btn-outline-secondary m-1 btn-sm"
                    onClick={() => setAllPage1((prev) => Math.max(prev - 1, 1))}
                    disabled={allPage1 === 1}
                  >
                    Prev
                  </button>
                  <span className="m-2">
                    Page {allPage1} of {allTotalPagesWeek}
                  </span>
                  <button
                    className="btn btn-outline-secondary m-1 btn-sm"
                    onClick={() => setAllPage1((prev) => Math.min(prev + 1, allTotalPagesWeek))}
                    disabled={allPage1 === allTotalPagesWeek}
                  >
                    Next
                  </button>
                </div>
              </Tab>

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
                              setSelectedUserId(a.c_id);
                              setSelectedUserEmail(a.email);
                              selectedUserExcuteFunction(a.c_id)
                              // perform other actions here
                            }}
                          />
                          # {a.c_id}
                        </span>
                        <Button
                          variant="warning"
                          size="sm"
                          className="ms-3"
                          onClick={() => { setShowEditModal2(true); setEditData(a) }}
                        >
                          ✏️
                        </Button>
                        <h6 className="m-3 d-inline fw-bold">Name : {a.prefix}</h6>
                        <h6 className="m-0 d-inline fw-bold">{a.first_name}</h6>
                        <h6 className="m-0 d-inline fw-bold">{a.name}</h6>

                        {/* <h6 className="m-3 d-inline">Email : {a.email}</h6>
                        <h6 className="m-3 d-inline">Age : {a.age}</h6>
                        <h6 className="m-3 d-inline">Mobile : {a.telephone || a.lan_phone || a.mobile2}</h6> */}
                        <h6 className="m-3 d-inline">NIC : {a.nic}</h6>
                        <h6 className="m-3 d-inline fw-bold">Occupation : {a.occupation}</h6>
                        {/* <h6 className="m-3 d-inline">DOB : {new Date(a.dob).toLocaleDateString()}</h6> */}
                        {/* <br /> */}
                        {/* <h6 className="m-0 d-inline">Home Address : {a.address}</h6>
                        <h6 className="m-3 d-inline">City : {a.town}</h6> */}
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

      {selectedUserId ? (
        <Card>
          <Card.Header>
            <Container>
              <Row>
                <Col>
                  <Card.Title as="h5" style={{ fontWeight: 'bold' }}>
                    Medical Card
                  </Card.Title>
                </Col>
              </Row>
            </Container>
          </Card.Header>
          <Card.Body>
            <div className="p-3 rounded shadow-sm bg-white" >
              <div className="d-flex justify-content-between align-items-center mb-3">
                {prevOrders && prevOrders.length > 0 ? (
                  <>
                    <Dropdown>
                      <Dropdown.Toggle variant="outline-primary" id="dropdown-basic">
                        <BsCalendarDate className="me-2" />
                        {selectedUser ? formatDate(selectedUser.date) : "Select Date"}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {prevOrders.map((u, index) => (
                          <Dropdown.Item key={index} onClick={() => handleSelect(u)}>
                            {formatDate(u.date)}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                    <div className="text-center">
                      <h6 className="fw-bold text-secondary">Selected Date</h6>
                      <h5 className="fw-bold text-primary mt-2">
                        {date ? formatDate(date) : "--"}
                      </h5>
                    </div>

                    <div className="text-center">
                      <h6 className="fw-bold text-secondary">Order Status</h6>
                      <h5 className="fw-bold text-primary mt-2">
                        {report_status ? report_status : "--"}
                      </h5>
                    </div>
                  </>
                ) : (
                  <span className="text-muted">No previous orders</span>
                )}

                <Button variant="outline-danger" onClick={resetSelectedValues}>
                  <BsArrowCounterclockwise />
                </Button>
              </div>


            </div>
            <Form style={{ color: 'black', paddingTop: 20 }}>
              <Row>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold' }}>Purpose of visit</Form.Label>
                    <Form.Select
                      multiple // keeps same multi-select behavior as checkboxes
                      value={purpose_of_visit.split(", ").filter(Boolean)}
                      onChange={(e) => {
                        const selected = Array.from(e.target.selectedOptions, (option) => option.value);
                        set_purpose_of_visit(selected.join(", "));
                      }}
                    >
                      {purposeofvisit.map((p) => (
                        <option key={p.pov_id} value={p.text}>
                          {p.text}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold' }}>Symptoms</Form.Label>
                    <Form.Select
                      multiple // keeps the same multi-select behavior as checkboxes
                      value={symptoms.split(", ").filter(Boolean)}
                      onChange={(e) => {
                        const selected = Array.from(e.target.selectedOptions, (option) => option.value);
                        set_symptoms(selected.join(", "));
                      }}
                    >
                      {symptoms_list.map((p, i) => (
                        <option key={i} value={p.text}>
                          {p.text}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold' }}>General Health</Form.Label>
                    <Form.Select
                      multiple // allows selecting multiple options (same behavior as checkboxes)
                      value={general_health.split(", ").filter(Boolean)}
                      onChange={(e) => {
                        const selected = Array.from(e.target.selectedOptions, (option) => option.value);
                        set_general_health(selected.join(", "));
                      }}
                    >
                      {generalhealth.map((p, i) => (
                        <option key={i} value={p.text}>
                          {p.text}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: 'bold' }}>Occular Health</Form.Label>
                    <Form.Select
                      multiple // keeps multiple-selection behavior like checkboxes
                      value={occular_health.split(", ").filter(Boolean)}
                      onChange={(e) => {
                        const selected = Array.from(e.target.selectedOptions, (option) => option.value);
                        set_occular_health(selected.join(", "));
                      }}
                    >
                      {occularhealth.map((p, i) => (
                        <option key={i} value={p.text}>
                          {p.text}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
            <Form style={{ color: 'black', paddingTop: 20 }}>
              <Row>
                <Col md={3}>
                  <Form.Group className="mb-3" style={{ backgroundColor: '#D0DCF5', padding: 15, color: '#708090', borderRadius: 10 }}>
                    <Form.Label style={{ fontWeight: 'bold' }}>Purpose of visit</Form.Label>
                    <ul style={{ paddingLeft: "20px", marginBottom: 0 }}>
                      {purpose_of_visit.split(", ").filter(Boolean).map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-3" style={{ backgroundColor: '#D0DCF5', padding: 15, color: '#708090', borderRadius: 10 }}>
                    <Form.Label style={{ fontWeight: 'bold' }}>Symptoms</Form.Label>
                    <ul style={{ paddingLeft: "20px", marginBottom: 0 }}>
                      {symptoms.split(", ").filter(Boolean).map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>

                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-3" style={{ backgroundColor: '#D0DCF5', padding: 15, color: '#708090', borderRadius: 10 }}>
                    <Form.Label style={{ fontWeight: 'bold' }}>General Health</Form.Label>
                    <ul style={{ paddingLeft: "20px", marginBottom: 0 }}>
                      {general_health.split(", ").filter(Boolean).map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-3" style={{ backgroundColor: '#D0DCF5', padding: 15, color: '#708090', borderRadius: 10 }}>
                    <Form.Label style={{ fontWeight: 'bold' }}>Occular Health</Form.Label>
                    <ul style={{ paddingLeft: "20px", marginBottom: 0 }}>
                      {occular_health.split(", ").filter(Boolean).map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group className="mb-3" controlId="remarksInput" style={{ color: '#708090', paddingLeft: 10 }}>
                    <Form.Label>Remark</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Purpose of Visit Remarks"
                      value={purpose_of_visit_remark}
                      onChange={(e) => set_purpose_of_visit_remark(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={12}>
                  <Form.Group className="mb-3" controlId="remarksInput" style={{ color: '#708090', paddingLeft: 10 }}>
                    <Form.Label style={{ fontWeight: 'bold' }}>Medication</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Medication"
                      value={general_health_medication}
                      onChange={(e) => set_general_health_medication(e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col md={12}>
                  <Form.Group className="mb-3" controlId="remarksInput" style={{ color: '#708090', paddingLeft: 10 }}>
                    <Form.Label style={{ fontWeight: 'bold' }}>Allergies</Form.Label>
                    <Form.Control type="text" placeholder="Allergies" value={general_health_allergies} onChange={(e) => set_general_health_allergies(e.target.value)} />
                  </Form.Group>
                </Col>
              </Row>

              <h6 className="mt-4 fw-bold mb-3">Habitual Rx </h6>
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
                              onChange={(e) => set_HABI_OD_SPH(e.target.value)}
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
                              onChange={(e) => set_HABI_OD_CYL(e.target.value)}
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
                              onChange={(e) => set_HABI_OD_AXIS(e.target.value)}
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
                              onChange={(e) => set_HABI_OD_Prim(e.target.value)}
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
                              onChange={(e) => set_HABI_OD_Base(e.target.value)}
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
                              onChange={(e) => set_HABI_OD_VA(e.target.value)}
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
                              onChange={(e) => set_HABI_OD_type_near_full(e.target.value)}
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
                              onChange={(e) => set_HABI_OD_type_near_va(e.target.value)}
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
                              onChange={(e) => set_HABI_OS_SPH(e.target.value)}
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
                              onChange={(e) => set_HABI_OS_CYL(e.target.value)}
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
                              onChange={(e) => set_HABI_OS_AXIS(e.target.value)}
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
                              onChange={(e) => set_HABI_OS_Prim(e.target.value)}
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
                              onChange={(e) => set_HABI_OS_Base(e.target.value)}
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
                              onChange={(e) => set_HABI_OS_VA(e.target.value)}
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
                              onChange={(e) => set_HABI_OS_type_near_full(e.target.value)}
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
                              onChange={(e) => set_HABI_OS_type_near_va(e.target.value)}
                            />
                          </Form.Group>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
              <Row>
                <Col>
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
                  <h6 className="mt-4 fw-bold mb-4">Type of Lenses Used</h6>
                  <Form.Group className="mb-3">
                    {typeofLense.map((t) => (
                      <Form.Check
                        key={t.tol_id}
                        inline
                        type="radio"
                        label={t.text}
                        id={`radio-${t.text}`}
                        value={t.text}
                        className="custom-radio"
                        checked={type_of_lenses_used === t.text}
                        onClick={() => {
                          // if already selected, unselect it
                          if (type_of_lenses_used === t.text) {
                            set_type_of_lenses_used("");
                          } else {
                            set_type_of_lenses_used(t.text);
                          }
                        }}
                        onChange={() => { }} // avoid React warning about missing onChange
                      />
                    ))}
                  </Form.Group>

                  {Oprimistic_Filed ?
                    <div className="my-4 p-3 bg-light rounded shadow-sm">
                      <h6 className="fw-bold text-primary" style={{ textAlign: 'center', fontSize: 15 }}>
                        Optometrist Filled Details
                      </h6>
                    </div>
                    : null}

                  {Oprimistic_Filed ?
                    <Tabs
                      variant="pills"
                      defaultActiveKey="home"
                    >
                      <Tab eventKey="home" title="Subjective">
                        <h6 className="fw-bold mb-3">Rx For Spectacles </h6>
                        <Row>
                          <Col md={3}>
                            <Button variant="outline-danger" onClick={deatilsPickup}>
                              Pick This Values
                            </Button>
                          </Col>
                        </Row>
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
                                        readOnly
                                        style={{
                                          border: 'none',
                                          width: '',
                                          padding: '4px 6px',
                                          textAlign: 'center'
                                        }}
                                        value={SPEC_OD_SPH}
                                      />
                                    </Form.Group>
                                  </td>
                                  <td>
                                    <Form.Group className="mb-0" controlId="formBasicFloat">
                                      <Form.Control
                                        type="number"
                                        step="any"
                                        readOnly
                                        style={{
                                          border: 'none',
                                          width: '',
                                          padding: '4px 6px',
                                          textAlign: 'center'
                                        }}
                                        value={SPEC_OD_CYL}
                                      />
                                    </Form.Group>
                                  </td>
                                  <td>
                                    {' '}
                                    <Form.Group className="mb-0" controlId="formBasicFloat">
                                      <Form.Control
                                        type="number"
                                        step="any"
                                        readOnly
                                        style={{
                                          border: 'none',
                                          width: '',
                                          padding: '4px 6px',
                                          textAlign: 'center'
                                        }}
                                        value={SPEC_OD_AXIS}
                                      />
                                    </Form.Group>
                                  </td>
                                  <td>
                                    {' '}
                                    <Form.Group className="mb-0" controlId="formBasicFloat">
                                      <Form.Control
                                        type="number"
                                        step="any"
                                        readOnly
                                        style={{
                                          border: 'none',
                                          width: '',
                                          padding: '4px 6px',
                                          textAlign: 'center'
                                        }}
                                        value={SPEC_OD_Prism}
                                      />
                                    </Form.Group>
                                  </td>
                                  <td>
                                    {' '}
                                    <Form.Group className="mb-0" controlId="formBasicFloat">
                                      <Form.Control
                                        type="number"
                                        readOnly
                                        step="any"
                                        style={{
                                          border: 'none',
                                          width: '',
                                          padding: '4px 6px',
                                          textAlign: 'center'
                                        }}
                                        value={SPEC_OD_Base}
                                      />
                                    </Form.Group>
                                  </td>
                                  <td>
                                    {' '}
                                    <Form.Group className="mb-0" controlId="formBasicFloat">
                                      <Form.Control
                                        type="text"
                                        step="any"
                                        readOnly
                                        style={{
                                          border: 'none',
                                          width: '',
                                          padding: '4px 6px',
                                          textAlign: 'center'
                                        }}
                                        value={SPEC_OD_VA}
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
                                        readOnly
                                        style={{
                                          border: 'none',
                                          width: '',
                                          padding: '4px 6px',
                                          textAlign: 'center'
                                        }}
                                        value={SPEC_OD_near_full}
                                      />
                                    </Form.Group>
                                  </td>
                                  <td>
                                    <Form.Group className="mb-0" controlId="formBasicFloat">
                                      <Form.Control
                                        type="text"
                                        step="any"
                                        readOnly
                                        style={{
                                          border: 'none',
                                          width: '',
                                          padding: '4px 6px',
                                          textAlign: 'center'
                                        }}
                                        value={SPEC_OD_near_va}
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
                                        readOnly
                                        style={{
                                          border: 'none',
                                          width: '',
                                          padding: '4px 6px',
                                          textAlign: 'center'
                                        }}
                                        value={SPEC_OS_SPH}
                                      />
                                    </Form.Group>
                                  </td>
                                  <td>
                                    <Form.Group className="mb-0" controlId="formBasicFloat">
                                      <Form.Control
                                        type="number"
                                        readOnly
                                        step="any"
                                        style={{
                                          border: 'none',
                                          width: '',
                                          padding: '4px 6px',
                                          textAlign: 'center'
                                        }}
                                        value={SPEC_OS_CYL}
                                      />
                                    </Form.Group>
                                  </td>
                                  <td>
                                    {' '}
                                    <Form.Group className="mb-0" controlId="formBasicFloat">
                                      <Form.Control
                                        type="number"
                                        step="any"
                                        readOnly
                                        style={{
                                          border: 'none',
                                          width: '',
                                          padding: '4px 6px',
                                          textAlign: 'center'
                                        }}
                                        value={SPEC_OS_AXIS}
                                      />
                                    </Form.Group>
                                  </td>
                                  <td>
                                    {' '}
                                    <Form.Group className="mb-0" controlId="formBasicFloat">
                                      <Form.Control
                                        type="number"
                                        step="any"
                                        readOnly
                                        style={{
                                          border: 'none',
                                          width: '',
                                          padding: '4px 6px',
                                          textAlign: 'center'
                                        }}
                                        value={SPEC_OS_Prism}
                                      />
                                    </Form.Group>
                                  </td>
                                  <td>
                                    {' '}
                                    <Form.Group className="mb-0" controlId="formBasicFloat">
                                      <Form.Control
                                        type="number"
                                        step="any"
                                        readOnly
                                        style={{
                                          border: 'none',
                                          width: '',
                                          padding: '4px 6px',
                                          textAlign: 'center'
                                        }}
                                        value={SPEC_OS_Base}
                                      />
                                    </Form.Group>
                                  </td>
                                  <td>
                                    {' '}
                                    <Form.Group className="mb-0" controlId="formBasicFloat">
                                      <Form.Control
                                        type="text"
                                        step="any"
                                        readOnly
                                        style={{
                                          border: 'none',
                                          width: '',
                                          padding: '4px 6px',
                                          textAlign: 'center'
                                        }}
                                        value={SPEC_OS_VA}
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
                                        readOnly
                                        style={{
                                          border: 'none',
                                          width: '',
                                          padding: '4px 6px',
                                          textAlign: 'center'
                                        }}
                                        value={SPEC_OS_near_full}
                                      />
                                    </Form.Group>
                                  </td>
                                  <td>
                                    <Form.Group className="mb-0" controlId="formBasicFloat">
                                      <Form.Control
                                        type="text"
                                        step="any"
                                        readOnly
                                        style={{
                                          border: 'none',
                                          width: '',
                                          padding: '4px 6px',
                                          textAlign: 'center'
                                        }}
                                        value={SPEC_OS_near_va}
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
                                readOnly
                                style={{
                                  width: '',
                                  padding: '4px 6px',
                                  textAlign: 'center'
                                }}
                                value={SPEC_Pro_Add}
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
                                        readOnly
                                        style={{
                                          border: 'none',
                                          width: '',
                                          padding: '4px 6px',
                                          textAlign: 'center'
                                        }}
                                        value={SPEC_RE_OD_SPH}
                                      />
                                    </Form.Group>
                                  </td>
                                  <td>
                                    <Form.Group className="mb-0" controlId="formBasicFloat">
                                      <Form.Control
                                        type="text"
                                        step="any"
                                        readOnly
                                        style={{
                                          border: 'none',
                                          width: '',
                                          padding: '4px 6px',
                                          textAlign: 'center'
                                        }}
                                        value={SPEC_RE_OD_CYL}
                                      />
                                    </Form.Group>
                                  </td>
                                  <td>
                                    <Form.Group className="mb-0" controlId="formBasicFloat">
                                      <Form.Control
                                        type="text"
                                        step="any"
                                        readOnly
                                        style={{
                                          border: 'none',
                                          width: '',
                                          padding: '4px 6px',
                                          textAlign: 'center'
                                        }}
                                        value={SPEC_RE_OD_AXIS}
                                      />
                                    </Form.Group>
                                  </td>
                                  <td>
                                    <Form.Group className="mb-0" controlId="formBasicFloat">
                                      <Form.Control
                                        type="text"
                                        step="any"
                                        readOnly
                                        style={{
                                          border: 'none',
                                          width: '',
                                          padding: '4px 6px',
                                          textAlign: 'center'
                                        }}
                                        value={SPEC_RE_OD_Prism}
                                      />
                                    </Form.Group>
                                  </td>
                                  <td>
                                    <Form.Group className="mb-0" controlId="formBasicFloat">
                                      <Form.Control
                                        type="text"
                                        step="any"
                                        readOnly
                                        style={{
                                          border: 'none',
                                          width: '',
                                          padding: '4px 6px',
                                          textAlign: 'center'
                                        }}
                                        value={SPEC_RE_OD_Base}
                                      />
                                    </Form.Group>
                                  </td>
                                  <td>
                                    <Form.Group className="mb-0" controlId="formBasicFloat">
                                      <Form.Control
                                        type="text"
                                        step="any"
                                        readOnly
                                        style={{
                                          border: 'none',
                                          width: '',
                                          padding: '4px 6px',
                                          textAlign: 'center'
                                        }}
                                        value={SPEC_RE_OD_VA}
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
                                        readOnly
                                        style={{
                                          border: 'none',
                                          width: '',
                                          padding: '4px 6px',
                                          textAlign: 'center'
                                        }}
                                        value={SPEC_RE_OS_SPH}
                                      />
                                    </Form.Group>
                                  </td>
                                  <td>
                                    {' '}
                                    <Form.Group className="mb-0" controlId="formBasicFloat">
                                      <Form.Control
                                        type="text"
                                        step="any"
                                        readOnly
                                        style={{
                                          border: 'none',
                                          width: '',
                                          padding: '4px 6px',
                                          textAlign: 'center'
                                        }}
                                        value={SPEC_RE_OS_CYL}
                                      />
                                    </Form.Group>
                                  </td>
                                  <td>
                                    <Form.Group className="mb-0" controlId="formBasicFloat">
                                      <Form.Control
                                        type="text"
                                        step="any"
                                        readOnly
                                        style={{
                                          border: 'none',
                                          width: '',
                                          padding: '4px 6px',
                                          textAlign: 'center'
                                        }}
                                        value={SPEC_RE_OS_AXIS}
                                      />
                                    </Form.Group>
                                  </td>
                                  <td>
                                    <Form.Group className="mb-0" controlId="formBasicFloat">
                                      <Form.Control
                                        type="text"
                                        step="any"
                                        readOnly
                                        style={{
                                          border: 'none',
                                          width: '',
                                          padding: '4px 6px',
                                          textAlign: 'center'
                                        }}
                                        value={SPEC_RE_OS_Prism}
                                      />
                                    </Form.Group>
                                  </td>
                                  <td>
                                    <Form.Group className="mb-0" controlId="formBasicFloat">
                                      <Form.Control
                                        type="text"
                                        step="any"
                                        readOnly
                                        style={{
                                          border: 'none',
                                          width: '',
                                          padding: '4px 6px',
                                          textAlign: 'center'
                                        }}
                                        value={SPEC_RE_OS_Base}
                                      />
                                    </Form.Group>
                                  </td>
                                  <td>
                                    <Form.Group className="mb-0" controlId="formBasicFloat">
                                      <Form.Control
                                        type="text"
                                        step="any"
                                        readOnly
                                        style={{
                                          border: 'none',
                                          width: '',
                                          padding: '4px 6px',
                                          textAlign: 'center'
                                        }}
                                        value={SPEC_RE_OS_VA}
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
                                        readOnly
                                        style={{
                                          border: 'none',
                                          width: '',
                                          padding: '4px 6px',
                                          textAlign: 'center'
                                        }}
                                        value={SPEC_UNA_DIS_OD}
                                      />
                                    </Form.Group>
                                  </td>
                                  <td>
                                    <Form.Group className="mb-0" controlId="formBasicFloat">
                                      <Form.Control
                                        type="text"
                                        step="any"
                                        readOnly
                                        style={{
                                          border: 'none',
                                          width: '',
                                          padding: '4px 6px',
                                          textAlign: 'center'
                                        }}
                                        value={SPEC_UNA_NEAR_OD}
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
                                        readOnly
                                        style={{
                                          border: 'none',
                                          width: '',
                                          padding: '4px 6px',
                                          textAlign: 'center'
                                        }}
                                        value={SPEC_UNA_DIS_OS}
                                      />
                                    </Form.Group>
                                  </td>
                                  <td>
                                    <Form.Group className="mb-0" controlId="formBasicFloat">
                                      <Form.Control
                                        type="text"
                                        step="any"
                                        readOnly
                                        style={{
                                          border: 'none',
                                          width: '',
                                          padding: '4px 6px',
                                          textAlign: 'center'
                                        }}
                                        value={SPEC_UNA_NEAR_OS}
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
                                        readOnly
                                        style={{
                                          border: 'none',
                                          width: '',
                                          padding: '4px 6px',
                                          textAlign: 'center'
                                        }}
                                        value={SPEC_Pin_OD}
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
                                        readOnly
                                        style={{
                                          border: 'none',
                                          width: '',
                                          padding: '4px 6px',
                                          textAlign: 'center'
                                        }}
                                        value={SPEC_Pin_OS}
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
                                        readOnly
                                        style={{
                                          border: 'none',
                                          width: '',
                                          padding: '4px 6px',
                                          textAlign: 'center'
                                        }}
                                        value={SPEC_IOP_OD}
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
                                        readOnly
                                        style={{
                                          border: 'none',
                                          width: '',
                                          padding: '4px 6px',
                                          textAlign: 'center'
                                        }}
                                        value={SPEC_IOP_OS}
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
                                        readOnly
                                        step="any"
                                        style={{
                                          border: 'none',
                                          width: '',
                                          padding: '4px 6px',
                                          textAlign: 'center'
                                        }}
                                        value={SPEC_RED_OD_O}
                                      />
                                    </Form.Group>
                                  </td>
                                  <td>
                                    <Form.Group className="mb-0" controlId="formBasicFloat">
                                      <Form.Control
                                        type="text"
                                        step="any"
                                        readOnly
                                        style={{
                                          border: 'none',
                                          width: '',
                                          padding: '4px 6px',
                                          textAlign: 'center'
                                        }}
                                        value={SPEC_RED_OD_T}
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
                                        readOnly
                                        style={{
                                          border: 'none',
                                          width: '',
                                          padding: '4px 6px',
                                          textAlign: 'center'
                                        }}
                                        value={SPEC_RED_OS_O}
                                      />
                                    </Form.Group>
                                  </td>
                                  <td>
                                    <Form.Group className="mb-0" controlId="formBasicFloat">
                                      <Form.Control
                                        type="text"
                                        step="any"
                                        readOnly
                                        style={{
                                          border: 'none',
                                          width: '',
                                          padding: '4px 6px',
                                          textAlign: 'center'
                                        }}
                                        value={SPEC_RED_OS_T}
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
                            <h6 className="mt-4 fw-bold mb-4">Prescribe Spectacle</h6>
                            <Form.Group className="mb-3">
                              <Form.Control
                                type="text"
                                step="any"
                                readOnly
                                style={{
                                  border: 'none',
                                  width: '',
                                  padding: '4px 6px',
                                  textAlign: 'center'
                                }}
                                value={SPEC_Type_Of_lenses_Used}
                              />
                            </Form.Group>
                          </Col>
                          <Col md={4}>
                            <h6 className="mt-4 fw-bold mb-4">_</h6>
                            <Form.Group className="mb-3">
                              <Form.Control
                                type="text"
                                step="any"
                                readOnly
                                style={{
                                  border: 'none',
                                  width: '',
                                  padding: '4px 6px',
                                  textAlign: 'center'
                                }}
                                value={SPEC_Time_Period}
                              />
                            </Form.Group>
                          </Col>
                          <Col md={4}>
                            <h6 className="mt-4 fw-bold mb-4">Lens Recommendation</h6>
                            <Form.Group className="mb-3">
                              <Form.Control
                                type="text"
                                step="any"
                                readOnly
                                style={{
                                  border: 'none',
                                  width: '',
                                  padding: '4px 6px',
                                  textAlign: 'center'
                                }}
                                value={SPEC_Time_More}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <h6 className="mt-4 fw-bold mb-4">Remark</h6>
                            <Form.Group className="mt-4" controlId="formBasicFloat">
                              <Form.Control
                                type="text"
                                step="any"
                                readOnly
                                style={{
                                  width: '',
                                  padding: '10px 6px',
                                }}
                                placeholder='Remark'
                                value={SPEC_remark}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                      </Tab>
                      {Oprimistic_Filed2 ?
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
                                          readOnly
                                          style={{
                                            border: 'none',
                                            width: '',
                                            padding: '4px 6px',
                                            textAlign: 'center'
                                          }}
                                          value={SPECOB_OD_SPH}
                                        />
                                      </Form.Group>
                                    </td>
                                    <td>
                                      <Form.Group className="mb-0" controlId="formBasicFloat">
                                        <Form.Control
                                          type="number"
                                          step="any"
                                          readOnly
                                          style={{
                                            border: 'none',
                                            width: '',
                                            padding: '4px 6px',
                                            textAlign: 'center'
                                          }}
                                          value={SPECOB_OD_CYL}
                                        />
                                      </Form.Group>
                                    </td>
                                    <td>
                                      {' '}
                                      <Form.Group className="mb-0" controlId="formBasicFloat">
                                        <Form.Control
                                          type="number"
                                          step="any"
                                          readOnly
                                          style={{
                                            border: 'none',
                                            width: '',
                                            padding: '4px 6px',
                                            textAlign: 'center'
                                          }}
                                          value={SPECOB_OD_AXIS}
                                        />
                                      </Form.Group>
                                    </td>
                                    <td>
                                      {' '}
                                      <Form.Group className="mb-0" controlId="formBasicFloat">
                                        <Form.Control
                                          type="number"
                                          step="any"
                                          readOnly
                                          style={{
                                            border: 'none',
                                            width: '',
                                            padding: '4px 6px',
                                            textAlign: 'center'
                                          }}
                                          value={SPECOB_OD_Prism}
                                        />
                                      </Form.Group>
                                    </td>
                                    <td>
                                      {' '}
                                      <Form.Group className="mb-0" controlId="formBasicFloat">
                                        <Form.Control
                                          type="number"
                                          step="any"
                                          readOnly
                                          style={{
                                            border: 'none',
                                            width: '',
                                            padding: '4px 6px',
                                            textAlign: 'center'
                                          }}
                                          value={SPECOB_OD_Base}
                                        />
                                      </Form.Group>
                                    </td>
                                    <td>
                                      {' '}
                                      <Form.Group className="mb-0" controlId="formBasicFloat">
                                        <Form.Control
                                          type="text"
                                          step="any"
                                          readOnly
                                          style={{
                                            border: 'none',
                                            width: '',
                                            padding: '4px 6px',
                                            textAlign: 'center'
                                          }}
                                          value={SPECOB_OD_VA}
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
                                          readOnly
                                          style={{
                                            border: 'none',
                                            width: '',
                                            padding: '4px 6px',
                                            textAlign: 'center'
                                          }}
                                          value={SPECOB_OD_near_full}
                                        />
                                      </Form.Group>
                                    </td>
                                    <td>
                                      <Form.Group className="mb-0" controlId="formBasicFloat">
                                        <Form.Control
                                          type="text"
                                          step="any"
                                          readOnly
                                          style={{
                                            border: 'none',
                                            width: '',
                                            padding: '4px 6px',
                                            textAlign: 'center'
                                          }}
                                          value={SPECOB_OD_near_va}
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
                                          readOnly
                                          style={{
                                            border: 'none',
                                            width: '',
                                            padding: '4px 6px',
                                            textAlign: 'center'
                                          }}
                                          value={SPECOB_OS_SPH}
                                        />
                                      </Form.Group>
                                    </td>
                                    <td>
                                      <Form.Group className="mb-0" controlId="formBasicFloat">
                                        <Form.Control
                                          type="number"
                                          step="any"
                                          readOnly
                                          style={{
                                            border: 'none',
                                            width: '',
                                            padding: '4px 6px',
                                            textAlign: 'center'
                                          }}
                                          value={SPECOB_OS_CYL}
                                        />
                                      </Form.Group>
                                    </td>
                                    <td>
                                      {' '}
                                      <Form.Group className="mb-0" controlId="formBasicFloat">
                                        <Form.Control
                                          type="number"
                                          step="any"
                                          readOnly
                                          style={{
                                            border: 'none',
                                            width: '',
                                            padding: '4px 6px',
                                            textAlign: 'center'
                                          }}
                                          value={SPECOB_OS_AXIS}
                                        />
                                      </Form.Group>
                                    </td>
                                    <td>
                                      {' '}
                                      <Form.Group className="mb-0" controlId="formBasicFloat">
                                        <Form.Control
                                          type="number"
                                          step="any"
                                          readOnly
                                          style={{
                                            border: 'none',
                                            width: '',
                                            padding: '4px 6px',
                                            textAlign: 'center'
                                          }}
                                          value={SPECOB_OS_Prism}
                                        />
                                      </Form.Group>
                                    </td>
                                    <td>
                                      {' '}
                                      <Form.Group className="mb-0" controlId="formBasicFloat">
                                        <Form.Control
                                          type="number"
                                          step="any"
                                          readOnly
                                          style={{
                                            border: 'none',
                                            width: '',
                                            padding: '4px 6px',
                                            textAlign: 'center'
                                          }}
                                          value={SPECOB_OS_Base}
                                        />
                                      </Form.Group>
                                    </td>
                                    <td>
                                      {' '}
                                      <Form.Group className="mb-0" controlId="formBasicFloat">
                                        <Form.Control
                                          type="text"
                                          step="any"
                                          readOnly
                                          style={{
                                            border: 'none',
                                            width: '',
                                            padding: '4px 6px',
                                            textAlign: 'center'
                                          }}
                                          value={SPECOB_OS_VA}
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
                                          readOnly
                                          style={{
                                            border: 'none',
                                            width: '',
                                            padding: '4px 6px',
                                            textAlign: 'center'
                                          }}
                                          value={SPECOB_OS_near_full}
                                        />
                                      </Form.Group>
                                    </td>
                                    <td>
                                      <Form.Group className="mb-0" controlId="formBasicFloat">
                                        <Form.Control
                                          type="text"
                                          step="any"
                                          readOnly
                                          style={{
                                            border: 'none',
                                            width: '',
                                            padding: '4px 6px',
                                            textAlign: 'center'
                                          }}
                                          value={SPECOB_OS_near_va}
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
                        : null}
                      {Oprimistic_Filed3 ?
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
                                      readOnly
                                      style={{
                                        border: 'none',
                                        width: '',
                                        padding: '4px 6px',
                                        textAlign: 'center'
                                      }}
                                      value={SPECCON_OD_SPH}
                                    />
                                  </Form.Group>
                                </td>
                                <td>
                                  <Form.Group className="mb-0" controlId="formBasicFloat">
                                    <Form.Control
                                      type="text"
                                      step="any"
                                      readOnly
                                      style={{
                                        border: 'none',
                                        width: '',
                                        padding: '4px 6px',
                                        textAlign: 'center'
                                      }}
                                      value={SPECCON_OD_CYL}
                                    />
                                  </Form.Group>
                                </td>
                                <td>
                                  <Form.Group className="mb-0" controlId="formBasicFloat">
                                    <Form.Control
                                      type="text"
                                      step="any"
                                      readOnly
                                      style={{
                                        border: 'none',
                                        width: '',
                                        padding: '4px 6px',
                                        textAlign: 'center'
                                      }}
                                      value={SPECCON_OD_AXIS}
                                    />
                                  </Form.Group>
                                </td>
                                <td></td>
                                <td>
                                  <Form.Group className="mb-0" controlId="formBasicFloat">
                                    <Form.Control
                                      type="text"
                                      step="any"
                                      readOnly
                                      style={{
                                        border: 'none',
                                        width: '',
                                        padding: '4px 6px',
                                        textAlign: 'center'
                                      }}
                                      value={SPECCON_OD_VA}
                                    />
                                  </Form.Group>
                                </td>
                                <td>
                                  <Form.Group className="mb-0" controlId="formBasicFloat">
                                    <Form.Control
                                      type="text"
                                      step="any"
                                      readOnly
                                      style={{
                                        border: 'none',
                                        width: '',
                                        padding: '4px 6px',
                                        textAlign: 'center'
                                      }}
                                      value={SPECCON_OD_B_Curve}
                                    />
                                  </Form.Group>
                                </td>
                                <td>
                                  <Form.Group className="mb-0" controlId="formBasicFloat">
                                    <Form.Control
                                      type="text"
                                      readOnly
                                      step="any"
                                      style={{
                                        border: 'none',
                                        width: '',
                                        padding: '4px 6px',
                                        textAlign: 'center'
                                      }}
                                      value={SPECCON_OD_Diam}
                                    />
                                  </Form.Group>
                                </td>
                                <td>
                                  <Form.Group className="mb-0" controlId="formBasicFloat">
                                    <Form.Control
                                      type="text"
                                      step="any"
                                      readOnly
                                      style={{
                                        border: 'none',
                                        width: '',
                                        padding: '4px 6px',
                                        textAlign: 'center'
                                      }}
                                      value={SPECCON_OD_Design}
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
                                      readOnly
                                      style={{
                                        border: 'none',
                                        width: '',
                                        padding: '4px 6px',
                                        textAlign: 'center'
                                      }}
                                      value={SPECCON_OS_SPH}
                                    />
                                  </Form.Group>
                                </td>
                                <td>
                                  <Form.Group className="mb-0" controlId="formBasicFloat">
                                    <Form.Control
                                      type="text"
                                      step="any"
                                      readOnly
                                      style={{
                                        border: 'none',
                                        width: '',
                                        padding: '4px 6px',
                                        textAlign: 'center'
                                      }}
                                      value={SPECCON_OS_CYL}
                                    />
                                  </Form.Group>
                                </td>
                                <td>
                                  <Form.Group className="mb-0" controlId="formBasicFloat">
                                    <Form.Control
                                      type="text"
                                      readOnly
                                      step="any"
                                      style={{
                                        border: 'none',
                                        width: '',
                                        padding: '4px 6px',
                                        textAlign: 'center'
                                      }}
                                      value={SPECCON_OS_AXIS}
                                    />
                                  </Form.Group>
                                </td>
                                <td></td>
                                <td>
                                  <Form.Group className="mb-0" controlId="formBasicFloat">
                                    <Form.Control
                                      type="text"
                                      step="any"
                                      readOnly
                                      style={{
                                        border: 'none',
                                        width: '',
                                        padding: '4px 6px',
                                        textAlign: 'center'
                                      }}
                                      value={SPECCON_OS_VA}
                                    />
                                  </Form.Group>
                                </td>
                                <td>
                                  <Form.Group className="mb-0" controlId="formBasicFloat">
                                    <Form.Control
                                      type="text"
                                      step="any"
                                      readOnly
                                      style={{
                                        border: 'none',
                                        width: '',
                                        padding: '4px 6px',
                                        textAlign: 'center'
                                      }}
                                      value={SPECCON_OS_B_Curve}
                                    />
                                  </Form.Group>
                                </td>
                                <td>
                                  <Form.Group className="mb-0" controlId="formBasicFloat">
                                    <Form.Control
                                      type="text"
                                      step="any"
                                      readOnly
                                      style={{
                                        border: 'none',
                                        width: '',
                                        padding: '4px 6px',
                                        textAlign: 'center'
                                      }}
                                      value={SPECCON_OS_Diam}
                                    />
                                  </Form.Group>
                                </td>
                                <td>
                                  <Form.Group className="mb-0" controlId="formBasicFloat">
                                    <Form.Control
                                      type="text"
                                      step="any"
                                      readOnly
                                      style={{
                                        border: 'none',
                                        width: '',
                                        padding: '4px 6px',
                                        textAlign: 'center'
                                      }}
                                      value={SPECCON_OS_Design}
                                    />
                                  </Form.Group>
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Remarks</Form.Label>
                            <Form.Control readOnly as="textarea" rows="3" value={SPECCON_remark} onChange={(e) => set_SPECCON_Remark(e.target.value)} />
                          </Form.Group>
                        </Tab>
                        : null}
                      <Tab eventKey="fundus" title="Fundus"></Tab>
                      <Tab eventKey="reports" title="Reports"></Tab>
                    </Tabs>
                    : null}

                  {Oprimistic_Filed4 ?
                    <div className="my-4 p-3 bg-light rounded shadow-sm">
                      <h6 className="fw-bold text-primary" style={{ textAlign: 'center', fontSize: 15 }}>
                        Assistance Filled Details
                      </h6>
                    </div>
                    : null}

                  {Oprimistic_Filed4 ?
                    <Row>
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
                                  <Form.Control
                                    type="text"
                                    step="any"
                                    readOnly
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '6px 8px',
                                      textAlign: 'center'
                                    }}
                                    value={Lens_Material}
                                  />
                                </Form.Group>
                              </td>
                            </tr>
                            <tr>
                              <td>02</td>
                              <td>Lenses Type</td>
                              <td>
                                <Form.Group controlId="exampleForm.ControlSelect1">
                                  <Form.Control
                                    type="text"
                                    step="any"
                                    readOnly
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '6px 8px',
                                      textAlign: 'center'
                                    }}
                                    value={Lenses_Type}
                                  />
                                </Form.Group>
                              </td>
                            </tr>
                            <tr>
                              <td>03</td>
                              <td>Lens Treatment</td>
                              <td>
                                <Form.Group controlId="exampleForm.ControlSelect1">
                                  <Form.Control
                                    type="text"
                                    step="any"
                                    readOnly
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '6px 8px',
                                      textAlign: 'center'
                                    }}
                                    value={Lens_Treatment}
                                  />
                                </Form.Group>
                              </td>
                            </tr>
                            <tr>
                              <td>04</td>
                              <td>Lens Colour</td>
                              <td>
                                <Form.Group controlId="exampleForm.ControlSelect1">
                                  <Form.Control
                                    type="text"
                                    step="any"
                                    readOnly
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '6px 8px',
                                      textAlign: 'center'
                                    }}
                                    value={Lens_Colour}
                                  />
                                </Form.Group>
                              </td>
                            </tr>
                            <tr>
                              <td>05</td>
                              <td>Lens Size</td>
                              <td>
                                <Form.Group controlId="exampleForm.ControlSelect1">
                                  <Form.Control
                                    type="text"
                                    step="any"
                                    readOnly
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '6px 8px',
                                      textAlign: 'center'
                                    }}
                                    value={Lens_Size}
                                  />
                                </Form.Group>
                              </td>
                            </tr>
                            <tr>
                              <td>06</td>
                              <td>Lens Base</td>
                              <td>
                                <Form.Group controlId="exampleForm.ControlSelect1">
                                  <Form.Control
                                    type="text"
                                    step="any"
                                    readOnly
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '6px 8px',
                                      textAlign: 'center'
                                    }}
                                    value={Lens_Base}
                                  />
                                </Form.Group>
                              </td>
                            </tr>
                            <tr>
                              <td>07</td>
                              <td>Lens Brand</td>
                              <td>
                                <Form.Group controlId="exampleForm.ControlSelect1">
                                  <Form.Control
                                    type="text"
                                    step="any"
                                    readOnly
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '6px 8px',
                                      textAlign: 'center'
                                    }}
                                    value={Lens_Brand}
                                  />
                                </Form.Group>
                              </td>
                            </tr>
                            <tr>
                              <td>08</td>
                              <td>Lenses At</td>
                              <td>
                                <Form.Group controlId="exampleForm.ControlSelect1">
                                  <Form.Control
                                    type="text"
                                    step="any"
                                    readOnly
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '6px 8px',
                                      textAlign: 'center'
                                    }}
                                    value={Lenses_At}
                                  />
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
                                    readOnly
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
                                    type="text"
                                    step="any"
                                    readOnly
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    value={Lens_OrderDate}
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
                                    type="text"
                                    readOnly
                                    step="any"
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '4px 6px',
                                      textAlign: 'center'
                                    }}
                                    value={Lens_wanted_on}
                                  />
                                </Form.Group>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                          <Form.Label>Remarks</Form.Label>
                          <Form.Control readOnly as="textarea" rows="3" value={Lense_Description} />
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
                                  <Form.Control
                                    type="text"
                                    step="any"
                                    readOnly
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '6px 8px',
                                      textAlign: 'center'
                                    }}
                                    value={Frame_Category}
                                  />
                                </Form.Group>
                              </td>
                            </tr>
                            <tr>
                              <td>02</td>
                              <td>Frame Material </td>
                              <td>
                                <Form.Group controlId="exampleForm.ControlSelect1">
                                  <Form.Control
                                    type="text"
                                    step="any"
                                    readOnly
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '6px 8px',
                                      textAlign: 'center'
                                    }}
                                    value={Frame_Material}
                                  />
                                </Form.Group>
                              </td>
                            </tr>
                            <tr>
                              <td>03</td>
                              <td>Frame type</td>
                              <td>
                                <Form.Group controlId="exampleForm.ControlSelect1">
                                  <Form.Control
                                    type="text"
                                    step="any"
                                    readOnly
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '6px 8px',
                                      textAlign: 'center'
                                    }}
                                    value={Frame_type}
                                    onChange={(e) => setFrame_Brand(e.target.value)}
                                  />
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
                                    readOnly
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
                                    readOnly
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
                                  <Form.Control
                                    type="text"
                                    step="any"
                                    readOnly
                                    style={{
                                      border: 'none',
                                      width: '',
                                      padding: '6px 8px',
                                      textAlign: 'center'
                                    }}
                                    value={Colour}
                                  />
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
                                    readOnly
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
                                    readOnly
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
                                    readOnly
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
                                    readOnly
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
                                    readOnly
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
                          <Form.Control readOnly as="textarea" rows="3" value={Freame_Description} />
                        </Form.Group>

                      </Col>
                      <Col md={4}>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                          <Form.Label>Doctor Rx</Form.Label>
                          <Form.Control
                            type="text"
                            step="any"
                            readOnly
                            style={{
                              border: 'none',
                              width: '',
                              padding: '6px 8px',
                              textAlign: 'center'
                            }}
                            value={Doctor_Rx}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                          <Form.Label>Tested By</Form.Label>
                          <Form.Control
                            type="text"
                            step="any"
                            readOnly
                            style={{
                              border: 'none',
                              width: '',
                              padding: '6px 8px',
                              textAlign: 'center'
                            }}
                            value={Tested_By}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                          <Form.Label>Entered By</Form.Label>
                          <Form.Control
                            type="text"
                            step="any"
                            readOnly
                            style={{
                              border: 'none',
                              width: '',
                              padding: '6px 8px',
                              textAlign: 'center'
                            }}
                            value={Entered_By}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    : null}
                  {Button_Show_Status == true ?
                    <Button variant="outline-primary" size="sm" className="mt-3" onClick={submitNewOrder}>
                      Submit
                    </Button>
                    : null}

                </Col>
              </Row>
            </Form>

          </Card.Body>
        </Card>
      ) : null}

      {/* New Customer Registration Form */}
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Register New Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Container>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-1">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="Customer Name" onChange={(e) => setfirstName(e.target.value)} />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-1">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Customer Name" onChange={(e) => setname(e.target.value)} />
                  </Form.Group>
                </Col>
                <Col xs={12} md={12}>
                  <Form.Group className="mb-1" controlId="formGender">
                    <Form.Label>Titles</Form.Label>
                    <div>
                      {["Mr.", "Mrs.", "Master.", "Miss./Ms", "Dr.", "Prof.", "Rev."].map((title, i) => (
                        <Form.Check
                          key={i}
                          type="radio"
                          label={title}
                          name="titles" // group name so only one can be selected
                          value={title}
                          checked={titles === title}
                          onChange={(e) => settitles(e.target.value)}
                          inline // keeps them in a row
                        />
                      ))}
                    </div>
                  </Form.Group>
                </Col>
                <Col xs={12} md={8}>
                  <Form.Group className="mb-1" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="Address" onChange={(e) => setaddress(e.target.value)} />
                  </Form.Group>
                </Col>
                <Col xs={12} md={4}>
                  <Form.Group className="mb-1">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" placeholder="City" onChange={(e) => setcity(e.target.value)} />
                  </Form.Group>
                </Col>

                <Col xs={12} md={2}>
                  <Form.Group className="mb-1" controlId="dob">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control type="date" value={dob} onChange={handleDobChange} />
                  </Form.Group>
                </Col>

                <Col xs={12} md={2}>
                  <Form.Group className="mb-1" controlId="age">
                    <Form.Label>Age</Form.Label>
                    <Form.Control type="number" value={age} readOnly />
                    <Form.Text className="text-muted">This&apos;s automatically genorated.</Form.Text>
                  </Form.Group>
                </Col>
                {/* 
                <Col xs={12} md={4}>
                  <Form.Group className="mb-1">
                    <Form.Label>NIC</Form.Label>
                    <Form.Control type="text" placeholder="1212121212112 V" onChange={(e) => setnic(e.target.value)} />
                  </Form.Group>
                </Col> */}
                <Col xs={12} md={4}>
                  <Form.Group className="mb-1">
                    <Form.Label>NIC</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="121212121211"
                      value={nic}
                      onChange={handleNicChange}
                    />
                    {nicError && <Form.Text className="text-danger">{nicError}</Form.Text>}
                  </Form.Group>
                </Col>

                <Col xs={12} md={4}>
                  <Form.Group className="mb-1" controlId="formGender">
                    <Form.Label>Gender</Form.Label>
                    <div>
                      {["male", "female", "other"].map((g, i) => (
                        <Form.Check
                          key={i}
                          type="radio"
                          label={g.charAt(0).toUpperCase() + g.slice(1)}
                          name="gender" // 👈 ensures only one can be selected
                          value={g}
                          checked={gender === g}
                          onChange={(e) => setgender(e.target.value)}
                          inline // 👈 makes them appear side by side
                        />
                      ))}
                    </div>
                  </Form.Group>
                </Col>

                <Col xs={12} md={4}>
                  <Form.Group className="mb-1">
                    <Form.Label>Mobile 1</Form.Label>
                    <Form.Control
                      type="tel"
                      value={telephone}
                      onChange={handlePhoneChange}
                    />
                    {getPhoneError(telephone) && (
                      <Form.Text className="text-danger">
                        {getPhoneError(telephone)}
                      </Form.Text>
                    )}
                  </Form.Group></Col>

                <Col xs={12} md={4}>
                  <Form.Group className="mb-1">
                    <Form.Label>Mobile 2</Form.Label>
                    <Form.Control
                      type="tel"
                      value={mobile2}
                      onChange={handlePhoneChange2}
                    />
                    {getPhoneError2(mobile2) && (
                      <Form.Text className="text-danger">
                        {getPhoneError2(mobile2)}
                      </Form.Text>
                    )}
                  </Form.Group>
                </Col>

                <Col xs={12} md={4}>
                  <Form.Group className="mb-1">
                    <Form.Label>Landline</Form.Label>
                    <Form.Control
                      type="tel"
                      value={lanMobile}
                      onChange={handlePhoneChange3}
                    />
                    {getPhoneError3(lanMobile) && (
                      <Form.Text className="text-danger">
                        {getPhoneError3(lanMobile)}
                      </Form.Text>
                    )}
                  </Form.Group>
                </Col>

                <Col xs={12} md={6}>
                  <Form.Group className="mb-1" controlId="formBasicPassword">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="abc@gmail.com" onChange={(e) => setemail(e.target.value)} />
                  </Form.Group>
                </Col>

                <Col xs={12} md={6}>
                  <Form.Group className="mb-1" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Occupation</Form.Label>
                    <Form.Control type="text" placeholder="Occupation" onChange={(e) => setoccupation(e.target.value)} />
                  </Form.Group>
                </Col>
              </Row>
            </Container>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={submitNewCustomer}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEditModal2} onHide={() => setShowEditModal2(false)} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Edit Customer Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>


          <Form>
            <Container>
              <Row>
                {/* <Col xs={12} md={2}>
                  <Form.Group className="mb-3" controlId="formTitlesText">
                    <Form.Label>Titles</Form.Label>
                    <Form.Control type="text" name="titles" value={editData.titles || ""} onChange={handleChange2} />
                  </Form.Group>
                </Col> */}

                <Col xs={12} md={6}>
                  <Form.Group className="mb-1">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" name="first_name" value={editData.first_name || ""} onChange={handleChange2} />
                  </Form.Group>
                </Col>

                <Col xs={12} md={6}>
                  <Form.Group className="mb-1">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" name="name" value={editData.name || ""} onChange={handleChange2} />
                  </Form.Group>
                </Col>

                <Col xs={12} md={12}>
                  <Form.Group className="mb-1" controlId="formTitlesRadio">
                    <Form.Label>Titles</Form.Label>
                    <div>
                      {["Mr.", "Mrs.", "Master.", "Miss./Ms", "Dr.", "Prof.", "Rev."].map((title, i) => (
                        <Form.Check
                          key={i}
                          type="radio"
                          label={title}
                          name="prefix" // maps to editData.prefix
                          value={title}
                          checked={editData.prefix === title}
                          onChange={handleChange2}
                          inline
                        />
                      ))}
                    </div>
                  </Form.Group>
                </Col>

                <Col xs={12} md={8}>
                  <Form.Group className="mb-1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" name="address" value={editData.address || ""} onChange={handleChange2} />
                  </Form.Group>
                </Col>

                <Col xs={12} md={4}>
                  <Form.Group className="mb-1">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" name="town" value={editData.town || ""} onChange={handleChange2} />
                  </Form.Group>
                </Col>

                <Col xs={12} md={6}>
                  <Form.Group className="mb-1">
                    <Form.Label>NIC</Form.Label>
                    <Form.Control type="text" name="nic" value={editData.nic || ""} onChange={handleChange2} />
                  </Form.Group>
                </Col>


                <Col xs={12} md={6}>
                  <Form.Group className="mb-1">
                    <Form.Label>Gender</Form.Label>
                    <div>
                      {["male", "female", "other"].map((g, i) => (
                        <Form.Check
                          key={i}
                          type="radio"
                          label={g.charAt(0).toUpperCase() + g.slice(1)}
                          name="gender"
                          value={g}
                          checked={editData.gender === g}
                          onChange={handleChange2}
                          inline
                        />
                      ))}
                    </div>
                  </Form.Group>
                </Col>

                <Col xs={12} md={4}>
                  <Form.Group className="mb-1">
                    <Form.Label>Mobile 1</Form.Label>
                    <Form.Control type="tel" name="telephone" value={editData.telephone || ""} onChange={handleChange2} />
                  </Form.Group>
                </Col>

                <Col xs={12} md={4}>
                  <Form.Group className="mb-1">
                    <Form.Label>Mobile 2</Form.Label>
                    <Form.Control type="tel" name="mobile2" value={editData.mobile2 || ""} onChange={handleChange2} />
                  </Form.Group>
                </Col>

                <Col xs={12} md={4}>
                  <Form.Group className="mb-1">
                    <Form.Label>Landline</Form.Label>
                    <Form.Control type="tel" name="lan_phone" value={editData.lan_phone || ""} onChange={handleChange2} />
                  </Form.Group>
                </Col>

                <Col xs={12} md={6}>
                  <Form.Group className="mb-1">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={editData.email || ""} onChange={handleChange2} />
                  </Form.Group>
                </Col>

                <Col xs={12} md={6}>
                  <Form.Group className="mb-1">
                    <Form.Label>Occupation</Form.Label>
                    <Form.Control type="text" name="occupation" value={editData.occupation || ""} onChange={handleChange2} />
                  </Form.Group>
                </Col>
              </Row>
            </Container>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal2(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default AssistanceOrder;
