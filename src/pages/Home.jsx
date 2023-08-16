import { useEffect, useState } from "react";
import Footer from "../layouts/Footer";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";
import BlogSection from "../layouts/BlogSection";
import { toast } from "react-toastify";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);
  const [filterWord, setFilterWord] = useState([]);
  const [filteredBlog, setFilteredBlog] = useState([]);

  const filterLabel = (tag) => {
    if (filterWord.includes(tag)) {
      setFilterWord(filterWord.filter((filter) => filter !== tag));
    } else {
      setFilterWord([...filterWord, tag]);
    }
  };

  useEffect(() => {
    if (filterWord.length > 0) {
      const filtered = blogs.filter((blog) => {
        return filterWord.every((filter) => blog.tags.includes(filter));
      });
      setFilteredBlog(filtered);
    } else {
      setFilteredBlog(blogs);
    }
  }, [filterWord, blogs]);

  useEffect(() => {
    let unsubscribe;
    const fetchBlogs = () => {
      setLoading(true);
      unsubscribe = onSnapshot(
        collection(db, "blogs"),
        (querySnapshot) => {
          let list = [];
          let tags = [];
          querySnapshot.forEach((doc) => {
            tags.push(...doc.get("tags"));
            list.push({ id: doc.id, ...doc.data() });
          });
          const uniqueTags = [...new Set(tags)];
          setTags(uniqueTags);
          setBlogs(list);
          setLoading(false);
        },
        (error) => {
          console.log(error);
        }
      );
    };
    fetchBlogs();
    return () => {
      return unsubscribe();
    };
  }, []);

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await deleteDoc(doc(db, "blogs", id));
      toast.success("Blog delete successfully");

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container mt-[80px]">
        <div className="pb-[130px]">
          <h1 className="max-w-[1381px] text-[92px] font-light leading-[110px]">
            <strong className="w-[760px] text-[92px] font-bold">
              Hey, we&apos;re Bloger
            </strong>
            .Let see Stories
          </h1>
        </div>
        <div className="border-b-2 border-spacing-36"></div>
        <div>
          <div className="pt-[15px]">
            {loading ? (
              <div className="flex items-center justify-center">
                <img src="/images/loading.gif" alt="Loading" />
              </div>
            ) : (
              <BlogSection
                filteredBlog={filteredBlog}
                handleDelete={handleDelete}
              />
            )}
          </div>

          <div className="flex flex-col items-center mt-12">
            <div className="flex gap-3 mb-12">
              {tags.map((tag, index) => {
                return (
                  <button
                    className={`${
                      filterWord.includes(tag)
                        ? "label  transition-all duration-300 "
                        : "label-selected  transition-all duration-300 "
                    }`}
                    key={index}
                    onClick={() => filterLabel(tag)}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
