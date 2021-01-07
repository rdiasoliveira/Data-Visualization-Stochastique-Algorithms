import React from 'react';
import defaultSettings from './datasource/DefaultSettings'
import Menu from './components/menu/Menu'
import VizualisationDataForm from './components/forms/VizualisationDataForm'
import Box from '@material-ui/core/Box';

export default function App() {

	const settings = defaultSettings.data;

	const [dataPath, setDataPath] = React.useState(settings.defaultDataPath);
	const [delimiter, setDelimiter] = React.useState(settings.defaultDelimiter);
	const [filePattern, setFilePattern] = React.useState(settings.defaultFilePattern);
	const [ignoreFirstLine, setIgnoreFirstLine] = React.useState(settings.defaultIgnoreFirstLine);
	const [data, setData] = React.useState({ "directories": [] });

	React.useEffect(() => {
		const config = {
			"dataPath": dataPath,
			"delimiter": delimiter,
			"filePattern": filePattern,
			"ignoreFirstLine": ignoreFirstLine
		};
		fetch("http://127.0.0.1:8080/getData/" + encodeURIComponent(JSON.stringify(config)))
			.then(async response => {
				if(response.status === 400) throw new Error(await response.json());
				if(response.status === 500) throw new Error("500 (Internal Server Error)");
				return response.json();
			})
			.then(response => {
				console.log(response);
				setData(response);
			})
			.catch((error) => console.error(error))
	}, [dataPath, delimiter, filePattern, ignoreFirstLine]);

	return (
		<Box>
			<Menu
				dataPath={dataPath}
				delimiter={delimiter}
				filePattern={filePattern}
				ignoreFirstLine={ignoreFirstLine}
				setDataPath={setDataPath}
				setDelimiter={setDelimiter}
				setFilePattern={setFilePattern}
				setIgnoreFirstLine={setIgnoreFirstLine}
			/>
			<VizualisationDataForm
				data={data}
			/>
		</Box>
	);
}