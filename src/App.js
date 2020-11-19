import React from 'react';
import Menu from './components/menu/Menu'
import Settings from './components/dialog/Settings'
import Option from './components/dialog/Option'
import SettingsOptions from './datasource/SettingsOptions'

export default function App() {

	const settingsOptions = SettingsOptions.data;

	const [isSettingsDialogActive, setSettingsDialogActive] = React.useState(false);
	const [isOptionDialogActive, setOptionDialogActive] = React.useState(false);
	const [optionDialogContent, setOptionDialogContent] = React.useState(null);

	const handleSetSettingsDialogActive = () => {
		setSettingsDialogActive(true);
	};

	const handleSetSettingsDialogInactive = () => {
		setSettingsDialogActive(false);
	};

	const handleSetOptionDialogActive = (option) => {
		setOptionDialogContent(option);
		setOptionDialogActive(true);
	}

	const handleSetOptionDialogInactive = () => {
		setOptionDialogActive(false);
	}

	React.useEffect(() => {
		fetch("http://127.0.0.1:8080/1")
			.then(res => res.json())
			.then(
				(result) => {
					console.log(result);
				},
				// Remarque : il est important de traiter les erreurs ici
				// au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
				// des exceptions provenant de réels bugs du composant.
				(error) => {
					console.log(error);
				}
			)
	}, []);

	return (
		<Menu setSettingsDialogActive={handleSetSettingsDialogActive}>
			<Settings isSettingsDialogActive={isSettingsDialogActive}
				setSettingsDialogInactive={handleSetSettingsDialogInactive}
				setOptionDialogActive={handleSetOptionDialogActive}
				settingsOptions={settingsOptions} />
			<Option isOptionDialogActive={isOptionDialogActive}
				setOptionDialogInactive={handleSetOptionDialogInactive}
				optionDialogContent={optionDialogContent} />
		</Menu>
	);
}