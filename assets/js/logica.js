// json-server --watch db.json

//  variavel para usar fazer a condição de imprimir o filtro 
var displayFiltro = 0

//  variavel para usar na função removeTarefa
var excluir

//  variavel para usar na função validar login
var usuario

//  variavel para usar na condiçao para *campo obrigatorio
var campoObrigatorio = "red"

//  variaveis para usar cor na função de ordenação
var ordenação1 = "#1a1033"
var ordenação2 = "white"

//  função para deslogar
function deslogar() {
    var logar = document.getElementById('areaLogin');
    logar.style.display = "block"
    var cadastrar = document.getElementById('areaCadastro');
    cadastrar.style.display = "block"
    var tela = document.getElementById('fecharTela');
    tela.style.display = "block"
    sucesso = document.getElementById("bemVindo")
        sucesso.classList.remove("animate__fadeOut")
        sucesso.classList.remove("d-none")
    
}

//  função para abrir o modal de cadastro
function abrirCadastro() {
    var modal = document.getElementById('modalCadastro');
    modal.style.display = "block";

    //  Limpando os dados do formulario de cadastro
    document.getElementById("usuario").value = ""
    document.getElementById("cpf").value = ""
    document.getElementById("email").value = ""
    document.getElementById("senha").value = ""
    document.getElementById("repetirSenha").value = ""
    document.getElementById("checkbox").checked = ""

    document.getElementById("senhaNaoConfere").innerHTML = ""
    document.getElementById("senhaNaoConfere1").innerHTML = ""
    document.getElementById("requeridoUsuario").innerHTML = ""
    document.getElementById("requeridoCPF").innerHTML = ""
    document.getElementById("requeridoEmail").innerHTML = ""
    document.getElementById("requeridoSenha").innerHTML = ""
    document.getElementById("requeridoRepetirSenha").innerHTML = ""
    document.getElementById("requeridoCheckbox").innerHTML = ""

    sucesso = document.getElementById('conteudoModal')
    sucesso.classList.add("animate__slideInDown")
}

//  função para fechar o modal de cadastro
function fecharCadastro() {
    var modal = document.getElementById('modalCadastro');
    modal.style.display = "none"

    //  Limpando os dados do formulario de cadastro
    document.getElementById("usuario").value = ""
    document.getElementById("cpf").value = ""
    cdocument.getElementById("email").value = ""
    document.getElementById("senha").value = ""
    document.getElementById("repetirSenha").value = ""
   
    document.getElementById("senhaNaoConfere").innerHTML = ""
    document.getElementById("senhaNaoConfere1").innerHTML = ""
    document.getElementById("requeridoUsuario").innerHTML = ""
    document.getElementById("requeridoCPF").innerHTML = ""
    document.getElementById("requeridoEmail").innerHTML = ""
    document.getElementById("requeridoSenha").innerHTML = ""
    document.getElementById("requeridoRepetirSenha").innerHTML = ""
}

