import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { Footer } from "../sections";
import { db } from "../firebase/firebase";
import { toast } from "sonner";
import Preload from "../components/Preload";
import BlogSection from "../sections/BlogSection";

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
      toast.success("Deleted blog successfully");

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container lg:mt-[80px]">
        <div className="pb-[94px]">
          <h1 className="lg:max-w-[1200px] md:max-w-[250px]  md:text-[45px] lg:text-[97px] font-light lg:leading-[110px] md:overflow-hidden">
            <strong className="lg:w-[760px] md:w-[420px] lg:text-[92px] md:text-[52px] font-bold">
              Hey, we&apos;re Bloger
            </strong>
            .Let see Stories
          </h1>
        </div>
        <div className="border-b-2 border-spacing-36"></div>
        <div>
          <div className="lg:pt-[15px]">
            {loading ? (
              <div className="flex items-center justify-center">
                <span>
                  <Preload />
                </span>
              </div>
            ) : (
              <BlogSection
                filteredBlog={filteredBlog}
                handleDelete={handleDelete}
              />
            )}
          </div>

          <div className="flex items-center mt-12 md:mt-6 lg:flex-row md:flex-col lg:justify-center">
            <div className="mb-12 lg:gap-3 lg:flex md:mb-16">
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
