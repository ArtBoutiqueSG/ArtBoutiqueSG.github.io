export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 text-center p-4 mt-6">
      <p>© {new Date().getFullYear()} My Static Site. All rights reserved.</p>
    </footer>
  );
}