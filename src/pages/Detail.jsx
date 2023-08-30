import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebase";

const Detail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    id && getBlogDetail();
  }, [id]);

  const getBlogDetail = async () => {
    const docRef = doc(db, "blogs", id);
    const blogDetail = await getDoc(docRef);
    setBlog(blogDetail.data());
  };

  return (
    <div className="container">
      <div className="items-center justify-center ">
        <div className="pt-[30px] mb-[50px] text-center">
          <h1 className="text-black ">{blog?.title}</h1>
        </div>
        <div className="flex flex-row justify-center mt-3 mb-3">
          <div className="mx-2 text-gray-400">
            CATEGORY BY{" "}
            <span className="after:content-['|'] mx-3 relative -top-[1]"></span>
            <span className="text-[#00afab]  ">{blog?.category}</span>
            <span className="after:content-['|'] mx-3 relative -top-[1]"></span>
            <span>{blog?.timestamp.toDate().toLocaleDateString("en-GB")}</span>
          </div>
        </div>
        <div>
          <img
            src={blog?.imgUrl}
            alt={blog?.title}
            className="w-[880px] h-[403px] rounded-2xl m-auto mb-[30px] md:object-cover md:w-full md:h-full"
          />
        </div>
        <div>
          <p
            className="first-letter:text-5xl first-letter:font-bold first-letter:text-slate-900
  first-letter:mr-3 first-letter:float-left max-w-[800px] m-auto mb-[70px] leading-5"
          >
            {blog?.description}
          </p>
        </div>
      </div>
      <div className="border-b-2 border-spacing-36"></div>
    </div>
  );
};

export default Detail;
