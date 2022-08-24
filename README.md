# wanted pre onboarding backend course 선발과제

> 이 레포지토리는 원티드 프리온보딩 백엔드 코스 선발 과제를 위해 만들어졌습니다.
> <br/><br/>

## 📢 과제 안내

- 과제 안내 페이지 : https://bow-hair-db3.notion.site/4-82b986ae35454252a3a950f54e57af9b
- 아래 서비스 개요 및 요구사항을 만족하는 API 서버를 구현합니다.
- 사용가능 기술: **Django, Node.js 중 1개의 기술**
  (본 과제 수행 프레임워크는 추후 코스 팀 구성에 활용 됩니다.)

## 📢 서비스 개요

- 본 서비스는 기업의 채용을 위한 웹 서비스 입니다.
- 회사는 채용공고를 생성하고, 이에 사용자는 지원합니다.

<br/> <br/>

## 📌 DB Modeling

**[🔗 dbdiagram](https://dbdiagram.io/d/630040f9f1a9b01b0fa9456d)**

![DB Modeling](https://i.imgur.com/jaRkMmQ.png)

- 회사 테이블 : company
- 사용자 테이블 : user
- 채용공고 테이블 : job_posting
- 지원내역 테이블 : apply_list  
   ('사용자는 1회만 지원 가능합니다.'라는 조건이 있기 때문에
  apply_list 테이블의 job_posting_id와 user_id의 조합을 복합 Unique Key로 설정해 두었습니다. )
  <br/><br/>

## 📌 적용 기술

- 사용언어 : Javascript
- 런타임 환경 : Node.js
- 프레임워크 : Express
- ORM : Sequelize
- 데이터베이스 : MySQL
  <br/> <br/>

## 📌 요구사항 구현 설명

**[🔗 PostMan API Document](https://documenter.getpostman.com/view/21288917/VUqrNwix)**

### 1. 채용공고 등록

- body 값으로 데이터를 받아 job_posting 테이블에 등록합니다. 등록 완료 시 201 코드를 반환합니다.
- **Method** : POST
- **URI** : /jobpostings
- **Requset**

```json
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
{
    "message": "SUCCESS"
}
```

<br/>

### 2. 채용공고 수정

- **Method** : PATCH
- **URI** : /jobpostings/:job_posting_id
- **Requset**

```json
body:
{
  "position" : "백엔드 주니어 개발자",
  "compensation" : "1500000",
  "content" : "원티드랩에서 백엔드 주니어 개발자를 채용합니다. 자격요건은.",
  "skill" : "express"
}
```

- **Response**

```json
{
  "message": "SUCCESS"
}
```

<br/>

### 3. 채용공고 삭제

- params로 job_posting_id를 받아 해당하는 공고를 job_posting 테이블에서 삭제합니다.
- **Method** : DELETE
- **URI** : /jobpostings/:job_posting_id
- **Requset**

```json
params:
{
    "job_posting_id"
}
```

- **Response**

```json
{
  "message": "SUCCESS"
}
```

<br/>

### 4-1. 채용공고 목록

### 4-2. 채용공고 검색 기능 **(선택사항 및 가산점요소)**

- Query String으로 keyword를 받아 회사명, 국가, 지역, 채용 포지션, 사용 기술로 필터링 되도록 구현했습니다. keyword가 없을 시 전체 목록을 불러옵니다.
- **Method** : GET
- **URI** : jobpostings?keyword=원티드
- **Requset**

```json
query:
{
    "keword":<optional>
}
```

- **Response**

```json
[
  {
    "채용공고_id": 7,
    "회사명": "원티드랩",
    "국가": "한국",
    "지역": "서울",
    "채용포지션": "백엔드 주니어 개발자",
    "채용보상금": "1500000",
    "사용기술": "Python, Django"
  },
  {
    "채용공고_id": 10,
    "회사명": "원티드코리아",
    "국가": "한국",
    "지역": "부산",
    "채용포지션": "프론트엔드 개발자",
    "채용보상금": "500000",
    "사용기술": "React, Javascript "
  }
]
```

<br/>

### 5. 채용 상세 페이지

- params로 job_posting_id를 받고, job_posting 테이블과 company 테이블을 JOIN하여 회사명, 국가, 지역, 채용 내용도 같이 불러오도록 구현했으며
- 해당 공고의 company_id를 이용해 해당 회사가 올린 다른 채용공고도 추가적으로 불러오도록 구현하였습니다. **(선택사항 및 가산점요소)**
- **Method** : GET
- **URI** : /jobpostings/:job_posting_id
- **Requset**

```json
params:
{
    "job_posting_id"
}
```

- **Response**

```json
{
  "채용공고_id": 7,
  "회사명": "원티드랩",
  "국가": "한국",
  "지역": "서울",
  "채용포지션": "백엔드 주니어 개발자",
  "채용보상금": "1500000",
  "사용기술": "Python, Django",
  "채용내용": "원티드랩에서 백엔드 주니어 개발자를 적극 채용합니다. 자격요건은..",
  "회사가올린다른채용공고": [11, 12]
}
```

<br/>

### 6. 채용공고 지원 **(선택사항 및 가산점요소)**

- '사용자는 1회만 지원 가능합니다.'라는 조건이 있기 때문에 body 값으로 받은 user_id와 job_posting_id를 이용하여 apply_list 테이블에 해당 데이터가 있는지 확인 후,
  이미 존재할 경우에는 "already exists"라는 메시지를 돌려주고, 없을 경우에만 DB에 create 할 수 있도록 구현했습니다.
- **Method** : POST
- **URI** : /apply
- **Requset**

```json
body:
{
    "user_id": 2,
    "job_posting_id": 8
}
```

- **Response**

```json
{
    "message": "SUCCESS"
}

이미 지원했을 경우
{
    "message": "already exists"
}
```

<br/> <br/>

## 📌 Commit Convention

- Add : 기능 추가
- Fix : 기능 수정, 버그/오류 해결
- Refactor : 코드 리팩토링 (중복 코드 제거 / 불필요 코드 제거 / 성능 개선)
- Docs : 문서 작성 / 수정
- Remove : 내용 삭제 (폴더 / 파일 삭제)
- Rename : 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우
