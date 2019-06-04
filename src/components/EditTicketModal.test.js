import React from 'react';
import { mount } from 'enzyme';
import EditTicketModal from './EditTicketModal';

describe('EditTicketModal', () => {
  test('should call `sendChanges` callback when "Save changes" button clicked', () => {
    const onButtonClick = jest.fn();
    const wrapper = mount(
      <EditTicketModal open={true} editingTicket={{}} handleDateChange={() => {}} sendChanges={onButtonClick} />
    );
    const button = wrapper.find('button[data-hook="save-changes-button"]');
    button.simulate('click');
    expect(onButtonClick.mock.calls.length).toBe(1);
  })
});