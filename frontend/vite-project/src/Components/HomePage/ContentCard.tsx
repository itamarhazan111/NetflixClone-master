import { IContent } from "@/Models/IContent"
import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import CardHoverInterface from "../ContentCard/CardHoverInterface";



const ContentCard = (props: { content: IContent }) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();



  const handleMouseEnter = () => {
    setHovered(true)
    setTimer(
      setTimeout(() => {
        setShowTrailer(true);
      }, 1700)
    );
  };

  const handleMouseLeave = () => {
    setHovered(false)
    setShowTrailer(false);
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
  };
  const navToWatchPage = () => {
    navigate(`/watch/${props.content._id.toString()}`)
  }


  return (
    <Card className='bg-transparent border-none h-full'>
      <CardContent className="flex aspect-square p-0">
        <div className="">
          <div
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            className={`${hovered ? 'z-10' : ''
              }transform transition-transform duration-500 hover:scale-150 flex flex-col`}>
            {!showTrailer &&
              <img src={props.content.imgThumb.toString()} onClick={navToWatchPage} />
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
                height={'60%'}
                url={props.content.trailer.toString()}
                onClick={navToWatchPage}>

              </ReactPlayer>
            }
            {hovered ?
              <div className={`p-1 bg-zinc-800 shadow-2xl`}>
                <CardHoverInterface content={props.content}></CardHoverInterface>
              </div>
              : <></>}
          </div>
        </div>

      </CardContent>
    </Card >
  );

}

export default ContentCard;


// import { IContent } from "@/Models/IContent"
// import { useState } from "react";
// import ReactPlayer from "react-player";
// import { useNavigate } from "react-router-dom"

// const ContentCard = (props:{content:IContent}) => {
//   const [showTrailer, setShowTrailer] = useState(false);
//   const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
//   const navigate=useNavigate()
//   const handleMouseEnter = () => {
//     setTimer(
//       setTimeout(() => {
//         setShowTrailer(true);
//       }, 3000)
//     );
//   };

//   const handleMouseLeave = () => {
//     setShowTrailer(false);
//     if (timer) {
//       clearTimeout(timer);
//       setTimer(null);
//     }
//   };
//   const navToWatchPage=()=>{
//     navigate(/${props.content._id.toString()})
//   }
//   return (
//     <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}  style={{ width: '100%', height: '100vh', position: 'relative', overflow: 'hidden' }}>
//       {!showTrailer &&
//           <img src={props.content.imgThumb.toString()} alt="Thumbnail" style={{ width: '100%', height: 'auto' }} onClick={navToWatchPage}/>
//       }
//       {showTrailer &&
//            <ReactPlayer
//            className="pointer-events-none"
//            muted
//            playing
//            loop
//            controls={false}
//            disablePictureInPicture
//            width={'100%'}
//            height={'100%'}
//            url={props.content.trailer.toString()} 
//            onClick={navToWatchPage}>

//            </ReactPlayer>
//       }
//     </div>
//   )
// }

// export default ContentCard
