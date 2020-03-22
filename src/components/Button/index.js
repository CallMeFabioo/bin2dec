import React from 'react';
import classnames from 'classnames';

export default function Button({ disabled, children, ...props }) {
	return (
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
}
