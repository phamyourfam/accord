import ReactDOM from 'react-dom';

export const ProgressBar = () => {
	return ReactDOM.createPortal(
		<div id="bg-gradient-to-r from-bloo-dark to-dew animate-gradient bg-size-200%"></div>,
		document.querySelector('#root') || document.createElement('div')
	);
};
