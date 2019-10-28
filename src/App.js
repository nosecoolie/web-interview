import React, { Component } from 'react'

import logo from './logo.png'

import AppointmentForm from './components/AppointmentForm'

import './App.scss'

class App extends Component {
  render() {
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
