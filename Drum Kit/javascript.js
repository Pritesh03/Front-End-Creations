
function playSound(e)
{
const div = document.querySelector(`.key[data-key="${e.keyCode}"]`);
	const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);

	if(!audio)
		return;

	div.classList.add('playing');

	audio.currentTime = 0;
	audio.play();
}

function removeTransition(e)
{
	if(e.propertyName!='transform') 
	return;
	e.target.classList.remove('playing');
}


window.addEventListener('keydown', playSound);

window.addEventListener('transitionend', removeTransition);