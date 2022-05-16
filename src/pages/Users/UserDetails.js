import React, { useState, useEffect } from "react";
import { isEmpty, map } from "lodash";
import user from "./../../assets/images/user-photo.png";
import arrowup from "./../../assets/images/arrow-up.svg";
import arrowdown from "./../../assets/images/arrow-down.svg";
import user1 from "./../../assets/images/user-3.jpg";
import UserBlockModel from "./UserBlockModel";
import UserPaymentModel from "./UserPaymentModel";
import UserDeactiveModel from "./UserDeactiveModel";
import Header from "../../component/Header";
import {
  getRecentTransactionCount,
  getRecentTransactionAll,
  getRecentTransactionExportAll,
  getUserDetailsApi,
} from "../../redux/action/UserAction/UserAction";
import { getCategorySubList } from "../../redux/action/SettingAction/SettingAction";
import { useDispatch, useSelector } from "react-redux";
import exportFromJSON from "export-from-json";
import moment from "moment";

import { getTransactionDetailsApiDataExport } from "../../redux/action/TransactionAction/TransactionAction";
import { approvelsAddAPiRequest } from "../../redux/action/Approvels/ApprovelsAction";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { jsPDF } from "jspdf";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import { GET_TRASACTION_DETAILS_API_EXPORT_CLEAR } from "../../redux/action/actionTypes";
import ExportData from "../Transactions/export.js";
import ApprovalId from "../Users/KycApprovalIdModal";
const UsersDetails = (props) => {
  const dispatch = useDispatch();
  const [isUserBlock, setIsUserBlock] = useState(false);
  const [isUserPayment, setIsUserPayment] = useState(false);
  const [isUserDeactive, setIsUserDeactive] = useState(false);
  const [isShowApprovalId, setIsShowApprovalId] = useState(false);
  const [isUserData, setIsUserData] = useState(false);
  const [isTransactionMonth, setIsTransactionMonth] = useState(0);
  const [isTransactionMonthPer, setIsTransactionMonthPer] = useState("");
  const [isTransactionSend, setIsTransactionSend] = useState(0);
  const [isTransactionSendPer, setIsTransactionSendPer] = useState("");
  const [isTransactionReceive, setIsTransactionReceive] = useState(0);
  const [isTransactionReceivePer, setIsTransactionReceivePer] = useState("");

  const [isUserFilter, setIsUserFilter] = useState(false);

  const [isCurrentPage, setIsCurrentPage] = useState(1);
  const [isSort, setIsSort] = useState("");
  const [isStatus, setIsStatus] = useState([]);
  const [sortStatus, setSortStatus] = useState([]);
  const [mathodStatus, setMathodStatus] = useState([]);
  const [isCatType, setIsCatType] = useState([]);
  const [showCalender, setShowCalender] = useState(false);
  const [isCalenderDate, setIsCalenderDate] = useState("");
  const [isCalnder, setIsCalnder] = useState(true);
  const [isThisMonthToatal, setIsThisMonthToatal] = useState(true);
  const [isSentTotal, setIsSentTotal] = useState(true);
  const [isReceivedTotal, setIsReceivedTotal] = useState(true);
  const adminPermission = useSelector(
    (state) => state.loginData.loginSuccesData
  );
  const userRecetCount = useSelector(
    (state) => state.userData.userRecentTransactionCount
  );
  const allTransaction = useSelector(
    (state) => state.userData.userRecentTransactionAll
  );
  const catSubCatData = useSelector(
    (state) => state.settingData.getCatSubcatData
  );
  const exportDataApi = useSelector(
    (state) => state.userData.exportTransactionObj
  );
  const transactionDetail = useSelector(
    (state) => state.transactionData.tranactionApiDatailExport
  );
  const userDetails = useSelector((state) => state.userData.userDetailsObj);
  const [dataDisplayArr, setDisplayArr] = useState([]);
  const [vlaueIndex, setValueIndex] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [exportDesable, setDesableExport] = useState(false);
  useEffect(() => {
    if (Object.keys(transactionDetail).length !== 0) {
      const doc = new jsPDF("p", "pt", "a4");

      let a = renderToString(
        <ExportData
          data={transactionDetail.data.transactionDetails}
          schoolData={transactionDetail.data?.paymentDetails}
        />
      );

      doc.html(a, {
        callback: function (doc) {
          doc.save("transactionDetails.pdf");
          //window.open(doc.output('bloburl'))
          dispatch({
            type: GET_TRASACTION_DETAILS_API_EXPORT_CLEAR,
            payload: "",
          });
        },
      });
    }
  }, [transactionDetail]);

  useEffect(() => {
    if (Object.keys(userDetails).length !== 0) {
      let a = [];
      if (userDetails?.user?.currentAccountType === "Business") {
        a.push({
          logo: userDetails?.user?.companyLogo,
          Bname: userDetails?.user?.companyName,
          type: "Business",
        });
      } else {
        a.push({
          logo: userDetails?.user?.avtarImage,
          Bname: userDetails?.user?.name,
          type: "Individual",
        });
      }

      setDisplayArr(a);
      let aIndex = a.findIndex(function (person) {
        return person.type === userDetails?.user?.currentAccountType;
      });

      setValueIndex(aIndex);
    }
  }, [userDetails]);

  useEffect(() => {
    dispatch(getUserDetailsApi(props.location.state.item.id));
    dispatch(getCategorySubList());
  }, []);
  useEffect(() => {
    dispatch(
      getRecentTransactionAll({
        phone: props.location.state.item.phone,
        status: isStatus,
        type: isCatType,
        method: [],
        sort: "",
        time: "all-time",

        page: isCurrentPage,
      })
    );
    dispatch(
      getRecentTransactionCount({ phone: props.location.state.item.phone })
    );
    dispatch(
      getRecentTransactionExportAll({
        phone: props.location.state.item.phone,
        status: isStatus,
        type: isCatType,
        method: [],
        sort: "",
        time: "all-time",
        export: true,
        page: isCurrentPage,
      })
    );
  }, []);
  const calenderToggle = () => {
    setIsCalnder(!isCalnder);
  };

  const getFilter = (page) => {
    const formData = {
      phone: props.location.state.item.phone,
      status: isStatus,
      type: isCatType,
      method: mathodStatus,
      sort: sortStatus.toString(),
      time: isSort ? isSort : "all-time",

      page: page,
    };
    return formData;
  };

  const clearFilter = () => {
    setIsCatType([]);
    setIsStatus([]);
    setSortStatus([]);
    setMathodStatus([]);
  };

  const paginationHander = (pageNumber) => {
    setIsCurrentPage(pageNumber);
    let formData = getFilter(pageNumber);
    setIsUserFilter(false);
    dispatch(getRecentTransactionAll(formData));
  };

  const nextPaginationHander = (pageNumber) => {
    if (isCurrentPage !== pageNumber) {
      const p = isCurrentPage + 1;
      setIsCurrentPage(p);

      let formData = getFilter(p);
      setIsUserFilter(false);
      dispatch(getRecentTransactionAll(formData));
    }
  };

  const previousPaginationHander = () => {
    if (isCurrentPage > 1) {
      const p = isCurrentPage - 1;
      setIsCurrentPage(p);

      let formData = getFilter(p);
      setIsUserFilter(false);
      dispatch(getRecentTransactionAll(formData));
    }
  };

  const firstPaginationHander = () => {
    const p = 1;
    setIsCurrentPage(p);

    let formData = getFilter(p);
    setIsUserFilter(false);
    dispatch(getRecentTransactionAll(formData));
  };
  const lastPaginationHander = (pageNumber) => {
    const p = pageNumber;
    setIsCurrentPage(p);

    let formData = getFilter(p);
    setIsUserFilter(false);
    dispatch(getRecentTransactionAll(formData));
  };

  const applyFilter = (e) => {
    setDesableExport(false);
    setSearchText("");
    e.preventDefault();
    setIsUserFilter(false);

    let formData = getFilter(isCurrentPage);

    dispatch(getRecentTransactionAll(formData));
    let neExObj = getFilter(isCurrentPage);
    neExObj.export = true;
    dispatch(getRecentTransactionExportAll(neExObj));
  };

  useEffect(() => {
    recentTransactionCount();
  }, [userRecetCount]);
  const sortHander = (e) => {
    if (e.currentTarget.value === "custom_range") {
      const formData = {
        phone: props.location.state.item.phone,
        status: isStatus,
        type: isCatType,
        method: mathodStatus,
        sort: sortStatus,
        custom_range: isCalenderDate,
        page: isCurrentPage,
      };
      dispatch(getRecentTransactionAll(formData));
      let a = {
        phone: props.location.state.item.phone,
        status: isStatus,
        type: isCatType,
        method: mathodStatus,
        sort: sortStatus,
        custom_range: isCalenderDate,
        page: isCurrentPage,
        export: true,
      };
      dispatch(getRecentTransactionExportAll(a));
      setShowCalender(true);
    } else {
      setShowCalender(false);
      const formData = {
        phone: props.location.state.item.phone,
        status: isStatus,
        type: isCatType,
        method: mathodStatus,
        sort: sortStatus,
        time: e.currentTarget.value,
        page: isCurrentPage,
      };
      dispatch(getRecentTransactionAll(formData));
      let a = {
        phone: props.location.state.item.phone,
        status: isStatus,
        type: isCatType,
        method: mathodStatus,
        sort: sortStatus,
        time: e.currentTarget.value,
        page: isCurrentPage,
        export: true,
      };
      dispatch(getRecentTransactionExportAll(a));
      setIsSort(e.currentTarget.value);
    }
  };
  const exportData = () => {
    if (exportDesable) {
      return true;
    } else {
      const data = exportDataApi && exportDataApi?.result;
      const fileName = "download";
      const exportType = exportFromJSON.types.xls;
      exportFromJSON({ data, fileName, exportType });
    }
  };
  const serchDatacall = () => {
    dispatch(
      getRecentTransactionAll({
        phone: props.location.state.item.phone,
        search: true,
        searchText: searchText,
      })
    );
  };
  useEffect(() => {
    if (allTransaction && allTransaction?.search === true) {
      setDesableExport(true);
    }
  }, [allTransaction]);
  const refundBtn = (con, data) => {
    const resData = {
      action: "Refund",
      action_status: 1,
      comment: "Refund amount ",
      details: data,
    };

    if (con == "Debited") {
      if (adminPermission?.permissions) {
        if (
          adminPermission.permissions[0].transactions.refund === "full_access"
        ) {
          dispatch(approvelsAddAPiRequest(resData));
        } else if (
          adminPermission.permissions[0].transactions.refund === "view_only"
        ) {
          return true;
        } else {
          dispatch(approvelsAddAPiRequest(resData));
        }
      } else {
        dispatch(approvelsAddAPiRequest(resData));
      }
    } else {
      return true;
    }
  };
  const renderTransactionList = () => {
    if (!isEmpty(allTransaction) && allTransaction.result != undefined) {
      return (
        !isEmpty(allTransaction) &&
        allTransaction.result.map((item, index) => {
          const {
            transactionId,
            transactionStatus,
            transactionDate,
            amount,
            senderAvtar,
            receiverAvtar,
            senderName,
            receiverName,
            paymentType,
            accountType,
            paymentThrough,
            type,
            senderPhone,
            receiverPhone,
          } = item;
          return (
            <tr style={{ cursor: "pointer" }}>
              <td>#{transactionId}</td>
              <td>
                <div className="date">
                  {moment(transactionDate).format("LL")}{" "}
                  <span>{moment(transactionDate).format("hh:mm A")}</span>{" "}
                </div>
              </td>
              <td>
                <div className="sender">
                  <span className="sender-img">
                    <img src={senderAvtar} alt="" />
                  </span>
                  <span className="sender-txt">
                    {senderName} <br />
                  </span>
                </div>
              </td>
              <td>
                <div className="sender">
                  <span className="sender-img">
                    <img src={receiverAvtar} alt="" />
                  </span>
                  <span className="sender-txt">
                    {receiverName} <br />{" "}
                  </span>
                </div>
              </td>
              <td>GH₵{amount}</td>
              <td>{transactionStatus}</td>
              <td>{paymentType}</td>
              <td>{type}</td>
              <td>
                {/* <a className="action-link" href="javascript:void(0)"><i className="icon-icon-refund" /></a>
          <a className="action-link" href="javascript:void(0)"><i className="icon-icon-download" /></a> */}
                <button
                  className={`action-link statuslink ${
                    adminPermission.role === "admin" &&
                    adminPermission.permissions[0].transactions.refund ===
                      "view_only"
                      ? "disabled"
                      : ""
                  } ${
                    transactionStatus === "Debited"
                      ? "activeBtnColor"
                      : "disabled"
                  }`}
                  style={{ border: "none", position: "relative" }}
                  onClick={() => {
                    refundBtn(transactionStatus, item);
                  }}
                >
                  <i className="icon-icon-refund" />
                </button>
                <button
                  className="action-link statuslink"
                  style={{ border: "none", position: "relative" }}
                  onClick={() => {
                    exportPdf(item);
                  }}
                >
                  <i className="icon-icon-download" />
                </button>
              </td>
            </tr>
          );
        })
      );
    } else {
      return (
        <div>
          <p className="text-center">Loading...</p>
        </div>
      );
    }
  };
  const exportPdf = (s) => {
    dispatch(getTransactionDetailsApiDataExport(s.transactionId));
  };
  const onChangeSortHandler = (e) => {
    if (e.target.checked) {
      setSortStatus(e.target.value);
    }
  };
  const paginationList = () => {
    const pageNumbers = [];
    for (var i = 1; i <= allTransaction?.totalPage; i++) {
      pageNumbers.push(i);
    }
    if (allTransaction?.totalPage > 3) {
    }
    const renderPageNumbers = pageNumbers.map((number) => {
      if (
        number === allTransaction?.currentPage - 2 ||
        number === allTransaction?.currentPage + 2
      ) {
        return <span>...</span>;
      } else if (
        number < 2 ||
        number === pageNumbers.length ||
        allTransaction?.currentPage === number ||
        allTransaction?.currentPage === number - 1 ||
        allTransaction?.currentPage === number + 1
      ) {
        return (
          <li key={number} onClick={(i) => paginationHander(number)}>
            <a
              className={allTransaction?.currentPage == number ? "active" : ""}
            >
              {number}
            </a>
          </li>
        );
      }
    });
    return (
      <ul>
        <li>
          <a className="nxt" onClick={() => firstPaginationHander()}>
            <i className="fa fa-angle-double-left" aria-hidden="true" />
          </a>
        </li>
        <li>
          <a className="nxt" onClick={() => previousPaginationHander()}>
            <i className="fa fa-angle-left" aria-hidden="true" />
          </a>
        </li>
        {renderPageNumbers}
        <li>
          <a
            className="nxt"
            onClick={() => nextPaginationHander(allTransaction?.totalPage)}
          >
            <i className="fa fa-angle-right" aria-hidden="true" />
          </a>
        </li>
        <li>
          <a
            className="nxt"
            onClick={() => lastPaginationHander(allTransaction?.totalPage)}
          >
            <i className="fa fa-angle-double-right" aria-hidden="true" />
          </a>
        </li>
      </ul>
    );
  };
  const onChangeTypeHandler = (e) => {
    const options2 = isCatType;
    let index2;
    if (e.target.checked) {
      options2.push(e.target.value);
    } else {
      index2 = options2.indexOf(+e.target.value);
      options2.splice(index2, 1);
    }

    setIsCatType(options2);
  };

  const onChangeStatusHandler = (e) => {
    const options = isStatus;
    let index;
    if (e.target.checked) {
      options.push(e.target.value);
    } else {
      index = options.indexOf(e.target.value);
      options.splice(index, 1);
    }

    options.sort();

    setIsStatus(options);
  };

  const onChangeMethodHandler = (e) => {
    const options = mathodStatus;
    let index;
    if (e.target.checked) {
      options.push(e.target.value);
    } else {
      index = options.indexOf(e.target.value);
      options.splice(index, 1);
    }

    options.sort();

    setMathodStatus(options);
  };

  const recentTransactionCount = () => {
    if (!isEmpty(userRecetCount?.result)) {
      let transactionMonthPercent = 0;
      let transactionSentPercent = 0;
      let transactionReceivePercent = 0;
      let transactionMonthTotal = "";
      let tranactionSendTotal = "";
      let transactionReceiveTotal = "";

      if (
        userRecetCount.result.currentMonth?.totalTransaction >
        userRecetCount.result.lastMonth?.totalTransaction
      ) {
        transactionMonthTotal =
          userRecetCount.result.currentMonth.totalTransaction -
          userRecetCount.result.lastMonth.totalTransaction;
        transactionMonthPercent =
          (transactionMonthTotal /
            userRecetCount.result.currentMonth.totalTransaction) *
          100;
      } else {
        transactionMonthTotal =
          userRecetCount.result.currentMonth?.totalTransaction -
          userRecetCount.result.lastMonth?.totalTransaction;
        transactionMonthPercent =
          (transactionMonthTotal /
            userRecetCount.result.lastMonth?.totalTransaction) *
          100;
      }
      setIsTransactionMonth(
        userRecetCount.result.currentMonth?.totalTransaction
      );
      setIsTransactionMonthPer(
        isNaN(transactionMonthPercent.toFixed(0))
          ? 0
          : transactionMonthPercent.toFixed(0)
      );

      if (
        userRecetCount.result.currentMonth?.totalSent >
        userRecetCount.result.lastMonth?.totalSent
      ) {
        tranactionSendTotal =
          userRecetCount.result.currentMonth.totalSent -
          userRecetCount.result.lastMonth.totalSent;
        transactionMonthPercent =
          (tranactionSendTotal / userRecetCount.result.currentMonth.totalSent) *
          100;
      } else {
        tranactionSendTotal =
          userRecetCount.result.currentMonth?.totalSent -
          userRecetCount.result.lastMonth?.totalSent;
        transactionSentPercent =
          (tranactionSendTotal / userRecetCount.result.lastMonth?.totalSent) *
          100;
      }
      setIsTransactionSend(userRecetCount.result.currentMonth?.totalSent);
      setIsTransactionSendPer(
        isNaN(transactionSentPercent.toFixed(0))
          ? 0
          : transactionSentPercent.toFixed(0)
      );

      if (
        userRecetCount.result.currentMonth?.totalReceive >
        userRecetCount.result.lastMonth?.totalReceive
      ) {
        transactionReceiveTotal =
          userRecetCount.result.currentMonth.totalReceive -
          userRecetCount.result.lastMonth.totalReceive;
        transactionReceivePercent =
          (transactionReceiveTotal /
            userRecetCount.result.currentMonth.totalReceive) *
          100;
      } else {
        transactionReceiveTotal =
          userRecetCount.result.currentMonth?.totalReceive -
          userRecetCount.result.lastMonth?.totalReceive;
        transactionReceivePercent =
          (transactionReceiveTotal /
            userRecetCount.result.lastMonth?.totalReceive) *
          100;
        console.log(userRecetCount.result.lastMonth?.totalReceive);
      }
      setIsTransactionReceive(userRecetCount.result.currentMonth?.totalReceive);
      setIsTransactionReceivePer(
        isNaN(transactionReceivePercent.toFixed(0))
          ? 0
          : transactionReceivePercent.toFixed(0)
      );

      //  const totalPaymentCount=getPayVsReqData.result.currentMonth?.paymentCount+getPayVsReqData.result.lastMonth?.paymentCount+
      //  getPayVsReqData.result.secondLastMonth?.paymentCount+ getPayVsReqData.result.thirdLastMonth?.paymentCount
      //  setpaysCount(totalPaymentCount)
      const totalSentCount =
        userRecetCount.result.currentMonth?.totalSent +
        userRecetCount.result.lastMonth?.totalSent +
        userRecetCount.result.secondLastMonth?.totalSent +
        userRecetCount.result.thirdLastMonth?.totalSent;
      setIsSentTotal(totalSentCount);

      const totalReceivedCount =
        userRecetCount.result.currentMonth?.totalReceive +
        userRecetCount.result.lastMonth?.totalReceive +
        userRecetCount.result.secondLastMonth?.totalReceive +
        userRecetCount.result.thirdLastMonth?.totalReceive;
      setIsReceivedTotal(totalReceivedCount);
      const totalThisCount =
        userRecetCount.result.currentMonth?.totalTransaction +
        userRecetCount.result.lastMonth?.totalTransaction +
        userRecetCount.result.secondLastMonth?.totalRectotalTransactioneive +
        userRecetCount.result.thirdLastMonth?.totalTransaction;
      setIsThisMonthToatal(totalThisCount);
    }
  };
  const userBlockModelClose = () => {
    setIsUserBlock(false);
  };

  const customRange = (value) => {
    const rangeDate =
      moment(value[0]).format("Y-MM-DD") +
      " & " +
      moment(value[1]).format("Y-MM-DD");
    setIsCalenderDate(rangeDate);
    const filter = {};

    const formData = {
      status: isStatus,
      type: isCatType,
      method: mathodStatus,
      sort: sortStatus,
      custom_range: rangeDate,
      page: isCurrentPage,
    };
    dispatch(getRecentTransactionAll(formData));
    setIsCalnder(false);
  };
  const userPaymentModelClose = () => {
    setIsUserPayment(false);
  };

  const userDeactiveModelClose = () => {
    setIsUserDeactive(false);
  };

  const showUserBlockModel = (item) => {
    if (
      adminPermission.role === "admin" &&
      adminPermission.permissions[0].users.blockUser === "view_only"
    ) {
      return true;
    } else {
      setIsUserData(item);
      setIsUserBlock(true);
    }
  };

  const showUserPaymentModel = (item) => {
    if (
      adminPermission.role === "admin" &&
      adminPermission.permissions[0].users.preventPayment === "view_only"
    ) {
      return true;
    } else {
      setIsUserData(item);
      setIsUserPayment(true);
    }
  };

  const showUserDeactiveModel = (item) => {
    if (
      adminPermission.role === "admin" &&
      adminPermission.permissions[0].users.userAction === "view_only"
    ) {
      return true;
    } else {
      setIsUserData(item);
      setIsUserDeactive(true);
    }
  };
  const changeValueName = (data, index) => {
    setValueIndex(index);
  };
  useEffect(() => {
    dispatch(getUserDetailsApi(props.location.state.item.id));
  }, [isUserDeactive, isUserBlock, isUserPayment, isShowApprovalId]);

  const userApprovalModelClose = () => {
    setIsShowApprovalId(false);
  };
  const approvelModel = (data) => {
    setIsUserData(data);
    setIsShowApprovalId(true);
  };
  const searchTextChange = (e) => {
    setSearchText(e.target.value);
  };
  return (
    <div>
      <Header />
      {/* {isUserBlock &&
        <UserBlockModel onClick={() => setIsUserBlock(!isUserBlock)} />
      } {isUserPayment &&
        <UserPaymentModel onClick={() => setIsUserPayment(!isUserPayment)} />
      }{isUserDeactive &&
        <UserDeactiveModel onClick={() => setIsUserDeactive(!isUserDeactive)} />
      }{!isUserBlock && !isUserPayment && !isUserDeactive && */}
      <ApprovalId
        isModalOpen={isShowApprovalId}
        onClick={() => userApprovalModelClose()}
        isUserData={isUserData}
      />
      <UserBlockModel
        isModalOpen={isUserBlock}
        onClick={() => userBlockModelClose()}
        isUserData={isUserData}
      />
      <UserPaymentModel
        isModalOpen={isUserPayment}
        onClick={() => userPaymentModelClose()}
        isUserData={isUserData}
      />
      <UserDeactiveModel
        isModalOpen={isUserDeactive}
        onClick={() => userDeactiveModelClose()}
        isUserData={isUserData}
      />
      <section className="dash-wrap">
        <div className="row modified forDetails">
          <div className="col-lg-3 forDetails-left">
            <div className="userBlock-wrap">
              <div className="row modified">
                <div className="col-xl-12">
                  <div className="userBlock">
                    <div className="userBlock-img">
                      <img src={dataDisplayArr[vlaueIndex]?.logo} />
                    </div>
                    <div className="userBlock-txt">
                      <>
                        <h2>{dataDisplayArr[vlaueIndex]?.Bname}</h2>
                        <img
                          src={props.location.state.item.iconUrl}
                          className="providerImg"
                        ></img>
                        <span>
                          {" "}
                          {props.location.state.item.serviceProvider}
                        </span>
                        <p>
                          {userDetails && userDetails?.user?.countryCode}-
                          {userDetails && userDetails?.user?.phone}
                        </p>
                        <p>{userDetails && userDetails?.user?.useremail}</p>

                        <p>
                          {userDetails &&
                            userDetails?.user?.accountType.map(
                              (item, index) => {
                                return (
                                  <span
                                    style={{
                                      cursor: "pointer",
                                      color:
                                        index === vlaueIndex ? "green" : "",
                                    }}
                                    onClick={() => {
                                      changeValueName(item, index);
                                    }}
                                  >
                                    {(index ? ", " : "") + item}
                                  </span>
                                );
                              }
                            )}{" "}
                        </p>
                      </>
                    </div>
                  </div>
                </div>
                <div className="col-xl-12 col-lg-12 col-sm-6">
                  <div className="amtBlock">
                    <h2>
                      GH₵
                      {userDetails && userDetails?.user?.balance?.totalReceived}
                    </h2>
                    <h3>Total Received</h3>
                  </div>
                  <div className="amtBlock">
                    <h2>
                      GH₵{userDetails && userDetails?.user?.balance?.totalSent}
                    </h2>
                    <h3>Total Sent</h3>
                  </div>
                </div>
                <div className="col-xl-12 col-lg-12 col-sm-6">
                  <div className="kycStatBl">
                    <div className="row align-items-center modified">
                      <div className="col-xl-8">
                        <h2>KYC Status</h2>
                        {userDetails &&
                        userDetails?.user?.kycStatus !== "Not Requested" ? (
                          <h3>
                            <a
                              style={{ cursor: "pointer" }}
                              onClick={() => {
                                approvelModel({
                                  profileImage: userDetails?.user?.avtarImage,
                                  useremail: userDetails?.user?.email,
                                  approvalId: userDetails?.user?.kycDetails?.id,
                                  name: userDetails?.user?.name,
                                  userId: userDetails?.user?.kycDetails?.userId,
                                  idType: userDetails?.user?.kycDetails?.idType,
                                  idNumber:
                                    userDetails?.user?.kycDetails?.idNumber,
                                  uploadedDocumentUrl:
                                    userDetails?.user?.kycDetails?.docImageUrl,
                                });
                              }}
                            >
                              Check the details{" "}
                            </a>
                          </h3>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="col-xl-4">
                        {(() => {
                          if (
                            userDetails &&
                            userDetails?.user?.kycStatus === "approved"
                          )
                            return (
                              <button
                                className="btn approved-btn sm-btn"
                                type="button"
                              >
                                {userDetails && userDetails?.user?.kycStatus}
                              </button>
                            );

                          if (
                            userDetails &&
                            userDetails?.user?.kycStatus === "pending"
                          )
                            return (
                              <button
                                className="btn pending-btn sm-btn"
                                type="button"
                              >
                                {userDetails && userDetails?.user?.kycStatus}
                              </button>
                            );

                          if (
                            userDetails &&
                            userDetails?.user?.kycStatus === "declined"
                          )
                            return (
                              <button
                                className="btn red-btn sm-btn"
                                type="button"
                              >
                                {userDetails && userDetails?.user?.kycStatus}
                              </button>
                            );
                          else
                            return (
                              <>
                                <button
                                  className="btn pending-btn sm-btn"
                                  type="button"
                                >
                                  {userDetails && userDetails?.user?.kycStatus}
                                </button>
                              </>
                            );
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="kycBtnBl">
                <div className="row modified">
                  <div className="col-xl-6 col-lg-12 col-sm-6">
                    {userDetails && userDetails?.user?.is_block === false ? (
                      <button
                        data-toggle="modal"
                        data-target="#blockModal"
                        className={`btn grey-btn btn-block sm-btn ${
                          adminPermission.role === "admin" &&
                          adminPermission.permissions[0].users.blockUser ===
                            "view_only"
                            ? "disabled"
                            : ""
                        }`}
                        type="button"
                        onClick={() =>
                          showUserBlockModel({
                            profileImage: userDetails?.user?.profileImage,
                            username: userDetails?.user?.username,
                            phone: userDetails?.user?.phone,
                            useremail: userDetails?.user?.useremail,
                            accountType: userDetails?.user?.type,
                            is_block:
                              userDetails &&
                              userDetails?.user?.is_block === false
                                ? 0
                                : 1,
                            id: userDetails && userDetails?.user?.userId,
                          })
                        }
                      >
                        <i className="icon-icon-lock" /> Block
                      </button>
                    ) : (
                      <button
                        data-toggle="modal"
                        data-target="#blockModal"
                        className={`btn danger-btn btn-block sm-btn ${
                          adminPermission.role === "admin" &&
                          adminPermission.permissions[0].users.blockUser ===
                            "view_only"
                            ? "disabled"
                            : ""
                        }`}
                        type="button"
                        onClick={() =>
                          showUserBlockModel({
                            profileImage: userDetails?.user?.profileImage,
                            username: userDetails?.user?.username,
                            phone: userDetails?.user?.phone,
                            useremail: userDetails?.user?.useremail,
                            accountType: userDetails?.user?.type,
                            is_block:
                              userDetails &&
                              userDetails?.user?.is_block === false
                                ? 0
                                : 1,
                            id: userDetails && userDetails?.user?.userId,
                          })
                        }
                      >
                        <i className="icon-icon-lock" /> Blocked
                      </button>
                    )}
                  </div>
                  <div className="col-xl-6 col-lg-12 col-sm-6">
                    {userDetails?.user?.isCanReceivePayment == false ||
                    userDetails?.user?.isCanSendPaymentRequest == false ? (
                      <button
                        data-toggle="modal"
                        data-target="#preventModal"
                        className={`btn danger-btn btn-block sm-btn ${
                          adminPermission.role === "admin" &&
                          adminPermission.permissions[0].users
                            .preventPayment === "view_only"
                            ? "disabled"
                            : ""
                        } `}
                        type="button"
                        onClick={() =>
                          showUserPaymentModel({
                            payment_request:
                              userDetails?.user?.isCanSendPaymentRequest ===
                              false
                                ? 0
                                : 1,
                            payment_receive:
                              userDetails?.user?.isCanReceivePayment === false
                                ? 0
                                : 1,
                            profileImage: userDetails?.user?.profileImage,
                            username: userDetails?.user?.username,
                            phone: userDetails?.user?.phone,
                            useremail: userDetails?.user?.useremail,
                            accountType: userDetails?.user?.type,
                            id: userDetails && userDetails?.user?.userId,
                          })
                        }
                      >
                        <i className="icon-icon-block" /> Prevent payment
                      </button>
                    ) : (
                      <button
                        data-toggle="modal"
                        data-target="#preventModal"
                        className={`btn grey-btn btn-block sm-btn ${
                          adminPermission.role === "admin" &&
                          adminPermission.permissions[0].users
                            .preventPayment === "view_only"
                            ? "disabled"
                            : ""
                        }`}
                        type="button"
                        onClick={() =>
                          showUserPaymentModel({
                            payment_request:
                              userDetails?.user?.isCanSendPaymentRequest ===
                              false
                                ? 0
                                : 1,
                            payment_receive:
                              userDetails?.user?.isCanReceivePayment === false
                                ? 0
                                : 1,
                            profileImage: userDetails?.user?.profileImage,
                            username: userDetails?.user?.username,
                            phone: userDetails?.user?.phone,
                            useremail: userDetails?.user?.useremail,
                            accountType: userDetails?.user?.type,
                            id: userDetails && userDetails?.user?.userId,
                          })
                        }
                      >
                        <i className="icon-icon-block" /> Prevent payment
                      </button>
                    )}
                  </div>
                  <div className="col-xl-6 col-lg-12 col-sm-6">
                    {console.log(userDetails && userDetails?.user)}

                    {userDetails && userDetails?.user?.status === true ? (
                      <button
                        data-toggle="modal"
                        data-target="#deleteModal"
                        className={`btn grey-btn btn-block sm-btn ${
                          adminPermission.role === "admin" &&
                          adminPermission.permissions[0].users.userAction ===
                            "view_only"
                            ? "disabled"
                            : ""
                        }`}
                        type="button"
                        onClick={() =>
                          showUserDeactiveModel({
                            profileImage: userDetails?.user?.profileImage,
                            username: userDetails?.user?.username,
                            phone: userDetails?.user?.phone,
                            useremail: userDetails?.user?.useremail,
                            accountType: userDetails?.user?.type,
                            status:
                              userDetails && userDetails?.user?.status === true
                                ? 1
                                : 0,
                            id: userDetails && userDetails?.user?.userId,
                          })
                        }
                      >
                        <i className="icon-icon-block" /> Deactivate
                      </button>
                    ) : (
                      <button
                        data-toggle="modal"
                        data-target="#deleteModal"
                        className={`btn danger-btn btn-block sm-btn ${
                          adminPermission.role === "admin" &&
                          adminPermission.permissions[0].users.userAction ===
                            "view_only"
                            ? "disabled"
                            : ""
                        }`}
                        type="button"
                        onClick={() =>
                          showUserDeactiveModel({
                            profileImage: userDetails?.user?.profileImage,
                            username: userDetails?.user?.username,
                            phone: userDetails?.user?.phone,
                            useremail: userDetails?.user?.useremail,
                            accountType: userDetails?.user?.type,
                            status:
                              userDetails && userDetails?.user?.status === true
                                ? 1
                                : 0,
                            id: userDetails && userDetails?.user?.userId,
                          })
                        }
                      >
                        <i className="icon-icon-block" /> Deactivate
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-9 forDetails-right">
            <div className="dash-stat forUser">
              <div className="row modified">
                <div className="col-lg-4 col-sm-6">
                  <div className="dash-stat-single">
                    <h2>GH₵{isTransactionMonth}</h2>
                    <p>transactions this month</p>
                    <div className="dash-stat-graph">
                      {isTransactionMonthPer > 0 ? (
                        <div className="stat-percentage">
                          {" "}
                          {isTransactionMonthPer}% <img src={arrowup} alt="" />{" "}
                        </div>
                      ) : (
                        <div className="stat-percentage down">
                          {" "}
                          {isTransactionMonthPer}%{" "}
                          <img src={arrowdown} alt="" />{" "}
                        </div>
                      )}
                      <div className="stat-percentage-graph">
                        <ul>
                          {/* <li><span style={{ height: '90%' }} /></li>
                          <li><span style={{ height: '100%' }} /></li>
                          <li><span style={{ height: '50%' }} /></li>
                          <li><span className="graph-down" style={{ height: '60%' }} /></li> */}
                          <li>
                            <span
                              className="graph-up"
                              style={{
                                height:
                                  Math.round(
                                    (userRecetCount &&
                                      userRecetCount?.result?.thirdLastMonth
                                        ?.totalTransaction /
                                        isThisMonthToatal) * 100
                                  ) > 1
                                    ? Math.round(
                                        (userRecetCount &&
                                          userRecetCount?.result?.thirdLastMonth
                                            ?.totalTransaction /
                                            isThisMonthToatal) * 100
                                      ) + "%"
                                    : "2%",
                              }}
                            ></span>
                          </li>
                          <li>
                            <span
                              className="graph-up"
                              style={{
                                height:
                                  Math.round(
                                    (userRecetCount &&
                                      userRecetCount?.result?.secondLastMonth
                                        ?.totalTransaction /
                                        isThisMonthToatal) * 100
                                  ) > 1
                                    ? Math.round(
                                        (userRecetCount &&
                                          userRecetCount?.result
                                            ?.secondLastMonth
                                            ?.totalTransaction /
                                            isThisMonthToatal) * 100
                                      ) + "%"
                                    : "2%",
                              }}
                            ></span>
                          </li>
                          <li>
                            <span
                              className="graph-up"
                              style={{
                                height:
                                  Math.round(
                                    (userRecetCount &&
                                      userRecetCount?.result?.lastMonth
                                        ?.totalTransaction /
                                        isThisMonthToatal) * 100
                                  ) > 1
                                    ? Math.round(
                                        (userRecetCount &&
                                          userRecetCount?.result?.lastMonth
                                            ?.totalTransaction /
                                            isThisMonthToatal) * 100
                                      ) + "%"
                                    : "2%",
                              }}
                            ></span>
                          </li>
                          <li>
                            <span
                              className={`${
                                isTransactionMonthPer > 0
                                  ? "graph-up"
                                  : "graph-down"
                              }`}
                              style={{
                                height:
                                  Math.round(
                                    (userRecetCount &&
                                      userRecetCount?.result?.currentMonth
                                        ?.totalTransaction /
                                        isThisMonthToatal) * 100
                                  ) > 1
                                    ? Math.round(
                                        (userRecetCount &&
                                          userRecetCount?.result?.currentMonth
                                            ?.totalTransaction /
                                            isThisMonthToatal) * 100
                                      ) + "%"
                                    : "2%",
                              }}
                            ></span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                  <div className="dash-stat-single">
                    <h2>GH₵{isTransactionSend}</h2>
                    <p>sent this month</p>
                    <div className="dash-stat-graph">
                      {isTransactionSendPer > 0 ? (
                        <div className="stat-percentage">
                          {" "}
                          {isTransactionSendPer}% <img src={arrowup} alt="" />{" "}
                        </div>
                      ) : (
                        <div className="stat-percentage down">
                          {" "}
                          {isTransactionSendPer}% <img src={arrowdown} alt="" />{" "}
                        </div>
                      )}
                      <div className="stat-percentage-graph">
                        <ul>
                          <li>
                            <span
                              className="graph-up"
                              style={{
                                height:
                                  Math.round(
                                    (userRecetCount &&
                                      userRecetCount?.result?.thirdLastMonth
                                        ?.totalSent / isSentTotal) * 100
                                  ) > 1
                                    ? Math.round(
                                        (userRecetCount &&
                                          userRecetCount?.result?.thirdLastMonth
                                            ?.totalSent / isSentTotal) * 100
                                      ) + "%"
                                    : "2%",
                              }}
                            ></span>
                          </li>
                          <li>
                            <span
                              className="graph-up"
                              style={{
                                height:
                                  Math.round(
                                    (userRecetCount &&
                                      userRecetCount?.result?.secondLastMonth
                                        ?.totalSent / isSentTotal) * 100
                                  ) > 1
                                    ? Math.round(
                                        (userRecetCount &&
                                          userRecetCount?.result
                                            ?.secondLastMonth?.totalSent /
                                            isSentTotal) * 100
                                      ) + "%"
                                    : "2%",
                              }}
                            ></span>
                          </li>
                          <li>
                            <span
                              className="graph-up"
                              style={{
                                height:
                                  Math.round(
                                    (userRecetCount &&
                                      userRecetCount?.result?.lastMonth
                                        ?.totalSent / isSentTotal) * 100
                                  ) > 1
                                    ? Math.round(
                                        (userRecetCount &&
                                          userRecetCount?.result?.lastMonth
                                            ?.totalSent / isSentTotal) * 100
                                      ) + "%"
                                    : "2%",
                              }}
                            ></span>
                          </li>
                          <li>
                            <span
                              className={`${
                                isTransactionSendPer > 0
                                  ? "graph-up"
                                  : "graph-down"
                              }`}
                              style={{
                                height:
                                  Math.round(
                                    (userRecetCount &&
                                      userRecetCount?.result?.currentMonth
                                        ?.totalSent / isSentTotal) * 100
                                  ) > 1
                                    ? Math.round(
                                        (userRecetCount &&
                                          userRecetCount?.result?.currentMonth
                                            ?.totalSent / isSentTotal) * 100
                                      ) + "%"
                                    : "2%",
                              }}
                            ></span>
                          </li>
                          {/* <li><span style={{ height: '70%' }} /></li>
                          <li><span style={{ height: '80%' }} /></li>
                          <li><span style={{ height: '90%' }} /></li>
                          <li><span className="graph-up" style={{ height: '100%' }} /></li> */}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                  <div className="dash-stat-single">
                    <h2>GH₵{isTransactionReceive}</h2>
                    <p>received this month</p>
                    <div className="dash-stat-graph">
                      {isTransactionReceivePer > 0 ? (
                        <div className="stat-percentage">
                          {" "}
                          {isTransactionReceivePer}%{" "}
                          <img src={arrowup} alt="" />{" "}
                        </div>
                      ) : (
                        <div className="stat-percentage down">
                          {" "}
                          {isTransactionReceivePer}%{" "}
                          <img src={arrowdown} alt="" />{" "}
                        </div>
                      )}
                      <div className="stat-percentage-graph">
                        <ul>
                          {/* <li><span style={{ height: '90%' }} /></li>
                          <li><span style={{ height: '100%' }} /></li>
                          <li><span style={{ height: '50%' }} /></li>
                          <li><span className="graph-down" style={{ height: '60%' }} /></li> */}
                          <li>
                            <span
                              className="graph-up"
                              style={{
                                height:
                                  Math.round(
                                    (userRecetCount &&
                                      userRecetCount?.result?.thirdLastMonth
                                        ?.totalReceive / isReceivedTotal) * 100
                                  ) > 1
                                    ? Math.round(
                                        (userRecetCount &&
                                          userRecetCount?.result?.thirdLastMonth
                                            ?.totalReceive / isReceivedTotal) *
                                          100
                                      ) + "%"
                                    : "2%",
                              }}
                            ></span>
                          </li>
                          <li>
                            <span
                              className="graph-up"
                              style={{
                                height:
                                  Math.round(
                                    (userRecetCount &&
                                      userRecetCount?.result?.secondLastMonth
                                        ?.totalReceive / isReceivedTotal) * 100
                                  ) > 1
                                    ? Math.round(
                                        (userRecetCount &&
                                          userRecetCount?.result
                                            ?.secondLastMonth?.totalReceive /
                                            isReceivedTotal) * 100
                                      ) + "%"
                                    : "2%",
                              }}
                            ></span>
                          </li>
                          <li>
                            <span
                              className="graph-up"
                              style={{
                                height:
                                  Math.round(
                                    (userRecetCount &&
                                      userRecetCount?.result?.lastMonth
                                        ?.totalReceive / isReceivedTotal) * 100
                                  ) > 1
                                    ? Math.round(
                                        (userRecetCount &&
                                          userRecetCount?.result?.lastMonth
                                            ?.totalReceive / isReceivedTotal) *
                                          100
                                      ) + "%"
                                    : "2%",
                              }}
                            ></span>
                          </li>
                          <li>
                            <span
                              className={`${
                                isTransactionReceivePer > 0
                                  ? "graph-up"
                                  : "graph-down"
                              }`}
                              style={{
                                height:
                                  Math.round(
                                    (userRecetCount &&
                                      userRecetCount?.result?.currentMonth
                                        ?.totalReceive / isReceivedTotal) * 100
                                  ) > 1
                                    ? Math.round(
                                        (userRecetCount &&
                                          userRecetCount?.result?.currentMonth
                                            ?.totalReceive / isReceivedTotal) *
                                          100
                                      ) + "%"
                                    : "2%",
                              }}
                            ></span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="sec-block alt">
              <div className="block-single auto">
                <div className="block-heading" style={{ border: "none" }}>
                  <h2 style={{ paddingBottom: "20px" }}>
                    Transactions history{" "}
                  </h2>
                  <div className="table-btn">
                    <div className="cm_search search-wrap clearable mr-3">
                      <input
                        type="text"
                        value={searchText}
                        onChange={(e) => {
                          searchTextChange(e);
                        }}
                        className="form-control"
                        placeholder="Search"
                        onKeyUp={(e) => {
                          if (e.key === "Enter") {
                            serchDatacall();
                          }
                        }}
                      />
                      <i
                        className="fa fa-search"
                        aria-hidden="true"
                        onClick={() => {
                          serchDatacall();
                        }}
                      />
                      <i className="clearable__clear icon-icon-close2" />
                    </div>
                    <div className="dropdown inline drop-filter mr-3">
                      <a
                        className="dropdown-toggle link"
                        onClick={() => setIsUserFilter(!isUserFilter)}
                        style={{ cursor: "pointer" }}
                      >
                        <i className="icon-icon-filter" /> Filters
                      </a>

                      <div
                        className={
                          isUserFilter ? "dropdown-menu show" : "dropdown-menu"
                        }
                      >
                        <form onSubmit={(e) => applyFilter(e)}>
                          <input
                            type="reset"
                            className="clear-filter"
                            value="Clear all"
                            onClick={() => clearFilter()}
                          />

                          <div className="row modified">
                            <div className="col-3">
                              <div className="filter-single">
                                <h4>Status</h4>
                                <label className="custom-check">
                                  In Process
                                  <input
                                    type="checkbox"
                                    value="In Process"
                                    name="status[]"
                                    onChange={(e) => onChangeStatusHandler(e)}
                                  />
                                  <span className="checkmark" />
                                </label>
                                <label className="custom-check">
                                  Credited
                                  <input
                                    type="checkbox"
                                    value="Credited"
                                    name="status[]"
                                    onChange={(e) => onChangeStatusHandler(e)}
                                  />
                                  <span className="checkmark" />
                                </label>
                                <label className="custom-check">
                                  Failed
                                  <input
                                    type="checkbox"
                                    value="Failed"
                                    name="status[]"
                                    onChange={(e) => onChangeStatusHandler(e)}
                                  />
                                  <span className="checkmark" />
                                </label>
                                <label className="custom-check">
                                  Debited
                                  <input
                                    type="checkbox"
                                    value="Debited"
                                    name="status[]"
                                    onChange={(e) => onChangeStatusHandler(e)}
                                  />
                                  <span className="checkmark" />
                                </label>
                              </div>
                            </div>
                            <div className="col-9">
                              <div className="filter-single custom-checkFilter">
                                <h4>Type</h4>
                                <div className="row modified">
                                  <div className="col-5">
                                    {catSubCatData?.data
                                      ?.slice(0, 4)
                                      .map((item, index) => {
                                        return (
                                          <label className="custom-check">
                                            {item.type}
                                            <input
                                              type="checkbox"
                                              value={item.type}
                                              name="type[]"
                                              onChange={(e) =>
                                                onChangeTypeHandler(e)
                                              }
                                            />
                                            <span className="checkmark" />
                                          </label>
                                        );
                                      })}
                                  </div>
                                  <div className="col-7">
                                    {catSubCatData?.data
                                      ?.slice(4, 8)
                                      .map((item, index) => {
                                        return (
                                          <label className="custom-check">
                                            {item.type}
                                            <input
                                              type="checkbox"
                                              value={item.type}
                                              name="type[]"
                                              onChange={(e) =>
                                                onChangeTypeHandler(e)
                                              }
                                            />
                                            <span className="checkmark" />
                                          </label>
                                        );
                                      })}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row modified">
                            <div className="col-3">
                              <div className="filter-single">
                                <h4>By Mathod</h4>
                                <label className="custom-check">
                                  Payment
                                  <input
                                    type="checkbox"
                                    value="payment"
                                    name="request[]"
                                    onChange={(e) => onChangeMethodHandler(e)}
                                  />
                                  <span className="checkmark" />
                                </label>
                                <label className="custom-check">
                                  Request
                                  <input
                                    type="checkbox"
                                    value="Request"
                                    name="request[]"
                                    onChange={(e) => onChangeMethodHandler(e)}
                                  />
                                  <span className="checkmark" />
                                </label>
                              </div>
                            </div>
                            <div className="col-9">
                              <div className="filter-single">
                                <h4>Sort By</h4>
                                <label className="custom-check">
                                  Most Recent
                                  <input
                                    type="radio"
                                    value="Recent"
                                    name="sort[]"
                                    onChange={(e) => onChangeSortHandler(e)}
                                  />
                                  <span className="checkmark" />
                                </label>
                                <label className="custom-check">
                                  Amount from low to high
                                  <input
                                    type="radio"
                                    value="Low"
                                    name="sort[]"
                                    onChange={(e) => onChangeSortHandler(e)}
                                  />
                                  <span className="checkmark" />
                                </label>

                                <label className="custom-check">
                                  Amount from high to low
                                  <input
                                    type="radio"
                                    value="High"
                                    name="sort[]"
                                    onChange={(e) => onChangeSortHandler(e)}
                                  />
                                  <span className="checkmark" />
                                </label>
                              </div>
                            </div>
                          </div>
                          <input
                            className="btn btn-block green-btn"
                            type="submit"
                            name
                            defaultValue="Apply"
                          />
                        </form>
                      </div>
                    </div>
                    <div className="custom-select-wrap alt">
                      <div className="selectImage">
                        <select
                          className="custom-select"
                          name="state"
                          onChange={(e) => sortHander(e)}
                        >
                          <option value="''">All time</option>
                          <option value="this_month">This month</option>
                          <option value="last_month">Last month</option>
                          <option select value="last_6_month">
                            6 months
                          </option>
                          <option value="custom_range">Custom range</option>
                        </select>
                      </div>
                    </div>
                    {showCalender && (
                      <>
                        <div className="custom-select-wrap alt">
                          <div className="inpIcon">
                            <input
                              className="form-control"
                              data-provide="datepicker"
                              value={isCalenderDate}
                              onClick={() => calenderToggle()}
                            />
                            <i
                              className="fa fa-calendar-o"
                              aria-hidden="true"
                            />
                          </div>
                          {isCalnder && (
                            <Calendar
                              onChange={(value) => customRange(value)}
                              next2Label={null}
                              prev2Label={null}
                              selectRange={true}
                              returnValue="range"
                            />
                          )}
                        </div>
                      </>
                    )}

                    <a
                      className="link green"
                      style={{
                        cursor: exportDesable ? "not-allowed" : "pointer",
                      }}
                      onClick={exportData}
                    >
                      <i className="icon-icon-download" /> Export
                    </a>
                  </div>
                  <div className="transaction-main">
                    <div
                      className="transaction-table transactionTable"
                      style={{ margin: "0px" }}
                    >
                      <div className="table-responsive">
                        <table className="table theme-table">
                          <tbody>
                            <tr style={{ borderTop: "1px solid #f4f4f4" }}>
                              <th>Transaction ID</th>
                              <th>Date</th>
                              <th>Sender</th>
                              <th>Receiver</th>
                              <th>Amount</th>
                              <th>Status</th>
                              <th>Method</th>
                              <th>Type</th>
                              <th style={{ width: "160px" }}>Action</th>
                            </tr>

                            {renderTransactionList()}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="site-pagination">{paginationList()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UsersDetails;
