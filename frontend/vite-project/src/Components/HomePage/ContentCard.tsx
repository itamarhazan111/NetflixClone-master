import { IContent } from "@/Models/IContent"
import ReactPlayer from "react-player/youtube"

const ContentCard = (props:{content:IContent}) => {
  return (
    <div>
          <img src={props.content.imgThumb.toString()}/>
          {/* <ReactPlayer style={{width:50,height:50}}  url={props.content.trailer.toString()}></ReactPlayer>
          "{props.content.title}" */}
    </div>
  )
}

export default ContentCard