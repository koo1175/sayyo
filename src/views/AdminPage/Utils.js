
const Utils = {
  months: ({ count }) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // 0부터 시작하므로 현재 월은 0~11 사이의 값
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'
    ];

    // 현재 월부터 count 개수만큼의 월 데이터 생성
    const resultMonths = Array.from({ length: count }, (_, index) => {
      const monthIndex = (currentMonth + index) % 12;
      return months[monthIndex];
    });

    return resultMonths;
  },
};

export default Utils;