//  função para receber e salvar o cadastro
async function cadastro(x, y) {
    console.log(x,y)

    // recebendo os dados inseridos e imprimindo-os
    const login = document.getElementById("usuario").value;
    const cpf = document.getElementById("cpf").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const repetirSenha = document.getElementById("repetirSenha").value;
    const checkbox = document.getElementById("checkbox").checked;
    console.log(checkbox)

    // condição para validar senha de cadastro, comparando se as duas senhas digitadas são iguais
    var senhaValidada = ""
    if (senha != repetirSenha) {
        document.getElementById("senhaNaoConfere1").innerHTML = "**Senha não confere"
        document.getElementById("senhaNaoConfere1").style.color = "#fbb04d"
    } else {
        senhaValidada = senha
    }
    if (login === "") {
        document.getElementById("requeridoUsuario").innerHTML = "*Campo obrigatório"
        document.getElementById("requeridoUsuario").style.color = "#fbb04d"
        var modal = document.getElementById('modalCadastro');
        modal.style.display = "block";
    } else if (cpf === "") {
        document.getElementById("requeridoCPF").innerHTML = "*Campo obrigatório"
        document.getElementById("requeridoCPF").style.color = "#fbb04d"
        var modal = document.getElementById('modalCadastro');
        modal.style.display = "block";
    } else if (email === "") {
        document.getElementById("requeridoEmail").innerHTML = "*Campo obrigatório"
        document.getElementById("requeridoEmail").style.color = "#fbb04d"
        var modal = document.getElementById('modalCadastro');
        modal.style.display = "block";
    } else if (senha === "") {
        document.getElementById("requeridoSenha").innerHTML = "*Campo obrigatório"
        document.getElementById("requeridoSenha").style.color = "#fbb04d"
        var modal = document.getElementById('modalCadastro');
        modal.style.display = "block";
    } else if (repetirSenha === "") {
        document.getElementById("requeridoRepetirSenha").innerHTML = "*Campo obrigatório"
        document.getElementById("requeridoRepetirSenha").style.color = "#fbb04d"
        var modal = document.getElementById('modalCadastro');
        modal.style.display = "block";
    } if (checkbox === false) {
        document.getElementById("requeridoCheckbox").innerHTML = "*Campo obrigatório"
        document.getElementById("requeridoCheckbox").style.color = "#fbb04d"
        var modal = document.getElementById('modalCadastro');
        modal.style.display = "block";
    } else if (login && cpf && email && senha  && repetirSenha && senhaValidada != "" && checkbox == true ) {

        var respostaCadastro = await verificacao("users", `?login=${login}`)
        console.log(respostaCadastro)
        var respostaCadastro1 = await verificacao("users", `?email=${email}`)
        console.log(respostaCadastro)

        if(respostaCadastro.length > 0 ){
            document.getElementById("usuarioJaCadastrado").innerHTML = "Usuário já cadastrado"
            document.getElementById("usuarioJaCadastrado").style.color = "#fbb04d"
        } else if(respostaCadastro1.length > 0 ){
            document.getElementById("emailJaCadastrado").innerHTML = "Usuário já cadastrado"
            document.getElementById("emailJaCadastrado").style.color = "#fbb04d"
        } else {
            users = {
                login: login,
                cpf: parseInt(cpf),
                email: email,
                senha:btoa(senhaValidada) ,
            }
            await fetch(`http://54.209.253.104:8000/${x}`, {
                method: `${y}`,
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(users),
            });
            var modal = document.getElementById('modalCadastro');
            modal.style.display = "none";

            var modal = document.getElementById('modalCadastradoSucesso');
            modal.style.display = "block";
        }
}
}

//  função para usar jeito correto de numeros de CPF
function mascaraCPF(i){
   
    var v = i.value;
    
    if(isNaN(v[v.length-1])){ // impede entrar outro caractere que não seja número
       i.value = v.substring(0, v.length-1);
       return;
    }
    
    i.setAttribute("maxlength", "14");
    if (v.length == 3 || v.length == 7) i.value += ".";
    if (v.length == 11) i.value += "-";
 
 }

 //  função fechar o modal de cadastrado com sucesso
 function fecharCadastradoComSucesso() {
    var modal = document.getElementById('modalCadastradoSucesso');
            modal.style.display = "none";
}

 //  função para abrir o modal do login
