# pressTHEbutton-game
Online game for pressing only one button.

You can find running game on Heroku: https://calm-river-50721.herokuapp.com/

If you want to run game locally, you need to set .env file to root of ptb-backend folder and set there following lines:

MONGODB_URI=mongodb+srv://XXXXXX:XXXXX@cluster0-kumqp.mongodb.net/button?retryWrites=true&w=majority
PORT=3003

where XXXXX:XXXXX is your mongodb collection username & password.

npm run watch @ ptb-backend folder,
npm run start @ pressthebutton folder.

AND on loading screen you just need to press the button.
