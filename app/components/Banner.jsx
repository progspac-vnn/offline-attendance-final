import Link from "next/link";

export default function Banner({ title, description, link }) {
  return (
    <Link href={link}>
      <div className="bg-gray-200 p-6 rounded-xl shadow-md hover:bg-gray-300 cursor-pointer transition">
        <h2 className="text-lg font-bold">{title}</h2>
        <p>{description}</p>
      </div>
    </Link>
  );
}