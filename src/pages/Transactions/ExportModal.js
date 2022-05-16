import React, { Fragment } from 'react';
import circletick from './../../assets/images/circle-tick.png';
import file1 from './../../assets/images/file-1.svg';
import file2 from './../../assets/images/file-2.svg';
import file3 from './../../assets/images/file-3.svg';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

const ExportModal = (props) => {

  return (
    <Modal
      isOpen={props.isModalOpen}
      onRequestClose={() => props.onClick()}
    >
      <div>

        <div className="" id="exportModal" tabIndex={-1} aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered common-modal exportModal">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Export</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"
                  onClick={() => props.onClick()} >
                  <i className="icon-icon-close2" />
                </button>
              </div>
              <div className="modal-body">
                <div className="select-box-wrap">
                  <div className="row modified">
                    <div className="col-sm-4">
                      <div className="select-box active">
                        <div className="select-box-left">
                          <img src={file1} alt="file1" />
                          <p>Excel</p>
                          <div className="circle-tick">
                            <img src={circletick} alt="circletick" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="select-box">
                        <div className="select-box-left">
                          <img src={file2} alt="file2" />
                          <p>CSV</p>
                          <div className="circle-tick">
                            <img src={circletick} alt="circletick" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className="select-box">
                        <div className="select-box-left">
                          <img src={file3} alt="file3" />
                          <p>PDF</p>
                          <div className="circle-tick">
                            <img src={circletick} alt="circletick" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <input className="btn btn-block green-btn" type="submit" name defaultValue="Continue to export 342 listings" />
              </div>
            </div>
          </div>
        </div>
      </div>

    </Modal>

  )
}

export default ExportModal