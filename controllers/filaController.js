const minhaFila = new FilaCircular(5);

function addElemento(){
    const nome = document.getElementById("txtnovoNome").value;
    const cpf = document.getElementById("txtnovoCPF").value;

     if(nome && cpf && !minhaFila.isFull()){
      const atendimento = new Atendimento();
        atendimento.nome = nome;
        atendimento.cpf = cpf;
        atendimento.data = getDataAtual();
        atendimento.hora = getHoraAtual();

      minhaFila.enqueue(atendimento);
      mostrarFila();
        document.getElementById("txtnovoNome").value = "";
        document.getElementById("txtnovoCPF").value = "";
        document.getElementById("txtnovoNome").focus();
    } else {
      alert("Os campos estão incorretos, por favor tente novamente com dados corrigidos")
    }
}

function mostrarFila(){
   const listaFila = document.getElementById("listFila");
   listaFila.innerHTML = "";
   for(let atendimento of minhaFila) {
        const listaElemento = document.createElement("li");
        listaElemento.textContent = `${atendimento.nome} | ${atendimento.cpf} | ${atendimento.data} | ${atendimento.hora}`;
        listaFila.appendChild(listaElemento);
   }
}
    function buscarCPF() {
  
        const cpfBuscado = prompt("insira o seu CPF para buscar:").trim();

        if (!cpfBuscado) {
        alert("insira um CPF válido!");
        return;
    }

        let posicao = 1;
        let encontradoNaFila = false;
        let encontradoAtendido = false;

   
    for (let atendimento of minhaFila) {
             if (atendimento.cpf.trim() === cpfBuscado) {  
            encontradoNaFila = true;
            alert(`CPF encontrado\nNome: ${atendimento.nome}\nStatus: Ainda está na fila\nPosição: ${posicao}`);
            break;
        }
        posicao++;
    }

        if (!encontradoNaFila) {
       
        let atendidos = JSON.parse(localStorage.getItem('listaAtendidos')) || [];

        for (let registro of atendidos) {
                if (registro.cpf.trim() === cpfBuscado) {  
                const tempoFila = calcularTempoFila(registro.entrada, registro.saida);
                alert(`Cpf encontrado!\nNome da Pessoa: ${registro.nome}\nStatus: Já foi atendida\nHora de entrada:
                    ${registro.entrada}\nHora de saída: ${registro.saida}\nTempo na fila: ${tempoFila}`);
                encontradoAtendido = true;
                break;
            }
        }

        if (!encontradoAtendido) {
            alert("Cpf não cadastrado anteriormente");
        }
    }
}


function atenderFila(){
             if(!minhaFila.isEmpty()){
       const atendido = minhaFila.dequeue();
       const saida = getHoraAtual();
       const tempoFila = calcularTempoFila(atendido.hora, saida);
 
       
       const msg = `Pessoa atendida: ${atendido.nome}<br>Entrada: ${atendido.hora}<br>Saída: ${saida}<br>Tempo na fila: ${tempoFila}`;
       document.getElementById("mensagem-remocao").innerHTML = msg;
 
       
       localStorage.setItem('ultimoAtendido', msg);
 
       let atendidos = JSON.parse(localStorage.getItem('listaAtendidos')) || [];
       atendidos.push({
           nome: atendido.nome,
           cpf: atendido.cpf,
           entrada: atendido.hora,
           saida: saida,
           tempoFila: tempoFila
       });
       localStorage.setItem('listaAtendidos', JSON.stringify(atendidos));
 
       mostrarFila();
    }
        else {
       alert("A fila está vazia!");
    }
 }
 