function abrirLogin() {
    var modal = document.getElementById('modalCadastradoSucesso');
            modal.style.display = "none";
    var modal = document.getElementById('modalLogin');
    modal.style.display = "block";

    //  Limpando os dados do formulario de nova tarefa
    document.getElementById("usuarioLogin").value = ""
    document.getElementById("senhaLogin").value = ""


    sucesso = document.getElementById('conteudoModal')
    sucesso.classList.add("animate__slideInDown")
    // window.setTimeout(() => {
    //     sucesso.classList.remove("animate__rubberBand")
    // },1900)
    sucesso = document.getElementById('conteudoModal')
    sucesso.classList.add("animate__slideInDown")
    
}

 //  função para verificar senha e login
 async function verificacao(x, y) {
    let resposta = await fetch(`http://54.209.253.104:8000/${x}${y}`)
    let recebeResposta = await resposta.json()
    return recebeResposta
}

 //  função para validar login e senha
 async function validarLogin() {

    // recebendo os dados inseridos e imprimindo-os
    const login = document.getElementById("usuarioLogin").value;
    const senha = document.getElementById("senhaLogin").value;
    
    let resposta = await verificacao("users", `?login=${login}&senha=${btoa(senha)}`)
console.log(resposta)
    
    if( resposta.length > 0 ) {
        document.getElementById("bemVindo").innerHTML = `Seja bem-vindo(a):  ${resposta[0].login}`
        var modal = document.getElementById('modalLogin');
        modal.style.display = "none"
        document.getElementById("nomeUsuario").innerHTML = resposta[0].login
        var logar = document.getElementById('areaLogin');
        logar.style.display = "none"
        var cadastrar = document.getElementById('areaCadastro');
        cadastrar.style.display = "none"
        var tela = document.getElementById('fecharTela');
        tela.style.display = "none"
        document.getElementById("senhaInvalida").innerHTML = ""
    } else {
        document.getElementById("senhaInvalida").innerHTML = "Usuário ou senha inválidos"
        document.getElementById("senhaInvalida").style.color = "#fbb04d"
    }
    window.setTimeout(() => {
        sucesso = document.getElementById("bemVindo")
        sucesso.classList.add("animate__fadeOut")
        sucesso.classList.add("d-none")
    }, 4000)
    usuario = login
    printData(0)
}

 //  função para fechar modal login
 function fecharLogin() {
    var modal = document.getElementById('modalLogin');
    modal.style.display = "none"
    document.getElementById("senhaInvalida").innerHTML = ""
}

 //  função para abrir o modal do esqueci minha senha
function abrirEsqueciSenha() {
    var modal = document.getElementById('modalRedefinirSenha');
    modal.style.display = "block";
    var modal = document.getElementById('modalLogin');
    modal.style.display = "none";
    var modal = document.getElementById('emailRecuperacao1');
    modal.style.display = "block"
    var modal = document.getElementById('senhaRecuperacao1');
    modal.style.display = "none"
    var modal = document.getElementById('repetirSenhaRecuperacao1');
    modal.style.display = "none"

    //  Limpando os dados do formulario de nova tarefa
    document.getElementById("emailRecuperacao2").innerHTML = ""
    document.getElementById("emailRecuperacao").value = ""
    document.getElementById("senhaRecuperacao").value = ""
    document.getElementById("repetirSenhaRecuperacao").value = ""
    
    document.getElementById("recuperar").onclick = () => {
        recuperarSenha()
    }

    sucesso = document.getElementById('conteudoModal')
    sucesso.classList.add("animate__slideInDown")
    // window.setTimeout(() => {
    //     sucesso.classList.remove("animate__rubberBand")
    // },1900)
    
    
}

 //  função para fechar o modal de redefinir nova senha
 function fecharRedefinirSenha() {
    var modal = document.getElementById('modalRedefinirSenha');
    modal.style.display = "none";
}

 //  função para verificar e-mail para redefinir senha
async function recuperarSenha() {
    const emailRecuperacao = document.getElementById("emailRecuperacao").value;

    var resposta = await verificacao("users", `?email=${emailRecuperacao}`)
    console.log(resposta)

    if (emailRecuperacao === "") {
        document.getElementById("emailRecuperacao2").innerHTML = "**Digite seu e-mail cadastrado"
        document.getElementById("emailRecuperacao2").style.color = "#fbb04d"
        var modal = document.getElementById('emailRecuperacao1');
        modal.style.display = "block";
    } else  if( resposta.length === 0) {
        document.getElementById("emailRecuperacao2").innerHTML = "**E-mail não cadastrado"
        document.getElementById("emailRecuperacao2").style.color = "#fbb04d"
    } else {
        var modal = document.getElementById('emailRecuperacao1');
        modal.style.display = "none"
        var modal = document.getElementById('senhaRecuperacao1');
        modal.style.display = "block"
        var modal = document.getElementById('repetirSenhaRecuperacao1');
        modal.style.display = "block"
        document.getElementById("recuperar").onclick = () => {
            redefinirSenha(resposta[0])
        }
    }  
}

 //  função para redefinir a nova senha
