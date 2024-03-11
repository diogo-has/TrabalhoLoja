var menu = {
    'categoria': [
        'Selecione a categoria primeiro'
    ],
    'pollos': [
        'Pollos Peq.',
        'Pollos Grande',
        'Pollos Calientes Peq.',
        'Pollos Calientes Grande',
        'Pollos Fiesta'
    ],
    'burritos': [
        'Básico',
        'Nuevo Mexico',
        'Albuquerque',
        'Santa Fe',
        'Chile'
    ],
    'acompanhamentos': [
        'Papas Fritas',
        'Papas Rizadas',
        'Pollos Nuggets',
        'Nacho\'s Nachos',
        'Cebolla Rings'
    ],
    'bebidas': [
        'Refrigerante Peq.',
        'Refrigerante Médio',
        'Refrigerante Grande',
        'Suco',
        'Água'
    ],
    'sobremesas': [
        'Churros de Chocolate',
        'Churros de Dulce de Leche',
        'Churros de Nutella',
        'Helado Peq.',
        'Helado Grande'
    ]
};

var prices = {
    'Pollos Peq.': 9.90, 'Pollos Grande': 15.90,
    'Pollos Calientes Peq.': 10.90,
    'Pollos Calientes Grande': 16.90,
    'Pollos Fiesta': 20.90,

    'Básico': 15.90, 'Nuevo Mexico': 16.90,
    'Albuquerque': 17.50, 'Santa Fe': 17.50,
    'Chile': 18.50,

    'Papas Fritas': 13.90, 'Papas Rizadas': 14.90,
    'Pollos Nuggets': 11.90, 'Nacho\'s Nachos': 14.90,
    'Cebolla Rings': 14.90,

    'Refrigerante Peq.': 10.90, 'Refrigerante Médio': 11.90,
    'Refrigerante Grande': 12.90, 'Suco': 9.90,
    'Água': 5.90,

    'Churros de Chocolate': 15.90,
    'Churros de Dulce de Leche': 17.90,
    'Churros de Nutella': 20.90,
    'Helado Peq.': 2.90, 'Helado Grande': 5.90
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
        var text = `R$ ${(inputs[2].value * prices[String(inputs[1].value)]).toFixed(2)} - ${inputs[2].value}x ${inputs[1].value}`;

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

        if (!isNaN(prices[String(inputs[1].value)])) total += inputs[2].value * prices[String(inputs[1].value)];
        document.getElementById('total').textContent = `R$ ${total.toFixed(2)}`;
        console.log(inputs[0])
    })
}

function toggleOvvw() {
    if (document.getElementById('overview').style.display == 'none') document.getElementById('overview').style.display = 'flex'; else document.getElementById('overview').style.display = 'none';
}

function enviar() {
    var nome = document.getElementById('nome').value;
    if (nome == '') return;

    var date = new Date();
    date = formatDate(date);

    var obs = document.getElementById('observ').value;

    var msg = `${nome}\n${date}\n\n`;
    
    var orders = document.getElementById("orders");
    var o = orders.getElementsByClassName("order");

    var ordersText = '';
    Array.from(o).forEach((order) => {
        var inputs = order.getElementsByClassName('input');
        if (inputs[2].value == 0) return false;
        ordersText += `${inputs[2].value}x ${inputs[1].value}\n`;
    })

    if (ordersText == '') return;
    msg += `${ordersText}\nObservações: ${obs}`;

    confirm(msg + "\n--------------------------\nConfirmar envio?");
    window.open(`https://wa.me/55419999999999?text=${window.encodeURIComponent(msg)}`, '_blank');
}

function formatDate(item){
    var options = {
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    }

    return item.toLocaleString("pt-BR", options);
}