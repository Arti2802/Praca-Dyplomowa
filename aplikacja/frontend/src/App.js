import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './style.css';
import { Layout } from './pages/Layout';
import { Page404 } from './pages/Page404';
import { ProtectedPage } from './pages/ProtectedPage';
import { LoginPage } from './pages/LoginPage';
import { Rejestration } from './pages/Rejestration';
import { Home } from './pages/Home';
import { Competitions } from './pages/Competitions';
import { MyCompetitions } from './pages/MyCompetitions';
import { AddCompetiton } from './pages/AddCompetiton';
import { AddCompetitonTypes } from './pages/AddCompetitionTypes';
import { EditCompetiton } from './pages/EditCompetition';
import { ChangeCompetitonTypes } from './pages/ChangeCompetitionTypes';
import { SwimmingFacilities } from './pages/SwimmingFacilities';
import { AddSwimmingFacility } from './pages/AddSwimmingFacility';
import { EditSwimmingFacility } from './pages/EditSwimmingFacility';
import { Competitors } from './pages/Competitors';
import { Competitor } from './pages/Competitor';
import { Clubs } from './pages/Clubs';
import { Club } from './pages/Club';
import { RegisterCompetitors } from './pages/RegisterCompetitors';
import { EnterResults } from './pages/EnterResults';
import { Applications } from './pages/Applications';
import { Competition } from './pages/Competition';
import { SetSeriesAndTracks } from './pages/SetSeriesAndTracks';
import { ParticipationsList } from './pages/ParticipationsList';
import { ResultsList } from './pages/ResultsList';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <div><Toaster/></div>
      <BrowserRouter>
        <Routes>
          <Route path='/logowanie' element={<LoginPage/>}/>
          <Route path='/rejestracja' element={<Rejestration/>}/>
          <Route path='/' element={<Layout/>}>
            <Route path='*' element={<Page404/>}/>
            <Route index element={<Home/>}/>
            <Route path='/zgloszenia' element={<ProtectedPage><Applications/></ProtectedPage>}/>
            <Route path='/zawody' element={<Competitions/>}/>
            <Route path='/zawody/:pk' element={<Competition/>}/>
            <Route path='/zawody/:pk/listaStartowa/:pk2' element={<ParticipationsList/>}/>
            <Route path='/zawody/:pk/wyniki/:pk2' element={<ResultsList/>}/>
            <Route path='/mojeZawody' element={<ProtectedPage><MyCompetitions/></ProtectedPage>}/>
            <Route path='/dodajZawody' element={<ProtectedPage><AddCompetiton/></ProtectedPage>}/>
            <Route path='/dodajZawody/:pk/dodajKonkurencje' element={<ProtectedPage><AddCompetitonTypes/></ProtectedPage>}/>
            <Route path='/edytujZawody/:pk' element={<ProtectedPage><EditCompetiton/></ProtectedPage>}/>
            <Route path='/zawody/:pk/zmienKonkurencje' element={<ProtectedPage><ChangeCompetitonTypes/></ProtectedPage>}/>
            <Route path='/obiektyPlywackie' element={<ProtectedPage><SwimmingFacilities/></ProtectedPage>}/>
            <Route path='/dodajObiekt' element={<ProtectedPage><AddSwimmingFacility/></ProtectedPage>}/>
            <Route path='edytujObiekt/:pk' element={<ProtectedPage><EditSwimmingFacility/></ProtectedPage>}/>
            <Route path='/zawodnicy' element={<Competitors/>}/>
            <Route path='/zawodnicy/:pk' element={<Competitor/>}/>
            <Route path='/kluby' element={<Clubs/>}/>
            <Route path='/kluby/:pk' element={<Club/>}/>
            <Route path='/zglosZawodnikow/:pk' element={<ProtectedPage><RegisterCompetitors/></ProtectedPage>}/>
            <Route path='/wprowadzWyniki/:pk' element={<ProtectedPage><EnterResults/></ProtectedPage>}/>
            <Route path='/ustawSerieOrazTory/:pk' element={<ProtectedPage><SetSeriesAndTracks/></ProtectedPage>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