async function redefinirSenha (x) {
    const senhaRecuperacao = document.getElementById("senhaRecuperacao").value;
    const repetirSenhaRecuperacao = document.getElementById("repetirSenhaRecuperacao").value;

    var senhaValidada = ""
    console.log(senhaRecuperacao, repetirSenhaRecuperacao)
    if (senhaRecuperacao === "") {
        document.getElementById("requeridoSenhaRecuperacao").innerHTML = "**Digite nova senha"
        document.getElementById("requeridoSenhaRecuperacao").style.color = "#fbb04d"
    } else
    if (senhaRecuperacao != repetirSenhaRecuperacao) {
        document.getElementById("requeridoSenhaRecuperar").innerHTML = "**Senha não confere"
        document.getElementById("requeridoSenhaRecuperar").style.color = "#fbb04d"
    } else {
        senhaValidada = senhaRecuperacao
        console.log(senhaValidada)
     

    console.log(x.login)

    const login = x.login;
    const cpf = x.cpf;
    const email = x.email;
    const senha = senhaValidada;
   users = {
        login: login,
        cpf: parseInt(cpf),
        email: email,
        senha:btoa(senha) ,
    }
    console.log(x)
    console.log(login)
    console.log(cpf)
    console.log(email)
    console.log(senha)
    console.log(senhaValidada)

    await fetch(`http://54.209.253.104:8000/users/${x.id}`, {
        method: `PUT`,
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(users),
    });
    var modal = document.getElementById('modalRedefinirSenha');
    modal.style.display = "none";
}
}

//  função para abrir o modal de nova tarefa
function adicionarTarefa() {
    var modal = document.getElementById('modal');
    modal.style.display = "block";

    //  Limpando os dados do formulario de nova tarefa
    document.getElementById("adicionar").innerHTML = "Adicionar nova tarefa"
    document.getElementById("num1").value = ""
    document.getElementById("descreve").value = ""
    document.getElementById("data").value = ""
    document.getElementById("selecao").value = ""

    document.getElementById("requerido1").style.display = "none"
    document.getElementById("requerido2").style.display = "none"
    document.getElementById("requerido3").style.display = "none"
    document.getElementById("requerido4").style.display = "none"

    sucesso = document.getElementById('conteudoModal')
    sucesso.classList.add("animate__slideInDown")
    // window.setTimeout(() => {
    //     sucesso.classList.remove("animate__rubberBand")
    // },1900)
    document.getElementById("salvar").onclick = () => {
        salva("novaTarefa", "POST")
    }
}

//  função para fechar o modal de nova tarefa
function fecharModalNovaTarefa() {

    sucesso = document.getElementById('conteudoModal')
    sucesso.classList.remove("animate__zoomIn")
    erroNoCadastro()
    var modal = document.getElementById('modal');
    modal.style.display = "none"
}

//  função para salvar os dados inseridos de (nova tarefa) e (editar tarefa) enviar para API
async function salva(x, y) {

    // assim que os dados são salvos a função "salva" fecha a aba nova tarefa

    // recebendo os dados inseridos e imprimindo-os
    const number = document.getElementById("num1").value;
    const descreve = document.getElementById("descreve").value;
    const dia = document.getElementById("data").value;
    const statu = document.getElementById("selecao").value;
     
    //  condição para criar campos obrigatórios e somente salvar se ela se cumprir
    if (number === "" ) {
        document.getElementById("requerido1").innerHTML = "*Campo obrigatório"
        document.getElementById("requerido1").style.color = campoObrigatorio
        document.getElementById("requerido1").style.display = "block"
        var modal = document.getElementById('modal');
        modal.style.display = "block"
    } else if (descreve === "") {
        document.getElementById("requerido2").innerHTML = "*Campo obrigatório"
        document.getElementById("requerido2").style.color = campoObrigatorio
        document.getElementById("requerido2").style.display = "block"
        var modal = document.getElementById('modal');
        modal.style.display = "block"
    } else if (dia === "") {
        document.getElementById("requerido3").innerHTML = "*Campo obrigatório"
        document.getElementById("requerido3").style.color = campoObrigatorio
        document.getElementById("requerido3").style.display = "block"
        var modal = document.getElementById('modal');
        modal.style.display = "block"
    } else if (statu === "") {
        document.getElementById("requerido4").innerHTML = "*Campo obrigatório"
        document.getElementById("requerido4").style.color = campoObrigatorio
        document.getElementById("requerido4").style.display = "block"
        var modal = document.getElementById('modal');
        modal.style.display = "block"
    } else if (number && descreve && dia && statu != "") {
        
        // criando o objeto da minha API   
        novaTarefa = {
            usuario: usuario,
            numero: parseInt(number),
            descri: descreve,
            data: dia,
            stat: statu,
        }
        // enviando os dados para a API
        await fetch(`http://54.209.253.104:8000/${x}`, {
            method: `${y}`,
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(novaTarefa),
        });
        console.log("teste")
        await printData(0, usuario)
        cadastradoComSucesso()
        console.log("teste")
    }
}

