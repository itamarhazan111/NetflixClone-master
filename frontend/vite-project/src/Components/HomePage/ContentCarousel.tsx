
import { IContent } from "@/Models/IContent"
import { Card, CardContent } from "../ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel"
import Content from './ContentCard'
const ContentsCarousel = (props:{contents:[IContent]}) => {
  return (
    <Carousel style={{width:"1000px" }}>
      <CarouselContent className="-ml-1">
        {Array.from({ length: props.contents.length }).map((_, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/6">
            <div className="p-1"  style={{width:"300px",height:"300px"}}>
              <Card >
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <Content content={props.contents[index]}></Content>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export default ContentsCarousel
