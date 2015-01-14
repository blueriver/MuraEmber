/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'mura',
    environment: environment,
    baseURL: '/',
    locationType: 'hash',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {  
      loginURL:"?display=login",
      siteid:"default",
      context:"http://localhost",
      nocache:0,
      apiEndpoint:"http://localhost/index.cfm/_api/ajax/v1/",
      assetpath:"http://localhost/default",
      requirementspath:"http://localhost/requirements",
      themepath:"http://localhost/default/includes/themes/MuraBootstrap3",
      rb:"en",
      reCAPTCHALanguage:"",
      preloaderMarkup: "\x3Ci\x20class\x3D\x22fa\x20fa\x2Drefresh\x20fa\x2Dspin\x22\x3E\x3C\x2Fi\x3E",
      dtExample:"11/10/2018",
      dtCh:"/",
      dtFormat:[0,1,2],
      dtLocale:"en-US"
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
