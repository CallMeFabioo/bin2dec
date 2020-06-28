import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

it('render a form', () => {
	const { container } = render(<App />);

	expect(container).toMatchSnapshot();
});

describe('Default state', () => {
	it('renders with decimal input disabled', () => {
		render(<App />);

		const decimal = screen.getByLabelText(/Decimal output/i);

		expect(decimal).toBeDisabled();
	});

	it('renders with "Convert!" and "Clear" buttons disabled', () => {
		render(<App />);

		const submit = screen.getByText(/Convert!/i);
		const clear = screen.getByText(/Clear/i);

		expect(submit).toHaveClass('disabled');
		expect(clear).toHaveClass('disabled');
	});
});

describe('Binary input behavior', () => {
	it('only enables the "Convert" button when the number digited is a binary digit', async () => {
		render(<App />);

		const submit = screen.getByText(/Convert!/i);
		const clear = screen.getByText(/Clear/i);
		const binary = screen.getByLabelText(/Binary input/i);
		const decimal = screen.getByLabelText(/Decimal output/i);

		await userEvent.type(binary, '101010');

		expect(submit).not.toHaveClass('disabled');
		expect(clear).toHaveClass('disabled');
		expect(decimal).toBeDisabled();
	});

	it('renders a error message after a non binary digit is typed', async () => {
		render(<App />);

		const binaryInput = screen.getByLabelText(/Binary input/i);
		const errorMessage = () =>
			screen.queryByText(/Please, enter a binary number/i);

		await userEvent.type(binaryInput, '1');

		expect(errorMessage()).not.toBeInTheDocument();

		await userEvent.type(binaryInput, '2');

		expect(errorMessage()).toBeInTheDocument();
	});
});

describe('Decimal input behavior', () => {
	it('renders a result of a conversion of binary number to decimal number', async () => {
		render(<App />);

		const submit = screen.queryByText(/Convert!/i);
		const decimal = screen.getByLabelText(/Decimal output/i);
		const binary = screen.getByLabelText(/Binary input/i);

		await userEvent.type(binary, '101010');
		await userEvent.click(submit);

		expect(decimal).toBeEnabled();
		expect(decimal).toHaveValue('42');
	});
});

describe('Clear behavior', () => {
	it('clear inputs after result of a conversion', async () => {
		render(<App />);

		const submit = screen.queryByText(/Convert!/i);
		const clear = screen.queryByText(/Clear/i);
		const decimal = screen.getByLabelText(/Decimal output/i);
		const binary = screen.getByLabelText(/Binary input/i);

		await userEvent.type(binary, '101010');
		await userEvent.click(submit);

		expect(decimal).toBeEnabled();
		expect(decimal).toHaveValue('42');
		expect(clear).not.toHaveClass('disabled');

		await userEvent.click(clear);

		expect(submit).toHaveClass('disabled');
		expect(binary).toHaveValue('');
		expect(decimal).toBeDisabled();
		expect(decimal).toHaveValue('');
	});
});
