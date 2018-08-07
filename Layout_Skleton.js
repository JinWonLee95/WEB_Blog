// 다수의 이미지 등록 기능 
var indexInsert = -1;  		//index 지정 등록 기능 구현 시 사용

function dropDown(){
	document.getElementById("dropDownMenu").style.display = "block";
}

function returnBack(){
	document.getElementById("dropDownMenu").style.display = "none";
}

function showpostingform(i){
	document.getElementById("WritingForm").style.display = "block";
	if( i == "undefined" ) indexInsert = -1;
	else indexInsert = i;
}

function indexpost(){
	var i = prompt("index를 입력하세요");
	showpostingform(i);						//i번째 index로 게시하는 writingForm을 display
}

function closeposting(){
	document.getElementById("WritingForm").style.display = "none";
}

//등록 클릭 시 WritingForm 초기화 및 숨기기 메소드
function exitposting(){
	document.getElementById("WritingForm").style.display = "none";
	document.getElementById("title").value = "";
	document.getElementById("article").value = "";
	document.getElementById("imgInput").value = "";
	indexInsert = null;
}

//등록 메소드
function post(){
	var imgs = [];
	var files = document.getElementById("imgInput").files; 		//사진 파일 불러오기
	
	var postingDiv = document.createElement("div"); 	//게시할 공간 생성
	var titleDiv = document.createElement("div");		//제목 게시 공간 생성
	var articleDiv = document.createElement("div");		//내용 게시 공간 생성
	var repDiv = document.createElement("div");			//댓글 작성 공간 생성
	var repWrtDiv = document.createElement("div");		//댓글 작성 공간 생성
	
	var title = document.createElement("h3");			//제목 h3로 표시
	var time = document.createElement("p");				//p안에 현재 시간 작성
	var deleteBtn = document.createElement("input");	//삭제 버튼 생성
	var line = document.createElement("p");
	
	for(var i=0; i<files.length; i++)
		imgs[i] = document.createElement("img");		//이미지 파일 받아올 공간 생성
	var text = document.createElement("p");				//내용 받아올 p 생성

	title.innerHTML = document.getElementById("title").value;					// 제목 내용 받아오기
	line.innerHTML = "-------------------------------------------------------";	//댓글과 글 내용 구분
	
	var myDate = new Date();
	time.innerHTML = myDate.toLocaleString();					// 현재 시간 받아오기
	
	deleteBtn.type="button";
	deleteBtn.value="삭제";
	deleteBtn.onclick = function(){
		deletePosting();
	};															//삭제 관련
	
	for(var i=0; i<files.length; i++)
		imgs[i].src=window.URL.createObjectURL(files[i]);				//url 생성
	text.innerHTML=document.getElementById("article").value;	//내용 받아오기
	
	var rep_nickInput = document.createElement("input");
	var rep_textInput = document.createElement("input");
	var rep_submitInput = document.createElement("input");
	
	rep_nickInput.id = "repNick";
	rep_textInput.id = "repText";
	
	rep_nickInput.type = "text";
	rep_textInput.type = "text";
	rep_submitInput.type = "button";
	rep_submitInput.value = "댓글 달기";
	rep_submitInput.onclick = function(){
		reply();
	}														//댓글 작성 관련

	var x = document.getElementById("postingArea");
	indexInsert = Number(indexInsert);
	
	if(indexInsert == -1){										//처음 글을 등록 할 때
		postingDiv.appendChild(titleDiv);					
		postingDiv.appendChild(articleDiv);
		postingDiv.appendChild(repDiv);
		postingDiv.appendChild(repWrtDiv);						//postingDiv 안에 제목 내용 댓글 append 해주기		

		titleDiv.appendChild(title);					
		titleDiv.appendChild(time);								//titleDiv 안에 제목 시간 append 해주기
		
		for(var i=0; i<files.length; i++)
		articleDiv.appendChild(imgs[i]);
		articleDiv.appendChild(text);							
		articleDiv.appendChild(deleteBtn);						
		articleDiv.appendChild(line);							//articleDiv 안에 사진 내용 삭제버튼 append 해주기

		repWrtDiv.appendChild(rep_nickInput);
		repWrtDiv.appendChild(rep_textInput);
		repWrtDiv.appendChild(rep_submitInput);					//repWrtDiv 안에 댓글 아이디 내용 확인버튼 append 해주기

		x.appendChild(postingDiv);
	}
	
	else{														//원하는 index에 등록 할 때
		postingDiv.appendChild(titleDiv);					
		postingDiv.appendChild(articleDiv);
		postingDiv.appendChild(repDiv);
		postingDiv.appendChild(repWrtDiv);						//postingDiv 안에 제목 내용 댓글 append 해주기		
		
		titleDiv.appendChild(title);					
		titleDiv.appendChild(time);								//titleDiv 안에 제목 시간 append 해주기
		
		for(var i=0; i<files.length; i++)
		articleDiv.appendChild(imgs[i]);
		articleDiv.appendChild(text);							
		articleDiv.appendChild(deleteBtn);						
		articleDiv.appendChild(line);							//articleDiv 안에 사진 내용 삭제버튼 append 해주기
		
		repWrtDiv.appendChild(rep_nickInput);
		repWrtDiv.appendChild(rep_textInput);
		repWrtDiv.appendChild(rep_submitInput);					//repWrtDiv 안에 댓글 아이디 내용 확인버튼 append 해주기

		x.insertBefore(postingDiv, x.children[indexInsert-1]);
	}
								
		
	var createLi = document.createElement("li");
	
	createLi.innerHTML = document.getElementById("title").value;
	
	createLi.onclick = function(){
		moveTo();
	}
	
	var i = document.getElementById("postingList")
	
	if(indexInsert == null)
		i.appendChild(createLi);
	
	else
		i.insertBefore(createLi,i.children[indexInsert-1]);	//index 순서 관련
		
	exitposting();											//WritingForm 숨기기 및 초기화
}

