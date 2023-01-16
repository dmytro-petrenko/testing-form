import { getContainerEl } from 'cypress/react';
import ReactDom from 'react-dom';
import Modal from '../../components/Modal';

const submitDataObj = {
  firstName: 'John',
  lastName: 'Doe',
  dropDownItem: 'Menu item 1',
  calendarData: '01/14/2023',
  gender: 'male',
};

describe('Modal component testing', () => {
  it('success modal window', () => {
    cy.mount(<Modal open={true} submittedData={submitDataObj} />);
    cy.get('h2')
      .should('contains.text', 'Success')
      .and('have.css', 'color', 'rgb(0, 128, 0)');

    cy.then(() => ReactDom.unmountComponentAtNode(getContainerEl()));
  });
  it('failure modal window', () => {
    cy.mount(<Modal open={true} submittedData={{}} />);
    cy.get('h2')
      .should('contains.text', 'Failure')
      .and('have.css', 'color', 'rgb(255, 0, 0)');

    cy.then(() => ReactDom.unmountComponentAtNode(getContainerEl()));
  });
});

// describe('Modal component - failure case', () => {
//   it('success modal with wrong color and text', () => {
//     cy.mount(<Modal open={true} submittedData={submitDataObj} />);
//     cy.get('h2')
//       .should('not.contains.text', 'Failure')
//       .and('not.have.css', 'color', 'rgb(255, 0, 0)');

//     cy.then(() => ReactDom.unmountComponentAtNode(getContainerEl()));
//   });
//   it('failure modal with wrong color and text', () => {
//     cy.mount(<Modal open={true} submittedData={{}} />);
//     cy.get('h2')
//       .should('not.contains.text', 'Success')
//       .and('not.have.css', 'color', 'rgb(0, 128, 0)');

//     cy.then(() => ReactDom.unmountComponentAtNode(getContainerEl()));
//   });
// });
