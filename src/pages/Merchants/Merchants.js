import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";

import "./Merchants.css";
import Chart from "chart.js";
import Header from "../../component/Header";
import AddMerchantsModel from "./AddMerchantsModel";
import EditMerchantsModel from "./EditMerchantsModel";
import NewAddCampaign from "./NewAddCampaign";
import MerchantDeactiveModal from "./MerchantDeactiveModal";
import merchant1 from "./../../assets/images/merchant-1.png";
import merchant2 from "./../../assets/images/merchant-2.png";
import merchant3 from "./../../assets/images/merchant-3.png";
import merchant4 from "./../../assets/images/merchant-4.png";
import merchant5 from "./../../assets/images/merchant-5.png";

import merc1 from "./../../assets/images/merc-1.png";
import merc2 from "./../../assets/images/merc-2.png";
import merc3 from "./../../assets/images/merc-3.png";
import merc4 from "./../../assets/images/merc-4.png";
import merc5 from "./../../assets/images/merc-5.png";
import merc6 from "./../../assets/images/merc-6.png";
import merc7 from "./../../assets/images/merc-7.png";
import merc8 from "./../../assets/images/merc-8.png";
import add from "./../../assets/images/icon-plus.svg";
import moment from "moment";
import exportFromJSON from "export-from-json";
import {
  merchantUserList,
  merchantTypeList,
  getMerchantDetailById,
  getMerchantTransactionCount,
  getMerchantByFeesCount,
  merchantUserListExport,
} from "../../redux/action/MerchantAction/MerchantAction";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "lodash";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { serviceProviderList } from "../../redux/action/UserAction/UserAction";

