// Cache our elements.
const decButton =  document.querySelector(".dec__button");
const incButton =  document.querySelector(".inc__button");
const numberDisplay =  document.querySelector(".number__display");
const wheel = document.querySelector(".wheel");
const startButton = document.querySelector(".button__start");
const svgEl = document.querySelector('svg');
let numberOfContestants = 3;

// Initialise a random number variable. As zero.
let rando = 0;

// When we click the button...
const spinWheel = () => {
	// Generate a random number that'll determine how many degrees the wheel spins.
	// We want it to spin 8 times (2880 degrees) and then land somewhere, so we'll add between 0 and 360 degrees to that.
	// We add this to the already-created "rando" variable so that we can spin the wheel multiple times.
	rando += (Math.random() * 360) + 2880;

	// And spin the wheel to the random position we just generated!
	// Gotta cover ourselves with vendor prefixes.
	wheel.style.webkitTransform = "rotate(" + rando + "deg)";
	wheel.style.mozTransform = "rotate(" + rando + "deg)";
	wheel.style.msTransform = "rotate(" + rando + "deg)";
	wheel.style.transform = "rotate(" + rando + "deg)";
}

const getCoordinatesForPercent = (percent) => {
	const x = Math.cos(2 * Math.PI * percent);
	const y = Math.sin(2 * Math.PI * percent);

	return [x, y];
}

const createWheel = () => {
	if (!numberOfContestants || numberOfContestants < 2 || numberOfContestants > 7) {
		return;
	}

	emptyElement(svgEl);

	const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']
	let cumulativePercent = 0;

	const percent = 1 / numberOfContestants;
	Array(numberOfContestants)
		.fill(1)
		.forEach((_, i) => {
			const [startX, startY] = getCoordinatesForPercent(cumulativePercent);

			// each slice starts where the last slice ended, so keep a cumulative percent
			cumulativePercent += percent;

			const [endX, endY] = getCoordinatesForPercent(cumulativePercent);

			// create an array and join it just for code readability
			const pathData = [
				`M ${startX} ${startY}`, // Move
				`A 1 1 0 0 1 ${endX} ${endY}`, // Arc
				`L 0 0`, // Line
			].join(' ');

			// create a <path> and append it to the <svg> element
			const pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
			pathEl.setAttribute('d', pathData);
			pathEl.setAttribute('fill', colors[i]);
			svgEl.appendChild(pathEl);
		});

	document.querySelector('.wrapper').classList.remove('hidden');
};

const emptyElement = elm => {
	while (elm.hasChildNodes()) {
		elm.removeChild(elm.lastChild);
	}
}

const updateNumber = () => {
	numberDisplay.textContent = numberOfContestants;
	createWheel();
}

const decNumber = () => {
	if (numberOfContestants === 2) {
		return;
	}
	numberOfContestants -= 1;
	updateNumber();
};

const incNumber = () => {
	if (numberOfContestants === 7) {
		return;
	}
	numberOfContestants += 1;
	updateNumber();
}

const init = () => {
	decButton.addEventListener('click', decNumber, false);
	incButton.addEventListener('click', incNumber, false);
	startButton.addEventListener('click', spinWheel, false);
	numberDisplay.textContent = numberOfContestants;
	createWheel();
}

init();