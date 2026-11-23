const { addColor } = require("../public/js/code");

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

describe("Tests AddColor function",() => {
    test('Unit Test: addColor formats JSON payload and updates DOM on success', () => {
    document.getElementById('colorText').value = 'Crimson';

    addColor();

    expect(mockXHR.open).toHaveBeenCalledWith(
      'POST',
      'http://COP4331-5.com/LAMPAPI/AddColor.php',
      true
    );
    expect(mockXHR.setRequestHeader).toHaveBeenCalledWith(
      'Content-type',
      'application/json; charset=UTF-8'
    );


    const sentPayload = JSON.parse(mockXHR.send.mock.calls[0][0]);
    expect(sentPayload).toEqual({
      color: 'Crimson',
      userId: 0,
    });

    mockXHR.onreadystatechange();

    expect(document.getElementById('colorAddResult').innerHTML).toBe(
      'Color has been added'
    );
  });
});