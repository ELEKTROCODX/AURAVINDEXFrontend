import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';
import Books from './pages/Books';
import Book from './pages/user-pages/Book';
import Rooms from './pages/Rooms';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AboutUs from './pages/AboutUs';
import AuthContextProvider from './contexts/AuthContextProvider';
import PrivateRoute from './routes/PrivateRoute';
import UserProfile from './pages/UserProfile';
import HomePage from './pages/user-pages/HomePage';
import MyLists from './pages/user-pages/MyLists';
import Reservations from './pages/Reservations';
import UserLoan from './pages/user-pages/UserLoans';
import Alert from './pages/Alert';
import RoleRoute from './routes/RoleRoute';
import AdminDashboard from './pages/admin-pages/AdminDashboard';
import ResetPasswordPage from './pages/Email';
import SetNewPasswordPage from './pages/Pass';

function App() {
  return (
      <AuthContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/alert" element={<Alert />} />
          <Route path="/Rooms" element={
              <Rooms/>
            } />
            <Route path='/forgotpassword' element={<ResetPasswordPage/>}></Route>
          <Route path="/Books" element={<Books />} />
          <Route path="/Book/:bookName" element={<Book />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset_password/" element={<SetNewPasswordPage/>} />
          <Route
            path='/profile' element={
              <PrivateRoute>
                <UserProfile></UserProfile>
              </PrivateRoute>
            }
          />
          <Route
            path='/dashboard' element={
              <PrivateRoute>
                <HomePage></HomePage>
              </PrivateRoute>
            }
            />
            <Route
              path='/mylists' element={
                <PrivateRoute>
                  <MyLists></MyLists>
                </PrivateRoute>
              }
              />
            <Route
              path ='/reservations' element={
                  <PrivateRoute>
                    <Reservations></Reservations>
                  </PrivateRoute>
              }
            />
            <Route
              path='/loans' element={
                <PrivateRoute>
                  <UserLoan></UserLoan>
                </PrivateRoute>
              }
            />
            <Route
              path='/adminDashboard' element={
                <RoleRoute requiredRole="Administrator">
                  <AdminDashboard></AdminDashboard>
                </RoleRoute>
              }
            />
        </Routes>
      </Router>
      </AuthContextProvider>
);
}

export default App;
