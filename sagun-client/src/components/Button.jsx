import { Link } from 'react-router-dom';

const variantClasses = {
    primary: 'bg-pink-400 text-zinc-50 hover:bg-pink-500',
    secondary: 'bg-zinc-50 text-zinc-900 hover:bg-zinc-200',
};

const Button = ({
    children,
    to,
    type = 'button',
    variant = 'primary',
    className = '',
}) => {
    const classes = [
        'inline-flex item-center justify-center rounded-full border-2 border-pink-400 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] transition', 
        variantClasses[variant] ?? variantClasses.secondary,
        className,
    ]
        .join(' ')
        .trim();

    if (to) {
        return (
            <Link to={to} className={classes}>
                {children}
            </Link>
        );
    }

    return (
        <button type={type} className={classes}>
            {children}
        </button>
    );
};

export default Button;