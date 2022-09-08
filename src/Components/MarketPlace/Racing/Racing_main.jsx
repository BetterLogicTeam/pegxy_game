import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { loadWeb3 } from '../../../apis/api';
import { raceContractABI, raceContractAddress } from '../../../utilies/constant';
import { MintingContractAddress, MintingContract_ABI } from '../../../utilies/Contract';
import './Racing_style.css'


export default function Racing_main({ setModalShow, btnTxt }) {

    
    let [Array_NFT, setArray_NFT] = useState([])
    const [tokenId, settokenId] = useState()

    let nivigating = useNavigate()
    const Nft_Collection = async () => {
        let acc = await loadWeb3();
        try {
            const web3 = window.web3
            let Data_Array = []
            let contractOf_Own = new web3.eth.Contract(MintingContract_ABI, MintingContractAddress);
            let contractOf= new web3.eth.Contract(raceContractABI,raceContractAddress);
            let WalletOwnOf = await contractOf.methods.stakedIds(acc).call();
            console.log("WalletOwnOf", WalletOwnOf);
            let wallet_Length = WalletOwnOf.length
            console.log("walletOfOwner", wallet_Length);
            let Wallet_URI
            for (let i = 0; i < wallet_Length; i++) {
                let ArryData = WalletOwnOf[i]
                Wallet_URI = await contractOf_Own.methods.tokenURI(ArryData).call();
                console.log("Image", Wallet_URI);
                let Image_Url = Wallet_URI
                Data_Array = [...Data_Array, { Tokenid: ArryData, Url: Image_Url, address: acc }]
                setArray_NFT(Data_Array)
            }

        } catch (e) {
            console.log("Erroe while Call My_cooletion Fuction", e);
        }
    }
const startRace=async(tokenid)=>{
    let acc=await loadWeb3()

    try{
        const web3=  window.web3;
        console.log("TokenID",tokenid);

        let contractOf= new web3.eth.Contract(raceContractABI,raceContractAddress);
        let nftContract = new web3.eth.Contract(MintingContract_ABI, MintingContractAddress);
        const itemNo = await contractOf.methods.itemNo(MintingContractAddress, tokenid).call()
        const userInfo = await contractOf.methods.UserInfo(itemNo).call();
        if(userInfo.activate) {
            if(parseFloat(web3.utils.fromWei(userInfo.Getreward)) < parseFloat(web3.utils.fromWei(userInfo.pkgNotoID))){
                if(parseInt(userInfo.perDay) <=12){

                        let createBid=await contractOf.methods.createBet(tokenid, MintingContractAddress).send({
                            from: acc
                       })
                       nivigating("/Items/horse_racing")
                       console.log("createBid",createBid);
                       toast("Transtion Successfull")
                }else{
                    toast.info(`${tokenid} per day race is completed`);
                }
            }else{
                toast.info(`${tokenid} reward is reached to ${web3.utils.fromWei(userInfo.pkgNotoID)}, so boos your id`);
            }
        }else{
            toast.info("Your Id is not activate")
        }




    }catch(e){
        console.log("Error while calling fuction startRace",e);
    }
}




    useEffect(() => {
        Nft_Collection()

    }, []);
    return (
        <div>

            <div className='main_div_app'>

                <div class="container">
                    <div class="bx-view">
                        <div class="bx-left">
                            <div class="bx-header">
                                <div class="header-inner">
                                    <div class="header-title"></div>
                                    <div class="header-tab">
                                        <ul>
                                            <Link to="#">
                                                <li class="active">
                                                    <div class="item-tab">
                                                        <div class="item-tab-icon">
                                                            <div className='items_tab_inneree'>
                                                                <img alt="" src="images/ic_start_active.png" decoding="async" data-nimg="fixed" className='items_img_here' />
                                                                <noscript></noscript>
                                                            </div>
                                                        </div>
                                                        <a href="Racing.html" class="item-tab-title">Live Racing</a>
                                                    </div>
                                                </li>
                                            </Link>
                                            {/* <Link to="/Items/Finished_race">
                                                <li class="">
                                                    <div class="item-tab">
                                                        <div class="item-tab-icon">
                                                            <div className='items_tab_inneree'>
                                                                <img alt="" src="images/ic_finish.png" decoding="async" data-nimg="fixed" className='items_img_here' />
                                                                <noscript></noscript>
                                                            </div>
                                                        </div>

                                                        <a href="Racing_Finished.html" class="item-tab-title">Finished races</a>
                                                    </div>
                                                </li>
                                            </Link> */}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="bx-content default">
                                <div class="inner-content">
                                    <div class="viewTable">
                                        <div class="viewPega ">
                                            <h5 className='text-white'>Please Select Horse For Race</h5>

                                            <div class="list-pick" >
                                               
                                                {
                                                    Array_NFT.map((items, idex) => {
                                                        let index = idex + 1;
                                                        return (
                                                            <>

                                                                <div class="item-pega">
                                                                    <a href="#">
                                                                        <div class="item-box">
                                                                            <div class="item-cover">
                                                                                <div style={{ display: "block", overflow: "hidden", position: "relative", boxSizing: "border-box", margin: "0px" }}>
                                                                                    <div style={{ display: "block", boxSizing: "border-box", paddingTop: "50%" }}></div>
                                                                                    <img alt="" src={items.Url} decoding="async" data-nimg="responsive" class="item-cover-img" className='items_img_here ' />
                                                                                  
                                                                                </div>
                                                                            </div>
                                                                            <div class="item-header">
                                                                                <div class="info-atts">
                                                                                    <div class="info-name">
                                                                                        <div class="item-info-title">{items.name}</div>
                                                                                        <div class="item-info-meta">Token Id</div>
                                                                                    </div>
                                                                                    <div class="info-adds">
                                                                                        <div class="info-adds-title">{items.address?.substring(0, 6) + "..." + items.address?.substring(items.address?.length - 6)}</div>
                                                                                        <div class="info-property">
                                                                                            <div class="property-title">
                                                                                                <div class="property-coat">
                                                                                                    {items.Tokenid}
                                                                                                    
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                          
                                                                        </div>
                                                                    </a>
                                                                    <div class="info-action">
                                                                        <div class="action-group">
                                                                            <div class="item-link">
                                                                                <div class="button-game primary" style={{ height: "32px" }} 
                                                                                // onClick={() => nivigating("/Items/horse_racing")}

                                                                                onClick={()=>startRace(items.Tokenid)}
                                                                                
                                                                                >
                                                                                    <div class="btn-position button-game-left" style={{ width: "16px", height: "32px" }}></div>
                                                                                    <div class="btn-position button-game-content" style={{ height: "32px", paddingRight: "16px", paddingLeft: "16px" }}>
                                                                                        <div class="content-name"><span class="content-name-sub"></span><span class="content-name-title" style={{ fontSize: "20px" }}>Start Race</span></div>
                                                                                        <div class="button-game-icon i-right">
                                                                                  
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="btn-position button-game-right" style={{ width: "16px", height: "32px" }}></div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>






                                                            </>)
                                                    })
                                                }


                                            </div>




                                        </div>
                                        {/* <div class="tableHeader">
                                            <div class="header-title event first"><span>Event</span></div>
                                            <div class="header-title location"><span>Location</span></div>
                                            <div class="header-title class">
                                                <div class="dropdown"><button aria-haspopup="true" aria-expanded="false" id="dropdown-basic" type="button" class="dropdown-toggle btn btn-link" data-bs-toggle="dropdown">Class</button></div>
                                            </div>
                                            <div class="header-title distance"><span>Distance</span></div>
                                            <div class="header-title date"><span>Date</span></div>
                                            <div class="header-title prizepool"><span>Prizepool</span></div>
                                            <div class="header-title action end"><span>Action</span></div>
                                        </div> */}
                                        {/* <div class="tableContent">
                                            <div class="item-content">
                                                <div class="item-title event first">Race #17921764</div>
                                                <div class="item-title location">Pegaxy</div>
                                                <div class="item-title class">
                                                    <div class="class-pega">Class 1</div>
                                                </div>
                                                <div class="item-title distance">3500m</div>
                                                <div class="item-title date">0</div>
                                                <div class="item-title prizepool">
                                                    <div style={{ overflow: "hidden", boxSizing: "border-box", display: "inline-block", position: "relative", width: "14px", height: "14px" }}>
                                                        <img alt="" src="images/VIS.png" decoding="async" data-nimg="fixed" className='items_img_here' />
                                                        <noscript></noscript>
                                                    </div>
                                                    <span>175</span>
                                                </div>
                                                <div class="item-title action end">
                                                    <div class="__react_component_tooltip t9baa8b22-bebc-43ae-a824-a6665fb79e92 place-top type-dark" id="copy" data-id="tooltip">


                                                    </div>
                                                    
                                                        <div data-tip="true" data-for="copy" class="action-share" currentitem="false" style={{ cursor: "pointer" }}><span>share</span></div>
                                               
                                                    <Link to="/Items/horse_racing">

                                                        <div class="action-replay" style={{ cursor: "pointer" }}><span>replay</span></div>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div class="item-content">
                                                <div class="item-title event first">Race #17921763</div>
                                                <div class="item-title location">Pegaxy</div>
                                                <div class="item-title class">
                                                    <div class="class-pega">Class 1</div>
                                                </div>
                                                <div class="item-title distance">3500m</div>
                                                <div class="item-title date">0</div>
                                                <div class="item-title prizepool">
                                                    <div style={{ overflow: "hidden", boxSizing: "border-box", display: "inline-block", position: "relative", width: "14px", height: "14px" }}>
                                                        <img alt="" src="images/VIS.png" decoding="async" data-nimg="fixed" className='items_img_here' />
                                                        <noscript></noscript>
                                                    </div>
                                                    <span>175</span>
                                                </div>
                                                <div class="item-title action end">
                                                    <div class="__react_component_tooltip tafd145c7-4fe8-4a76-ab19-7a4771fbd29b place-top type-dark" id="copy" data-id="tooltip">


                                                    </div>
                                                    <div data-tip="true" data-for="copy" class="action-share" currentitem="false" style={{ cursor: "pointer" }}><span>share</span></div>
                                                             <Link to="/Items/horse_racing">

                                                        <div class="action-replay" style={{ cursor: "pointer" }}><span>replay</span></div>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div class="item-content">
                                                <div class="item-title event first">Race #17921762</div>
                                                <div class="item-title location">Pegaxy</div>
                                                <div class="item-title class">
                                                    <div class="class-pega">Class 1</div>
                                                </div>
                                                <div class="item-title distance">4000m</div>
                                                <div class="item-title date">0</div>
                                                <div class="item-title prizepool">
                                                    <div style={{ overflow: "hidden", boxSizing: "border-box", display: "inline-block", position: "relative", width: "14px", height: "14px" }}>
                                                        <img alt="" src="images/VIS.png" decoding="async" data-nimg="fixed" className='items_img_here' />
                                                        <noscript></noscript>
                                                    </div>
                                                    <span>175</span>
                                                </div>
                                                <div class="item-title action end">
                                                    <div class="__react_component_tooltip t7898b3f6-4da4-4169-8317-8b0673d4201b place-top type-dark" id="copy" data-id="tooltip">


                                                    </div>
                                                    <div data-tip="true" data-for="copy" class="action-share" currentitem="false" style={{ cursor: "pointer" }}><span>share</span></div>
                                                             <Link to="/Items/horse_racing">

                                                        <div class="action-replay" style={{ cursor: "pointer" }}><span>replay</span></div>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div class="item-content">
                                                <div class="item-title event first">Race #17921761</div>
                                                <div class="item-title location">Pegaxy</div>
                                                <div class="item-title class">
                                                    <div class="class-pega">Class 1</div>
                                                </div>
                                                <div class="item-title distance">4000m</div>
                                                <div class="item-title date">0</div>
                                                <div class="item-title prizepool">
                                                    <div style={{ overflow: "hidden", boxSizing: "border-box", display: "inline-block", position: "relative", width: "14px", height: "14px" }}>
                                                        <img alt="" src="images/VIS.png" decoding="async" data-nimg="fixed" className='items_img_here' />
                                                        <noscript></noscript>
                                                    </div>
                                                    <span>175</span>
                                                </div>
                                                <div class="item-title action end">
                                                    <div class="__react_component_tooltip t89b64d62-4d6c-4e2b-9dc3-89b2dc7def68 place-top type-dark" id="copy" data-id="tooltip">


                                                    </div>
                                                    <div data-tip="true" data-for="copy" class="action-share" currentitem="false" style={{ cursor: "pointer" }}><span>share</span></div>
                                                             <Link to="/Items/horse_racing">

                                                        <div class="action-replay" style={{ cursor: "pointer" }}><span>replay</span></div>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div class="item-content">
                                                <div class="item-title event first">Race #17921760</div>
                                                <div class="item-title location">Pegaxy</div>
                                                <div class="item-title class">
                                                    <div class="class-pega">Class 1</div>
                                                </div>
                                                <div class="item-title distance">4000m</div>
                                                <div class="item-title date">0</div>
                                                <div class="item-title prizepool">
                                                    <div style={{ overflow: "hidden", boxSizing: "border-box", display: "inline-block", position: "relative", width: "14px", height: "14px" }}>
                                                        <img alt="" src="images/VIS.png" decoding="async" data-nimg="fixed" className='items_img_here' />
                                                        <noscript></noscript>
                                                    </div>
                                                    <span>175</span>
                                                </div>
                                                <div class="item-title action end">
                                                    <div class="__react_component_tooltip t4fb7e9a5-e832-4381-8e2d-06f86e3e4718 place-top type-dark" id="copy" data-id="tooltip">

                                                    </div>
                                                    <div data-tip="true" data-for="copy" class="action-share" currentitem="false" style={{ cursor: "pointer" }}><span>share</span></div>
                                                             <Link to="/Items/horse_racing">

                                                        <div class="action-replay" style={{ cursor: "pointer" }}><span>replay</span></div>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div class="item-content">
                                                <div class="item-title event first">Race #17921759</div>
                                                <div class="item-title location">Pegaxy</div>
                                                <div class="item-title class">
                                                    <div class="class-pega">Class 1</div>
                                                </div>
                                                <div class="item-title distance">3500m</div>
                                                <div class="item-title date">0</div>
                                                <div class="item-title prizepool">
                                                    <div style={{ overflow: "hidden", boxSizing: "border-box", display: "inline-block", position: "relative", width: "14px", height: "14px" }}>
                                                        <img alt="" src="images/VIS.png" decoding="async" data-nimg="fixed" className='items_img_here' />
                                                        <noscript></noscript>
                                                    </div>
                                                    <span>175</span>
                                                </div>
                                                <div class="item-title action end">
                                                    <div class="__react_component_tooltip t81384b82-c8c8-4879-921d-b92a48289355 place-top type-dark" id="copy" data-id="tooltip">


                                                    </div>
                                                    <div data-tip="true" data-for="copy" class="action-share" currentitem="false" style={{ cursor: "pointer" }}><span>share</span></div>
                                                             <Link to="/Items/horse_racing">

                                                        <div class="action-replay" style={{ cursor: "pointer" }}><span>replay</span></div>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div class="item-content">
                                                <div class="item-title event first">Race #17921758</div>
                                                <div class="item-title location">Pegaxy</div>
                                                <div class="item-title class">
                                                    <div class="class-pega">Class 1</div>
                                                </div>
                                                <div class="item-title distance">4000m</div>
                                                <div class="item-title date">0</div>
                                                <div class="item-title prizepool">
                                                    <div style={{ overflow: "hidden", boxSizing: "border-box", display: "inline-block", position: "relative", width: "14px", height: "14px" }}>
                                                        <img alt="" src="images/VIS.png" decoding="async" data-nimg="fixed" className='items_img_here' />
                                                        <noscript></noscript>
                                                    </div>
                                                    <span>175</span>
                                                </div>
                                                <div class="item-title action end">
                                                    <div class="__react_component_tooltip t6b08ea37-d704-464a-862b-72cf982c5cd3 place-top type-dark" id="copy" data-id="tooltip">


                                                    </div>
                                                    <div data-tip="true" data-for="copy" class="action-share" currentitem="false" style={{ cursor: "pointer" }}><span>share</span></div>
                                                             <Link to="/Items/horse_racing">

                                                        <div class="action-replay" style={{ cursor: "pointer" }}><span>replay</span></div>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div class="item-content">
                                                <div class="item-title event first">Race #17921757</div>
                                                <div class="item-title location">Pegaxy</div>
                                                <div class="item-title class">
                                                    <div class="class-pega">Class 1</div>
                                                </div>
                                                <div class="item-title distance">4000m</div>
                                                <div class="item-title date">0</div>
                                                <div class="item-title prizepool">
                                                    <div style={{ overflow: "hidden", boxSizing: "border-box", display: "inline-block", position: "relative", width: "14px", height: "14px" }}>
                                                        <img alt="" src="images/VIS.png" decoding="async" data-nimg="fixed" className='items_img_here' />
                                                        <noscript></noscript>
                                                    </div>
                                                    <span>175</span>
                                                </div>
                                                <div class="item-title action end">
                                                    <div class="__react_component_tooltip t1f3f6487-790f-4e69-81b7-37faf2995fce place-top type-dark" id="copy" data-id="tooltip">


                                                    </div>
                                                    <div data-tip="true" data-for="copy" class="action-share" currentitem="false" style={{ cursor: "pointer" }}><span>share</span></div>
                                                             <Link to="/Items/horse_racing">

                                                        <div class="action-replay" style={{ cursor: "pointer" }}><span>replay</span></div>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div class="item-content">
                                                <div class="item-title event first">Race #17921756</div>
                                                <div class="item-title location">Pegaxy</div>
                                                <div class="item-title class">
                                                    <div class="class-pega">Class 1</div>
                                                </div>
                                                <div class="item-title distance">3500m</div>
                                                <div class="item-title date">0</div>
                                                <div class="item-title prizepool">
                                                    <div style={{ overflow: "hidden", boxSizing: "border-box", display: "inline-block", position: "relative", width: "14px", height: "14px" }}>
                                                        <img alt="" src="images/VIS.png" decoding="async" data-nimg="fixed" className='items_img_here' />
                                                        <noscript></noscript>
                                                    </div>
                                                    <span>175</span>
                                                </div>
                                                <div class="item-title action end">
                                                    <div class="__react_component_tooltip t9f09d2c9-1e40-4197-88fb-fc5f42a4b099 place-top type-dark" id="copy" data-id="tooltip">


                                                    </div>
                                                    <div data-tip="true" data-for="copy" class="action-share" currentitem="false" style={{ cursor: "pointer" }}><span>share</span></div>
                                                             <Link to="/Items/horse_racing">

                                                        <div class="action-replay" style={{ cursor: "pointer" }}><span>replay</span></div>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div class="item-content">
                                                <div class="item-title event first">Race #17921755</div>
                                                <div class="item-title location">Pegaxy</div>
                                                <div class="item-title class">
                                                    <div class="class-pega">Class 1</div>
                                                </div>
                                                <div class="item-title distance">3500m</div>
                                                <div class="item-title date">0</div>
                                                <div class="item-title prizepool">
                                                    <div style={{ overflow: "hidden", boxSizing: "border-box", display: "inline-block", position: "relative", width: "14px", height: "14px" }}>
                                                        <img alt="" src="images/VIS.png" decoding="async" data-nimg="fixed" className='items_img_here' />
                                                        <noscript></noscript>
                                                    </div>
                                                    <span>175</span>
                                                </div>
                                                <div class="item-title action end">
                                                    <div class="__react_component_tooltip t1e620324-d375-40cf-9cbc-66d66c5aac81 place-top type-dark" id="copy" data-id="tooltip">


                                                    </div>
                                                    <div data-tip="true" data-for="copy" class="action-share" currentitem="false" style={{ cursor: "pointer" }}><span>share</span></div>
                                                             <Link to="/Items/horse_racing">

                                                        <div class="action-replay" style={{ cursor: "pointer" }}><span>replay</span></div>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div class="item-content">
                                                <div class="item-title event first">Race #17921754</div>
                                                <div class="item-title location">Pegaxy</div>
                                                <div class="item-title class">
                                                    <div class="class-pega">Class 1</div>
                                                </div>
                                                <div class="item-title distance">3500m</div>
                                                <div class="item-title date">0</div>
                                                <div class="item-title prizepool">
                                                    <div style={{ overflow: "hidden", boxSizing: "border-box", display: "inline-block", position: "relative", width: "14px", height: "14px" }}>
                                                        <img alt="" src="images/VIS.png" decoding="async" data-nimg="fixed" className='items_img_here' />
                                                        <noscript></noscript>
                                                    </div>
                                                    <span>175</span>
                                                </div>
                                                <div class="item-title action end">
                                                    <div class="__react_component_tooltip t58a34fa3-34b3-42f7-8e46-fd180bc2503f place-top type-dark" id="copy" data-id="tooltip">


                                                    </div>
                                                    <div data-tip="true" data-for="copy" class="action-share" currentitem="false" style={{ cursor: "pointer" }}><span>share</span></div>
                                                             <Link to="/Items/horse_racing">

                                                        <div class="action-replay" style={{ cursor: "pointer" }}><span>replay</span></div>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div class="item-content">
                                                <div class="item-title event first">Race #17921753</div>
                                                <div class="item-title location">Pegaxy</div>
                                                <div class="item-title class">
                                                    <div class="class-pega">Class 1</div>
                                                </div>
                                                <div class="item-title distance">4000m</div>
                                                <div class="item-title date">0</div>
                                                <div class="item-title prizepool">
                                                    <div style={{ overflow: "hidden", boxSizing: "border-box", display: "inline-block", position: "relative", width: "14px", height: "14px" }}>
                                                        <img alt="" src="images/VIS.png" decoding="async" data-nimg="fixed" className='items_img_here' />
                                                        <noscript></noscript>
                                                    </div>
                                                    <span>175</span>
                                                </div>
                                                <div class="item-title action end">
                                                    <div class="__react_component_tooltip tf9715a12-2859-4a79-bf12-4ed1aef84626 place-top type-dark" id="copy" data-id="tooltip">


                                                    </div>
                                                    <div data-tip="true" data-for="copy" class="action-share" currentitem="false" style={{ cursor: "pointer" }}><span>share</span></div>
                                                             <Link to="/Items/horse_racing">

                                                        <div class="action-replay" style={{ cursor: "pointer" }}><span>replay</span></div>
                                                    </Link>
                                                </div>
                                            </div>
                                            <div class="item-content">
                                                <div class="item-title event first">Race #17921752</div>
                                                <div class="item-title location">Pegaxy</div>
                                                <div class="item-title class">
                                                    <div class="class-pega">Class 1</div>
                                                </div>
                                                <div class="item-title distance">3500m</div>
                                                <div class="item-title date">0</div>
                                                <div class="item-title prizepool">
                                                    <div style={{ overflow: "hidden", boxSizing: "border-box", display: "inline-block", position: "relative", width: "14px", height: "14px" }}>
                                                        <img alt="" src="images/VIS.png" decoding="async" data-nimg="fixed" className='items_img_here' />
                                                        <noscript></noscript>
                                                    </div>
                                                    <span>175</span>
                                                </div>
                                                <div class="item-title action end">
                                                    <div class="__react_component_tooltip tab5efdfe-21b3-4c08-82f5-f69689074355 place-top type-dark" id="copy" data-id="tooltip">


                                                    </div>
                                                    <div data-tip="true" data-for="copy" class="action-share" currentitem="false" style={{ cursor: "pointer" }}><span>share</span></div>
                                                             <Link to="/Items/horse_racing">

                                                        <div class="action-replay" style={{ cursor: "pointer" }}><span>replay</span></div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div> */}
                                        {/* <div class="viewPagination">
                                            <div class="pagination-inner">
                                                <div class="item-pagination-icon">
                                                    <div style={{ overflow: "hidden", boxSizing: "border-box", display: "inline-block", position: "relative", width: "24px", height: "24px" }}>
                                                        <img alt="" src="images/arrow-left.png" decoding="async" data-nimg="fixed" class="pagination-img pagination-left" className='items_img_here' />
                                                        <noscript></noscript>
                                                    </div>
                                                </div>
                                                <div class="item-pagination active"><span>1</span></div>
                                                <div class="item-pagination"><span>2</span></div>
                                                <div class="item-pagination"><span>3</span></div>
                                                <div class="item-pagination"><span>4</span></div>
                                                <div class="item-pagination"><span>5</span></div>
                                                <span>...</span>
                                                <div class="item-pagination"><span>111</span></div>
                                                <div class="item-pagination-icon">
                                                    <div style={{ overflow: "hidden", boxSizing: "border-box", display: "inline-block", position: "relative", width: "24px", height: "24px" }}>
                                                        <img alt="" src="images/arrow-right.png" decoding="async" data-nimg="fixed" class="pagination-img pagination-right" className='items_img_here' />
                                                        <noscript></noscript>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div class="bx-right auto">
                            <div class="bx-header">
                                <div class="header-inner">
                                    <div class="header-title">Start racing</div>
                                </div>
                            </div>
                            <div class="bx-content">
                                <div class="inner-content">
                                    <div class="pick-pega">
                                        <div class="btn-pick">
                                            <div>
                                                <div class="btn-pick-icon">
                                                    <div style={{ overflow: "hidden", boxSizing: "border-box", display: "inline-block", position: "relative", width: "120px", height: "120px" }}>
                                                        <img alt="pick" src="images/start_race.png" decoding="async" data-nimg="fixed" className='items_img_here' />
                                                        <noscript></noscript>
                                                    </div>
                                                </div>
                                                <div class="button-game pinks" style={{ height: "40px" }}>
                                                    <div class="btn-position button-game-left" style={{ width: "16px", height: "40px" }}></div>
                                                    <div class="btn-position button-game-content" style={{ height: "40px", paddingRight: "16px", paddingLeft: "16px" }}>
                                                        <div class="content-name"><span class="content-name-sub"></span><span class="content-name-title" style={{ fontSize: "18px" }}>Pick a Pega</span></div>
                                                    </div>
                                                    <div class="btn-position button-game-right" style={{ width: "16px", height: "40px" }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>

        </div>
    )
}
