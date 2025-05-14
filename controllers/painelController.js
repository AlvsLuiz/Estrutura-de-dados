function atualizarAtendimento() {
        const ultimo = localStorage.getItem('ultimoAtendido') || "Aguardando...";
        
        document.getElementById('ultimoAtendimento').innerHTML = ultimo;
}
