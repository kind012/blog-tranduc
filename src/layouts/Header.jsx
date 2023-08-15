import { Link } from "react-router-dom";
import logo from "../assets/Image/logo-black.svg";
import PropTypes from "prop-types";

const Header = ({ active, setActive }) => {
  return (
    <div className="container flex justify-between pt-[10px] items-center px-[70px]">
      <div>
        <a href="/" className="">
          <img src={logo} alt="" className="w-[129px]" />
        </a>
      </div>
      <div className="font-Inter">
        <ul className="flex items-center justify-between gap-8 p-5 ">
          <Link to="/create" style={{ textDecoration: "none" }}>
            <li
              className={` ${active === "create" ? "active" : ""}`}
              onClick={() => setActive("create")}
            >
              <p className="px-3 py-2 text-lg font-medium text-[#151619] rounded-md hover:bg-gray-700 hover:text-white">
                Create a blog
              </p>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
Header.propTypes = {
  active: PropTypes.string,
  setActive: PropTypes.func,
};
