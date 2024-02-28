import { IContent } from "@/Models/IContent"
import { useState } from "react";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom"

const ContentCard = (props:{content:IContent}) => {
  const [showTrailer, setShowTrailer] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const navigate=useNavigate()
  const handleMouseEnter = () => {
    setTimer(
      setTimeout(() => {
        setShowTrailer(true);
      }, 3000)
    );
  };

  const handleMouseLeave = () => {
    setShowTrailer(false);
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
  };
  const navToWatchPage=()=>{
    navigate(`/${props.content._id.toString()}`)
  }
  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}  style={{ width: '100%', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {!showTrailer &&
          <img src={props.content.imgThumb.toString()} alt="Thumbnail" style={{ width: '100%', height: 'auto' }} onClick={navToWatchPage}/>
      }
      {showTrailer &&
           <ReactPlayer                 
           className="pointer-events-none"
           muted
           playing
           loop
           controls={false}
           disablePictureInPicture
           width={'100%'}
           height={'100%'}  
           url={props.content.trailer.toString()} 
           onClick={navToWatchPage}>

           </ReactPlayer>
      }
    </div>
  )
}

export default ContentCard