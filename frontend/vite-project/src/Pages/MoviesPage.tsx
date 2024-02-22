
import Title from '../Components/shared/Title'
import CheckUser from '@/Components/shared/CheckUser';
import NavBar from '@/Components/shared/NavBar';
import ContentPage from '@/Components/shared/ContentPage';


const MoviesPage = () => {
   
  return (
    <div>
        <CheckUser/>
        <NavBar></NavBar>
        <Title title='Home - Netflix'/>
        <h1>NetFlix</h1>
        
        <ContentPage name='movies'></ContentPage>

    </div>
  )
}

export default MoviesPage