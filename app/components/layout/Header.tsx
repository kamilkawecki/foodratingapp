import Logo from "./Logo";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/dishes", label: "Dishes" },
  { href: "/dishes/new", label: "Add Dish" },
];

const Header = () => {
  return (
    <header className="text-black flex items-center justify-between px-10 py-8 border-b border-lightgray shadow-sm bg-white sticky top-0 z-50 h-[100px]">
      <Logo />
      <NavLinks />
      <MobileMenu navLinks={navLinks} />
    </header>
  );
};

export default Header;
