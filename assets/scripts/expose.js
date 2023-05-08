// expose.js
window.addEventListener("DOMContentLoaded", init);

function init() {
	//initialize confetti
	const jsConfetti = new JSConfetti();
	//html elements as js elements
	const selection = document.getElementById("horn-select");
	const audio = document.getElementsByClassName("hidden")[0];
	const button = document.getElementsByTagName("button")[0];
	const audioBar = document.getElementById("volume-controls");
	//type holds the value of the selector
	let type = null;

	//on selection change event listener
	selection.addEventListener("change", (event) => {
		type = event.target.value;
		const picture = document.querySelector("[alt='No image selected']");
		picture.setAttribute("src", "assets/images/" + type + ".svg");
		audio.setAttribute("src", "assets/audio/" + type + ".mp3");
	});

	//button on click event listener
	button.addEventListener("click", (event) => {
		if (type === "party-horn") {
			audio.play();
			jsConfetti.addConfetti();
		} else {
			audio.play();
		}
	});

	audioBar.firstElementChild.addEventListener("input", (event) => {
		let audioLevel = event.target.value;
		if (audioLevel >= 67) {
			//highest level
			//set volume icon to level 3
			audioBar.lastElementChild.setAttribute("src", "assets/icons/volume-level-3.svg");
			audio.volume = audioLevel / 100;
		} else if (audioLevel >= 33) {
			//set volume icon to level 2
			audioBar.lastElementChild.setAttribute("src", "assets/icons/volume-level-2.svg");
			audio.volume = audioLevel / 100;
		} else if (audioLevel >= 1) {
			//set volume icon to level 1
			audioBar.lastElementChild.setAttribute("src", "assets/icons/volume-level-1.svg");
			audio.volume = audioLevel / 100;
		} else {
			//set volume to 0/mute
			audioBar.lastElementChild.setAttribute("src", "assets/icons/volume-level-0.svg");
			audio.volume = 0;
		}
	});
}
