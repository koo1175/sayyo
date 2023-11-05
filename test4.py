from flask import Flask, jsonify, request
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from flask_cors import CORS
from bs4 import BeautifulSoup
import time
from selenium.webdriver.support.ui import WebDriverWait


app = Flask(__name__)
CORS(app)

driver_path = 'C:/Users/hy/Desktop/SayYo/chromedriver_win32/chromedriver.exe'
app.config['JSON_AS_ASCII'] = False

@app.route('/scrape-naver', methods=['GET'])
def get_data_naver():
    search = request.args.get('search')
    if search:
        webdriver_service = Service(driver_path)
        driver = webdriver.Chrome(service=webdriver_service)
        url = "https://search.naver.com/search.naver?where=news&sm=tab_jum&query=" + search
        driver.get(url)
        try:
            WebDriverWait(driver, 10).until(EC.presence_of_all_elements_located((By.TAG_NAME, 'img')))
        except Exception as e:
            print(f"Error waiting for page load: {e}")
        time.sleep(5)
        if driver.window_handles:
            html = driver.page_source
            soup = BeautifulSoup(html, 'html.parser')
        news_contents = soup.find_all('div', {'class': 'news_contents'})
        results = []
        for content in news_contents:
            full_text = content.text
            split_text = full_text.split('   ', 1)
            img_tag = content.find('img')
            a_tag = content.find('a', href=True)
            if img_tag:
                img_url = img_tag.get('src')
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
            else:
                result['content'] = full_text
            results.append(result)
        driver.quit()
        return jsonify(results), 200, {'Content-Type': 'application/json; charset=UTF-8'}
    else:
        return jsonify({"error": "검색어를 입력하세요"})

@app.route('/scrape-google', methods=['GET'])
def get_data_google():
    search = request.args.get('search')
    if search:
        webdriver_service = Service(driver_path)
        driver = webdriver.Chrome(service=webdriver_service)
        url = "https://www.google.com/search?q="+search+"&newwindow=1&sxsrf=ALiCzsZVk55WnQZg9Y2JEr7mSJL-m5YaWw:1672363518875&source=lnms&tbm=nws&sa=X&ved=2ahUKEwjU9-jLl6D8AhUw3TgGHWeUBVQQ_AUoAXoECAEQAw&biw=1866&bih=1051&dpr=1.8"
        driver.get(url)
        titles = driver.find_elements(By.CLASS_NAME, 'mCBkyc')
        contents = driver.find_elements(By.CLASS_NAME, 'GI74Re')
        links = driver.find_elements(By.CLASS_NAME, 'WlydOe')
        results = []
        for title, content, link in zip(titles, contents, links):
            result = {}
            result['title'] = title.text
            result['content'] = content.text
            result['link'] = link.get_attribute('href')
            results.append(result)
        driver.quit()
        return jsonify(results), 200, {'Content-Type': 'application/json; charset=UTF-8'}
    else:
        return jsonify({"error": "검색어를 입력하세요"})

if __name__ == '__main__':
    app.run()
