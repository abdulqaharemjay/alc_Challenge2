/*jshint esversion: 6 */

self.addEventListener('install', event => {

    console.log(event);

});

self.addEventListener('activate', event => {

    //do something

});

self.addEventListener('fetch', event => {
    
    fetch(event.request).then( response => {

       
    }).catch( () => {

        
    });
    

});