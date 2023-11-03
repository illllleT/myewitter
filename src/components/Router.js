import { HashRouter as Router, Route, Routes } from "react-router-dom";
//import { Navigate } from "react-router-dom"; <Route path="*" element={<Navigate replace to="/" />} />
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "./Navigation";
import Profile from "routes/Profile";

const AppRouter = ({ isLoggedIn }) => { // 상위 컴포넌트에서 받은 프롭스는 구조 분해 할당으로 사용하면 됨 -> 무슨 말?
    
    return(
        <Router>
            {isLoggedIn && <Navigation />}
            <Routes>
                {isLoggedIn ?(  // 3항 연산자로 isLoggedIn의 값에 따라 다른 Route를 보여줌, Route 컴포넌트에 exact, path="/" 프롭스(property 준말) 전달
                    <>
                    <Route exact path="/" element={<Home />}>
                    </Route>
                    <Route exact path="/profile" element={<Profile />}>
                    </Route>
                    </>
                ) : (
                    <Route exact path="/" element={<Auth />}>
                    </Route>
                )}
            </Routes>
        </Router>
    );
};

export default AppRouter;