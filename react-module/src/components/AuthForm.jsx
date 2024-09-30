import { useState } from "react";
function AuthForm({ operation }) {
    const [userInfo, setUserInfo] = useState({ email: '', password: '' })
    const [status, setStatus] = useState('');

    const updateUserData = (evt) => {
        setUserInfo(oldData => {
            return {
                ...oldData,
                [evt.target.name]: evt.target.value
            }
        })
    }

    const submitUserInfo = async (evt) => {
        evt.preventDefault();

        try {
            const response = await fetch(`http://localhost:8000/auth/${operation}`, {
                method: operation === 'signup' ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userInfo),
            });

            if (!response.ok) {
                throw new Error('Failed to submit user information');
            }

            const data = await response.json();
            setStatus('Success!');
        } catch (error) {
            console.error('Error:', error);
            setStatus('Error occurred');
        }
    };


    return (
        <form className="AuthForm">
            <label htmlFor="email">Email</label>
            <input type="text"
                name="email"
                id="email"
                value={userInfo.email}
                onChange={updateUserData}>

            </input>

            <label htmlFor="password">Password</label>
            <input type="password"
                name="password"
                id="password"
                value={userInfo.password}
                onChange={updateUserData}></input>

            <button onClick={submitUserInfo}>{operation === 'signup' ? 'Create Account' : 'Login'}</button>
        </form>)
}

export default AuthForm;