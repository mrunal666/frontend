import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="center mt-5 flex justify-center space-x-4 bg-[#E7E8EF] p-2 text-[#362F2F] text-md text-bold">
      <Link href={"/"}>
        <Image
          priority
          width={25}
          height={25}
          className="w-full h-full"
          src={
            "https://ik.imagekit.io/h5gbgovde/images/logo.png?updatedAt=1681079007705"
          }
          alt="logo"
        />
      </Link>
      <p>The Home Decor </p>
    </footer>
  );
}
