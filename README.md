# boiler-plate-ko
노드, 리액트 기초

git --version

git 저장소 만들기
git init

boiler-plate 폴더에서 git init 을 실행하여 git 저장소가 /.git 서브 디렉토리가 생성이 됨
git 저장소를 사용할수 있게 된 상태


git상태를 확인
git status
폴더 및 파일들 Untracked files 는 git add 하기전 아무것도 안한상태

git add . 
전체 working directory 에 있던 폴더/파일들이 Staging Area로 이동됨

라이브러리 들은 npm install 로 다운받을수 있어서 굳이 git에 올리지 않음.
그래서 .gitignore 파일을 만들고 저장소에 git add . 해도 제외할 폴더나 파일 위치를 입력해주면 됨

git rm --cached node_modules -r
이미 git add . 로 전체 올려놓은 상태라서 없어지지 않으므로 이미 git에 올려놓은 폴더를 삭제

git commit -m " 처음 저장소에 올림 "
-m 옵션 : 메세지 추가

------------------------------------------------------------------------------------------------

Body 데이터를 분석 (parse) 해서 request.body로 출력해주는것
body-parser Dependency 다운받아서 추가
npm install body-parser --save




실행시
npm run start 

실행 테스트시 서버 재기동 할필요없는 테스트 구동은(nodemon 사용)
npm run backend



