import React from 'react'



const TranstionFilter = (props) => {

  return (
    <div className="filter_dropdiv">
      <div className="dropdown inline drop-filter">

        <div className="dropdown-menu">
          <a className="clear-filter" href="#">Clear all</a>
          <div className="row modified">
            <div className="col-4">
              <div className="filter-single">
                <h4>By status</h4>
                <label className="custom-check">Pending
                    <input type="checkbox" />
                  <span className="checkmark" />
                </label>
                <label className="custom-check">Completed
                    <input type="checkbox" />
                  <span className="checkmark" />
                </label>
                <label className="custom-check">Canceled
                    <input type="checkbox" />
                  <span className="checkmark" />
                </label>
              </div>
            </div>
            <div className="col-7">
              <div className="filter-single">
                <h4>By transaction type</h4>
                <div className="row modified">
                  <div className="col-6">
                    <label className="custom-check">School Fees
                        <input type="checkbox" />
                      <span className="checkmark" />
                    </label>
                    <label className="custom-check">Bills
                        <input type="checkbox" />
                      <span className="checkmark" />
                    </label>
                    <label className="custom-check">Food
                        <input type="checkbox" />
                      <span className="checkmark" />
                    </label>
                    <label className="custom-check">Recharge
                        <input type="checkbox" />
                      <span className="checkmark" />
                    </label>
                  </div>
                  <div className="col-6">
                    <label className="custom-check">Travel
                        <input type="checkbox" />
                      <span className="checkmark" />
                    </label>
                    <label className="custom-check">Shopping
                        <input type="checkbox" />
                      <span className="checkmark" />
                    </label>
                    <label className="custom-check">Movies
                        <input type="checkbox" />
                      <span className="checkmark" />
                    </label>
                    <label className="custom-check">Others
                        <input type="checkbox" />
                      <span className="checkmark" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row modified">
            <div className="col-4">
              <div className="filter-single">
                <h4>By method</h4>
                <label className="custom-check">Payment
                    <input type="checkbox" />
                  <span className="checkmark" />
                </label>
                <label className="custom-check">Request
                    <input type="checkbox" />
                  <span className="checkmark" />
                </label>
              </div>
            </div>
            <div className="col-7">
              <div className="filter-single">
                <h4>Sort by</h4>
                <label className="custom-check">Most recent
                    <input type="checkbox" />
                  <span className="checkmark" />
                </label>
                <label className="custom-check">Amount: from low to high
                    <input type="checkbox" />
                  <span className="checkmark" />
                </label>
                <label className="custom-check">Amount: from high to low
                    <input type="checkbox" />
                  <span className="checkmark" />
                </label>
              </div>
            </div>
          </div>
          <input className="btn btn-block green-btn" type="Apply" name defaultValue="Apply" onClick={() => props.onClick()} />
        </div>
      </div>
    </div>
  )
}

export default TranstionFilter 