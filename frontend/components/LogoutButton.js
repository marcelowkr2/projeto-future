import { logout } from "../services/api";
import { useRouter } from "next/router";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login"); // Redireciona após logout
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