//  função para abrir o modal de filtro
function abrirFiltro() {
    var modalFiltro = document.getElementById('modalFiltrar');
    modalFiltro.style.display = "block";
    displayFiltro = 1
}

//  função para fechar o modal de filtro
function fecharFilter() {
    var modalFiltro = document.getElementById('modalFiltrar');
    modalFiltro.style.display = "none"
    displayFiltro = 0
}

//  função para abrir e editar os dados
async function editarTarefa(idTarefa) {
    var modal = document.getElementById('modal');
    modal.style.display = "block";
    document.getElementById("adicionar").innerHTML = "Editar tarefa"
    document.getElementById("requerido1").style.display = "none"
    document.getElementById("requerido2").style.display = "none"
    document.getElementById("requerido3").style.display = "none"
    document.getElementById("requerido4").style.display = "none"
    
    var resposta = await fetch(`http://54.209.253.104:8000/novaTarefa/${idTarefa}`)
    var recebeTarefas = await resposta.json()
    console.log(recebeTarefas)
    // lendo as informações nos inputs
    
    document.getElementById("num1").value = recebeTarefas.numero
    document.getElementById("descreve").value = recebeTarefas.descri;
    document.getElementById("data").value = recebeTarefas.data;
    document.getElementById("selecao").value = recebeTarefas.stat;
    // função para mudar o onclick do botao salvar (para salvar a edição e não adicionar nova tarefa)
    document.getElementById("salvar").onclick = () => {
        salva(`novaTarefa/${idTarefa}`, "PUT")
    }
}

//  função para abrir o modal de (tem certeza que deseja excluir)
function excluirTarefa(x) {
    var modal = document.getElementById('modalExclusao');
    modal.style.display = "block";
    excluir = x
    console.log(excluir)
}

//  função para excluir a tarefa
async function removeTarefa() {

    await fetch(`http://54.209.253.104:8000/novaTarefa/${excluir}`, {
        method: "DELETE",
        headers: {
            "content-type": "application/json",
        },
    });
    await printData(`novaTarefa/${excluir}`, "DELETE")
    removendoTarefa()
    var modal = document.getElementById('modalExclusao');
    modal.style.display = "none";
}

//  função para fechar o modal sem excluir a tarefa
function naoExcluirTarefa() {
    var modal = document.getElementById('modalExclusao');
    modal.style.display = "none";
}

//  função para imprimir quantas tarefas tem cadastradas
function contador(){
    printData(0)
}

// função para mudar para tema escuro
function contrasteLight() {
    ordenação2 = "#1a1033"
    ordenação1 = "white"
    campoObrigatorio = "#fbb04d"
    document.getElementById('novaFolha').setAttribute("href", "assets/styles/estilo2.css")
    var light = document.getElementById('light');
    light.style.display = "none";
    var dark = document.getElementById('dark');
    dark.style.display = "block";
    var logo = document.getElementById('logoColorido');
    logo.style.display = "none";
    var logo1 = document.getElementById('logoBranca');
    logo1.style.display = "block";
    printData('numero','asc')
}

// função para mudar para tema claro
function contrasteDark() {
    ordenação2 = "white"
    ordenação1 = "#2C2661"
    campoObrigatorio = "red"
    document.getElementById('novaFolha').setAttribute("href", "assets/styles/estilo.css")
    var light = document.getElementById('light');
    light.style.display = "block";
    var dark = document.getElementById('dark');
    dark.style.display = "none";
    var logo = document.getElementById('logoColorido');
    logo.style.display = "block";
    var logo1 = document.getElementById('logoBranca');
    logo1.style.display = "none";
    printData('numero','desc')
}

