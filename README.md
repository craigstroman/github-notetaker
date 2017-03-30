# Github Note Taker

A basic React app that allows you to look up Github profiles and add Notes to those profiles.  Local storage is used for saving the notes.

## Instructions for running locally:
- git clone https://github.com/craigstroman/github-notetaker.git.
- cd github-notetaker.
- Run npm install.
- Start server by typing npm run prod for production server.
- Open browser to http://localhost:8080.

## Instructions for development:
- Shut down production server if running and type command npm run start to watch changes.
- Open another terminal window and type npm run dev to start development server.
- Then open browser to http://localhost:9000 to see changes.
- Leave both processes running well making changes.

## Instructions for making production build:
- To make a production build type the command npm run build.  Files will be located in dist directory.
- Start server by typing npm run prod.
- Open browser to http://localhost:8080.

## Version History

###### Version 1.3.1
- Added error message if a user is not found.

###### Version 1.2.1
- Moved local storage functions to own module located in the utils folder.
- Fixed a issue with new notes not being saved to the correct repo.

###### Version 1.1.0
- Switched to using Webpack for build process in both development and production.
- Fixed issues following Eslint and made various improvements.
- Dropped Gulp for everything ecept the build process and building css, and updating html.  Using Webpack and NPM for everything else.


###### Version 1.0.0
- Created app using React.
- The example app I was learning from used Firebase for saving the notes, but I decided to use local storage.
