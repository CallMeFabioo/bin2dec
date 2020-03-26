import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from '.';

it('renders a enabled button', () => {
	render(<Button>Button</Button>);

	expect(screen.queryByText(/Button/i)).not.toHaveClass('disabled');
});

it('renders a disabled button', () => {
	render(<Button disabled={true}>Button</Button>);

	expect(screen.queryByText(/Button/i)).toHaveClass('disabled');
});
