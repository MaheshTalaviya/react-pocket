import React from "react";
import Listing from '../../assets/images/listing-1.png'
import Modal from 'react-modal';



const EditAdCampaign = (props) => {

  const handleModal = () => {
    props.removePreviousModal();
    props.onClick()
  }


  return (
    < Modal
      isOpen={true}
    >

      <div>
        <div
          className="modal_height"
          id="renewCampaignModal"
          tabIndex={-1}
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered common-modal">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Edit an ad campaign
              </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => handleModal()}
                >
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
                            <img src={Listing} alt="" />
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-8">
                        <div className="uploadBtn-wrap">
                          <div className="uploadBtn">
                            <button className="btn grey-btn sm-btn" type="button">
                              <i className="icon-icon-edit" /> Edit
                          </button>
                            <input type="file" />
                          </div>
                          <span>or drag it in</span>
                          <p>
                            Supported formats are JPEG, SVG <br /> or PNG. Max
                          file size is 5 MB.
                        </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row modified">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">
                          Text description
                      </label>
                        <input type="text" className="form-control" placeholder="Celebrating 85 years of success" />
                      </div>
                    </div>
                  </div>
                  <div className>
                    <div className="form-group">
                      <label htmlFor>Duration</label>
                      <label className="custom-radio">
                        Open-ended
                      <input type="radio" name="radio-2" className="no" />
                        <span className="checkmark" />
                      </label>
                      <label className="custom-radio">
                        Select end date
                      <input type="radio" name="radio-2" className="yes" />
                        <span className="checkmark" />
                      </label>
                    </div>
                    <div className="cons">
                      <div className="row modified">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <div className="inpIcon">
                              <input
                                className="form-control"
                                data-provide="datepicker"
                              />
                              <i
                                className="fa fa-calendar-o"
                                aria-hidden="true"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className>
                    <div className="form-group">
                      <label htmlFor>Link</label>
                      <label className="custom-radio">
                        Payment screen
                      <input type="radio" name="radio-3" className="no" />
                        <span className="checkmark" />
                      </label>
                      <label className="custom-radio">
                        Custom URL
                      <input type="radio" name="radio-3" className="yes" />
                        <span className="checkmark" />
                      </label>
                    </div>
                    <div className="">
                      {/* className="cons" */}
                      <div className="row modified">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Add Custom URL"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <input
                    data-toggle="modal"
                    className="btn btn-block green-btn"
                    type="submit"
                    name
                    defaultValue="save"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditAdCampaign;