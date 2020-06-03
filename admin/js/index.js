// const jwt = require('jsonwebtoken')
let URL
let userName = ''
let { token } = ''
let termo_clicado
let form_termo

function autenticar(event) {
    event.preventDefault()

    URL = window.location.href + 'autenticar_usuario'
    let formulario = document.forms['form_autenticacao']

    let usuario = {
        nome: formulario.login.value,
        senha: formulario.senha.value
    };

    iniciarPreloader()

    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(usuario)
    }).then(response => {
        
        if (response.ok) {
            return response.json()
                .then(data => {
                    alert('Usuário ' + usuario.nome + ' Autenticado com sucesso!')
                    userName = usuario.nome
                    token = data.token
                    fetch('./admin.html')
                        .then(response => {
                            return response.text()
                        }).then(data => {
                            document.querySelector('#app').innerHTML = data
                            document.querySelector('#app').addEventListener('load', listarTermos())
                            // ativando collapse no document
                            $(function () {
                                $('.collapsible').collapsible()
                            })
                            preencherRedatorEData()
                        })
                })
        }
        alert('Falha no login, tente novamente.')
    })
}


function listarTermos() {

    // pegando lista de termos da rota
    URL = 'termos'
    let listaDeTermos

    fetch(URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'x-access-token': token
        }
    }).then(response => {
        return response.json()
    }).then(data => {
        document.querySelector('#total-de-termos').innerHTML = 'Total de termos: ' + ' <strong>' + data.length + '</strong>'
        listaDeTermos = data

        //dinâmicamente criando os elementos, adicionando conteúdo de cada termo e inserindo na página
        let UL = document.querySelector('#lista-termos')
        for (let index = 0; index < listaDeTermos.length; index++) {
            const termo = listaDeTermos[index];

            let LI = document.createElement('LI')
            let DIV = document.createElement('DIV')
            let DIVBTN = document.createElement('DIV')
            let SPAN = document.createElement('SPAN')
            let BTN = document.createElement('BUTTON')
            let I = document.createElement('I')

            DIV.classList = 'card-panel teal valign-wrapper'
            DIV.id = termo.id //cada card terá o id do termo, para facilitar o delete posteriormente
            SPAN.classList = 'white-text col s6 m6 l6 left-align btn'
            SPAN.textContent = termo.entrada
            DIVBTN.classList = 'col s6 m6 l6 right-align'
            BTN.classList = 'waves-effect btn-small red darken-1'
            I.classList = 'material-icons'
            I.textContent = 'delete_sweep'

            // evento de clique do usuário
            SPAN.addEventListener('click', function () {
                preencherCampos(this)

            })
            BTN.addEventListener('click', function () {
                deletarTermo(this)
            })

            BTN.appendChild(I)
            DIVBTN.appendChild(BTN)
            DIV.appendChild(SPAN)
            DIV.appendChild(DIVBTN)
            LI.appendChild(DIV)
            UL.appendChild(LI)
        }

    })


}

function armazenarTermo() {

    let confirmacao = confirm('Confirmar cadastro do termo?')
    if (confirmacao) {
    event.preventDefault()
    
    // verificando se os campos obrigatórios não estão nulos
    form_termo = document.forms['form_termo']
    if (form_termo.entrada.value == '' || form_termo.genero.value == '' || form_termo.categoria_gramatical.value == '') {
        alert('Verifique se os campos obrigatórios foram preenchidos')
    } else {
        iniciarPreloader()
        URL = window.location.href + 'novo_termo'

        let termo = {
            area: form_termo.area.value,
            entrada: form_termo.entrada.value,
            termo_ingles: form_termo.termo_ingles.value,
            termo_italiano: form_termo.termo_italiano.value,
            categoria_gramatical: form_termo.categoria_gramatical.value,
            definicao: form_termo.definicao.value,
            fonte_da_definicao: form_termo.fonte_da_definicao.value,
            contexto_de_uso: form_termo.contexto_de_uso.value,
            fonte_do_contexto_de_uso: form_termo.fonte_do_contexto_de_uso.value,
            genero: form_termo.genero.value,
            nota: form_termo.nota.value,
            redator: userName,
            remissiva: form_termo.remissiva.value,
            variantes: form_termo.variantes.value,
            data_de_registro: pegarDataAtual()
        }

        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'x-access-token': token
            },
            body: JSON.stringify(termo)
        }).then(response => {
            if (response.ok) {
                
                alert('Termo armazenado com sucesso!')
                // removendo todos os elementos termos e listando novamente
                let node = document.querySelector('#lista-termos')
                node.querySelectorAll('*').forEach(n => n.remove())
                listarTermos()
                
                // limpando termo clicado e o form
                termo_clicado = ''
                form_termo.reset()
                
                // voltar a topo
                document.documentElement.scrollTop = 0
                finalizarPreloader()

            } else {
                alert('Erro: termo já cadastrado!')
                finalizarPreloader()
                return response.json()
            }
        })

    }
    
    } else {
        alert('Operação cancelada.')
    }

}

