import useFetch from "../../hooks/UseFetch";
import "./FeaturedProperties.css"

export default function FeaturedProperties() {
    const { data, loading, error } = useFetch(
        "/hotels?featured=true&limit=4"
      );

  return (
    <div className="fp">
       { loading ? (
        "loading please wait"
      ):(<>
      {data.map((item)=>( 

            <div className="fpItem" key={item._id}>

          <img src="https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=" alt="" className="fpImg" />
        <span className="fpName">{item.name}</span>
        <span className="fpCity">{item.city}</span>
        <span className="fpPrice">Starting at ${item.name}</span>
        <div className="fpRating">
            <button>8.9</button>
            <span>Excellent</span>
        </div>
        </div>
        ))
        }
        </>)
         }
       
       

    </div>
  )
}
