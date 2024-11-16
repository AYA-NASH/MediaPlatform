import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import './Form.css';

function SignUp() {
    const navigate = useNavigate();
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

            if (!response.ok) {
                throw new Error("Login Failed");
            }

            const data = await response.json(); // {meessage: "User Added", userId: ""}

            navigate('/login', { state: { message: `Great!, now Login with your accout` } });

        } catch (err) {
            console.error("Something went wrong", err);
        }
    };

    return (
        <form className="Form" onSubmit={handleSubmit(SignupSubmit)}>
            <input placeholder="name" {...register("name")} />
            {errors.name && <p className="error">{errors.name?.message}</p>}


            <input placeholder="email" {...register("email")} />
            {errors.email && <p className="error">{errors.email?.message}</p>}

            <input type="password" placeholder="password" {...register("password")} />
            {errors.password && <p className="error">{errors.password?.message}</p>}

            <input type="password" placeholder="confirmedPassword" {...register("confirmedPassword")} />
            {errors.confirmedPassword && <p className="error">{errors.confirmedPassword?.message}</p>}

            <input type="submit" className="submitForm" />
        </form>
    )
}

export default SignUp;