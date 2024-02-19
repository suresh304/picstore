import React, { useContext, useEffect, useState } from "react";
import {  signOut } from "firebase/auth";


import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { auth, storage } from "../firebase";
import { authContext } from "../context/authContext";
const Home = () => {
  const [img, setImg] = useState();
  const [imgUrl, setImgUrl] = useState([]);
  const {user,setUser} = useContext(authContext)
  console.log("userrrr",user.uid)
  const handleUpload = () => {
    if (img != null) {
      const imageRef = ref(storage, `${user.uid}/${new Date()}`);
      uploadBytes(imageRef, img).then(val=>{
        console.log(val)
        getDownloadURL(val.ref).then((url) => setImgUrl(data=>[...data,url]));
      
      });
    }
  };

  const signoutHandler = ()=>{

signOut(auth).then(() => {
  // Sign-out successful.
  console.log("sign out successful")
  setUser(null)
}).catch((error) => {
 
});
  }

  useEffect(() => {
    const fetchData = async () => {
      let data = await listAll(ref(storage, user.uid));
      let urls=[]
      data?.items.forEach((img) => {
      
        getDownloadURL(img).then((url) => setImgUrl(data=>[...data,url]));
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
      {console.log(imgUrl)}
      <div className="flex flex-row flex-wrap">
      {imgUrl?.map((val,ind) => (
        <img key={ind} src={val} className="w-96 h-96 p-2 rounded-lg"/>
      ))}
      </div>
    </div>
  );
};

export default Home;
