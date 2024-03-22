import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);

  const [info, setinfo] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [infoId, setinfoId] = useState("");

  console.log("arra", info);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await fetch(`/api/Info/getinfo`);
        const data = await res.json();
        console.log(data);

        if (res.ok) {
          setinfo(data.infoo);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchInfo();
  }, []);

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/Info/deleted/${infoId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setinfo((prev) => prev.filter((infooo) => infooo._id !== infoId));
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div className=" bg-gradient-to-r from-[#409649] to-[#409649] via-white w-full">
        <div className="flex justify-center items-center gap-4">

        <Link to={"/Blog"}>
                <div className="flex justify-center items-center  mt-4">
                  <button
                    className="hidden sm:inline  hover:underline bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4  rounded-full"
                    type="button"
                   
                  >
                    blog
                  </button>
                </div>
              </Link>

          {currentUser?.isAdmin && (
            <>
              <Link to={"/create-post"}>
                <div className="flex justify-center items-center gap-2 mt-4">
                  <button
                    className="hidden sm:inline  hover:underline bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4  rounded-full"
                    type="button"
                 
                  >
                    Add new video
                  </button>
                </div>
              </Link>
            </>
          )}
        </div>

        <div className="flex justify-center">
          <div className="flex flex-wrap justify-center">
            {info && info.length > 0 ? (
              <>
                {info.slice(0, showMore ? info.length : 3).map((infooo) => (
                  <div
                    key={infooo._id}
                    className="w-[380px] h-[300px]  mt-10 mb-40 gap-10 rounded  shadow-xl "
                  >
                    <div className="px-6 py-4">
                      <video className="w-[300px] h-[200px]" controls>
                        <source src={infooo.video} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      <div className="font-bold text-xl mb-2 truncate">
                        {infooo.name}
                      </div>

                      <div className="text-gray-700  max-w-[200px] break-words truncate">
                        {infooo.description}
                      </div>

                      {currentUser?.isAdmin && (
                        <>
                          <div className="flex justify-center items-center gap-8 mt-8">
                            <Link
                              to={`/update-info/${infooo._id}`}
                              className="hidden sm:inline  hover:underline bg-green-500 hover:bg-green-700 text-white font-bold  py-2 px-4  rounded-full cursor-pointer"
                            >
                              Edit
                            </Link>
                            <div>
                              <span
                                onClick={() => {
                                  setinfoId(infooo._id);
                                  handleDelete();
                                }}
                                className="hidden sm:inline  hover:underline bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4  rounded-full cursor-pointer"
                              >
                                Delete
                              </span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}

                {!showMore && info.length > 3 && (
                  <div className="mt-4 md:hidden sm:hidden lg:block mb-4 ml-[60px]">
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold rounded"
                      onClick={() => setShowMore(true)}
                    >
                      Show More
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p>No Video</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
