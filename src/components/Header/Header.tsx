// Header component
export default function Header() {
  return (
    <header className="navbar bg-base-100 shadow-lg">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost text-xl">Adaboards</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li><a href="/home">My Boards</a></li>
          <li>
            <details>
              <summary>Account</summary>
              <ul className="bg-base-100 rounded-t-none p-2">
                <li><a>Profile</a></li>
                <li><a>Settings</a></li>
                <li><a>Logout</a></li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </header>
  );
}
