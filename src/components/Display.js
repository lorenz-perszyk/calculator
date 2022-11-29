import { React} from "react";
import "../styles/Display.scss";

const Display = ({result, currentTotal, method, showResult, showCurrentTotal}) => {


	return (
		<div className="display">
			<p className="currentTotal">{`${showCurrentTotal} ${method}`}</p>
			<h1 className="result" id="result">{showResult}</h1>
		</div>
	);
};

export default Display;
