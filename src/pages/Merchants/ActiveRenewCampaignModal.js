import React from 'react'
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import listing from './../../assets/images/listing-2.png'

const RenewConfirmModal = (props) => {

  const handleModal = () => {
    props.removePreviousModal();
    props.onClick()
  }



  return (
    < Modal
      isOpen={true}
    >
      <div className="" id="renewConfirmModal" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered common-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Renew an ad campaign</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => handleModal()}>
                <i className="icon-icon-close2" />
              </button>
            </div>
            <div className="modal-body">
              <div className="renew-cont">
                <h2>Are you sure you want to renew “EgyptAir: Keep it touch with the world” ad campaign? </h2>
                <p>Only 1 ad campaign can be active for a specific merchant. “Celebrating 85 years of success” ad campaign has been already activated.</p>
                <div className="renew-cont-img">
                  <span className="renewImg"><img src={listing} alt="" /></span>
                  <span className="renewTxt">EgyptAir: Keep it touch with the world</span>
                </div>
                <div className="row modified">
                  <div className="col-sm-6">
                    <input className="btn btn-block green-btn" type="Yes, activate" name defaultValue="Yes, activate" />
                  </div>
                  <div className="col-sm-6">
                    <input data-dismiss="modal" className="btn btn-block grey-btn cancel_btn" type="Cancel" name defaultValue="Cancel" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </Modal>
  )
}

export default RenewConfirmModal