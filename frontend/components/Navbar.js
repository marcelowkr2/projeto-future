import Link from "next/link";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/assessments">Avaliação</Link>
        </li>
        <li>
          <Link href="/compliance">Conformidade</Link>
        </li>
        <li>
          <Link href="/protected">Proteção</Link>
        </li>
        <li>
          <Link href="/questions">Questionário</Link>
        </li>
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
