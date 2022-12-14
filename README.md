# Recruitment Service

<br>

## π’ μλΉμ€ κ°μ

- λ³Έ μλΉμ€λ κΈ°μμ μ±μ©μ μν μΉ μλΉμ€ μλλ€.
- νμ¬λ μ±μ©κ³΅κ³ λ₯Ό μμ±νκ³ , μ΄μ μ¬μ©μλ μ§μν©λλ€.

<br/>

## π DB Modeling

**[π dbdiagram](https://dbdiagram.io/d/630040f9f1a9b01b0fa9456d)**

![DB Modeling](https://i.imgur.com/jaRkMmQ.png)

- νμ¬ νμ΄λΈ : company
- μ¬μ©μ νμ΄λΈ : user
- μ±μ©κ³΅κ³  νμ΄λΈ : job_posting
- μ§μλ΄μ­ νμ΄λΈ : apply_list  
   ('μ¬μ©μλ 1νλ§ μ§μ κ°λ₯ν©λλ€.'λΌλ μ‘°κ±΄μ΄ μκΈ° λλ¬Έμ
  apply_list νμ΄λΈμ job_posting_idμ user_idμ μ‘°ν©μ λ³΅ν© Unique Keyλ‘ μ€μ ν΄ λμμ΅λλ€. )
  <br/><br/>

## π μ μ© κΈ°μ 

- μ¬μ©μΈμ΄ : Javascript
- λ°νμ νκ²½ : Node.js
- νλ μμν¬ : Express
- ORM : Sequelize
- λ°μ΄ν°λ² μ΄μ€ : MySQL
  <br/> <br/>

## π μκ΅¬μ¬ν­ κ΅¬ν μ€λͺ

**[π PostMan API Document](https://documenter.getpostman.com/view/21288917/VUqrNwix)**

### 1. μ±μ©κ³΅κ³  λ±λ‘

- body κ°μΌλ‘ λ°μ΄ν°λ₯Ό λ°μ job_posting νμ΄λΈμ λ±λ‘ν©λλ€. λ±λ‘ μλ£ μ 201 μ½λλ₯Ό λ°νν©λλ€.
- **Method** : POST
- **URI** : /jobpostings
- **Requset**

```json
// req.body :
{
  "company_id": "1",
  "position": "λ°±μλ μ£Όλμ΄ κ°λ°μ",
  "compensation": "1000000",
  "content": "μν°λλ©μμ λ°±μλ μ£Όλμ΄ κ°λ°μλ₯Ό μ±μ©ν©λλ€. μκ²©μκ±΄μ.",
  "skill": "express"
}
```

- **Response**

```json
// μ±κ³΅μ
// res.status : 201 Created
{
  "message": "SUCCESS"
}
```

<br/>

### 2. μ±μ©κ³΅κ³  μμ 

- **Method** : PATCH
- **URI** : /jobpostings/:job_posting_id
- **Requset**

```json
// req.body :
{
  "position": "λ°±μλ μ£Όλμ΄ κ°λ°μ",
  "compensation": "1500000",
  "content": "μν°λλ©μμ λ°±μλ μ£Όλμ΄ κ°λ°μλ₯Ό μ±μ©ν©λλ€. μκ²©μκ±΄μ.",
  "skill": "express"
}
```

- **Response**

```json

//μ±κ³΅μ
// res.status : 200 OK
{
  "message": "SUCCESS"
}

// κ³΅κ³ κ° μ‘΄μ¬νμ§ μμ κ²½μ°
// res.status : 404 Not Found
{
  "message": "ν΄λΉ κ³΅κ³ λ μ‘΄μ¬νμ§ μμ΅λλ€."
}
```

<br/>

### 3. μ±μ©κ³΅κ³  μ­μ 

- paramsλ‘ job_posting_idλ₯Ό λ°μ ν΄λΉνλ κ³΅κ³ λ₯Ό job_posting νμ΄λΈμμ μ­μ ν©λλ€.
- **Method** : DELETE
- **URI** : /jobpostings/:job_posting_id
- **Requset**

```json
// req.params :
{
  "job_posting_id": "1"
}
```

- **Response**

```json

//μ±κ³΅μ
// res.status : 200 OK
{
  "message": "SUCCESS"
}

// κ³΅κ³ κ° μ‘΄μ¬νμ§ μμ κ²½μ°
// res.status : 404 Not Found
{
  "message": "ν΄λΉ κ³΅κ³ κ° μ‘΄μ¬νμ§ μμ΅λλ€."
}
```

<br/>

### 4-1. μ±μ©κ³΅κ³  λͺ©λ‘

### 4-2. μ±μ©κ³΅κ³  κ²μ κΈ°λ₯ **(μ νμ¬ν­ λ° κ°μ°μ μμ)**

- Query StringμΌλ‘ keywordλ₯Ό λ°μ νμ¬λͺ, κ΅­κ°, μ§μ­, μ±μ© ν¬μ§μ, μ¬μ© κΈ°μ λ‘ νν°λ§ λλλ‘ κ΅¬ννμ΅λλ€. keywordκ° μμ μ μ μ²΄ λͺ©λ‘μ λΆλ¬μ΅λλ€.
- **Method** : GET
- **URI** : jobpostings?keyword=μν°λ
- **Requset**

```json
// req.query:
{
    "keword": "μν°λ" <optional>
}
```

- **Response**

```json
// μ±κ³΅μ
// res.status : 200 OK
[
  {
    "μ±μ©κ³΅κ³ _id": 7,
    "νμ¬λͺ": "μν°λλ©",
    "κ΅­κ°": "νκ΅­",
    "μ§μ­": "μμΈ",
    "μ±μ©ν¬μ§μ": "λ°±μλ μ£Όλμ΄ κ°λ°μ",
    "μ±μ©λ³΄μκΈ": "1500000",
    "μ¬μ©κΈ°μ ": "Python, Django"
  },
  {
    "μ±μ©κ³΅κ³ _id": 10,
    "νμ¬λͺ": "μν°λμ½λ¦¬μ",
    "κ΅­κ°": "νκ΅­",
    "μ§μ­": "λΆμ°",
    "μ±μ©ν¬μ§μ": "νλ‘ νΈμλ κ°λ°μ",
    "μ±μ©λ³΄μκΈ": "500000",
    "μ¬μ©κΈ°μ ": "React, Javascript "
  }
]

// λ±λ‘λ κ³΅κ³ κ° νλλ μκ±°λ ν€μλλ‘ κ²μλ κ³΅κ³ κ° μμ κ²½μ°
// res.status : 204 No Content
```

<br/>

### 5. μ±μ© μμΈ νμ΄μ§

- paramsλ‘ job_posting_idλ₯Ό λ°κ³ , job_posting νμ΄λΈκ³Ό company νμ΄λΈμ JOINνμ¬ νμ¬λͺ, κ΅­κ°, μ§μ­, μ±μ© λ΄μ©λ κ°μ΄ λΆλ¬μ€λλ‘ κ΅¬ννμΌλ©°
- ν΄λΉ κ³΅κ³ μ company_idλ₯Ό μ΄μ©ν΄ ν΄λΉ νμ¬κ° μ¬λ¦° λ€λ₯Έ μ±μ©κ³΅κ³ λ μΆκ°μ μΌλ‘ λΆλ¬μ€λλ‘ κ΅¬ννμμ΅λλ€. **(μ νμ¬ν­ λ° κ°μ°μ μμ)**
- **Method** : GET
- **URI** : /jobpostings/:job_posting_id
- **Requset**

```json
// req.params :
{
  "job_posting_id": "1"
}
```

- **Response**

```json
// μ±κ³΅μ
// res.status : 200 OK
{
  "μ±μ©κ³΅κ³ _id": 7,
  "νμ¬λͺ": "μν°λλ©",
  "κ΅­κ°": "νκ΅­",
  "μ§μ­": "μμΈ",
  "μ±μ©ν¬μ§μ": "λ°±μλ μ£Όλμ΄ κ°λ°μ",
  "μ±μ©λ³΄μκΈ": "1500000",
  "μ¬μ©κΈ°μ ": "Python, Django",
  "μ±μ©λ΄μ©": "μν°λλ©μμ λ°±μλ μ£Όλμ΄ κ°λ°μλ₯Ό μ κ·Ή μ±μ©ν©λλ€. μκ²©μκ±΄μ..",
  "νμ¬κ°μ¬λ¦°λ€λ₯Έμ±μ©κ³΅κ³ ": [11, 12]
}

// κ³΅κ³ κ° μ‘΄μ¬νμ§ μμ κ²½μ°
// res.status : 404 Not Found
{
  "message": "ν΄λΉ κ³΅κ³ κ° μ‘΄μ¬νμ§ μμ΅λλ€."
}
```

<br/>

### 6. μ±μ©κ³΅κ³  μ§μ **(μ νμ¬ν­ λ° κ°μ°μ μμ)**

- 'μ¬μ©μλ 1νλ§ μ§μ κ°λ₯ν©λλ€.'λΌλ μ‘°κ±΄μ΄ μκΈ° λλ¬Έμ body κ°μΌλ‘ λ°μ user_idμ job_posting_idλ₯Ό μ΄μ©νμ¬ apply_list νμ΄λΈμ ν΄λΉ λ°μ΄ν°κ° μλμ§ νμΈ ν,
  μ΄λ―Έ μ‘΄μ¬ν  κ²½μ°μλ "already exists"λΌλ λ©μμ§λ₯Ό λλ €μ£Όκ³ , μμ κ²½μ°μλ§ DBμ create ν  μ μλλ‘ κ΅¬ννμ΅λλ€.
- **Method** : POST
- **URI** : /apply
- **Requset**

```json
//req.body :
{
  "user_id": 2,
  "job_posting_id": 8
}
```

- **Response**

```json
// μ±κ³΅μ
// res.status : 201 Created
{
    "message": "SUCCESS"
}

// μ΄λ―Έ μ§μνμ κ²½μ°
// res.status : 409 Conflict
{
  "message": "already exists"
}

// κ³΅κ³ κ° μ‘΄μ¬νμ§ μμ κ²½μ°
// res.status : 404 Not Found
{
  "message": "ν΄λΉ κ³΅κ³ κ° μ‘΄μ¬νμ§ μμ΅λλ€."
}
```

<br/> <br/>

## π Commit Convention

- Add : κΈ°λ₯ μΆκ°
- Fix : κΈ°λ₯ μμ , λ²κ·Έ/μ€λ₯ ν΄κ²°
- Refactor : μ½λ λ¦¬ν©ν λ§ (μ€λ³΅ μ½λ μ κ±° / λΆνμ μ½λ μ κ±° / μ±λ₯ κ°μ )
- Docs : λ¬Έμ μμ± / μμ 
- Remove : λ΄μ© μ­μ  (ν΄λ / νμΌ μ­μ )
- Rename : νμΌ νΉμ ν΄λλͺμ μμ νκ±°λ μ?κΈ°λ μμλ§μΈ κ²½μ°
