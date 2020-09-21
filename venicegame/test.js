/** @format */

'use strice';

let words = [];
let new_words = [];

for (let i = 0; i < 10; i++) {
  words[i] = i;
}

while (new_words.length < 5) {
  random_num = Math.floor(Math.random() * 10);
  if (new_words.includes(words[random_num])) {
    console.log('중복이었다');
    continue;
  } else {
    console.log('노중복');
    new_words.push(words[random_num]);
  }
}

console.log(new_words);
