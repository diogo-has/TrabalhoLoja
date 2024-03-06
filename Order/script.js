var menu = {
    'categoria': [
        'Selecione a categoria primeiro'
    ],
    'hamburgueres': [
        'Hamburguer1',
        'Hamburguer2',
        'Hamburguer3',
        'Hamburguer4',
        'Hamburguer5'
    ],
    'frango': [
        'Frango1',
        'Frango2',
        'Frango3',
        'Frango4',
        'Frango5'
    ],
    'acompanhamentos': [
        'Acompanhamento1',
        'Acompanhamento2',
        'Acompanhamento3',
        'Acompanhamento4',
        'Acompanhamento5'
    ],
    'bebidas': [
        'Bebida1',
        'Bebida2',
        'Bebida3',
        'Bebida4',
        'Bebida5'
    ],
    'combos': [
        'Combo1',
        'Combo2',
        'Combo3',
        'Combo4',
        'Combo5'
    ]
};

var prices = {
    'Hamburguer1': 10.99, 'Hamburguer2': 12.99,
    'Hamburguer3': 13.99, 'Hamburguer4': 14.99,
    'Hamburguer5': 15.99,

    'Frango1': 5.99, 'Frango2': 6.99, 'Frango3': 7.99,
    'Frango4': 8.99, 'Frango5': 9.99,

    'Acompanhamento1': 8.99, 'Acompanhamento2': 9.99,
    'Acompanhamento3': 8.99, 'Acompanhamento4': 8.99,
    'Acompanhamento5': 8.99,

    'Bebida1': 4.99, 'Bebida2': 5.99, 'Bebida3': 6.99,
    'Bebida4': 7.99, 'Bebida5': 8.99,

    'Combo1': 20.99, 'Combo2': 22.99, 'Combo3': 23.99,
    'Combo4': 24.99, 'Combo5': 25.99
}

var counter = 1;
function addOrder() {
    if (counter >= 15) {
        alert("Máximo de 15 itens por pedido.\nCaso deseje pedir mais, favor fazer múltiplos pedidos.");
        return;
    }

    counter++;
    var orderHTML = document.getElementById("order1").innerHTML;
    var orders = document.getElementById("orders");

    var newOrder = document.createElement('div');
    newOrder.classList.add('order');
    newOrder.id = 'order' + counter;
    newOrder.innerHTML = orderHTML;
    newOrder.getElementsByClassName('input')[1].innerHTML =
        "<option selected>Selecione a categoria primeiro</option>";

    orders.appendChild(newOrder);

    console.log(document.getElementsByName('type'))

}

function removeOrder() {
    if (counter == 1) return;

    var orders = document.getElementById("orders");
    var order = orders.getElementsByClassName("order").item(counter - 1);
    var existingOvvwLine = document.getElementById(order.id + '-overview');

    order.remove();
    if (existingOvvwLine) {
        var ovvwCategory = existingOvvwLine.parentElement;
        existingOvvwLine.remove();
        if (ovvwCategory.children.length == "1") ovvwCategory.style.display = 'none';
    }

    counter--;
}

function updateSelects() {
    var orders = document.getElementById("orders");
    var o = orders.getElementsByClassName("order");

    Array.from(o).forEach((order) => {
        var inputs = order.getElementsByClassName('input');

        menu[String(inputs[0].value)].forEach(item => {
            var existingOpt = document.getElementById(item + '-opt-' + order.id);
            if (existingOpt) return false;
            inputs[1].innerHTML = '';

            inputs[2].value = 0;
        })

        menu[String(inputs[0].value)].forEach(item => {
            var opt = document.createElement('option');
            opt.value = item;
            opt.textContent = item;
            opt.id = item + '-opt-' + order.id;
            opt.className = 'item';

            inputs[1].appendChild(opt);
        })

    })
}

function updateOverview() {
    var orders = document.getElementById("orders");
    var o = orders.getElementsByClassName("order");
    var overview = document.getElementById("overview");
    var total = 0.0;

    Array.from(o).forEach((order) => {
        var inputs = order.getElementsByClassName('input');
        var existingOvvwLine = document.getElementById(order.id + '-overview');
        var text = `R$${(inputs[2].value * prices[String(inputs[1].value)]).toFixed(2)} — ${inputs[2].value}x ${inputs[1].value}`;

        if (existingOvvwLine) {
            if (prices[String(inputs[1].value)] && inputs[2].value != 0) {
                existingOvvwLine.textContent = text;
            } else {
                // existingOvvwLine.parentElement.style.display = 'none';
                var ovvwCategory = existingOvvwLine.parentElement;
                existingOvvwLine.remove();
                if (ovvwCategory.children.length == "1") ovvwCategory.style.display = 'none';
            }
        } else if (prices[String(inputs[1].value)] && inputs[2].value != 0) {
            var ovvwLine = document.createElement('p');
            ovvwLine.className = 'ovvwLine';
            ovvwLine.id = order.id + "-overview";
            ovvwLine.textContent = text;

            var ovvwCategory = document.getElementById(String(inputs[0].value))
            console.log(ovvwCategory)
            ovvwCategory.style.display = 'flex';
            ovvwCategory.appendChild(ovvwLine);

        }

        total += inputs[2].value * prices[String(inputs[1].value)];
        document.getElementById('total').textContent = `R$${total.toFixed(2)}`;
        console.log(inputs[0])
    })
}