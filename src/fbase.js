import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
  };

const app = initializeApp(firebaseConfig);

export const firebaseInstance = getAuth();
export const authService = getAuth();
export const dbService = getFirestore(app);

// 로그인을 위해 사용할 firebase.auth()는 다른 파일에서 참조할 것이므로 authService에 담아 내보냄
// 원래는 default로 내보냈던 것과 달리 인증 모듈 외 파이어베이스 관련 모듈을 더 내보낼 수 있으므로 named export 적용