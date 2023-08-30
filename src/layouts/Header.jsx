import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Header = ({ active, setActive }) => {
  return (
    <div className="container mx-auto px-4 flex md:px-[70px]  flex-row md:flex-wrap justify-between lg:items-center pt-[10px] md:pt-1">
      <div>
        <a href="/">
          <p className="font-bold text-[20px]">Bloger.</p>
        </a>{" "}
      </div>{" "}
      <div className="mt-4 font-Inter sm:mt-0">
        <ul className="flex items-center justify-between gap-8 p-5">
          {" "}
          <Link to="/create" style={{ textDecoration: "none" }}>
            {" "}
            <li
              className={`${active === "create" ? "active" : ""}`}
              onClick={() => setActive("create")}
            >
              {" "}
              <p className="px-3 py-2 text-lg font-medium text-[#151619] rounded-md hover:bg-gray-700 hover:text-white">
                {" "}
                Create a blog{" "}
              </p>{" "}
            </li>{" "}
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
