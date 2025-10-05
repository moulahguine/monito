"use client";

export default function Button({
  href,
  children,
  variant = "primary",
  size = "medium",
  onClick,
  disabled = false,
  className = "",
  ...props
}) {
  const baseClasses =
    "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary:
      "bg-primary-500 text-neutral-0 hover:bg-primary-600 focus:ring-primary-500",
    secondary:
      "border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-neutral-0 focus:ring-primary-500",
    outline:
      "border border-neutral-40 text-neutral-80 hover:bg-neutral-20 focus:ring-neutral-40",
  };

  const sizes = {
    small: "px-3 py-2 text-sm",
    medium: "px-5 py-3 text-base",
    large: "px-6 py-4 text-lg",
  };

  const disabledClasses = disabled
    ? "opacity-50 cursor-not-allowed"
    : "cursor-pointer";

  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${disabledClasses} ${className}`;

  if (href) {
    return (
      <a href={href} className={buttonClasses} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
