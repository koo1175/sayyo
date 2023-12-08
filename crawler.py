from flask import Flask, jsonify, Response, request
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from flask_cors import CORS
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.chrome.options import Options
import pymysql
import schedule
import time
import re
from bs4 import BeautifulSoup

# pip install selenium
# pip install flask


app = Flask(__name__)
CORS(app)  # CORS 적용

# 웹드라이버 경로 설정
driver_path = 'C:/chromedriver_win32/chromedriver.exe'

# JSON 응답의 한글 깨짐 방지를 위한 JSON 인코딩 설정
app.config['JSON_AS_ASCII'] = False

chrome_options = Options()
chrome_options.add_argument("--headless")  # 브라우저를 띄우지 않음
chrome_options.add_argument("--disable-gpu")  # GPU 사용 안함
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")


prefs = {"profile.managed_default_content_settings.images": 2,  # 이미지 로드 안함
         "profile.default_content_setting_values.notifications": 2}  # 알림창 끔
chrome_options.add_experimental_option("prefs", prefs)

# "서울 소식","수원 소식", "동두천 소식", "안산 소식", "고양 소식", "과천 소식", "의왕 소식", "구리 소식"
# , "남양주 소식", "김포 소식", "화성 소식", "광주 소식", "양주 소식", "포천 소식", "여주 소식", "안성 소식"
# , "오산 소식", "시흥 소식", "군포 소식", "하남 소식", "이천 소식", "용인 소식", "파주 소식", "부천 소식", "광명 소식"
# , "평택 소식", "안양 소식", "성남 소식", "의정부 소식"
@app.route('/scrape/google', methods=['GET'])
def get_data_of_google():
    search_list = ["선문대학교","경기도 소식", "경기도 사건사고", "경기도 행사", "오세훈 시장", 
                    "이재준 시장", "박형덕 시장", "이민근 시장", "이동환 시장", "신계용 시장",
                    "김성제 시장", "백경현 시장", "주광덕 시장", "김병수 시장", "정명근 시장", 
                    "방세환 시장", "강수현 시장", "백영현 시장", "이충우 시장", "김보라 시장", 
                    "이권재 시장", "임병택 시장", "하은호 시장", "이현재 시장", "이상일 시장", 
                    "김경일 시장", "김경희 시장", "신상진 시장", "김동근 시장", "최대호 시장", 
                    "조용익 시장", "박승원 시장", "정장선 시장",
                    "서울 소식","수원 소식", "동두천 소식", "안산 소식", "고양 소식", "과천 소식", "의왕 소식", "구리 소식"
                    , "남양주 소식", "김포 소식", "화성 소식", "광주 소식", "양주 소식", "포천 소식", "여주 소식", "안성 소식"
                    , "오산 소식", "시흥 소식", "군포 소식", "하남 소식", "이천 소식", "용인 소식", "파주 소식", "부천 소식", "광명 소식"
                    , "평택 소식", "안양 소식", "성남 소식", "의정부 소식",
                    "서울 사건사고","수원 사건사고", "동두천 사건사고", "안산 사건사고", "고양 사건사고", "과천 사건사고", "의왕 사건사고", "구리 사건사고"
                    , "남양주 사건사고", "김포 사건사고", "화성 사건사고", "광주 사건사고", "양주 사건사고", "포천 사건사고", "여주 사건사고", "안성 사건사고"
                    , "오산 사건사고", "시흥 사건사고", "군포 사건사고", "하남 사건사고", "이천 사건사고", "용인 사건사고", "파주 사건사고", "부천 사건사고", "광명 사건사고"
                    , "평택 사건사고", "안양 사건사고", "성남 사건사고", "의정부 사건사고",
                    "서울 행사","수원 행사", "동두천 행사", "안산 행사", "고양 행사", "과천 행사", "의왕 행사", "구리 행사"
                    , "남양주 행사", "김포 행사", "화성 행사", "광주 행사", "양주 행사", "포천 행사", "여주 행사", "안성 행사"
                    , "오산 행사", "시흥 행사", "군포 행사", "하남 행사", "이천 행사", "용인 행사", "파주 행사", "부천 행사", "광명 행사"
                    , "평택 행사", "안양 행사", "성남 행사", "의정부 행사"
                   ]
    for search in search_list:
        
        # 웹드라이버 초기화
        webdriver_service = Service(driver_path)
        driver = webdriver.Chrome(service=webdriver_service, options=chrome_options)

        # MySQL에 연결
        conn = pymysql.connect(host='svc.sel5.cloudtype.app', port=30197, user='root', password='3897', db='sayyo', charset='utf8')

        # 커서 생성
        curs = conn.cursor(pymysql.cursors.DictCursor)

        # 전체적으로 돌리기 전에 이미 존재하는 데이터 날려주기
        sql_d = "DELETE FROM ISSUE WHERE SEARCH = %s AND (IMPORTSCORE = 0 OR (IMPORTSCORE = 3 AND LOADCOUNT = 1))"
        curs.execute(sql_d, (search))
        # 기존에 있는 IMPORTSCORE = 3 인 애들 LOADCOUNT 1씩 카운팅 해주기
        sql_u = "UPDATE ISSUE SET LOADCOUNT = LOADCOUNT + 1 WHERE IMPORTSCORE = 3 AND LOADCOUNT = 1"
        curs.execute(sql_u)

        urls = [
            "https://www.google.com/search?q="+search+"&sca_esv=579408689&tbm=nws&ei=xB9GZfncK9rg2roPypWnqAU&start=10&sa=N&ved=2ahUKEwj5zv2RlKqCAxVasFYBHcrKCVUQ8tMDegQIAhAE&biw=1005&bih=945&dpr=1",
            "https://www.google.com/search?q="+search+"&sca_esv=586549689&tbm=nws&sxsrf=AM9HkKm56w_czHWiyE1MG0ra2QTiVh0eIA:1701329391937&ei=7zloZe7qOMPt-AbMtaSIDw&start=20&sa=N&ved=2ahUKEwiunrXwmeuCAxXDNt4KHcwaCfE4ChDy0wN6BAgEEAc&biw=479&bih=919&dpr=1"
            
        ]
        urlcount = 0
        for url in urls:
            urlcount += 1
            driver.get(url)
            # 필요한 요소가 나타날 때까지 대기
            WebDriverWait(driver, 10).until(EC.presence_of_all_elements_located((By.CLASS_NAME, 'iRPxbe')))

            elements = driver.find_elements(By.CLASS_NAME, 'iRPxbe')
            image_elements = driver.find_elements(By.CLASS_NAME, 'vJOb1e')
            link_elements = driver.find_elements(By.CLASS_NAME, 'SoaBEf')

            results = []

            

            for i in range(len(elements)):
                title = elements[i].find_element(By.CLASS_NAME, 'n0jPhd').text
                content = elements[i].find_element(By.CLASS_NAME, 'GI74Re').text
                pressInfo = elements[i].find_element(By.CLASS_NAME, 'MgUUmf').find_element(By.TAG_NAME, 'span').text
                time_info_text = elements[i].find_element(By.CLASS_NAME, 'OSrXXb').find_element(By.TAG_NAME, 'span').text
                
                try:
                    image_element = image_elements[i].find_element(By.CLASS_NAME, 'uhHOwf').find_element(By.TAG_NAME, 'img')
                    image = image_element.get_attribute('src')  # img 태그에서 src 속성의 값을 가져옴
                    news_logo_element = image_elements[i].find_element(By.CLASS_NAME, 'MgUUmf').find_element(By.TAG_NAME, 'img')
                    news_logo = news_logo_element.get_attribute('src')
                except NoSuchElementException:
                    image = "No image found in this element."
                if i < len(link_elements):  # 'CAcQAA' 클래스를 가진 요소가 존재하는지 확인
                    try:
                        link = link_elements[i].find_element(By.TAG_NAME, 'a').get_attribute('href')
                    except NoSuchElementException:
                        link = "No link found in this element."
                
                results.append({
                    'title': title,
                    'content': content,
                    'image': image,
                    'link': link,
                    'pressInfo': pressInfo,
                    'time': time_info_text,
                    'newsLogo': news_logo,
                })

                # 결과를 콘솔에 출력
                print(f"Title: {title}")
                print(f"Content: {content}")
                print(f"Image: {image}")
                print(f"Link: {link}")
                print(f"pressInfo: {pressInfo}")
                print(f"time_info_text: {time_info_text}")
                print(f"newsLogo: {news_logo}")
                print()

                pressList = ['한겨레', '경향신문', '동아일보', '중앙일보', '조선일보', '한국일보']
                if pressInfo in pressList:
                    importScore = 3
                else:
                    importScore = 0
                # 'title'과 같은 값인 TITLE이 있는지 확인
                sql_check = "SELECT * FROM ISSUE WHERE TITLE = %s"
                curs.execute(sql_check, (title,))

                # 결과가 없다면 INSERT 수행
                if curs.fetchone() is None:
                    sql_insert = "INSERT INTO ISSUE (SEARCH, TITLE, CONTENT, IMAGE, LINK, MAGAZINE, WROTETIME, NEWSLOGO, IMPORTSCORE, LOADCOUNT) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
                    curs.execute(sql_insert, (search, title, content, image, link, pressInfo, time_info_text, news_logo, importScore, 0))
            
            print("=======================================")
            print("한 턴을 돌았습니다.")
            # 변경사항 저장
            conn.commit()

            # 3초 동안 대기합니다.
            time.sleep(3)  
        

    # 웹드라이버 종료
    driver.quit()
    

    # MySQL 연결 종료
    conn.close()


    return jsonify(results)


