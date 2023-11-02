import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import "./hotel.css";
import {  faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/Footer/Footer";
import { useContext, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import useFetch from "../../hooks/UseFetch";
import Reserve from "../../components/reserve/Reserve";

export default function Hotel({user}) {

  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { data, loading, error } = useFetch(`/hotels/find/${id}`);

  const { dates, options } = useContext(SearchContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0].endDate, dates[0].startDate);
  const[slideNumber,setSlideNumber]=useState(0);
  const[open,setOpen]=useState(false);
  const photos=[
    {
      src:"https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
    },
    {
      src:"https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg",
    },

    {
      src:"https://cf.bstatic.com/static/img/theme-index/carousel_320x240/bg_resorts/6f87c6143fbd51a0bb5d15ca3b9cf84211ab0884.jpg",
    },
    {
      src:"https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg",

    },
    {
      src:"https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-chalet_300/8ee014fcc493cb3334e25893a1dee8c6d36ed0ba.jpg",

    },
    {
      src:"https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
    },
  ]
  const handleOpen=(i)=>{
setSlideNumber(i);
setOpen(true);
  }
  const handleMove=(direction)=>{
    let newSlideNumber;
    if(direction==="l"){
      newSlideNumber=slideNumber===0?5:slideNumber-1;
    }else{
      newSlideNumber=slideNumber===5?0:slideNumber+1;

    }
    setSlideNumber(newSlideNumber);
  }
  const navigate=useNavigate();
  const[openModal,setOpenModal]=useState(false);

  const handleClick=()=>{
    if(user){
      setOpenModal(true)

    }
    else{
      navigate("/login")
    }
  }
  return (
    <div>
      <Navbar user={user}/>
      <Header type="list"/>
      <div className="hotelContainer">
       {open&& <div className="slider">
<FontAwesomeIcon icon={faCircleXmark} className="close" onClick={()=>setOpen(false)}/>
<FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={()=>handleMove('l')}/>
<div className="sliderWrapper">
  <img src={photos[slideNumber].src} alt="" className="sliderImg" />
</div>
<FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={()=>handleMove('r')}/>

        </div>}
        <div className="hotelWrapper">
          <button className="bookNow" onClick={handleClick}>Reserve or Book Now!</button>
          <h1 className="hotelTitle">{data.name}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot}/>
            <span>Elton St 125 New york</span>
            </div>
            <span className="hotelDistance">
              Excellent hotel- {data.distance} m from center
            </span>
            <span className="hotelPriceHighlight">
            Book a stay over ${data.cheapestPrice} at this property and get a
              free airport taxi
                          </span>
            <div className="hotelImages">
             {photos.map((photo,i)=>(
              <div className="hotelImgWrapper" key={i}>
                <img src={photo.src} alt="" className="hotelImg"
                onClick={()=>handleOpen(i)} />
              </div>
             ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">Stay in the heart of karkaw</h1>
                <p className="hotelDesc">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio quaerat, velit odit, iste explicabo vitae at delectus assumenda, a quibusdam minima. Dolorum nam magni iure voluptatem libero aspernatur commodi voluptatibus suscipit rem explicabo, aut necessitatibus dignissimos minus earum eius molestiae iste. Quisquam facilis vero tenetur doloremque consectetur pariatur libero veritatis?Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae eaque praesentium esse commodi veniam officia magni excepturi quaerat dolorem ab? Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque suscipit at illo! Laborum, voluptatem, minus nesciunt rerum perspiciatis deserunt, debitis quod praesentium similique nobis aliquam exercitationem expedita velit optio ullam! Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis incidunt provident, dolorum autem sunt nesciunt temporibus laboriosam ipsum inventore voluptatum earum. Illum, quae fugit suscipit exercitationem veniam quo? Magni, culpa.</p>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {days}-night stay!</h1>
                <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam voluptatum, eius quo ipsum officiis id eveniet unde, quas explicabo alias cumque. Unde dignissimos molestias culpa.</span>
                <h2>
                <b>${days * data.cheapestPrice * options.room}</b> ({days}{" "}
                  nights)
                                  </h2>
                <button onClick={handleClick}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
          <MailList/>
          <Footer/>
        </div>
        {openModal && <Reserve setOpen={setOpenModal} hotelId={id}/>}
      </div>
  )
}
