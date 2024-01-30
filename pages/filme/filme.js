// chave da API
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRqZHlraXVjYWJneWxsbGtjd3dqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYzMTI0OTMsImV4cCI6MjAyMTg4ODQ5M30.0Kr7UBq491E2H-mEot5_N7ZUcy753AyJCVFqXL7LUDw";
// url da API
const url = "https://tjdykiucabgylllkcwwj.supabase.co";

// operação para acessar a API
const database=supabase.createClient(url,key);

// operação para criar um filme
let save = document.querySelector("#salvar");
save.addEventListener("click", async (e)=>{
    e.preventDefault();
    let titulo = document.querySelector("#titulo").value;
    let descricao = document.querySelector("#descricao").value;
    let genero = document.querySelector("#genero").value;
    let ano = document.querySelector("#ano").value;
    save.innerText = "salvando...";
    // save.setAttribute("disabled", true);
    let res = await database.from("filmes").insert({
        titulo: titulo,
        descricao: descricao,
        genero: genero,
        ano: ano
    })
    // mensagem que aparece quando o estudante é adicionado e desativa o modal
    if(res){
        alert("Filme salvo com sucesso");
        save.innerText = "Salvo"
        save.setAttribute("disable", false);
        titulo = "";
        descricao = "";
        genero = "";
        ano = "";
        getFilmes();
        getTotalFilmes();

    }else{
        alert("Não foi possível adicionar seu filme");
        save.innerText = "Salvo"
        save.setAttribute("disable", false);
    }
})
// função para buscar os filmes
const getFilmes = async () => {
    let tbody = document.getElementById("tbody");
    let loading = document.getElementById("loading");
    let tr = "";
    loading.innerText = "Carregando...."
    const res = await database.from("filmes").select("*");
    // cria uma linha na tabela
    if(res){
        for(var i in res.data){
            tr += `<tr>
            <td>${parseInt(i) + 1}</td>
            <td>${res.data[i].titulo}</td>
            <td>${res.data[i].descricao}</td>
            <td>${res.data[i].genero}</td>
            <td class="text-center">${res.data[i].ano}</td>
            <td><button class="btn btn-primary" data-bs-toggle="modal" onclick='editFilme(${res.data[i].id})' data-bs-target="#editModel">Atualizar</button></td>
            <td><button onclick='deletarFilme(${res.data[i].id})' class="btn btn-danger">Deletar</button></td>
            </tr>`;
        }
        tbody.innerHTML = tr;
        loading.innerText = ""
    }
}
// chama a função que cria a tabela
getFilmes();

const getTotalFilmes= async()=>{
    let total = document.querySelector("#total");
    const res = await database.from("filmes").select("*",{count:"exact"});
    total.innerText = res.data.length;
}

getTotalFilmes();

// função para editar estudantes
const editFilme=async(id)=>{

    const res=await database.from("filmes").select("*").eq("id", id);
    if(res){
        document.querySelector("#id").value=res.data[0].id;
        document.querySelector("#edit-titulo").value=res.data[0].titulo;
        document.querySelector("#edit-descricao").value=res.data[0].descricao;
        document.querySelector("#edit-genero").value=res.data[0].genero;
        document.querySelector("#edit-ano").value=res.data[0].ano;
    }
}

const update = document.getElementById("atualizar");

update.addEventListener("click", async ()=>{
    let id = document.getElementById("id").value;
    let titulo = document.getElementById("edit-titulo").value;
    let descricao = document.getElementById("edit-descricao").value;
    let genero = document.getElementById("edit-genero").value;
    let ano = document.getElementById("edit-ano").value;
    update.innerText = "Atualizando...."
    // update.setAttribute("disabled", true);
    const res = await database.from("filmes").update({
        titulo,descricao,genero,ano
    }).eq("id", id)

    if(res){
        alert("Seu filme foi atualizado");
        update.innerText = "Atualizar";
        update.setAttribute("disable", false);
        titulo = "";
        descricao = "";
        genero = "";
        ano = "";
        getFilmes();
        getTotalFilmes();
    }else{
        alert("Não foi possível atualizar o filme");
        update.innerText = "Atualizado"
        update.setAttribute("disable", false);
    }
})

// função para deletar
const deletarFilme=async(id)=>{
    const res = await database.from("filmes").delete().eq("id", id)

    if(res){
        alert("Filme deletado")
        getFilmes();
        getTotalFilmes();
    }else{
        alert("Não foi possível deletar seu filme")
    }
}