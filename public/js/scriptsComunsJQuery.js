/**
 * Scripts criados usando JQuery.
 */

function redireciona(link){
	var novaURL = link;
	$(location).attr('href',novaURL);
	return true;
}

/**
 * Testa se a string é vazia. Antes é feito o trim da string.
 * @param str é a string a ser testada.
 * @return se a string é vazia ou não.
 */
function testeStringVaziaJQ(str){
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
function validaCampoComMensagemJQ(id, msg, invalido, focarNaoValido){
	var campo = $(id);
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
 *  Valida o campo de um formulario, através de seu atributo value.
 *  Se ele for vazio ou tiver apenas espaços em branco então será exibida uma 
 * mensagem 'msg', esse campo se tornará o foco da edição e a função retornará
 * false.
 *  Se não for vazio então será retornado true.
 * 
 * @return true se o campo de texto foi validado com sucesso e false caso contrário.
 */
function validaCampoTextoJQ(id, msg){
	var campo = $(id);
	return validaCampoComMensagemJQ(id, msg, testeStringVaziaJQ(campo.val()), true);
}
