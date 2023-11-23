import React, { Component } from 'react';
import axios from 'axios';
import MapComponent from './Map';
import Gyeonggi from './Gyeonggi';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      slides: [],
      slidesMayor: [],
      slidesNews: [],
      slidesAccidents: [],
    };
  }

  componentDidMount() {
    this.handleSubmit('경기도 시장', 'slidesMayor');
    this.handleSubmit('지역소식', 'slidesNews');
    this.handleSubmit('사건사고', 'slidesAccidents');
  }

  handleSearchChange = (event) => {
    this.setState({ search: event.target.value });
  }

  handleSubmit = (search, stateKey) => {
    axios.get(`http://127.0.0.1:5000/scrape/google?search=${search}`)
      .then((response) => {
        this.setState({
          [stateKey]: response.data.map(result => ({
            title: result.title,
            link: result.link,
            image: result.image
          }))
        });
      })
      .catch((error) => {
        console.error('Google Error:', error);
      });

  }

  render() {
    const { slidesMayor, slidesNews, slidesAccidents } = this.state;
    return (
      <>
        <div>
          <Gyeonggi
            slidesMayor={slidesMayor}
            slidesNews={slidesNews}
            slidesAccidents={slidesAccidents}
          />
        </div>
      </>
    );
  }
}


export default Search;