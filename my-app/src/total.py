from flask import Flask, jsonify, Response, request
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from flask_cors import CORS
import time
from bs4 import BeautifulSoup
from selenium.common.exceptions import NoSuchElementException
# pip install selenium
# pip install flask


app = Flask(__name__)
CORS(app)  # CORS 적용

# 웹드라이버 경로 설정
driver_path = "C:/Users/ssc08/Downloads/chromedriver_win32/chromedriver.exe"

# JSON 응답의 한글 깨짐 방지를 위한 JSON 인코딩 설정
app.config['JSON_AS_ASCII'] = False

@app.route('/scrape/naver', methods=['GET'])
def get_data_of_naver():
    search = request.args.get('search')  # 클라이언트로부터 검색어를 받음

    if search:
        # 웹드라이버 초기화
        webdriver_service = Service(driver_path)
        driver = webdriver.Chrome(service=webdriver_service)

        url = "https://search.naver.com/search.naver?where=news&sm=tab_jum&query=" + search
        driver.get(url)

        try:
            # 웹 페이지의 모든 img 태그가 로드될 때까지 최대 10초간 대기
            WebDriverWait(driver, 3).until(EC.presence_of_all_elements_located((By.TAG_NAME, 'img')))
        except Exception as e:
            print(f"Error waiting for page load: {e}")

        
        # 현재 열려 있는 창 확인
        if driver.window_handles:
            # 웹 페이지 소스 코드 파싱
            html = driver.page_source
            soup = BeautifulSoup(html, 'html.parser')
        else:
            print("No window available")

        results = []

        # 특정 요소의 텍스트 추출
        press_info = soup.select_one('a.info')
        press_text = press_info.text if press_info else 'Not found'


        news_area_tags = soup.find_all('div', {'class': 'news_area'})

        for news_area in news_area_tags:
            # 'div.news_area' 안의 'span.info' 태그에서 텍스트 추출
            info_tag = news_area.find('span', {'class': 'info'})
            info_text = info_tag.text if info_tag else 'Not found'

            # 'div.news_area' 안의 'a.info' 태그에서 텍스트 추출
            press_info = news_area.find('a', {'class': 'info'})
            press_text = press_info.text if press_info else 'Not found'

            # 'div.news_area' 안의 'div.news_contents' 태그에서 다른 정보 추출
            news_contents = news_area.find('div', {'class': 'news_contents'})
            if news_contents:
                img_tag = news_contents.find('img')
                img_url = img_tag.get('src') if img_tag else 'Not found'

                a_tag = news_contents.find('a', href=True)
                link_url = a_tag['href'] if a_tag and a_tag['href'].startswith('http') else 'Not found'

                full_text = news_contents.text
                split_text = full_text.split('   ', 1)
                title, content = split_text if len(split_text) > 1 else (full_text, 'Not found')

            result = {
                'time': info_text,  # 'time' 필드 추가
                'pressInfo': press_text,  # 'pressInfo' 필드 추가
                'img': img_url,  # 'img' 필드 추가
                'link': link_url,  # 'link' 필드 추가
                'title': title,  # 'title' 필드 추가
                'content': content  # 'content' 필드 추가
            }
            
            results.append(result)




        # 웹드라이버 종료
        driver.quit()

        return jsonify(results), 200, {'Content-Type': 'application/json; charset=UTF-8'}

    else:
        return jsonify({"error": "검색어를 입력하세요"})  # 검색어가 없을 경우 에러 반환


@app.route('/scrape/google', methods=['GET'])
def get_data_of_google():
    search = request.args.get('search')  # 검색어를 URL 파라미터로 받음
    if not search:
        return jsonify({"error": "검색어를 입력하세요"})

    # 웹드라이버 초기화
    webdriver_service = Service(driver_path)
    driver = webdriver.Chrome(service=webdriver_service)

    url = "https://www.google.com/search?q="+search+"&sca_esv=579408689&tbm=nws&ei=xB9GZfncK9rg2roPypWnqAU&start=10&sa=N&ved=2ahUKEwj5zv2RlKqCAxVasFYBHcrKCVUQ8tMDegQIAhAE&biw=1005&bih=945&dpr=1"
    driver.get(url)

    elements = driver.find_elements(By.CLASS_NAME, 'iRPxbe')
    image_elements = driver.find_elements(By.CLASS_NAME, 'vJOb1e')
    link_elements = driver.find_elements(By.CLASS_NAME, 'SoaBEf')
    pressInfo_elements = driver.find_elements(By.CLASS_NAME, 'MgUUmf')  # pressInfo를 가져올 elements

    results = []

    for i in range(len(elements)):
        title = elements[i].find_element(By.CLASS_NAME, 'n0jPhd').text
        content = elements[i].find_element(By.CLASS_NAME, 'GI74Re').text
        try:
            image_element = image_elements[i].find_element(By.CLASS_NAME, 'uhHOwf').find_element(By.TAG_NAME, 'img')
            image = image_element.get_attribute('src')  # img 태그에서 src 속성의 값을 가져옴
        except NoSuchElementException:
            image = "No image found in this element."
        if i < len(link_elements):  # 'CAcQAA' 클래스를 가진 요소가 존재하는지 확인
            try:
                link = link_elements[i].find_element(By.TAG_NAME, 'a').get_attribute('href')
            except NoSuchElementException:
                link = "No link found in this element."
        if i < len(pressInfo_elements):  # 'MgUUmf' 클래스를 가진 요소가 존재하는지 확인
            try:
                pressInfo = pressInfo_elements[i].find_element(By.TAG_NAME, 'span').text
            except NoSuchElementException:
                pressInfo = "No pressInfo found in this element."
        time_area = elements[i].find_element(By.CLASS_NAME, 'OSrXXb')
        time_info_tag = time_area.find_element(By.TAG_NAME, 'span') if time_area else None
        time_info_text = time_info_tag.text if time_info_tag else 'Not found'

        results.append({
            'title': title,
            'content': content,
            'image': image,
            'link': link,
            'pressInfo': pressInfo,
            'time': time_info_text
        })

        # 결과를 콘솔에 출력
        print(f"Title: {title}")
        print(f"Content: {content}")

        print(f"Link: {link}")
        print(f"Press Info: {pressInfo}")
        print(f"Time: {time_info_text}")
        print()

    # 웹드라이버 종료
    driver.quit()

    return jsonify(results)

if __name__ == '__main__':
    app.run()