// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAOpysIHKtZ6_DZK1hj_P57KiNxSKNTlIk',
    authDomain: 'devmeetings-rxjs-01-2017.firebaseapp.com',
    databaseURL: 'https://devmeetings-rxjs-01-2017.firebaseio.com',
    projectId: 'devmeetings-rxjs-01-2017',
    storageBucket: 'devmeetings-rxjs-01-2017.appspot.com',
    messagingSenderId: '585800975574'
  }
};
