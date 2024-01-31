const { sum, is_palindrome, reverse_string } = require('./index');

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});

test('is_palindrome', () => {
    expect(is_palindrome('racecar')).toBeTruthy();
    expect(is_palindrome('RaceCar')).toBeTruthy();
    expect(is_palindrome('palindrome')).toBeFalsy();
});

test('reverse_string', () => {
    expect(reverse_string('hello')).toBe('olleh');
    expect(reverse_string('Hello')).toBe('olleH');
});