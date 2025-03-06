import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">Offline App</h1>
      <div className="space-x-4">
        <Link href="/" className="hover:underline">Home</Link>
        <Link href="/mark-attendance" className="hover:underline">Mark Attendance</Link>
        <Link href="/schedule-meet" className="hover:underline">Schedule a Meet</Link>
        <Link href="/email-broadcaster" className="hover:underline">Email Broadcaster</Link>
        <Link href="/resource-allocator" className="hover:underline">Resource Allocator</Link>
      </div>
    </nav>
  );
}