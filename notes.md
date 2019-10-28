# NOTES

## How long did it take?

- Around 6 hours.

## Overview
URL: https://appointment-form-page.herokuapp.com/

Made by React hooks & love.

Separate the Complex logic from `App.js` to different component for better maintenance.
Refactor the matching slots logic with `useEffect` hook.
Avoid using inline css for better performance.

Separate the SCSS files under the component directory. For more maintenance also can change to CSS-modules or Style-components easily.

I take less time in write `AppointmentForm.test.js` and simply deploy to Heroku (not yet optimization) for better code structure.

Issues:
- ESLint configuration bug in react-scripts@3.01 => upgrades to 3.2.0
- Add `.babelrc` and `babel-plugin-dynamic-import-node` for `Unexpected token when using import()` issue.
- Add prettier as dev dependencies.

TODO:
- Using CI/CD env variable for API domain, 
- Handling error, 
- Using better hosting server and optimize the files,
- husky issue: Setting pre-commit script in package.json > scripts will be deprecated

### File structure

```
WEB-INTERVIEW
│   README.md
│   package.json
│   yarn.lock
└───src
    │   index.js (App entry point)
    │   app.scss
    └─── helper
    │    | index.js (Fetch & Regex helper)
    └─── components
          │ AppointmentField 
          │  └─── index.js
          │  └─── AppointmentField.scss
          │  └─── AppointmentField.test.js
          │ AppointmentForm (Main Component)
          │  └─── index.js
          │  └─── AppointmentForm.test.js
          │  └─── AppointmentForm.scss
```


## General Feedback

- I think this assessment is quite interesting and well explained.