//Side Bar 제목 클릭 시 이동 메소드
function moveTo(){

	var postingList= document.getElementById("postingList");
	var postingArea= document.getElementById("postingArea");
	for(var i in postingList.children){
		if(postingList.children[i] == event.target){
			window.scrollTo(0,postingArea.children[i].offsetTop);
		}
	}
}															

// 삭제 메소드(sidebar도 같이 삭제)
function deletePosting(obj){
	var delete_obj = event.target.parentElement.parentElement;				//삭제 할 게시글
	var itemList = document.getElementById("postingArea").children;			//전체 게시글 리스트
	
	var i = 0;
	
	for( i; i < itemList.length; i++ ) 										
		if( itemList[i] == delete_obj ) 									//i번째 게시글 임을 찾아내기
			break;													
	
	document.getElementById("postingArea").removeChild(delete_obj);			//게시글 삭제
	
	var olList = document.getElementById("postingList").children;			//sidebar의 리스트를 배열로 저장
	olList[i].remove();														//i번째 삭제
	
}


function reply() {
	var replyDiv = document.createElement("div");	//전체 댓글 박스 생성
	var nickName = document.createElement("h1");	//댓글 작성자 이름 작성 박스 생성
	var time = document.createElement("p");			//시간 나타낼 p 생성
	var text =document.createElement("p");			//댓글 내용 작성 박스 생성
	var delBtn = document.createElement("input");	//댓글 삭제 버튼 생성
	
	var replyArea = event.target.parentElement.previousElementSibling;
	var textValue = event.target.previousElementSibling.value;
	var nickNameValue = event.target.previousElementSibling.previousElementSibling.value;
	
	nickName.innerHTML = nickNameValue ;
	
	var myDate = new Date();
	time.innerHTML = myDate.toLocaleString();
	
	delBtn.value="삭제";
	delBtn.type="button";
	delBtn.onclick=function(){
		repDelete();
	}
	text.innerHTML=textValue;
	
	replyDiv.appendChild(nickName);
	replyDiv.appendChild(time);
	replyDiv.appendChild(text);
	replyDiv.appendChild(delBtn);
	
	replyArea.appendChild(replyDiv);
	
	document.getElementById("repNick").value = "";
	document.getElementById("repText").value = "";
}


function repDelete() {
	event.target.parentElement.parentElement.removeChild(event.target.parentElement);
}									
