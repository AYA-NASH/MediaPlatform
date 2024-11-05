import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import './Form.css';

function SignUp() {
    const navigate = useNavigate();
    const formSchema = yup.object().shape({
        username: yup.string().required("You must add your name."),
        email: yup.string().required("Youd must add you email address"),
        password: yup.string().required("You must add a password."),
        confirmedPassword: yup.string().required("Passwords didn't match"),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(formSchema)
    });

    const SignupSubmit = async (formData) => {
        try {

            const response = await fetch("http://localhost:8000/auth/signup", {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error("Login Failed");
            }

            const data = await response.json(); // {meessage: "User Added", userId: ""}

            navigate('/login');

        } catch (err) {
            console.error("Something went wrong", err);
        }
    };

    return (
        <form className="Form" onSubmit={handleSubmit(SignupSubmit)}>
            <input placeholder="username" {...register("username")} />
            <input placeholder="email" {...register("email")} />
            <input placeholder="password" {...register("password")} />
            <input placeholder="confirmedPassword" {...register("confirmedPassword")} />
            <input type="submit" className="submitForm" />
        </form>
    )
}

export default SignUp;