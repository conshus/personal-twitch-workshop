/* global OT */
const publisherEl = document.querySelector('video-publisher');
const login = document.querySelector('#login');
const dashboard = document.querySelector('#dashboard');
const nameInput = document.querySelector('#name');
const enterBtn = document.querySelector('#enter-button');
const leaveBtn = document.querySelector('#leave-button');

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
  publisherEl.session = session;
  publisherEl.token = token;

  leaveBtn.addEventListener('click', () => {
    session.disconnect();
    dashboard.style.display = 'none';
    nameInput.value = '';
    login.style.display = 'block';
  });
}

enterBtn.addEventListener('click', () => {
  // Make a GET request to get the Vonage Video API key, Session ID, and Token from the server
  fetch('/session')
    .then((response) => response.json())
    .then((json) => {
      apiKey = json.apiKey;
      sessionId = json.sessionId;
      token = json.token;
      // Initialize an OpenTok Session object
      console.log('apiKey: ', apiKey);
      console.log('sessionId: ', sessionId);
      console.log('token: ', token);
      initializeSession();
    });
});
