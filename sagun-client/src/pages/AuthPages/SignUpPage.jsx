import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { useState } from 'react';
import { createUser } from "../../services/UserService";

const inputClasses = 'mt-2  w-full rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-zinc-50';

const actionButtonClassName = 'w-full rounded-xl py-3 text-[11px] tracking-[0.2em]';

const SignUpPage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        firstName: '', lastName: '', email: '', password: '', username: '', address: '', contactNumber: '', age: '', gender: 'male'
    });
    const [error, setError] = useState('');

    const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.id]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            // set default type to viewer for signups
            const payload = { ...form, type: 'viewer', isActive: true };
            await createUser(payload);
            navigate('/auth/signin');
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed');
        }
    };

    return (
        <>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">Sign Up</h1>
            <p className="mt-3 text-sm leading-6 text-zinc-600">
                Create your account to start saving your favorite stories and continue your journey with us.
            </p>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                        <label htmlFor="first-name" className="text-sm font-medium text-zinc-700"> 
                            First Name
                        </label>
                        <input
                            id="first-name"
                            type="text"
                            placeholder="Jane"
                            autoComplete="given-name"
                            className={inputClasses}
                            value={form.firstName}
                            onChange={(e) => setForm(prev => ({ ...prev, firstName: e.target.value }))}
                        />
                    </div>

                    <div>
                        <label htmlFor="last-name" className="text-sm font-medium text-zinc-700">
                            Last Name
                        </label>
                        <input
                            id="last-name"
                            type="text"
                            placeholder="Doe"
                            autoComplete="family-name"
                            className={inputClasses}
                            value={form.lastName}
                            onChange={(e) => setForm(prev => ({ ...prev, lastName: e.target.value }))}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="signup-email" className="text-sm font-medium text-zinc-700">
                        Email
                    </label>
                    <input
                        id="signup-email"
                        type="email"
                        placeholder="example@domain.com"
                        autoComplete="email"
                        className={inputClasses}
                        value={form.email}
                        onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
                    />
                </div>

                <div>
                    <label htmlFor="signup-password" className="text-sm font-medium text-zinc-700">
                        Password
                    </label>
                    <input
                        id="signup-password"
                        type="password"
                        placeholder="Enter your password"
                        autoComplete="new-password"
                        className={inputClasses}
                        value={form.password}
                        onChange={(e) => setForm(prev => ({ ...prev, password: e.target.value }))}
                    />
                    <p className="mt-3 text-xs leading-5 text-zinc-500">
                    Use a secure password with letters, numbers, and symbols.
                </p>  
                </div>  

                <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                        <label htmlFor="username" className="text-sm font-medium text-zinc-700">Username</label>
                        <input id="username" className={inputClasses} value={form.username} onChange={(e) => setForm(prev => ({ ...prev, username: e.target.value }))} />
                    </div>
                    <div>
                        <label htmlFor="contactNumber" className="text-sm font-medium text-zinc-700">Contact No.</label>
                        <input id="contactNumber" className={inputClasses} value={form.contactNumber} onChange={(e) => setForm(prev => ({ ...prev, contactNumber: e.target.value }))} />
                    </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                        <label htmlFor="age" className="text-sm font-medium text-zinc-700">Age</label>
                        <input id="age" className={inputClasses} value={form.age} onChange={(e) => setForm(prev => ({ ...prev, age: e.target.value }))} />
                    </div>
                    <div>
                        <label htmlFor="gender" className="text-sm font-medium text-zinc-700">Gender</label>
                        <select id="gender" className={inputClasses} value={form.gender} onChange={(e) => setForm(prev => ({ ...prev, gender: e.target.value }))}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>
                <div className="mt-3">
                    <label htmlFor="address" className="text-sm font-medium text-zinc-700">Address</label>
                    <input id="address" className={inputClasses} value={form.address} onChange={(e) => setForm(prev => ({ ...prev, address: e.target.value }))} />
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <Button type="submit" variant="primary" className={actionButtonClassName}>
                    Create Account
                </Button>

                <div className="grid gap-3 pt-2 sm:grid-cols-2">
                    <Button type="button" variant="secondary" className={actionButtonClassName}>
                        Sign Up with Google
                    </Button> 
                    <Button type="button" variant="secondary" className={actionButtonClassName}>
                        Sign Up with Apple
                    </Button> 
                </div>
            </form>

            <div className="mt-8 border-t border-zinc-200 pt-6 text-sm text-zinc-600">
                Already have an account? {' '}
                <Link to="/auth/signin" className="font-semibold text-zinc-900 transition hover:text-zinc-600">
                    Log In
                </Link>
            </div>
        </>
    );
};

export default SignUpPage;