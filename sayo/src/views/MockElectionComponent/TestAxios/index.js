import React from 'react';
import axios from 'axios';

export default class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: [],
    };
  }

  // 컴포넌트가 마운트되었을 때 데이터를 가져옵니다.
  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const memberDto = {
      region: '성남',

    };
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    axios.post('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/politician/findSearch', memberDto, config)
      .then(response => {
        console.log('성공!! -> ', response.data);
        this.setState({ result: response.data });
        //console.log(this.state);
      })
    .catch(error => {
          console.error('에러:', error);
    })
  }

  render() {
    return (
      <div>
        {this.state.result.list && this.state.result.list.map((item, index) => (
          <div key={index}>
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    );
  }
}
