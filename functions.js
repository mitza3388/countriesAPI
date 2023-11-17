

import { renderSmall } from "./render.js";



const baseUrl = `https://restcountries.com/v3.1`;
const searchForm = document.getElementById('searchForm');


const defineEvents = () => {
    const searchInput = document.getElementById('searchInput');
    const countries = ['israel', 'united kingdom', 'usa', 'thailand', 'france'];

    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const searchTerm = searchInput.value;
        renderSmall(searchTerm);
    });

    countries.map((country) => {
        const country_event = document.getElementById(country);
        country_event.addEventListener('click', function (event) {
            renderSmall(country);
        })
    })
}



const getCountryInfo = async (country) => {
    try {
        const res = await axios.get(`${baseUrl}/name/${country}`);
        console.log(res);
        return res.data;
    } catch (error) {
        alert("this country doesn't exists");
        console.log(error);
    }
};

const getNameByCode = async (code) => {
    let url = `https://restcountries.com/v3.1/alpha/${code}`;
    try {
        const res = await axios.get(`${url}`);
        return res.data[0].name.common;
    } catch (error) {
        console.log(error);
    }
}

const getBorders = async (countryData) => {
    const bordersCodes = Object.values(countryData[0].borders);
    const buttons = document.createElement("div");
    buttons.className = "d-flex justify-content-center w-100 m-3";
    if (bordersCodes) {
        bordersCodes.forEach(async (element) => {
            const countryName = await getNameByCode(element);
            const btn = document.createElement("button");
            btn.className = "btn btn-dark col-2 m-1";
            btn.innerHTML = `${countryName}`;
            console.log(countryName);
            buttons.append(btn);
            btn.addEventListener("click", () => {
                const country = btn.innerHTML;
                console.log(country);
                renderSmall(country);
            })
        })
    }
    return buttons;
}





export { defineEvents,getBorders,getCountryInfo};
