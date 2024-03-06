var counter = 1;

var menu = {
    'categoria': [
        'Selecione uma categoria primeiro'
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

function test() {
    if (counter >= 15) {
        alert("Máximo de 15 itens por pedido.\nCaso deseje pedir mais, favor fazer múltiplos pedidos.");
        return;
    };

    counter++;
    var optHTML = document.getElementById("order1").innerHTML;
    var opts = document.getElementById("orders");

    var newOpt = document.createElement('div');
    newOpt.classList.add('order');
    newOpt.id = 'order' + counter;
    newOpt.innerHTML = optHTML;

    opts.appendChild(newOpt);

    console.log(document.getElementsByName('type'))
        
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

            inputs[2].value = 1;
        })

        menu[String(inputs[0].value)].forEach(item => {
            var existingOpt = document.getElementById(item + '-opt-' + order.id);
            if (existingOpt) return false;
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

    Array.from(o).forEach((order) => {
        var inputs = order.getElementsByClassName('input');
        var existingOvvwLine = document.getElementById(order.id + '-overview');

        if (existingOvvwLine) {
            existingOvvwLine.textContent = `${inputs[1].value} --- R$${prices[String(inputs[1].value)]} * ${inputs[2].value} = `;
        } else {
            var ovvwLine = document.createElement('p');
            ovvwLine.className = 'ovvwLine';
            ovvwLine.id = order.id + "-overview";
            ovvwLine.textContent = `${inputs[1].value} --- R$${prices[String(inputs[1].value)]} * ${inputs[2].value} = `;
    
            overview.appendChild(ovvwLine);
        }
        
        // overview.textContent += `${inputs[1].value} --- R$${prices[String(inputs[1].value)]} * ${inputs[2].value} = `
    })
}