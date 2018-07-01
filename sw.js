/*jshint esversion: 6 */

self.addEventListener('install', event => {

    console.log(event);

});

self.addEventListener('activate', event => {

    //do something

});

self.addEventListener('fetch', event => {
    
    fetch(event.request).then( response => {

        if (response.status === 404) {
            return fetch('/asset/err.png.png');
        }
        return response;
    }).catch( () => {

        return new Response('you are totally off the internet');
    })
    

});