import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { useState } from 'react';
import { loginUser } from '../../services/UserService';

// helper to store auth
const saveAuth = (token, type, firstName) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userType', type);
    localStorage.setItem('firstName', firstName);
};

const inputClasses = 'mt-2  w-full rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-zinc-50';

const actionButtonClassName = 'w-full rounded-xl py-3 text-[11px] tracking-[0.2em]';

const SignInPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await loginUser({ email, password });
            const { token, type, firstName } = res.data;
            saveAuth(token, type, firstName);
            // Route admin and editor to dashboard, viewers to home
            if (type === 'admin' || type === 'editor') {
                navigate('/dashboard');
            } else {
                navigate('/');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">Sign In</h1>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
                Sign in to continue reading your saved stories and pick up where you left off.
            </p>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                    <div>
                    <label htmlFor="signin-email" className="text-sm font-medium text-zinc-700">
                        Email Address
                    </label>
                    <input
                        id="signin-email"
                        type="email"
                        placeholder="example@domain.com"
                        autoComplete="email"
                        className={inputClasses}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="signin-password" className="text-sm font-medium text-zinc-700">
                        Password
                    </label>
                    <input
                        id="signin-password"
                        type="password"
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        className={inputClasses}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <p className="mt-3 text-xs leading-5 text-zinc-500">
                    It must be a combination of minimum 8 letters. numbers, and symbols.
                </p>  
                </div> 

                <div className="flex items-center justify-between gap-4 text-sm">
                    <label className="flex items-center gap-2 text-zinc-600">
                        <input type="checkbox" className="h-4 w-4 rounded border-zinc-300 accent-zinc-900" />
                        <span>Remember me</span>
                    </label>
                    <Button type="button" variant="secondary" className="font-medium text-zinc-700">
                        Forgot Password?
                    </Button>
                </div> 

                {error && <p className="text-sm text-red-600">{error}</p>}
                <Button type="submit" variant="primary" className={actionButtonClassName}>
                    Log In
                </Button>

                <div className="grid gap-3 pt-2 sm:grid-cols-2">
                    <Button type="button" variant="secondary" className={actionButtonClassName}>
                        Log In with Google
                    </Button> 
                    <Button type="button" variant="secondary" className={actionButtonClassName}>
                        Log In with Apple
                    </Button> 
                </div>
            </form>

            <div className="mt-8 border-t border-zinc-200 pt-6 text-sm text-zinc-600">
                No account yet? {' '}
                <Link to="/auth/signup" className="font-semibold text-zinc-900 transition hover:text-zinc-600">
                    Sign Up
                </Link>
            </div>
        </>
    );
};

export default SignInPage;