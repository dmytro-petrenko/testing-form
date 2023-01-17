import Home from '../../pages/index';

describe('Form component integration test', () => {
  beforeEach(() => {
    cy.mount(<Home />);
  });
  it('Success case', () => {
    cy.intercept('POST', '/api/form', {
      statusCode: 200,
      body: {
        firstName: 'John',
        lastName: 'Doe',
        dropDownItem: 'Menu item 2',
        calendarData: '01/15/2023',
        gender: 'male',
      },
    }).as('getApi');

    // Write First Name
    cy.get('input#first-name-input').type('John').should('have.value', 'John');

    // Write Last Name
    cy.get('input#last-name-input').type('Doe').should('have.value', 'Doe');

    // Select menu item
    cy.get('button#dropdown-button')
      .should('contains.text', 'Select item')
      .click();
    cy.get('ul > li').filter(':contains("Menu item 2")').click();
    cy.get('button#dropdown-button').should('contains.text', 'Menu item 2');
    // Enter the date to calendarPicker
    cy.get('input[placeholder="mm/dd/yyyy"]').type('01/15/2023');
    cy.get('input[placeholder="mm/dd/yyyy"]').should(
      'have.value',
      '01/15/2023'
    );
    // Select radio button
    cy.get('label').filter(':contains("Male")').click();
    cy.get('input[value="male"]').should('have.attr', 'checked');
    // Click Submit button
    cy.get('button[type="submit"]').click();

    cy.wait('@getApi').its('response.statusCode').should('eq', 200);

    // Result - modal window
    cy.get('div[data-testid="modal-window"]')
      .children('h2')
      .should('contains.text', 'Success');
  });
  it('Failure case', () => {
    cy.intercept('POST', '/api/form', {
      statusCode: 501,
      body: {},
    }).as('getApi');

    cy.get('button[type="submit"]').click();

    cy.wait('@getApi').its('response.statusCode').should('eq', 501);

    cy.get('div[data-testid="modal-window"]')
      .children('h2')
      .should('contains.text', 'Failure');
  });
  it('Request timeout case', () => {
    cy.intercept('POST', '/api/form', {
      statusCode: 408,
      body: {},
    }).as('getApi');

    cy.get('button[type="submit"]').click();

    cy.wait('@getApi').its('response.statusCode').should('eq', 408);

    cy.get('div[data-testid="modal-window"]')
      .children('h2')
      .should('contains.text', 'Request timeout');
  });
});
