import requests
from bs4 import BeautifulSoup

search = input("검색어를 입력하세요: ")
naver_url = "https://search.naver.com/search.naver?where=news&sm=tab_jum&query="+search
naver_response = requests.get(naver_url)
naver_soup = BeautifulSoup(naver_response.text, 'html.parser')

news_contents = naver_soup.find_all('div', {'class': 'news_contents'})

for content in news_contents:
    full_text = content.text
    split_text = full_text.split('   ', 1)

    if len(split_text) > 1:
        title, content = split_text
        print("Title: ", title)
        print("Content: ", content)
    else:
        print("Content: ", full_text)

    print()

print("========================================")

# headers = {'User.agent':'Mozila/5.0'}
chosun_url = "https://www.chosun.com/nsearch/?query="+search
chosun_response = requests.get(chosun_url)
chosun_soup = BeautifulSoup(chosun_response.text, 'html.parser')

news_contents = chosun_soup.find_all('div', {'class': 'story-card-wrapper'})

for content in news_contents:
    full_text = content.text
    split_text = full_text.split('   ', 1)

    if len(split_text) > 1:
        title, content = split_text
        print("Title: ", title)
        print("Content: ", content)
    else:
        print("Content: ", full_text)

    print()