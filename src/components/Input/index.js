import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const Input = ({
	id,
	placeholder,
	hasError,
	onChange = (_) => _,
	...props
}) => (
	<input
		className={classnames({
			border: true,
			rounded: true,
			shadow: true,
			'border-red-500': hasError,
			'w-full': true,
			'px-3': true,
			'py-2': true,
			'leading-tight': true,
			'text-gray-700': true,
			'appearance-none': true,
			'focus:outline-none': true,
			'focus:shadow-outline': true,
		})}
		type="text"
		maxLength="8"
		autoComplete="off"
		id={id}
		placeholder={placeholder}
		onChange={onChange}
		{...props}
	/>
);

Input.displayName = 'Input';

Input.propTypes = {
	id: PropTypes.string,
	placeholder: PropTypes.string,
	hasError: PropTypes.bool,
	onChange: PropTypes.func,
};

export default Input;
