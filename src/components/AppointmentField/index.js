import React from 'react'
import PropTypes from 'prop-types'

import { ISO8601Regex } from '../../helper'

import './AppointmentField.scss'

function AppointmentField({ options, title, stateHandler, currentOption }) {
  return (
    <div className="appointment-field">
      <h4>{title}</h4>
      <div className="appointment-field__options">
        {options.length > 0 ? (
          options.map(option => (
            <div
              key={option}
              className={`appointment-field__option${
                currentOption === option
                  ? ' appointment-field__option--active'
                  : ''
              }`}
              onClick={() => stateHandler(option)}
            >
              {ISO8601Regex.test(option)
                ? option.substring(0, 16).replace('T', ' ')
                : option}
            </div>
          ))
        ) : (
          <div>Sorry, we don&apos;t have suitable option.</div>
        )}
      </div>
    </div>
  )
}

AppointmentField.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  stateHandler: PropTypes.func.isRequired,
  currentOption: PropTypes.string,
}

export default AppointmentField
