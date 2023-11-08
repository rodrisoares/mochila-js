const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
const botaoForm = document.getElementById("cadastrar") 
const itens = JSON.parse(localStorage.getItem("itens")) || []


const itemId = document.createElement('input');
itemId.type = 'hidden';
form.appendChild(itemId);


const cabecalhoNome = document.createElement("div")
cabecalhoNome.classList.add("nome")  
cabecalhoNome.innerHTML = '<strong>Nome</strong>'
lista.appendChild(cabecalhoNome)

const cabecalhoQuantidade = document.createElement("div")
cabecalhoQuantidade.classList.add("quantidade") 
cabecalhoQuantidade.innerHTML = '<strong>Quantidade</strong>'
lista.appendChild(cabecalhoQuantidade)

itens.forEach( (elemento) => {
    criaElemento(elemento)
} )

form.addEventListener("submit", (evento) => {
    evento.preventDefault()
   
    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    const existe = itens.find( elemento => elemento.nome === nome.value )

    if (nome.value === '' || quantidade.value === '') {
        alert('Por favor, preencha todos os campos!');
        return;
    } 
    
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    if (existe) {
        itemAtual.id = existe.id
        
        atualizaElemento(itemAtual)

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
    } else {
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1 : 0;

        criaElemento(itemAtual)

        itens.push(itemAtual)
    }

    localStorage.setItem("itens", JSON.stringify(itens))

    nome.value = ""
    quantidade.value = ""
    itemId.value = ""  

    botaoForm.value = itemId.value ? 'Salvar' : 'Adicionar'; 
})

function criaElemento(item) {
    const novoItem = document.createElement("li")
    novoItem.classList.add("item")
    novoItem.dataset.id = item.id  

    const nomeColuna = document.createElement("div")
    nomeColuna.classList.add("nome")  
    nomeColuna.innerHTML = item.nome
    novoItem.appendChild(nomeColuna)

    const quantidadeColuna = document.createElement("div")
    quantidadeColuna.classList.add("quantidade") 
    quantidadeColuna.innerHTML = item.quantidade
    novoItem.appendChild(quantidadeColuna)
   
    novoItem.appendChild(botaoEdita(item)) 
    novoItem.appendChild(botaoDeleta(item.id))
    
    lista.appendChild(novoItem)
}


function atualizaElemento(item) {
    const itemElement = document.querySelector(`li[data-id='${item.id}']`);
    const nomeColuna = itemElement.querySelector('.nome');
    const quantidadeColuna = itemElement.querySelector('.quantidade');

    nomeColuna.innerHTML = item.nome;
    quantidadeColuna.innerHTML = item.quantidade;
}

function botaoEdita(item) {
    const elementoBotao = document.createElement("button")
    elementoBotao.innerHTML = '<i class="fa fa-edit fa-2x"></i>'

    elementoBotao.addEventListener("click", function() {
        form.elements['nome'].value = item.nome
        form.elements['quantidade'].value = item.quantidade
        itemId.value = item.id  
        botaoForm.value = 'Salvar'; 
    })

    return elementoBotao
}

function botaoDeleta(id) {
    const elementoBotao = document.createElement("button")
    elementoBotao.innerHTML = '<i class="fa fa-trash fa-2x"></i>'

    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id)
    })

    return elementoBotao
}

function deletaElemento(tag, id) {
    tag.remove()

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

    localStorage.setItem("itens", JSON.stringify(itens))
}
