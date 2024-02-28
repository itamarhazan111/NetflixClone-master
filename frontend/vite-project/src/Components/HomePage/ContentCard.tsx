import { IContent } from "@/Models/IContent"
import { useNavigate } from "react-router-dom"

const ContentCard = (props:{content:IContent}) => {
  const navigate=useNavigate()
  const navToWatchPage=()=>{
    navigate(`/${props.content._id.toString()}`)
  }
  return (
    <div>
          <img src={props.content.imgThumb.toString()} onClick={navToWatchPage}/>
          {/* <ReactPlayer style={{width:50,height:50}}  url={props.content.trailer.toString()}></ReactPlayer>
          "{props.content.title}" */}
    </div>
  )
}

export default ContentCard