import findPriceLow from "./findPriceLow.js";

export default function listColors(carSelectedInfo) {
  const divListColors = document.querySelector(".listColors");
  const nameColorSelected = document.querySelector('.nameColorSelected')

  divListColors.innerHTML = "";
  nameColorSelected.innerText = "";

  const listColorsAvailable = carSelectedInfo.colors;

  listColorsAvailable.forEach((color) => {
    const colorHex = document.createElement("div");
    colorHex.classList.add("colors-hex");
    colorHex.style.background = `${color.hex}`;
    colorHex.addEventListener("click", () => {
      nameColorSelected.innerText = color.name;
    });

    divListColors.appendChild(colorHex);
  });

  findPriceLow(listColorsAvailable)
}
