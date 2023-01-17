import { getContainerEl } from 'cypress/react';
import ReactDom from 'react-dom';
import Modal from '../../components/Modal';

// const submitDataObj = {
//   firstName: 'John',
//   lastName: 'Doe',
//   dropDownItem: 'Menu item 1',
//   calendarData: '01/14/2023',
//   gender: 'male',
// };

describe('Modal component test', () => {
  it('Success case', () => {
    // cy.mount(<Modal open={true} submittedData={submitDataObj} />);
    cy.mount(<Modal open={true} statusCode={200} />);
    cy.get('h2')
      .should('contains.text', 'Success')
      .and('have.css', 'color', 'rgb(0, 128, 0)');

    cy.then(() => ReactDom.unmountComponentAtNode(getContainerEl()));
  });
  it('Failure case', () => {
    cy.mount(<Modal open={true} statusCode={501} />);
    cy.get('h2')
      .should('contains.text', 'Failure')
      .and('have.css', 'color', 'rgb(255, 0, 0)');

    cy.then(() => ReactDom.unmountComponentAtNode(getContainerEl()));
  });
  it('Request timeout case', () => {
    cy.mount(<Modal open={true} statusCode={408} />);

    cy.get('h2')
      .should('contains.text', 'Request timeout')
      .and('have.css', 'color', 'rgb(255, 0, 0)');
  });
});
