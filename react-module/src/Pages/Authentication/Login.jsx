import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Message from "../../components/messages/Message";
import './Form.css';


function Login({ loginUser }) {

    const location = useLocation();
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState('');
    const [serverMessage, setServerMessage] = useState('');

    useEffect(() => {
        if (location.state && location.state.message) {
            setMessage(location.state.message);
            setShowMessage(true);

            navigate(location.pathname, { replace: true, state: null });

            setTimeout(() => {
                setShowMessage(false);
            }, 3000);
        }

    }, [location.state]);

    const navigate = useNavigate();
    const formSchema = yup.object().shape({
        email: yup.string().required("Youd must add you email address").email("Invalid email format"),
        password: yup.string()
            .required("Enter your password.").min(5, "Password must be at least 5 characters long.")
            .max(20, "Password must not exceed 20 characters.")
            .matches(/^\S*$/, "Password cannot contain spaces.")
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

            const data = await response.json();

            if (response.status === 401) {
                setServerMessage(data.message || "An error occurred during login.");
                return;
            }
            if (response.status === 500) {
                setServerMessage(data.message || "Something wnt wrong, please try again");
                return;
            }

            loginUser(data);
            navigate('/', { state: { message: `Welcome ${data.username}` } });

        } catch (err) {
            console.error("Something went wrong in getting the user's token:", err);
        }
    };

    const LoginSubmit = (data) => {
        getAuth(data);
    };


    return (
        <div className="Login">
            {showMessage && (
                <div className="notification">
                    <p>{message}</p>
                </div>
            )}

            <form className="Form" onSubmit={handleSubmit(LoginSubmit)}>
                <p>Don't have an account! <a href="/signup">SignUp</a> </p>

                <input placeholder="email" {...register("email")} />
                {errors.email && <p className="error">{errors.email?.message}</p>}

                <input type='password' placeholder="password" {...register("password")} />
                {errors.password && <p className="error">{errors.password?.message}</p>}

                <input type="submit" className="submitForm" />
                {serverMessage && <Message text={serverMessage} styleClass={'error'} />}
            </form>


        </div>
    )
}

export default Login;