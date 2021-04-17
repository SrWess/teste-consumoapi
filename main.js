const selectStates = document.querySelector(".state");
const buttonState = document.querySelector(".sendState");

const modal = document.querySelector('.modal-state')

const divVersisonsCar = document.querySelector(".versionsCar");
const divInfoColors = document.querySelector(".infoColors");

const spanStateUf = document.querySelector(".stateSelected");
const priceState = document.querySelector(".priceState");

const nameCar = document.querySelector(".nameCar");

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

const fetchHonda = async () => {
  const response = await fetch("http://localhost:3000");
  const responseJson = await response.json();

  const containsUFState = localStorage.getItem("HONDA_LOCAL_STATE");

  if (!containsUFState) {
    changeState()
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
};

fetchHonda();

function infoCar(civic) {
  const infoPPs = civic.version_features[0].colors[1].pps;
  const ufSaved = localStorage.getItem("HONDA_LOCAL_STATE");

  const infoStates = Object.entries(infoPPs);

  for (let i = 0; i < infoStates.length; i++) {
    if (infoStates[i][0] === ufSaved) {
      findVersions(civic);
      nameCar.innerText = civic.marketing_name;
      priceState.innerText = Number(
        infoStates[i][1].field_pps_preco
      ).toLocaleString("pt-br", { style: "currency", currency: "BRL" });
    }
  }
}

function findVersions(nameCar) {
  divVersisonsCar.innerHTML = "";

  for (const version of nameCar.version_features) {
    const nameVersion = version.version;

    const versionCar = document.createElement("a");
    versionCar.className = "details-version";
    versionCar.href = `#car-${nameVersion.toLowerCase()}`;
    versionCar.innerText = nameVersion;
    versionCar.addEventListener("click", (event) => {
      event.preventDefault();
      linkClicked = event.target.innerText;

      Array.from(nameCar.version_features).forEach((info) => {
        if (linkClicked === info.version) {
          templateInfoVersion(info);
        }
      });
    });

    divVersisonsCar.appendChild(versionCar);
  }
}

const templateInfoVersion = (info) => {
  divInfoColors.innerHTML = "";

  const arrayColors = Array.from(info.colors);
  arrayColors.forEach((color) => {
    const html = `
      <div class="colors-hex" style="background: ${color.hex}"></div>
    `;

    divInfoColors.innerHTML += html;
  });
};

function changeState() {
  if(!modal.classList.contains('active')) {
    modal.classList.add('active')
  }
}

function handleClick() {
  const ufState = selectStates.value;

  localStorage.setItem("HONDA_LOCAL_STATE", ufState);
  modal.classList.remove('active')

  fetchHonda();
}

buttonState.addEventListener("click", handleClick);
