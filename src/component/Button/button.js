import React from 'react'
import './Button.css'


const Button = (props) => {
  return (
    <div className="form-group">
      <button type="submit" onClick={() => props.onClick()} className={props.className || 'btn btn-orange'}>{props.title || 'Submit'}</button>
    </div>
  )
}
export default Button