import React from 'react';
import { render } from '@testing-library/react';

import Label from '.';

it('renders a label passing custom props', () => {
	const { queryByTestId } = render(<Label data-testid="Label" />);

	expect(queryByTestId(/Label/i)).toBeInTheDocument();
});
