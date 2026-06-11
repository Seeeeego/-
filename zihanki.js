const drinks = [
    {id:1,name:"💧水",price:120},
    {id:2,name:"🍵お茶",price:150},
    {id:3,name:"☕️コーヒー",price:130}
];

function Menu() {
    const menuArea = document.getElementById('menu-area');
    const productSelect = document.getElementById('product-select');
    
    let menuHtml = '<h3>--- メニュー表示 ---</h3>';
    
    drinks.forEach(function (drink) {
        menuHtml += '<div class="menu-item"><span>[' + drink.id + '] ' + drink.name + '</span> <span>' + drink.price + '円</span></div>';
        
        // 画面の選択肢を追加
        const option = document.createElement('option');
        option.value = drink.id;
        option.textContent = drink.name + ' (' + drink.price + '円)';
        productSelect.appendChild(option);
    });
    
    menuArea.innerHTML = menuHtml;
}

function printLog(text){
    document.getElementById("output").textContent = text;
}

function VendingMachine(){
    const moneyInputValue = document.getElementById("money-input").value;
    Money(moneyInputValue);
}

function Money(money){
// 追加後小数点を見つけてエラーを出力する
    if(money.includes(".")){
        printLog("小数点は入力できません。整数の金額を入力してください。");
        return;
    }
    const inputMoney = parseInt(money,10);

    if(isNaN(inputMoney) || inputMoney <= 0){
        printLog("正しい金額を入力してください");
        return;
    }
    if (inputMoney % 10 !== 0) {
        printLog("1円玉、5円玉は使用できません。10円単位で投入してください。");
        return;
    }
    Product(inputMoney);
}

function Product(inputMoney){
    const selectedIdValue = document.getElementById("product-select").value;
    const selectedId = parseInt(selectedIdValue,10);

    const drink = drinks.find(function(d){
        return d.id === selectedId;
    });

    if(!drink){
        printLog("購入する商品を選んでください");
        return;
    }

    checkPutchase(inputMoney,drink);
}

function checkPutchase(inputMoney,drink){
    let resultMessage = inputMoney + "円投入されました\n「" + drink.name + "」が選択されました\n\n" ;

    if(inputMoney >= drink.price){
        const change = inputMoney - drink.price;
        resultMessage += "お買い上げありがとうございました！\n おつりは " + change + "円です";
    }else{
        resultMessage += "お金が足りません。\n おつり: " + inputMoney + "円";
    }
    printLog(resultMessage);
}