import "./styles/_main.scss";
import Calculator from "./components/Calculator";
import { useState, createContext } from "react";
import { FiMoon, FiSun } from 'react-icons/fi';

export const ThemeContext = createContext(null);

function App() {
	const [theme, setTheme] = useState("light");

	const toggleTheme = () => {
		setTheme((curr) => (curr === "light" ? "dark" : "light"));
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			<div className="App" id={theme}>
				<Calculator />
				<div className="theme">
					<FiSun className="icon" />
					<div className="switch">
						<input
							type="checkbox"
							className="sc-gJwTLC switch2"
							onClick={toggleTheme}
						/>
					</div>
					<FiMoon className="icon" />
				</div>
			</div>
		</ThemeContext.Provider>
	);
}

export default App;
