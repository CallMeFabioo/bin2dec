import React, { useState, useEffect } from 'react';

import { Input, Label, Button } from 'components';

function App() {
	const [binaryInput, setBinaryInput] = useState('');
	const [decimalOutput, setDecimalOutput] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		if (binaryInput.match(/^[0-1]+$/g) === null) {
			setErrorMessage('Please, enter a binary number.');
		}

		return () => {
			setErrorMessage('');
			setDecimalOutput('');
		};
	}, [binaryInput]);

	const onSubmit = (e) => {
		e.preventDefault();

		setDecimalOutput(parseInt(binaryInput, 2));
	};

	const clearInputs = () => {
		setBinaryInput('');
		setDecimalOutput('');
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
						onChange={setBinaryInput}
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

					<Button type="submit" disabled={errorMessage}>
						Convert!
					</Button>
				</div>
			</form>
		</div>
	);
}

export default App;
