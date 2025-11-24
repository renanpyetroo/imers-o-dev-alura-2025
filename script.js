let cardContainer = document.querySelector(".card-container");
let dados = [];

async function IniciarBusca() {
    // Se os dados ainda não foram carregados, busca do data.json
    if (dados.length === 0) {
        let resposta = await fetch("data.json");
        dados = await resposta.json();
    }

    // Pega o valor do input da busca e remove espaços em branco
    let termoBusca = document.querySelector("input").value.trim().toLowerCase();

    // Filtra os dados com base no termo de busca
    const resultados = dados.filter(dado => 
        dado.nome.toLowerCase().includes(termoBusca) ||
        dado.descricao.toLowerCase().includes(termoBusca)
    );

    // Limpa os cards existentes antes de renderizar os novos
    cardContainer.innerHTML = "";

    if (resultados.length === 0) {
        cardContainer.innerHTML = `<p>Nenhum resultado encontrado.</p>`;
    } else {
        renderizarCards(resultados);
    }
}

function renderizarCards(dados) {
    for (let dado of dados) {
        const article = document.createElement("article");

        const h2 = document.createElement("h2");
        h2.textContent = dado.nome;
        h2.style.cursor = "pointer";
        h2.onclick = () => {
            const novaAba = window.open("", "_blank");
            novaAba.document.write(`
                <html>
                    <head>
                        <title>${dado.nome}</title>
                        <link rel="stylesheet" href="style.css"> 
                        <style>
                            main {
                                text-align: center;
                                font-family: 'Courier New', Courier, monospace;
                            }
                            .content {
                                font-size: 1.5rem; /* Fonte maior para o conteúdo */
                            }
                            .content h2 {
                                font-size: 4rem; /* Fonte bem maior para o título */
                                text-transform: uppercase;
                            }
                            .meme {
                                max-width: 400px;
                                margin-top: 20px;
                                border: 3px solid var(--cor-borda);
                            }
                            .warning {
                                color: #FF4500; /* Laranja avermelhado para alerta */
                                font-weight: bold;
                                font-size: 1.6rem;
                                text-shadow: 0 0 8px #FF0000;
                            }
                        </style>
                    </head>
                    <body>
                        <header>
                            <h1>HACKERPEDIA</h1>
                        </header>
                        <main>
                            <div class="content">
                                <h2>${dado.nome}</h2>
                                <p><strong>Ano de criação:</strong> ${dado.data_criacao}</p>
                                <p>${dado.descricao}</p>
                                <a href="${dado.link}" target="_blank">Saiba mais</a>
                                <hr>
                                <p class="warning">Tome cuidado para não ser hackeado com essa linguagem!</p>
                                <img src="https://www.hellomoto.com.br/wp-content/uploads/2022/11/imagem6.png" alt="Meme This is fine" class="meme">
                            </div>
                        </main>
                        <footer class="footer">
                            <ul class="footer-links">
                                <li>
                                    <a href="https://github.com/guilhermeonrails">GitHub</a>
                                </li>
                                <li>
                                    <a href="https://www.alura.com.br/">Alura</a>
                                </li>
                            </ul>
                        </footer>
                    </body>
                </html>
            `);
        };

        const pAno = document.createElement("p");
        pAno.innerHTML = `<strong>Ano de criação:</strong> ${dado.data_criacao}`;

        const pDescricao = document.createElement("p");
        pDescricao.textContent = dado.descricao;

        const aLink = document.createElement("a");
        aLink.href = dado.link;
        aLink.target = "_blank";
        aLink.textContent = "Saiba mais";

        article.appendChild(h2);
        article.appendChild(pAno);
        article.appendChild(pDescricao);
        article.appendChild(aLink);
        cardContainer.appendChild(article);
    }
}