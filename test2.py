from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException

# 웹드라이버 경로 설정
driver_path = 'C:/Users/hy/Desktop/SayYo/chromedriver_win32/chromedriver.exe'

search = input("검색어를 입력하세요: ")

# 웹드라이버 초기화
webdriver_service = Service(driver_path)
driver = webdriver.Chrome(service=webdriver_service)

url = "https://www.google.com/search?q="+search+"&sca_esv=579408689&tbm=nws&ei=xB9GZfncK9rg2roPypWnqAU&start=10&sa=N&ved=2ahUKEwj5zv2RlKqCAxVasFYBHcrKCVUQ8tMDegQIAhAE&biw=1005&bih=945&dpr=1"
driver.get(url)

elements = driver.find_elements(By.CLASS_NAME, 'iRPxbe')
image_elements = driver.find_elements(By.CLASS_NAME, 'vJOb1e')
link_elements = driver.find_elements(By.CLASS_NAME, 'SoaBEf')

for i in range(len(elements)):
    title = elements[i].find_element(By.CLASS_NAME, 'n0jPhd').text
    content = elements[i].find_element(By.CLASS_NAME, 'GI74Re').text
    try:
        image_element = image_elements[i].find_element(By.CLASS_NAME, 'uhHOwf').find_element(By.TAG_NAME, 'img')
        image = image_element.get_attribute('src')  # img 태그에서 src 속성의 값을 가져옴
        print(f"Image: {image}")
    except NoSuchElementException:
        print("No image found in this element.")
    if i < len(link_elements):  # 'CAcQAA' 클래스를 가진 요소가 존재하는지 확인
        try:
            link = link_elements[i].find_element(By.TAG_NAME, 'a').get_attribute('href')
            print(f"Link: {link}")
        except NoSuchElementException:
            print("No link found in this element.")
    print(f"Title: {title}")
    print(f"Content: {content}")

# 웹드라이버 종료
driver.quit()
