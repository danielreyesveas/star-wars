# 🌌 Star Wars Characters

Star Wars Characters is frontend app where you can query the [SWAPI](https://swapi.dev/), the Star Wars API.

<br />

<div align="center"><img src="https://i.ibb.co/jL8tvBy/bg.png" width=600></div>
<br />

Live Demo on: [https://netlify.com/](https://mellow-pastelito-2eb585.netlify.app/)

Additional libraries used:

-   [TypeScript](https://www.typescriptlang.org/) - to manage JS types.
-   [SASS](https://sass-lang.com/) - to handle de styles.
-   [Axios](https://axios-http.com/es/docs/intro) - to perform the app requests.

## Setup 🚀

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) 17.1.0 (which comes with [npm](http://npmjs.com)) installed on your computer.

From your command line:

```bash
# Clone this repository
$ git clone https://github.com/danielreyesveas/star-wars.git

# Go into the server folder
$ cd star-wars

# Install server dependencies
$ npm install

# Create a .env file at the root of the project (star-wars/) with the followi content:

NEXT_PUBLIC_BASE_URL=https://swapi.dev/api
NEXT_PUBLIC_PEOPLE_ENDPOINT=/people
NEXT_PUBLIC_FILMS_ENDPOINT=/films
NEXT_PUBLIC_DELAY=true

# Run the app
$ npm run dev

# Run tests
$ npm run test

# Run tests with coverage
$ npm run test:coverage
```

The app will be running on http://localhost:3000/

`NEXT_PUBLIC_DELAY` var in `.env` file sets a delay in all the requests. This is o only to display the spinner in screen, you can disable it setting `NEXT_PUBLIC_DELAY=false`.

## Built with 🛠️

-   [TypeScript](https://www.typescriptlang.org/) - v4.7.4
-   [Next.js](https://nextjs.org/) - v12.1.6
-   [ReactJS](https://reactjs.org/) - v18.2.0
-   [SASS](https://sass-lang.com/) - v1.53.0

<br />
<br />

⌨️ by [Daniel Reyes Veas](https://github.com/danielreyesveas)
<br />
💾 [reciclatusanimales.com](https://reciclatusanimales.com)

<br />
