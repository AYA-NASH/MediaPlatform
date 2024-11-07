import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import './Form.css';


function Login({ loginUser }) {

    const navigate = useNavigate();
    const formSchema = yup.object().shape({
        email: yup.string().required("Youd must add you email address"),
        password: yup.string().required("You must add a password."),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(formSchema)
    });


    const getAuth = async (formData) => {
        try {

            const response = await fetch("http://localhost:8000/auth/login", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Login Failed");
            }

            const data = await response.json();
            loginUser(data);
            console.log(data)
            navigate('/');

        } catch (err) {
            console.error("Something went wrong in getting the user's token:", err);
        }
    };

    const SignupSubmit = (data) => {
        getAuth(data);
    };


    return (
        <div className="Login">

            <form className="Form" onSubmit={handleSubmit(SignupSubmit)}>
                <p>Don't have an account! <a href="/signup">SignUp</a> </p>

                <input placeholder="email" {...register("email")} />
                <input placeholder="password" {...register("password")} />
                <input type="submit" className="submitForm" />
            </form>
        </div>
    )
}

export default Login;