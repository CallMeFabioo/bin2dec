import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('Structure', () => {
	it('renders the binary input label', () => {
		const { queryByText } = render(<App />);

		const binaryLabel = queryByText(/Binary input/i);

		expect(binaryLabel).toBeInTheDocument();
	});

	it('renders the binary input', () => {
		const { getByPlaceholderText } = render(<App />);

		const binaryInput = getByPlaceholderText(/A 8 digit binary number/i);

		expect(binaryInput).toBeInTheDocument();
	});

	it('renders the decimal input label', () => {
		const { queryByText } = render(<App />);

		const decimalLabel = queryByText(/Decimal output/i);

		expect(decimalLabel).toBeInTheDocument();
	});
	it('renders the decimal input', () => {
		const { getByPlaceholderText } = render(<App />);

		const decimalInput = getByPlaceholderText(/Decimal output/i);

		expect(decimalInput).toBeInTheDocument();
	});
});

describe('Default state', () => {
	it('renders a error message if binary input has no value', () => {
		const { queryByText, getByPlaceholderText } = render(<App />);

		const binaryInput = getByPlaceholderText(/A 8 digit binary number/i);
		const errorMessage = queryByText(/Please, enter a binary number/i);

		expect(binaryInput.classList).toContain('border-red-500');
		expect(errorMessage).toBeInTheDocument();
	});

	it('renders with decimal input disabled', () => {
		const { getByPlaceholderText } = render(<App />);

		const decimalInput = getByPlaceholderText(/Decimal output/i);

		expect(decimalInput).toBeDisabled();
	});

	it('renders with "Convert!" button disabled', () => {
		const { queryByText } = render(<App />);

		const submitButton = queryByText(/Convert!/i);

		expect(submitButton).toHaveClass('disabled');
	});

	it('renders with "Clear!" button disabled', () => {
		const { queryByText } = render(<App />);

		const clearButton = queryByText(/Clear/i);

		expect(clearButton).toHaveClass('disabled');
	});
});

describe('Binary input behavior', () => {
	it('only enables the "Convert" button when the number digited is a binary digit', async () => {
		const { queryByText, getByPlaceholderText } = render(<App />);

		const clearButton = queryByText(/Clear/i);
		const submitButton = queryByText(/Convert!/i);
		const decimalInput = getByPlaceholderText(/Decimal output/i);
		const binaryInput = getByPlaceholderText(/A 8 digit binary number/i);
		const errorMessage = queryByText(/Please, enter a binary number/i);

		await userEvent.type(binaryInput, '101010');

		expect(errorMessage).not.toBeInTheDocument();
		expect(submitButton).not.toHaveClass('disabled');
		expect(clearButton).toHaveClass('disabled');
		expect(decimalInput).toBeDefined();
	});

	it('renders a error message after a non binary digit is typed', async () => {
		const { queryByText, getByPlaceholderText } = render(<App />);

		const binaryInput = getByPlaceholderText(/A 8 digit binary number/i);

		const getErrorMessage = () => queryByText(/Please, enter a binary number/i);

		let errorMessage = getErrorMessage();

		expect(errorMessage).toBeInTheDocument();

		await userEvent.type(binaryInput, '1');

		expect(errorMessage).not.toBeInTheDocument();

		userEvent.type(binaryInput, '2');

		errorMessage = getErrorMessage();

		expect(errorMessage).toBeInTheDocument();
	});
});

describe('Decimal input behavior', () => {
	it('renders a result of a conversion of binary number to decimal number', async () => {
		const { queryByText, getByPlaceholderText } = render(<App />);

		const submitButton = queryByText(/Convert!/i);
		const decimalInput = getByPlaceholderText(/Decimal output/i);
		const binaryInput = getByPlaceholderText(/A 8 digit binary number/i);

		const binaryNumber = '101010';
		const decimalNumber = '42';

		await userEvent.type(binaryInput, binaryNumber);
		await userEvent.click(submitButton);

		expect(decimalInput).toBeEnabled();
		expect(decimalInput).toHaveValue(decimalNumber);
	});
});
