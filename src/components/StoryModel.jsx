import { ArrowLeft, Sparkle, TextInitial, Upload } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

function StoryModel({ setShowModel, fetchStories }) {
  const bgColor = [
    "#FFB300",
    "#FF0066",
    "#00C853",
    "#0091EA",
    "#6200EA",
    "#FF4081",
    "#42e0d1ff",
  ];
  const [mode, setMode] = useState("text");
  const [background, setBackground] = useState(bgColor[3]);
  const [text, setText] = useState("");
  const [media, setMedia] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handelMediaUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setMedia(file);
      setPreviewUrl(URL.createObjectURL(file));
      {
        /* It is widely used in JavaScript for previewing local files without uploading them to a server.*/
      }
    }
  };
  const handelCreateStory = async () => {};

  return (
    <div className="fixed inset-0 z-110 min-h-screen bg-black/80 backdrop-blur text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-4 flex items-center justify-between">
          <button
            onClick={() => setShowModel(false)}
            className="text-white p-2 cursor-pointer"
          >
            <ArrowLeft />
          </button>
          <h2 className="text-lg font-semibold">Create Story</h2>
          <span className="w-10"></span>
        </div>
        <div
          className="rounded-lg h-96 flex items-center justify-center relative"
          style={{ backgroundColor: background }}
        >
          {mode === "text" && (
            <textarea
              className="bg-transparent text-white w-full h-full p-6 text-lg resize-none focus:outline-none"
              placeholder="Write something..."
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
          )}
          {mode === "media" &&
            previewUrl &&
            (media?.type.startsWith("image") ? (
              <img
                src={previewUrl}
                alt="Preview"
                className="object-contain max-h-full"
              />
            ) : (
              <video src={previewUrl} className="object-contain max-h-full" />
            ))}
        </div>
        <div className="flex mt-4 gap-2">
          {bgColor.map((item) => (
            <button
              key={item}
              className="w-6 h-6 rounded-full ring cursor-pointer"
              style={{ backgroundColor: item }}
              onClick={() => setBackground(item)}
            ></button>
          ))}
        </div>
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => {
              setMode("text");
              setMedia(null);
              setPreviewUrl(null);
            }}
            className={`flex-1 flex items-center justify-center gap-2 p-2 rounded cursor-pointer ${
              mode === "text" ? "bg-white text-black" : "bg-zinc-800"
            }`}
          >
            
            <TextInitial size={18}/> Text
          </button>
          <label
            className={`flex-1 flex items-center justify-center gap-2 p-2 rounded cursor-pointer 
  ${mode === "media" ? "bg-white text-black" : "bg-zinc-800"}`}
          >
            <input
              type="file"
              accept="image/*, video/*"
              className="hidden"
              onChange={(e) => {
                handelMediaUpload(e);
                setMode("media");
              }}
            />
            <Upload size={18} /> Photo/video
          </label>
        </div>
        <button onClick={()=>toast.promise(handelCreateStory(),{
            loading:"Creating Story...",
            success:<p>Story Created Successfully</p>,
            error: e => <p>Story Creation Failed: {e.message}</p>,
        })} className="flex items-center justify-center gap-2 text-white py-3 mt-4 w-full rounded bg-gradient-to-r from-indigo-500 to-purple-600
        hover:from-indigo-600 hover:to-purple-700 active:scale-95 transition cursor-pointer">
            <Sparkle size={18}/> create Story
        </button>
      </div>
    </div>
  );
}

export default StoryModel;
