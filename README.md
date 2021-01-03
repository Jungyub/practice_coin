#  코인 리스트, 디테일 페이지 구현 연습 (npm run start 명령어로 실행)

## Stack and Tools
- React.js
- styled-components
- Git / Github

## Library
- create-react-app
- react-dom
- react-router-dom

## Goal
1. 메인페이지 내 코인 리스트 및 가격 정보 보여주기 (CoinGecko의 API 활용)
2. 북마크 기능을 추가하여 페이지 리로드 후에도 저장된 코인 표시하기 (localStorage 이용하여 구현함)
3. 메인페이지 내 3가지 select box(전체보기/북마크보기, KRW/USD, 10/30/50개 씩 보기) 선택 시 원하는 내용이 보여지도록 구현
4. 디테일페이지 내 Coin과 KRW/USD 자동 계산이 될 수 있도록 input box 구현하기
5. 북마크 추가 및 해지 시 toast 메시지 띄우기
6. API 호출 시 Loading Spin 삽입하기
7. Chrome, Safari, Firefox, Edge 등 크로스 브라우징 확인하기


## Description
### Main.js
- 3가지 select box에 따라 List를 다르게 뿌려 줌
- 북마크 아이콘 클릭에 따른 상태 변경 (새로고침 시에도 상태 저장)
- 북마크 모아보기/해제하기 기능
- 더보기 버튼에 따른 페이지네이션 기능

### Card.js
- Main.js에 렌더링 되는 코인리스트 컴포넌트

### Detail.js
- 메인페이지에서 코인명 클릭 시 넘어가는 디테일 페이지
- KRW/USD select box에 따라 데이터 변환됨
- 코인 가격 자동 계산 기능
- Description 보여주기(kr, us 순으로 확인)

## Review
1. 단순 시간적 여유가 부족해 구현하지 못한 부분
- Loading Spin, toast 메시지 삽입하지 못함
- 가격 변화율이 양수, 음수일 경우 텍스트 색상이 변경되지 않음
2. 막히는 부분이 생겨 구현하지 못한 부분
- 북마크 기능 구현 시 디테일에서도 가능하게 하는 것을 처음에 생각하지 못해 로직 상 다시 짜야하는 상황이 발생함 (현재 디테일페이지 내 북마크 기능 작동하지 않음)
- 디테일페이지 내 가격 자동계산에 대한 로직 부재 (정규표현식까지 적용하였고, 자동계산에 대한 부분은 시간 부족 및 막히는 부분이 생겨 조금 더 생각해볼 필요가 있음!)
3. 많이 고민하고 정상적으로 구현되어 만족했던 부분
- 여러 가지 select box에 따라 선택적 데이터를 보여주는 기능
- UI적인 측면에서 최대한 실제 운영하는 사이트와 맞춰 가기 위해 꼼꼼하게 구현함
