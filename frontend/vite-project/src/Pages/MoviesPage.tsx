
import Title from '../Components/shared/Title'
import CheckUser from '@/Components/shared/CheckUser';
import NavBar from '@/Components/shared/NavBar';
import ContentPage from '@/Components/shared/ContentPage';
import BillBoard from '@/Components/shared/BillBoard';


const MoviesPage = () => {
   
  return (
    <div>
        <CheckUser/>
        <NavBar></NavBar>
        <Title title='Home - Netflix'/>
        <BillBoard isSeries="false"></BillBoard>
        <ContentPage name='movies'></ContentPage>

    </div>
  )
}

export default MoviesPage