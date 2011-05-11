/**
 * Scripts de uso geral na aplicação.
 */


/**
 * @param caractere
 * @return se o caractere informado é ou não número.
 */
function eTeclaNumero(tecla){
	return (tecla >= 48 && tecla <= 57);
}

function eInternetExplorer(documento){
	return documento.all;
}

/**
 * Mascára um campo da página HTML.
 * 
 * @param campo é o campo que será mascarado.
 * @param mask é a máscara do campo.
 * @param evt é o objeto evento.
 */
function mascarar(documento, campo, mask, evt){
	var key;
	if(eInternetExplorer(documento)){
		//Internet Explorer
		key = evt.keyCode;
	}else{
		//Nestcape
		key = evt.which;
	}
	
	//Backspace
	if(key==8){
		return true;
	}
	
	var string = campo.value;
	var i = string.length;

	if(i<mask.length){
		if(mask.charAt(i) == '?'){
			return (eTeclaNumero(key));//Números.
		}else{
			if(mask.charAt(i)=='!'){//Qualquer letra.
				return true;
			}
			var c = i;//Contador "c"
			for(; c < mask.length; c++){
				if(mask.charAt(c)!='?'&&mask.charAt(c)!='!'){
					//Insere um caractere definido na máscara.
					campo.value = campo.value + mask.charAt(c);
				}else if(mask.charAt(c)=='!'){//Se for qualquer caractere qualquer na máscara...
					return true;
				}else{//Nesse caso a máscara espera um número.
					return (eTeclaNumero(key));
				}
			}
			
			return false;//Por enquanto.
			
		}
	}else
		return false;
}//Fim da função de mascara.

/**
 * Testa se a string é vazia. Antes é feito o trim da string.
 * @param str é a string a ser testada.
 * @return se a string é vazia ou não.
 */
function testeStringVazia(str){
	if(str/*.trim()*/==""){
		return true;
	}
	return false;
}

/**
 *  Se não for válido então exibe uma mensagem e o foco da edição vai para o
 * campo se focarNaoValido for true.
 * 
 * @return true se o campo de texto foi validado com sucesso e
 *  false caso contrário.
 */
function validaCampoComMensagem(campo, msg, invalido, focarNaoValido){
	if(invalido){
		if(focarNaoValido){
			campo.focus();
		}
		alert(msg);
		return false;
	}
	return true;
}

/**
 *  Valida o conteúdo interno de um campo (atributo innerHTML) de um campo de um
 * formulário, através de seu atributo value.
 *  Se ele for vazio ou tiver apenas espaços em branco então será exibida uma 
 * mensagem 'msg', esse campo se tornará o foco da edição e a função retornará
 * false.
 *  Se não for vazio então será retornado true.
 * 
 * @return true se o campo de texto foi validado com sucesso e
 *  false caso contrário.
 */
function validaConteudoCampo(campo, msg, focarNaoValido){
	return validaCampoComMensagem(campo, msg, testeStringVazia(campo.innerHTML), focarNaoValido);
}

function validaConteudoHtmlArea(editor, msg){
	if(testeStringVazia(editor.getHTML())){
		editor.focusEditor();
		alert(msg);
		return false;
	}
	return true;
}

/**
 *  Valida o campo de um formulario, através de seu atributo value.
 *  Se ele for vazio ou tiver apenas espaços em branco então será exibida uma 
 * mensagem 'msg', esse campo se tornará o foco da edição e a função retornará
 * false.
 *  Se não for vazio então será retornado true.
 * 
 * @return true se o campo de texto foi validado com sucesso e
 *  false caso contrário.
 */
function validaCampoTexto(campo, msg){
	return validaCampoComMensagem(campo, msg, testeStringVazia(campo.value), true);
}

/**
 * @param caractere
 * @return se o caractere informado é ou não número.
 */
function eNumero(caractere){
	return caractere in ['0','1','2','3','4','5','6','7','8','9','10'];
}

/** 
 * @param data é a data que deve estar no formato dd/mm/aaaa.
 * @return se o formato da data obedece a dd/mm/aaaa ou não.
 */
function padraoData(data){
	if(data.length!=10)
		return false;
	if(eNumero(data.charAt(0))&&
	   eNumero(data.charAt(1))&&
	   data.charAt(2)=='/'    &&
	   eNumero(data.charAt(3))&&
	   eNumero(data.charAt(4))&&
	   data.charAt(5)=='/'    &&
	   eNumero(data.charAt(6))&&
	   eNumero(data.charAt(7))&&
	   eNumero(data.charAt(8))&&
	   eNumero(data.charAt(9)))
		return true;
	return false;
}

/**
 *  Pega uma string de data no formato dd/mm/aaaa e retorna um array com o
 * índice 0 sendo o dia, o índice 1 o mês e o índice 2 sendo o ano.
 * @param data string no formato dd/mm/aaaa
 * @return um array com o índice 0 sendo o dia, o índice 1 o mês e o índice 2
 * sendo o ano.
 */
function arrayData(data){
	var dia = eval(data.substr(0,2));//dd
	var mes = eval(data.substr(3,2)+"-1");//mm - o valor do mês é diminuído de 1.
	var ano = eval(data.substr(6,4));//aaaa
}

/**
 * @param data é a data que será verificada se é ou não final de semana.
 * A data terá que estar no formato dd/mm/aaaa.
 * @return se a data passada é ou não final de semana.
 */
