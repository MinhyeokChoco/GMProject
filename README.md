# GM

## 목차

- [**개요**](#개요)
    - [기간](#기간)
    - [개발자](#개발자)
    - [기술 스택](#기술-스택)
    - [목표](#목표)
- [**주요 페이지**](#주요-페이지)
    - [MainPage](#Main-Page)
    - [CreatePage](#Create-Page)
    - [DetailPage](#Detail-Page)
    - [UpdatePage](#Update-Page)
- [**주요 기능**](#주요-기능)
    - [글 작성, 수정, 삭제](#글-작성-수정-삭제)
    - [댓글, 대댓글 작성](#댓글-대댓글-작성)
    - [페이지 네이션](#페이지-네이션)
- [**본인 역할**](#본인-역할)
- [**이슈 사항**](#이슈-사항)

---

## 개요

### 기간 : 2024.05.14 ~ 2024.05.28

### 개발자 : [![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FMinhyeokChoco&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false)](https://hits.seeyoufarm.com) <a href="https://www.notion.so/GM-1025c8f34305413d9838d0bc3cc9b4e2"><img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white"></a> MinHyeok 본인 외 2명

### 기술 스택 :
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

### 목표 :
로그인 기능 구현, 같이 게임 하고 싶은 사람들을 구하고 검색 해볼 수 있는 게시판 기능 구현

## 주요 페이지 :

https://github.com/user-attachments/assets/b4f7b3e7-5eb0-40cf-813a-770c867082b7


## 본인 역할
- **고객센터 구현**
    - 고객센터 전체 페이지 구상 및 작성 페이지, 상세 페이지, 수정 페이지 구현
    - 로그인 했을 때만 게시글 작성 할 수 있게 구현
    - 로그인 후 본인 계정으로 작성한 게시글만 수정, 삭제 할 수 있게 구현 
    - 댓글과 대댓글 작성, 수정, 삭제 기능 구현
    - 댓글도 로그인 데이터 비교 해서 본인 댓글만 수정, 삭제 할 수 있게 구현
    - 조회 수 기능 구현
    - 검색 기능 구현
    - 페이지네이션 기능 구현

## 이슈 사항
1. Merge 시 폴더, 변수명 불일치로 오류 발생
- 충돌 난 부분 수정 후 폴더, 겹치는 변수명 수정 후 오류 해결 완료
2. 잘못된 링크 연결
- 연결한 링크 주소 확인하면서 수정 후 해결 완료
3. 댓글 삭제 시 잘못된 댓글 삭제
- 댓글에 대한 index를 제대로 받아오지 못해서 index 수정 후 해결 완료
