export function Sidebar() {
    return (
      <aside className="w-64 bg-gray-800 h-screen text-white p-4">
        <ul>
          <li className="mb-2"><a href="/dashboard" className="block p-2 hover:bg-gray-700 rounded">Dashboard</a></li>
          <li className="mb-2"><a href="/assessments" className="block p-2 hover:bg-gray-700 rounded">Assessments</a></li>
          <li className="mb-2"><a href="/reports" className="block p-2 hover:bg-gray-700 rounded">Reports</a></li>
        </ul>
      </aside>
    );
  }