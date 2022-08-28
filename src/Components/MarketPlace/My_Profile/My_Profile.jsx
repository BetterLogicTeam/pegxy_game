import Avatar from "@mui/material/Avatar";
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loadWeb3 } from '../../../apis/api';
// import './User_Profile.css'

export default function My_Profile({ setModalShow, btnTxt }) {
    const history = useNavigate();
    const [value, setValue] = useState("1");
    const [userData, setUserData] = useState(null);
    const [nftData, setNftData] = useState(null);
    const [source, setSource] = useState([]);
    let [isSpinner, setIsSpinner] = useState(false)
    const [useraddress, setuseraddress] = useState()

    const Fatchdata = async () => {

        let acc = await loadWeb3()
        setuseraddress(acc)
        try {


            console.log("useraddress", acc);
            let res = await axios.post("https://ule-openmarket-nft.herokuapp.com/get_user_profile", {
                "address": acc

            })
            setUserData(res.data.data[0])
            console.log("res", res);



        } catch (e) {
            console.log("Error while fatech api", e);
        }
    }


    useEffect(() => {
        Fatchdata()
        // PostData()
    }, []);
    return (
        <div>

            <div className='main_div_app'>
                <div class="container">
                    <div class="bx-view">
                        <div class="bx-full">
                            <div class="bx-header">
                                <div class="header-inner">
                                    <div class="header-tab center">
                                        <ul>
                                            <li class="">
                                                <div class="item-tab">
                                                    <div class="item-tab-icon">
                                                        <div className='items_tab_inneree'>
                                                            <img alt="" src="https://cdn.pegaxy.io/statics/play/v9/images/icon/ic_item.png" decoding="async" data-nimg="fixed" className='items_img_here' />
                                                            <noscript></noscript>
                                                        </div>
                                                    </div>
                                                    <Link to="/Items/Mint" className='text_de'>

                                                        <span class="item-tab-title">MINT</span>
                                                    </Link>
                                                </div>
                                            </li>
                                            <li class="">
                                                <div class="item-tab">
                                                    <div class="item-tab-icon">
                                                        <div className='items_tab_inneree'>
                                                            <img alt="" src="images/ic_item.png" decoding="async" data-nimg="fixed" className='items_img_here' />
                                                            <noscript></noscript>
                                                        </div>
                                                    </div>
                                                    <Link to="/Items/My_Items" className='text_de'>

                                                        <span class="item-tab-title">Collection</span>
                                                    </Link>
                                                </div>
                                            </li>
                                            {/* <li class="">
                                                <div class="item-tab">
                                                    <div class="item-tab-icon">
                                                        <div className='items_tab_inneree'>
                                                            <img alt="" src="images/ic_tickets.png" decoding="async" data-nimg="fixed" className='items_img_here' />
                                                                <noscript></noscript>
                                                        </div>
                                                    </div>
                                                    <Link to="/My_Bids" className='text_de'>
                                                <span class="item-tab-title">My Bids</span>

                                                </Link>
                                                </div>
                                            </li> */}
                                            <li class="active">
                                                <div class="item-tab">
                                                    <div class="item-tab-icon">
                                                        <div className='items_tab_inneree'>
                                                            <img alt="" src="images/ic_tickets.png" decoding="async" data-nimg="fixed" className='items_img_here' />
                                                            <noscript></noscript>
                                                        </div>
                                                    </div>
                                                    <Link to="/Items/My_Profile" className='text_de'>

                                                        <span class="item-tab-title active">My Profit</span>
                                                    </Link>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="bx-content default">
                                <div class="inner-content">
                                    <div class="my-profit">
                                       

                                        <div class="content-profit">
                                            <div class="table-profit" style={{ height: "70vh", overflowY: "scroll" }}>
                                                <div className="userProfile pt-5 ps-5">
                                                    <div className="overlay"></div>


                                                    <div className="userProfile__container1 position-relative pb-5 mt-5 ">

                                                        <div className="container1__part2 ">
                                                            <div className="content__1 text-white">
                                                                <h3>{userData?.username || "User Name"}</h3>
                                                                <p>{userData?.bio || "Bio"}</p>
                                                            </div>

                                                            <div className="content__2 text-white">
                                                                <p>{userData?.address || "Address"}</p>
                                                                {useraddress && (
                                                                    <button
                                                                        onClick={() => {
                                                                            history("/Items/Edit_UserProfile");
                                                                        }}
                                                                        className="edit__button fs-5 "
                                                                        style={{ width: "12rem" }}
                                                                    >
                                                                        Edit Profile
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>


                                                </div>
                                            </div>
                                            <div class="info-profit">
                                                <Avatar
                                                    alt=""
                                                    src={userData?.image || "/static/images/avatar/1.jpg"}
                                                    sx={{ width: 280, height: 280 }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>


        </div>
    )
}
