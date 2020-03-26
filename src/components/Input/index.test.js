import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Input from '.';

it('renders a input', () => {
	render(<Input placeholder="Input" />);

	expect(screen.queryByPlaceholderText(/Input/i)).toBeInTheDocument();
});

it('renders a input with error status', () => {
	render(<Input placeholder="Input" hasError={true} />);

	expect(screen.queryByPlaceholderText(/Input/i)).toHaveClass('border-red-500');
});

it('triggers a onChange prop when value changes', async () => {
	const onChange = jest.fn();

	render(<Input placeholder="Input" onChange={onChange} />);

	await userEvent.type(screen.queryByPlaceholderText(/Input/i), '1');

	expect(onChange).toBeCalled();
});
