import React, { useState } from 'react';
import CalendarPicker from '../../components/CalendarPicker';

const WrapCalendarPicker = () => {
  const [calendarData, setCalendarData] = useState(null);
  return (
    <CalendarPicker
      calendarData={calendarData}
      setCalendarData={setCalendarData}
    />
  );
};

describe('CalendarPicker component testing', () => {
  beforeEach(() => {
    cy.mount(<WrapCalendarPicker />);
  });

  it('Render CalendarPicker and write date', () => {
    cy.get('input')
      .should('have.attr', 'placeholder', 'mm/dd/yyyy')
      .type('01/15/2023');
    cy.get('input').should('have.value', '01/15/2023');
  });
  it('Select date from popover', () => {
    cy.get('[data-testid="CalendarIcon"]').click();
    cy.get('.MuiCalendarPicker-root').should('exist');
    cy.get('button.MuiPickersDay-root').filter(':contains("16")').click();
    cy.get('input').should('have.value', '01/16/2023');
  });
});
