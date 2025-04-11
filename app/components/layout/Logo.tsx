import Image from "next/image";
import Link from "next/link";

const Logo = () => (
  <Link href="/">
    <Image
      src="/logo.svg"
      alt="FoodRating Logo"
      width={140}
      height={40}
      priority
    />
  </Link>
);

export default Logo;
