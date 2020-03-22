import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Input from '.';

it('renders a input', () => {
	const { queryByPlaceholderText } = render(<Input placeholder="Input" />);

	expect(queryByPlaceholderText(/Input/i)).toBeInTheDocument();
});

it('renders a input with error status', () => {
	const { queryByPlaceholderText } = render(
		<Input placeholder="Input" hasError={true} />
	);

	expect(queryByPlaceholderText(/Input/i)).toHaveClass('border-red-500');
});

it('triggers a onChange prop when value changes', async () => {
	const onChange = jest.fn();

	const { queryByPlaceholderText } = render(
		<Input placeholder="Input" onChange={onChange} />
	);

	await userEvent.type(queryByPlaceholderText(/Input/i), '1');

	expect(onChange).toBeCalled();
});
