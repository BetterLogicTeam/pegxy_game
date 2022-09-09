import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar_nav from '../Navbar_market/Navbar_nav'
import './Horse_style.css'
import horse from '../../../Assest/home_horse.png'
import horsegif from '../../../Assest/horse.gif'
import first from '../../../Assest/horse1.gif'
import Second from '../../../Assest/horse2.gif'
import third from '../../../Assest/horse3.gif'
import moment from 'moment';
// moment().format();

import { loadWeb3 } from '../../../apis/api';
import { raceContractABI, raceContractAddress } from '../../../utilies/constant';
import axios from 'axios'
const race = horsegif
// const race1 = "https://cdn.Wire NFT.io/statics/web/race_1.webp";
// const race2 = "https://cdn.Wire NFT.io/statics/web/race_2.webp";
// const race3 = "https://cdn.Wire NFT.io/statics/web/race_3.webp";


const race1 = first;
const race2 = Second;
const race3 = third;

export default function Horse_Racing({ setModalShow, btnTxt, setScoring }) {
    let simpleArray = []
    const navigate = useNavigate()
    const [myArr, setmyArr] = useState([])
    const [array] = React.useState([1, 2, 3, 4, 5]);
    const [displayArray, setDisplayArray] = React.useState([]);
    const [raceArray, setRaceArray] = React.useState([])
    const [displayEl, setDisplayEl] = React.useState([]);
    const [Itemcount, setItemcount] = useState(1)
    const [isChaling, setIsChaling] = useState(true);
    const [finishLine, setFinishLine] = useState(false);
    const  [raceMeter, setRaceMeter]=useState(false)
    const [isRace, setIsRace] = useState(false)
    let [isLine, setIsLine] = useState(false)
    let [startTime, setStartTime] = useState({
        sec: 0,
        milSec: 0,
    })
    var date = new Date();
	var current_date =  date.getDate()+"-"+(date.getMonth()+1)+"-"+ date.getFullYear();

    let ImageArray = [
        {
            Image: "https://cdn.Wire NFT.io/statics/play/public/v4/images/modal/pega_run.gif",
            margin: 0,
            poition: 0,

        },
        {
            Image: "https://cdn.Wire NFT.io/statics/play/public/v4/images/modal/pega_run.gif",
            margin: 0,
            poition: 0,

        },
        {
            Image: "https://cdn.Wire NFT.io/statics/play/public/v4/images/modal/pega_run.gif",
            margin: 0,
            poition: 0,

        },
        {
            Image: "https://cdn.Wire NFT.io/statics/play/public/v4/images/modal/pega_run.gif",
            margin: 0,
            poition: 0,

        },
        {
            Image: "https://cdn.Wire NFT.io/statics/play/public/v4/images/modal/pega_run.gif",
            margin: 0,
            poition: 0,

        },
        {
            Image: "https://cdn.Wire NFT.io/statics/play/public/v4/images/modal/pega_run.gif",
            margin: 0,
            poition: 0,

        },
        {
            Image: "https://cdn.Wire NFT.io/statics/play/public/v4/images/modal/pega_run.gif",
            margin: 0,
            poition: 0,

        },
        {
            Image: "https://cdn.Wire NFT.io/statics/play/public/v4/images/modal/pega_run.gif",
            margin: 0,
            poition: 0,

        },
        {
            Image: "https://cdn.Wire NFT.io/statics/play/public/v4/images/modal/pega_run.gif",
            margin: 0,
            poition: 0,

        },
        {
            Image: "https://cdn.Wire NFT.io/statics/play/public/v4/images/modal/pega_run.gif",
            margin: 0,
            poition: 0,

        },
        {
            Image: "https://cdn.Wire NFT.io/statics/play/public/v4/images/modal/pega_run.gif",
            margin: 0,
            poition: 0,

        },
        {
            Image: "https://cdn.Wire NFT.io/statics/play/public/v4/images/modal/pega_run.gif",
            margin: 0,
            poition: 0,

        },
        {
            Image: "https://cdn.Wire NFT.io/statics/play/public/v4/images/modal/pega_run.gif",
            margin: 0,
            poition: 0,

        },
        {
            Image: "https://cdn.Wire NFT.io/statics/play/public/v4/images/modal/pega_run.gif",
            margin: 0,
            poition: 0,

        },
        // {
        //     Image: "https://cdn.Wire NFT.io/statics/play/public/v4/images/modal/pega_run.gif",
        //     margin: 0,
        //     poition: 0,

        // },

    ]
    const NameArray = [
        {
            title: "Shohei",
            Image: horse,
            margin: 0,
            poition: 0,

        },
        {
            title: "Legendaitlog",
            Image: horse,
            margin: 0,
            poition: 0,

        },
        {
            title: "TURBO DISCO",
            Image: horse,
            margin: 0,
            poition: 0,

        },
        {
            title: "Fredrick Nader",
            Image: horse,
            margin: 0,
            poition: 0,

        },
        {
            title: "JSBe E55",
            Image: horse,
            margin: 0,
            poition: 0,

        },
        {
            title: "Runblox | 155",
            Image: horse,
            margin: 0,
            poition: 0,

        },
        {
            title: "OMRICON",
            Image: horse,
            margin: 0,
            poition: 0,

        },
        {
            title: "LegendaryDog3",
            Image: horse,
            margin: 0,
            poition: 0,

        },
        {
            title: "Rose Gardner",
            Image: horse,
            margin: 0,
            poition: 0,

        },
        {
            title: "Rocky Streetrunner",
            Image: horse,
            margin: 0,
            poition: 0,

        },
        {
            title: "Jean Schoen",
            Image: horse,
            margin: 0,
            poition: 0,

        },
        {
            title: "P2PG 7",
            Image: horse,
            margin: 0,
            poition: 0,

        },
        {
            title: "Mirlind",
            Image: horse,
            margin: 0,
            poition: 0,

        },
        {
            title: "DOM PERIGNON",
            Image: horse,
            margin: 0,
            poition: 0,

        },
        {
            title: "Atlas | TCG",
            Image: horse,
            margin: 0,
            poition: 0,

        },


    ]


    const delay = (ms) =>
        new Promise((res) => {
            setTimeout(() => {
                res();
            }, ms);
        });
        const getTimeStartRace = async () => {
            try {
                    let res = await axios.get("https://pegxy-api-server.herokuapp.com/racingAddress");
                    console.log("res", res);
                    setIsLine(true);
                    setDisplayEl(res.data.raceAddresses)
                    simpleArray  =res.data.raceAddresses;
                
            } catch (error) {
                console.error("error while get time start race", error);
            }
        }
        const horseRace = () => {
            let first = "";
            let second = "";
            let third = "";
            let marginInc = 0;
            let inc = 0;
            let id = null;
            let n = 0;
            let s = 0;
            let timeIntervel = null;
            setIsRace(true);
            setIsLine(false);
            id = setInterval(async () => {
                let pos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
                let ranNums = pos.sort(() => Math.random() - 0.5);
                let arrayTest = [];
                marginInc = marginInc + 15;
                inc = inc + 15;
                if (inc <= 1050) {

                    simpleArray?.forEach((item, index)=>{
                        arrayTest.push(
                            {
                             name: item,
                            margin: (Math.random() * 10) + marginInc,
                            poition: ranNums[index]
                                    }
                        )
                    })
                    setRaceArray(arrayTest)
                    setScoring(arrayTest);
                    for (let index = 0; index < arrayTest.length; index++) {
                        let element = arrayTest[index];
                        if (element.poition == 1) {
                            first = element.name;
                        } else if (element.poition == 2) {
                            second = element.name;
                        } else if (element.poition == 3) {
                            third = element.name;
                        }
                    }
                } else {
                    setFinishLine(true)
                    clearInterval(id)
                    // await delay(2000)
                    await axios.post("https://pegxy-api-server.herokuapp.com/enableRace",{first, second, third});
                    navigate("/Items/Race_Finished")
                }
            }, 1300);
            timeIntervel = setInterval(() => {
                if (inc <= 1000) {
                    n = n + 1;
                    if (n % 1000 == 0) {
                        s = s + 1;
                        n = 0;
                    } else {
                        s = s;
                    }
                    setStartTime({
                        sec: s,
                        milSec: n,
                    })
    
                } else {
                    clearInterval(timeIntervel);
                }
            }, 1);
        }



    const raceDelay = (timeout) =>
        new Promise((res) => {
            setTimeout(async () => {
                res();
                setIsLine(false);
                horseRace();
                await delay(500);
                setIsChaling(false);
                await delay(1000);
                setRaceMeter(true)
            }, timeout);
        })

const getRaceIds  = async ()  =>{
    try{
        let timeId = null;
        timeId  = setInterval( async() => {
            let {data} = await axios.get("https://pegxy-api-server.herokuapp.com/racingAddress");
            let {raceAddresses} = data;
            // console.log("reace ids",raceAddresses );
            if(raceAddresses.length == 15){
                console.log("reace ids length",raceAddresses );
                getTimeStartRace()
                clearInterval(timeId);
                await raceDelay(2000);
            }else if(raceAddresses.length > 0 && raceAddresses.length <15 ){
                getTimeStartRace()
            }
        }, 1500);
    }catch(e){
        console.error('error while get reace id', e);
    }
}



    useEffect(() => {
        getRaceIds()
        getTimeStartRace();
        setInterval(() => {
        }, 1000);
    }, [])


    return (
        <div>
            {/* <Navbar_nav setModalShow={setModalShow} btnTxt={btnTxt} /> */}

            <div className='main_div_app'>

                <div class="container">

                    <div class="bx-view">
                        {/* <p>
                            <button onClick={() => myMove()}>Click Me</button>
                        </p> */}
                        {/* {
                            console.log("Array",myArr)
                        } */}

                        <div class="bx-left">
                            <div class="bx-header">
                                <div class="header-inner">
                                    <div class="header-title"></div>
                                    <div class="header-tab">
                                        <ul>
                                            <Link to="/Items/horse_racing">
                                                <li class="active">
                                                    <div class="item-tab">
                                                        <div class="item-tab-icon">
                                                            <div className='items_tab_inneree'>
                                                                <img alt="" src="images/ic_start_active.png" decoding="async" data-nimg="fixed" className='items_img_here' />
                                                                <noscript></noscript>
                                                            </div>
                                                        </div>
                                                        <a class="item-tab-title">Live Racing</a>

                                                    </div>
                                                </li>
                                            </Link>
                                            <Link to="/Items/Finished_race">
                                                <li class="">
                                                    <div class="item-tab">
                                                        <div class="item-tab-icon">
                                                            <div className='items_tab_inneree'>
                                                                <img alt="" src="images/ic_finish.png" decoding="async" data-nimg="fixed" className='items_img_here' />
                                                                <noscript></noscript>
                                                            </div>
                                                        </div>

                                                        <span class="item-tab-title">Finished races</span>
                                                    </div>
                                                </li>
                                            </Link>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* <h1>Hello CodeSandbox</h1>
                            {displayArray.map((elem, key) => (
                                <div key={key}>Number: {elem.title}</div>
                            ))} */}


                            <div class="bx-view">
                                <div class="bx-left">
                                    <div class="bx-header">
                                        <div class="header-inner">
                                            <div class="header-title">
                                                <div class="custom-container">
                                                    {
                                                        isRace  ?
                                                            (<>
                                                                <div class="gameState-container">
                                                                    <span>{startTime.sec}: {startTime.milSec}<div class="animate-dot">...</div>
                                                                    </span>
                                                                    {/* <span class="gameState-info">{Itemcount}/15</span> */}
                                                                </div>
                                                            </>) :
                                                            (
                                                                <>
                                                                    <div class="gameState-container">
                                                                        <span>WAITING<div class="animate-dot">...</div>
                                                                        </span>
                                                                        <span class="gameState-info">{displayEl.length}/15</span>
                                                                    </div>


                                                                </>
                                                            )

                                                    }

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="bx-content opened">
                                        <div class="inner-content">
                                            <div class="viewOpened">
                                                <div class="viewTable">
                                                    <div class="tableHeader">
                                                        <div class="header-title event">Event</div>
                                                        <div class="header-title location">Location</div>
                                                        <div class="header-title class"> Class</div>
                                                        <div class="header-title distance">Distance</div>
                                                        <div class="header-title date">Date</div>
                                                        <div class="header-title prizepool">Prizepool</div>
                                                    </div>
                                                    <div class="tableContent">
                                                        <div class="item-content disable">
                                                            <div class="item-title event">Race</div>
                                                            <div class="item-title location align-center">Wire NFT</div>
                                                            <div class="item-title class align-center">
                                                                <div class="class-pega class-4">Class 4</div>
                                                            </div>
                                                            <div class="item-title distance align-center">3000m</div>
                                                            <div class="item-title date align-center">
                                                                { current_date}
                                                            </div>
                                                            <div class="item-title prizepool visoff">
                                                                <span className='span_div' >
                                                                    <img alt="" srcset="https://cdn.Wire NFT.io/statics/play/public/v4/images/coin/VIS_OFF.png 1x, https://cdn.Wire NFT.io/statics/play/public/v4/images/coin/VIS_OFF.png 2x" src="https://cdn.Wire NFT.io/statics/play/public/v4/images/coin/VIS_OFF.png" decoding="async" data-nimg="fixed"
                                                                        className='Image_style' />
                                                                </span>
                                                                {/* <span>1550</span> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="race-container">
                                                <div class="race-view">
                                                    <div class="race-stats">
                                                        <div class="race-horse">
                                                            {


                                                                displayEl.map((items, index) => {


                                                                    // setItemcount(index)
                                                                    // console.log("Index",index);
                                                                    return (
                                                                        <>
                                                                            <div class="item-race">
                                                                                <div class="hourse-cover">
                                                                                    <div class="cover-inner" >
                                                                                    </div>
                                                                                </div>
                                                                                <div class="hourse-info" >
                                                                                    <div class="hourse-title" style={{ color: "#fff" }} title="LegendaryDog3">{items ? items.substring(0, 6) + "..." + items.substring(items.length - 6) : (<>Waiting..</>)}</div>
                                                                                    <div class="hourse-position">{index + 1}</div>
                                                                                </div>
                                                                            </div>

                                                                        </>
                                                                    )
                                                                })

                                                            }


                                                        </div>
                                                    </div>
                                                    <div class="race-track">
                                                        <div id="racetrack-container" class="racetrack-15">
                                                            <div id="racetrack">
                                                                <div class="view-line">
                                                                    <div class="racetrack-row">
                                                                        <div class="line-row start">
                                                                        </div>
                                                                        <div class="line-row">
                                                                        </div>
                                                                        <div class="line-row">
                                                                        </div>
                                                                        <div class="line-row">
                                                                        </div>
                                                                        <div class="line-row">
                                                                        </div>
                                                                        <div class="line-row">
                                                                        </div>
                                                                        <div class="line-row">
                                                                        </div>
                                                                        <div class="line-row">
                                                                        </div>
                                                                        <div class="line-row">
                                                                        </div>
                                                                        <div class="line-row finish">
                                                                        </div>
                                                                        <div class="line-row">
                                                                        </div>
                                                                        <div class="line-row">
                                                                        </div>
                                                                        <div class="line-row">
                                                                        </div>
                                                                        <div class="line-row">
                                                                        </div>
                                                                        <div class="line-row">
                                                                        </div>
                                                                    </div>
                                                                    <div class="racetrack-time">
                                                                        <div class="line-row">
                                                                            <span style={{ color: "rgb(47, 119, 171)" }}>
                                                                            </span>
                                                                        </div>
                                                                        <div class="line-row">
                                                                            <span style={{ color: "rgb(221, 196, 18)" }}></span>
                                                                        </div>
                                                                        <div class="line-row">
                                                                            <span style={{ color: "rgb(221, 196, 18)" }}>
                                                                            </span>
                                                                        </div>
                                                                        <div class="line-row"><span style={{ color: "rgb(221, 196, 18)" }}></span>
                                                                        </div>
                                                                        <div class="line-row">
                                                                            <span style={{ color: "rgb(47, 119, 171)" }}></span>
                                                                        </div>
                                                                        <div class="line-row">
                                                                            <span style={{ color: "rgb(221, 196, 18)" }}></span>
                                                                        </div>
                                                                        <div class="line-row">
                                                                            <span style={{ color: "rgb(47, 119, 171)" }}></span>
                                                                        </div>
                                                                        <div class="line-row">
                                                                            <span style={{ color: "rgb(47, 119, 171)" }}></span>
                                                                        </div>
                                                                        <div class="line-row">
                                                                            <span style={{ color: "rgb(221, 196, 18)" }}></span>
                                                                        </div>
                                                                        <div class="line-row">
                                                                            <span style={{ color: "rgb(221, 196, 18)" }}></span>
                                                                        </div>
                                                                        <div class="line-row">
                                                                            <span style={{ color: "rgb(47, 119, 171)" }}></span>
                                                                        </div>
                                                                        <div class="line-row">
                                                                            <span style={{ color: "rgb(47, 119, 171)" }}></span>
                                                                        </div>
                                                                        <div class="line-row">
                                                                            <span style={{ color: "rgb(221, 196, 18)" }}></span>
                                                                        </div>
                                                                        <div class="line-row">
                                                                            <span style={{ color: "rgb(47, 119, 171)" }}></span>
                                                                        </div>
                                                                        <div class="line-row">
                                                                            <span style={{ color: "rgb(47, 119, 171)" }}></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {

                                                                    raceMeter &&
                                                                     <div class="view-racetrack type-1 racetrack-15">
                                                                    <div class="racetrack-col" style={{ width: "3500px", marginLeft: "47.8571px" }}>
                                                                        <div class="racetrack-inner" id="Race_here">
                                                                            <div class="line-row start" style={{ width: "837.5px", minWidth: "837.5px" }}>
                                                                                <div class="line-inner">
                                                                                    <span className='span_div' >
                                                                                        <img alt="" srcset="https://cdn.Wire NFT.io/statics/play/public/v4/images/race/flag_start.png 1x, https://cdn.Wire NFT.io/statics/play/public/v4/images/race/flag_start.png 2x" src="https://cdn.Wire NFT.io/statics/play/public/v4/images/race/flag_start.png" decoding="async" data-nimg="fixed" className='Image_style2' />
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                            <div class="line-row" title="500" style={{ width: "837.5px", minWidth: "837.5px" }}>
                                                                                <div class="line-inner">
                                                                                    <span class="line-location">500m</span>
                                                                                </div>
                                                                            </div>
                                                                            <div class="line-row" title="1000" style={{ width: "837.5px", minWidth: "837.5px" }}>
                                                                                <div class="line-inner">
                                                                                    <span class="line-location">1000m</span>
                                                                                </div>
                                                                            </div>
                                                                            <div class="line-row" title="1500" style={{ width: "837.5px", minWidth: "837.5px" }}>
                                                                                <div class="line-inner">
                                                                                    <span class="line-location">1500m</span>
                                                                                </div>
                                                                            </div>
                                                                            <div class="line-row" title="2000" style={{ width: "837.5px", minWidth: "837.5px" }}>
                                                                                <div class="line-inner">
                                                                                    <span class="line-location">2000m</span>
                                                                                </div>
                                                                            </div>
                                                                            <div class="line-row" title="2500" style={{ width: "837.5px", minWidth: "837.5px" }}>
                                                                                <div class="line-inner">
                                                                                    <span class="line-location">2500m</span>
                                                                                </div>
                                                                            </div>
                                                                            <div class="line-row" title="3000" style={{ width: "837.5px", minWidth: "837.5px" }}>
                                                                                <div class="line-inner">
                                                                                    <span class="line-location">3000m</span>
                                                                                </div>
                                                                            </div>
                                                                            <div class="line-row" title="3000" style={{ width: "837.5px", minWidth: "837.5px" }}>
                                                                                <div class="line-inner">
                                                                                    <span class="line-location">3500m</span>
                                                                                </div>
                                                                            </div>
                                                                            <div class="line-row finish" style={{ width: "837.5px", minWidth: "837.5px" }}>
                                                                                <div class="line-inner">
                                                                                    <span className='span_div'>
                                                                                        <img alt="" srcset="https://cdn.Wire NFT.io/statics/play/public/v4/images/race/flag_start.png 1x, https://cdn.Wire NFT.io/statics/play/public/v4/images/race/flag_start.png 2x" src="https://cdn.Wire NFT.io/statics/play/public/v4/images/race/flag_start.png" decoding="async" data-nimg="fixed" className='Image_style' />
                                                                                    </span>
                                                                                    <div class="line-finished">finished</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div> 

                                                                }
                                                                
                                                                <div class="racehorse" id="Racing_div_id">



                                                                    {
                                                                        isChaling ? displayEl.map((items, index) => {
                                                                            return (<>
                                                                                <div id="Start_race" class="" >
                                                                                    <span className=''>
                                                                                        <img alt="" src={horse} decoding="async" data-nimg="fixed" className='Horse_img' />
                                                                                    </span>
                                                                                </div>
                                                                            </>)
                                                                        })
                                                                            :
                                                                            raceArray.map((items, index) => {
                                                                                // console.log("random", Math.floor((Math.random() * 20)))
                                                                                return (<>
                                                                                    <div id="race-1" class="" style={{ marginLeft: `${items.margin}px` }}>
                                                                                        <span className=''>
                                                                                            {
                                                                                                items.poition == 1 ? <img alt="" src={race1} decoding="async" data-nimg="fixed" className='Horse_img_2 color_first' />
                                                                                                    : items.poition == 2 ? <img alt="" src={race2} decoding="async" data-nimg="fixed" className='Horse_img_2 color_second' />
                                                                                                        : items.poition == 3 ? <img alt="" src={race3} decoding="async" data-nimg="fixed" className='Horse_img_2 color_third' />
                                                                                                            : <img alt="" src={race} decoding="async" data-nimg="fixed" className='Horse_img_2' />
                                                                                            }

                                                                                        </span>
                                                                                    </div>
                                                                                </>)
                                                                            })
                                                                    }

                                                                    {isLine && <img src="https://cdn.Wire NFT.io/statics/play/public/v5/images/race/start.png" alt="" className='Line_start' />}

                                                                    {finishLine && <img src="https://cdn.Wire NFT.io/statics/play/public/v5/images/race/start.png" alt="" className='Line_last' />}

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="bx-right auto">
                                    <div class="bx-header stadion">
                                        <div class="header-inner">
                                            <div class="header-title">Stadion Metaverse</div>
                                        </div>
                                    </div>
                                    <div class="bx-content">
                                        <div class="inner-content">
                                            <div class="view-scroll">
                                                <div class="view-bottom">
                                                    <div class="item-button">
                                                        <div class="button-game primary" style={{ height: "40px" }}>
                                                            <div class="btn-position button-game-left" style={{ width: "16px", height: "40px" }}>
                                                            </div>
                                                            <div class="btn-position button-game-content" style={{ height: "40px", paddingRight: "16px", paddingLeft: "16px" }}>
                                                                <div class="content-name">
                                                                    <span class="content-name-title" style={{ fontSize: "18px" }}>Lobby</span>
                                                                </div>
                                                            </div>
                                                            <div class="btn-position button-game-right" style={{ width: "16px", height: "40px" }}>

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

                    </div>
                </div>
            </div>




        </div>
    )
}
