import { NavLink } from "react-router-dom";
import logo from '../assets/K.png';

const links = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Articles', to: '/articles' },
    { label: 'Sign In', to: '/auth/signin' },
];

const navLinkClassName = ({ isActive }) =>
    [
        'rounded-full border-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition',
        isActive
            ? 'border-pink-400 bg-pink-400 text-pink-50'
            : 'border-transparent text-zinc-400 hover:border-pink-400 hover:bg-pink-50 hover:text-pink-400',
    ].join(' ');

const NavBar = () => {
    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-pink-200 bg-zinc-100/95 backdrop-blur">
            <div className="flex w-full items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
                <NavLink to="/" className="flex items-center gap-3">
                    <div className="space-y-0.5">
                        <img src={logo} alt="Logo" className="h-16 w-auto object-contain" />
                    </div>
                </NavLink>

                <nav className="hidden items-center gap-2 md:flex">
                    {links.map((link) => (
                        <NavLink key={link.to} to={link.to} end={link.to === '/'} className={navLinkClassName}>{link.label}</NavLink>
                    ))}
                </nav>
            </div>
        </header>
    );
};

export default NavBar;