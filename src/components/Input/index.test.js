import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Input from '.';

it('renders a input', () => {
	const { container } = render(<Input placeholder="Input" />);

	expect(container).toMatchSnapshot();
});

it('should use default onChange value', async () => {
	render(<Input placeholder="Input" hasError={true} />);

	await userEvent.type(screen.getByRole('textbox'), '1');

	expect(screen.getByRole('textbox')).toHaveValue('1');
});

it('renders a input with error status', () => {
	render(<Input placeholder="Input" hasError={true} />);

	expect(screen.getByRole('textbox')).toHaveClass('border-red-500');
});

it('triggers a onChange prop when value changes', async () => {
	const onChange = jest.fn();

	render(<Input placeholder="Input" onChange={onChange} />);

	await userEvent.type(screen.getByRole('textbox'), '1');

	expect(onChange).toHaveBeenCalled();
});
