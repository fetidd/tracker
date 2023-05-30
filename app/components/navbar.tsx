import { Link } from "@remix-run/react";
import { Button } from "~/components";
import { APP_VERSION } from "~/constant";

export default function Navbar() {
  return (
    <nav
      id="navbar"
      className="w-full flex justify-between bg-white h-full items-center px-3"
    >
      <Link to="/">
        <h1 className="pl-4 text-2xl">
          Tracker{" "}
          <span className="text-zinc-400 text-sm">{`v${APP_VERSION}`}</span>
        </h1>
      </Link>
      <div className="flex items-center space-x-5">
        <span className="hidden md:block"></span>
        <Button color="Red" handler={(_ev) => {}} text="Log out" />
      </div>
    </nav>
  );
}
