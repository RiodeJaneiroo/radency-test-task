import React, { Component } from 'react';
import CSVReader from 'react-csv-reader';
import Table from './components/Table';
import MsgToUpload from './components/MsgToUpload';
import './App.css';
import Spinner from './components/Spinner';

class App extends Component {
	state = {
		headers: [],
		data: null,
		error: null,
		loading: false,
		msg: '',
	};

	parserOptions = {
		header: true,
		skipEmptyLines: true,
		beforeFirstChunk: () => {
			this.setState({
				headers: [],
				data: null,
				error: null,
				loading: true,
				msg: 'Uploading file...',
			});
		},
		transformHeader: (item) => {
			const header = item.toLowerCase().replace(/\W/g, '_');
			this.setState({
				headers: [...this.state.headers, header],
			});
			return header;
		},
	};

	onFileLoaded = (data, fileInfo) => {
		const { setState } = this;
		console.log(fileInfo);
		if (fileInfo.type !== 'text/csv') {
			return setState({
				error: 'File format is not correct',
				loading: false,
			});
		}
		this.setState({ msg: 'Checking the file' });
		const searched = ['full_name', 'phone', 'email'];
		const res = searched.every((item) => this.state.headers.includes(item));

		if (res) {
			const validWorker = new Worker('./valid-worker.js');
			validWorker.postMessage(data);
			validWorker.onerror = () =>
				setState({ error: 'Something went wrong', loading: false });
			validWorker.onmessage = (e) => {
				/* Если большой файл, то лучше сделать пагинацию */
				const users = e.data.slice(0, 500);

				setState({
					data: users,
					loading: false,
					msg: '',
				});
				validWorker.terminate();
			};
		} else {
			setState({ error: 'File format is not correct', loading: false });
		}
	};
	handleError = (error) => console.log(error, 'error');

	render() {
		const { data, error, loading, msg } = this.state;
		return (
			<div className='app'>
				<div className='header'>List of users</div>
				<div className='wrapper'>
					<CSVReader
						label='Import Users'
						cssLabelClass='btn'
						onError={this.handleError}
						onFileLoaded={this.onFileLoaded}
						parserOptions={this.parserOptions}
					/>

					{data ? <Table users={data} /> : !loading && <MsgToUpload />}
					{loading && <Spinner msg={msg} />}
					{error && !loading && (
						<div className='msg msg-error'>{error}</div>
					)}
				</div>
			</div>
		);
	}
}

export default App;
