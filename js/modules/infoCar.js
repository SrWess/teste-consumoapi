import carVersions from './carVersions.js'

export default function infoCar(nameCarSelected) {
  const nameCar = document.querySelector(".nameCar");

  const infoPPs = nameCarSelected.version_features[0].colors[1].pps;
  const ufSaved = localStorage.getItem("HONDA_LOCAL_STATE");

  const infoStates = Object.entries(infoPPs);

  for (let i = 0; i < infoStates.length; i++) {
    if (infoStates[i][0] === ufSaved) {
      carVersions(nameCarSelected);

      nameCar.innerText = nameCarSelected.marketing_name;
    }
  }
}