function preencherCampos(elemento) {
    termo_clicado = elemento.textContent
    URL = window.location.href + 'termos/' + termo_clicado
    fetch(URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'x-access-token': token
        }
    }).then(response => {
        return response.json()
    }).then(data => {
        let termo_buscado = data[0]
        form_termo = document.forms['form_termo']

        form_termo.area.value = termo_buscado.area
        form_termo.entrada.value = termo_buscado.entrada
        form_termo.termo_ingles.value = termo_buscado.termo_ingles
        form_termo.termo_italiano.value = termo_buscado.termo_italiano
        form_termo.categoria_gramatical.value = termo_buscado.categoria_gramatical
        form_termo.fonte_da_definicao.value = termo_buscado.fonte_da_definicao
        form_termo.contexto_de_uso.value = termo_buscado.contexto_de_uso
        form_termo.fonte_do_contexto_de_uso.value = termo_buscado.fonte_do_contexto_de_uso
        form_termo.genero.value = termo_buscado.genero
        form_termo.nota.value = termo_buscado.nota
        form_termo.redator.value = termo_buscado.redator
        form_termo.remissiva.value = termo_buscado.remissiva
        form_termo.variantes.value = termo_buscado.variantes
        form_termo.definicao.value = termo_buscado.definicao
        form_termo.nota.value = termo_buscado.nota
        // formatando a data para mostrar apenas dia/mes/ano
        let dataHoje = termo_buscado.createdAt
        dataHoje = dataHoje.substring(0, 10)
        form_termo.data_de_registro.value = dataHoje


        // simulação de clique em todos os inputs
        let labels = form_termo.getElementsByTagName('label')
        for (let index = 0; index < labels.length; index++) {
            const label = labels[index]
            label.classList.add('active')
        }

        // trocar métodos do botão 'salvar', de 'armazenar para atualizar
        document.querySelector('#btn-salvar').onclick = atualizarTermo

        // adicionar efeito de zoom em cada campo
        // document.querySelector('#form-termo').style.transform = 'scale(2.0);'
        // document.querySelector('#form-termo').style.transform = 'scale(1.0);'

    })
}

