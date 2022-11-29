import { React, useState, useEffect } from "react";
import "../styles/Calculator.scss";
import Input from "./Input";
import Display from "./Display";

const Calculator = () => {
	const [result, setResult] = useState("0");
	const [showResult, setShowResult] = useState("0");
	const [currentTotal, setCurrentTotal] = useState("");
	const [showCurrentTotal, setShowCurrentTotal] = useState("");
	const [method, setMethod] = useState("");
	const [state, setState] = useState("AC");
	const [prevCalc, setPrevCalc] = useState([]);
	const [fontSize, setFontSize] = useState(56);

	useEffect(() => {
		if (result !== "0") {
			setState("C");
		}
		if (result === "0" && method === "" && currentTotal === "") {
			setState("AC");
			setPrevCalc([]);
		}
		if (currentTotal === "") {
			setShowCurrentTotal("")
		} else {
			setShowCurrentTotal(Number(currentTotal).toLocaleString("en-US"));
		}

		setShowResult(Number(result).toLocaleString("en-US"));
	}, [result]);

	const input = (glyph) => {
		if (glyph === "." && result.includes(".")) {
			return;
		} else if (glyph === "." && result === "0") {
			setResult("0.");
		} else if (result === "0") {
			setResult(String(glyph));
		} else {
			setResult((prevResult) => prevResult + String(glyph));
		}
	};

	function twoDecimal(num) {
		if (!Number.isInteger(num) && num.toString().split(".")[1].length > 2) {
			return num.toFixed(3);
		}
		return num;
	}

	const percent = () => {
		if (result === "0") {
			return;
		} else if (currentTotal !== "") {
			setResult(
				(prev) =>
					Number(currentTotal) * (parseFloat(Number(prev)) / 100).toFixed(3)
			);
		} else {
			setResult((prev) => parseFloat(Number(prev)) / 100);
		}
	};

	const plusMinus = () => {
		if (result > Number(0) && result !== "0")
			setResult((prev) => prev - prev * 2);
		if (result < Number(0) && result !== "0")
			setResult((prev) => prev - prev * 2);
	};

	const clear = () => {
		if (method === "0" && result === "0") {
			setCurrentTotal("");
			setPrevCalc([]);
		} else if (method !== "") {
			setMethod("");
			setResult("0");
			setPrevCalc([]);
		} else if (result !== "0") {
			setResult("0");
			setPrevCalc([]);
		} else if (currentTotal === "" && result === "0") {
			setCurrentTotal("");
			setPrevCalc([]);
		} else if (currentTotal !== "0") {
			setCurrentTotal("");
			setPrevCalc([]);
		} 
	};

	const math = (op) => {
		if (prevCalc[1] && prevCalc[1] !== op) {
			setPrevCalc([]);
		}
		if (result === "0" && currentTotal === "") {
			return;
		}
		if (currentTotal !== "") {
			setMethod(op);
		} else {
			setMethod(op);
			setResult("0");
			setCurrentTotal(result);
		}
	};

	const equals = () => {
		if (!prevCalc[0]) {
			setPrevCalc([result, method]);
		}

		if (result === "NaN") {
			return;
		}

		if (method === "*" && result === "0") {
			setMethod("");
			setState("AC");
			setPrevCalc([])
		}

		if (method === "") {
			switch (prevCalc[1]) {
				case "+":
					setResult((prevResult) =>
						String(twoDecimal(Number(result) + Number(prevCalc[0])))
					);
					break;
				case "-":
					setResult((prevResult) =>
						String(twoDecimal(Number(result) - Number(prevCalc[0])))
					);
					break;
				case "/":
					setResult((prevResult) =>
						prevResult === "0"
							? String(NaN)
							: String(twoDecimal(Number(result) / Number(prevCalc[0])))
					);
					break;
				case "*":
					setResult((prevResult) =>
						String(twoDecimal(Number(result) * Number(prevCalc[0])))
					);
					break;
				default:
			}
		}

		switch (method) {
			case "+":
				setResult((prevResult) =>
					String(twoDecimal(Number(currentTotal) + Number(prevResult)))
				);
				break;
			case "-":
				setResult((prevResult) =>
					String(twoDecimal(Number(currentTotal) - Number(prevResult)))
				);
				break;
			case "/":
				setResult((prevResult) =>
					prevResult === "0"
						? String(NaN)
						: String(twoDecimal(Number(currentTotal) / Number(prevResult)))
				);
				break;
			case "*":
				setResult((prevResult) =>
					String(twoDecimal(Number(currentTotal) * Number(prevResult)))
				);
				break;
			default:
		}
		setCurrentTotal("");
		setShowCurrentTotal("")
		setMethod("");
	};

	function getTextWidth() {
		let inputText = result;
		let font = `${fontSize}px system-ui`;
		let canvas = document.createElement("canvas");
		let context = canvas.getContext("2d");
		context.font = font;
		let width = context.measureText(inputText).width;
		let resultText = document.querySelector(".result");
		while (width > 270) {
			console.log(fontSize);
			console.log(font);
			setFontSize((prev) => prev - 3);

			getTextWidth();
		}
		resultText.style.fontSize = `${fontSize}px`;
		console.log(width);
	}

	return (
		<div className="calculator">
			<Display
				result={result}
				currentTotal={currentTotal}
				method={method}
				showResult={showResult}
				showCurrentTotal={showCurrentTotal}
			/>
			<Input
				input={input}
				clear={clear}
				equals={equals}
				math={math}
				state={state}
				percent={percent}
				plusMinus={plusMinus}
			/>
			{/* <button onClick={() => getTextWidth()}>Width?</button> */}
		</div>
	);
};

export default Calculator;
