import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Chart from "chart.js";
import Header from "../../component/Header";
import { useHistory } from "react-router-dom";
import ApprovalIdModal from "../Approvals/ApprovalIdModal";
import merchant1 from "./../../assets/images/merchant-1.png";
import merchant2 from "./../../assets/images/merchant-2.png";
import merchant3 from "./../../assets/images/merchant-3.png";
import merchant4 from "./../../assets/images/merchant-4.png";
import merchant5 from "./../../assets/images/merchant-5.png";

import user1 from "./../../assets/images/user-1.jpg";
import user2 from "./../../assets/images/user-2.jpg";
import user3 from "./../../assets/images/user-3.jpg";
import user4 from "./../../assets/images/user-4.jpg";
import user5 from "./../../assets/images/user-5.jpg";

import arrowup from "./../../assets/images/arrow-up.svg";
import arrowdown from "./../../assets/images/arrow-down.svg";
// import BarChart from '../../component/BarGraph/BarGraph'

import {
  recentUserList,
  individualVSBusinessList,
  userStatCount,
  getRecentTransactionList,
  getPaymentVsRequest,
  getDashboardPaymentVsRequestApi,
  getDashboarduserReachDeviceApi,
} from "../../redux/action/UserAction/UserAction";
import { getMerchantByRevenueApiData } from "../../redux/action/MerchantAction/MerchantAction";
import { useDispatch, useSelector } from "react-redux";
import { cond, floor, isEmpty } from "lodash";
import moment from "moment";
import { getAllApprovelsApiData } from "../../redux/action/Approvels/ApprovelsAction";

