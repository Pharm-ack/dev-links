import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-x-2 min-[480px]:justify-center"
    >
      <Image src="/solarlinkcirclebold.svg" width={40} height={40} alt="Logo" />
      <Image src="/devlinks.svg" width={135} height={26} alt="Logo" />
    </Link>
  );
}
