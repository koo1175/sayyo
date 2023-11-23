import axios from 'axios';

const Test2 = () => {
    const vote = () => {
        const votingData = {
            title: '제 2대 몰입형 선거',
            memberId: 'zxc',
            num: 3
        };
        axios.post('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/voting/voted', votingData)
            .then(response => {
                if (response.data === 1) {
                    alert('투표가 성공적으로 완료되었습니다.');
                    updatePercentage(votingData.title);
                } else {
                    alert('투표에 실패하였습니다. 다시 시도해주세요.');
                }
            })
            .catch(error => {
                console.error('투표 중 에러가 발생했습니다', error);
            });
    };

    const updatePercentage = (title) => {
        const updatePercentageData = {
            title
        };
        axios.post('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/voting/candidates', updatePercentageData)
            .then(response => {
                if (response.status === 200) {
                    console.log('퍼센트 업데이트 성공!');
                    fetchCandidates();
                } else {
                    console.log('퍼센트 업데이트 실패!');
                }
            })
            .catch(error => {
                console.error('퍼센트 업데이트 에러!', error);
            });
    }
    const fetchCandidates = () => {
        axios.get('https://port-0-spring-boot-sayyo-server-147bpb2mlmecwrp7.sel5.cloudtype.app/voting/findAll')
            .then(response => {
                const candidates = response.data.list;
                let [candidate1Percentage, candidate2Percentage, candidate3Percentage, candidate4Percentage] = candidates.map(candidate => candidate.percentage);
                console.log('후보1의 득표율:', candidate1Percentage);
                console.log('후보2의 득표율:', candidate2Percentage);
                console.log('후보3의 득표율:', candidate3Percentage);
                console.log('후보4의 득표율:', candidate4Percentage);

            })
            .catch(error => {
                console.error('후보 목록을 가져오는데 실패했습니다', error);
            });
    }
    return (
        <button onClick={vote}>투표하기</button>
    );
};

export default Test2;