const DashBoard = () => {
  let history = useHistory();
  const [approvalDetails, setApprovalDetails] = useState({});
  const [dailyGrowthSort, setDailyGrowthSort] = useState(2);
  const [isRecentUserList, setIsRecentUserList] = useState();
  const [isCurrentWeek, setIsCurrentWeek] = useState();
  const [isCountIndUser, setIsCountIndUser] = useState(0);
  const [isCountBusUser, setIsCountBusUser] = useState(0);
  const [isIndUserPer, setIsIndUserPer] = useState(0);
  const [isBusUserPer, setIsBusUserPer] = useState(0);
  const [isPaymentMonth, setIsPaymentMonth] = useState(0);
  const [isRequestMonth, setIsRequestMonth] = useState(0);
  const [isPaymentMonthPer, setIsPaymentMonthPer] = useState("");
  const [isRequestMonthPer, setIsRequestMonthPer] = useState("");
  const [sortRevenue, setSortRevenue] = useState(6);
  const [userTotal, setUserTotal] = useState(0);
  const [colorsCode, setColorsCode] = useState([]);
  const [percentArr, setPercentArr] = useState([]);
  const [donutSort, setDonutSort] = useState(6);
  const dispatch = useDispatch();
  const recentUser = useSelector((state) => state.userData.recentUser);
  const indVsBus = useSelector((state) => state.userData.individualVSBusiness);
  const userCountStash = useSelector((state) => state.userData.countUserStat);
  const recentTransaction = useSelector(
    (state) => state.userData.recentTransactionData
  );
  const getPayVsReqData = useSelector(
    (state) => state.userData.paymentVsRequestData
  );
  const getMerchantByRevenue = useSelector(
    (state) => state.merchantData.getMerchantByRevenue
  );
  const paymentRequest = useSelector(
    (state) => state.userData.dashBoardPaymentVsRequest
  );
  const userReachDevice = useSelector(
    (state) => state.userData.dashBoardUserReachDevice
  );
  const adminPermission = useSelector(
    (state) => state.loginData.loginSuccesData
  );
  const merchantList = useSelector(
    (state) => state.approvalData.ApprovelsListData
  );
  const [payCount, setPayCount] = useState(0);
  const [isShowApprovalId, setIsShowApprovalId] = useState(0);
  const [indCount, setIndCount] = useState(0);
  const [businessCount, setBusinessCount] = useState(0);
  const [requestCount, setRequestCount] = useState(0);
  const [paysCount, setpaysCount] = useState(0);
  useEffect(() => {
    if (adminPermission.role !== "admin") {
      dispatch(getAllApprovelsApiData({ status: "pending", page: 1 }));
    }
  }, []);
  useEffect(() => {
    if (Object.keys(userReachDevice).length !== 0) {
      barChart3();
    }
  }, [userReachDevice]);

  useEffect(() => {
    //barChart()
    //  barChart2()
    //barChart3()
    dispatch(recentUserList());
    dispatch(individualVSBusinessList("current_week"));
    dispatch(userStatCount());
    dispatch(getRecentTransactionList());
    dispatch(getPaymentVsRequest());

    countUserStash();
    countPayAndReq();
  }, []);

  useEffect(() => {
    barChart();
  }, [paymentRequest]);
  useEffect(() => {
    if (Object.keys(indVsBus).length !== 0) {
      barChart2();
    }
  }, [indVsBus]);

  const dailyGrowthSortHander = (e) => {
    setDailyGrowthSort(e.currentTarget.value);
  };
  const countUserStash = () => {
    if (!isEmpty(userCountStash)) {
      // setIsCountIndUser(userCountStash.total_indivisual_user)
      // setIsCountBusUser(userCountStash.total_business_user)
      // setIsIndUserPer(userCountStash.individualUserPer)
      // setIsBusUserPer(userCountStash.businessUserPer)
    }
  };

  useEffect(() => {
    dispatch(getMerchantByRevenueApiData(sortRevenue));
  }, [sortRevenue]);

  useEffect(() => {
    countUserStash();
  }, [userCountStash]);

  useEffect(() => {
    countPayAndReq();
  }, [getPayVsReqData]);

  useEffect(() => {
    dispatch(getDashboardPaymentVsRequestApi({ week: dailyGrowthSort }));
  }, [dailyGrowthSort]);
  const countPayAndReq = () => {
    if (!isEmpty(getPayVsReqData.result)) {
      let paymentPercent = 0;
      let requestPerent = 0;
      let paymentTotal = "";
      let requestTotal = "";

      let indiVisaulPercent = 0;
      let businessUserPerent = 0;
      let indiVisaulTotal = "";
      let businessUserTotal = "";

      if (
        getPayVsReqData.result.currentMonth?.paymentCount >
        getPayVsReqData.result.lastMonth?.paymentCount
      ) {
        paymentTotal =
          getPayVsReqData.result.currentMonth.paymentCount -
          getPayVsReqData.result.lastMonth.paymentCount;
        paymentPercent =
          (paymentTotal / getPayVsReqData.result.currentMonth.paymentCount) *
          100;
      } else {
        paymentTotal =
          getPayVsReqData.result.currentMonth?.paymentCount -
          getPayVsReqData.result.lastMonth?.paymentCount;
        paymentPercent =
          (paymentTotal / getPayVsReqData.result.lastMonth?.paymentCount) * 100;
      }

      if (
        getPayVsReqData.result.currentMonth?.requestCount >
        getPayVsReqData.result.lastMonth?.requestCount
      ) {
        requestTotal =
          getPayVsReqData.result.currentMonth?.requestCount -
          getPayVsReqData.result.lastMonth?.requestCount;
        requestPerent =
          (requestTotal / getPayVsReqData.result.currentMonth.requestCount) *
          100;
      } else {
        requestTotal =
          getPayVsReqData.result.currentMonth?.requestCount -
          getPayVsReqData.result.lastMonth?.requestCount;
        requestPerent =
          (requestTotal / getPayVsReqData.result.lastMonth?.requestCount) * 100;
      }

      if (
        getPayVsReqData.result.currentMonth?.individualCount >
        getPayVsReqData.result.lastMonth?.individualCount
      ) {
        indiVisaulTotal =
          getPayVsReqData.result.currentMonth.individualCount -
          getPayVsReqData.result.lastMonth.individualCount;
        indiVisaulPercent =
          (indiVisaulTotal /
            getPayVsReqData.result.currentMonth.individualCount) *
          100;
      } else {
        indiVisaulTotal =
          getPayVsReqData.result.currentMonth?.individualCount -
          getPayVsReqData.result.lastMonth?.individualCount;
        indiVisaulPercent =
          (indiVisaulTotal /
            getPayVsReqData.result.lastMonth?.individualCount) *
          100;
      }

      if (
        getPayVsReqData.result.currentMonth?.businessCount >
        getPayVsReqData.result.lastMonth?.businessCount
      ) {
        businessUserTotal =
          getPayVsReqData.result.currentMonth.businessCount -
          getPayVsReqData.result.lastMonth.businessCount;
        businessUserPerent =
          (businessUserTotal /
            getPayVsReqData.result.currentMonth.individualCount) *
          100;
      } else {
        businessUserTotal =
          getPayVsReqData.result.currentMonth?.businessCount -
          getPayVsReqData.result.lastMonth?.businessCount;
        businessUserPerent =
          (businessUserTotal /
            getPayVsReqData.result.lastMonth?.businessCount) *
          100;
      }

      setIsPaymentMonth(getPayVsReqData.result.currentMonth.paymentCount);
      setIsRequestMonth(getPayVsReqData.result.currentMonth.requestCount);

      setIsPaymentMonthPer(
        isNaN(paymentPercent.toFixed(0)) ? 0 : paymentPercent.toFixed(0)
      );
      setIsRequestMonthPer(
        isNaN(requestPerent.toFixed(0)) ? 0 : requestPerent.toFixed(0)
      );

      setIsCountIndUser(getPayVsReqData.result.currentMonth.individualCount);
      setIsCountBusUser(getPayVsReqData.result.currentMonth.businessCount);
      setIsIndUserPer(
        isNaN(indiVisaulPercent.toFixed(0)) ? 0 : indiVisaulPercent.toFixed(0)
      );
      setIsBusUserPer(
        isNaN(businessUserPerent.toFixed(0)) ? 0 : businessUserPerent.toFixed(0)
      );

      const totalPaymentCount =
        getPayVsReqData.result.currentMonth?.paymentCount +
        getPayVsReqData.result.lastMonth?.paymentCount +
        getPayVsReqData.result.secondLastMonth?.paymentCount +
        getPayVsReqData.result.thirdLastMonth?.paymentCount;
      setpaysCount(totalPaymentCount);
      const totalRequestCount =
        getPayVsReqData.result.currentMonth?.requestCount +
        getPayVsReqData.result.lastMonth?.requestCount +
        getPayVsReqData.result.secondLastMonth?.requestCount +
        getPayVsReqData.result.thirdLastMonth?.requestCount;
      setRequestCount(totalRequestCount);
      const totalRequaestCount =
        getPayVsReqData.result.currentMonth?.businessCount +
        getPayVsReqData.result.lastMonth?.businessCount +
        getPayVsReqData.result.secondLastMonth?.businessCount +
        getPayVsReqData.result.thirdLastMonth?.businessCount;
      setBusinessCount(totalRequaestCount);
      const indCount =
        getPayVsReqData.result.currentMonth?.individualCount +
        getPayVsReqData.result.lastMonth?.individualCount +
        getPayVsReqData.result.secondLastMonth?.individualCount +
        getPayVsReqData.result.thirdLastMonth?.individualCount;
      setIndCount(indCount);
    }
  };

  const barChart = () => {
    var ctx = document.getElementById("myChart").getContext("2d");
    var gradientFill = ctx.createLinearGradient(0, 250, 0, 130);
    gradientFill.addColorStop(1, "rgba(56, 182, 53, 1)");
    gradientFill.addColorStop(0, "rgba(255, 255, 255, 0)");

    var gradientFill2 = ctx.createLinearGradient(0, 250, 0, 80);
    gradientFill2.addColorStop(1, "rgba(207, 238, 206, 1)");
    gradientFill2.addColorStop(0, "rgba(255, 255, 255, 0)");

    if (window.bar2 != undefined) {
      window.bar2.destroy();
    }
    window.bar2 = new Chart(ctx, {
      type: "line",
      fillOpacity: 0.8,
      data: {
        labels: paymentRequest?.result
          ?.reverse()
          .map((d) =>
            d.date ? new Date(d.date).getDate() : d.dateRange.split(" ")
          ),
        datasets: [
          {
            label: "Payments",
            backgroundColor: gradientFill,
            borderColor: "#38B635",
            pointBorderColor: "#38B635",
            borderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 4,
            pointBackgroundColor: "#FFF",
            data: paymentRequest?.result?.map((d) => d.paymentCount),
          },
          {
            label: "Requests",
            backgroundColor: gradientFill2,
            borderColor: "#CFEECE",
            pointBorderColor: "#CFEECE",
            borderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 4,
            pointBackgroundColor: "#FFF",
            data: paymentRequest?.result?.map((d) => d.requestCount),
          },
        ],
      },
      options: {
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
  const sortMerchantRevenue = (e) => {
    setSortRevenue(e.currentTarget.value);
  };
  const weekHandler = (e) => {
    dispatch(individualVSBusinessList(e.currentTarget.value));
    setIsCurrentWeek(e.currentTarget.value);
    barChart2();
  };

  const barChart2 = () => {
    var ctx2 = document.getElementById("myChart2").getContext("2d");
    var weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    if (window.bar3 != undefined) {
      window.bar3.destroy();
    }
    window.bar3 = new Chart(ctx2, {
      type: "bar",
      fillOpacity: 0.8,
      data: {
        labels:
          indVsBus &&
          indVsBus?.result?.reverse().map((item) => {
            return weekday[new Date(item.DayDate).getDay()];
          }), //indVsBus.map((item)=>{ return item.DayDate }),
        datasets: [
          {
            label: "Individuals",
            backgroundColor: "#38B635",
            borderColor: "#38B635",
            pointBorderColor: "#38B635",
            borderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 4,
            pointBackgroundColor: "#FFF",
            data:
              indVsBus &&
              indVsBus?.result?.reverse().map((item) => {
                return item.individualCount;
              }),
          },
          {
            label: "Business",
            backgroundColor: "#CFEECE",
            borderColor: "#CFEECE",
            pointBorderColor: "#CFEECE",
            borderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 4,
            pointBackgroundColor: "#FFF",
            data:
              indVsBus &&
              indVsBus?.result?.reverse().map((item) => {
                return item.businessCount;
              }),
          },
        ],
      },
      options: {
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
  const sortDonutHander = (e) => {
    setDonutSort(e.currentTarget.value);
  };
  useEffect(() => {
    dispatch(getDashboarduserReachDeviceApi(donutSort));
  }, [donutSort]);
  const dountClauclate = (arr) => {
    const total = arr?.slice(0, 8).reduce((a, c) => a + c.count, 0);
    setUserTotal(total);
    return arr?.slice(0, 8).map((d) => Math.round((d.count * 100) / total));
  };

  const barChart3 = () => {
    var ctx3 = document.getElementById("myDoughnutChart").getContext("2d");

    const arrColor = ["#1C932F", "#4EA5F6", "#F79809"];
    const pArr = dountClauclate(userReachDevice?.result);
    setColorsCode(arrColor);
    setPercentArr(pArr);
    var myDoughnutChart = new Chart(ctx3, {
      type: "doughnut",
      data: {
        labels: userReachDevice?.result?.slice(0, 8).map((d) => d.device),
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
              //console.log(data)
              return userReachDevice?.result?.slice(0, 8).map((d) => d.count)[
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

  const renderRecentUserList = () => {
    return (
      !isEmpty(recentUser) &&
      recentUser.data.map((item, index) => {
        const {
          id,
          username,
          useremail,
          accountType,
          profileImage,
          countryCode,
          phone,
        } = item;
        return (
          <li>
            <span className="list-item-img">
              <img src={profileImage} alt="" />
            </span>
            <span className="list-item-txt">
              <h3>{username}</h3>
              <h4>
                <span>{accountType}</span>
              </h4>
            </span>
            <span className="list-item-details">
              <h5>
                {countryCode} {phone} <span>{useremail}</span>{" "}
              </h5>
            </span>
          </li>
        );
      })
    );
  };

  const renderRecentMerchantList = () => {
    // console.log("recentUser====",recentUser);
    if (!isEmpty(recentUser) && recentUser.recentMerchant != undefined) {
      return (
        !isEmpty(recentUser) &&
        recentUser.recentMerchant != undefined &&
        recentUser.recentMerchant.map((item, index) => {
          const { id, companyName, useremail, companyLogo, type, website } =
            item;
          return (
            <li>
              <span className="merchants-img">
                <img src={companyLogo} alt="" />
              </span>
              <span className="merchants-details">
                <h3>
                  {companyName} <span>{type}</span>
                </h3>
              </span>
              <span className="merchants-link">
                <a href="#">{website}</a>
              </span>
            </li>
          );
        })
      );
    } else {
      return <div>Loading...</div>;
    }
  };
  const approvalIdModelClose = () => {
    setIsShowApprovalId(false);
  };
  const recentTranactionRender = () => {
    return (
      !isEmpty(recentTransaction) &&
      recentTransaction.data.map((item, key) => {
        const {
          transactionId,
          transactionDate,
          amount,
          senderAvtar,
          senderName,
          receiverName,
          paymentType,
          accountType,
          paymentThrough,
          type,
        } = item;
        return (
          <li>
            <span className="list-item-img">
              <img src={senderAvtar} />
            </span>
            <span className="list-item-txt">
              <h3>{senderName}</h3>
              {type === "Business" || type === "Individual" ? (
                <h4>
                  <span>to</span> {receiverName}
                </h4>
              ) : (
                <h4>
                  <span>{type}</span>
                </h4>
              )}
            </span>
            <span className="list-item-details">
              <h5>
                -GH₵{amount}{" "}
                <span>{moment(transactionDate).format("LL")} </span>
              </h5>
            </span>
          </li>
        );
      })
    );
  };

  return (
    <div>
      <Header />
      <ApprovalIdModal
        isModalOpen={isShowApprovalId}
        onClick={() => approvalIdModelClose()}
        data={approvalDetails}
      />
      {/* <NoCard />
      <Grafcard />
      <TranstionCard />
      <Merchantscard /> */}
      <section className="dash-wrap">
        <div className="dash-stat">
          <div className="row modified">
            <div className="col-lg-3 col-sm-6">
              <div className="dash-stat-single">
                <h2>{isCountIndUser}</h2>
                <p>individual users this month</p>
                <div className="dash-stat-graph">
                  {isIndUserPer >= 0 ? (
                    <div className="stat-percentage">
                      {isIndUserPer}% <img src={arrowup} alt="" />{" "}
                    </div>
                  ) : (
                    <div className="stat-percentage down">
                      {isIndUserPer}% <img src={arrowdown} alt="" />{" "}
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
                                (getPayVsReqData &&
                                  getPayVsReqData?.result?.thirdLastMonth
                                    ?.individualCount / indCount) * 100
                              ) > 1
                                ? Math.round(
                                    (getPayVsReqData &&
                                      getPayVsReqData?.result?.thirdLastMonth
                                        ?.individualCount / indCount) * 100
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
                                (getPayVsReqData &&
                                  getPayVsReqData?.result?.secondLastMonth
                                    ?.individualCount / indCount) * 100
                              ) > 1
                                ? Math.round(
                                    (getPayVsReqData &&
                                      getPayVsReqData?.result?.secondLastMonth
                                        ?.individualCount / indCount) * 100
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
                                (getPayVsReqData &&
                                  getPayVsReqData?.result?.lastMonth
                                    ?.individualCount / indCount) * 100
                              ) > 1
                                ? Math.round(
                                    (getPayVsReqData &&
                                      getPayVsReqData?.result?.lastMonth
                                        ?.individualCount / indCount) * 100
                                  ) + "%"
                                : "2%",
                          }}
                        ></span>
                      </li>
                      <li>
                        <span
                          className={`${
                            isIndUserPer >= 0 ? "graph-up" : "graph-down"
                          }`}
                          style={{
                            height:
                              Math.round(
                                (getPayVsReqData &&
                                  getPayVsReqData?.result?.currentMonth
                                    ?.individualCount / indCount) * 100
                              ) > 1
                                ? Math.round(
                                    (getPayVsReqData &&
                                      getPayVsReqData?.result?.currentMonth
                                        ?.individualCount / indCount) * 100
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
            <div className="col-lg-3 col-sm-6">
              <div className="dash-stat-single">
                <h2>{isCountBusUser}</h2>
                <p>business users this month</p>
                <div className="dash-stat-graph">
                  {isBusUserPer < 0 ? (
                    <div className="stat-percentage down">
                      {isBusUserPer}% <img src={arrowdown} alt="" />{" "}
                    </div>
                  ) : (
                    <div className="stat-percentage">
                      {isBusUserPer}% <img src={arrowup} alt="" />{" "}
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
                                (getPayVsReqData &&
                                  getPayVsReqData?.result?.thirdLastMonth
                                    ?.businessCount / businessCount) * 100
                              ) > 1
                                ? Math.round(
                                    (getPayVsReqData &&
                                      getPayVsReqData?.result?.thirdLastMonth
                                        ?.businessCount / businessCount) * 100
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
                                (getPayVsReqData &&
                                  getPayVsReqData?.result?.secondLastMonth
                                    ?.businessCount / businessCount) * 100
                              ) > 1
                                ? Math.round(
                                    (getPayVsReqData &&
                                      getPayVsReqData?.result?.secondLastMonth
                                        ?.businessCount / businessCount) * 100
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
                                (getPayVsReqData &&
                                  getPayVsReqData?.result?.lastMonth
                                    ?.businessCount / businessCount) * 100
                              ) > 1
                                ? Math.round(
                                    (getPayVsReqData &&
                                      getPayVsReqData?.result?.lastMonth
                                        ?.businessCount / businessCount) * 100
                                  ) + "%"
                                : "2%",
                          }}
                        ></span>
                      </li>
                      <li>
                        <span
                          className={`${
                            isBusUserPer >= 0 ? "graph-up" : "graph-down"
                          }`}
                          style={{
                            height:
                              Math.round(
                                (getPayVsReqData &&
                                  getPayVsReqData?.result?.currentMonth
                                    ?.businessCount / businessCount) * 100
                              ) > 1
                                ? Math.round(
                                    (getPayVsReqData &&
                                      getPayVsReqData?.result?.currentMonth
                                        ?.businessCount / businessCount) * 100
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
            <div className="col-lg-3 col-sm-6">
              <div className="dash-stat-single">
                <h2>{isPaymentMonth} </h2>
                <p>payments this month</p>
                <div className="dash-stat-graph">
                  {isPaymentMonthPer > 0 ? (
                    <div className="stat-percentage">
                      {" "}
                      {isPaymentMonthPer}% <img src={arrowup} alt="" />{" "}
                    </div>
                  ) : (
                    <div className="stat-percentage down">
                      {" "}
                      {isPaymentMonthPer}% <img src={arrowdown} alt="" />{" "}
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
                                (getPayVsReqData &&
                                  getPayVsReqData?.result?.thirdLastMonth
                                    ?.paymentCount / paysCount) * 100
                              ) > 1
                                ? Math.round(
                                    (getPayVsReqData &&
                                      getPayVsReqData?.result?.thirdLastMonth
                                        ?.paymentCount / paysCount) * 100
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
                                (getPayVsReqData &&
                                  getPayVsReqData?.result?.secondLastMonth
                                    ?.paymentCount / paysCount) * 100
                              ) > 1
                                ? Math.round(
                                    (getPayVsReqData &&
                                      getPayVsReqData?.result?.secondLastMonth
                                        ?.paymentCount / paysCount) * 100
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
                                (getPayVsReqData &&
                                  getPayVsReqData?.result?.lastMonth
                                    ?.paymentCount / paysCount) * 100
                              ) > 1
                                ? Math.round(
                                    (getPayVsReqData &&
                                      getPayVsReqData?.result?.lastMonth
                                        ?.paymentCount / paysCount) * 100
                                  ) + "%"
                                : "2%",
                          }}
                        ></span>
                      </li>
                      <li>
                        <span
                          className={`${
                            isPaymentMonthPer >= 0 ? "graph-up" : "graph-down"
                          }`}
                          style={{
                            height:
                              Math.round(
                                (getPayVsReqData &&
                                  getPayVsReqData?.result?.currentMonth
                                    ?.paymentCount / paysCount) * 100
                              ) > 1
                                ? Math.round(
                                    (getPayVsReqData &&
                                      getPayVsReqData?.result?.currentMonth
                                        ?.paymentCount / paysCount) * 100
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
            <div className="col-lg-3 col-sm-6">
              <div className="dash-stat-single">
                <h2>{isRequestMonth}</h2>
                <p>requests this month</p>
                <div className="dash-stat-graph">
                  {isRequestMonthPer < 0 ? (
                    <div className="stat-percentage down">
                      {isRequestMonthPer}% <img src={arrowdown} alt="" />{" "}
                    </div>
                  ) : (
                    <div className="stat-percentage ">
                      {isRequestMonthPer}% <img src={arrowup} alt="" />{" "}
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
                                (getPayVsReqData &&
                                  getPayVsReqData?.result?.thirdLastMonth
                                    ?.requestCount / requestCount) * 100
                              ) > 1
                                ? Math.round(
                                    (getPayVsReqData &&
                                      getPayVsReqData?.result?.thirdLastMonth
                                        ?.requestCount / requestCount) * 100
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
                                (getPayVsReqData &&
                                  getPayVsReqData?.result?.secondLastMonth
                                    ?.requestCount / requestCount) * 100
                              ) > 1
                                ? Math.round(
                                    (getPayVsReqData &&
                                      getPayVsReqData?.result?.secondLastMonth
                                        ?.requestCount / requestCount) * 100
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
                                (getPayVsReqData &&
                                  getPayVsReqData?.result?.lastMonth
                                    ?.requestCount / requestCount) * 100
                              ) > 1
                                ? Math.round(
                                    (getPayVsReqData &&
                                      getPayVsReqData?.result?.lastMonth
                                        ?.requestCount / requestCount) * 100
                                  ) + "%"
                                : "2%",
                          }}
                        ></span>
                      </li>
                      <li>
                        <span
                          className={`${
                            isRequestMonthPer >= 0 ? "graph-up" : "graph-down"
                          }`}
                          style={{
                            height:
                              Math.round(
                                (getPayVsReqData &&
                                  getPayVsReqData?.result?.currentMonth
                                    ?.requestCount / requestCount) * 100
                              ) > 1
                                ? Math.round(
                                    (getPayVsReqData &&
                                      getPayVsReqData?.result?.currentMonth
                                        ?.requestCount / requestCount) * 100
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
          <div className="row modified">
            <div
              className={`${
                adminPermission.role == "admin" ? "col-xl-8" : "col-xl-5 "
              } col-lg-12`}
            >
              <div className="block-single">
                <div className="block-heading">
                  <h2>Payments vs Requests</h2>

                  <div className="custom-select-wrap">
                    <div className="selectImage">
                      <select
                        className="custom-select"
                        name="state"
                        onChange={(e) => dailyGrowthSortHander(e)}
                      >
                        <option value="2">Two weeks</option>
                        <option value="4">Four weeks</option>
                        <option value="6">Six weeks</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="payment-req-chart">
                  {/* <BarChart id='myChart' /> */}
                  <canvas id="myChart" height="400" width="400"></canvas>
                </div>
              </div>
            </div>
            <div
              className={`${
                adminPermission.role == "admin" ? "col-xl-4" : "col-xl-4"
              } col-lg-6`}
            >
              <div className="block-single">
                <div className="block-heading">
                  <h2>Recent Transactions</h2>
                  <a
                    href="javascript:void(0)"
                    className="btn-see"
                    onClick={() => history.push("/transaction")}
                  >
                    See All
                  </a>
                </div>
                <div className="recent-trans">
                  <ul className="list-item">{recentTranactionRender()}</ul>
                </div>
              </div>
            </div>
            <div
              className="col-xl-3 col-lg-6"
              style={{
                display: adminPermission.role !== "admin" ? "block" : "none",
              }}
            >
              <div className="block-single">
                <div className="block-heading">
                  <h2>Pending Approvals</h2>
                  <a
                    className="btn-see"
                    style={{ cursor: "pointer" }}
                    onClick={() => history.push("/approvals")}
                  >
                    See All
                  </a>
                </div>
                <div className="pending-approval">
                  <ul className="list-item">
                    {merchantList &&
                      merchantList?.result?.slice(0, 5).map((item, index) => {
                        item.page = 1;
                        item.filter = "pending";
                        return (
                          <li>
                            <span className="list-item-txt">
                              <h3>{item.adminName}</h3>
                              <h4>{item.action}</h4>
                            </span>
                            <span className="list-item-btn">
                              <a
                                href="#"
                                onClick={() => {
                                  setApprovalDetails(item);
                                  setIsShowApprovalId(!isShowApprovalId);
                                }}
                              >
                                <i className="icon-icon-tick"></i>
                              </a>
                              <a
                                className="close-btn ml-2"
                                onClick={() => {
                                  setApprovalDetails(item);
                                  setIsShowApprovalId(!isShowApprovalId);
                                }}
                                href="#"
                              >
                                <i className="icon-icon-close2"></i>
                              </a>
                            </span>
                          </li>
                        );
                      })}
                    {/* <li>
                      <span className="list-item-txt">
                        <h3>James Anderson</h3>
                        <h4><span>requested</span> Refund</h4>
                      </span>
                      <span className="list-item-btn">
                        <a href="#"><i className="icon-icon-tick"></i></a>
                        <a className="close-btn ml-2" href="#"><i className="icon-icon-close2"></i></a>
                      </span>
                    </li> */}
                    {/* <li>
                      <span className="list-item-txt">
                        <h3>Bob Ado</h3>
                        <h4><span>changed</span> KYC status </h4>
                      </span>
                      <span className="list-item-btn">
                        <a href="#"><i className="icon-icon-tick"></i></a>
                        <a className="close-btn ml-2" href="#"><i className="icon-icon-close2"></i></a>
                      </span>
                    </li>
                    <li>
                      <span className="list-item-txt">
                        <h3>James Anderson</h3>
                        <h4><span>changed</span> KYC status </h4>
                      </span>
                      <span className="list-item-btn">
                        <a href="#"><i className="icon-icon-tick"></i></a>
                        <a className="close-btn ml-2" href="#"><i className="icon-icon-close2"></i></a>
                      </span>
                    </li>
                    <li>
                      <span className="list-item-txt">
                        <h3>James Anderson</h3>
                        <h4><span>requested</span> Refund</h4>
                      </span>
                      <span className="list-item-btn">
                        <a href="#"><i className="icon-icon-tick"></i></a>
                        <a className="close-btn ml-2" href="#"><i className="icon-icon-close2"></i></a>
                      </span>
                    </li>
                    <li>
                      <span className="list-item-txt">
                        <h3>Bradley Donkor</h3>
                        <h4><span>requested</span> Refund</h4>
                      </span>
                      <span className="list-item-btn">
                        <a href="#"><i className="icon-icon-tick"></i></a>
                        <a className="close-btn ml-2" href="#"><i className="icon-icon-close2"></i></a>
                      </span>
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sec-block alt">
          <div className="row modified">
            <div className="col-xl-4 col-lg-12">
              <div className="block-single alt">
                <div className="block-heading">
                  <h2>Individual vs Business</h2>
                  <div className="custom-select-wrap">
                    <div className="selectImage">
                      <select
                        className="custom-select"
                        name="state"
                        onChange={(e) => weekHandler(e)}
                      >
                        <option value="current_week">This week</option>
                        <option value="last_week">Last week</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="inde-business-chart">
                  <canvas id="myChart2"></canvas>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6">
              <div className="block-single alt">
                <div className="block-heading">
                  <h2>Recent Users Registered</h2>
                  <a
                    className="btn-see"
                    href="javascript:void(0)"
                    onClick={() => history.push("/user")}
                  >
                    See All
                  </a>
                </div>
                <div className="recent-user">
                  <ul className="list-item">{renderRecentUserList()}</ul>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6">
              <div className="block-single alt">
                <div className="block-heading">
                  <h2>Users Reach by Device</h2>
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
                <div className="user-chart">
                  <canvas id="myDoughnutChart"></canvas>
                  <div className="user-chart-count">
                    <h3>{userTotal}</h3>
                    <p>overall users</p>
                  </div>
                  <div className="user-chart-level">
                    <ul>
                      {userReachDevice &&
                        userReachDevice?.result?.map((data, index) => (
                          <li>
                            <span
                              className="chart-level-bg level-payment"
                              style={{ backgroundColor: colorsCode[index] }}
                            >
                              {percentArr[index]}%
                            </span>{" "}
                            <span className="chart-level-txt">
                              {data.device}
                            </span>
                          </li>
                        ))}
                      {/* <li><span className="chart-level-bg level-mob">75%</span> <span className="chart-level-txt">Mobile</span></li>
                      <li><span className="chart-level-bg level-desk">15%</span> <span className="chart-level-txt">Desktop</span></li>
                      <li><span className="chart-level-bg level-tab">5%</span> <span className="chart-level-txt">Tablet</span></li> */}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sec-block alt">
          <div className="row modified">
            <div className="col-xl-6 col-lg-12">
              <div className="block-single">
                <div className="block-heading">
                  <h2>Merchants by Revenue</h2>
                  <div className="custom-select-wrap">
                    <div className="selectImage">
                      {/* <select className="custom-select" name="state">
                        <option>6 Months</option>
                        <option>12 Months</option>
                        <option>18 Months</option>
                        <option>24 Months</option>
                      </select> */}
                      <select
                        className="custom-select"
                        name="state"
                        onChange={(e) => sortMerchantRevenue(e)}
                      >
                        <option value="6">6 Months</option>
                        <option value="12">12 Months</option>
                        <option value="18">18 Months</option>
                        <option value="24">24 Months</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="merchant-rev">
                  <ul className="merchant-rev-details">
                    {}
                    {getMerchantByRevenue &&
                      getMerchantByRevenue.map((item, index) => {
                        return (
                          <li>
                            <span className="merchant-img">
                              <img src={item.merchantLogo} alt="" />
                            </span>

                            {/* <div className="progress-bar" role="progressbar" style={{width: "25%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"/> */}
                            <div className="graph-sec">
                              <div className="input-bar">
                                <span
                                  className={`merchant-stat ${
                                    index === 0 ? "active" : ""
                                  }`}
                                  style={{
                                    width:
                                      floor(
                                        (item.revenueAmount /
                                          getMerchantByRevenue.reduce(
                                            (a, b) => a + b.revenueAmount,
                                            0
                                          )) *
                                          100
                                      ) + "%",
                                  }}
                                >
                                  <span className="bg"></span>
                                </span>
                              </div>
                              <span className="merchant-val">
                                GH₵ {item.revenueAmount}
                              </span>
                            </div>
                          </li>
                        );
                      })}
                    {/* <li>
                      <span className="merchant-img"><img src={merchant1} alt="" /></span>
                      <span className="merchant-stat" style={{ width: "80%" }}>
                        <span className="bg"></span>
                        <span className="merchant-val">GH₵23.455.00</span>
                      </span>
                    </li>
                    <li>
                      <span className="merchant-img"><img src={merchant2} alt="" /></span>
                      <span className="merchant-stat" style={{ width: "88%" }}>
                        <span className="bg"></span>
                        <span className="merchant-val">GH₵23.455.00</span>
                      </span>
                    </li>
                    <li>
                      <span className="merchant-img"><img src={merchant3} alt="" /></span>
                      <span className="merchant-stat active" style={{ width: "100%" }}>
                        <span className="bg"></span>
                        <span className="merchant-val">GH₵23.455.00</span>
                      </span>
                    </li>
                    <li>
                      <span className="merchant-img"><img src={merchant4} alt="" /></span>
                      <span className="merchant-stat" style={{ width: "86%" }}>
                        <span className="bg"></span>
                        <span className="merchant-val">GH₵23.455.00</span>
                      </span>
                    </li>
                    <li>
                      <span className="merchant-img"><img src={merchant5} alt="" /></span>
                      <span className="merchant-stat" style={{ width: "90%" }}>
                        <span className="bg"></span>
                        <span className="merchant-val">GH₵23.455.00</span>
                      </span>
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-12">
              <div className="block-single">
                <div className="block-heading">
                  <h2>Merchants</h2>
                  <a
                    className="btn-see"
                    href="javascript:void(0)"
                    onClick={() => history.push("/merchants")}
                  >
                    See All
                  </a>
                </div>
                <div className="merchants">
                  <ul className="merchantList">{renderRecentMerchantList()}</ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default DashBoard;
