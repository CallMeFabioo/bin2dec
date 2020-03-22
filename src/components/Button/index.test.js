import React from 'react';
import { render } from '@testing-library/react';
import Button from '.';

it('renders a enabled button', () => {
	const { queryByText } = render(<Button>Button</Button>);

	expect(queryByText(/Button/i)).not.toHaveClass('disabled');
});

it('renders a disabled button', () => {
	const { queryByText } = render(<Button disabled={true}>Button</Button>);

	expect(queryByText(/Button/i)).toHaveClass('disabled');
});
