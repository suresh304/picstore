import React, { useContext, useEffect, useState } from "react";
import { signOut } from "firebase/auth";

import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { auth, storage } from "../firebase";
import { authContext } from "../context/authContext";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../slices/authSlice";
const Home = () => {
  const [img, setImg] = useState();
  const user_rdx = JSON.parse(useSelector((state) => state.user));
  const [imgUrl, setImgUrl] = useState([]);
  const dispatch = useDispatch();
  const handleUpload = () => {
    if (img != null) {
      const imageRef = ref(storage, `${user_rdx.uid}/${new Date()}`);
      uploadBytes(imageRef, img).then((val) => {
        getDownloadURL(val.ref).then((url) =>
          setImgUrl((data) => [...data, url])
        );
      });
    }
  };

  const signoutHandler = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch(removeUser());

        localStorage.setItem("user", "");
      })
      .catch((error) => {});
  };

  useEffect(() => {
    const fetchData = async () => {
      let data = await listAll(ref(storage, user_rdx?.uid));
      let urls = [];
      data?.items.forEach((img) => {
        getDownloadURL(img).then((url) => setImgUrl((data) => [...data, url]));
      });
    };
    fetchData();
  }, []);

  return (
    <div>
      <button onClick={signoutHandler}>Logout</button>
      <input
        type="file"
        className="mx-auto rounded-sm"
        onChange={(e) => setImg(e.target.files[0])}
      />
      <button onClick={handleUpload}>Upload</button>
      <div className="flex flex-row flex-wrap">
        {imgUrl?.map((val, ind) => (
          <img key={ind} src={val} className="w-96 h-96 p-2 rounded-lg" />
        ))}
      </div>
    </div>
  );
};

export default Home;
