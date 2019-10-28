import React, { useEffect, useState } from 'react'

import { fetchData, postAppointments } from '../../helper'
import { CONSULTANT_TYPES, APPOINTMENT_TYPES } from '../../config'

import AppointmentField from '../AppointmentField'

import './AppointmentForm.scss'
// TODO: const user ID for now
const USER_ID = 1

function AppointmentForm(props) {
  const [formState, setFormState] = useState({
    user: null,
    availableSlots: null,
    isLoading: true,
    submitted: false,
    consultantType: CONSULTANT_TYPES[0],
    displayDateTime: [],
    chosenDateTime: null,
    appointmentType: APPOINTMENT_TYPES[0],
    notes: '',
  })
  useEffect(() => {
    setFormState(prevState => ({ ...prevState, isLoading: true }))
    fetchData([`users/${USER_ID}`, 'availableSlots']).then(res => {
      const [user, availableSlots] = res
      setFormState(prevState => ({
        ...prevState,
        ...{ user, availableSlots, isLoading: false },
      }))
    })
  }, [])
  useEffect(() => {
    if (formState.availableSlots) {
      const displayDateTime = formState.availableSlots
        .filter(
          slot =>
            slot.appointmentType.includes(
              formState.appointmentType.toLowerCase()
            ) &&
            slot.consultantType.includes(formState.consultantType.toLowerCase())
        )
        .map(dateTime => dateTime.time)
      setFormState(prevState => ({ ...prevState, displayDateTime }))
    }
  }, [
    formState.consultantType,
    formState.appointmentType,
    formState.availableSlots,
  ])

  const submitHandler = () => {
    const { consultantType, chosenDateTime, notes } = formState
    setFormState(prevState => ({ ...prevState, isLoading: true }))
    return postAppointments({
      userId: USER_ID,
      dateTime: chosenDateTime,
      notes,
      type: consultantType,
    }).then(() => {
      return setFormState(prevState => ({
        ...prevState,
        ...{ isLoading: false, submitted: true },
      }))
    })
  }

  const AppointmentFormViewGenerator = () => {
    const {
      isLoading,
      submitted,
      user,
      consultantType,
      appointmentType,
      displayDateTime,
      chosenDateTime,
      notes,
    } = formState
    if (isLoading) return <div>Loading...</div>
    if (submitted) return <div>Your appointment just submitted</div>
    return (
      <>
        <div className="user">
          <img className="user__avatar" src={user.avatar} alt="user" />
          <div className="user__name">{`${user.firstName} ${user.lastName}`}</div>
        </div>
        <div className="appointment__form">
          <div className="appointment__fields">
            <AppointmentField
              title="Consultant Type"
              options={CONSULTANT_TYPES}
              currentOption={consultantType}
              stateHandler={value =>
                setFormState(prevState => ({
                  ...prevState,
                  ...{ consultantType: value, chosenDateTime: null },
                }))
              }
            />
            <AppointmentField
              title="Date & Time"
              options={displayDateTime}
              currentOption={chosenDateTime}
              stateHandler={value =>
                setFormState(prevState => ({
                  ...prevState,
                  chosenDateTime: value,
                }))
              }
            />
            <AppointmentField
              title="Appointment Type"
              options={APPOINTMENT_TYPES}
              currentOption={appointmentType}
              stateHandler={value =>
                setFormState(prevState => ({
                  ...prevState,
                  ...{ appointmentType: value, chosenDateTime: null },
                }))
              }
            />
            <div className="appointment-field">
              <h4>Notes</h4>
              <textarea
                placeholder="Describe your symptoms"
                value={notes}
                onChange={e => {
                  const value = e.target.value
                  return setFormState(prevState => ({
                    ...prevState,
                    notes: value,
                  }))
                }}
              />
            </div>
          </div>
          <button
            className={`appointment__button${
              chosenDateTime ? '' : ' appointment__button--disable'
            }`}
            onClick={chosenDateTime ? submitHandler : () => {}}
          >
            Book
          </button>
        </div>
      </>
    )
  }

  return <div className="appointment">{AppointmentFormViewGenerator()}</div>
}

export default AppointmentForm