@app.route('/scrape/laws', methods=['GET'])
def get_data_of_law():
        
    # 웹드라이버 초기화
    webdriver_service = Service(driver_path)
    driver = webdriver.Chrome(service=webdriver_service, options=chrome_options)

    url = "https://www.law.go.kr/LSW/lsSc.do?menuId=1&subMenuId=23&tabMenuId=123&eventGubun=060103#"
    driver.get(url)

    # 페이지 로딩 대기
    time.sleep(3)

    # BeautifulSoup으로 HTML 파싱
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')

    # tbody에서 tr 태그들을 선택
    rows = soup.select('tbody tr')

    # MySQL에 연결
    conn = pymysql.connect(host='svc.sel5.cloudtype.app', port=30197, user='root', password='3897', db='sayyo', charset='utf8')

    # 커서 생성
    curs = conn.cursor(pymysql.cursors.DictCursor)

    # 결과를 저장할 리스트 초기화
    results = []
    cnt = 0

    sql = "TRUNCATE TABLE LAWS"
    curs.execute(sql)

    # 각 행에서 텍스트 데이터 추출
    for row in rows:
        # td 태그 중 class가 'tl'인 것에서 a 태그의 텍스트를 가져옴
        name = row.select_one('td.tl a').get_text()
        # td 태그 중 class가 'tl'인 것에서 a 태그의 href 속성 값을 가져옴
        a_href = row.select_one('td.tl a')['onclick']
        # onclick 속성 값에서 'liBgcolorXX' 부분만 추출
        liBgcolor = re.search("'(liBgcolor\d+)'", a_href).group(1)
        # 시행 일자 (첫 번째 td 태그의 텍스트를 가져옴)
        try_date = row.select('td')[2].get_text()
        # 법령종류 
        kind_of_law = row.select('td')[3].select('p')[0].get_text()
        # 공포 일자 
        promulgation = row.select('td')[5].get_text()
        # 제정/개정 구분 
        kind_of_change = row.select('td')[6].get_text()
        # 제정/개정 구분 
        kind_of_change = row.select('td')[7].select('p')[0].get_text()

        # 결과 리스트에 추가
        results.append((name, liBgcolor, try_date, kind_of_law, promulgation, kind_of_change))
        print(f"a_text: {name}")
        print(f"liBgcolor: {liBgcolor}")
        print(f"try_date: {try_date}")
        print(f"kind_of_law: {kind_of_law}")
        print(f"promulgation: {promulgation}")
        print(f"kind_of_change: {kind_of_change}")

        link = url+liBgcolor


        # 데이터를 MySQL에 삽입
        sql = "INSERT INTO LAWS (NAME, LINK, TRYDATE, KINDOFLAW, PROMULGATION, CHANGES, KIND) VALUES (%s, %s, %s, %s, %s, %s, %s)"
        curs.execute(sql, (name, link, try_date, kind_of_law, promulgation, kind_of_change, "최신"))

        conn.commit()
        cnt+=1
        print(cnt)

        if(cnt==50):
            break
    
    url = "https://www.law.go.kr/LSW/lsAstSc.do?menuId=391&subMenuId=397&tabMenuId=437&lsFdCd=03,03010000,03020000,03030000&eventGubun=060102#lsFd03"
    driver.get(url)

    # 페이지 로딩 대기
    time.sleep(3)

    # BeautifulSoup으로 HTML 파싱
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')
    
    # tbody에서 tr 태그들을 선택
    rows = soup.select('tbody tr')

    # 각 행에서 텍스트 데이터 추출
    for row in rows:
        # td 태그 중 class가 'tl'인 것에서 a 태그의 텍스트를 가져옴
        num = row.select('td')[1].get_text()
        # td 태그 중 class가 'tl'인 것에서 a 태그의 href 속성 값을 가져옴
        name = row.select_one('td.ctn1 a').get_text()
        # onclick 속성 값에서 'liBgcolorXX' 부분만 추출
        promulgation = row.select('td')[2].get_text()
        # 시행 일자 (첫 번째 td 태그의 텍스트를 가져옴)
        kind_of_law = row.select('td')[3].get_text()
        # 법령종류 
        ho = row.select('td')[4].get_text()
        # 공포 일자 
        try_date = row.select('td')[5].get_text()
        # 제정/개정 구분 
        kind_of_change = row.select('td')[6].get_text()
        # 제정/개정 구분 
        depart = row.select('td')[7].select('p')[0].get_text()

        # 결과 리스트에 추가
        results.append((num, name, promulgation, kind_of_law, ho, try_date, kind_of_change, depart))
        print("선거 정당 관련 법")
        print(f"num: {num}")
        print(f"name: {name}")
        print(f"promulgation: {promulgation}")
        print(f"kind_of_law: {kind_of_law}")
        print(f"ho: {ho}")
        print(f"try_date: {try_date}")
        print(f"depart: {depart}")

        link = url


        # 데이터를 MySQL에 삽입
        sql = "INSERT INTO LAWS (NAME, LINK, TRYDATE, KINDOFLAW, PROMULGATION, CHANGES, HO, DEPART, KIND) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
        curs.execute(sql, (name, url, try_date, kind_of_law, promulgation, kind_of_change, ho, depart, "선거"))

        conn.commit()
        cnt+=1
        print(cnt)

        if(cnt==50):
            break
    
    
    
    # MySQL 연결 종료
    conn.close()

    # 드라이버 종료
    driver.quit()

    return results


# 구글 크롤링 실행 함수
def run_get_data_of_google():
    with app.app_context():
        get_data_of_google()

# 개정 법안 크롤링 실행 함수
def run_get_data_of_law():
    with app.app_context():
        get_data_of_law()

# 작업을 바로 실행
run_get_data_of_google()

# 6시간마다 run_get_data_of_google 함수 실행
schedule.every(6).hours.do(run_get_data_of_google)

# 작업을 바로 실행
run_get_data_of_law()
# 24시간마다 run_get_data_of_google 함수 실행
schedule.every(24).hours.do(run_get_data_of_law)

while True:
    schedule.run_pending()

