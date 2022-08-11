
import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCuYr_XgCRj7VPl--FDrWGoLReGjXDmWd0",
    authDomain: "kantoorfles.firebaseapp.com",
    projectId: "kantoorfles",
    storageBucket: "kantoorfles.appspot.com",
    messagingSenderId: "841440400593",
    appId: "1:841440400593:web:66dd02c54ae36917be61f0"
  };

// Initialize Firebase
const secondaryApp = firebase.initializeApp(firebaseConfig, "Secondary");

export const createUser = async (displayName, email, password) => {
  const result = await secondaryApp
    .auth()
    .createUserWithEmailAndPassword(email, password)

  await result.user
    .updateProfile({
      displayName
    })

  return secondaryApp.auth().signOut();
}