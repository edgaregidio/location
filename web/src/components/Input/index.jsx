import React from 'react'
import './styles.css'

export default function Input(props) {
  return (
    <section className="content-input">
      <label>{props.label}</label>
      <input
        name={props.name}
        value={props.value}
        onChange={e => {
          props.onChange(prev => ({ ...prev, [props.name]: e.target.value }))
        }}
        className="input-styled"
        type={props.type}
      />
    </section>
  )
}
