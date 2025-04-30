import { Link } from "react-router-dom";
import { Globe, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authContext";

export default function Navbar({ darkMode, toggleTheme }) {
  const { user } = useAuth(); // Access the user state

  return (
    <header className="flex justify-between items-center mb-8">
      <div className="flex items-center">
        <Link to="/">
          <div className="flex items-center">
            <Globe className="h-8 w-8 text-purple-600 mr-2" />
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-400">
              UXify
            </h1>
          </div>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        {user ? (
          <Link to="/dashboard">
            <Button className="rounded bg-purple-600 hover:bg-purple-800">
              Dashboard
            </Button>
          </Link>
        ) : (
          <>
            <Link to="/login">
              <Button
                variant="outline"
                className="dark:text-white text-black rounded"
              >
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button className="rounded bg-purple-600 hover:bg-purple-800">
                Register
              </Button>
            </Link>
          </>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="rounded-full text-gray-900 dark:text-white hover:bg-transparent focus:bg-transparent"
        >
          {darkMode ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
      </div>
    </header>
  );
}