# React-Node-MapMarkerApp
The project is built using create-react-app in the client and node&express in the backend.The project uses redux for state management.
The app is using locationIQ api to fetch latitutde and longitude of a given place.The map is built using the googlemap api.
In this app one can search for a location,which will give a list of location to the users.The user then can add marker on the app 
for a particular location.The user also can edit and delete a marker.On clicking each markedplace card it will take you to that particular 
marker in the app along with a info window.
In the backend the app uses a small CRUD functionality built using node and express.The app is using rest apis to handle the request.
Unit Testing is done using jest and enzyme.For async api calls it uses moxios to test. 
The project is live at https://mapmarkerappnode.onrender.com/


# Installation
npm install

# start
To start the project one have to start two different server one for the backend by using npm start and one for client from inside the client
package by using npm start.

