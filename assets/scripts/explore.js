// explore.js

window.addEventListener("DOMContentLoaded", init);

function init() {
	const speakButton = document.getElementsByTagName("button")[0];
	const synth = window.speechSynthesis;
	const voiceSelect = document.getElementById("voice-select");
	let voices = [];

	synth.addEventListener("speaking", (event) => {
		console.log("speaking");
	});

	// Fetch the list of available voices
	synth.onvoiceschanged = function () {
		voices = window.speechSynthesis.getVoices();
	};

	// Wait for the list of voices to be fetched
	setTimeout(function () {
		// add the voices to select
		const selectedIndex = voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
		voiceSelect.innerHTML = "";
		for (let i = 0; i < voices.length; i++) {
			const option = document.createElement("option");
			option.textContent = `${voices[i].name}`;
			option.setAttribute("data-lang", voices[i].lang);
			option.setAttribute("data-name", voices[i].name);
			voiceSelect.appendChild(option);
		}
		voiceSelect.selectedIndex = selectedIndex;
	}, 1000); // Wait for 1 second to ensure the list of voices is fetched

	//img tag element to change smiling-open/smiling
	const picture = document.querySelector("[alt='Smiling face']");
	//on button click speak
	speakButton.addEventListener("click", (event) => {
		//set the voice to the current value
		if (synth.speaking) {
			//do nothing
			return;
		}
		//get text from input box
		let text = document.getElementById("text-to-speak").value;
		//get voice model to be used
		const voiceModel = voiceSelect.value;
		if (text !== "") {
			//create the sentence to be spoken
			const utterThis = new SpeechSynthesisUtterance(text);
			//set the voice model
			for (let i = 0; i < voices.length; i++) {
				if (voices[i].name === voiceModel) {
					utterThis.voice = voices[i];
					break;
				}
			}
			synth.speak(utterThis);
			setTimeout(() => {
				document
					.querySelector("[alt='Smiling face']")
					.setAttribute("src", "assets/images/smiling-open.png");
			}, 500); // 1000 milliseconds = 1 second
			utterThis.onend = function (event) {
				document
					.querySelector("[alt='Smiling face']")
					.setAttribute("src", "assets/images/smiling.png");
			};
		}
	});
}
