import * as Api from "./api.js";
import { validateEmail } from "./useful-functions.js";
import { showModal, addModalEvent } from "/js/modal.js";
// 요소(element), input 혹은 상수
const emailInput = document.querySelector("#emailInput");
const passwordInput = document.querySelector("#passwordInput");
const submitButton = document.querySelector("#submitButton");
/*모달창 아니오 버튼 숨기기*/
const noButton = document.getElementById("noButton");
noButton.classList.add("is-invisible");
addAllEvents();

function addAllEvents() {
  submitButton.addEventListener("click", handleSubmit);
}

// 로그인 진행
async function handleSubmit(e) {
  e.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  // 잘 입력했는지 확인
  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.length >= 4;

  if (!isEmailValid || !isPasswordValid) {
    return alert(
      "비밀번호가 4글자 이상인지, 이메일 형태가 맞는지 확인해 주세요."
    );
  }

  // 로그인 api 요청
  try {
    const data = { email, password };

    const result = await Api.post("/api/login", data);
    const token = result.token;
    // 로그인 성공, 토큰을 세션 스토리지에 저장
    // 물론 다른 스토리지여도 됨
    sessionStorage.setItem("token", token);
    addModalEvent(() => { window.location.href = "/"; });
    showModal("로그인", "정상적으로 로그인되었습니다.");
    // 로그인 성공

    // 기본 페이지로 이동
  } catch (err) {
    addModalEvent(() => { });
    showModal("에러", "이메일 혹은 비밀번호가 틀렸습니다.");
  }
}
