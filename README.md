# Github Note Taker

A basic React app that allows you to look up Github profiles and add Notes to those profiles. A Mongo DB is used for storing a users notes. Based on https://egghead.io/lessons/react-building-a-react-js-app-notetaker-introduction.

## Live Demo

https://github-notetaker.craigstroman.com/

## Instructions for running locally:

- git clone https://github.com/craigstroman/github-notetaker.git.
- cd github-notetaker.
- Run npm install.
- Once the server is started, then go to http://localhost:3000.

## Available commands:

1. `npm run live:server` - Starts the development environment for the server and client.
1. `npm run scss` - Builds the CSS for the server views and watches for changes.
1. `npm run prod:build` - Builds the production client.
1. `npm run prod:server` - Starts the server in production.

## Version History

###### Version 4.0.0

- Started using TypeScript
- Upgraded React and switched to using React Hooks
- Switched to using Redux Toolkit
- Added the ability to update existing notes
- Dropped Bootstrap
- Switched to using grid for CSS layout

###### Version 3.0.0

- Switched to using PostgreSQL and Sequelize.
- Upgraded Node-SASS.
- Upgraded NPM passport-google-oauth.
- Added profile picture in top right corner.
- Switched from Node Env File to DotENV.
- Added GitHub OAuth login.

###### Version 2.3.0

- Upgraded version of React and React-Dom being used.

###### Version 2.2.0

- Fixes to header view on server.
- CSS fixes on client side.

###### Version 2.1.0

- Refactored router for the React client.

###### Version 2.0.0

- Converted to a MERN (Mongo, Express, React, Node) stack rather then use localstorage.
- User can log in with a OAUTH account using Google, or Facebook to compose notes.
- Switched to using Redux with React.
- Reorganized the client app.

###### Version 1.5.2

- Added the ability to delete individual notes from a profile of a repo.

###### Version 1.4.2

- Fixed an issue with the pagination component and rendering when a new profile is loaded.

###### Version 1.4.1

- Added a paginantion component for the user repos.
- Set up validation for the search input field.
- Refactored some of the methods.
- Added more documentation for some of the methods.

###### Version 1.3.1

- Added error message if a user is not found.

###### Version 1.2.1

- Moved local storage functions to own module located in the utils folder.
- Fixed a issue with new notes not being saved to the correct repo.

###### Version 1.1.0

- Switched to using Webpack for build process in both development and production.
- Fixed issues following Eslint and made various improvements.
- Dropped Gulp for everything ecept the build process and building css, and updating html. Using Webpack and NPM for everything else.

###### Version 1.0.0

- Created app using React.
- The example app I was learning from used Firebase for saving the notes, but I decided to use local storage.
