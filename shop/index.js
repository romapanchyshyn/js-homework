var productsCount = [0, 0, 0, 0, 0, 0, 0];
checkLocalStorage();


function addToCart(e) {
    e = e || event;
    if (checkProductCount(e.target.id)) {
        var nameEl = document.getElementById(e.target.id).parentElement.parentElement.children[1];
        var priceEl = document.getElementById(e.target.id).parentElement.parentElement.children[3];
        var tr = document.createElement("tr");
        var cartTable = document.getElementsByClassName("order_table")[0].children[0];
        var trNode = cartTable.appendChild(tr);
        var tdName = document.createElement("td");
        var tdPrice = document.createElement("td");
        tdName.innerHTML = nameEl.innerHTML;
        tdPrice.innerHTML = priceEl.innerHTML;
        tr.appendChild(tdName);
        tr.appendChild(tdPrice);
        var tdOptions = document.createElement("td");
        var options = tr.appendChild(tdOptions);
        var productCount = document.createElement("span");
        productCount.setAttribute('id', 's' + e.target.id);
        productCount.innerHTML = productsCount[e.target.id];
        var minus = document.createElement("button");
        minus.innerHTML = "-";
        minus.setAttribute("onclick", "removeProduct(event.target.previousSibling.getAttribute('id').substring(1))");
        var plus = document.createElement("button");
        plus.innerHTML = "+";
        plus.setAttribute("onclick", "addProduct(event.target.previousSibling.previousSibling.getAttribute('id').substring(1))");
        options.appendChild(productCount);
        options.appendChild(minus);
        options.appendChild(plus);
        addProduct(e.target.id);
    } else {
        addProduct(e.target.id);
    }
}

function addProduct(el) {
    if (!isNaN(document.getElementById(el).previousElementSibling.value)) {
        for (var i = 0; i < document.getElementById(el).previousElementSibling.value; i++) {
            productsCount[el]++;
        }
        document.getElementById('s' + el).innerHTML = productsCount[el];
        showProductCount();
        saveToLocalStorage();
    } else alert("ПОМИЛКА.Не числові дані: " + document.getElementById(el).previousElementSibling.value + " В поле введіть число!");
}

function saveToLocalStorage() {
    var orderEl = document.getElementsByTagName("tbody")[0].innerHTML;
    window.localStorage.setItem("all_table", orderEl);
    window, localStorage.setItem("counts", JSON.stringify(productsCount))
}

function checkLocalStorage() {
    if (localStorage.getItem("all_table")) {
        document.getElementsByTagName("tbody")[0].innerHTML = localStorage.getItem("all_table");
        productsCount = JSON.parse(localStorage.getItem("counts"))
        showProductCount();
    }
}

function removeProduct(el) {
    if (productsCount[el] > 0) {
        productsCount[el]--;
        document.getElementById('s' + el).innerHTML = productsCount[el];
        showProductCount();
        if (productsCount[el] == 0) {
            document.getElementById('s' + el).parentElement.parentElement.parentElement.removeChild(document.getElementById('s' + el).parentElement.parentElement);
        }
    }
    saveToLocalStorage();
}

function checkProductCount(el) {
    return productsCount[el] < 1;
}

function showProductCount() {
    var sum = productsCount.reduce(function (sum, current) {
        return sum + current;
    }, 0)
    document.getElementById("product_count").innerHTML = "У вас в корзині " + sum + " товарів ";

    var prices = document.getElementsByClassName("buy_button")
    var total = 0;
    for (var i = 0; i < prices.length; i++) {
        total = total + productsCount[i + 1] * prices[i].getAttribute('value');
    }
    document.getElementsByClassName('sum')[0].innerHTML = total + "$";
}

function clearCart() {
    var tableContent = document.getElementsByTagName("tbody")[0];
    for (var i = 1; i != tableContent.children.length;) {
        tableContent.removeChild(tableContent.children[i]);
    }
    for (var i = 0; i < productsCount.length; i++) {
        productsCount[i] = 0;
    }
    showProductCount();
    saveToLocalStorage();
}
