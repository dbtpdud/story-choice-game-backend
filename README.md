# story-choice-game

Markdown
# ⚖️ 어느 하루의 무게 (The Weight of a Day)

> **"인생에 되감기는 없다."**
> 사소한 선택들이 모여 전혀 다른 하루의 끝을 맞이하는 텍스트 인터랙티브 웹 서비스

![Project Status](https://img.shields.io/badge/Project-Active-brightgreen)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## 📖 프로젝트 개요 (Overview)

**'어느 하루의 무게'**는 평범한 직장인이 겪는 하루 동안의 딜레마를 다룬 **인터랙티브 스토리텔링 웹**입니다.
사용자는 출근길부터 밤까지 총 4번의 선택을 하게 되며, 선택에 따라 **자금(Money)**, **업보(Karma)**, **스트레스(Stress)** 수치가 변동됩니다.
이 누적된 결과에 따라 총 4가지의 다른 엔딩을 맞이하게 됩니다.

### 🎯 기획 의도
- **선택의 무게:** 버튼 한 번의 클릭이 엔딩에 미치는 나비효과를 체험합니다.
- **현실적 공감:** 누구나 겪을 법한 일상 속의 윤리적 갈등을 다룹니다.
- **몰입감:** 텍스트 중심의 UI와 다크 모드로 스토리에 집중하도록 설계했습니다.

<br/>

## 🛠️ 기술 스택 (Tech Stack)

| 분류 | 기술 | 비고 |
| :--- | :--- | :--- |
| **Frontend** | ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) | Vanilla JS, CSS Flexbox |
| **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white) *(or Python)* | RESTful API Server |
| **Database** | ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white) | Relational Database |
| **Tools** | ![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white) ![MySQL Workbench](https://img.shields.io/badge/MySQL_Workbench-4479A1?style=flat&logo=mysql&logoColor=white) | Version Control, DB Management |

<br/>

## 🕹️ 주요 기능 (Features)

1.  **스테이지 진행 (Stage Flow)**
    - 총 4단계의 시나리오 (아침, 점심, 저녁, 밤).
    - 각 단계별 상황 텍스트와 2개의 선택지 제공.

2.  **실시간 스탯 시스템 (Live Stats)**
    - 선택지에 따라 3가지 히든 스탯(`Money`, `Karma`, `Stress`) 즉시 변동.

3.  **멀티 엔딩 시스템 (Multi-Endings)**
    - 최종 스탯 조합에 따른 4가지 엔딩 제공.
    - Happy / Bad / Rich & Bad / Normal

4.  **결과 정산 및 리플레이**
    - 엔딩 페이지에서 나의 최종 수치를 그래프로 확인.
    - 선택 기록 요약 및 다시 하기 기능 지원.

<br/>

## 🗂️ 데이터베이스 설계 (ERD)

MySQL 기반의 관계형 데이터베이스로 설계되었습니다.

```mermaid
erDiagram
    STAGES ||--|{ CHOICES : has
    STAGES {
        int stage_id PK "챕터 번호"
        string title "제목"
        text content "시나리오 본문"
    }
    CHOICES {
        int choice_id PK
        int stage_id FK
        string text "선택지 내용"
        int score_money "자금 변동"
        int score_karma "업보 변동"
        int score_stress "스트레스 변동"
    }
    ENDINGS {
        int ending_id PK
        string title "엔딩 제목"
        text description "엔딩 내용"
        string game_condition "발동 조건"
    }
    GAME_RESULTS {
        int result_id PK
        int final_money
        int final_karma
        int final_stress
        datetime played_at
    }
🚀 실행 방법 (Getting Started)
로컬 환경에서 프로젝트를 실행하는 방법입니다.

1. Repository Clone
Bash
git clone [https://github.com/](https://github.com/)[본인아이디]/[레포지토리이름].git
cd [레포지토리이름]
2. Database Setup (MySQL)
MySQL Workbench 실행 및 접속.

database 폴더 내의 story_game_backup.sql 파일을 Import.

story_game 스키마 및 테이블 생성 확인.

3. Backend Run
Bash
cd server
npm install
# DB 설정 파일(.env) 생성 후 본인 DB 정보 입력
npm start
4. Frontend Run
Bash
cd client
# index.html 파일을 Live Server로 실행
📸 스크린샷 (Screenshots)
메인 화면	게임 진행	결과 화면
(스크린샷 이미지 1)	(스크린샷 이미지 2)	(스크린샷 이미지 3)
(※ 프로젝트 완성 후 실제 스크린샷으로 교체 예정)

👨‍💻 팀원 소개 (Contributors)
이름	역할	담당 파트	Github
[우지훈]	PM / DB	기획 총괄, DB 설계 및 구축	@GithubID
[윤재이]	Frontend	UI/UX 구현, 화면 인터랙션	@GithubID
[유세영]	Backend	API 서버 구축, DB 연동	@GithubID
📝 회고 및 배운 점 (Retrospective)
[DB]: 기획 단계에서 ERD를 명확히 설계하는 것이 개발 속도에 큰 영향을 준다는 것을 배웠습니다.

[지훈]: 프론트엔드와 백엔드 간의 API 명세서(약속)가 중요하다는 것을 깨달았습니다.
[세영]: Express 기반 서버를 직접 설계하고 구현하며, 프론트엔드와의 연동을 고려한 API 설계의 중요성을 배웠습니다.
[재이]: 

© 2026 The Weight of a Day Team. All Rights Reserved.
