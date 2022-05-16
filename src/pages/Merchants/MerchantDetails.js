import React, { useEffect, useState } from "react";
import egypt from "./../../assets/images/egypt.png";
import arrowup from "./../../assets/images/arrow-up.svg";
import arrowdown from "./../../assets/images/arrow-down.svg";
import user1 from "./../../assets/images/user-3.jpg";
import Header from "../../component/Header";
import { useHistory } from "react-router-dom";
import {
  getMerchantDetailById,
  merchantTypeList,
  getMerchantTransactionCountApi,
  getMerchantTransactionListApi,
  getMerchantTransactionListExportApi,
} from "../../redux/action/MerchantAction/MerchantAction";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import moment from "moment";
import ExportData from "../Transactions/export.js";
import EditMerchantsModel from "./EditMerchantsModel";
import MerchantDeactiveModal from "./MerchantDeactiveModal";
import { getCategorySubList } from "../../redux/action/SettingAction/SettingAction";
import Calendar from "react-calendar";
import exportFromJSON from "export-from-json";
import { getTransactionDetailsApiDataExport } from "../../redux/action/TransactionAction/TransactionAction";
import { approvelsAddAPiRequest } from "../../redux/action/Approvels/ApprovelsAction";
import { GET_TRASACTION_DETAILS_API_EXPORT_CLEAR } from "../../redux/action/actionTypes";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import { jsPDF } from "jspdf";
import "react-calendar/dist/Calendar.css";
const MerchantDetails = (props) => {
  const [isEditMerchants, setIsEditMerchants] = useState(false);
  const [isFirst, setIsFirst] = useState(false);
  const [isMerchantType, setIsMerchantType] = useState();
  const [isMerchantDeactive, setIsMerchantDeactive] = useState(false);

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
  const [isTransactionMonth, setIsTransactionMonth] = useState(0);
  const [isTransactionMonthPer, setIsTransactionMonthPer] = useState("");
  const [isTransactionSend, setIsTransactionSend] = useState(0);
  const [isTransactionSendPer, setIsTransactionSendPer] = useState("");
  const [isTransactionReceive, setIsTransactionReceive] = useState(0);
  const [isTransactionReceivePer, setIsTransactionReceivePer] = useState("");

  const [isTransactionTOtal, setIsTransactionTotal] = useState(0);
  const [isReceivedTotal, setIsReceivedTotals] = useState(0);
  const [isRevenueTotal, setIsRevenueTotal] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [exportDesable, setDesableExport] = useState(false);
  const dispatch = useDispatch();

  const getMerchant = useSelector(
    (state) => state.merchantData.getMerchantDetail
  );
  const merchantType = useSelector(
    (state) => state.merchantData.merchanttypeData
  );
  const userRecetCount = useSelector(
    (state) => state.merchantData.getMerchantTransactionCount
  );
  const allTransaction = useSelector(
    (state) => state.merchantData.getMerchantTransactionList
  );
  const catSubCatData = useSelector(
    (state) => state.settingData.getCatSubcatData
  );
  const exportTran = useSelector(
    (state) => state.merchantData.getMerchantTranactionExport
  );
  const adminPermission = useSelector(
    (state) => state.loginData.loginSuccesData
  );
  const transactionDetail = useSelector(
    (state) => state.transactionData.tranactionApiDatailExport
  );
  useEffect(() => {
    dispatch(getCategorySubList());
  }, []);

  useEffect(() => {
    dispatch(
      getMerchantTransactionCountApi({ phone: props.location.state.id.phone })
    );
    dispatch(
      getMerchantTransactionListApi({
        phone: props.location.state.id.phone,
        status: isStatus,
        type: isCatType,
        method: [],
        sort: "",
        time: "all-time",

        page: isCurrentPage,
      })
    );

    dispatch(
      getMerchantTransactionListExportApi({
        phone: props.location.state.id.phone,
        status: isStatus,
        type: isCatType,
        method: [],
        sort: "",
        time: "all-time",
        export: true,
        page: isCurrentPage,
      })
    );
  }, [props]);

  useEffect(() => {
    dispatch(getMerchantDetailById(props.location.state.id.id));
    dispatch(merchantTypeList());

    // if (isFirst) {
    //   setMerchantDetailData(getMerchant)
    //   setIsEditMerchants(true)
    // }
    console.log(props);
  }, []);

  let history = useHistory();
  const goToAdCampaigns = () => {
    history.push("/addcampaigns");
  };

  const getMerType = () => {
    setIsMerchantType(merchantType);
  };

  const merchantEditModal = () => {
    if (
      adminPermission.role === "admin" &&
      adminPermission.permissions[0].merchants.editMerchant === "view_only"
    ) {
      return true;
    } else {
      getMerType();
      setIsEditMerchants(!isEditMerchants);
    }
    dispatch(getMerchantDetailById(props.location.state.id.id));
  };
  const showMerchantDeactiveModel = () => {
    if (
      adminPermission.role === "admin" &&
      adminPermission.permissions[0].merchants.merchantAction === "view_only"
    ) {
      return true;
    } else {
      setIsMerchantDeactive(true);
    }
  };
  const merchantDeactiveModelClose = () => {
    setIsMerchantDeactive(false);
    dispatch(getMerchantDetailById(props.location.state.id.id));
  };
  useEffect(() => {
    recentTransactionCount();
  }, [userRecetCount]);
  const recentTransactionCount = () => {
    if (!isEmpty(userRecetCount)) {
      let transactionMonthPercent = 0;
      let transactionSentPercent = 0;
      let transactionReceivePercent = 0;
      let transactionMonthTotal = "";
      let tranactionSendTotal = "";
      let transactionReceiveTotal = "";
      if (
        userRecetCount.currentMonth?.paymentCountThisMonth >
        userRecetCount.lastMonth?.paymentCountLastMonth
      ) {
        transactionMonthTotal =
          userRecetCount.currentMonth.paymentCountThisMonth -
          userRecetCount.lastMonth.paymentCountLastMonth;
        transactionMonthPercent =
          (transactionMonthTotal /
            userRecetCount.currentMonth.paymentCountThisMonth) *
          100;
      } else {
        transactionMonthTotal =
          userRecetCount.currentMonth?.paymentCountThisMonth -
          userRecetCount.lastMonth?.paymentCountLastMonth;
        transactionMonthPercent =
          (transactionMonthTotal /
            userRecetCount.lastMonth?.paymentCountLastMonth) *
          100;
      }
      setIsTransactionMonth(userRecetCount.currentMonth?.paymentCountThisMonth);
      setIsTransactionMonthPer(
        isNaN(transactionMonthPercent.toFixed(0))
          ? 0
          : transactionMonthPercent.toFixed(0)
      );

      if (
        userRecetCount.currentMonth?.revenueThisMonth >
        userRecetCount.lastMonth?.revenueLastMonth
      ) {
        tranactionSendTotal =
          userRecetCount.currentMonth.revenueThisMonth -
          userRecetCount.lastMonth.revenueLastMonth;
        transactionMonthPercent =
          (tranactionSendTotal / userRecetCount.currentMonth.revenueThisMonth) *
          100;
      } else {
        tranactionSendTotal =
          userRecetCount.currentMonth?.revenueThisMonth -
          userRecetCount.lastMonth?.revenueLastMonth;
        transactionSentPercent =
          (tranactionSendTotal / userRecetCount.lastMonth?.revenueLastMonth) *
          100;
      }
      setIsTransactionSend(userRecetCount.currentMonth?.revenueThisMonth);
      setIsTransactionSendPer(
        isNaN(transactionSentPercent.toFixed(0))
          ? 0
          : transactionSentPercent.toFixed(0)
      );

      if (
        userRecetCount.currentMonth?.userThisMonth >
        userRecetCount.lastMonth?.userLastMonth
      ) {
        transactionReceiveTotal =
          userRecetCount.currentMonth.userThisMonth -
          userRecetCount.lastMonth.userLastMonth;
        transactionReceivePercent =
          (transactionReceiveTotal /
            userRecetCount.currentMonth.userThisMonth) *
          100;
      } else {
        transactionReceiveTotal =
          userRecetCount.currentMonth?.userThisMonth -
          userRecetCount.lastMonth?.userLastMonth;
        transactionReceivePercent =
          (transactionReceiveTotal / userRecetCount.lastMonth?.userLastMonth) *
          100;
      }
      setIsTransactionReceive(userRecetCount.currentMonth?.userThisMonth);
      setIsTransactionReceivePer(
        isNaN(transactionReceivePercent.toFixed(0))
          ? 0
          : transactionReceivePercent.toFixed(0)
      );

      const totalTranCount =
        userRecetCount.currentMonth?.paymentCountThisMonth +
        userRecetCount.lastMonth?.paymentCountLastMonth +
        userRecetCount.secondLastMonth?.paymentCountSecondLastMonth +
        userRecetCount.thirdLastMonth?.paymentCountThirdLastMonth;
      setIsTransactionTotal(totalTranCount);

      const totalReceivedCount =
        userRecetCount.currentMonth?.revenueThisMonth +
        userRecetCount.lastMonth?.revenueLastMonth +
        userRecetCount.secondLastMonth?.revenueSecondLastMonth +
        userRecetCount.thirdLastMonth?.revenueThirdLastMonth;
      setIsRevenueTotal(totalReceivedCount);

      const totalUserCount =
        userRecetCount.currentMonth?.userThisMonth +
        userRecetCount.lastMonth?.userLastMonth +
        userRecetCount.secondLastMonth?.userSecondLastMonth +
        userRecetCount.thirdLastMonth?.userThirdLastMonth;
      setIsReceivedTotals(totalUserCount);
    }
  };
  const applyFilter = (e) => {
    setDesableExport(false);
    setSearchText("");
    e.preventDefault();
    setIsUserFilter(false);

    let formData = getFilter(isCurrentPage);

    dispatch(getMerchantTransactionListApi(formData));

    let a = getFilter(isCurrentPage);
    a.export = true;
    dispatch(getMerchantTransactionListExportApi(a));
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
  const getFilter = (page) => {
    const formData = {
      phone: props.location.state.id.phone,
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
  const calenderToggle = () => {
    setIsCalnder(!isCalnder);
  };
  const onChangeSortHandler = (e) => {
    if (e.target.checked) {
      setSortStatus(e.target.value);
    }
  };
  const paginationHander = (pageNumber) => {
    setIsCurrentPage(pageNumber);
    let formData = getFilter(pageNumber);
    setIsUserFilter(false);
    dispatch(getMerchantTransactionListApi(formData));
  };

  const nextPaginationHander = (pageNumber) => {
    if (isCurrentPage !== pageNumber) {
      const p = isCurrentPage + 1;
      setIsCurrentPage(p);

      let formData = getFilter(p);
      setIsUserFilter(false);
      dispatch(getMerchantTransactionListApi(formData));
    }
  };

  const previousPaginationHander = () => {
    if (isCurrentPage > 1) {
      const p = isCurrentPage - 1;
      setIsCurrentPage(p);

      let formData = getFilter(p);
      setIsUserFilter(false);
      dispatch(getMerchantTransactionListApi(formData));
    }
  };

  const firstPaginationHander = () => {
    const p = 1;
    setIsCurrentPage(p);

    let formData = getFilter(p);
    setIsUserFilter(false);
    dispatch(getMerchantTransactionListApi(formData));
  };
  const lastPaginationHander = (pageNumber) => {
    const p = pageNumber;
    setIsCurrentPage(p);

    let formData = getFilter(p);
    setIsUserFilter(false);
    dispatch(getMerchantTransactionListApi(formData));
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
    dispatch(getMerchantTransactionListApi(formData));

    let a = {
      status: isStatus,
      type: isCatType,
      method: mathodStatus,
      sort: sortStatus,
      custom_range: rangeDate,
      page: isCurrentPage,
      export: true,
    };
    dispatch(getMerchantTransactionListExportApi(a));
    setIsCalnder(false);
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
              {/* <td>{paymentType}</td>
        <td>{type}</td> */}
              <td>
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
                {/* <a className="action-link" href="javascript:void(0)"><i className="icon-icon-refund" /></a>
          <a className="action-link" href="javascript:void(0)"><i className="icon-icon-download" /></a> */}
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
  useEffect(() => {
    if (Object.keys(transactionDetail).length !== 0) {
      const doc = new jsPDF("p", "pt", "a4");
      console.log(transactionDetail.data.transactionDetails);
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
  const exportPdf = (s) => {
    dispatch(getTransactionDetailsApiDataExport(s.transactionId));
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
  const sortHander = (e) => {
    if (e.currentTarget.value === "custom_range") {
      const formData = {
        phone: props.location.state.id.phone,
        status: isStatus,
        type: isCatType,
        method: mathodStatus,
        sort: sortStatus,
        custom_range: isCalenderDate,
        page: isCurrentPage,
      };
      dispatch(getMerchantTransactionListApi(formData));
      let a = {
        phone: props.location.state.id.phone,
        status: isStatus,
        type: isCatType,
        method: mathodStatus,
        sort: sortStatus,
        custom_range: isCalenderDate,
        page: isCurrentPage,
        export: true,
      };
      dispatch(getMerchantTransactionListExportApi(a));
      setShowCalender(true);
    } else {
      setShowCalender(false);
      const formData = {
        phone: props.location.state.id.phone,
        status: isStatus,
        type: isCatType,
        method: mathodStatus,
        sort: sortStatus,
        time: e.currentTarget.value,
        page: isCurrentPage,
      };
      let a = {
        phone: props.location.state.id.phone,
        status: isStatus,
        type: isCatType,
        method: mathodStatus,
        sort: sortStatus,
        time: e.currentTarget.value,
        page: isCurrentPage,
        export: true,
      };
      dispatch(getMerchantTransactionListExportApi(a));
      dispatch(getMerchantTransactionListApi(formData));
      setIsSort(e.currentTarget.value);
    }
  };
  const exportData = () => {
    if (exportDesable) {
      return true;
    } else {
      const data = exportTran && exportTran?.result;
      const fileName = "download";
      const exportType = exportFromJSON.types.xls;
      exportFromJSON({ data, fileName, exportType });
    }
  };
  const searchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const serchDatacall = () => {
    dispatch(
      getMerchantTransactionListApi({
        phone: props.location.state.id.phone,
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
  return (
    <div>
      <Header />

      {isEditMerchants && (
        <EditMerchantsModel
          data={isMerchantType}
          merchantDetail={getMerchant}
          onClick={() => merchantEditModal()}
        />
      )}
      {isMerchantDeactive && (
        <MerchantDeactiveModal
          isModalOpen={isMerchantDeactive}
          onClick={() => merchantDeactiveModelClose()}
          isUserData={getMerchant}
        />
      )}

      <section className="dash-wrap">
        <div className="row modified forDetails">
          <div className="col-lg-3 forDetails-left">
            <div className="userBlock-wrap">
              <div className="merchantDetails">
                <div className="merchantLogo">
                  <img src={getMerchant.companyLogo} alt="" />
                </div>
                <h2>{getMerchant.companyName} </h2>
                <p>
                  {getMerchant.countryCode}-{getMerchant.phone}
                </p>
                <p>{getMerchant.useremail}</p>
                <div className="row modified">
                  <div className="col-xl-12 tarnsDetails">
                    <h2>General Info</h2>
                  </div>
                  <div className="col-xl-8">
                    <span className="popTitle">Website</span>
                    <span className="popDesc">{getMerchant.website}</span>
                  </div>
                  <div className="col-xl-4 tarnsDetails1">
                    <span className="popTitle">Type</span>
                    <span className="popDesc">{getMerchant.type}</span>
                  </div>
                  <div className="col-xl-12 tarnsDetails">
                    <h2>Fees</h2>
                  </div>
                  <div className="col-xl-8">
                    {getMerchant?.includeFees === 1 &&
                    getMerchant.includeFeesData?.fees_type ===
                      "fixed_tranction" ? (
                      <>
                        <span className="popTitle">
                          Fixed fee per transaction
                        </span>
                        <span className="popDesc">
                          {
                            getMerchant.includeFeesData.transaction_amount
                              .transaction_amount
                          }{" "}
                          GH₵
                        </span>
                      </>
                    ) : (
                      ""
                    )}

                    {getMerchant.includeFees === 1 &&
                    getMerchant.includeFeesData?.fees_type ===
                      "percent_tranction" ? (
                      <>
                        <span className="popTitle">
                          Percent of transaction amount
                        </span>
                        <span className="popDesc">
                          Capped Amount:{" "}
                          {
                            getMerchant.includeFeesData.transaction_amount
                              .transaction_amount
                          }{" "}
                          GH₵
                        </span>
                        <span className="popDesc">
                          Percent:{" "}
                          {
                            getMerchant.includeFeesData.transaction_amount
                              .percent
                          }
                        </span>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="col-xl-4 tarnsDetails1">
                    <span className="popTitle"></span>
                    <span className="popDesc"></span>
                  </div>
                  <div className="col-xl-12 tarnsDetails">
                    <h2>Cost Bearer</h2>
                  </div>
                  <div className="col-xl-8">
                    {getMerchant.includeFees === 1 &&
                    getMerchant.includeFeesData?.cost_bearer ===
                      "split_fees" ? (
                      <span className="popTitle">
                        Split fees:Merchant{" "}
                        {getMerchant.includeFeesData?.split_fees?.merchant}
                        %;User {getMerchant.includeFeesData?.split_fees?.user}%
                      </span>
                    ) : (
                      ""
                    )}

                    {getMerchant.includeFees === 1 &&
                    getMerchant.includeFeesData?.cost_bearer === "receiver" ? (
                      <span className="popTitle">
                        {getMerchant.includeFeesData?.cost_bearer}
                      </span>
                    ) : (
                      ""
                    )}

                    {getMerchant.includeFees === 1 &&
                    getMerchant.includeFeesData?.cost_bearer === "sender" ? (
                      <span className="popTitle">
                        {getMerchant.includeFeesData?.cost_bearer}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div className="kycBtnBl">
                <div className="row modified">
                  <div className="col-xl-6 col-lg-12 col-sm-6">
                    <button
                      className={`btn grey-btn btn-block sm-btn ${
                        adminPermission.role === "admin" &&
                        adminPermission.permissions[0].merchants
                          .editMerchant === "view_only"
                          ? "disabled"
                          : ""
                      }`}
                      type="button"
                      onClick={() => merchantEditModal()}
                    >
                      <i className="icon-icon-edit" />
                      Edit
                    </button>
                  </div>
                  <div className="col-xl-6 col-lg-12 col-sm-6">
                    <button
                      className={`${
                        getMerchant.status === 1
                          ? "btn grey-btn btn-block sm-btn"
                          : "btn  btn-block sm-btn danger-btn"
                      } ${
                        adminPermission.role === "admin" &&
                        adminPermission.permissions[0].merchants
                          .merchantAction === "view_only"
                          ? "disabled"
                          : ""
                      }`}
                      type="button"
                      onClick={() => showMerchantDeactiveModel()}
                    >
                      <i className="icon-icon-block" />
                      Deactivate
                    </button>
                  </div>
                  {/* <div className="col-12">
                    <button data-toggle="modal" data-target="#createCampaignModal" className="btn green-btn-solid sm-btn" type="button" onClick={() => goToAdCampaigns()}   >Go to Ad Management</button>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-9 forDetails-right">
            <div className="dash-stat forUser">
              <div className="row modified">
                <div className="col-lg-4 col-sm-6">
                  <div className="dash-stat-single">
                    <h2>{isTransactionMonth}</h2>
                    <p>payments this month</p>
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
                          <li>
                            <span
                              className="graph-up"
                              style={{
                                height:
                                  Math.round(
                                    (userRecetCount &&
                                      userRecetCount?.thirdLastMonth
                                        ?.paymentCountThirdLastMonth /
                                        isTransactionTOtal) * 100
                                  ) > 1
                                    ? Math.round(
                                        (userRecetCount &&
                                          userRecetCount?.thirdLastMonth
                                            ?.paymentCountThirdLastMonth /
                                            isTransactionTOtal) * 100
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
                                      userRecetCount?.secondLastMonth
                                        ?.paymentCountSecondLastMonth /
                                        isTransactionTOtal) * 100
                                  ) > 1
                                    ? Math.round(
                                        (userRecetCount &&
                                          userRecetCount?.secondLastMonth
                                            ?.paymentCountSecondLastMonth /
                                            isTransactionTOtal) * 100
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
                                      userRecetCount?.lastMonth
                                        ?.paymentCountLastMonth /
                                        isTransactionTOtal) * 100
                                  ) > 1
                                    ? Math.round(
                                        (userRecetCount &&
                                          userRecetCount?.lastMonth
                                            ?.paymentCountLastMonth /
                                            isTransactionTOtal) * 100
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
                                      userRecetCount?.currentMonth
                                        ?.paymentCountThisMonth /
                                        isTransactionTOtal) * 100
                                  ) > 1
                                    ? Math.round(
                                        (userRecetCount &&
                                          userRecetCount?.currentMonth
                                            ?.paymentCountThisMonth /
                                            isTransactionTOtal) * 100
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
                    <p>revenue this month</p>
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
                                      userRecetCount?.thirdLastMonth
                                        ?.revenueThirdLastMonth /
                                        isRevenueTotal) * 100
                                  ) > 1
                                    ? Math.round(
                                        (userRecetCount &&
                                          userRecetCount?.thirdLastMonth
                                            ?.revenueThirdLastMonth /
                                            isRevenueTotal) * 100
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
                                      userRecetCount?.secondLastMonth
                                        ?.revenueSecondLastMonth /
                                        isRevenueTotal) * 100
                                  ) > 1
                                    ? Math.round(
                                        (userRecetCount &&
                                          userRecetCount?.secondLastMonth
                                            ?.revenueSecondLastMonth /
                                            isRevenueTotal) * 100
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
                                      userRecetCount?.lastMonth
                                        ?.revenueLastMonth / isRevenueTotal) *
                                      100
                                  ) > 1
                                    ? Math.round(
                                        (userRecetCount &&
                                          userRecetCount?.lastMonth
                                            ?.revenueLastMonth /
                                            isRevenueTotal) * 100
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
                                      userRecetCount?.currentMonth
                                        ?.revenueThisMonth / isRevenueTotal) *
                                      100
                                  ) > 1
                                    ? Math.round(
                                        (userRecetCount &&
                                          userRecetCount?.currentMonth
                                            ?.revenueThisMonth /
                                            isRevenueTotal) * 100
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
                    <h2>{isTransactionReceive}</h2>
                    <p>user reach this month</p>
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
                          <li>
                            <span
                              className="graph-up"
                              style={{
                                height:
                                  Math.round(
                                    (userRecetCount &&
                                      userRecetCount?.thirdLastMonth
                                        ?.userThirdLastMonth /
                                        isReceivedTotal) * 100
                                  ) > 1
                                    ? Math.round(
                                        (userRecetCount &&
                                          userRecetCount?.thirdLastMonth
                                            ?.userThirdLastMonth /
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
                                      userRecetCount?.secondLastMonth
                                        ?.userSecondLastMonth /
                                        isReceivedTotal) * 100
                                  ) > 1
                                    ? Math.round(
                                        (userRecetCount &&
                                          userRecetCount?.secondLastMonth
                                            ?.userSecondLastMonth /
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
                                      userRecetCount?.lastMonth?.userLastMonth /
                                        isReceivedTotal) * 100
                                  ) > 1
                                    ? Math.round(
                                        (userRecetCount &&
                                          userRecetCount?.lastMonth
                                            ?.userLastMonth / isReceivedTotal) *
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
                                      userRecetCount?.currentMonth
                                        ?.userThisMonth / isReceivedTotal) * 100
                                  ) > 1
                                    ? Math.round(
                                        (userRecetCount &&
                                          userRecetCount?.currentMonth
                                            ?.userThisMonth / isReceivedTotal) *
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
                <div className="block-heading">
                  <h2>Transactions history</h2>
                  <div className="table-btn">
                    <div className="cm_search search-wrap clearable mr-3">
                      <input
                        type="text"
                        value={searchText}
                        onChange={(e) => {
                          searchTextChange(e);
                        }}
                        onKeyUp={(e) => {
                          if (e.key === "Enter") {
                            serchDatacall();
                          }
                        }}
                        className="form-control"
                        placeholder="Search"
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
                                    value="request"
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
                </div>
                <div className="transaction-main">
                  <div className="transaction-table transactionTable">
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
                            {/* <th>Method</th>
                      <th>Type</th> */}
                            <th style={{ width: "160px" }}>Action</th>
                          </tr>

                          {renderTransactionList()}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div
                  className="site-pagination"
                  style={{
                    display:
                      allTransaction && allTransaction?.totalPage >= 1
                        ? "block"
                        : "none",
                  }}
                >
                  {paginationList()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MerchantDetails;
