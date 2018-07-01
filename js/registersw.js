/*jshint esversion: 6 */

//check if service worker is supported
if (navigator.serviceWorker) {

    //register service worker
    navigator.serviceWorker.register('./sw.js')
        .then( response => {

            
        }).catch( err => {


        });
    
}else {

    console.log('service worker is supported');

}