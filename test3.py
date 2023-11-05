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

app = Flask(__name__)
CORS(app)  # CORS 적용

# 웹드라이버 경로 설정
driver_path = 'C:/Users/hy/Desktop/SayYo/chromedriver_win32/chromedriver.exe'  # 여기에 실제 ChromeDriver 파일 경로를 설정해주세요.

# JSON 응답의 한글 깨짐 방지를 위한 JSON 인코딩 설정
app.config['JSON_AS_ASCII'] = False

@app.route('/scrape', methods=['GET'])
def get_data():
    search = request.args.get('search')  # 클라이언트로부터 검색어를 받음

    if search:
        # 웹드라이버 초기화
        webdriver_service = Service(driver_path)
        driver = webdriver.Chrome(service=webdriver_service)

        url = "https://search.naver.com/search.naver?where=news&sm=tab_jum&query=" + search
        driver.get(url)

        try:
            # 웹 페이지의 모든 img 태그가 로드될 때까지 최대 10초간 대기
            WebDriverWait(driver, 10).until(EC.presence_of_all_elements_located((By.TAG_NAME, 'img')))
        except Exception as e:
            print(f"Error waiting for page load: {e}")

        # 추가적으로 JavaScript가 이미지를 로드할 시간을 주기 위해 5초간 대기
        time.sleep(5)
        
        # 현재 열려 있는 창 확인
        if driver.window_handles:
            # 웹 페이지 소스 코드 파싱
            html = driver.page_source
            soup = BeautifulSoup(html, 'html.parser')
        else:
            print("No window available")

        news_contents = soup.find_all('div', {'class': 'news_contents'})

        results = []

        for content in news_contents:
            full_text = content.text
            split_text = full_text.split('   ', 1)
            img_tag = content.find('img')
            a_tag = content.find('a', href=True)

            if img_tag:
                img_url = img_tag.get('src')

                # 이미지 URL이 data URI 스키마인 경우 처리
                if img_url.startswith('data:image'):
                    img_url = '이미지 URL을 얻을 수 없음'

            if a_tag and a_tag['href'].startswith('http'):
                link_url = a_tag['href']

            result = {}

            if len(split_text) > 1:
                title, content = split_text
                result['title'] = title
                result['content'] = content
                result['img'] = img_url
                result['link'] = link_url
                print("Title: ", title)
                print("Content: ", content)
                print("Image URL: ", img_url)
                print("Link URL: ", link_url)
            else:
                result['content'] = full_text
                print("Content: ", full_text)
            results.append(result)
            print()

        # 웹드라이버 종료
        driver.quit()

        return jsonify(results), 200, {'Content-Type': 'application/json; charset=UTF-8'}

    else:
        return jsonify({"error": "검색어를 입력하세요"})  # 검색어가 없을 경우 에러 반환

if __name__ == '__main__':
    app.run()
