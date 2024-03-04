
import Title from '../Components/shared/Title'

import CheckUser from '@/Components/shared/CheckUser';
import NavBar from '@/Components/shared/NavBar';

import ContentPage from '@/Components/shared/ContentPage';
import BillBoard from '@/Components/shared/BillBoard';



const SeriesPage = () => {

  return (
    <div>

        <CheckUser/>
        <NavBar></NavBar>
        <Title title='Home - Netflix'/>
        <BillBoard isSeries="true"></BillBoard>
        
        <ContentPage name='series'></ContentPage>

    </div>
  )
}

export default SeriesPage