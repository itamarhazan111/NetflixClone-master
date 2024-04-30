
import Title from '../Components/shared/Title'
import CheckUser from '@/Components/shared/CheckUser';
import ContentPage from '@/Components/shared/ContentPage';
import BillBoard from '@/Components/shared/BillBoard';
import { useContext } from 'react';
import { User } from '@/Context/user';
import ContentsCarousel from '@/Components/HomePage/ContentCarousel';



const HomePage = () => {
  const {state:{userInfo}} = useContext(User);
  return (
    <div >
      <CheckUser/>
        <Title title='Home - Netflix'/>
        <BillBoard isSeries='home'></BillBoard>
        <ContentsCarousel contents={userInfo.myRecommendations} title="Recommended for you" />
        <ContentPage name='genres'></ContentPage>
        <ContentPage name='series'></ContentPage>
        <ContentPage name='movies'></ContentPage>


    </div>
  )
}

export default HomePage