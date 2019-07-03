import Model from '../js/bookmark_module/model.js';

describe('Testing addItemToData function', () => {
  test('Add a new element to the data array', () => {
    const testData = [{ title: 'BlaBla', description: '', image: '' }];
    const newItem = { title: 'Testing link', description: 'test', image: '' };

    const model = new Model();
    model.data = testData;

    const result = [newItem, ...model.data];
    model.addItemToData(newItem);

    expect(model.data).toEqual(result);
  });

  test("Don't add simple string", () => {
    const newItem = 'fuhkjl';
    const model = new Model();
    expect(model.addItemToData(newItem)).toBe(null);
  });

  test("Don't add array", () => {
    const newItem = [0, 1, 'fuhkjl'];
    const model = new Model();
    expect(model.addItemToData(newItem)).toBe(null);
  });

  test("Don't add number", () => {
    const newItem = 0;
    const model = new Model();
    expect(model.addItemToData(newItem)).toBe(null);
  });

  test("Don't add boolean", () => {
    const newItem = false;
    const model = new Model();
    expect(model.addItemToData(newItem)).toBe(null);
  });

  test("Don't add undefined", () => {
    const newItem = undefined;
    const model = new Model();
    expect(model.addItemToData(newItem)).toBe(null);
  });
});

describe('Testing removeItemFromData function', () => {
  test('Remove item from data', () => {
    const testData = [
      { title: 'BlaBla', description: '', image: '' },
      { title: 'BlaBla2', description: '', image: '' },
    ];
    const result = [{ title: 'BlaBla2', description: '', image: '' }];

    const model = new Model();
    model.data = testData;

    model.removeItemFromData('BlaBla');

    expect(model.data).toEqual(result);
  });

  test("Don't remove if function received an array", () => {
    const removeItem = ['adax'];
    const model = new Model();
    expect(model.removeItemFromData(removeItem)).toBe(null);
  });

  test("Don't remove if function received a boolean value", () => {
    const removeItem = true;
    const model = new Model();
    expect(model.removeItemFromData(removeItem)).toBe(null);
  });

  test("Don't remove if function received Object", () => {
    const removeItem = {};
    const model = new Model();
    expect(model.removeItemFromData(removeItem)).toBe(null);
  });
});

describe('Testing creatingDataItem function', () => {
  it('If fetch working correctly, has the fn returned the correct object of item?', () => {
    const model = new Model();

    const typingVal = 'youtube.com';

    const receivedData = {
      title: 'YouTube',
      description: 'Enjoy the videos and music you love.',
      image: '',
      url: 'https://www.youtube.com/',
    };

    const result = { ...receivedData, typingValue: typingVal };

    expect(model.creatingDataItem(receivedData, typingVal)).toEqual(result);
  });

  it('If fetch return error, has the fn returned the correct object of item?', () => {
    const model = new Model();

    const typingVal = 'facebook.com';

    const receivedData = 200;

    const result = { url: typingVal, title: typingVal, typingValue: typingVal };

    expect(model.creatingDataItem(receivedData, typingVal)).toEqual(result);
  });
});
