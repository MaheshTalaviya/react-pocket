import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Transactions.css";
import Header from "../../component/Header";
import user from "./../../assets/images/user-2.jpg";
import TranstionIdModel from "./TranstionIdModel";
import TranstionFilter from "./TranstionFilter";
import ExportModal from "./ExportModal";
import Chart from "chart.js";
import AddMerchantsModel from "../Merchants/AddMerchantsModel";
import { getAllTransactionList } from "../../redux/action/UserAction/UserAction";
import {
  getAllPageTransactionApiData,
  getTransactionByTypeApiData,
  getTransactionDailyGrowth,
  getAllPageTransactionApiDataExport,
  getTransactionDetailsApiDataExport,
} from "../../redux/action/TransactionAction/TransactionAction";
import { getCategorySubList } from "../../redux/action/SettingAction/SettingAction";
import { merchantTypeList } from "../../redux/action/MerchantAction/MerchantAction";
import { isEmpty } from "lodash";
import moment from "moment";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { jsPDF } from "jspdf";
import exportFromJSON from "export-from-json";
import { approvelsAddAPiRequest } from "../../redux/action/Approvels/ApprovelsAction";
import { GET_TRASACTION_DETAILS_API_EXPORT_CLEAR } from "../../redux/action/actionTypes";
import { renderToString, renderToStaticMarkup } from "react-dom/server";

