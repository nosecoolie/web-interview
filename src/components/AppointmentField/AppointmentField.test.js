import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import AppointmentField from './index'

test('AppointmentField should show options with active status and title and handle the callback', () => {
  const TEST_OPTIONS = ['option1', 'option2', 'option3']
  const TEST_TITLE = 'Test_Title'
  const CURRENT_OPTION = 'option3'
  const mockStateHandler = jest.fn()
  const { getAllByText, queryByText } = render(
    <AppointmentField
      options={TEST_OPTIONS}
      currentOption={CURRENT_OPTION}
      title={TEST_TITLE}
      stateHandler={mockStateHandler}
    />
  )
  const options = getAllByText(/option/)
  const currentOption = queryByText(CURRENT_OPTION)
  const title = queryByText(TEST_TITLE).innerHTML
  expect(options.length).toBe(TEST_OPTIONS.length)
  expect(title).toBe(TEST_TITLE)
  expect(currentOption.className).toMatch('--active')

  fireEvent.click(options[1])
  expect(mockStateHandler).toHaveBeenCalled()
})
