import listColors from './listColors.js'

export default function carVersions(nameCarSelected) {
  const listVersions = document.querySelector(".listCarVersions");

  listVersions.innerHTML = "";

  for (const version of nameCarSelected.version_features) {
    const nameVersion = version.version;

    const versionCar = document.createElement("a");
    versionCar.className = "details-version";
    versionCar.href = `#car-${nameVersion.toLowerCase()}`;
    versionCar.innerText = nameVersion;
    versionCar.addEventListener("click", (event) => {
      event.preventDefault();

      const linkClicked = event.target.innerText;

      const versionCarAvailable = nameCarSelected.version_features;

      versionCarAvailable.forEach((info) => {
        if (linkClicked === info.version) {
          listColors(info);
        }
      });
    });

    listVersions.appendChild(versionCar);
  }
}