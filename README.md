#Github Note Taker

A basic React app that allows you to look up Github profiles and add Notes to those profiles.  Local storage is used for saving the notes.


##Instructions for running locally:
- git clone https://github.com/craigstroman/github-notetaker.git.
- cd github-notetaker.
- Run npm install.
- Start server by typing gulp server, or by typing npm run devServer.
- Open browser to http://localhost:8000.

##Instructions for making changes:
- Start development sever by typing gulp server or npm run devServer.
- In another terminal window type gulp to start SCSS compiler and eslint.
- Make changes and save and Eslint or SASS will run.
- View changes in browser by going to http://localhost:8000.

##Instructions for making production build:
- To make a production build type the command npm run build.  Files will be located in dist directory.
- Start server by typing gulp server --production, or by typing npm run prodServer.
- Open browser to http://localhost:8000.

##Version History

######Version 1.0.0
- Created app using React.
- The example app I was learning from used Firebase for saving the notes, but I decided to use local storage.
