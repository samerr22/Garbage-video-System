import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate, useParams } from "react-router-dom";

export default function Updateinfo() {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  console.log(formData);

  const navigate = useNavigate();

  const { infooId } = useParams();

  useEffect(() => {
    try {
      const fetchInfo = async () => {
        const res = await fetch(`/api/Info/getinfo?InfoId=${infooId}`);
        const data = await res.json();
        console.log("data", data);

        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          const selectedInfo = data.infoo.find(
            (infooo) => infooo._id === infooId
          );
          if (selectedInfo) {
            setFormData(selectedInfo);
          }
        }
      };
      fetchInfo();
    } catch (error) {
      console.log(error.message);
    }
  }, [infooId]);

  const handleUploadVideo = async () => {
    try {
      if (!file) {
        setUploadError("Please select a video");
        return;
      }
      setUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setUploadError("Video upload failed");
          setUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUploadProgress(null);
            setUploadError(null);
            setFormData({ ...formData, video: downloadURL });
          });
        }
      );
    } catch (error) {
      setUploadError("Video upload failed");
      setUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/Info/updatee/${formData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/`);
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#409649] to-[#409649] via-blue-200">
      <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className="text-center text-3xl my-7 font-semibold">Hy Admin</h1>
        <h1 className="text-center text-3xl my-7 font-semibold">
          Update video
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <input
              type="text"
              placeholder="Name"
              required
              id="name"
              className="flex-1 bg-slate-100 p-3 rounded-lg w-[460px] h-11"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              value={formData.name}
            />
          </div>
          <div className="flex gap-4 items-center justify-between border-4 border-none p-3">
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="border border-gray-300 bg-white rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
            />
            <button
              type="button"
              className=" w-40 h-10 rounded-lg  bg-green-500 hover:bg-green-700 text-white hover:opacity-90"
              size="sm"
              onClick={handleUploadVideo}
              disabled={uploadProgress}
            >
              {uploadProgress ? (
                <div className="w-16 h-16">
                  <CircularProgressbar
                    value={uploadProgress}
                    text={`${uploadProgress || 0}%`}
                  />
                </div>
              ) : (
                "Upload Video"
              )}
            </button>
          </div>
          {uploadError && (
            <p className="mt-5 text-red-600 bg-red-300 w-300 h-7 rounded-lg text-center ">
              {uploadError}
            </p>
          )}
          {formData.video && (
            <video
              controls
              src={formData.video}
              className="w-full h-72 object-cover"
            />
          )}

          <div className="flex gap-4">
            <textarea
              type="text"
              placeholder="description"
              required
              id="  description"
              maxLength={40}
              className="flex-1 bg-slate-100 p-3 rounded-lg w-[460px] h-11"
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              value={formData.description}
            />
          </div>

          <button
            type="submit"
            className="  hover:underline bg-green-500 hover:bg-green-700 text-white p-3 rounded-lg w-[460px] h-11 hover:opacity-90 lg:w-full"
          >
            Update video
          </button>
          {publishError && (
            <p className="mt-5 text-red-600 bg-red-300 w-300 h-7 rounded-lg text-center ">
              {publishError}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
