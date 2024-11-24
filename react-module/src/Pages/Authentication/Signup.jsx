import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import './Form.css';
import { useState } from "react";

function SignUp() {
    const navigate = useNavigate();
    const [serverMessage, setServerMessage] = useState('');

    const formSchema = yup.object().shape({
        name: yup.string()
            .required("You must add your name.")
            .min(3, "Username must be at least 3 characters long."),
        email: yup.string().
            required("Youd must add you email address").
            email("Invalid email format"),
        password: yup.string()
            .required("Enter your password.").min(5, "Password must be at least 5 characters long.")
            .max(20, "Password must not exceed 20 characters.")
            .matches(/^\S*$/, "Password cannot contain spaces."),
        confirmedPassword: yup.string()
            .required("Confirm Your Password")
            .oneOf([yup.ref('password'), null], "Passwords don't match."),

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

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 422) {
                    setServerMessage(data.data.map(err => err.msg).join(" "));
                } else {
                    setServerMessage(data.message || "Something went wrong, please try again.");
                }
                return;
            }

            navigate('/login', { state: { message: `Great!, now Login with your accout` } });

        } catch (err) {
            console.error("Something went wrong:", err);
            setServerMessage("An unexpected error occurred. Please try again.");
        }
    };

    return (
        <form className="Form" onSubmit={handleSubmit(SignupSubmit)}>
            {serverMessage && <p className="form-error">{serverMessage}</p>}

            <input placeholder="name" {...register("name")} />
            {errors.name && <p className="form-error">{errors.name?.message}</p>}


            <input placeholder="email" {...register("email")} />
            {errors.email && <p className="form-error">{errors.email?.message}</p>}

            <input type="password" placeholder="password" {...register("password")} />
            {errors.password && <p className="form-error">{errors.password?.message}</p>}

            <input type="password" placeholder="confirmedPassword" {...register("confirmedPassword")} />
            {errors.confirmedPassword && <p className="form-error">{errors.confirmedPassword?.message}</p>}

            <input type="submit" className="submitForm" />
        </form>
    )
}

export default SignUp;