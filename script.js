// --- [Data Layer] ---
// 게임의 전체적인 상태를 저장하는 변수입니다.
let currentState = {
    stageIndex: 0, // 현재 진행 중인 스테이지 번호 (0부터 시작)
    money: 50,     // 초기 자금
    karma: 50,     // 초기 업보
    stress: 50     // 초기 스트레스
};

// 각 스테이지의 정보(배경, 텍스트, 선택지)를 담고 있는 배열입니다.
const stageData = [
    {
        id: 1,
        // [Stage 1] 신호등 (초록 -> 노랑)
        bgBefore: "stage1_green.jpg",
        bgAfter: "stage1_yellow.jpg",
        text: "중요한 면접 10분 전,\n교차로 진입 직전 황색 신호등이 켜졌다.\n\n밟으면 통과, 멈추면 지각이다.",
        choices: [
            { text: "A. 풀악셀을 밟는다", money: 0, karma: -10, stress: 20 },
            { text: "B. 급정거한다", money: 0, karma: 10, stress: -10 }
        ]
    },
    {
        id: 2,
        // [Stage 2] 점심시간 (식당 -> 동기)
        bgBefore: "stage2_lunch.jpg",
        bgAfter: "stage2_colleague.jpg",
        text: "점심시간, 동기가 밥을 사달라고 한다.\n내 지갑 사정도 넉넉지 않은데...",
        choices: [
            { text: "A. 쿨하게 내가 산다! (-3만)", money: -30, karma: 10, stress: 0 },
            { text: "B. 더치페이 하자고 한다", money: 0, karma: -5, stress: 5 }
        ]
    },
    {
        id: 3,
        // [Stage 3] 업무 실수 (삭제 경고 -> 빈 사무실)
        bgBefore: "stage3_delete_v2.jpg",
        bgAfter: "stage3_empty_v2.jpg",
        text: "업무 중 실수로 중요한 파일을 지웠다.\n아무도 본 사람은 없다.",
        choices: [
            { text: "A. 솔직하게 보고한다", money: 0, karma: 20, stress: 30 },
            { text: "B. 몰래 복구를 시도한다", money: 0, karma: -20, stress: 10 }
        ]
    },
    {
        id: 4,
        // [Stage 4] 퇴근길 리어카 할머니 (끌고감 -> 쓰러짐)
        bgBefore: "stage4_cart_before.jpg",
        bgAfter: "stage4_cart_after.jpg",
        
        text: "퇴근길, 쓰레기를 줍는 할머니의\n리어카가 쓰러졌다.",
        choices: [
            { text: "A. 모른 척 지나간다", money: 0, karma: -30, stress: -10 },
            { text: "B. 가서 도와드린다", money: 0, karma: 30, stress: 10 }
        ]
    }
];

// [수정됨] 모든 엔딩에 최종 이미지 파일명이 적용되었습니다.
const endings = [
    { 
        condition: (s) => s.karma >= 80, 
        title: "평온한 밤 (Happy)", 
        desc: "당신은 오늘 하루 떳떳하게 살았습니다. 두 다리 뻗고 편안하게 잠듭니다.",
        // Happy 엔딩 이미지
        image: "ending_happy_final.jpg"
    },
    { 
        condition: (s) => s.stress >= 90, 
        title: "불면의 밤 (Bad)", 
        desc: "오늘 하루 너무 많은 스트레스를 받았습니다. 생각이 많아 잠이 오지 않습니다.",
        // Bad 엔딩 이미지
        image: "stress_night_final_v99.jpg" 
    },
    { 
        condition: (s) => s.money <= 10, 
        title: "배고픈 밤 (Poor)", 
        desc: "지갑은 텅 비었지만, 그래도 하루를 버텨냈습니다. 내일은 더 나아지겠죠.",
        // ▼▼▼ Poor 엔딩 이미지 적용 (이번에 추가됨) ▼▼▼
        image: "ending_poor_final_v88.jpg"
    },
    { 
        condition: (s) => true, // 나머지 모든 경우
        title: "그저 그런 밤 (Normal)", 
        desc: "특별할 것 없는 하루였습니다. 내일도 비슷한 하루가 반복되겠죠.",
        // Normal 엔딩 이미지
        image: "ending_normal_final.jpg" 
    }
];

