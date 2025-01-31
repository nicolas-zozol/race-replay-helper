import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Header = ({ session }: { session: any }) => {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          Race Ratings
        </Link>
        <div className="flex gap-2">
          {!session ? (
            <>
              <Link to="/auth?mode=signin">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/auth?mode=signup">
                <Button>Sign Up</Button>
              </Link>
            </>
          ) : (
            <Button
              variant="ghost"
              onClick={() => supabase.auth.signOut()}
            >
              Sign Out
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};