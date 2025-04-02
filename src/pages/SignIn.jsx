import Footer from "../components/Footer";
import Nav from "../components/Nav";
import LoginForm from "../components/SignInForm";

const SignIn =()=>{
    return(
        <>
            <Nav/>
            <div>
                <LoginForm></LoginForm>
            </div>
            <Footer></Footer>
        </>
    );
}

export default SignIn;