import infoCar from './infoCar.js'
import listCars from './listCars.js';
import Modal from './modal.js';

export default async function fetchHonda() {
  const spanStateUf = document.querySelector(".stateSelected");
  const selectStates = document.querySelector(".state");

  const states = {
    AC: "Acre",
    AL: "Alagoas",
    AP: "Amapá",
    AM: "Amazonas",
    BA: "Bahia",
    CE: "Ceará",
    DF: "Distrito Federal",
    ES: "Espírito Santo",
    GO: "Goías",
    MA: "Maranhão",
    MT: "Mato Grosso",
    MS: "Mato Grosso do Sul",
    MG: "Minas Gerais",
    PA: "Pará",
    PB: "Paraíba",
    PR: "Paraná",
    PE: "Pernambuco",
    PI: "Piauí",
    RJ: "Rio de Janeiro",
    RN: "Rio Grande do Norte",
    RS: "Rio Grande do Sul",
    RO: "Rondônia",
    RR: "Roraíma",
    SC: "Santa Catarina",
    SP: "São Paulo",
    SE: "Sergipe",
    TO: "Tocantins",
  };

  const response = await fetch("http://localhost:3000");
  const responseJson = await response.json();

  // console.log(responseJson);

  listCars(responseJson)

  const containsUFState = localStorage.getItem("HONDA_LOCAL_STATE");

  if (!containsUFState) {
    Modal();
  }

  spanStateUf.innerText = `${
    containsUFState
      ? `${containsUFState}(${states[containsUFState]})`
      : "Escolha um Estado"
  }`;

  const civic = responseJson.civic;
  const listStatesPPs = civic.version_features[0].colors[1].pps;
  const infoStates = Object.entries(listStatesPPs);

  selectStates.innerHTML = `
    <option selected="true" disabled="disabled" value="">
      Selecione um Estado
    </option>
  `;

  for (let i = 0; i < infoStates.length; i++) {
    const name = infoStates[i][0];
    const optionState = document.createElement("option");

    optionState.value = name;
    optionState.innerText = states[name];
    selectStates.appendChild(optionState);
  }

  infoCar(civic);
}
