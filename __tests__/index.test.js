import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../pages/index';

describe('Render Home page', () => {
  it('renders a form', () => {
    render(<Home />);
    const fomrContainer = screen.getByTestId('form');
    expect(fomrContainer).toBeInTheDocument();

    const firstTextLabel = screen.getByLabelText('First Name');
    expect(firstTextLabel).toBeInTheDocument();

    const secondTextLabel = screen.getByLabelText('Last Name');
    expect(secondTextLabel).toBeInTheDocument();

    const dropdown = screen.getByRole('button', { name: /Select item/i });
    expect(dropdown).toBeInTheDocument();

    const calendar = screen.getByLabelText('Select date');
    expect(calendar).toBeInTheDocument();

    const radioButtonMale = screen.getByLabelText('Female');
    expect(radioButtonMale).toBeInTheDocument();

    const radioButtonFemale = screen.getByLabelText('Male');
    expect(radioButtonFemale).toBeInTheDocument();

    const submitButton = screen.getByRole('button', { name: /Submit/i });
    expect(submitButton).toBeInTheDocument();
  });
});

describe('Success case', () => {
  it('inputs data and submit', () => {
    render(<Home />);
    const firstTextLabel = screen.getByLabelText('First Name');
    fireEvent.change(firstTextLabel, { target: { value: 'John' } });
    expect(screen.getByLabelText('First Name')).toHaveValue('John');

    fireEvent.change(screen.getByLabelText('Last Name'), {
      target: { value: 'Doe' },
    });
    expect(screen.getByLabelText('Last Name')).toHaveValue('Doe');

    fireEvent.change(screen.getByPlaceholderText('mm/dd/yyyy'), {
      target: { value: '01/10/2023' },
    });
    expect(screen.getByLabelText('Select date')).toHaveValue('01/10/2023');

    fireEvent.click(screen.getByRole('button', { name: /Select item/i }));
    expect(screen.getByText('Menu item 1')).toHaveTextContent('Menu item 1');
    fireEvent.click(screen.getByText('Menu item 1'));
    expect(
      screen.getByRole('button', { name: /Menu item 1/i })
    ).toHaveTextContent('Menu item 1');

    fireEvent.click(screen.getByLabelText('Female'));
    expect(screen.getByLabelText('Female')).toBeChecked();

    fireEvent.submit(screen.getByRole('button', { name: /Submit/i }));
    expect(screen.getByText('Success')).toBeInTheDocument();
    // expect(screen.getByTestId('form')).toHaveFormValues({
    //   text1: 'Text 1',
    //   text2: 'Text 2',
    //   dropDownItem: 'Menu item 1',
    //   calendarData: '01/10/2023',
    //   gender: 'female',
    // });
  });
});

describe('Failure case', () => {
  beforeEach(() => {
    render(<Home />);
  });
  it('click submit button without inputs data', () => {
    fireEvent.submit(screen.getByRole('button', { name: /Submit/i }));
    expect(screen.getByText('Failure')).toBeInTheDocument();
  });
  it('double click on submit button', () => {});
});
