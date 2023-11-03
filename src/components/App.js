import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [ init, setInit ] = useState(false);
  const [ isLoggedIn, setIsLoggedIn] = useState(false); // AppRouter 컴포넌트가 라우터 역할을 하고, 코드의 가독성까지 챙기려면 상태는 App 컴포넌트에서 관리하는 것이 좋음
  // autoSerivice로 내보낸 auth 모듈에는 현재 로그인한 사람을 확인하는 currentUser 함수가 포함되어 있음.
  // currentUser함수는 로그인하지 않은 상태라면 null 반환! 
  
  /* useEffect()
  useEffect()의 두 번째 인자를 []로 지정한 이유
  이렇게 지정해야만 컴포넌트가 최초로 렌더링이 완료되었을 때 1회만 동작함! 
  
  authService.currentUser함수는 처음에 null을 반환하므로 isLoggedIn은 null로 시작할 가능성이 높음.
  불확실성을 제거하기 위해 isLoggedIn의 초깃값을 false로 하고, user에 값이 있는 경우에만 isLoggedIn을 user로 설정하도록 함.
  이렇게 해야 isLoggedIn을 AppRouter 컴포넌트 프롭스(프롭스는 컴포넌트를 통해 넘기는 인자를 의미)에 제대로 보낼 수 있음
  */
  useEffect(()=> {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return ( // footer eliment는 사이트 아래에 있는 요소! 간단하게 올해 년도를 출력하는 코드를 넣음
  <>
    {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "initializing..." }
    <footer>&copy; {new Date().getFullYear()} Myewitter</footer> 
  </>
  ); 
  // new Date().getFullYear() 는 현재 연도를 반환해주는 자바스크립트 함수로, JSX에서 함수를 사용하려면 {}로 감싸야함
  // &copy는 JSX에서 copyright 기호를 출력해줌 
}
export default App;