function diaSemana(data){
	//A data deve estar no seguinte formato dd/mm/aaaa
	if(!padraoData(data))
		return false;
	
	var dia = eval(data.substr(0,2));//dd
	var mes = eval(data.substr(3,2)+"-1");//mm - o valor do mês é diminuido de 1.
	var ano = eval(data.substr(6,4));//aaaa
	
	/*str = "x";
	t = str.length;
	t = t+1;*/
	//t = mes.valueOf();
	
	objData = new Date(ano, mes, dia);
	
	diaSem = objData.getDay();
	return diaSem;
}

function dataMenor(dataInicial, dataFinal){
	
}

/**
 * Remove todos as tags de uma tag especifica, identificada pela id idTagPai.
 * @param documento é o documento que contém a tag de id idTagPai.
 * @param idTagPai id da tag que contém outras tags.
 */
function removeFilhosTag(documento, idTagPai){
	var tagPai = documento.getElementById(idTagPai);
	var cont = 0;
	while(tagPai.hasChildNodes()){
		var primeiroFilho = tagPai.firstChild;
		tagPai.removeChild(primeiroFilho);
		cont++;
	}
}

/**
 * Copia o valor de um campo para o outro.
 * @param documento é a página que contém os id's.
 * @param idCampoRecebe id do campo que receberá o valor.
 * @param idCampoTransfere id do campo que transferirá o valor.
 */
function copiarValorCampo(documento, idCampoRecebe, idCampoTransfere){
	var campoRecebe = documento.getElementById(idCampoRecebe);
	var campoTransfere = documento.getElementById(idCampoTransfere);
	campoRecebe.value = campoTransfere.value;
}

/**
 * Atribui o parâmetro valor no campo value do objeto (tag) passado.
 * @param documento é a página que contém os id's.
 * @param idCampoRecebe id do campo que receberá o valor.
 * @param valor é o valor que será atribuído.
 */
function atribuirValorCampo(documento, idCampoRecebe, valorCampo){
	var campoRecebe = documento.getElementById(idCampoRecebe);
	campoRecebe.value = valorCampo;
}

function confirmaLogout(){
	var resposta = confirm("Você deseja realmente sair?");
	if(!resposta)
		return false;
	return true;
}

/**
 *  Adiciona uma tag filha de tipo tipoTagFilha (pode ser por exemplo a,
 * table, p) na tag pai de id (idTagPai). A tag filha que será criada recebe
 * o conteúdo (conteudoHtml).
 * @param documento é a página que contém o elemento que terá uma tag
 * adicionada.
 * @param idTagPai é o da tag que adicionará a tag de tipo tipoTagFilha.
 * @param tipoTagFilha é o tipo de tag que será criada, por exemplo, p, tr,
 * table.
 * @param conteudoHtml é o conteúdo que será adicionado a nova tag criada de 
 * tipo tipoTagFilha.
 */
function adicionaHtmlTag(documento, idTagPai, tipoTagFilha, conteudoHtml){
	var tagPai = documento.getElementById(idTagPai);
	var novaTag = documento.createElement(tipoTagFilha);
	novaTag.innerHTML = conteudoHtml;
	tagPai.appendChild(novaTag);
}

function tamanhoMinimoCampo(campo, tamanho, msg){
	if(campo.value.length<tamanho){
		campo.focus();
		alert(msg);
		return false;
	}
	return true;
}

/**
 * 	Este método mostra e esconde algum conteúdo de tag html identificado
 * por idTag.
 */
function checkExpand(documento, idTag){
	var el = documento.getElementById(idTag);
	checkExpandTab(documento, idTag, ("none" == el.style.display));
}
/**
 * Este método serve para ser chamado de checkExpand.
 */
function checkExpandTab(documento, idTag, aparece){
	var el = documento.getElementById(idTag);
	if(null!=el){
		el.style.display = (aparece) ? "" : "none";
	}
	event.returnValue=false;
}

/**
 *  @return se o navegador é o Internet Explorer ou não.
 */
function ehIE(){
	var agt = navigator.userAgent.toLowerCase();
	var eIEResultado = 
		(
			(agt.indexOf("msie") != -1)
			&&
			(agt.indexOf("opera") == -1)
		);
	return eIEResultado;
}

function cancelaEvento(ev){
	if(ehIE()) {
		window.event.cancelBubble = true;
		window.event.returnValue = false;
	} else {
		ev.preventDefault();
		ev.stopPropagation();
	}
}

function cancelaESC(e){
//	alert("keypressed");
	var kC  = (ehIE())?//MSIE or Firefox?
		event.keyCode : e.keyCode;
	var Esc = (ehIE())?//MSIE:Firefox
		27 : e.DOM_VK_ESCAPE;
	if(kC==Esc){
		cancelaEvento(e);
		//alert("Esc pressed");
		return false;
	}else{
		return true;
	}
}

function marcaDesmarcaTodos(documento, nomeId, quant, marcar){
	var cont;
	var tag;
	for(cont = 1; menorIgual(cont,quant); cont++){
		tag = documento.getElementById(nomeId+cont);
		tag.checked=marcar;
	}
}

function substituiTudo(str, caractereSubstituido, caratereSubstituto){
	while(str!=str.replace(caractereSubstituido, caratereSubstituto)){
		str = str.replace(caractereSubstituido, caratereSubstituto);
	}
	return str;
}






//Expressões Booleanas.
function eBooleano(exp1, exp2){
	return exp1 && exp2;
}
function ouBooleando(exp1, exp2){
	return exp1 || exp2;
}

//Expressões Relacionais.
function menorIgual(exp1, exp2){
	return exp1<=exp2;
}
function menor(exp1, exp2){
	return exp1<exp2;
}