import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");  // Redirect to home
  };

  return (
    <div className="p-8 min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white">
      <div className="max-w-xl mx-auto bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
        <h2 className="text-4xl font-extrabold mb-4">
          Welcome, {user?.name || "User"}!
        </h2>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          You're logged in. This is your dashboard.
        </p>
        <Button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white text-base px-5 py-2 rounded-lg"
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
