import { useState } from "react";
import  { authService, firebaseInstance } from "fbase";
import {
    GithubAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
  } from "firebase/auth";

  import {
    signInWithPopup,
    GoogleAuthProvider,
  } from "firebase/auth";

/* react에서 input element를 관리하고 form element가 실행되도록 하려면 
아래처럼 useState 함수로 상태를 만들어주고 onChange, onSubmit 함수로 이벤트를 연결해주어야 함 */

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    
    /* newAccount의 true, false에 따라 onSubmit 함수에서 회원가입과 로그인을 할 수 있도록 코드를 분기
    +, 버튼 역할을 할 input element의 문구도 newAccount에 따라 다르게 적용! */
    const [newAccount, setNewAccount] = useState(true);
    /** 왜 useState 로 error를 관리하는가?
     * 실제로 우리가 원하는 것 -> 에러 발생 시 에러가 발생했다고 알려 주고 싶음
     * 그건 error.message 안에 들어 있음!
     * 그래서 에러가 발생하면 setError 함수에 error.message 전달해서 error 상태 변화
     */
    const [ error, setError ] = useState("");
     
    // onChange 함수
    /*
    console.log(event.target.name); // 어떤 input element에서 입력을 시도하는지 구분할 수 있음.
    input element에서 email 입력과 password 입력을 구분하기 위해 2가지 함수를 만드는 방법보다 
    event.target.name으로 input element를 구분하는 방법이 더 효율적임

    event.target에서 가져올 수 있는 값에는 여러가지가 있는데 우리는 name과 value 값이 필요함.
    그래서 만약 name이 email과 같다면 해당 값의 value를 email로 상태 업데이트하고, pw도 마찬가지.
    구조 분해 할당해서 if문과 else if문으로 입력값 구별! => 구조 분해 할당이 ㄹㅇ 뭔데...
    */
    const onChange = (event) => {
        const {
            target : { name, value },
        } = event;
        if (name === "email"){
            setEmail(value);
        } else if (name === "password"){
            setpassword(value);
        }
    };

    // onSubmit 함수
    /* event.preventDefault() 사용 이유
    form element는 input element 안에 내용을 모두 작성하고 엔터나 전송을 누를 시 submit 이벤트가 발생하며 페이지 새로 고침을 함
    이 때문에 리액트 상태가 초기화됨
    이를 막기 위해 onSubmit 함수에서 이벤트의 기본값을 막는 event.preventDefault() 사용
    이러면 submit 이벤트 발생 시 onSubmit 함수에서 submit 이벤트를 가로채고 이벤트의 기본값을 event.prevendDefault()가 막아 새로고침 발생하지 않음
    */
    /* async, await 사용 이유
    authService에 들어 있는 함수들은 서버로 값을 요청해서 결괏값을 수신 받기까지 시간이 걸림.
    즉, 로그인 또는 회원가입 인증이 처리된 이후에 myewitter가 실행되어야 하므로 
    기다렸다 실행하라는 뜻의 async, await을 사용한 것
    */
    const onSubmit= async (event) => {
        event.preventDefault();
        try {
            let data;
            if (newAccount){
                data = await createUserWithEmailAndPassword(authService, email, password);
            } else {
                data = await signInWithEmailAndPassword(authService, email, password);
            }
            console.log(data);
        }
        catch (error) {
            setError(error.message);
        }
    }

    /* 로그인 여부에 따라 로그인, 회원가입이 전환되도록 버튼 만듦
     * setAccount에 (orev) => !prev와 같이 함수를 전달한 것.
     * 이전 상태 값을 업데이트하는 방법으로 함수를 사용하며, 이전 상태값 prev를 매개변수로 받아서 !prev를 반환
     * !prev는 이전 상태의 부정 값을 의미하므로, toggleAccount 함수가 호출될 때마다 현재 상태를 반전시킴
     *  즉, 이 함수는 상태를 토글(toggle)하는 역할을 함
     */
    const toggleAccount = () => setNewAccount((prev) => !prev);

    /** 소셜 로그인
     * 소셜 로그인 구분 -> event.target.name 속성 이용
     * 이벤트에는 name 속성이 있으니까 이를 이용하여 소셜 로그인 분기
     * 소셜 로그인을 진행하는 sighInWithPopup 함수는 비동기 작업이라 aysnc - await문을 사용ㅎ야 함
     * provider를 signInWithPopup 함수 인자로 넘겨 소셜 로그인을 시도하는 것!
     */

    const onSoncialClick = async (event) => {
        const {
            target: { name },
        } = event;

        let provider;
        if(name === "google") {
            provider = new GoogleAuthProvider();
        } else if (name === "github"){
            provider = new GithubAuthProvider();
        }
        const data = await signInWithPopup(authService, provider);
        console.log(data);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange} autoComplete="off"/>
                <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange} autoComplete="off"/>
                <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
                {error}
            </form>
            <span onClick={toggleAccount}>
                {newAccount ? "Sign In" : "Create Account"}
            </span>
            <div>
                <button onClick={onSoncialClick} name="google">Continue with Google</button>
                <button onClick={onSoncialClick} name="github">Continue with Github</button>
            </div>
        </div>
    )}

export default Auth;