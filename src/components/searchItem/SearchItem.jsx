import { Link } from "react-router-dom";
import "./SearchItem.css";

export default function SearchItem({item}) {
  return (
    <>
    <div className="searchItem">
        <img src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o=" alt="" className="siImg" />
        <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance}m from center</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">
          Studio Apartment with Air conditioning
        </span>
        <span className="siFeatures">{item.desc}</span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div><div className="siDetails">
         <div className="siRating">
            <span>Excellent</span>
            <button>8.9</button>
        </div>
        <div className="siDetailTexts">
            <span className="siPrice">${item.cheapestPrice}</span>
            <span className="siTaxOp">Includes taxes and fees</span>
            <Link to={`${item._id}`}>
            <button className="siCheckButton">See Availability</button>
            </Link>
        </div>
      </div>

      
      
    </div>


    </>
    
  )
}