function atualizarTermo() {

    let confirmacao = confirm('Confirmar atualização do termo?')
    if (confirmacao) {
    event.preventDefault()
    
    form_termo = document.forms['form_termo']
    if (form_termo.entrada.value == '' || form_termo.genero.value == '' || form_termo.categoria_gramatical.value == '') {
        alert('Campos obrigatórios não preenchidos!')
    } else {
        
        // Pegando os novos valores dos campos e guardando em um objeto
        termo_atualizado = {
            area: form_termo.area.value,
            entrada: form_termo.entrada.value,
            termo_ingles:form_termo.termo_ingles.value,
            termo_italiano:form_termo.termo_italiano.value,
            categoria_gramatical: form_termo.categoria_gramatical.value,
            definicao: form_termo.definicao.value,
            fonte_da_definicao: form_termo.fonte_da_definicao.value,
            contexto_de_uso: form_termo.contexto_de_uso.value,
            fonte_do_contexto_de_uso: form_termo.fonte_do_contexto_de_uso.value,
            genero: form_termo.genero.value,
            nota: form_termo.nota.value,
            redator: form_termo.redator.value,
            remissiva: form_termo.remissiva.value,
            variantes: form_termo.variantes.value,
            data_de_registro: form_termo.data_de_registro.value
        }
        URL = window.location.href + 'termos/' + termo_clicado
        iniciarPreloader()
        fetch(URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'x-access-token': token
            }
        }).then(response => {
            return response.json()
        }).then(data => {
            // pegando o id do termo clicado
            const { id } = data[0]

            URL = window.location.href + 'termos/atualizar/' + id
            fetch(URL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'x-access-token': token
                },
                body: JSON.stringify(termo_atualizado)

            }).then(response => {
                if (response.ok) {
                    alert('Termo atualizado com sucesso!')

                    // removendo todos os elementos termos e listando novamente
                    let node = document.querySelector('#lista-termos')
                    node.querySelectorAll('*').forEach(n => n.remove())
                    listarTermos()

                    // limpando termo clicado e o form
                    termo_clicado = ''
                    form_termo.reset()

                    // trocar métodos do botão 'salvar', de 'atualizar' para 'armazenar'
                    document.querySelector('#btn-salvar').onclick = armazenarTermo

                    preencherRedatorEData()

                    // voltar a topo
                    document.documentElement.scrollTop = 0
                    finalizarPreloader()
                } else {
                    alert('Erro: termo já existe!')
                }
            })
        })
    }

    } else {
        alert('Operação cancelada.')
    }

}

function deletarTermo(elemento) {

    let confirmarExclusao = confirm("Deseja realmente deletar o termo?");
    if (confirmarExclusao) {


        let id_termo = elemento.parentNode.parentNode.id

        //  // deletando o termo do banco      
        URL = window.location.href + 'termos/deletar/' + id_termo
        fetch(URL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'x-access-token': token
            }
        }).then(response => {
            if (response.ok) {
                alert('Termo deletado com sucesso!')
                // removendo todos os elementos termos e listando novamente
                let node = document.querySelector('#lista-termos')
                node.querySelectorAll('*').forEach(n => n.remove())
                listarTermos()
            }
            else {
                alert('Falha ao atualizar, tente novamente.')
            }
        })

    } else {
        alert('Operação cancelada.');
    }
}

function limparCampos() {
   // limpar campos do formulário, menos data de registro e redator
    form_termo = document.forms['form_termo']
    form_termo.area.value = '',
        form_termo.entrada.value = '',
        form_termo.termo_ingles.value = '',
        form_termo.termo_italiano.value = '',
        form_termo.categoria_gramatical.value = '',
        form_termo.definicao.value = '',
        form_termo.fonte_da_definicao.value = '',
        form_termo.contexto_de_uso.value = '',
        form_termo.fonte_do_contexto_de_uso.value = '',
        form_termo.genero.value = '',
        form_termo.nota.value = '',
    form_termo.remissiva.value = '',
        form_termo.variantes.value = '',
        
        // limpando termo clicado e o form
                    termo_clicado = ''
                    form_termo.reset()
        // trocar métodos do botão 'salvar', de 'atualizar' para 'armazenar'
        document.querySelector('#btn-salvar').onclick = armazenarTermo
}


function pegarDataAtual() {
    var dataHoje = new Date()
    return dataAgora = (dataHoje.getDate() + '/' + (dataHoje.getMonth() + 1)) + '/' + dataHoje.getFullYear()
    console.log(dataAgora)
    
}

function preencherRedatorEData() {
    //colocando userName no campo de redator 
    document.forms['form_termo'].redator.value = userName
    //preenchendo o campo 'data de registro' com a data de hoje
    document.forms['form_termo'].data_de_registro.value = pegarDataAtual()
}

function iniciarPreloader() {
    // mostrando preloader no lugar do botão
    document.querySelector('#preloader').style.display = 'block'
    document.querySelector('#btn-salvar').style.display = 'none'
}


function finalizarPreloader() {
    // mostrando botão no lugar do preloader
    document.querySelector('#preloader').style.display = 'none'
    document.querySelector('#btn-salvar').style.display = 'block'
}


