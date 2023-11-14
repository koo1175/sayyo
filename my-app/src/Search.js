import React, { Component } from 'react';
import axios from 'axios';
import MapComponent from './Map';
import Gyeonggi from './Gyeonggi';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      id: '',
      pw : '',
      resultsGoogle: [],
      resultsNaver: [],
      resultsLike: [],
      resultsDislike: [],
    };
  }

  componentDidMount() {
    this.handleSubmit();
  }

  handleSearchChange = (event) => {
    this.setState({ search: event.target.value });
  }
  handleSubmit = () => {
    const { search } = this.state;
    // Google의 결과를 가져옴
    axios.get(`http://127.0.0.1:5000/scrape/google?search=${search}`)
      .then((response) => {
        console.log('Google 성공:', response);
        this.setState({ resultsGoogle: response.data });
        this.props.onResults(response.data);//추가
      })
      .catch((error) => {
        console.error('Google Error:', error);
      });
    
    // Naver의 결과를 가져옴
    axios.get(`http://127.0.0.1:5000/scrape/naver?search=${search}`)
      .then((response) => {
        console.log('Naver 성공:', response);
        this.setState({ resultsNaver: response.data });
       // this.props.onResults(response.data); //추가
      })
      .catch((error) => {
        console.error('Naver Error:', error);
      });
  }

  handleLike = () => {
  const pLikeDto = {
    memberId : "koo", // 실제 member id 값을 사용해야 합니다.
    politicianNum: "1", // 실제 politician num 값을 사용해야 합니다.
    likeState: '1',
  };
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  console.log(JSON.stringify(pLikeDto));
    axios.post(`http://localhost:8035/plike/like`, JSON.stringify(pLikeDto), config)
      .then((response) => {
        console.log('좋아요 성공:', response);
        this.setState({ resultLike: response.data });
      })
      .catch((error) => {
        console.error('좋아요 Error:', error);
      });
  }

  handleDislike = () => {
    const pLikeDto = {
      memberId: "koo", // 실제 member id 값을 사용해야 합니다.
      politicianNum: "1", // 실제 politician num 값을 사용해야 합니다.
      likeState: '2',
    };
  
    axios.post(`http://localhost:8035/plike/dislike`, pLikeDto)
      .then((response) => {
        console.log('싫어요 성공:', response);
        this.setState({ resultDislike: response.data });
      })
      .catch((error) => {
        console.error('싫어요 Error:', error);
      });
  }

  render() {
    const { search, resultsGoogle, resultsNaver } = this.state;
  return (
    <>
        <div>
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={search}
            onChange={this.handleSearchChange}
          />
          <button onClick={this.handleSubmit}>검색</button>
          {/* <h2>Google 결과:</h2>
          {resultsGoogle.map((result, index) => (
            <div key={index}>
              <h2>Title: {result.title}</h2>
              <p>Content: {result.content}</p>
              <p>Link: {result.link}</p>
              <p>Image: {result.image}</p>
              <hr />
            </div>
          ))}
          <hr />
          <h2 style={{"color":"green"}}>Naver 결과:</h2>
          {resultsNaver.map((result, index) => (
            <div key={index}>
              <h2>Title: {result.title}</h2>
              <p>Content: {result.content}</p>
              <p>Link: {result.link}</p>
              <p>Image: {result.image}</p>
              <hr />
            </div>
          ))} */}
        </div>
        <MapComponent results={resultsGoogle.concat(resultsNaver)} />

           
      </>
  );
  }
}


export default Search;