const { doLogin } = require("../public/js/code");

beforeEach(() => {
    document.body.innerHTML = `
      <input id="loginName" value="" />
      <input id="loginPassword" value="" />
      <div id="loginResult"></div>
      <input id="colorText" value="" />
      <div id="colorAddResult"></div>
    `;
mockXHR = {
      open: jest.fn(),
      setRequestHeader: jest.fn(),
      send: jest.fn(),
      readyState: 4,
      status: 200,
      responseText: '',
      onreadystatechange: null,
    };

    window.XMLHttpRequest = jest.fn(() => mockXHR);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });


describe("Test Login function",() => {
    test('Integration Test: doLogin handles HTTP return codes properly', () => {
    document.getElementById('loginName').value = 'RickL';
    document.getElementById('loginPassword').value = 'COP4331';

    doLogin();

    mockXHR.status = 401;
    mockXHR.responseText = JSON.stringify({ id: 1, firstName: 'Rick', lastName: 'L' });
    mockXHR.onreadystatechange();

    expect(mockXHR.status).toBe(401);
    expect(document.getElementById('loginResult').innerHTML).toBe('');
    
    mockXHR.status = 200;
    mockXHR.responseText = JSON.stringify({ id: 0 });
    mockXHR.onreadystatechange();

    expect(mockXHR.status).toBe(200);
    expect(document.getElementById('loginResult').innerHTML).toBe(
      'User/Password combination incorrect'
    );
  });
}); 
