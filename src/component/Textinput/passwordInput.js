import React from 'react'

const TextPassInput = ({ label, onChange, type, changeType }) => {
  return (
    <div className="form-group">
      <label for="exampleInputEmail1">{label}</label>
      <div className="inpWrap">
        <input onChange={(e) => onChange(e.target.value)} type={type} className="form-control" />
        <div className="form-icon" onClick={changeType}><i class="fa fa-eye-slash" aria-hidden="true"></i></div>
      </div>
    </div>
  )
}
export default TextPassInput

