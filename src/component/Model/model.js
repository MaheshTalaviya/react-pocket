import React from 'react'
import './model.css'


const Model = (props) => {
  return (
    <div className="form-group">
      <button type="submit" onClick={() => props.onClick()} className={props.className || 'btn btn-orange'}>{props.title || 'Submit'}</button>
    </div>
  )
}
export default Model