//  função para imprimir o que é pedido
async function printData(x, y) {
    console.log(x, y)

    //  variavel para definir a cor do status 
    var corStatus = ""

    // variavel para receber a linha de tarefas
    var linha = ""

    // condição para saber se é comando de filtro 
        if (displayFiltro === 1) {
        console.log(displayFiltro)
        var palavraChave = ""
        var palavraData = ""
        var statu = ""
        palavraChave = document.getElementById("palavraFiltro").value;
        palavraData = document.getElementById("dataFiltro").value;
        statu = document.getElementById("statusFilter").value;

        // condição para saber se é comando de filtro por palavra
        if (palavraChave != "") {
            var resposta = await fetch(`http://54.209.253.104:8000/novaTarefa?q=${palavraChave}&usuario=${usuario}`)
            var recebeTarefas = await resposta.json()
            palavraChave = document.getElementById("palavraFiltro").value = ""
            console.log(palavraChave)
        }

        // condição para saber se é comando de filtro por data
        if (palavraData != "") {
            var resposta = await fetch(`http://54.209.253.104:8000/novaTarefa?q=${palavraData}&usuario=${usuario}`)
            var recebeTarefas = await resposta.json()
            document.getElementById("dataFiltro").value = ""
            console.log(palavraData)
        }

        // condição para saber se é comando de filtro por status
        if (statu != "") {
            var resposta = await fetch(`http://54.209.253.104:8000/novaTarefa?q=${statu}&usuario=${usuario}`)
            var recebeTarefas = await resposta.json()
            document.getElementById("statusFilter").value = ""
            console.log(statu)
            console.log(recebeTarefas)
        }
    }

    // condição para saber se é ordenação
    if (x != undefined && y != undefined) {
        var resposta = await fetch(`http://54.209.253.104:8000/novaTarefa?_sort=${x}&_order=${y}&usuario=${usuario}`)
        var recebeTarefas = await resposta.json()
        if (y == "asc") {
            var seta1 = document.getElementById('setaUp1');
            seta1.style.color = ordenação2;
            var seta2 = document.getElementById('setaDown1');
            seta2.style.color = ordenação1;
            var seta3 = document.getElementById('setaUp2');
            seta3.style.color = ordenação2;
            var seta4 = document.getElementById('setaDown2');
            seta4.style.color = ordenação1;
            var seta5 = document.getElementById('setaUp3');
            seta5.style.color = ordenação2;
            var seta6 = document.getElementById('setaDown3');
            seta6.style.color = ordenação1;
            var seta7 = document.getElementById('setaUp4');
            seta7.style.color = ordenação2;
            var seta8 = document.getElementById('setaDown4');
            seta8.style.color = ordenação1;
        }
        if (y == "desc") {
            var seta1 = document.getElementById('setaUp1');
            seta1.style.color = ordenação1;
            var seta2 = document.getElementById('setaDown1');
            seta2.style.color = ordenação2;
            var seta3 = document.getElementById('setaUp2');
            seta3.style.color = ordenação1;
            var seta4 = document.getElementById('setaDown2');
            seta4.style.color = ordenação2;
            var seta5 = document.getElementById('setaUp3');
            seta5.style.color = ordenação1;
            var seta6 = document.getElementById('setaDown3');
            seta6.style.color = ordenação2;
            var seta7 = document.getElementById('setaUp4');
            seta7.style.color = ordenação1;
            var seta8 = document.getElementById('setaDown4');
            seta8.style.color = ordenação2;
        }
    }

    // condição para saber se é impressão de adição e edição
    if (x === 0) {
        console.log(x)
        var resposta = await fetch(`http://54.209.253.104:8000/novaTarefa/?usuario=${usuario}`)
        var recebeTarefas = await resposta.json()
    }

    console.log(recebeTarefas)

    // variavel para contar quantas tarefas estão sendo imprimidas
    var i = 0

    // função para correr todas as tarefas a serem impressas
    recebeTarefas.forEach((novaTarefa) => {
        i++
        // condição para definir a cor dos status
        if (novaTarefa.stat == "Concluído") {
            corStatus = "green"
        } else if (novaTarefa.stat == "Em andamento") {
            corStatus = "orange"
        } else {
            corStatus = "red"
        }

        // variavel recebendo a linha de código a ser impressa no HTML (linha de codigo a ser impressa no index)
        linha = linha + `  
    <tr id="linha${novaTarefa.id}">
        <td id="n${novaTarefa.id}">${novaTarefa.numero}</td>
        <td id="descricao${novaTarefa.id}" class="descri">${novaTarefa.descri}</td>
        <td id="data${novaTarefa.id}" class="datas">${novaTarefa.data.split('-').reverse().join('/')}</td>
        <td id="status${novaTarefa.id}" class="${corStatus}"><span class="cores">${novaTarefa.stat}</span></td>
        <td><i id="edicao${novaTarefa.id}" class="iconeEdicao fa-solid fa-pen-to-square" onclick="editarTarefa('${novaTarefa.id}');"></i>  
        <i id="remove${novaTarefa.id}" class="iconeRemove fa-solid fa-trash-can ms-1" onclick="excluirTarefa('${novaTarefa.id}');"></i></td>
    </tr>
        `
    })
    
    
    modal.style.display = "none"
    document.getElementById("tarefas").innerHTML = linha

    // condição para saber se a tarefa é singular ou plural
    if (i == 1){
    document.getElementById("contador").innerHTML = i + " tarefa encontrada"
    } else {
      document.getElementById("contador").innerHTML = i + " tarefas encontradas"
    }
}

