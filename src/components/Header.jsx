import { useContext, useEffect } from "react";
import { MyContext } from "../context/MyContext";
import doitIcon from "../assets/images/logo.svg";
import MenuIcon from "../assets/images/menu-icon.svg";
import MenuIcon1 from "../assets/images/menu-icon1.svg";
import SearchIcon from "../assets/images/search.svg";
import SearchIcon1 from "../assets/images/search1.svg";
import GridIcon from "../assets/images/app-grid.svg";
import GridIcon1 from "../assets/images/app-grid1.svg";
import MoonIcon from "../assets/images/moon.svg";
import MoonIcon1 from "../assets/images/moon1.svg";

export default function Header({
  setProfileSectionPosition,
  profileSectionPosition,
}) {
  const { mode, setMode } = useContext(MyContext);

  useEffect(() => {
    localStorage.setItem("bgMode", JSON.stringify(mode));
  }, [mode]);

  return (
    <header>
      <nav
        className={`flex ${
          mode ? "bg-[#242424] text-white " : "bg-white text-black"
        } justify-between items-center px-2 sm:px-6 md:px-16 py-6 transition-all duration-300 ease-in-out`}
      >
        {/* right section */}
        <div className="flex gap-4">
          <img
            src={mode ? MenuIcon1 : MenuIcon}
            onClick={() => setProfileSectionPosition(!profileSectionPosition)}
            className="cursor-pointer"
            alt="menu-icon"
          />
          <img src={doitIcon} alt="Logo" />
        </div>

        {/* Left section */}
        <div className="flex gap-6">
          <img
            className="cursor-pointer"
            src={mode ? SearchIcon1 : SearchIcon}
            alt="search-icon"
          />
          <img
            className="cursor-pointer"
            src={mode ? GridIcon1 : GridIcon}
            alt="grid-icon"
          />
          <img
            onClick={() => setMode(!mode)}
            className="cursor-pointer"
            src={mode ? MoonIcon1 : MoonIcon}
            alt="mode-icon"
          />
        </div>
      </nav>
    </header>
  );
}
