const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const drinks = [
    { id: 1, name: '水', price: 120 },
    { id: 2, name: 'お茶', price: 150 },
    { id: 3, name: 'コーヒー', price: 130 }
];

// 
function VendingMachine() {
    Menu();         
    Money();      
}

// メニュー表示
function Menu() {
    console.log('--- メニュー表示 ---');
    drinks.forEach(function (drink) {
        console.log('[' + drink.id + '] ' + drink.name + ': ' + drink.price + '円');
    });
}

// 投入金額を受け取る
function Money() {
    rl.question('お金を投入してください： ', function (money) {
        const inputMoney = parseInt(money, 10);

        // 入力チェック
        if (isNaN(inputMoney) || inputMoney <= 0) {
            console.log('正しい金額を入力してください。');
            rl.close();
            return;
        }

        console.log('\n' + inputMoney + '円投入されました。');

        Product(inputMoney);
    });
}

// 商品の選択
function Product(inputMoney) {
    rl.question('購入する商品の番号（1〜3）を選んでください: ', function (Id) {
        const selectedId = parseInt(Id, 10);
        
        // 商品を探す
        const drink = drinks.find(function (d) {
            return d.id === selectedId;
        });

        // 商品チェック
        if (!drink) {
            console.log('無効な番号です。');
            rl.close();
            return;
        }

        console.log('\n「' + drink.name + '」（' + drink.price + '円）が選択されました。');

        checkPurchase(inputMoney, drink);
    });
}

// 購入可否を判定する
function checkPurchase(inputMoney, drink) {
    if (inputMoney >= drink.price) {
        const change = inputMoney - drink.price;
        console.log('おつりは ' + change + ' 円です。');
    } else {
        console.log('お金が足りません。');
        console.log('おつり: ' + inputMoney + ' 円');
    }

    rl.close();
}

VendingMachine();