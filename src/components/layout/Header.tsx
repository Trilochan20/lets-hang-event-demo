type NavItem = {
    label: string;
    href?: string;
  };
  
  const navItems: NavItem[] = [
    { label: "Home", href: "#" },
    { label: "People", href: "#" },
    { label: "Search", href: "#" },
  ];
  
  export default function Header() {
    return (
      <header className="max-w-[1600px] mx-auto px-4 md:px-6 py-4 md:py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-10">
            <div
              className="text-2xl md:text-3xl font-bold text-white tracking-tight"
              style={{ fontFamily: '"Syne","Syne Placeholder",sans-serif' }}
            >
              Let's Hang
            </div>
  
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-white/60 hover:text-white/85 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
  
          <button
            type="button"
            className="glassmorphism rounded-full px-5 py-2 text-sm font-semibold text-white hover:bg-white/15 transition-colors"
          >
            Sign in
          </button>
        </div>
      </header>
    );
  }
  
  
  