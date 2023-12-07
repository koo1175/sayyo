import React, { useState } from 'react';
import './style.scss';

const BookApp = () => {
  const [pageContentIndex, setPageContentIndex] = useState(0);

  const pageContents = [
    {
      title: "I",
      blockquote: "서론",
      content: "한국의 법안은 사회적인 변화와 국제적인 트렌드에 부응하여 제정됩니다. 이는 국민 안전과 복지를 강화하며 경제 발전과 기업 활동을 지원하기 위한 노력의 결과입니다. 법률의 목적은 안정성 강화, 국가 발전과 안전 보장, 인권 보호와 평등 증진, 환경 보호 및 지속 가능한 발전, 그리고 사회적 복지 증진으로 나타납니다. 이러한 법안은 사회적 불평등을 해소하고 향상된 사회 품질을 창출하는데 기여합니다.",
    },
    {
      title: "II",
      blockquote: "법안 요약",
      content: " 헌법재판소 기능연속성계획 규칙(2023. 12. 6.)은 재난 상황에서 핵심 기능을 유지하기 위한 헌법재판소의 계획, 의사결정 권한 지정, 대체 시설 확보, 직원 교육 등을 규정합니다.\n\n 고용정책 기본법 시행규칙(2023. 12. 5.)은 지역 일자리 계획, 고용영향평가, 고용형태 공시, 일자리안정자금 지원 등을 규정하여 고용정책 운영을 지원합니다.",
    },
    {
      title: "III",
      blockquote: "test2",
      content: "test2 내용",
    },
    {
      title: "IV",
      blockquote: "test3",
      content: "test3 내용",
    },
  ];

  const turned = () => {
    // 페이지 전환을 막을 조건 추가
    if (pageContentIndex < pageContents.length - 1) {
      setPageContentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const { title, blockquote, content } = pageContents[pageContentIndex];

  return (
    <div style={{ transform: 'scale(1.4)' }}>
      <div className="cover">
        <div className="book">
          <label htmlFor="page-1" className="book__page book__page--1">
            <img src="/img/제정 법안.png" alt="" />
          </label>

          <label htmlFor="page-2" className="book__page book__page--4">
            <div className="page__content">
              <h1 className="page__content-title" style={{ fontSize: 25, fontFamily: 'times new roman', fontStyle: 'normal' }}>{title}</h1>
              <div className="page__content-blockquote">
                <p className="page__content-blockquote-text" style={{ fontSize: 22, fontFamily: 'arial', fontStyle: 'normal' }}>{blockquote}</p>
                <p className="page__content-blockquote-text" style={{ fontSize: 17, fontFamily: 'ChosunNm', fontStyle: 'normal', whiteSpace: 'pre-wrap' }}>
                  {content}
                </p>
              </div>
              <div className="page__number">3</div>
            </div>
          </label>

          <input type="radio" name="page" id="page-1" />

          <input type="radio" name="page" id="page-2" />
          <label className="book__page book__page--2">
            <div className="book__page-front">
              <div className="page__content">
                <h1 className="page__content-book-title">제정 법안</h1>
                <h2 className="page__content-author">project. sayyo</h2>

                <p className="page__content-credits">
                  {/* team */}
                  {/* <span>Dike</span> */}
                </p>

                <p className="page__content-credits">
                  {/* Illustrations by */}
                  {/* <span>Alex Wells</span> */}
                </p>

                <div className="page__content-copyright">
                  {/* <p>The Folio Society</p> */}
                  {/* <p>London - MMXII</p> */}
                </div>
              </div>
            </div>
            <div className="book__page-back">
              <div className="page__content">
                <h1 className="page__content-title" style={{ fontSize: 20 }}>content</h1>
                <table className="page__content-table">
                  <tr>
                    <td align="left">I</td><td align="left" style={{ fontSize: 12, fontFamily: 'arial' }}>서론</td><td align="right">3</td>
                  </tr>
                  <tr>
                    <td align="left">II</td><td align="left" style={{ fontSize: 12, fontFamily: 'arial' }}>법안 요약</td><td align="right">43</td>
                  </tr>
                  <tr onClick={turned}>
                    <td align="left">III</td><td align="left" style={{ fontSize: 12, fontFamily: 'arial' }}>법안의 주요 내용</td><td align="right">87</td>
                  </tr>
                  <tr>
                    <td align="left">IV</td><td align="left" style={{ fontSize: 12, fontFamily: 'arial' }}>부칙</td><td align="right">147</td>
                  </tr>
                  <tr>
                    <td align="left">V</td><td align="left" style={{ fontSize: 12, fontFamily: 'arial' }}>참고 문헌</td><td align="right">173</td>
                  </tr>
                </table>

                <div className="page__number">2</div>
              </div>
            </div>
          </label>
        </div>
      </div>

      {/* 투명한 오른쪽 정렬된 버튼 */}
      <div
        className="transparent-button"
        onClick={turned}
        style={{
          position: 'fixed',
          top: '50%',
          right: 700,
          transform: 'translateY(-50%)',
          width: '200px',
          height: '360px',
          backgroundColor: 'transparent',
          // transparent
          cursor: 'pointer',
        }}
      />
    </div>
  );
};

export default BookApp;
