import { IContent } from "@/Models/IContent"
import ReactPlayer from "react-player/youtube"

const ContentCard = (props:{content:IContent}) => {
  return (
    <div>"{props.content.title}"
        <div style={{width:50,height:50}}>
          <ReactPlayer style={{width:50,height:50}} url={props.content.trailer.toString()}></ReactPlayer>
        </div>
    </div>
  )
}

export default ContentCard