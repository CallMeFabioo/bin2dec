import React from 'react';
import PropTypes from 'prop-types';

const Label = ({ labelFor, children, ...props }) => (
	<label
		className="block mb-2 text-sm text-3xl font-bold text-center text-gray-700"
		htmlFor={labelFor}
		{...props}
	>
		{children}
	</label>
);

Label.displayName = 'Label';

Label.propTypes = {
	labelFor: PropTypes.string,
	children: PropTypes.node,
};

export default Label;
