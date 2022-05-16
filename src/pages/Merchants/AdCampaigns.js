import React, { useEffect, useState } from 'react'
import arrowLeft from './../../assets/images/ar-left.svg'
import { useHistory } from "react-router-dom";
import listing3 from './../../assets/images/listing-3.png'
import listing4 from './../../assets/images/listing-4.png'
import listing5 from './../../assets/images/listing-5.png'
import listing2 from './../../assets/images/listing-2.png'
import Chart from "chart.js";
import CampaignsDetailsModal from './AdCampaignsDetailsModal';
import RenewCampaignModal from './RenewCampaignModal';
import Header from '../../component/Header';

const AdCampaigns = () => {
  let history = useHistory();

  const [isShowCampaignsDetails, setIsShowCampaignsDetails] = useState(false);
  const [isShowRenewCampaign, setIsShowRenNewCampaigns] = useState(false);

  useEffect(() => {
    barChart()
    barChart1()
  }, [])


  const campaignsDetailsModalClose = () => {
    setIsShowCampaignsDetails(false)
  }

  const renewCampaignModalClose = () => {
    setIsShowRenNewCampaigns(false)
  }



  const barChart = () => {
    var ctx2 = document.getElementById('myChart2').getContext('2d');

    var myChart2 = new Chart(ctx2, {
      type: 'bar',
      fillOpacity: .8,
      data: {
        labels: ['04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17'],
        datasets: [
          {
            label: "Clicks",
            backgroundColor: '#38B635',
            borderColor: "#38B635",
            pointBorderColor: "#38B635",
            borderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 4,
            pointBackgroundColor: "#FFF",
            data: [100, 80, 180, 300, 60, 200, 100, 80, 180, 300, 60, 200, 100, 80]
          },
          {
            label: "Views",
            backgroundColor: '#CFEECE',
            borderColor: "#CFEECE",
            pointBorderColor: "#CFEECE",
            borderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 4,
            pointBackgroundColor: "#FFF",
            data: [60, 100, 150, 200, 150, 80, 60, 100, 150, 200, 150, 80, 60, 100]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        bezierCurve: false,
        elements: {
          line: {
            tension: 0
          }
        },
        scales: {
          xAxes: [{
            gridLines: { color: "rgba(0, 0, 0, 0)" }
          }],
          yAxes: [{
            ticks: { beginAtZero: true },
            gridLines: { color: "rgba(244, 244, 244, 1)" }
          }]
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
              return "$" + tooltipItem.yLabel;
            },
            // remove title
            title: function (tooltipItem, data) {
              return;
            }
          },
          backgroundColor: "#FFF",
          borderColor: "rgba(0, 0, 0, 0.09)",
          borderWidth: 1,
          bodyFontColor: "rgba(0, 0, 0, 1)",
          bodyAlign: 'center',
          bodyFontSize: 14,
          bodyFontStyle: 500
        },
        legend: {
          align: 'end',
          labels: {
            boxWidth: 12,
            fontColor: "#A4A7B0"
          }
        }
      }
    });

  }
  const barChart1 = () => {

    var ctx3 = document.getElementById('myDoughnutChart').getContext('2d');
    var myDoughnutChart = new Chart(ctx3, {
      type: 'doughnut',
      data: {
        labels: ['Shopping', 'Payment for Bills', 'Food', 'School Fees', 'Travel', 'Other'],
        datasets: [
          {
            data: [25, 20, 15, 10, 5, 3],
            backgroundColor: [
              '#1C932F',
              '#4EA5F6',
              '#F75009',
              '#59E827',
              '#F79809',
              '#7C27E8'
            ],
            borderColor: [
              '#1C932F',
              '#4EA5F6',
              '#F75009',
              '#59E827',
              '#F79809',
              '#7C27E8'
            ],
          },
        ]
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
          backgroundColor: "#FFF",
          borderColor: "rgba(0, 0, 0, 0.09)",
          borderWidth: 1,
          bodyFontColor: "rgba(0, 0, 0, 1)",
          bodyAlign: 'center',
          bodyFontSize: 14,
          bodyFontStyle: 500
        },
        legend: {
          align: 'center',
          position: 'right',
          display: false,
          labels: {
            boxWidth: 42,
            padding: 15,
            fontColor: "#373737"
          }
        }
      }
    });
  }

  const goToBack = () => {
    history.goBack()
  }





  return (
    <div>
      <Header />

      <CampaignsDetailsModal isModalOpen={isShowCampaignsDetails} onClick={() => campaignsDetailsModalClose()} />

      <RenewCampaignModal isModalOpen={isShowRenewCampaign} onClick={() => renewCampaignModalClose()} />


      <section className="dash-wrap alt top_margindiv">
        <div className="dashTop">
          <a href className="dashLink"> <img src={arrowLeft} alt="" onClick={() => goToBack()} /> </a>
          <span className="dashTitle">EgyptAir Ad Campaigns</span>
          <a className="btn sm-btn white-btn abs-right" href="#">Create a new ad campaign</a>
        </div>
        <div className="sec-block alt">
          <div className="row modified">
            <div className="col-xl-7 col-lg-6">
              <div className="block-single alt">
                <div className="block-heading">
                  <h2>Ad Clicks vs Ad Views</h2>
                  <div className="link-all">
                    <a href="#" className="mr-3">Last week</a>
                    <a className="active mr-3" href="#">2 weeks</a>
                    <a href="#" className="mr-3">This month</a>
                    <a href="#" className="mr-3">Last month</a>
                    <a href="#">6 months</a>
                  </div>
                </div>
                <div className="click-chart">
                  <canvas id="myChart2" />
                </div>
              </div>
            </div>
            <div className="col-xl-5 col-lg-6">
              <div className="block-single alt">
                <div className="block-heading">
                  <h2>Transactions by Type</h2>
                  <div className="custom-select-wrap">
                    <div className="selectImage">
                      <select className="custom-select" name="state">
                        <option>6 Months</option>
                        <option>12 Months</option>
                        <option>18 Months</option>
                        <option>24 Months</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="user-chart forTrans">
                  <canvas id="myDoughnutChart" />
                  <div className="user-chart-count">
                    <h3>67,734</h3>
                    <p>overall users</p>
                  </div>
                  <div className="user-chart-level">
                    <ul>
                      <li><span className="chart-level-bg level-shop">25%</span> <span className="chart-level-txt">Vodafone</span></li>
                      <li><span className="chart-level-bg level-payment">20%</span> <span className="chart-level-txt">MTN Ghana</span></li>
                      <li><span className="chart-level-bg level-food">15%</span> <span className="chart-level-txt">Tigo Ghana</span></li>
                      <li><span className="chart-level-bg level-school">10%</span> <span className="chart-level-txt">Expresso</span></li>
                      <li><span className="chart-level-bg level-travel">5%</span> <span className="chart-level-txt">Airtel Ghana</span></li>
                      <li><span className="chart-level-bg level-other">3%</span> <span className="chart-level-txt">Glo Mobile</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="addListings">
          <ul>
            <li>
              <div className="addListings-single">
                <div className="addListings-image">
                  <img src={listing2} alt="" onClick={() => setIsShowCampaignsDetails(!isShowCampaignsDetails)} />
                  <span className="addStat">Active</span>
                </div>
                <div className="addListings-cont">
                  <h2>Celebrating 85 years of success</h2>
                  <p>till 23 Sep, 2020</p>
                  <div className="addListings-act">
                    <a data-toggle="modal" data-target="#adCampaignDetails" href="#"><i className="icon-icon-edit" /></a>
                    <a href="#"><i className="icon-icon-block" /></a>
                    <a href="#"><i className="icon-icon-delete" /></a>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="addListings-single">
                <div className="addListings-image">
                  <img src={listing2} alt="" onClick={() => setIsShowCampaignsDetails(!isShowCampaignsDetails)} />
                </div>
                <div className="addListings-cont">
                  <h2>Celebrating 85 years of success</h2>
                  <p>till 23 Sep, 2020</p>
                  <div className="addListings-act">
                    <a data-toggle="modal" data-target="#renewCampaignModal-2" onClick={() => setIsShowRenNewCampaigns(!isShowRenewCampaign)}><i className="icon-icon-refund3" /></a>
                    <a href="#"><i className="icon-icon-delete" /></a>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="addListings-single">
                <div className="addListings-image">
                  <img src={listing3} alt="" onClick={() => setIsShowCampaignsDetails(!isShowCampaignsDetails)} />
                </div>
                <div className="addListings-cont">
                  <h2>Celebrating 85 years of success</h2>
                  <p>till 23 Sep, 2020</p>
                  <div className="addListings-act">
                    <a data-toggle="modal" data-target="#renewCampaignModal-2" onClick={() => setIsShowRenNewCampaigns(!isShowRenewCampaign)}><i className="icon-icon-refund3" /></a>
                    <a href="#"><i className="icon-icon-delete" /></a>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="addListings-single">
                <div className="addListings-image">
                  <img src={listing4} alt="" onClick={() => setIsShowCampaignsDetails(!isShowCampaignsDetails)} />
                </div>
                <div className="addListings-cont">
                  <h2>Celebrating 85 years of success</h2>
                  <p>till 23 Sep, 2020</p>
                  <div className="addListings-act">
                    <a data-toggle="modal" data-target="#renewCampaignModal-2" onClick={() => setIsShowRenNewCampaigns(!isShowRenewCampaign)}><i className="icon-icon-refund3" /></a>
                    <a href="#"><i className="icon-icon-delete" /></a>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="addListings-single">
                <div className="addListings-image">
                  <img src={listing5} alt="" onClick={() => setIsShowCampaignsDetails(!isShowCampaignsDetails)} />
                </div>
                <div className="addListings-cont">
                  <h2>Celebrating 85 years of success</h2>
                  <p>till 23 Sep, 2020</p>
                  <div className="addListings-act">
                    <a data-toggle="modal" data-target="#renewCampaignModal-2" onClick={() => setIsShowRenNewCampaigns(!isShowRenewCampaign)}><i className="icon-icon-refund3" /></a>
                    <a href="#"><i className="icon-icon-delete" /></a>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>
      }
    </div >

  )
}

export default AdCampaigns;