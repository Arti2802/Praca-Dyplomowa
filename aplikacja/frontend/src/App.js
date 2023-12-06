import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './style.css';
import { Layout } from './pages/Layout';
import { Page404 } from './pages/Page404';
import { LoginPage } from './pages/LoginPage';
import { Home } from './pages/Home';
import { Competitions } from './pages/Competitions';
import { MyCompetitions } from './pages/MyCompetitions';
import { AddCompetiton } from './pages/AddCompetiton';
import { EditCompetiton } from './pages/EditCompetition';
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
import { CompetitionDetail } from './pages/CompetitionDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/logowanie' element={<LoginPage/>}/>
        <Route path='/' element={<Layout/>}>
          <Route path='*' element={<Page404/>}/>
          <Route index element={<Home/>}/>
          <Route path='/zgloszenia' element={<Applications/>}/>
          <Route path='/zawody' element={<Competitions/>}/>
          <Route path='/zawody/:pk' element={<CompetitionDetail/>}/>
          <Route path='/mojeZawody' element={<MyCompetitions/>}/>
          <Route path='/dodajZawody' element={<AddCompetiton/>}/>
          <Route path='/edytujZawody/:pk' element={<EditCompetiton/>}/>
          <Route path='/obiektyPlywackie' element={<SwimmingFacilities/>}/>
          <Route path='/dodajObiekt' element={<AddSwimmingFacility/>}/>
          <Route path='edytujObiekt/:pk' element={<EditSwimmingFacility/>}/>
          <Route path='/zawodnicy' element={<Competitors/>}/>
          <Route path='/zawodnicy/:pk' element={<Competitor/>}/>
          <Route path='/kluby' element={<Clubs/>}/>
          <Route path='/kluby/:pk' element={<Club/>}/>
          <Route path='/zglosZawodnikow/:pk' element={<RegisterCompetitors/>}/>
          <Route path='/wprowadzWyniki/:pk' element={<EnterResults/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
