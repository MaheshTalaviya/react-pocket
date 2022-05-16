import React from 'react'

const TextInput = ({ label, onChange }) => {
  return (
    <div className="form-group">
      <label for="exampleInputEmail1">{label}</label>
      <input onChange={(e) => onChange(e.target.value)} type="email" className="form-control" />
    </div>
  )
}
export default TextInput
