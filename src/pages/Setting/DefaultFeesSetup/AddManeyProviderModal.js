import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import upload from './../../../assets/images/upload-2.png'
import { useDispatch, useSelector, } from 'react-redux'
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";
import {countryList } from '../../../redux/action/SettingAction/SettingAction'
import { isEmpty } from 'lodash';

const AddManeyProviderModal = (props) => {


  let history = useHistory();
  const dispatch = useDispatch();
  
  const countryData = useSelector(state => state.settingData.getCountryData)

  useEffect(() => {
    dispatch(countryList())
  },[])

  


  return (

    <Modal
      isOpen={props.isModalOpen}
      onRequestClose={() => props.onClick()}
    >
      <div>
        <div className="" id="blockModal" tabIndex={-1} aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered common-modal size-3">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Mobile Money Providers </h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => props.onClick()}>
                  <i className="icon-icon-close2" />
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Provider Country</label>
                    <div className="custom-select-wrap full large">
                    <select className="form-control" name="state" >
                        <option data-select2-id="select2-data-3-aiye">Choose country</option>
                     {!isEmpty(countryData)&&  countryData.data.map((item, key)=>
                        <option value={item.id}>{item.name}</option>
                     ) 
                    }
                    </select>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Provider Name</label>
                    <input type="text" defaultValue="GH₵ 200" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor>Upload the image for the ad</label>
                    <div className="row modified">
                    <div className="col-sm-4">
                        <div className="photoView sm">
                        <div className="photoView-cont">
                            <img src={upload} alt />
                        </div>
                        </div>
                    </div>
                    <div className="col-sm-8">
                        <div className="uploadBtn-wrap">
                        <div className="uploadBtn">
                            <button 
                                className="btn grey-btn sm-btn" 
                                type="button">
                                <i className="icon-icon-upload" /> 
                                Upload
                            </button>
                            <input type="file"/>
                        </div>
                        <span>or drag it in</span>
                        <p>Supported formats are JPEG, SVG <br /> or PNG. Max file size is 5 MB.</p>
                        </div>
                    </div>
                    </div>
                </div>
                <input className="btn btn-block green-btn mt-4" type="submit" name defaultValue="Save" />
                </div>

            </div>
          </div>
        </div>

      </div>

    </Modal>

  );
}

export default AddManeyProviderModal;