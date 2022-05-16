import React, { useState } from 'react'
import listing from './../../assets/images/listing-2.png'
import ReactDOM from 'react-dom';
import ActiveRenewCampaign from './ActiveRenewCampaignModal';
import Modal from 'react-modal';




const RenewCampaignModal = (props) => {

  const [isShowRenewActive, setIsShowRenewActive] = useState(false)




  const handleActiveRenewPopup = () => {
    setIsShowRenewActive(!isShowRenewActive)

  }



  return (
    <Modal
      isOpen={props.isModalOpen}
      onRequestClose={() => props.onClick()}
    >
      <div>
        {isShowRenewActive ?
          <ActiveRenewCampaign onClick={() => setIsShowRenewActive(!isShowRenewActive)} removePreviousModal={() => props.onClick()} />
          : (
            <div className="modal_height" id="renewCampaignModal-2" tabIndex={-1} aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered common-modal">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Renew an ad campaign</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => handleActiveRenewPopup()}>
                      <i className="icon-icon-close2" />
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Merchant</label>
                        <div className="custom-select-wrap full large alltime_maincontainer">
                          <select className="custom-select merchant_select" name="state">
                            <option>Choose a merchant</option>
                            <option>Choose a merchant - 2</option>
                            <option>Choose a merchant - 3</option>
                            <option>Choose a merchant - 4</option>
                            <option>Choose a merchant - 5</option>
                            <option>Choose a merchant - 6</option>
                          </select>
                          <i class="fa fa-angle-down"></i>
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor>Upload the image for the ad</label>
                        <div className="row modified">
                          <div className="col-sm-4">
                            <div className="photoView act">
                              <div className="photoView-cont">
                                <img src={listing} alt="" />
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-8">
                            <div className="uploadBtn-wrap">
                              <div className="uploadBtn">
                                <button className="btn grey-btn sm-btn" type="button"><i className="icon-icon-edit" /> Edit</button>
                                <input type="file" />
                              </div>
                              <span>or drag it in</span>
                              <p>Supported formats are JPEG, SVG <br /> or PNG. Max file size is 5 MB.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row modified">
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Text description</label>
                            <input type="text" className="form-control" />
                          </div>
                        </div>
                      </div>
                      <div className>
                        <div className="form-group">
                          <label htmlFor>Duration</label>
                          <label className="custom-radio">Open-ended
                      <input type="radio" name="radio-2" className="no" />
                            <span className="checkmark" />
                          </label>
                          <label className="custom-radio">Select end date
                      <input type="radio" name="radio-2" className="yes" />
                            <span className="checkmark" />
                          </label>
                        </div>
                        <div className="cons">
                          <div className="row modified">
                            <div className="col-sm-6">
                              <div className="form-group">
                                <div className="inpIcon">
                                  <input className="form-control" data-provide="datepicker" />
                                  <i className="fa fa-calendar-o" aria-hidden="true" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className>
                        <div className="form-group">
                          <label htmlFor>Link</label>
                          <label className="custom-radio">Payment screen
                      <input type="radio" name="radio-3" className="no" />
                            <span className="checkmark" />
                          </label>
                          <label className="custom-radio">Custom URL
                      <input type="radio" name="radio-3" className="yes" />
                            <span className="checkmark" />
                          </label>
                        </div>
                        <div className="cons">
                          <div className="row modified">
                            <div className="col-sm-6">
                              <div className="form-group">
                                <input type="text" className="form-control" placeholder="Add Custom URL" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <input data-dismiss="modal" data-toggle="modal" data-target="#renewConfirmModal" className="btn btn-block green-btn" type="Activate" name defaultValue="Activate" onClick={() => setIsShowRenewActive(!isShowRenewActive)} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          )}
      </div>
    </ Modal>
  )
}

export default RenewCampaignModal