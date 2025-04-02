import Footer from "../components/Footer";
import Nav from "../components/Nav";
import RegisterForm from "../components/RegisterForm";
const SignUp=()=>{
    return(
        <>
            <Nav/>
            <div>
                <RegisterForm></RegisterForm>
            </div>
            <Footer></Footer>
        </>
    );
}

export default SignUp;