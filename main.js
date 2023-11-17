import { defineEvents} from "./functions.js";
import { renderSmall} from "./render.js";



const init = ()=>{
    defineEvents();
    homePage();
}


const homePage = () =>{
    const countries = ['israel', 'united kingdom', 'usa', 'thailand', 'france'];
    countries.forEach(country => {
        renderSmall(country);
    });
}
init();