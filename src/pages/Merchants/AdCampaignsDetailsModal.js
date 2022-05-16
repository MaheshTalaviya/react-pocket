import React, { useState } from "react";
import Modal from 'react-modal';
import Listing from '../../assets/images/listing-1.png'
import EgyptAir from '../../assets/images/egypt.png'
import CampaignsEditModal from './AdCampaignsEditModal';


const AdCampaignDetails = (props) => {
  const [isShowEditCampaigns, setIsShowEditCampaigns] = useState(false);


  return (

    <Modal
      isOpen={props.isModalOpen}
      onRequestClose={() => props.onClick()}
    >
      <div>
        {isShowEditCampaigns ?
          <CampaignsEditModal onClick={() => setIsShowEditCampaigns(!isShowEditCampaigns)} removePreviousModal={() => props.onClick()} />
          : (
            <div
              className=""
              id="adCampaignDetails"
              tabIndex={-1}
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered common-modal">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Ad campaign details
              </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={() => props.onClick()}
                    >
                      <i className="icon-icon-close2" />
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="trans-details">
                      <div className="row modified">
                        <div className="col-sm-9">
                          <div className="trans-details-left">
                            <div className="row modified">
                              <div className="renew-cont-img alt">
                                <span className="renewImg">
                                  <img src={Listing} alt="" />
                                </span>
                                <span className="renewTxt">
                                  EgyptAir: Keep it touch with the world
                            <small>Active</small>
                                </span>
                              </div>
                              <div className="col-sm-6 tarnsDetails">
                                <span className="popTitle">Merchant</span>
                                <span className="popDesc">
                                  <img
                                    className="merchtImg"
                                    src={EgyptAir}
                                    alt=""
                                  />
                                  <strong>EgyptAir</strong>
                                </span>
                              </div>
                              <div className="col-sm-6 tarnsDetails">
                                <span className="popTitle">Duration</span>
                                <span className="popDesc">till 23 Sep, 2020 </span>
                              </div>
                              <div className="col-sm-6 tarnsDetails">
                                <span className="popTitle">Ad views</span>
                                <span className="popDesc">42.452</span>
                              </div>
                              <div className="col-sm-6 tarnsDetails">
                                <span className="popTitle">Ad clicks</span>
                                <span className="popDesc">30.513</span>
                              </div>
                              <div className="col-sm-6 tarnsDetails">
                                <span className="popTitle">Custom URL</span>
                                <span className="popDesc">
                                  https://egyptair.com/bestdeals
                          </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-3">
                          <div className="trans-details-right">
                            <ul className="transLink">
                              <li>
                                <a
                                  className="text-left"
                                  data-dismiss="modal"
                                  data-toggle="modal"
                                  data-target="#renewCampaignModal"

                                  onClick={() => setIsShowEditCampaigns(!isShowEditCampaigns)}

                                >
                                  <i className="icon-icon-edit" /> Edit
                          </a>
                              </li>
                              <li>
                                <a className="text-left" href="/#">
                                  <i className="icon-icon-block" /> Deactivate
                          </a>
                              </li>
                              <li>
                                <a className="text-left" href="/#">
                                  <i className="icon-icon-delete" /> Delete
                          </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>

    </Modal>


  );
};
export default AdCampaignDetails;