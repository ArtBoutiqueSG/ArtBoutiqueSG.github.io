import Link from "next/link";
import Image from "next/image";
export default function PoweredBy() {
  return (
    <div className="flex items-center justify-between p-2"
    title="Powered by Mehtalogy LABS">

      {/* LOGO */}
      <Link href="https://mehtalogy.in" className="flex items-center gap-2" target="_blank">
        <Image
          src="https://mehtalogy.in/favicon.svg"
          alt="Mehtalogy Technology Partner Logo"
          width={28}
          height={28}
          priority
          className="object-contain"
        />
        
          <span className="font-semibold whitespace-nowrap">
            <span className="dark:text-blue-400 text-blue-500">
              Mehtalogy
            </span>{" "}
            <span className="bg-linear-to-r from-blue-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              LABS
            </span>
          </span>       

      </Link>
    </div>
  );
}
