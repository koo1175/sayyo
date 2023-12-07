import React from 'react';
import './style2.scss'

const BookApp2 = () => {
  return (
    <div style={{transform:'scale(1.4)'}}>
  <div className="cover-two">
    <div className="book-two">
      <label for="page-1" className="book__page book__page--1">
        <img src="/img/투표 관련 법규.png" alt="" />
      </label>

      <label for="page-2" className="book__page book__page--4">
        <div className="page__content-two">
          <h1 className="page__content-title">I</h1>
          <div className="page__content-blockquote">
            <p className="page__content-blockquote-text" >HARI SELDON — . . . born in the 11,988th year of the Galactic Era; died 12,069. The dates are more commonly given in terms of the current Foundational Era as -79 to the year 1 F.E. Born to middle-className parents on Helicon, Arcturus sector (where his father, in a legend of doubtful authenticity, was a tobacco grower in the hydroponic plants of the planet), he early showed amazing ability in mathematics. Anecdotes concerning his ability are innumerable, and some are contradictory. At the age of two, he is said to have. . . </p>
            <p className="page__content-blockquote-text">. . . Undoubtedly his greatest contributions were in the field of psychohistory. Seldon found the field little more than a set of vague axioms; he left it a profound statistical science. . . . </p>
            <p className="page__content-blockquote-text">. . . The best existing authority we have for the details of his life is the biography written by Gaal Dornick who, as a young man, met Seldon two years before the great mathematician's death. The story of the meeting . . .</p>
            <span className="page__content-blockquote-reference">Encyclopedia Galactica*</span>
          </div>
          <div className="page__content-text">
            <p>His name was Gaal Dornick and he was just a country boy who had never seen Trantor before. That is, not in real life. He had seen it many times on the hyper-video, and occasionally in tremendous three-dimensional newscasts covering an Imperial Coronation or the opening of a Galactic Council. Even though he had lived all his life on the world of Synnax, which circled a star at the edges of the Blue Drift, he was not cut off from civilization, you see. At that time, no place in the Galaxy was. </p>
          </div>
          <div className="page__number-two">3</div>
        </div>
      </label>


      <input type="radio" name="page" id="page-1" />


      <input type="radio" name="page" id="page-2" />
      <label className="book__page book__page--2">
        <div className="book__page-front">
          <div className="page__content">
            <h1 className="page__content-book-title">선거 법규</h1>
            <h2 className="page__content-author">Team. Dike</h2>

            <p className="page__content-credits">
              {/* Introduction by */}
              {/* <span>Paul Krugman</span> */}
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
            <h1 className="page__content-title">Contents</h1>
            <table className="page__content-table">
              <tr>
                <td align="left">Part I</td><td align="left">The Psycohistorians</td><td align="right">3</td>
              </tr>
              <tr>
                <td align="left">Part II</td><td align="left">The Encyclopedists</td><td align="right">43</td>
              </tr>
              <tr>
                <td align="left">Part III</td><td align="left">The Mayors</td><td align="right">87</td>
              </tr>
              <tr>
                <td align="left">Part IV</td><td align="left">The Traders</td><td align="right">147</td>
              </tr>
              <tr>
                <td align="left">Part V</td><td align="left">The Merchant Princes</td><td align="right">173</td>
              </tr>
            </table>

            <div className="page__number">2</div>
          </div>
        </div>
      </label>
    </div>
  </div>
</div >
  );
};

export default BookApp2;
