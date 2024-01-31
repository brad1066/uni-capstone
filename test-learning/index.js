function sum(a, b) {
    return a + b;
}

function is_palindrome(word) {
    return reverse_string(word).toLowerCase() === word.toLowerCase();
}

function reverse_string(word) {
    return word.split('').reverse().join('');
}

module.exports = { sum, is_palindrome, reverse_string };