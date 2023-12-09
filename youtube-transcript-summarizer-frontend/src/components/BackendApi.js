import React, { useState, useEffect } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import "bootstrap/dist/css/bootstrap.min.css"
import './backend.css';
import icon from './search.png'
import ET from "../transcripts/English.txt";
import ML from "../transcripts/Malayalam.txt";
import HI from "../transcripts/Hindi.txt";
import TA from  "../transcripts/Tamil.txt";
import boy from './boy.gif'
import loader from './loading.gif'
import { BsDownload } from "react-icons/bs";

function BackendAPI() {

	const [url, setUrl] = useState('');
	const [loading, setLoading] = useState(false);
	const [resultEng, setResultEng] = useState('');
	const [resultmsg, setResultmsg] = useState('');
	const [resultMal, setResultMal] = useState('');
	const [resultHin, setResultHin] = useState('');
	const [resulttam, setResulttam] = useState('');
	const [original_txt_length, setoriginal_txt_length] = useState('');
	const [final_summ_length, setfinal_summ_length] = useState('');

	const handleSubmit = async (e) => {
		setLoading(true);

		try {
			const response = await fetch(`http://127.0.0.1:5000/api/?video_url=${url}`);
			const data = await response.json();
			console.log(data.data['tam_translated_summary']);
			setResultEng(data.data['eng_summary']);
			setResultmsg(data.data['message']);
			setResultHin(data.data['hin_translated_summary']);
			setResultMal(data.data['mal_translated_summary']);
			setResulttam(data.data['tam_translated_summary']);
			setoriginal_txt_length(data.data['original_txt_length']);
			setfinal_summ_length(data.data['final_summ_length']);
			console.log('data.result:', data.data['original_txt_length']);

		} catch (error) {
			console.error('Error:', error);
			setResultEng('An error occurred.');
		}

		setLoading(false);
		e.preventDefault();
	};

	// stopAudio = () => {

	// 	window.speechSynthesis.cancel();
	// }

	// textToAudio = () => {

	// 	var synth = window.speechSynthesis;
	// 	var utterance = new SpeechSynthesisUtterance(this.state.englishTranscript);
	// 	synth.speak(utterance);

	// }

	return (
		<div className='container'>
			<div className='search-box-container'>
				<input
					className='url-box'
					type="text"
					placeholder="Enter video URL"
					value={url}
					onChange={(e) => setUrl(e.target.value)}
				/>
				<button onClick={handleSubmit} className='button'><img src={icon} alt="Logo" /></button>
			</div>
			{loading ? <img src={loader} className='loading' alt="Logo" /> : null}

			{resultEng && !loading && (
				<p className='compression'>{original_txt_length} words compressed to {final_summ_length} words</p>
			)}

			{resultmsg == "Failed" && !loading && (
				<p className='compression'>I cannot understand this video. Please try a new link</p>
			)}

			{resultEng && !loading && (
				<div className="result-box">
					<Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
						<Tab eventKey={1} title="English">
							{resultEng}
							{<a href={ET} className="buttonDownload" download="English_Transcript.txt" type="button"> <BsDownload /></a>}
						</Tab>
						<Tab eventKey={2} title="Hindi">
							{resultMal}
							{<a href={HI} className="buttonDownload" download="Hindi_Transcript.txt" type="button"><BsDownload /></a>}
						</Tab>

						<Tab eventKey={3} title="Malayalam">
							{resultHin}
							{<a href={ML} className="buttonDownload" download="Malayalam_Transcript.txt" type="button"><BsDownload /></a>}
						</Tab>
						<Tab eventKey={4} title="Tamil">
							{resulttam}
							{<a href={TA} className="buttonDownload" download="Tamil_Transcript.txt" type="button"><BsDownload /></a>}
						</Tab>

					</Tabs>
					{/* {resultEng} */}
				</div>


			)}
			<img src={boy} className='boy' alt="Logo" />
		</div>
	);
}

export default BackendAPI;
