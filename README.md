# wanted pre onboarding backend course 선발과제

## 과제안내 
- 아래 서비스 개요 및 요구사항을 만족하는 API 서버를 구현합니다.
- 사용가능  기술: **Django, Node.js 중 1개의 기술**
(본 과제 수행 프레임워크는 추후 코스 팀 구성에 활용 됩니다.)

## 서비스 개요
- 본 서비스는 기업의 채용을 위한 웹 서비스 입니다.
- 회사는 채용공고를 생성하고, 이에 사용자는 지원합니다.


## DB Modeling
https://dbdiagram.io/d/630040f9f1a9b01b0fa9456d

![DB Modeling](https://i.imgur.com/jaRkMmQ.png)

## 적용 기술 
- 사용언어 : Javascript
- 런타임환경 : Node.js
- 프레임워크 : Express
- ORM : Sequelize
- 데이터베이스 : MySQL

## 구현 기능
### 1. 채용공고 등록
- **Method** : POST
- **URL** : /jobpostings
- **Requset** 
```
body:
{
  "company_id" : "1",
  "position" : "백엔드 주니어 개발자",
  "compensation" : "1000000",
  "content" : "원티드랩에서 백엔드 주니어 개발자를 채용합니다. 자격요건은.",
  "skill" : "express"
}
```
- **Response**
```

```

### 2. 채용공고 수정
- **Method** : PUT
- **URL** : /jobpostings/:job_posting_id
- **Requset** 
```
body:
{
  "position" : "백엔드 주니어 개발자",
  "compensation" : "1500000",  
  "content" : "원티드랩에서 백엔드 주니어 개발자를 채용합니다. 자격요건은.",
  "skill" : "express"
}
```
- **Response**
```

```


### 3. 채용공고 삭제
- **Method** : DELETE
- **URL** : /jobpostings/:job_posting_id
- **Requset** 
```
param:
{
    "job_posting_id"
}
```
- **Response**
```
```

### 4-1, 4-2. 채용공고 목록, 검색
- **Method** : GET
- **URL** : jobpostings?keyword=원티드
- **Requset** 
```
query:
{
    "keword":<optional>
}
```
- **Response**
```
```
### 5. 채용 상세 페이지
- **Method** : GET
- **URL** : /jobpostings/:job_posting_id
- **Requset** 
```
param:
{
    "job_posting_id"
}
```
- **Response**
```
{
    "채용공고_id": 7,
    "회사명": "원티드랩",
    "국가": "한국",
    "지역": "서울",
    "채용포지션": "백엔드 주니어 개발자",
    "채용보상금": "1500000",
    "사용기술": "Python, Django",
    "채용내용": "원티드랩에서 백엔드 주니어 개발자를 적극 채용합니다. 자격요건은..",
    "회사가올린다른채용공고": [ 11, 12 ]
}
```
### 6. 채용공고 지원 
- **Method** : POST
- **URL** : /apply
- **Requset** 
```
body:
{
    "user_id": 2,
    "job_posting_id": 8
}
```
- **Response**
```
```