import React, { useState } from 'react';

import { Input, Label, Button } from 'components';

function App() {
	const [binaryInput, setBinaryInput] = useState('');
	const [decimalOutput, setDecimalOutput] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const [disabledButton, setToggleButton] = useState(true);

	const onChange = (e) => {
		const value = e.target.value;

		if (value.match(/^[0-1]+$/g) === null) {
			setErrorMessage('Please, enter a binary number.');
			return;
		}

		setErrorMessage('');
		setBinaryInput(value);
		setToggleButton(false);
	};

	const onSubmit = (e) => {
		e.preventDefault();

		// Formula:
		// input = 1 => output = 1 * (2^0) = 1
		// input = 10 => output = (0 * (2^0)) + (1 * (2^1)) = 2
		// So we reverse and iterate from the back
		const result = binaryInput
			.split('')
			.map(Number)
			.reverse()
			.reduce((acc, char, index) => acc + char * Math.pow(2, index));

		setDecimalOutput(result);
	};

	const clearInputs = () => {
		setBinaryInput('');
		setDecimalOutput('');
		setToggleButton(true);
	};

	return (
		<div className="flex items-center justify-center h-screen">
			<form
				className="w-1/2 px-8 pt-6 pb-8 bg-white rounded shadow-md"
				onSubmit={onSubmit}
				noValidate
			>
				<div className="mb-4">
					<Label labelFor="binaryInput">Binary input</Label>
					<Input
						id="binaryInput"
						placeholder="A 8 digit binary number"
						hasError={Boolean(errorMessage)}
						onChange={onChange}
						value={binaryInput}
					/>
					{errorMessage && (
						<p className="text-xs italic text-red-500">{errorMessage}</p>
					)}
				</div>
				<div className="mb-6">
					<Label labelFor="decimalOutput">Decimal output</Label>
					<Input
						id="decimalOutput"
						placeholder="Decimal output"
						disabled={!decimalOutput}
						value={decimalOutput}
					/>
				</div>
				<div className="flex items-center justify-around">
					<Button type="button" disabled={!decimalOutput} onClick={clearInputs}>
						Clear
					</Button>

					<Button type="submit" disabled={disabledButton}>
						Convert!
					</Button>
				</div>
			</form>
		</div>
	);
}

export default App;
