import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {showMessage} from 'react-native-flash-message';
import storage from '@react-native-firebase/storage';
export const getUid = () => {
  return auth().currentUser.uid;
};

export const loginFB = async values => {
  const {email, password} = values;
  try {
    const loginAuth = await auth().signInWithEmailAndPassword(email, password);
    showMessage({
      message: 'Welcome back',
      type: 'success',
      icon: 'success',
      duration: 1000,
    });
    return loginAuth;
  } catch (e) {
    showMessage({
      message: String(e),
      type: 'danger',
      icon: 'danger',
      position: 'top',
      duration: 3000,
    });
  }
};

export const registerFB = async values => {
  const {email, password} = values;
  try {
    const registerAuth = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    showMessage({
      message: 'Welcome to the club!',
      type: 'success',
      icon: 'success',
      duration: 1000,
    });
    return registerAuth;
  } catch (e) {
    showMessage({
      message: String(e),
      type: 'danger',
      icon: 'danger',
      position: 'top',
      duration: 3000,
    });
  }
};

export const logoutFB = async () => {
  try {
    await auth().signOut();
    return true;
  } catch (e) {
    showMessage({
      message: String(e),
      type: 'danger',
      icon: 'danger',
      position: 'top',
    });
    return false;
  }
};

export const updateUser = async (values, userId) => {
  const docRef = firestore().collection('Users').doc(userId);
  try {
    await docRef.update({
      userName: values.userName,
      name: values.fullName,
      bio: values.bio,
    });
    showMessage({
      message: 'Profile updated',
      type: 'success',
      icon: 'success',
      duration: 1000,
    });
    return true;
  } catch (e) {
    showMessage({
      message: String(e),
      type: 'danger',
      icon: 'danger',
      position: 'top',
    });
    return false;
  }
};

export const uploadImage = async (uri, userId) => {
  const uploadUri = uri;
  let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
  const storageRef = storage().ref(`images/${filename}`);
  const task = storageRef.putFile(uploadUri);
  try {
    await task;
    const url = await storageRef.getDownloadURL();
    const docRef = firestore().collection('Users').doc(userId);
    await docRef.update({
      avatar: url,
    });
    showMessage({
      message: 'Profile updated',
      type: 'success',
      icon: 'success',
      duration: 1000,
    });
    return true;
  } catch (e) {
    showMessage({
      message: String(e),
      type: 'danger',
      icon: 'danger',
      position: 'top',
    });
    return false;
  }
};