const Merchant = (props) => {
  let history = useHistory();
  const dispatch = useDispatch();

  const [date, setDate] = useState(new Date());
  const [isAddMerchants, setIsAddMerchants] = useState(false);
  const [isEditMerchants, setIsEditMerchants] = useState(false);
  const [isAddCampaign, setIsAddCampaign] = useState(false);
  const [isCurrentPage, setIsCurrentPage] = useState(1);
  const [isSort, setIsSort] = useState('""');
  const [isMerchant, setIsMerchant] = useState();
  const [isMerchantType, setIsMerchantType] = useState();
  const [merchantDetailData, setMerchantDetailData] = useState();
  const [isFirst, setIsFirst] = useState(false);
  const [isMerchantDeactive, setIsMerchantDeactive] = useState(false);
  const [isUserData, setIsUserData] = useState("");
  const [isStatus, setIsStatus] = useState([]);
  const [isCatType, setIsCatType] = useState([]);
  const [isUserFilter, setIsUserFilter] = useState(false);
  const [showCalender, setShowCalender] = useState(false);
  const [isCalenderDate, setIsCalenderDate] = useState("");
  const [isCalnder, setIsCalnder] = useState(true);
  const [colorsCode, setColorsCode] = useState([]);
  const [percentArr, setPercentArr] = useState([]);
  const [totalTranaction, setTotalTranaction] = useState(0);
  const [donutSort, setDonutSort] = useState(6);
  const [sortRevenue, setSortRevenue] = useState(6);
  const [searchText, setSearchText] = useState("");
  const [exportDesable, setDesableExport] = useState(false);
  const merchantList = useSelector(
    (state) => state.merchantData.merchantListSuccesData
  );
  const merchantType = useSelector(
    (state) => state.merchantData.merchanttypeData
  );
  const getMerchant = useSelector(
    (state) => state.merchantData.getMerchantDetail
  );
  const getMerchantByCount = useSelector(
    (state) => state.merchantData.getMerchantCount
  );
  const getMerchantByfees = useSelector(
    (state) => state.merchantData.getMerchantByFees
  );
  const adminPermission = useSelector(
    (state) => state.loginData.loginSuccesData
  );
  const exportmerchant = useSelector(
    (state) => state.merchantData.getMerchantExport
  );
  useEffect(() => {
    dispatch(getMerchantTransactionCount(donutSort));
  }, [donutSort]);
  useEffect(() => {
    dispatch(getMerchantByFeesCount(sortRevenue));
  }, [sortRevenue]);
  useEffect(() => {
    if (Object.keys(getMerchantByCount).length !== 0) {
      barChart();
    }
  }, [getMerchantByCount]);
  useEffect(() => {
    dispatch(serviceProviderList());
    // dispatch(getMerchantTransactionCount(6))
    //dispatch(getMerchantByFeesCount(6))
  }, []);
  const searchTextChange = (e) => {
    setSearchText(e.target.value);
  };
  useEffect(() => {
    //barChart()
    const filter = {
      type: isCatType,
      status: isStatus,
    };
    const formData = {
      page: isCurrentPage,
      sort: isSort,
      filter: filter,
    };
    dispatch(merchantUserList(formData));
    let a = { page: isCurrentPage, sort: isSort, filter: filter, export: true };
    dispatch(merchantUserListExport(a));
    dispatch(merchantTypeList());
    if (isFirst) {
      setMerchantDetailData(getMerchant);

      setIsEditMerchants(true);
    }
  }, [getMerchant]);

  const getMerType = () => {
    setIsMerchantType(merchantType);
  };

  const openAddMerchantsModal = () => {
    if (
      adminPermission.role === "admin" &&
      adminPermission.permissions[0].merchants.addMerchant === "view_only"
    ) {
      return true;
    } else {
      getMerType();
      console.log("isAddMerchants", !isAddMerchants);
      setIsAddMerchants(!isAddMerchants);
    }
  };

  const editMerchants = (id) => {
    if (
      adminPermission.role === "admin" &&
      adminPermission.permissions[0].merchants.editMerchant === "view_only"
    ) {
      return true;
    } else {
      getMerType();
      dispatch(getMerchantDetailById(id));
      setIsFirst(true);
    }
  };
  const dountClauclate = (arr) => {
    const total = arr?.slice(0, 8).reduce((a, c) => a + c.feeAmount, 0);
    setTotalTranaction(total);
    return arr?.map((d) => Math.round((d.feeAmount * 100) / total));
  };
  const barChart = () => {
    var ctx3 = document.getElementById("myDoughnutChart").getContext("2d");
    const arrColor = [
      "#59E827",
      "#F79809",
      "#0676DD",
      "#DA2290",
      "#1C932F",
      "#F75009",
      "#7C27E8",
      "#4EA5F6",
    ];
    const pArr = dountClauclate(getMerchantByCount?.result);
    setColorsCode(arrColor);
    setPercentArr(pArr);
    var myDoughnutChart = new Chart(ctx3, {
      type: "doughnut",
      data: {
        labels: getMerchantByCount?.result?.map((d) => d.merchantName),
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
        cutoutPercentage: 0,
        tooltips: {
          custom: function (tooltip) {
            if (!tooltip) return;
            // disable displaying the color box;
            tooltip.displayColors = false;
          },
          callbacks: {
            label: function (tooltipItem, data) {
              return getMerchantByCount?.result?.map((d) => d.feeAmount)[
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

  const goToMerchantsDetails = (id) => {
    history.push("/merchantsdetails", { id });
  };

  const merchantEditModal = () => {
    setIsEditMerchants(!isEditMerchants);
  };
  const merchantDeactiveModelClose = () => {
    setIsMerchantDeactive(false);
  };
  const showMerchantDeactiveModel = (item) => {
    if (
      adminPermission.role === "admin" &&
      adminPermission.permissions[0].merchants.merchantAction === "view_only"
    ) {
      return true;
    } else {
      setIsUserData(item);
      setIsMerchantDeactive(true);
    }
  };

  const sortHander = (e) => {
    if (e.currentTarget.value === "custom_range") {
      setShowCalender(true);
    } else {
      setShowCalender(false);
      setIsSort(e.currentTarget.value);
    }

    const filter = {
      type: isCatType,
      status: isStatus,
    };

    const formData = {
      page: isCurrentPage,
      sort: isSort,
      filter: filter,
    };
    setIsUserFilter(false);
    dispatch(merchantUserList(formData));
    let a = {
      page: isCurrentPage,
      sort: isSort,
      filter: filter,
      export: true,
    };
    dispatch(merchantUserListExport(a));
  };

  const customRange = (value) => {
    const rangeDate =
      moment(value[0]).format("Y-MM-DD") +
      " & " +
      moment(value[1]).format("Y-MM-DD");
    setIsCalenderDate(rangeDate);
    const filter = {
      type: isCatType,
      status: isStatus,
    };

    const formData = {
      page: isCurrentPage,
      sort: "",
      filter: filter,
      custom_range: rangeDate,
    };
    dispatch(merchantUserList(formData));
    let a = {
      page: isCurrentPage,
      sort: "",
      filter: filter,
      custom_range: rangeDate,
      export: true,
    };
    dispatch(merchantUserListExport(a));
    setIsCalnder(false);
  };

  const calenderToggle = () => {
    setIsCalnder(!isCalnder);
  };

  const paginationHander = (pageNumber) => {
    // console.log("----------------pageNumber",pageNumber);
    setIsCurrentPage(pageNumber);

    const filter = {
      type: isCatType,
      status: isStatus,
    };

    const formData = {
      page: pageNumber,
      sort: isSort,
      filter: filter,
    };

    setIsUserFilter(false);
    dispatch(merchantUserList(formData));
  };

  const nextPaginationHander = (pageNumber) => {
    if (isCurrentPage !== pageNumber) {
      const p = isCurrentPage + 1;
      setIsCurrentPage(p);

      const filter = {
        type: isCatType,
        status: isStatus,
      };

      const formData = {
        page: p,
        sort: isSort,
        filter: filter,
      };
      setIsUserFilter(false);
      dispatch(merchantUserList(formData));
    }
  };

  const previousPaginationHander = () => {
    if (isCurrentPage > 1) {
      const p = isCurrentPage - 1;
      setIsCurrentPage(p);
      const filter = {
        type: isCatType,
        status: isStatus,
      };

      const formData = {
        page: p,
        sort: isSort,
        filter: filter,
      };
      setIsUserFilter(false);
      dispatch(merchantUserList(formData));
    }
  };

  const firstPaginationHander = () => {
    const p = 1;
    setIsCurrentPage(p);
    const filter = {
      type: isCatType,
      status: isStatus,
    };

    const formData = {
      page: p,
      sort: isSort,
      filter: filter,
    };
    setIsUserFilter(false);
    dispatch(merchantUserList(formData));
  };
  const lastPaginationHander = (pageNumber) => {
    const p = pageNumber;
    setIsCurrentPage(p);
    const filter = {
      type: isCatType,
      status: isStatus,
    };

    const formData = {
      page: p,
      sort: isSort,
      filter: filter,
    };
    setIsUserFilter(false);
    dispatch(merchantUserList(formData));
  };
  const serchDatacall = () => {
    dispatch(merchantUserList({ search: true, searchText: searchText }));
  };
  useEffect(() => {
    if (merchantList && merchantList?.search === true) {
      setDesableExport(true);
    }
  }, [merchantList]);
  const paginationList = () => {
    // const pageNumbers=[];
    // for(var i=1; i <= merchantList.totalPage; i++){
    //   pageNumbers.push(i)
    // }
    // const renderPageNumbers = pageNumbers.map(number => {
    //   return (
    //     <li key={number} onClick={(i)=>paginationHander(number)}>
    //     <a className={merchantList.currentPage==number ? "active" : '' }>{number}
    //     </a>
    //     </li>
    //   );
    // });
    const pageNumbers = [];
    for (var i = 1; i <= merchantList?.totalPage; i++) {
      pageNumbers.push(i);
    }
    if (merchantList?.totalPage > 3) {
    }
    const renderPageNumbers = pageNumbers.map((number) => {
      if (
        number === merchantList?.currentPage - 2 ||
        number === merchantList?.currentPage + 2
      ) {
        return <span>...</span>;
      } else if (
        number < 2 ||
        number === pageNumbers.length ||
        merchantList?.currentPage === number ||
        merchantList?.currentPage === number - 1 ||
        merchantList?.currentPage === number + 1
      ) {
        return (
          <li key={number} onClick={(i) => paginationHander(number)}>
            <a className={merchantList?.currentPage == number ? "active" : ""}>
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
            onClick={() => nextPaginationHander(merchantList.totalPage)}
          >
            <i className="fa fa-angle-right" aria-hidden="true" />
          </a>
        </li>
        <li>
          <a
            className="nxt"
            onClick={() => lastPaginationHander(merchantList.totalPage)}
          >
            <i className="fa fa-angle-double-right" aria-hidden="true" />
          </a>
        </li>
      </ul>
    );
  };

  const renderTableData = () => {
    return (
      !isEmpty(merchantList) &&
      merchantList.data.map((item, index) => {
        const {
          id,
          useremail,
          website,
          companyLogo,
          companyName,
          countryCode,
          phone,
          serviceProvider,
          type,
          subcategory,
          tag,
          createdAt,
          status,
        } = item; //destructuring

        return (
          <tr>
            {/* <td>
          <label className="custom-check">
            <input type="checkbox" />
            <span className="checkmark" />
          </label>
        </td> */}
            <td onClick={() => goToMerchantsDetails(item)}>#{id}</td>
            <td onClick={() => goToMerchantsDetails(item)}>
              <div className="date">
                {moment(createdAt).format("LL")}{" "}
                <span>{moment(createdAt).format("HH:MM A")}</span>{" "}
              </div>
            </td>
            <td onClick={() => goToMerchantsDetails(item)}>
              <div className="sender merch">
                <span className="sender-img">
                  <img src={companyLogo} alt="" />
                </span>
                <span className="sender-txt">{companyName}</span>
              </div>
            </td>
            <td>{website}</td>
            <td>{type}</td>
            <td>Activated</td>
            <td>
              <a
                className={`action-link ${
                  adminPermission.role === "admin" &&
                  adminPermission.permissions[0].merchants.editMerchant ===
                    "view_only"
                    ? "disabled"
                    : ""
                }`}
                onClick={() => editMerchants(id)}
              >
                <i className="icon-icon-edit" />
              </a>
              <a
                className={status === 1 ? "action-link" : "action-link-danger"}
              >
                <i
                  className={`icon-icon-block ${
                    adminPermission.role === "admin" &&
                    adminPermission.permissions[0].merchants.merchantAction ===
                      "view_only"
                      ? "disabled"
                      : ""
                  }`}
                  onClick={() => showMerchantDeactiveModel(item)}
                />
              </a>
            </td>
          </tr>
        );
      })
    );
  };

  const categoryType = () => {
    return (
      !isEmpty(merchantType) &&
      merchantType.data.map((item, index) => {
        return (
          <div className="col-6">
            <label className="custom-check">
              {item.type}
              <input
                type="checkbox"
                name="type"
                value={item.type}
                onChange={(e) => onChangeTypeHandler(e)}
              />
              <span className="checkmark" />
            </label>
          </div>
        );
      })
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
      options.push(+e.target.value);
    } else {
      index = options.indexOf(+e.target.value);
      options.splice(index, 1);
    }

    options.sort();

    setIsStatus(options);
  };

  const applyFilter = (e) => {
    setDesableExport(false);
    setSearchText("");
    e.preventDefault();

    const filter = {
      type: isCatType,
      status: isStatus,
    };

    const formData = {
      page: isCurrentPage,
      sort: isSort,
      filter: filter,
    };
    setIsUserFilter(false);
    dispatch(merchantUserList(formData));
    let a = {
      page: isCurrentPage,
      sort: isSort,
      filter: filter,
      export: true,
    };
    dispatch(merchantUserListExport(a));
  };

  const clearFilter = () => {
    setIsCatType([]);
    setIsStatus([]);
  };
  const sortDonutHander = (e) => {
    setDonutSort(e.currentTarget.value);
  };
  const sortMerchantRevenue = (e) => {
    setSortRevenue(e.currentTarget.value);
  };
  const exportData = () => {
    if (exportDesable) {
      return true;
    } else {
      const data = exportmerchant && exportmerchant?.data;
      const fileName = "download";
      const exportType = exportFromJSON.types.xls;
      exportFromJSON({ data, fileName, exportType });
    }
  };
  return (
    <div>
      <Header />

      {isAddMerchants && (
        <AddMerchantsModel
          isop={true}
          onClick={() => setIsAddMerchants(false)}
        />
      )}

      {isEditMerchants && (
        <EditMerchantsModel
          data={isMerchantType}
          merchantDetail={merchantDetailData}
          onClick={() => merchantEditModal()}
        />
      )}

      {isAddCampaign && (
        <NewAddCampaign onClick={() => setIsAddCampaign(!isAddCampaign)} />
      )}
      {isMerchantDeactive && (
        <MerchantDeactiveModal
          isModalOpen={isMerchantDeactive}
          onClick={() => merchantDeactiveModelClose()}
          isUserData={isUserData}
        />
      )}

      <section className="dash-wrap">
        <div className="sec-block alt first">
          <div className="row modified">
            <div className="col-xl-7 col-lg-6">
              <div className="block-single alt">
                <div className="block-heading">
                  <h2>Merchants by Fees</h2>
                  <div className="custom-select-wrap">
                    <div className="selectImage">
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
                  <ul className="merchant-rev-details forMerchant">
                    {getMerchantByfees &&
                      getMerchantByfees?.result?.map((item, index) => {
                        return (
                          <li>
                            <span className="merchant-img">
                              <img src={item.merchantLogo} alt="" />
                            </span>
                            <div className="graph-sec">
                              <div className="input-bar">
                                <span
                                  className={`merchant-stat ${
                                    index === 0 ? "active" : ""
                                  }`}
                                  style={{
                                    width:
                                      (item.feeAmount /
                                        getMerchantByfees?.result.reduce(
                                          (a, b) => a + b.feeAmount,
                                          0
                                        )) *
                                        100 +
                                      "%",
                                  }}
                                >
                                  <span className="bg"></span>
                                </span>
                              </div>
                              <span className="merchant-val">
                                GH₵ {item.feeAmount}
                              </span>
                            </div>
                          </li>
                        );
                      })}
                    {/* <li>
                      <span className="merchant-img"><img src={merchant1} alt="" /></span>
                      <span className="merchant-stat" style={{ width: '80%' }}>
                        <span className="bg" />
                        <span className="merchant-val">GH₵23.455.00</span>
                      </span>
                    </li>
                    <li>
                      <span className="merchant-img"><img src={merchant2} alt="" /></span>
                      <span className="merchant-stat" style={{ width: '88%' }}>
                        <span className="bg" />
                        <span className="merchant-val">GH₵23.455.00</span>
                      </span>
                    </li>
                    <li>
                      <span className="merchant-img"><img src={merchant3} alt="" /></span>
                      <span className="merchant-stat active" style={{ width: '100%' }}>
                        <span className="bg" />
                        <span className="merchant-val">GH₵23.455.00</span>
                      </span>
                    </li>
                    <li>
                      <span className="merchant-img"><img src={merchant4} alt="" /></span>
                      <span className="merchant-stat" style={{ width: '86%' }}>
                        <span className="bg" />
                        <span className="merchant-val">GH₵23.455.00</span>
                      </span>
                    </li>
                    <li>
                      <span className="merchant-img"><img src={merchant5} alt="" /></span>
                      <span className="merchant-stat" style={{ width: '90%' }}>
                        <span className="bg" />
                        <span className="merchant-val">GH₵23.455.00</span>
                      </span>
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-5 col-lg-6">
              <div className="block-single alt">
                <div className="block-heading">
                  <h2>Merchants by Transactions</h2>
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
                <div className="row modified">
                  <div className="col-lg-5">
                    <div className="merchantTrans-chart">
                      <canvas id="myDoughnutChart" />
                    </div>
                  </div>
                  <div className="col-lg-7">
                    <div className="user-chart-level multiple">
                      <ul>
                        {getMerchantByCount &&
                          getMerchantByCount?.result
                            ?.slice(0, 8)
                            .map((data, index) => (
                              <li>
                                <span
                                  className="chart-level-bg level-payment"
                                  style={{ backgroundColor: colorsCode[index] }}
                                >
                                  {percentArr[index]}%
                                </span>
                                <span className="chart-level-txt">
                                  <img src={data.merchantLogo} alt="" />
                                </span>
                              </li>
                            ))}
                        {/* <li><span className="chart-level-bg lightgreen">36%</span> <span className="chart-level-txt"><img src={merc1} alt="" /></span></li>
                        <li><span className="chart-level-bg purple">14%</span> <span className="chart-level-txt"><img src={merc2} alt="" /></span></li>
                        <li><span className="chart-level-bg yellow">32%</span> <span className="chart-level-txt"><img src={merc3} alt="" /></span></li>
                        <li><span className="chart-level-bg red">12%</span> <span className="chart-level-txt"><img src={merc4} alt="" /></span></li>
                        <li><span className="chart-level-bg green">27%</span> <span className="chart-level-txt"><img src={merc5} alt="" /></span></li>
                        <li><span className="chart-level-bg pink">10%</span> <span className="chart-level-txt"><img src={merc6} /></span></li>
                        <li><span className="chart-level-bg sky">16%</span> <span className="chart-level-txt"><img src={merc7} alt="" /></span></li>
                        <li><span className="chart-level-bg blue">8%</span> <span className="chart-level-txt"><img src={merc8} /></span></li> */}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sec-block alt">
          <div className="block-single auto">
            <div className="block-heading">
              <h2>Merchants</h2>
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
                <a
                  data-toggle="modal"
                  data-target="#addMerchantModal"
                  className={`link mr-4 ${
                    adminPermission.role === "admin" &&
                    adminPermission.permissions[0].merchants.addMerchant ===
                      "view_only"
                      ? "disabled"
                      : ""
                  }`}
                  onClick={() => openAddMerchantsModal()}
                >
                  <img src={add} alt="" /> Add a merchant
                </a>
                {/* <a data-toggle="modal" data-target="#createCampaignModal" className="link green mr-4" onClick={() => setIsAddCampaign(!isAddCampaign)}>Create a new ad campaign</a> */}
                <div className="dropdown inline drop-filter mr-3">
                  <a
                    className="dropdown-toggle link"
                    data-toggle="dropdown"
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
                            <h4>status</h4>
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
                        <div className="col-9">
                          <div className="filter-single">
                            <h4>Type</h4>
                            <div className="row modified">{categoryType()}</div>
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
                  <table className="table theme-table">
                    <tbody>
                      <tr>
                        {/* <th>
                        <label className="custom-check">
                          <input type="checkbox" />
                          <span className="checkmark" />
                        </label>
                      </th> */}
                        <th>Merchant ID</th>
                        <th>Date added</th>
                        <th>Name</th>
                        <th>Website</th>
                        <th>Type</th>
                        <th>Ads</th>
                        <th style={{ width: "120px" }}>Action</th>
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
                  merchantList && merchantList?.totalPage >= 1
                    ? "block"
                    : "none",
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

export default Merchant;
