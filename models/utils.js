    function getDataAtual() {
        return new Date().toLocaleDateString();
}

    function getHoraAtual() {
        return new Date().toLocaleTimeString();
}

    function calcularTempoFila(entrada, saida) {
        const [h1, m1, s1] = entrada.split(":").map(Number);
        const [h2, m2, s2] = saida.split(":").map(Number);
        const secin = h1 * 3600 + m1 * 60 + s1;
        const secout = h2 * 3600 + m2 * 60 + s2;
        let dif = secout - secin;
        if (dif < 0) dif += 24 * 3600;
        const minutos = Math.floor(dif / 60);
        const segundos = dif % 60;
        return `${minutos} min ${segundos} seg`;
}