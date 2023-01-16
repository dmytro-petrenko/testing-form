import DropdownComponent from '../../components/DropdownComponent';
import React, { useState } from 'react';

const WrapDropdown = () => {
  const [dropdownVal, setDropDownVal] = useState('');

  return (
    <>
      <DropdownComponent
        dropdownValue={dropdownVal}
        setDropDownValue={(item) => setDropDownVal(item)}
      />
    </>
  );
};

describe('Dropdown component testing', () => {
  beforeEach(() => {
    cy.mount(<WrapDropdown />);
    cy.get('button').as('buttonTag');
  });
  it('Must be three drobdown/menu items', () => {
    cy.get('@buttonTag').should('contains.text', 'Select item').click();
    cy.get('ul > li')
      .should(($lis) => {
        expect($lis).to.have.length(3);
        expect($lis.eq(0)).to.contain('Menu item 1');
        expect($lis.eq(1)).to.contain('Menu item 2');
        expect($lis.eq(2)).to.contain('Menu item 3');
      })
      .first();
    cy.get('body').click(0, 0);
  });
  it('Interact with dropdown - Success case', () => {
    cy.get('@buttonTag').should('contains.text', 'Select item').click();
    cy.get('ul').children('li').first().click();
    cy.get('@buttonTag').should('contains.text', 'Menu item 1');
    cy.get('ul').should('not.exist');
  });
  it('mouseenter does not open the dropdown menu', () => {
    cy.get('@buttonTag')
      .should('contains.text', 'Select item')
      .trigger('mouseenter');
    cy.get('ul').should('not.exist');

    cy.get('@buttonTag').should('contains.text', 'Select item');
  });
  it('click outside dropdown menu should be close menu', () => {
    cy.get('@buttonTag').click();
    cy.get('ul').should('exist');
    cy.get('body').click(0, 0);
    cy.get('ul').should('not.exist');
  });
});
