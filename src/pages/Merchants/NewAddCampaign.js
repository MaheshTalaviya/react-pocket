


import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import upload from './../../assets/images/upload.png'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


const AddCampaignModel = (props) => {
  const [date, setDate] = useState(new Date());
  const [showCalender, setShowCalender] = useState(false)
  return (
    < Modal
      isOpen={true}
    >
      <div>

        <div className="modal_height" id="addMerchantModal" tabIndex={-1} >
          <div className="modal-dialog modal-dialog-centered common-modal">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Create a new ad campaign</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => props.onClick()}>
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
                        <div className="photoView">
                          <div className="photoView-cont">
                            <img src={upload} alt="" />
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-8">
                        <div className="uploadBtn-wrap">
                          <div className="uploadBtn">
                            <button className="btn grey-btn sm-btn" type="button"><i className="icon-icon-upload" /> Upload</button>
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
                      <label className="custom-radio"
                        onChange={() => setShowCalender(false)}
                      >Open-ended
                      <input type="radio" name="radio-2" className="no" />
                        <span className="checkmark" />
                      </label>
                      <label className="custom-radio">Select end date
                      <input type="radio" name="radio-2" className="yes"
                          onChange={() => setShowCalender(true)}
                        />
                        <span className="checkmark" />
                      </label>
                    </div>


                    {/*calender*/}
                    {
                      showCalender &&
                      <div>
                        <div className="row modified">
                          <div className="col-sm-6">
                            <div className="form-group">
                              <div className="inpIcon">
                                <input className="form-control" data-provide="datepicker"
                                  value={`${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} ,${date.getFullYear() + 1}`}
                                />
                                <i className="fa fa-calendar-o" aria-hidden="true" />
                              </div>
                              <Calendar
                                onChange={setDate}
                                value={date}
                                next2Label={null}
                                prev2Label={null}
                              />
                            </div>
                          </div>
                        </div>
                      </div>



                    }


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
                  <input className="btn btn-block green-btn" type="Activate" name defaultValue="Activate" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>

  );
}

export default AddCampaignModel;














