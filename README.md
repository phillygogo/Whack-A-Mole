## Development
Run `yarn start`

## Compile JS & SCSS
For development: `yarn watch`
For production: `yarn build`
This will generate JS & CSS inside the dist folder.
There are two different webpack entrypoints for different uses.
-   Work Matrix & Pay Rate (`main.js` + `main.css`) -> `dist/main.js` & `dist/app.css`
-   Pay Rate Only, for education.govt.nz (`payrate.js` + `main.css`) -> `dist/payrate.js` & `dist/payrate.css`

### Linting (Frontend)
Run with the following yarn scripts:
-   `yarn lint`: lint all javascript and scss code
-   `yarn lint:js`: lint javascript code
-   `yarn lint:style`: lint scss code
