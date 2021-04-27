export default function findPriceLow(colorsAvailable) {
  const infoPrice = document.querySelector(".infoPrice");
  const nameColorSelected = document.querySelector('.nameColorSelected')

  const ufSaved = localStorage.getItem("HONDA_LOCAL_STATE");
  const infoColorsAndStates = [];
  const nameColorAndPrice = [];

  colorsAvailable.forEach((info) => {
    infoColorsAndStates.push({
      name: info.name,
      states: info.pps,
    });
  });

  infoColorsAndStates.forEach((element) => {
    Object.entries(element.states).forEach((state) => {
      if (state[0] === ufSaved) {
        nameColorAndPrice.push({
          nameColor: element.name,
          priceColor: Number(state[1].field_pps_preco),
        });
      }
    });
  });

  const lowestPrice = nameColorAndPrice.reduce((accumulator, info) => {
    return accumulator < info.priceColor ? accumulator : info.priceColor;
  });

  console.log(lowestPrice);

  const colorNameWithLowPrice = nameColorAndPrice.find(
    (infoCar) => infoCar.priceColor === lowestPrice
  );

  const priceConverted = colorNameWithLowPrice.priceColor.toLocaleString(
    "pt-br",
    { style: "currency", currency: "BRL" }
  );

  infoPrice.innerHTML = `
    <span>A partir de <p class="priceState">${priceConverted}</p></span>
    <button type="button">Agende o teste drive</button>
  `
  nameColorSelected.innerText = colorNameWithLowPrice.nameColor

  // console.log(nameColorAndPrice);
}
