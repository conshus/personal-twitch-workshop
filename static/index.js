/* global OT */
const subscribersEl = document.querySelector('video-subscribers');
const login = document.querySelector('#login');
const dashboard = document.querySelector('#dashboard');
const nameInput = document.querySelector('#name');
const enterBtn = document.querySelector('#enter-button');
const leaveBtn = document.querySelector('#leave-button');
const chatEl = document.querySelector('video-chat');

let apiKey;
let sessionId;
let token;
let session;

function handleError(error) {
  if (error) {
    console.error(error);
    alert(error);
  }
}

async function initializeSession() {
  console.log('initializeSession');
  login.style.display = 'none';
  dashboard.style.display = 'flex';
  session = OT.initSession(apiKey, sessionId);
  subscribersEl.session = session;
  subscribersEl.token = token;
  chatEl.session = session;
  console.log('nameInput.value: ', nameInput.value);
  chatEl.username = nameInput.value;
  
  leaveBtn.addEventListener('click', () => {
    session.disconnect();
    dashboard.style.display = 'none';
    nameInput.value = '';
    login.style.display = 'block';
  });
}

enterBtn.addEventListener('click', () => {
  // Make a GET request to get the OpenTok API key, session ID, and token from the server
  fetch('/watch')
    .then((response) => response.json())
    .then((json) => {
      apiKey = json.apiKey;
      sessionId = json.sessionId;
      token = json.token;
      // Initialize an OpenTok Session object
      initializeSession();
    });
});
