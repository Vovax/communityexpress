/*global define, window */

    'use strict';

    var productionRoot = 'https://communitylive.ws/apptsvc/rest';
    //var productionRoot = 'http://localhost:8080/apptsvc/rest';
    //var productionRoot = 'https://simfel.com/apptsvc/rest';

    module.exports = {
        defaultErrorMsg: 'An error has occurred',
        timeoutErrorMessage: 'Error: the internet connectivity might be too slow',
        authorizationErrorMsg: 'Please sign in to use this feature',
        apiRoot: productionRoot,
        productionRoot: productionRoot,
       // simulateRoot: 'http://communitylive.co/apptsvc/rest',
       // simulateRoot: 'http://localhost:8080/apptsvc/rest',
       // simulateRoot: 'http://communitylive.ws/apptsvc/rest',
        simulateRoot: 'https://simfel.com/apptsvc/rest',
        imagePath: 'images/',
        defaultLocation: [37.7833, -122.4167],
    };