// --- [Logic Layer] ---

// 화면을 전환하는 유틸리티 함수입니다.
function switchScreen(screenId) {
    document.querySelectorAll('.screen-content').forEach(el => el.classList.add('hidden'));
    const target = document.getElementById(screenId);
    target.classList.remove('hidden');
    
    // 페이드인 애니메이션 재실행
    target.classList.remove('fade-in');
    void target.offsetWidth; // 리플로우 강제
    target.classList.add('fade-in');
}

// 현재 시간을 반환하는 함수입니다.
function getNowTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
}

// 배경 이미지를 변경하는 함수입니다.
function setBackground(url) {
    if(!url) return;
    const bgLayer = document.getElementById('background-layer');
    bgLayer.style.backgroundImage = `url('${url}')`;
    
    // 배경 움직임 효과 리셋
    bgLayer.classList.remove('bg-zoom');
    void bgLayer.offsetWidth;
    bgLayer.classList.add('bg-zoom');
}

// 게임 시작 함수
function startGame() {
    currentState = { stageIndex: 0, money: 50, karma: 50, stress: 50 };
    switchScreen('page-game');
    document.getElementById('time-indicator').innerText = getNowTime();
    renderStage();
}

// 현재 스테이지를 화면에 그리는 함수
function renderStage() {
    const index = currentState.stageIndex;
    
    if (index >= stageData.length) {
        showEnding();
        return;
    }

    const data = stageData[index];

    // 1. 텍스트 및 정보 업데이트
    document.getElementById('stage-indicator').innerText = `Stage ${index + 1} / ${stageData.length}`;
    document.getElementById('time-indicator').innerText = getNowTime();
    document.getElementById('scenario-text').innerText = data.text;

    // 2. 배경 이미지 설정 로직
    if (data.bgAfter) {
        // 먼저 첫 번째 이미지를 보여줍니다.
        setBackground(data.bgBefore);
        
        // 1.5초 뒤에 두 번째 이미지로 변경합니다.
        setTimeout(() => {
            // 사용자가 아직 같은 스테이지에 있을 때만 변경
            if (currentState.stageIndex === index) {
                setBackground(data.bgAfter);
            }
        }, 1500); 
    } else {
        // 교체할 이미지가 없으면 첫 번째 이미지만 보여줍니다.
        setBackground(data.bgBefore);
    }

    // 3. 선택지 버튼 생성
    const choicesArea = document.getElementById('choices-area');
    choicesArea.innerHTML = ''; 

    data.choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = 'btn-primary';
        btn.innerText = choice.text;
        btn.onclick = () => selectChoice(choice);
        choicesArea.appendChild(btn);
    });
}

// 선택지 클릭 처리 함수
function selectChoice(choice) {
    currentState.money += choice.money;
    currentState.karma += choice.karma;
    currentState.stress += choice.stress;
    currentState.stageIndex++;
    renderStage();
}

// 결과 화면 표시 함수
function showEnding() {
    switchScreen('page-result');

    // 1. 현재 상태에 맞는 엔딩을 찾습니다.
    const ending = endings.find(e => e.condition(currentState));

    // 2. 해당 엔딩에 설정된 이미지를 배경으로 지정합니다.
    if (ending && ending.image) {
        setBackground(ending.image);
    }

    // 3. 텍스트 업데이트
    document.getElementById('ending-title').innerText = ending.title;
    document.getElementById('ending-desc').innerText = ending.desc;

    updateBar('val-money', 'bar-money', currentState.money);
    updateBar('val-karma', 'bar-karma', currentState.karma);
    updateBar('val-stress', 'bar-stress', currentState.stress);
}

// 그래프 업데이트 유틸리티
function updateBar(textId, barId, value) {
    let safeValue = Math.max(0, Math.min(100, value));
    document.getElementById(textId).innerText = safeValue;
    document.getElementById(barId).style.width = safeValue + '%';
}

// 홈 화면으로 이동
function goHome() {
    switchScreen('page-home');
    // 시작 화면 배경 이미지를 설정합니다.
    setBackground("start_bg_city.jpg"); 
}

// 초기 실행
goHome();
