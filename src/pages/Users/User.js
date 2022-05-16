import React, { useEffect, useState } from "react";
import "./User.css";
import Header from "../../component/Header";
import UserBlockModel from "./UserBlockModel";
import UserPaymentModel from "./UserPaymentModel";
import UserDeactiveModel from "./UserDeactiveModel";
import { useHistory } from "react-router-dom";
import Chart from "chart.js";
import {
  addUserData,
  individualVSBusinessList,
  serviceProviderList,
  getUserByMobileOperators,
  getUserDailyGrowthAll,
  exportUserData,
} from "../../redux/action/UserAction/UserAction";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import moment from "moment";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import exportFromJSON from "export-from-json";

const Users = () => {
  const [date, setDate] = useState(new Date());
  const [isUserBlock, setIsUserBlock] = useState(false);
  const [isUserPayment, setIsUserPayment] = useState(false);
  const [isUserDeactive, setIsUserDeactive] = useState(false);
  const [isShowExportModal, setIsShowExportModa] = useState(false);
  const [isUserData, setIsUserData] = useState(false);
  const [isSort, setIsSort] = useState('""');
  const [isCurrentPage, setIsCurrentPage] = useState(1);
  const [isCurrentWeek, setIsCurrentWeek] = useState();
  const [isUserFilter, setIsUserFilter] = useState(false);
  const [isStatus, setIsStatus] = useState([]);
  const [isAccountType, setIsAccountType] = useState([]);
  const [isServiceProvider, setIsServiceProvider] = useState([]);
  const [showCalender, setShowCalender] = useState(false);
  const [isCalenderDate, setIsCalenderDate] = useState("");
  const [isCalnder, setIsCalnder] = useState(true);
  const [colorsCode, setColorsCode] = useState([]);
  const [percentArr, setPercentArr] = useState([]);
  const [donutSort, setDonutSort] = useState(6);
  const [dailyGrowthSort, setDailyGrowthSort] = useState(1);
  const [userTotall, setUserTotal] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [exportDesable, setDesableExport] = useState(false);

  let history = useHistory();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData.userSuccesData);
  const indVsBus = useSelector((state) => state.userData.individualVSBusiness);
  const spData = useSelector((state) => state.userData.serviceProviderData);
  const usersByMobile = useSelector(
    (state) => state.userData.userByMobileOperators
  );
  const userDailyGrowth = useSelector(
    (state) => state.userData.userDailyGrowth
  );
  const adminPermission = useSelector(
    (state) => state.loginData.loginSuccesData
  );
  const exportDataJson = useSelector((state) => state.userData.exportObj);

  useEffect(() => {
    if (Object.keys(usersByMobile).length !== 0) {
      barChart2();
    }
  }, [usersByMobile]);
  useEffect(() => {
    dispatch(getUserByMobileOperators(donutSort));
  }, [donutSort]);
  const sortDonutHander = (e) => {
    setDonutSort(e.currentTarget.value);
  };
  useEffect(() => {
    barChart();
  }, [userDailyGrowth]);
  useEffect(() => {
    // barChart()
    //dispatch(getUserByMobileOperators(6))
    // barChart2()
    const filter = {
      account_type: isAccountType,
      service_provider: isServiceProvider,
      status: isStatus,
    };
    const formData = {
      page: isCurrentPage,
      sort: isSort,
      filter: filter,
    };
    dispatch(addUserData(formData));

    dispatch(individualVSBusinessList("current_week"));
    dispatch(serviceProviderList());
    barChart1();
    let a = {
      page: isCurrentPage,
      sort: isSort,
      filter: filter,
      export: true,
    };
    dispatch(exportUserData(a));
  }, []);

  const userBlockModelClose = () => {
    setIsUserBlock(false);
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

  useEffect(() => {
    if (userData && userData?.search === true) {
      setDesableExport(true);
    }
  }, [userData]);

  const barChart = () => {
    var ctx = document.getElementById("myChart").getContext("2d");

    var gradientFill = ctx.createLinearGradient(0, 250, 0, 130);
    gradientFill.addColorStop(1, "rgba(56, 182, 53, 1)");
    gradientFill.addColorStop(0, "rgba(255, 255, 255, 0)");

    var gradientFill2 = ctx.createLinearGradient(0, 250, 0, 80);
    gradientFill2.addColorStop(1, "rgba(207, 238, 206, 1)");
    gradientFill2.addColorStop(0, "rgba(255, 255, 255, 0)");
    if (window.bar4 != undefined) {
      window.bar4.destroy();
    }
    window.bar4 = new Chart(ctx, {
      type: "line",
      fillOpacity: 0.8,
      data: {
        labels: userDailyGrowth?.result
          ?.reverse()
          .map((d) =>
            d.date ? new Date(d.date).getDate() : d.dateRange.split(" ")
          ),
        datasets: [
          {
            label: "Growth",
            backgroundColor: gradientFill,
            borderColor: "#38B635",
            pointBorderColor: "#38B635",
            borderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 4,
            pointBackgroundColor: "#FFF",
            data: userDailyGrowth?.result?.map((d) => d.count),
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
              return "Count " + tooltipItem.yLabel;
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

  const weekHandler = (e) => {
    dispatch(individualVSBusinessList(e.currentTarget.value));
    setIsCurrentWeek(e.currentTarget.value);
  };

  const dailyGrowthSortHander = (e) => {
    setDailyGrowthSort(e.currentTarget.value);
  };
  useEffect(() => {
    dispatch(getUserDailyGrowthAll({ week: dailyGrowthSort }));
  }, [dailyGrowthSort]);
  useEffect(() => {
    if (Object.keys(indVsBus).length !== 0) {
      barChart1();
    }
  }, [indVsBus]);

  const barChart1 = () => {
    var ctx2 = document.getElementById("myChart2").getContext("2d");
    var weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    if (window.bar5 != undefined) {
      window.bar5.destroy();
    }
    window.bar5 = new Chart(ctx2, {
      type: "bar",
      fillOpacity: 0.8,
      data: {
        labels:
          indVsBus &&
          indVsBus?.result?.reverse().map((item) => {
            return weekday[new Date(item.DayDate).getDay()];
          }),
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
  const dountClauclate = (arr) => {
    const total = arr?.slice(0, 8).reduce((a, c) => a + c.count, 0);
    setUserTotal(total);
    return arr?.slice(0, 8).map((d) => Math.round((d.count * 100) / total));
  };

  const barChart2 = () => {
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
    const pArr = dountClauclate(usersByMobile?.result);
    setColorsCode(arrColor);
    setPercentArr(pArr);

    var myDoughnutChart = new Chart(ctx3, {
      type: "doughnut",
      data: {
        labels: usersByMobile?.result
          ?.slice(0, 8)
          .map((d) => d.serviceProvider),
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
              return usersByMobile?.result?.map((d) => d.count)[
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

  const onChangeAccountTypeHandler = (e) => {
    const options1 = isAccountType;

    let index1;
    if (e.target.checked) {
      // console.log("99999999",e.target.value);
      options1.push(e.target.value);
    } else {
      index1 = options1.indexOf(e.target.value);

      options1.splice(index1, 1);
    }
    setIsAccountType(options1);
  };

  const onChangeSpHandler = (e) => {
    const options2 = isServiceProvider;
    let index2;
    if (e.target.checked) {
      options2.push(e.target.value);
    } else {
      index2 = options2.indexOf(e.target.value);
      options2.splice(index2, 1);
    }

    setIsServiceProvider(options2);
  };

  const applyFilter = (e) => {
    setDesableExport(false);
    setSearchText("");
    e.preventDefault();

    const filter = {
      account_type: isAccountType,
      service_provider: isServiceProvider,
      status: isStatus,
    };

    const formData = {
      page: isCurrentPage,
      sort: isSort,
      filter: filter,
    };
    setIsUserFilter(false);
    dispatch(addUserData(formData));
    let a = {
      page: isCurrentPage,
      sort: isSort,
      filter: filter,
      export: true,
    };
    dispatch(exportUserData(a));
  };

  const goToUserDetails = (item) => {
    history.push("/userdetails", { item });
  };

  const goToUserKycManagment = () => {
    history.push("/userkycmanagment");
  };

  const sortHander = (e) => {
    if (e.currentTarget.value === "custom_range") {
      setShowCalender(true);
    } else {
      setShowCalender(false);
      setIsSort(e.currentTarget.value);
    }

    const filter = {
      account_type: isAccountType,
      service_provider: isServiceProvider,
      status: isStatus,
    };

    const formData = {
      page: isCurrentPage,
      sort: e.currentTarget.value,
      filter: filter,
    };
    dispatch(addUserData(formData));
    let a = {
      page: isCurrentPage,
      sort: e.currentTarget.value,
      filter: filter,
      export: true,
    };
    dispatch(exportUserData(a));
  };

  const customRange = (value) => {
    const rangeDate =
      moment(value[0]).format("Y-MM-DD") +
      " " +
      moment(value[1]).format("Y-MM-DD");
    setIsCalenderDate(rangeDate);
    const filter = {
      account_type: isAccountType,
      service_provider: isServiceProvider,
      status: isStatus,
    };

    const formData = {
      page: isCurrentPage,
      sort: "",
      filter: filter,
      custom_range: rangeDate,
    };
    dispatch(addUserData(formData));
    let a = {
      page: isCurrentPage,
      sort: "",
      filter: filter,
      custom_range: rangeDate,
      export: true,
    };
    dispatch(exportUserData(a));
    setIsCalnder(false);
  };

  const calenderToggle = () => {
    setIsCalnder(!isCalnder);
  };

  const paginationHander = (pageNumber) => {
    setIsCurrentPage(pageNumber);
    const filter = {
      account_type: isAccountType,
      service_provider: isServiceProvider,
      status: isStatus,
    };
    const formData = {
      page: pageNumber,
      sort: isSort,
      filter: filter,
    };
    dispatch(addUserData(formData));
  };

  const nextPaginationHander = (pageNumber) => {
    if (isCurrentPage !== pageNumber) {
      const p = isCurrentPage + 1;
      setIsCurrentPage(p);

      const filter = {
        account_type: isAccountType,
        service_provider: isServiceProvider,
        status: isStatus,
      };
      const formData = {
        page: p,
        sort: isSort,
        filter: filter,
      };
      dispatch(addUserData(formData));
    }
  };

  const previousPaginationHander = () => {
    if (isCurrentPage > 1) {
      const p = isCurrentPage - 1;
      setIsCurrentPage(p);

      const filter = {
        account_type: isAccountType,
        service_provider: isServiceProvider,
        status: isStatus,
      };
      const formData = {
        page: p,
        sort: isSort,
        filter: filter,
      };
      dispatch(addUserData(formData));
    }
  };

  const firstPaginationHander = () => {
    const p = 1;
    setIsCurrentPage(p);

    const filter = {
      account_type: isAccountType,
      service_provider: isServiceProvider,
      status: isStatus,
    };
    const formData = {
      page: p,
      sort: isSort,
      filter: filter,
    };
    dispatch(addUserData(formData));
  };
  const lastPaginationHander = (pageNumber) => {
    const p = pageNumber;
    setIsCurrentPage(p);
    const filter = {
      account_type: isAccountType,
      service_provider: isServiceProvider,
      status: isStatus,
    };
    const formData = {
      page: p,
      sort: isSort,
      filter: filter,
    };
    dispatch(addUserData(formData));
  };
  const exportData = () => {
    if (exportDesable) {
      return true;
    } else {
      const data =
        exportDataJson &&
        exportDataJson?.data.map((elem) => ({
          Id: elem.id,
          Username: elem.username,
          Phone: elem.phone,
          Useremail: elem.useremail,
          AccountType: elem.accountType,
          CountryCode: elem.countryCode,
          ProfileImage: elem.profileImage,
          ServiceProvider: elem.serviceProvider,
          IconUrl: elem.iconUrl,
          CreatedAt: elem.createdAt,
        }));
      const fileName = "download";
      const exportType = exportFromJSON.types.xls;
      exportFromJSON({ data, fileName, exportType });
    }
  };
  const paginationList = () => {
    // const pageNumbers=[];
    // for(var i=1; i <= userData.totalPage; i++){
    //   pageNumbers.push(i)
    // }
    // const renderPageNumbers = pageNumbers.map(number => {
    //   return (
    //     <li key={number} onClick={(i)=>paginationHander(number)}>
    //     <a className={userData.currentPage==number ? "active" : '' }>{number}
    //     </a>
    //     </li>
    //   );
    // });
    const pageNumbers = [];
    for (var i = 1; i <= userData?.totalPage; i++) {
      pageNumbers.push(i);
    }
    if (userData?.totalPage > 3) {
    }
    const renderPageNumbers = pageNumbers.map((number) => {
      if (
        number === userData?.currentPage - 2 ||
        number === userData?.currentPage + 2
      ) {
        return <span>...</span>;
      } else if (
        number < 2 ||
        number === pageNumbers.length ||
        userData?.currentPage === number ||
        userData?.currentPage === number - 1 ||
        userData?.currentPage === number + 1
      ) {
        return (
          <li key={number} onClick={(i) => paginationHander(number)}>
            <a className={userData?.currentPage == number ? "active" : ""}>
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
            onClick={() => nextPaginationHander(userData.totalPage)}
          >
            <i className="fa fa-angle-right" aria-hidden="true" />
          </a>
        </li>
        <li>
          <a
            className="nxt"
            onClick={() => lastPaginationHander(userData.totalPage)}
          >
            <i className="fa fa-angle-double-right" aria-hidden="true" />
          </a>
        </li>
      </ul>
    );
  };

  const renderTableData = () => {
    //console.log('use....', userData)
    return (
      !isEmpty(userData) &&
      !isEmpty(userData) &&
      userData.data.map((item, index) => {
        const {
          id,
          accountType,
          phone,
          countryCode,
          profileImage,
          payment_receive,
          payment_request,
          useremail,
          username,
          status,
          is_block,
          kycStatus,
          iconUrl,
          payment_status,
          serviceProvider,
          createdAt,
        } = item; //destructuring
        return (
          <tr>
            {/* <td>
            <label className="custom-check">
              <input type="checkbox" />
              <span className="checkmark" />
            </label>
          </td> */}
            <td
              onClick={() => goToUserDetails(item)}
              style={{ cursor: "pointer" }}
            >
              #{id}
            </td>
            <td
              onClick={() => goToUserDetails(item)}
              style={{ cursor: "pointer" }}
            >
              <div onClick={() => goToUserDetails(item)} className="sender1111">
                <span className="sender-img">
                  <img src={profileImage} alt="" />
                </span>
                <span className="sender-txt">{username ? username : "NA"}</span>
              </div>
            </td>
            <td onClick={() => goToUserDetails(item)}>
              {countryCode}-{phone}
            </td>
            <td onClick={() => goToUserDetails(item)}>
              {" "}
              <div className="providerCol">
                <img src={iconUrl} style={{ width: "25px" }} />{" "}
                {serviceProvider}
              </div>
            </td>
            {/* <td onClick={() => goToUserDetails(item)}>{useremail ? useremail : 'NA'}</td> */}
            {/* <td >{useremail ? useremail : 'NA'}</td> */}
            <td onClick={() => goToUserDetails(item)}>
              {accountType ? accountType : "NA"}
            </td>
            <td onClick={() => goToUserDetails(item)}>
              {!isEmpty(kycStatus) ? kycStatus : "No request"}
            </td>
            <td onClick={() => goToUserDetails(item)}>
              <span>{moment(createdAt).format("YYYY-MM-DD")}</span> <br />{" "}
              <span>{moment(createdAt).format("H:m A")}</span>
            </td>

            <td>
              <a
                className={`${
                  is_block === 1 ? "action-link-danger" : "action-link"
                } ${
                  adminPermission.role === "admin" &&
                  adminPermission.permissions[0].users.blockUser === "view_only"
                    ? "disabled"
                    : ""
                }`}
              >
                <i
                  className="icon-icon-lock"
                  onClick={() => showUserBlockModel(item)}
                />
              </a>
              <a
                className={`${
                  payment_receive == 1 && payment_request == 1
                    ? "action-link"
                    : "action-link-danger"
                } ${
                  adminPermission.role === "admin" &&
                  adminPermission.permissions[0].users.preventPayment ===
                    "view_only"
                    ? "disabled"
                    : ""
                }`}
              >
                <i
                  className="icon-icon-close"
                  onClick={() => showUserPaymentModel(item)}
                />
              </a>
              <a
                className={`${
                  status === 1 ? "action-link" : "action-link-danger"
                } ${
                  adminPermission.role === "admin" &&
                  adminPermission.permissions[0].users.userAction ===
                    "view_only"
                    ? "disabled"
                    : ""
                }`}
              >
                <i
                  className="icon-icon-block"
                  onClick={() => showUserDeactiveModel(item)}
                />
              </a>
            </td>
          </tr>
        );
      })
    );
  };

  const serviceProvicerData = () => {
    return (
      !isEmpty(spData) &&
      spData.data.map((item, index) => {
        return (
          <label className="custom-check">
            <img src={item.iconUrl} style={{ width: "20px" }} />
            {item.name}
            <input
              type="checkbox"
              value={item.name}
              name="service_provider"
              onChange={(e) => onChangeSpHandler(e)}
            />
            <span className="checkmark" />
          </label>
        );
      })
    );
  };

  const clearFilter = () => {
    setIsAccountType([]);
    setIsServiceProvider([]);
    setIsStatus([]);
  };

  const searchTextChange = (e) => {
    setSearchText(e.target.value);
  };
  const serchDatacall = () => {
    dispatch(addUserData({ search: true, searchText: searchText }));
  };
  return (
    <div>
      <Header />
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
        <div className="sec-block alt first">
          <div className="row modified">
            <div className="col-xl-4 col-lg-12">
              <div className="block-single alt">
                <div className="block-heading">
                  <h2>Daily Growth</h2>
                  <div className="custom-select-wrap">
                    <div className="selectImage">
                      <select
                        className="custom-select"
                        name="state"
                        onChange={(e) => dailyGrowthSortHander(e)}
                      >
                        <option value="1">Last weeks</option>
                        <option value="4">Four weeks</option>
                        <option value="6">Six weeks</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="growth-chart for-user">
                  <canvas id="myChart" />
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6">
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
                  <canvas id="myChart2" />
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-6">
              <div className="block-single alt">
                <div className="block-heading">
                  <h2>Users by Mobile Operators</h2>
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
                <div className="user-chart for-user">
                  <canvas id="myDoughnutChart" />
                  <div className="user-chart-count">
                    <h3>{userTotall}</h3>
                    <p>overall users</p>
                  </div>
                  <div className="user-chart-level">
                    <ul>
                      {usersByMobile &&
                        usersByMobile.result?.map((data, index) => (
                          <li>
                            <span
                              className="chart-level-bg level-payment"
                              style={{ backgroundColor: colorsCode[index] }}
                            >
                              {percentArr[index]}%
                            </span>{" "}
                            <span className="chart-level-txt">
                              {data.serviceProvider}
                            </span>
                          </li>
                        ))}
                      {/* <li><span className="chart-level-bg level-shop">25%</span> <span className="chart-level-txt">Vodafone</span></li>
                      <li><span className="chart-level-bg level-payment">20%</span> <span className="chart-level-txt">MTN Ghana</span></li>
                      <li><span className="chart-level-bg level-food">15%</span> <span className="chart-level-txt">Tigo Ghana</span></li>
                      <li><span className="chart-level-bg level-school">10%</span> <span className="chart-level-txt">Expresso</span></li>
                      <li><span className="chart-level-bg level-travel">5%</span> <span className="chart-level-txt">Airtel Ghana</span></li>
                      <li><span className="chart-level-bg level-other">3%</span> <span className="chart-level-txt">Glo Mobile</span></li> */}
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
              <h2>Users</h2>
              <div className="table-btn">
                {/* <ul class="select-filter">
              <li>By status: Completed <span><i class="fa fa-times" aria-hidden="true"></i></span></li>
              <li>By method: Payment <span><i class="fa fa-times" aria-hidden="true"></i></span></li>
            </ul> */}
                <div className="cm_search search-wrap clearable mr-3">
                  <input
                    type="text"
                    value={searchText}
                    onKeyUp={(e) => {
                      if (e.key === "Enter") {
                        serchDatacall();
                      }
                    }}
                    onChange={(e) => {
                      searchTextChange(e);
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
                {/* <a className="link green mr-4" style={{cursor:"pointer"}} onClick={() => {}}>Search</a> */}
                <a
                  className="link green mr-4"
                  style={{ cursor: "pointer" }}
                  onClick={() => goToUserKycManagment()}
                >
                  KYC Management
                </a>
                <div className="dropdown inline drop-filter mr-3">
                  <a
                    className="dropdown-toggle link"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
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
                      <div
                        className="row modified"
                        style={{ marginTop: "15px" }}
                      >
                        <div className="col-4">
                          <div className="filter-single">
                            <h4>Status</h4>
                            <label className="custom-check">
                              Activated
                              <input
                                type="checkbox"
                                value="1"
                                name="status[]"
                                onChange={(e) => onChangeStatusHandler(e)}
                              />
                              <span className="checkmark" />
                            </label>
                            <label className="custom-check">
                              Deactivated
                              <input
                                type="checkbox"
                                value="0"
                                name="status[]"
                                onChange={(e) => onChangeStatusHandler(e)}
                              />
                              <span className="checkmark" />
                            </label>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="filter-single">
                            <h4>Account Type</h4>
                            <div className="row modified">
                              <div className="col-12">
                                <label className="custom-check">
                                  Individual
                                  <input
                                    type="checkbox"
                                    name="account_type"
                                    value="Individual"
                                    onChange={(e) =>
                                      onChangeAccountTypeHandler(e)
                                    }
                                  />
                                  <span className="checkmark" />
                                </label>
                                <label className="custom-check">
                                  Business
                                  <input
                                    type="checkbox"
                                    name="account_type"
                                    value="Business"
                                    onChange={(e) =>
                                      onChangeAccountTypeHandler(e)
                                    }
                                  />
                                  <span className="checkmark" />
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="col-4">
                          <div className="filter-single">
                            <h4>Service Provider</h4>
                            {serviceProvicerData()}
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
                <div className="custom-select-wrap alt mr-4">
                  <div className="selectImage">
                    <select
                      className="custom-select"
                      name="state"
                      onChange={(e) => sortHander(e)}
                    >
                      <option value="''">All time</option>
                      <option value="this_month">This month</option>
                      <option value="last_month">Last month</option>
                      <option value="last_6_month">6 months</option>
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
                  className={`link green`}
                  onClick={exportData}
                  style={{ cursor: exportDesable ? "not-allowed" : "pointer" }}
                >
                  <i className="icon-icon-download" /> Export
                </a>
              </div>
            </div>
            <div className="transaction-main">
              <div className="transaction-table">
                <div className="table-responsive">
                  <table className="table theme-table">
                    <tbody>
                      <tr>
                        {/* <th>
                        <label className="custom-check">
                          <input type="checkbox" />
                          <span className="checkmark" />
                        </label>
                      </th> */}
                        <th>User ID</th>
                        <th>Name</th>
                        <th>Phone number</th>
                        <th>Provider</th>
                        {/* <th>Email address</th> */}
                        <th>Account type</th>
                        <th>KYC Status</th>
                        <th>Created At</th>

                        <th style={{ width: "160px" }}>Action</th>
                      </tr>
                      {renderTableData()}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div
              className="site-pagination"
              style={{
                display:
                  userData && userData?.totalPage >= 1 ? "block" : "none",
              }}
            >
              {paginationList()}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Users;
