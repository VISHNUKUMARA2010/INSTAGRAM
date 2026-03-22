import { Navigate, Route, Router } from "react-router-dom"
import HomePage From "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import PageLayout from "./Layout/PageLayout/PageLayout";
import Profile from "./pages/ProfilePage/ProfilePage";
import { useAuthStore } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";

function App() {
    const [authUser] = useAuthState(auth);

    return (
        <PageLayout>
            <Routes>
                 <Route path='/' element={authUser ? <HomePage /> : <Navigate to='/auth' />} />
                 <Route path='/auth' element={!authUser ? <AuthPage /> : <Navigate to='/' />} />
                 <Route path='/:username' element={<ProfilePage />} />
            </Routes>
        </PageLayout>
    );
}

export default App;