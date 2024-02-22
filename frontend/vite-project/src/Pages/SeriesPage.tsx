
import Title from '../Components/shared/Title'

import CheckUser from '@/Components/shared/CheckUser';
import NavBar from '@/Components/shared/NavBar';

import ContentPage from '@/Components/shared/ContentPage';



const SeriesPage = () => {

  return (
    <div>

        <CheckUser/>
        <NavBar></NavBar>
        <Title title='Home - Netflix'/>
        <h1>NetFlix</h1>
        
        <ContentPage name='series'></ContentPage>

    </div>
  )
}

export default SeriesPage