import React from 'react';
import { render, screen } from '@testing-library/react';

import Label from '.';

it('renders a label passing custom props', () => {
	render(<Label data-testid="Label" />);

	expect(screen.queryByTestId(/Label/i)).toBeInTheDocument();
});
