/*jshint esversion: 6 */

if (navigator.serviceWorker) {
    navigator.serviceWorker.register('./sw.js')
        .then( response => {

            console.log(response);
            
        }).catch( err => {

            console.log(err);

        });
    
}else {

    console.log('service worker is supported');
    

}