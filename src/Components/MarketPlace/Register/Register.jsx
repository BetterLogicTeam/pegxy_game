import React, { useEffect, useRef, useState } from 'react'
import './Register_styrl.css'
import Avatar from "@mui/material/Avatar";
// import { db, storageRef, storage } from "../../../firebase";
import { useSelector } from "react-redux";
// import { selectUserAddress } from "../../features/userSlice";
import { Link, useHistory, useNavigate } from "react-router-dom";
import axios from "axios";
import { useMoralis, useMoralisFile } from 'react-moralis'
import { Moralis } from 'moralis'
import { toast } from "react-toastify";
// import Loading from "../Loading/Loading";
export default function Register() {
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [bio, setBio] = useState("");
    const [twitter, setTwitter] = useState("");
    const [site, setSite] = useState("");
    const [email, setEmail] = useState("");
    const [useraddress, setuseraddress] = useState()
    //   const useraddress = useSelector(selectUserAddress);
    const history = useNavigate();
    const allInputs = { imgUrl: "" };
    const [imageAsFile, setImageAsFile] = useState("");
    const [imageAsUrl, setImageAsUrl] = useState(allInputs);
    let [isSpinner, setIsSpinner] = useState(false)

    const inputRef = useRef(null);
    const { authenticate, isAuthenticated, isAuthenticating, user, account, logout, initialize } = useMoralis();

    // const handleFireBaseUpload = () => {
    //     console.log("start of upload");
    //     // async magic goes here...
    //     if (imageAsFile === "") {
    //         console.error(`not an image, the image file is a ${typeof imageAsFile}`);
    //     }
    //     // const uploadTask = storage.ref(`/images/${useraddress}`).put(imageAsFile);

    //     //initiates the firebase side uploading
    //     // uploadTask.on(
    //     //   "state_changed",
    //     //   (snapShot) => {

    //     //   },
    //     //   (err) => {

    //     //     console.log(err);
    //     //   },
    //     //   () => {


    //     //     storageRef
    //     //       .child(`/images/${useraddress}`)
    //     //       .getDownloadURL()
    //     //       .then((fireBaseUrl) => {
    //     //         console.log(fireBaseUrl);
    //     //         db.collection("userProfile").doc(useraddress).set({
    //     //           MetamaskAddress: useraddress,
    //     //           Name: name,
    //     //           Bio: bio,
    //     //           Email: email,
    //     //           Image: fireBaseUrl,
    //     //         });
    //     //         history.push("/");
    //     //         alert("Thankyou for registration");
    //     //       });
    //     //   }
    //     // );
    // };
    const handleImageAsFile = (e) => {
        const image = e.target.files[0];
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

    useEffect(() => {
        console.log(useraddress);
    }, []);

    const handleSubmit = () => {
        // handleFireBaseUpload();
    };

    // const PostData = async () => {
    //   try {

    //     console.log("useraddress",useraddress);
    //     console.log("useraddress",name);

    //     console.log("useraddress",email);

    //     console.log("useraddress",bio);

    //     let image_here=imageAsFile.name
    //     console.log("useraddress",image_here);

    //     let res = await axios.post("https://whenftapi.herokuapp.com/update_user_profile", {
    //       "address": useraddress,
    //       "username":name ,
    //       "email": email,
    //       "bio": bio,
    //       "image": image_here
    //     })

    //     console.log("res",res);



    //   } catch (e) {
    //     console.log("Error while fatech api", e);
    //   }
    // }

    const PostData = async () => {
        try {
            setIsSpinner(true)

            await authenticate({ signingMessage: "Log in using Moralis" }
            ).then(async function (user) {
                console.log("logged in user:", user);
                const fileIpfs = new Moralis.File(name, imageAsFile)
                await fileIpfs.saveIPFS(null, { useMasterKey: true })
                console.log("Iamge", fileIpfs._ipfs);
                let image_IPFS = fileIpfs._ipfs
                let res = await axios.post("https://ule-openmarket-nft.herokuapp.com/update_user_profile", {
                    "address": useraddress,
                    "username": name,
                    "email": email,
                    "bio": bio,
                    "image": image_IPFS
                })
                console.log("res", res);

                toast.success("Thank you for registration")
                setIsSpinner(false)

                // history("/");


            })
                .catch(function (error) {
                    console.log(error);
                    setIsSpinner(false)

                });



            // console.log("res",res);
        } catch (e) {
            console.log("Error while fatech api", e);
            setIsSpinner(false)

        }
    }

    return (
        <>
            <div className='main_div_app'>

                <div class="container">
                    <div class="bx-view">
                        <div class="bx-full">
                        <div class="bx-header">
                                <div class="header-inner">
                                    <div class="header-tab center">
                                        <ul>
                                            <li class="active">
                                                <div class="item-tab">
                                                    <div class="item-tab-icon">
                                                        <div className='items_tab_inneree'>
                                                            <img alt="" src="https://cdn.pegaxy.io/statics/play/v9/images/icon/ic_item.png" decoding="async" data-nimg="fixed" className='items_img_here' />
                                                            <noscript></noscript>
                                                        </div>
                                                    </div>
                                                    <Link to="/Items/Mint" className='text_de'>

                                                        <span class="item-tab-title active">MINT</span>
                                                    </Link>
                                                </div>
                                            </li>
                                            <li class="">
                                                <div class="item-tab ">
                                                    <div class="item-tab-icon">
                                                        <div className='items_tab_inneree'>
                                                            <img alt="" src="https://cdn.pegaxy.io/statics/play/v9/images/icon/ic_item.png" decoding="async" data-nimg="fixed" className='items_img_here' />
                                                            <noscript></noscript>
                                                        </div>
                                                    </div>
                                                    <Link to="/Items/My_Items" className='text_de'>

                                                        <span class="item-tab-title ">COLLECTION</span>
                                                    </Link>
                                                </div>
                                            </li>
                                            {/* <li class="">
                                                <div class="item-tab">
                                                    <div class="item-tab-icon">
                                                        <div className='items_tab_inneree'>
                                                            <img alt="" src="https://cdn.pegaxy.io/statics/play/v9/images/icon/ic_tickets.png" decoding="async" data-nimg="fixed" className='items_img_here' />
                                                            <noscript></noscript>
                                                        </div>
                                                    </div>
                                                    <Link to="/My_Bids" className='text_de'>
                                                        <span class="item-tab-title ">My Bids</span>

                                                    </Link>
                                                </div>
                                            </li> */}
                                            <li class="">
                                                <div class="item-tab">
                                                    <div class="item-tab-icon">
                                                        <div className='items_tab_inneree'>
                                                            <img alt="" src="https://cdn.pegaxy.io/statics/play/v9/images/icon/ic_tickets.png" decoding="async" data-nimg="fixed" className='items_img_here' />
                                                            <noscript></noscript>
                                                        </div>
                                                    </div>
                                                    <Link to="/Items/My_Profile" className='text_de'>

                                                        <span class="item-tab-title">My Profit</span>
                                                    </Link>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="bx-content default  minting_hereeeee">
                                <div class="inner-content minting_page">

                                        <div className="editProfile">
                                 
                                            {/* {useraddress && ( */}
                                                <>
                                                    <div className="editProfile__container1">
                                                        <h1 className="editProfile__text">Registration</h1>
                                                        <div className="form">
                                                            <form>
                                                                <div className="form__content">
                                                                    <h4 className="form__text">User Name</h4>
                                                                    <input
                                                                        value={name}
                                                                        onChange={handleName}
                                                                        className="form__input ps-4"
                                                                        required
                                                                    />
                                                                </div>

                                                                <div className="form__content">
                                                                    <h4 className="form__text">Information</h4>
                                                                    <input
                                                                        value={bio}
                                                                        onChange={handleBio}
                                                                        className="form__input ps-4"
                                                                        required
                                                                    />
                                                                </div>

                                                                <div className="form__content">
                                                                    <h4 className="form__text">Email</h4>
                                                                    <input
                                                                        value={email}
                                                                        onChange={handleEmail}
                                                                        className="form__input ps-4" 
                                                                        required
                                                                    />
                                                                </div>
                                                            </form>

                                                            <div className="form__verification">
                                                               
                                                                <button onClick={() => PostData()} className="editProfile__button">
                                                                    Register
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="editProfile__container2">
                                                        <Avatar
                                                            alt="image tag"
                                                            src={imageAsFile ? URL.createObjectURL(imageAsFile) : null}
                                                            // src="images/Xyrenne-Eustaquio.png"

                                                            sx={{ width:'250px', height: '250px' }}
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
                                                        >
                                                            Add profile picture
                                                        </button>
                                                    </div>
                                                </>

                                            {/* )} */}

                                        </div>

                                    </div>
                                </div>
                            </div>



                        </div>
                    </div>
                </div>
            {/* </div> */}


        </>
    )
}