//  função para alerta de nenhuma tarefa cadastrada
function erroNoCadastro() {
    var sucesso
    sucesso = document.getElementById("alerta-erro")
    sucesso.innerHTML = 'Sem Alterações.'
    sucesso.classList.add("animate__fadeInUp")
    sucesso.classList.remove("d-none")


    window.setTimeout(() => {
        sucesso.classList.remove("animate__fadeInUp")
        sucesso.classList.add("animate__fadeOutDown")
    }, 1000)

    window.setTimeout(() => {
        sucesso.classList.remove("animate__fadeOutDown")
        sucesso.classList.add("d-none")
    }, 1500)
}

//  função para alerta de tarefa removida
function tarefaRemovida() {
    var sucesso
    sucesso = document.getElementById("alerta-remove")
    sucesso.innerHTML = 'Tarefa removida.'
    sucesso.classList.add("animate__fadeInUp")
    sucesso.classList.remove("d-none")


    window.setTimeout(() => {
        sucesso.classList.remove("animate__fadeInUp")
        sucesso.classList.add("animate__fadeOutDown")
    }, 1000)

    window.setTimeout(() => {
        sucesso.classList.remove("animate__fadeOutDown")
        sucesso.classList.add("d-none")
    }, 1500)
}

//  função para alerta de sucesso na edição do cadastro
function edicaoConcluida() {
    sucesso = document.getElementById("alerta-edicao")
    sucesso.innerHTML = 'Edição concluída.'
    sucesso.classList.add("animate__fadeInUp")
    sucesso.classList.remove("d-none")


    window.setTimeout(() => {
        sucesso.classList.remove("animate__fadeInUp")
        sucesso.classList.add("animate__fadeOutDown")
    }, 1000)

    window.setTimeout(() => {
        sucesso.classList.remove("animate__fadeOutDown")
        sucesso.classList.add("d-none")
    }, 1500)
}

//  função para alerta de sucesso no cadastro
function cadastradoComSucesso() {
    var sucesso
    sucesso = document.getElementById("alerta-sucesso")
    sucesso.innerHTML = 'Comando executado.'
    sucesso.classList.add("animate__fadeInUp")
    sucesso.classList.remove("d-none")

    window.setTimeout(() => {
        sucesso.classList.remove("animate__fadeInUp")
        sucesso.classList.add("animate__fadeOutDown")
    }, 1000)

    window.setTimeout(() => {
        sucesso.classList.remove("animate__fadeOutDown")
        sucesso.classList.add("d-none")
    }, 1500)
}