import ExportData from "./export";
const Transtion = () => {
  const [isUserDetails, setIsUserDetails] = useState(false);
  const [isUserFilter, setIsUserFilter] = useState(false);
  const [isShowExportModal, setIsShowExportModa] = useState(false);
  const [isTransactionData, setIsTransactionData] = useState("");
  const [isCurrentPage, setIsCurrentPage] = useState(1);
  const [isSort, setIsSort] = useState("");
  const [isStatus, setIsStatus] = useState([]);
  const [sortStatus, setSortStatus] = useState([]);
  const [mathodStatus, setMathodStatus] = useState([]);
  const [isCatType, setIsCatType] = useState([]);
  const [showCalender, setShowCalender] = useState(false);
  const [isCalenderDate, setIsCalenderDate] = useState("");
  const [isCalnder, setIsCalnder] = useState(true);
  const [colorsCode, setColorsCode] = useState([]);
  const [percentArr, setPercentArr] = useState([]);
  const [donutSort, setDonutSort] = useState(6);
  const [activeIndex, setActiveIndex] = useState(0);
  const [totalTranaction, setTotalTranaction] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [exportDesable, setDesableExport] = useState(false);
  const dispatch = useDispatch();

  const allTransaction = useSelector(
    (state) => state.transactionData.userSuccesData
  );
  const transactionByType = useSelector(
    (state) => state.transactionData.transactionByTpe
  );
  const catSubCatData = useSelector(
    (state) => state.settingData.getCatSubcatData
  );
  const tranactionDailyGrowth = useSelector(
    (state) => state.transactionData.tranactionDailyGrowth
  );
  const adminPermission = useSelector(
    (state) => state.loginData.loginSuccesData
  );
  const tranactionExport = useSelector(
    (state) => state.transactionData.tranactionApiExport
  );
  const weekObj = [
    { data: "last_week", value: "Last Week" },
    { data: "two_week", value: "2 Week" },
    { data: "this_month", value: "This Month" },
    { data: "last_month", value: "Last Month" },
    { data: "6_months", value: "6 Months" },
  ];
  const transactionDetail = useSelector(
    (state) => state.transactionData.tranactionApiDatailExport
  );
  useEffect(() => {
    barChart();
  }, [tranactionDailyGrowth]);
  useEffect(() => {
    if (transactionByType) {
      barChart1();
    }
  }, [transactionByType]);

  useEffect(() => {
    dispatch(getCategorySubList());
    dispatch(getTransactionDailyGrowth({ filter: "last_week" }));
  }, []);
  useEffect(() => {
    //  barChart()

    let formData = getFilter(isCurrentPage);
    dispatch(getAllPageTransactionApiData(formData));
    let resdata = getFilter(isCurrentPage);
    resdata.export = true;
    dispatch(getAllPageTransactionApiDataExport(resdata));
    dispatch(merchantTypeList());

    //dispatch(getAllTransactionList())
  }, []);
  const exportData = () => {
    if (exportDesable) {
      return true;
    } else {
      const data = tranactionExport && tranactionExport?.result;
      const fileName = "download";
      const exportType = exportFromJSON.types.xls;
      exportFromJSON({ data, fileName, exportType });
    }
  };
  useEffect(() => {
    dispatch(getTransactionByTypeApiData({ month: donutSort }));
  }, [donutSort]);
  const barChart = () => {
    var ctx2 = document.getElementById("myChart2").getContext("2d");
    if (window.bar1 != undefined) {
      window.bar1.destroy();
    }

    window.bar1 = new Chart(ctx2, {
      type: "bar",
      fillOpacity: 0.8,

      data: {
        labels: tranactionDailyGrowth?.result
          ?.reverse()
          .map((d) =>
            d.date ? new Date(d.date).getDate() : d.dateRange.split(" ")
          ),
        datasets: [
          {
            label: "Payments",
            backgroundColor: "#38B635",
            borderColor: "#38B635",
            pointBorderColor: "#38B635",
            borderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 4,
            pointBackgroundColor: "#FFF",
            data: tranactionDailyGrowth?.result?.map((d) => d.paymentCount),
          },
          {
            label: "Requests",
            backgroundColor: "#CFEECE",
            borderColor: "#CFEECE",
            pointBorderColor: "#CFEECE",
            borderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 4,
            pointBackgroundColor: "#FFF",
            data: tranactionDailyGrowth?.result?.map((d) => d.requestCount),
          },
        ],
      },
      options: {
        //events:['click'],
        responsive: true,
        maintainAspectRatio: false,
        bezierCurve: false,
        elements: {
          line: {
            tension: 0,
          },
        },
        scales: {
          xAxes: [
            {
              gridLines: { color: "rgba(0, 0, 0, 0)" },
            },
          ],
          yAxes: [
            {
              ticks: { beginAtZero: true },
              gridLines: { color: "rgba(244, 244, 244, 1)" },
            },
          ],
        },

        tooltips: {
          custom: function (tooltip) {
            if (!tooltip) return;
            // disable displaying the color box;
            tooltip.displayColors = false;
          },
          callbacks: {
            // use label callback to return the desired label
            label: function (tooltipItem, data) {
              return "Count: " + tooltipItem.yLabel;
            },
            // remove title
            title: function (tooltipItem, data) {
              return;
            },
          },
          backgroundColor: "#FFF",
          borderColor: "rgba(0, 0, 0, 0.09)",
          borderWidth: 1,
          bodyFontColor: "rgba(0, 0, 0, 1)",
          bodyAlign: "center",
          bodyFontSize: 14,
          bodyFontStyle: 500,
        },
        legend: {
          align: "end",
          labels: {
            boxWidth: 12,
            fontColor: "#A4A7B0",
          },
        },
      },
    });
  };

  const dountClauclate = (arr) => {
    const total = arr?.slice(0, 8).reduce((a, c) => a + c.count, 0);
    setTotalTranaction(total);
    return arr?.slice(0, 8).map((d) => Math.round((d.count * 100) / total));
  };

  const barChart1 = () => {
    var ctx3 = document.getElementById("myDoughnutChart").getContext("2d");
    const arrColor = [
      "#1C932F",
      "#4EA5F6",
      "#F75009",
      "#59E827",
      "#F79809",
      "#7C27E8",
      "#e83e8c",
      "#fd7e14",
    ];
    const pArr = dountClauclate(transactionByType?.result);
    setColorsCode(arrColor);
    setPercentArr(pArr);

    var myDoughnutChart = new Chart(ctx3, {
      type: "doughnut",
      data: {
        labels: transactionByType?.result?.slice(0, 8).map((d) => d.type),
        datasets: [
          {
            data: pArr,
            backgroundColor: arrColor,
            borderColor: arrColor,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutoutPercentage: 70,
        tooltips: {
          custom: function (tooltip) {
            if (!tooltip) return;
            // disable displaying the color box;
            tooltip.displayColors = false;
          },
          callbacks: {
            label: function (tooltipItem, data) {
              return transactionByType?.result?.map((d) => d.count)[
                tooltipItem["index"]
              ];
            },
          },
          backgroundColor: "#FFF",
          borderColor: "rgba(0, 0, 0, 0.09)",
          borderWidth: 1,
          bodyFontColor: "rgba(0, 0, 0, 1)",
          bodyAlign: "center",
          bodyFontSize: 14,
          bodyFontStyle: 500,
        },
        legend: {
          align: "center",
          position: "right",
          display: false,
          labels: {
            boxWidth: 42,
            padding: 15,
            fontColor: "#373737",
          },
        },
      },
    });
  };

  const transactionsIdModelClose = (item) => {
    setIsTransactionData(item);
    setIsUserDetails(!isUserDetails);
  };

  const exportModalClose = () => {
    setIsShowExportModa(false);
  };

  const getFilter = (page) => {
    const formData = {
      status: isStatus,
      type: isCatType,
      method: mathodStatus,
      sort: sortStatus.toString(),
      time: isSort ? isSort : "all-time",

      page: page,
    };
    return formData;
  };

  const paginationHander = (pageNumber) => {
    setIsCurrentPage(pageNumber);
    let formData = getFilter(pageNumber);
    setIsUserFilter(false);
    dispatch(getAllPageTransactionApiData(formData));
  };

  const nextPaginationHander = (pageNumber) => {
    if (isCurrentPage !== pageNumber) {
      const p = isCurrentPage + 1;
      setIsCurrentPage(p);

      let formData = getFilter(p);
      setIsUserFilter(false);
      dispatch(getAllPageTransactionApiData(formData));
    }
  };

  const previousPaginationHander = () => {
    if (isCurrentPage > 1) {
      const p = isCurrentPage - 1;
      setIsCurrentPage(p);

      let formData = getFilter(p);
      setIsUserFilter(false);
      dispatch(getAllPageTransactionApiData(formData));
    }
  };

  const firstPaginationHander = () => {
    const p = 1;
    setIsCurrentPage(p);

    let formData = getFilter(p);
    setIsUserFilter(false);
    dispatch(getAllPageTransactionApiData(formData));
  };
  const lastPaginationHander = (pageNumber) => {
    const p = pageNumber;
    setIsCurrentPage(p);

    let formData = getFilter(p);
    setIsUserFilter(false);
    dispatch(getAllPageTransactionApiData(formData));
  };
  const searchTextChange = (e) => {
    setSearchText(e.target.value);
  };
  const applyFilter = (e) => {
    setDesableExport(false);
    setSearchText("");
    e.preventDefault();
    setIsUserFilter(false);

    let formData = getFilter(isCurrentPage);

    dispatch(getAllPageTransactionApiData(formData));
    let resdata = getFilter(isCurrentPage);
    resdata.export = true;
    dispatch(getAllPageTransactionApiDataExport(resdata));
  };

  const clearFilter = () => {
    setIsCatType([]);
    setIsStatus([]);
    setSortStatus([]);
    setMathodStatus([]);
  };

  const sortHander = (e) => {
    if (e.currentTarget.value === "custom_range") {
      const formData = {
        status: isStatus,
        type: isCatType,
        method: mathodStatus,
        sort: sortStatus,
        custom_range: isCalenderDate,
        page: isCurrentPage,
      };
      dispatch(getAllPageTransactionApiData(formData));
      setShowCalender(true);
    } else {
      setShowCalender(false);
      const formData = {
        status: isStatus,
        type: isCatType,
        method: mathodStatus,
        sort: sortStatus,
        time: e.currentTarget.value,
        page: isCurrentPage,
      };
      let resdata = {
        status: isStatus,
        type: isCatType,
        method: mathodStatus,
        sort: sortStatus,
        time: e.currentTarget.value,
        page: isCurrentPage,
      };
      resdata.export = true;
      dispatch(getAllPageTransactionApiDataExport(resdata));
      dispatch(getAllPageTransactionApiData(formData));
      setIsSort(e.currentTarget.value);
    }
  };

  const sortDonutHander = (e) => {
    setDonutSort(e.currentTarget.value);
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
  const onChangeSortHandler = (e) => {
    if (e.target.checked) {
      setSortStatus(e.target.value);
    }
  };

  const customRange = (value) => {
    const rangeDate =
      moment(value[0]).format("Y-MM-DD") +
      " " +
      moment(value[1]).format("Y-MM-DD");
    setIsCalenderDate(rangeDate);

    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(value[1]);
    const secondDate = new Date(value[0]);

    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

    const formData = {
      status: isStatus,
      type: isCatType,
      method: mathodStatus,
      sort: sortStatus,
      custom_range: rangeDate,
      page: isCurrentPage,
    };
    dispatch(getAllPageTransactionApiData(formData));
    const exportdata = {
      status: isStatus,
      type: isCatType,
      method: mathodStatus,
      sort: sortStatus,
      export: true,
      page: isCurrentPage,
    };

    if (diffDays <= 90) {
      exportdata.custom_range = rangeDate;
      dispatch(getAllPageTransactionApiDataExport(exportdata));
    } else {
      let lDate = moment(value[1]).subtract(90, "days").format("Y-MM-DD");
      exportdata.custom_range =
        lDate + " " + moment(value[1]).format("Y-MM-DD");
      dispatch(getAllPageTransactionApiDataExport(exportdata));
    }
    setIsCalnder(false);
  };
  const calenderToggle = () => {
    setIsCalnder(!isCalnder);
  };

  const categoryType = () => {
    const transactionType = ["School Fee,Recharge,Bills,Food"];
    return (
      !isEmpty(transactionType) &&
      transactionType.map((item, index) => {
        return (
          <div className="col-6">
            <label className="custom-check">
              {item}
              <input
                type="checkbox"
                name="type"
                value={item}
                onChange={(e) => onChangeTypeHandler(e)}
              />
              <span className="checkmark" />
            </label>
          </div>
        );
      })
    );
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

  const graphreder = (data, serch) => {
    dispatch(getTransactionDailyGrowth({ filter: serch }));

    setActiveIndex(data);
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
  const exportPdf = (s) => {
    dispatch(getTransactionDetailsApiDataExport(s.transactionId));
  };
  const renderTransactionList = () => {
    if (!isEmpty(allTransaction) && allTransaction.result != undefined) {
      return (
        !isEmpty(allTransaction) &&
        allTransaction.result.map((item, index) => {
          const {
            transactionId,
            transactionStatus,
            method,
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
              <td onClick={() => transactionsIdModelClose(item)}>
                #{transactionId}
              </td>
              <td onClick={() => transactionsIdModelClose(item)}>
                <div
                  onClick={() => transactionsIdModelClose(item)}
                  className="date"
                >
                  {moment(transactionDate).format("LL")}{" "}
                  <span>{moment(transactionDate).format("hh:mm A")}</span>{" "}
                </div>
              </td>
              <td onClick={() => transactionsIdModelClose(item)}>
                <div className="sender">
                  <span className="sender-img">
                    <img src={senderAvtar} alt="" />
                  </span>
                  <span className="sender-txt">
                    {senderName} <br />
                  </span>
                </div>
              </td>
              <td onClick={() => transactionsIdModelClose(item)}>
                {senderPhone}
              </td>
              <td onClick={() => transactionsIdModelClose(item)}>
                <div className="sender">
                  <span className="sender-img">
                    <img src={receiverAvtar} alt="" />
                  </span>
                  <span className="sender-txt">
                    {receiverName} <br />{" "}
                  </span>
                </div>
              </td>
              <td onClick={() => transactionsIdModelClose(item)}>
                {receiverPhone}
              </td>
              <td onClick={() => transactionsIdModelClose(item)}>
                GH₵{amount}
              </td>
              <td onClick={() => transactionsIdModelClose(item)}>
                {transactionStatus}
              </td>
              <td onClick={() => transactionsIdModelClose(item)}>{method}</td>
              <td onClick={() => transactionsIdModelClose(item)}>{type}</td>
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
                {/* <a className="action-link" href="javascript:void(0)" desabled={true}><i className="icon-icon-refund" /></a>
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

  const serchDatacall = () => {
    dispatch(
      getAllPageTransactionApiData({ search: true, searchText: searchText })
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
  return (
    <div>
      <Header />

      {isUserDetails && (
        <TranstionIdModel
          isModalOpen={isUserDetails}
          transactionDataById={isTransactionData}
          onClick={() => transactionsIdModelClose()}
        />
      )}

      <ExportModal
        isModalOpen={isShowExportModal}
        onClick={() => exportModalClose()}
      />

      <section className="dash-wrap">
        <div className="sec-block alt first">
          <div className="row modified">
            <div className="col-xl-7">
              <div className="block-single alt">
                <div className="block-heading">
                  <h2>Daily Growth</h2>
                  <h3>
                    {tranactionDailyGrowth?.dailyCount[0].count}{" "}
                    <span>today</span>
                  </h3>
                  <div className="link-all">
                    {/* <a href="javascript:void(0)">Last week</a>
                    <a className="active ml-3 mr-3" href="javascript:void(0)"  >2 weeks</a>
                    <a href="javascript:void(0)" className="mr-3">This month</a>
                    <a href="javascript:void(0)" className="mr-3">Last month</a>
                    <a href="javascript:void(0)">6 months</a> */}
                    {weekObj.map((item, index) => {
                      return (
                        <a
                          className={`${
                            activeIndex === index ? "active" : ""
                          } ml-3 mr-3`}
                          href="javascript:void(0)"
                          onClick={() => {
                            graphreder(index, item.data);
                          }}
                        >
                          {item.value}
                        </a>
                      );
                    })}
                  </div>
                </div>
                <div className="growth-chart">
                  <canvas id="myChart2" />
                </div>
              </div>
            </div>
            <div className="col-xl-5">
              <div className="block-single alt">
                <div className="block-heading">
                  <h2>Transactions by Type</h2>
                  <div className="custom-select-wrap">
                    <div className="selectImage">
                      <select
                        className="custom-select"
                        name="state"
                        onChange={sortDonutHander}
                      >
                        <option value="6">6 Months</option>
                        <option value="12">12 Months</option>
                        <option value="18"> 18 Months</option>
                        <option value="24"> 24 Months</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="user-chart forTrans">
                  <canvas id="myDoughnutChart" />
                  <div className="user-chart-count">
                    <h3>{totalTranaction}</h3>
                    <p>overall transactions</p>
                  </div>
                  <div className="user-chart-level">
                    <ul>
                      {transactionByType?.result
                        ?.slice(0, 8)
                        .map((data, index) => (
                          <li>
                            <span
                              className="chart-level-bg level-payment"
                              style={{ backgroundColor: colorsCode[index] }}
                            >
                              {percentArr[index]}%
                            </span>{" "}
                            <span className="chart-level-txt">{data.type}</span>
                          </li>
                        ))}
                      {/* <li><span className="chart-level-bg level-shop">25%</span> <span className="chart-level-txt">Shopping</span></li>
                      <li><span className="chart-level-bg level-payment">20%</span> <span className="chart-level-txt">Payment for Bills</span></li>
                      <li><span className="chart-level-bg level-food">15%</span> <span className="chart-level-txt">Food</span></li>
                      <li><span className="chart-level-bg level-school">10%</span> <span className="chart-level-txt">School Fees</span></li>
                      <li><span className="chart-level-bg level-travel">5%</span> <span className="chart-level-txt">Travel</span></li>
                      <li><span className="chart-level-bg level-other">3%</span> <span className="chart-level-txt">Other</span></li> */}
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
              <h2>Transactions</h2>
              <div className="table-btn">
                {/* <ul class="select-filter">
              <li>By status: Completed <span><i class="fa fa-times" aria-hidden="true"></i></span></li>
              <li>By method: Payment <span><i class="fa fa-times" aria-hidden="true"></i></span></li>
            </ul> */}
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
                        <i className="fa fa-calendar-o" aria-hidden="true" />
                      </div>
                      {isCalnder && (
                        <Calendar
                          onChange={(value) => customRange(value)}
                          next2Label={null}
                          prev2Label={null}
                          selectRange={true}
                          maxDate={new Date()}
                          returnValue="range"
                        />
                      )}
                    </div>
                  </>
                )}

                <a
                  className="link green"
                  style={{ cursor: exportDesable ? "not-allowed" : "pointer" }}
                  onClick={exportData}
                >
                  <i className="icon-icon-download" /> Export
                </a>
              </div>
            </div>
            <div className="transaction-main">
              <div className="transaction-table">
                <div className="table-responsive">
                  <table className="table theme-table transactionTable">
                    <tbody>
                      <tr>
                        <th>Transaction ID</th>
                        <th>Date</th>
                        <th>Sender</th>
                        <th>Sender Phone</th>
                        <th>Receiver</th>
                        <th>Receiver Phone</th>
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
            {/* <div className="site-pagination">
              <ul>
                <li><a className="nxt" href="#"><i className="fa fa-angle-double-left" aria-hidden="true" /></a></li>
                <li><a className="nxt" href="#"><i className="fa fa-angle-left" aria-hidden="true" /></a></li>
                <li><a className="active" href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li><a href="#">5</a></li>
                <li><a className="nxt" href="#"><i className="fa fa-angle-right" aria-hidden="true" /></a></li>
                <li><a className="nxt" href="#"><i className="fa fa-angle-double-right" aria-hidden="true" /></a></li>
              </ul>
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Transtion;
