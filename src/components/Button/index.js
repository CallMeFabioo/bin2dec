import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Button = ({ disabled, children, ...props }) => (
	<button
		className={classnames({
			border: true,
			rounded: true,
			disabled,
			'px-4': true,
			'py-2': true,
			'font-semibold': true,
			'text-blue-700': true,
			'bg-transparent': true,
			'border-blue-500': true,
			'hover:bg-blue-500': true,
			'hover:text-white': true,
			'hover:border-transparent': true,
		})}
		{...props}
	>
		{children}
	</button>
);

Button.displayName = 'Button';

Button.propTypes = {
	disabled: PropTypes.bool,
};

export default Button;
