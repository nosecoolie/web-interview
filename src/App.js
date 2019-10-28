import React, { Component } from 'react'

import logo from './logo.png'
import { API_ENDPOINT } from './config'

import AppointmentForm from './components/AppointmentForm'

import './App.scss'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userId: 1,
      selectedAppointmentType: 'gp',
      availableSlots: [],
    }
  }

  componentDidMount() {
    // document
    //   .querySelectorAll('button')
    //   .querySelectorAll('[id=GP-button]')
    //   .attachEventHandler('click', this.onClick)
    // fetch(`${API_ENDPOINT}/availableSlots`)
    //   .then(res => res.json())
    //   .then(json => {
    //     this.setState({ availableSlots: json })
    //   })
    //   .catch(() => {
    //     // TODO: Handle error here
    //   })
  }

  // onClick() {
  //   this.setState({ selectedAppointmentType: 'gp' })
  // }

  render() {
    // calculate matching slots
    let slots = []
    for (let i = 0; i < this.state.availableSlots.length; i++) {
      for (
        let j = 0;
        j < this.state.availableSlots[i]['consultantType'].length;
        j++
      ) {
        if (
          this.state.availableSlots[j]['consultantType'][i] ===
          this.state.selectedAppointmentType
        ) {
          slots.push(this.state.availableSlots[j])
        }
      }
    }

    return (
      <div className="app">
        <div className="app-header">
          <img src={logo} className="app-logo" alt="Babylon Health" />
        </div>
        <h2 className="h6">New appointment</h2>
        <AppointmentForm />
      </div>
    )
  }
}

export default App
