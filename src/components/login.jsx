import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await axios.post('http://localhost:8000/api/user/login', {
                email,
                password,
            });

            if (response.data.success) {
                setSuccess(response.data.message);
                toast.success("Login successful!");
                // Navigate to home or dashboard after login
                setTimeout(() => navigate('/'), 1500);
            } else {
                const msg = response.data.message || "Login failed";
                setError(msg);
                toast.error(msg);
            }

        } catch (error) {
            const msg = error.response?.data?.message || "Server error";
            setError(msg);
            toast.error(msg);
        }
    };

    const goToRegister = (e) => {
        e.preventDefault();
        navigate('/register');
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card p-4 shadow-sm">
                        <h3 className="text-center mb-4">Login</h3>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-primary w-100">Login</button>
                        </form>

                        <p className="mt-3 text-center">
                            Don't have an account?{" "}
                            <a href="/" onClick={goToRegister}>Register</a>
                        </p>

                        {error && <p className="text-danger text-center mt-2">{error}</p>}
                        {success && <p className="text-success text-center mt-2">{success}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
