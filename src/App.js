import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './views/Navigation/Navigation';
import Copyright from './views/Copyright';
import KaKaoHandeler from './views/AuthForm';
import PopUPModal from './views/PopUpModal';
import HomePage from './views/pages/HomePage';
import AuthForm from './views/AuthForm';

import AdminPage from './views/AdminPage';
import Fullfillment from './views/AdminPage/Fullfillment';
import Member from './views/AdminPage/Member'

import Inquiry from "./views/Inquiry";
import InquiryDetil from "./views/Inquiry/InquiryDetail";
import InquiryEdit from "./views/Inquiry/InquiryEdit";
import InquiryWrite from "./views/Inquiry/InquiryWrite";

import Main from "./views/Main";
import OrganizationChart from "./views/OrganizationChart";
import Board from "./views/Board";
import Community from "./views/Community";
import AboutUs from "./views/AboutUs";
import Gyeonggi from './views/Gyeonggi';
import MockElectionComponent from './views/MockElectionComponent';

import MyPage from './views/MyPage';

import InfoSu from './views/SiblingFade/Info/suchan';
import PromiseSu from './views/SiblingFade/Promise/suchan';
import NewsSu from './views/SiblingFade/News/suchan';

import InfoHee from './views/SiblingFade/Info/heeyeon';
import PromiseHee from './views/SiblingFade/Promise/heeyeon';
import NewsHee from './views/SiblingFade/News/heeyeon';

import InfoYoung from './views/SiblingFade/Info/youngsil';
import PromiseYoung from './views/SiblingFade/Promise/youngsil';
import NewsYoung from './views/SiblingFade/News/youngsil';

import InfoSeung from './views/SiblingFade/Info/seungju';
import PromiseSeung from './views/SiblingFade/Promise/seungju';
import NewsSeung from './views/SiblingFade/News/seungju';

import BoardWrite from './views/Board/board/BoardWrite';
import BoardDetail from './views/Board/board/BoardDetail';
import BoardEdit from './views/Board/board/BoardEdit';
import BoardList from './views/Board/board/BoardList';

import CalendarPage from './views/Calendar';

import ShowSlideImage from "./views/ShowSlideImage";

import Test from './views/Test';
import Chat from './views/Chat';
import Politician from './views/Politician';
import Quiz from './Quiz';
import QuizPage from './QuizPage';
import QuizResult from './QuizResult';

function App() {

  return (
    <div className="App" style={{ position: 'relative', minHeight: '100vh' }}>
      {/* <Copyright/>
      <Navigation /> */}
      <Router>
        <Navigation />
        <Routes>
          <Route path="/login/oauth2/callback/kakao" element={<KaKaoHandeler />} />
          <Route path="/login" element={<AuthForm/>} />
          <Route path="/" element={<HomePage/>} />
          <Route path="/Gyeonggi" element={<Gyeonggi/>} />
          <Route path='/MyPage' element={<MyPage />} />
          <Route path="/Calendar" element={<CalendarPage />} />
          <Route path="/Main" element={<Main />} />
          <Route path="/OrganizationChart" element={<OrganizationChart />} />
          <Route path="/Board" element={<Board />} />
          <Route path="/Community" element={<Community />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/MockElectionComponent" element={<MockElectionComponent />} />

          <Route path="/InfoSu" component={InfoSu} />
          <Route path="/PromiseSu" component={PromiseSu} />
          <Route path="/NewsSu" component={NewsSu} />

          <Route path='/Inquiry' element={<Inquiry />} />
          <Route path='/InquiryDetail/:num' element={<InquiryDetil />} />
          <Route path='/InquiryWrite' element={<InquiryWrite />} />
          <Route path='/InquiryEdit/:num' element={<InquiryEdit />} />

          <Route path="/InfoHee" component={InfoHee} />
          <Route path="/PromiseHee" component={PromiseHee} />
          <Route path="/NewsHee" component={NewsHee} />

          <Route path="/InfoYoung" component={InfoYoung} />
          <Route path="/PromiseYoung" component={PromiseYoung} />
          <Route path="/NewsYoung" component={NewsYoung} />

          <Route path="/InfoSeung" component={InfoSeung} />
          <Route path="/PromiseSeung" component={PromiseSeung} />
          <Route path="/NewsSeung" component={NewsSeung} />

          <Route path='/BoardList' element={<BoardList />} />
          <Route path='/BoardDetail/:num' element={<BoardDetail />} />
          <Route path='/BoardWrite' element={<BoardWrite />} />
          <Route path='/BoardEdit/:num' element={<BoardEdit />} />
          
          <Route path="/ShowSlideImage" element={<ShowSlideImage />} />

          <Route path="/Test" element={<Test />} />
          <Route path="/Chat" element={<Chat />} />
          <Route path="/Politician" element={<Politician />} />
          <Route path="/Quiz" element={<Quiz />} />
          <Route path="/Quizpage" element={<QuizPage />} />
          <Route path="/QuizResult" element={<QuizResult />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
