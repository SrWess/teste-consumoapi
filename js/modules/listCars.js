export default function listCars(list) {
  const divList = document.querySelector('.listCars')

  const listCarsAvailable = []

  Object.entries(list).forEach(car => {
    console.log(car[1]);

    if (car[1].model !== 'Civic Si') {
      listCarsAvailable.push({
        nameModel: car[1].model,
        thumb: car[1].thumb,
        logo: car[1].logo_dark,
        nameCar: car[1].machine_name
      })
    }
  })

  console.log(listCarsAvailable);

  listCarsAvailable.forEach(car => {
    const templateInfoCar = `
      <a href="/pages/${car.nameCar}" class="carsAvailable">
        <img src="${car.thumb}" alt="Preview ${car.nameModel}" class="img-preview-car"/>
        <img src="${car.logo}" alt="Logo ${car.nameModel}"/>
      </a>
    `

    divList.innerHTML += templateInfoCar
  })
}