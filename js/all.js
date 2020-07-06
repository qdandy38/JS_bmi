// DOM
const send = document.querySelector('.send');
const height = document.querySelector('.height');
const weight = document.querySelector('.kg');
const list = document.querySelector('.list');
const reset = document.querySelector('.clean');
const average = document.querySelector('.average');

let data = [];
let count = 0; //計算次數
let totalBmi = 0;
send.addEventListener('click', bmiCal, false);
reset.addEventListener('click', clearAll, false);

function clearAll(e) {
    e.preventDefault();
    data = [];
    count = 0;
    totalBmi = 0;
    render();
    average.textContent = '';
}

function bmiCal(e) {
    e.preventDefault();
    if (height.value !== '' && weight.value !== '') {
        let heightVal = parseInt(height.value.trim());
        let weightVal = parseInt(weight.value.trim());
        let bmi = (weightVal / ((heightVal / 100) ** 2)).toFixed(2);
        let bmiStatus = Status(bmi);
        let averageVal = averageCal(bmi);
        const bmiInfo = {
            height: heightVal,
            weight: weightVal,
            bmi: bmi,
            status: bmiStatus.content,
            color: bmiStatus.color
        }
        data.push(bmiInfo);

        render(averageVal);
        height.value = '';
        weight.value = '';
    } else {
        alert('請輸入數值!');
    }
}

// 判斷bmi狀態
function Status(bmi) {
    let status = {};
    if (bmi < 18.5) {
        status = {
            content: '過輕',
            color: '#31BAF9'
        };
    } else if (bmi >= 18.5 && bmi < 24) {
        status = {
            content: '理想',
            color: '#86D73F'
        };
    } else if (bmi >= 24 && bmi < 27) {
        status = {
            content: '過重',
            color: '#FF982D'
        };
    } else if (bmi >= 27 && bmi < 30) {
        status = {
            content: '輕度肥胖',
            color: '#FF6C02'
        };
    } else if (bmi >= 30 && bmi < 35) {
        status = {
            content: '輕度肥胖',
            color: '#FF6C02'
        };
    } else {
        status = {
            content: '重度肥胖',
            color: '#FF1200'
        };
    }
    return status;
}

// 計算平均
function averageCal(bmi) {
    count++;
    totalBmi += Number(bmi);

    return (totalBmi / count).toFixed(2);
}
// 渲染畫面
function render(averageVal) {
    average.textContent = `總計測量${count}次，平均BMI為${averageVal}`;
    let str = '';
    data.forEach(function(item) {
        str += `
        <li class="card d-flex flex-column align-items-center py-6 mb-1" style="color:${item.color}; border-color:${item.color}">
            <h3 class="font-size-md font-weight-medium mb-3">${item.status}</h3>
            <ul>
                <li>BMI ${item.bmi}</li>
                <li>height：${item.height}cm</li>
                <li>weight：${item.weight}kg</li>
            </ul>
        </li>
        `
    })
    list.innerHTML = str;
}