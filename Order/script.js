var counter = 1;

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
}

