import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { excerpt } from "../utils/index";
import PropTypes from "prop-types";

const BlogSection = ({ filteredBlog, handleDelete }) => {
  return (
    <div className="lg:mb-[20px] md:mb-[30px]">
      <div className="lg:w-[450px] md:w-[240px]">
        <h2 className="py-2 mb-4 lg:text-[60px] md:text-lg text-[#151619] font-light lg:leading-[72px]">
          See what we’ve <br />
          <strong className="text-[60px] font-bold">written lately</strong>
        </h2>
      </div>

      <div className="grid grid-cols-4 col-span-2 lg:w-full gap-x-4">
        {filteredBlog?.map((item) => {
          return (
            <div
              className="rounded-lg shadow-md  lg:w-fit md:mb-[20px]"
              key={item.id}
            >
              <div className="relative max-w-xs overflow-hidden bg-no-repeat bg-cover rounded-3xl">
                <Link to={`/detail/${item.id}`}>
                  <img
                    src={item.imgUrl}
                    alt={item.title}
                    className="object-cover w-[328px] h-[393px]  transition duration-300 ease-in-out hover:scale-110 shrink-0"
                  />
                </Link>
              </div>
              <div className="pt-[30px] py-[15px] px-[15px]">
                <a className="text-[#151619] text-[22px] font-bold line-clamp-2">
                  {item.title}
                </a>
              </div>
              <div className="px-4 mb-5 flex-1 min-h-[100px] line-clamp-4 font-Inter pt-[10px]">
                {excerpt(item.description, 120)}
              </div>
              <div className="flex px-4 mb-5 lg:justify-between border-t-slate-200 h-15">
                <FontAwesomeIcon
                  icon={["fa", "trash"]}
                  onClick={() => handleDelete(item.id)}
                />
                <Link to={`/update/${item.id}`}>
                  <FontAwesomeIcon icon={["fa", "edit"]} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BlogSection;

BlogSection.propTypes = {
  filteredBlog: PropTypes.array,
  handleDelete: PropTypes.func,
};
