import Logo from "./Logo";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import { NavLink } from "@/types/nav";

const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/dishes", label: "Dishes" },
  { href: "/dishes/new", label: "Add Dish", permission: "user" },
];

const Header = () => {
  return (
    <header className="text-black flex items-center justify-between px-10 py-8 border-b border-lightgray shadow-sm bg-white sticky top-0 z-50 h-[100px]">
      <Logo />
      <NavLinks navLinks={navLinks} />
      <MobileMenu navLinks={navLinks} />
    </header>
  );
};

export default Header;
