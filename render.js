

import { getBorders,getCountryInfo} from "./functions.js";
const contentHolder = document.getElementById("content");

const addContent = (holder, content) => holder.append(content);


const createSmallCard = (countryData) => {
    const cardEl = document.createElement("div");
    cardEl.className = "card p-2 m-2 shadow d-flex flex-column align-items-center justify-content-center height-300";
    cardEl.style = "cursor: pointer";
    cardEl.addEventListener('click', (event) => {
        event.preventDefault;
        renderBig(countryData);
    });
    cardEl.innerHTML = `
    <strong><h2 class = "mt-3">${countryData[0].name.common}</h2></strong><br>
    <img src="${countryData[0].flags.png}" width="320" height="200"><br>
    <strong>Population:</strong> ${Number(countryData[0].population).toLocaleString()}<br>
    <strong>Capital city:</strong> ${countryData[0].capital}<br>
    <strong>Languages:</strong> ${Object.values(countryData[0].languages).join(',')}<br>

   `
    return cardEl;
}




const createBigCard = async (countryData) => {
    const borders = await getBorders(countryData);
    console.log("hi", borders);
    const cardEl = document.createElement("div");
    cardEl.className = "card p-2 m-2 shadow d-flex align-items-center justify-content-center height-300";
    cardEl.innerHTML = `
    <strong><h2 class = "mt-3">${countryData[0].name.common}</h2></strong><br>
    <img src="${countryData[0].flags.png}" width="320" height="200" class="border-black"><br>
    <strong>Population:</strong> ${Number(countryData[0].population).toLocaleString()}<br>
    <strong>Capital city:</strong> ${countryData[0].capital}<br>
    <strong>Languages:</strong> ${Object.values(countryData[0].languages).join(',')}<br>
    <iframe class = "mt-3" width="100%" height="380px" frameborder="0" scrolling="no" marginheight="0"marginwidth="0"
    src="https://maps.google.com/maps?q=${countryData[0].latlng[0]},${countryData[0].latlng[1]}&hl=iw&z=6&amp;output=embed">
    </iframe><br>
    <h3>Borders</h3>`;
    addContent(cardEl, borders);
    return cardEl;
}



const renderSmall = async (country) => {
    contentHolder.innerHTML = '';
    const countryData = await getCountryInfo(country);
    console.log(countryData);
    const colEl = document.createElement("div");
    colEl.className = "col-3 p-1 m-2";
    const cardEl = createSmallCard(countryData);
    addContent(colEl, cardEl);
    addContent(contentHolder, colEl);
};


const renderBig = async (countryData) => {
    contentHolder.innerHTML = '';
    const colEl = document.createElement("div");
    colEl.className = "col-6 p-1 m-2";
    const cardEl = await createBigCard(countryData);
    addContent(colEl, cardEl);
    addContent(contentHolder, colEl);
}



export { renderSmall, renderBig };


