import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useMoralis, useMoralisFile } from 'react-moralis'
import { Moralis } from 'moralis'
import Avatar from "@mui/material/Avatar";
import { toast } from "react-toastify";
import { loadWeb3 } from '../../../apis/api';


export default function Edit_UserProfile() {
    const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [bio, setBio] = useState("");
  const [twitter, setTwitter] = useState("");
  const [site, setSite] = useState("");
  const [email, setEmail] = useState("");
  const [useraddress, setuseraddress] = useState()

  const history = useNavigate();
  const inputRef = useRef();
  const allInputs = { imgUrl: "" };
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);
  let [isSpinner, setIsSpinner] = useState(false)

  const { authenticate, isAuthenticated, isAuthenticating, user, account, logout, initialize } = useMoralis();

  
  const handleImageAsFile = (e) => {
    const image = e.target.files[0];
    console.log("image",image);
    setImageAsFile(image);
  };

  const handleName = (e) => {
    setName(e.target.value);
    console.log(name);
  };
  const handleUrl = (e) => {
    setUrl(e.target.value);
  };
  const handleBio = (e) => {
    setBio(e.target.value);
  };
  const handleTwitter = (e) => {
    setTwitter(e.target.value);
  };
  const handleSite = (e) => {
    setSite(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  useEffect( async() => {
 
    setuseraddress(await loadWeb3())
    
  }, []);

 
  const PostData = async () => {
    try {
      setIsSpinner(true)
      await authenticate({ signingMessage: "Log in using Moralis" }
      ).then(async function (user) {
        console.log("logged in user:", user);
        const fileIpfs = new Moralis.File(name, imageAsFile)
        await fileIpfs.saveIPFS(null, { useMasterKey: true })
        console.log("Iamge", fileIpfs._ipfs);
        let image_IPFS=fileIpfs._ipfs
        try{
          let res = await axios.post("https://ule-openmarket-nft.herokuapp.com/update_user_profile", {
            "address": useraddress,
            "username":name ,
            "email": email,
            "bio": bio,
            "image": image_IPFS
          })
        // console.log("res",res);
        
        
        toast.success("Your profile is updated")
        setIsSpinner(false)
        
        history.push("/");
        }catch(e){
      setIsSpinner(false)

          console.log("User Updated API Error",e);
        }
       
       

      })
        .catch(function (error) {
          console.log(error);
      setIsSpinner(false)

        });

    

      // console.log("res",res);
    } catch (e) {
      console.log("Error while fatech api", e);
    }
  }

  return (
    <div className="editProfile">
        <div className="overlay"></div>
       

      <div className="editProfile__container1 position-relative">
        <h1 className="editProfile__text">Edit Profile</h1>
        <div className="form">
          <div className="form__content">
            <h4 className="form__text">User Name</h4>
            <input value={name} onChange={handleName} className="form__input" />
          </div>
          {/* <div className="form__content">
            <h4 className="form__text">Custom Url</h4>
            <input value={url} onChange={handleUrl} className="form__input" />
          </div> */}
          <div className="form__content">
            <h4 className="form__text">Information</h4>
            <input value={bio} onChange={handleBio} className="form__input" />
          </div>
          {/* <div className="form__content">
            <h4 className="form__text">Twitter Username</h4>
            <input
              value={twitter}
              onChange={handleTwitter}
              className="form__input"
            />
          </div> */}
          {/* <div className="form__content">
            <h4 className="form__text">Personal Site or Portfolio</h4>
            <input value={site} onChange={handleSite} className="form__input" />
          </div> */}
          <div className="form__content">
            <h4 className="form__text">Email</h4>
            <input
              value={email}
              onChange={handleEmail}
              className="form__input"
            />
          </div>
          <div className="form__verification">
            {!useraddress ? (
              <button
                onClick={() => alert("Sign In with MetaMask")}
                className="editProfile__button"
              >
                Save Profile
              </button>
            ) : (
              <button 

              onClick={()=>PostData()}
              // onClick={handleEdit} 
              
              className="editProfile__button">
                Save Profile
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="editProfile__container2 position-relative">
        <Avatar
          alt=""
          src={imageAsFile ? URL.createObjectURL(imageAsFile) : null}
          sx={{ width: 250, height: 250 }}
        />
        <input
          className="img__input"
          onChange={handleImageAsFile}
          type="file"
          ref={inputRef}
          style={{ display: "none" }}
        />
        <button
          onClick={() => {
            inputRef.current.click();
          }}
          className="profile__button"
          style={{padding:"5px 10px"}}
        >
          Change profile picture
        </button>
      </div>
    </div>
  )
}
