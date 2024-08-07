import {buildContentFromHashUrl} from './build.js';

document.addEventListener("DOMContentLoaded", ContentLoaded);

async function ContentLoaded()
{
    // Escuchar los cambios en el hash de la URL
    window.addEventListener("hashchange", loadPage);

    // Cargar la página correcta al cargar la página inicial
    await loadPage();
} 

// Función para cargar la página correcta basada en el hash
async function loadPage() 
{
    await buildContentFromHashUrl();
}

