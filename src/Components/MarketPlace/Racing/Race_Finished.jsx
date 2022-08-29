import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Race_Finished({ scoring }) {
    const [FirstPosition, setFirstPosition] = useState()
    const [SecondPositopn, setSecondPositopn] = useState()
    const [ThirdPosition, setThirdPosition] = useState()

    var date = new Date();
	var current_date =  date.getDate()+"-"+(date.getMonth()+1)+"-"+ date.getFullYear();
    
    
    const enableRace = async () => {
        try {
            console.log("scoring", scoring);
            await axios.get("https://pegxy-api-server.herokuapp.com/enableRace");
        } catch (error) {
            console.error("error while enable race", error);
        }
    }
    const positionData = async () => {
        try {
            let array_length = scoring.length;
            for (let index = 0; index < array_length; index++) {
                let element = scoring[index];
                if (element.poition == 1) {
                    setFirstPosition(element)
                } else if (element.poition == 2) {
                    setSecondPositopn(element)
                } else if (element.poition == 3) {
                    setThirdPosition(element)
                }
            }

        } catch (e) {
            console.log("Error while calling positionData Fuction", e);
        }
    }


    useEffect(() => {
        positionData()
        enableRace()
    }, [])

    return (
        <div className='main_div_app'>

            <div class="container">
                <div class="bx-view">
                    <div class="bx-full">
                        <div class="bx-header finish">
                            <div class="header-inner">
                                <div class="header-title ">
                                    <span>Finished</span>
                                </div>
                                {/* <div class="header-match">
                                    <div class="viewTable">
                                        <div class="tableContent">
                                            <div class="item-content disable">
                                                <div class="item-title no-border event">Race</div>
                                                <div class="item-title no-border class">
                                                    <div class="class-pega class-4">Class 4</div>
                                                </div>
                                                <div class="item-title no-border distance">3000m</div>
                                                <div class="item-title no-border date">{current_date}</div>
                                                <div class="item-title no-border prizepool visoff">
                                                    <span>1550</span>
                                                    <div style={{ marginLeft: "5px" }}>
                                                        <span style={{ boxSizing: "border-box", display: "inline-block", overflow: "hidden", width: "18px", height: "18px", background: "none", opacity: "1", border: "0px", margin: "0px", padding: "0px", position: "relative" }}>
                                                            <img alt="" src="https://cdn.pegaxy.io/statics/play/public/v5/images/coin/VIS_OFF.png" decoding="async" data-nimg="fixed" style={{ position: "absolute", inset: "0px", boxSizing: "border-box", padding: "0px", border: "none", margin: "auto", display: "block", width: "0px", height: "0px", minWidth: "100%", maxWidth: "100%", minHeight: "100%", maxHeight: "100%" }} />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}

                            </div>
                        </div>
                        <div class="bx-content finish">
                            <div class="inner-content">
                                <div class="viewLeaderboard">
                                    <div class="top-position">
                                        <div class="top-inner">
                                            <div class="item-top position-2">
                                                <div class="position-inner Second_Winner" >
                                                    <div class="item-id">{`${SecondPositopn?.poition}nd`}</div>
                                                    <div class="item-header">
                                                        <div class="item-location">{SecondPositopn?.name}</div>
                                                        <div class="item-position">
                                                            {/* <span class="item-position-name">00:31.242</span> */}
                                                        </div>
                                                    </div>
                                                    <div class="item-cover">
                                                        <span style={{ boxSizing: "border-box", display: "inline-block", overflow: "hidden", width: "230px", height: "230px", background: "none", opacity: "1", border: "0px", margin: "0px", padding: "0px", position: "relative" }} >
                                                            <img alt="" src="https://cdn.pegaxy.io/data/pega-avatar/1659081379885.png" decoding="async" data-nimg="fixed" class="item-cover-img" style={{ position: "absolute", inset: "0px", boxSizing: "border-box", padding: "0px", border: "none", margin: "auto", display: "block", width: "0px", height: "0px", minWidth: "100%", maxWidth: "100%", minHeight: "100%", maxHeight: "100%" }} /><noscript></noscript>
                                                        </span>
                                                    </div>
                                                    <div class="item-symbol">
                                                        {/* <span class="item-symbol-nums">388</span> */}
                                                        <span style={{ boxSizing: "border-box", display: "inline-block", overflow: "hidden", width: "24px", height: "24px", background: "none", opacity: "1", border: "0px", margin: "0px", padding: "0px", position: "relative" }}>
                                                            <img alt="" src="https://cdn.pegaxy.io/statics/play/public/v5/images/symbol/visoff.png" decoding="async" data-nimg="fixed" class="item-symbol-img" style={{ position: "absolute", inset: "0px", boxSizing: "border-box", padding: "0px", border: "none", margin: "auto", display: "block", width: "0px", height: "0px", minWidth: "100%", maxWidth: "100%", minHeight: "100%", maxHeight: "100%" }} /><noscript></noscript>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="item-top position-1">
                                                <div class="position-inner first_winner" >
                                                    <div class="item-id">{`${FirstPosition?.poition}st`}</div>
                                                    <div class="item-header">
                                                        <div class="item-location">{FirstPosition?.name}</div>
                                                        <div class="item-position">
                                                            {/* <span class="item-position-name">00:31.241</span> */}
                                                        </div>
                                                    </div>
                                                    <div class="item-cover">
                                                        <span style={{ boxSizing: "border-box", display: "inline-block", overflow: "hidden", width: "230px", height: "230px", background: "none", opacity: "1", border: "0px", margin: "0px", padding: "0px", position: "relative" }} >
                                                            <img alt="" src="https://cdn.pegaxy.io/data/pega-avatar/1659248327294.png" decoding="async" data-nimg="fixed" class="item-cover-img" style={{ position: "absolute", inset: "0px", boxSizing: "border-box", padding: "0px", border: "none", margin: "auto", display: "block", width: "0px", height: "0px", minWidth: "100%", maxWidth: "100%", minHeight: "100%", maxHeight: "100%" }} />
                                                            <noscript></noscript>
                                                        </span>
                                                    </div>
                                                    <div class="item-symbol">
                                                        {/* <span class="item-symbol-nums">930</span> */}
                                                        <span style={{ boxSizing: "border-box", display: "inline-block", overflow: "hidden", width: "24px", height: "24px", background: "none", opacity: "1", border: "0px", margin: "0px", padding: "0px", position: "relative" }}>
                                                            <img alt="" src="https://cdn.pegaxy.io/statics/play/public/v5/images/symbol/visoff.png" decoding="async" data-nimg="fixed" class="item-symbol-img" style={{ position: "absolute", inset: "0px", boxSizing: "border-box", padding: "0px", border: "none", margin: "auto", display: "block", width: "0px", height: "0px", minWidth: "100%", maxWidth: "100%", minHeight: "100%", maxHeight: "100%" }} />
                                                            <noscript></noscript>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="item-top position-3">
                                                <div class="position-inner Third_winner" >
                                                    <div class="item-id">{`${ThirdPosition?.poition}rd`}</div>
                                                    <div class="item-header">
                                                        <div class="item-location">{ThirdPosition?.name}</div>
                                                        <div class="item-position">
                                                            {/* <span class="item-position-name">00:31.243</span> */}
                                                        </div>
                                                    </div>
                                                    <div class="item-cover">
                                                        <span style={{ boxSizing: "border-box", display: "inline-block", overflow: "hidden", width: "230px", height: "230px", background: "none", opacity: "1", border: "0px", margin: "0px", padding: "0px", position: "relative" }} >
                                                            <img alt="" src="https://cdn.pegaxy.io/data/pega-avatar/1659270437074.png" decoding="async" data-nimg="fixed" class="item-cover-img" style={{ position: "absolute", inset: "0px", boxSizing: "border-box", padding: "0px", border: "none", margin: "auto", display: "block", width: "0px", height: "0px", minWidth: "100%", maxWidth: "100%", minHeight: "100%", maxHeight: "100%" }} />
                                                            <noscript></noscript>
                                                        </span>
                                                    </div>
                                                    <div class="item-symbol">
                                                        {/* <span class="item-symbol-nums">232</span> */}
                                                        <span style={{ boxSizing: "border-box", display: "inline-block", overflow: "hidden", width: "24px", height: "24px", background: "none", opacity: "1", border: "0px", margin: "0px", padding: "0px", position: "relative" }}>
                                                            <img alt="" src="https://cdn.pegaxy.io/statics/play/public/v5/images/symbol/visoff.png" decoding="async" data-nimg="fixed" class="item-symbol-img" style={{ position: "absolute", inset: "0px", boxSizing: "border-box", padding: "0px", border: "none", margin: "auto", display: "block", width: "0px", height: "0px", minWidth: "100%", maxWidth: "100%", minHeight: "100%", maxHeight: "100%" }} /><noscript></noscript>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="list-action">
                                            <div class="item-button">
                                                <div class="button-game primary" style={{ height: "44px" }}>
                                                    <div class="btn-position button-game-left" style={{ width: "17.6px", height: "44px" }}>
                                                    </div>
                                                    <div class="btn-position button-game-content" style={{ height: "44px", paddingRight: "17.6px", paddingLeft: "17.6px" }}>
                                                        <div class="content-name">
                                                            <span class="content-name-title" style={{ fontSize: "18px" }}>
                                                                
                                                            <Link to="/Items/Racing_main" className='text-white text-decoration-none'>
                                                            BACK TO LOBBY

                                                            </Link>
                                                               </span>
                                                        </div>
                                                    </div>
                                                    <div class="btn-position button-game-right" style={{ width: "17.6px", height: "44px" }}>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="item-button">
                                                <div class="button-game pinks" style={{ height: "44px" }}>
                                                    <div class="btn-position button-game-left" style={{ width: "17.6px", height: "44px" }}>
                                                    </div>
                                                    <div class="btn-position button-game-content" style={{ height: "44px", paddingRight: "17.6px", paddingLeft: "17.6px" }}>
                                                        <div class="content-name">
                                                            <span class="content-name-title" style={{ fontSize: "18px" }}>
                                                            <Link to="/Items/Racing_main" className='text-white text-decoration-none'>
                                                            NEXT MATCH

                                                            </Link>
                                                                </span>
                                                        </div>
                                                    </div>
                                                    <div class="btn-position button-game-right" style={{ width: "17.6px", height: "44px" }}>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div class="list-position">
                                        <ul>

                                            {
                                                scoring.map((items, index) => {
                                                    console.log("items",items);
                                                    return (
                                                        <>
                                                            <li class="">
                                                                <div class="item-header">
                                                                    <div class="item-header-id">
                                                                        <span>{`${items?.poition}th`}</span>
                                                                    </div>
                                                                    <div class="item-header-name">{items?.name}</div>
                                                                </div>
                                                                <div class="item-info">
                                                                    <div class="item-info-meta">00:31.315</div>
                                                                </div>
                                                            </li>


                                                        </>
                                                    )
                                                })
                                            }


                                        </ul>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
