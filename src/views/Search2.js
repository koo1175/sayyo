import React, { Component } from 'react';
import axios from 'axios';

class Search2 extends Component {
    constructor(props) {
        super();
        this.state = {
            search: props.keyword + ' 소식',
        };
    }

    componentDidMount() {
        this.handleSubmit();
    }

    handleSubmit = () => {
        const { search } = this.state;
        axios.get(`http://127.0.0.1:5000/scrape/google?search=${search}`)
            .then((response) => {
                //console.log('Google 성공123123:', response);
                this.props.handleData(response.data);
                })
            .catch((error) => {
                console.error('Google Error:', error);
            });
    }

    render() {
        return null; 
    }
}

export default Search2;
