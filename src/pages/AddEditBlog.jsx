import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import UploadFile from "../components/uploadFile/UploadFile";
import { toast } from "sonner";
import PropTypes from "prop-types";

const initialState = {
  title: "",
  tags: [],
  category: "",
  description: "",
};

const categoryOption = ["Technology", "Dev", "Sport", "Program Language"];

const AddEditBlog = ({ setActive }) => {
  const [form, setForm] = useState(initialState);
  const [progress, setProgress] = useState(null);

  const { id } = useParams();

  const navigate = useNavigate();

  const { title, tags, category, description } = form;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTags = (tags) => {
    setForm({ ...form, tags });
  };

  const onCategoryChange = (e) => {
    setForm({ ...form, category: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (category && tags && title && description) {
      if (!id) {
        try {
          await addDoc(collection(db, "blogs"), {
            ...form,
            timestamp: serverTimestamp(),
          });
          toast.success("Blog create successfully");
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          await updateDoc(doc(db, "blogs", id), {
            ...form,
            timestamp: serverTimestamp(),
          });
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      return toast.error("All fields are mandatory to fill");
    }

    navigate("/");
  };

  useEffect(() => {
    id && getBlogDetail();
  }, [id]);

  const getBlogDetail = async () => {
    const docRef = doc(db, "blogs", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setForm({ ...snapshot.data() });
    }
    setActive(null);
  };

  return (
    <div className="mb-4 lg:container">
      <div className="text-center">
        <h2 className="text-[25px] font-Inter mb-8 italic font-bold ">
          {id ? "Update Blog" : "Create Blog"}
        </h2>
      </div>
      <div className="lg:ml-[270px] md:w-fit lg:w-[50%] items-center justify-center ">
        <form
          className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md "
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Title"
              name="title"
              value={title}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <ReactTagInput
              tags={tags}
              placeholder="Tags"
              onChange={handleTags}
            />
          </div>

          <div className="mb-6">
            <select
              value={category}
              onChange={onCategoryChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value={categoryOption}>Choose a category</option>
              {categoryOption.map((option, i) => {
                return (
                  <option value={option || ""} key={i}>
                    {option}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="mb-6">
            <textarea
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your description"
              value={description}
              name="description"
              onChange={handleChange}
            />
          </div>
          <UploadFile setProgress={setProgress} setForm={setForm} />
          <div className="flex items-center justify-center">
            <button
              className="text-white hover:duration-300 bg-black hover:bg-white hover:text-black font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 border-[2px] "
              type="submit"
              disabled={(progress !== null) & (progress < 100)}
            >
              {id ? "Update" : "Send"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditBlog;

AddEditBlog.propTypes = {
  setActive: PropTypes.func,
};
