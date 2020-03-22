import React from 'react';

export default function Label({ labelFor, children, ...props }) {
	return (
		<label
			className="block mb-2 text-sm text-3xl font-bold text-center text-gray-700"
			htmlFor={labelFor}
			{...props}
		>
			{children}
		</label>
	);
}
