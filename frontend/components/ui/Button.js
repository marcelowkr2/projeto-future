export default function Button({ children, onClick, className }) {
    return (
      <button 
        onClick={onClick} 
        className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition ${className}`}
      >
        {children}
      </button>
    );
  }
  
  // components/Navbar.js
  export function Navbar() {
    return (
      <nav className="bg-gray-900 text-white p-4 flex justify-between">
        <div className="text-lg font-bold">CyberSec Platform</div>
        <div>
          <a href="/dashboard" className="mr-4 hover:underline">Dashboard</a>
          <a href="/reports" className="hover:underline">Reports</a>
        </div>
      </nav>
    );
  }