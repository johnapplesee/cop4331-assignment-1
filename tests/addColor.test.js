const { addColor } = ("../public/js/code");

const mockAddColor = jest.fn();

describe("",() => {
    test("", () => {
        expect(mockAddColor().document.getElementById("colorAddResult".innerHTML)).toBe("Color has been added");
    });
});