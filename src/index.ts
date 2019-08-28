// import { add as addFromScott } from './math';
import * as fromMath from './math'; // this is an okay practice because WebPack will "tree shake" aka remove unused functions upon compiling
import './styles.css';

const number1 = document.getElementById('number1') as HTMLInputElement;
const number2 = document.getElementById('number2') as HTMLInputElement;
const add = document.getElementById('add') as HTMLInputElement;
const answer = document.getElementById('sum') as HTMLSpanElement;
// console.log({ number1, number2, add });

add.addEventListener('click', function () {
    // console.log('click', this); // this = reference to the element that was clicked
    const n1 = number1.valueAsNumber;
    const n2 = number2.valueAsNumber;
    const sum = fromMath.add(n1, n2);
    console.log(sum);
    answer.innerText = sum.toString();
    number1.value = '';
    number2.value = '';
    number1.focus();
});
