import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { loadWeb3 } from '../../../apis/api';
import { raceContractABI, raceContractAddress } from '../../../utilies/constant';
import { wireNftContractAddress, wireNftContractAbi } from '../../../utilies/constant';
import Modal from 'react-bootstrap/Modal'
import './Racing_style.css'



export default function Racing_main({ setModalShow, btnTxt }) {

    
    let [Array_NFT, setArray_NFT] = useState([])
    const [tokenId, settokenId] = useState()
    const [Auctionmodelopen, setAuctionmodelopen] = useState(false);
    const [idDetail, setIdDetail] = useState({
        id:"",
        racePerDay:"",
        reward:""
    })

    const showIdDetail = async (tokenid)=>{
try {
    const web3 = window.web3;
    let contractOf= new web3.eth.Contract(raceContractABI,raceContractAddress);
    const itemNo = await contractOf.methods.itemNo(wireNftContractAddress, tokenid).call()
    const userInfo = await contractOf.methods.UserInfo(itemNo).call();
    setIdDetail({
        id:tokenid,
        racePerDay:userInfo.perDay,
        reward:userInfo.Getreward
    })
    setAuctionmodelopen(true)
} catch (error) {
        console.error("error while show id detail");
}
    }
    let nivigating = useNavigate()
    const Nft_Collection = async () => {
        let acc = await loadWeb3();
        try {
            const web3 = window.web3
            let Data_Array = []
            let contractOf_Own = new web3.eth.Contract(wireNftContractAbi, wireNftContractAddress);
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

        let nftContract = new web3.eth.Contract(wireNftContractAbi, wireNftContractAddress);
        let contractOf= new web3.eth.Contract(raceContractABI,raceContractAddress);
        const itemNo = await contractOf.methods.itemNo(wireNftContractAddress, tokenid).call()
        const userInfo = await contractOf.methods.UserInfo(itemNo).call();
        if(userInfo.activate) {
            if(parseFloat(web3.utils.fromWei(userInfo.Getreward)) < parseFloat(web3.utils.fromWei(userInfo.pkgNotoID))){
                if(parseInt(userInfo.perDay) <=12){

                        let createBid=await contractOf.methods.createBet(tokenid, wireNftContractAddress).send({
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
                                                                    <a href="#" onClick={()=>showIdDetail(items.Tokenid)}>
                                                                        <div class="item-box">
                                                                            <div class="item-cover">
                                                                                <div style={{ display: "block", overflow: "hidden", position: "relative", boxSizing: "border-box", margin: "0px" }} >
                                                                                    <div style={{ display: "block", boxSizing: "border-box", paddingTop: "50%" }}></div>
                                                                                    <img alt="" src={items.Url} decoding="async" data-nimg="responsive" class="item-cover-img" className='items_img_here '  />
                                                                                  
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
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>

            <Modal
                show={Auctionmodelopen}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton onClick={()=>setAuctionmodelopen(false)} >
                <h3 className='text-white'>NFT Deatails</h3>

                </Modal.Header>



                <Modal.Body className='model_bg'>

                <div className="firstdiv text-white">
                            <h4>ID Number</h4>
                            <p className='mt-1'>#{idDetail.id}</p>
                        </div>
                        <div className="firstdiv text-white">
                            <h4>Daily Reward</h4>
                            <p className='mt-1'>{idDetail.reward}</p>
                        </div>
                        <div className="firstdiv text-white">
                            <h4>Today Race</h4>
                            <p className='mt-1'>{idDetail.racePerDay}</p>
                        </div>
                    

                

                </Modal.Body>

            </Modal>

        </div>
    )
}
