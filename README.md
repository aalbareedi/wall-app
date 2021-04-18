# Wall App Front-end

An app where users can sign up/login and read/write messages on a public wall.

## Installation

Clone the repository. Also clone the [wall-app-backend](https://github.com/aalbareedi/wall-app-backend) and refer to its README.

Run the wall-app-backend (i.e. with [PHP Server](https://marketplace.visualstudio.com/items?itemName=brapifra.phpserver)) on http://localhost:3000/ or update the `backEndUrl` state in App.js to the appropriate address.

Use `yarn start` or `npm start` to run wall-app on http://localhost:3001 or update the `FRONT_END_URL` constant in config.php located in the wall-app-backend to the appropriate address.

## Usage

1. Tap the Sign In button on the top right corner of the page to login/create an account.
2. Once signed in, fill out a message and click Post to upload it to the wall for others to see.
3. After you post your message, you can delete it by tapping on the trash icon on the top right section of the message.

[Live Demo](https://albareedi.com/wall-app/)
