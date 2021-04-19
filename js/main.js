import fetchHonda from './modules/fetchHonda.js'
import Modal from './modules/modal.js';

const selectStates = document.querySelector(".state");
const buttonState = document.querySelector(".sendState");

const locationPicked = document.querySelector('.locationPicked')

fetchHonda();

locationPicked.addEventListener('click', Modal)

function handleClick() {
  const ufState = selectStates.value;

  localStorage.setItem("HONDA_LOCAL_STATE", ufState);

  Modal()
  fetchHonda();
}

buttonState.addEventListener("click", handleClick);
