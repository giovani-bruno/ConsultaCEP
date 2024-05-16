function pesquisacep(valor) {
    var cep = valor.replace(/\D/g, '');
    if (cep != "") {
        var validacep = /^[0-9]{8}$/;
        if(validacep.test(cep)) {
            document.getElementById("cep").value = "";
            var script = document.createElement("script");
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';
            
            document.getElementById("carregando").style.display = "block";
            
            document.body.appendChild(script);
        }
        else {
            limpa_formulario_cep();
            alert("O CEP digitado é inválido.");
        } 
    } else {
        limpa_formulario_cep();
    }
}


function limpa_formulario_cep() {
    document.getElementById("endereco").innerHTML = "";
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        document.getElementById("endereco").innerHTML = "CEP: " + conteudo.cep + "<br>Logradouro: " + conteudo.logradouro + "<br>Bairro: " + conteudo.bairro + "<br>Cidade: " + conteudo.localidade + "<br>Estado: " + conteudo.uf;

        document.getElementById("carregando").style.display = "none";
        
        var enderecoCard = document.querySelector(".endereco-card");
        enderecoCard.style.display = "block";
    }
    else {
        limpa_formulario_cep();
        alert("CEP não encontrado.");
    }
}