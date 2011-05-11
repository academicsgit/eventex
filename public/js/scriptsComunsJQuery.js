/**
 * Scripts criados usando JQuery.
 */

function redireciona(link){
	var novaURL = link;
	$(location).attr('href',novaURL);
	return true;
}

/**
 * Testa se a string � vazia. Antes � feito o trim da string.
 * @param str � a string a ser testada.
 * @return se a string � vazia ou n�o.
 */
function testeStringVaziaJQ(str){
	if(str/*.trim()*/==""){
		return true;
	}
	return false;
}

/**
 *  Se n�o for v�lido ent�o exibe uma mensagem e o foco da edi��o vai para o
 * campo se focarNaoValido for true.
 * 
 * @return true se o campo de texto foi validado com sucesso e
 *  false caso contr�rio.
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
 *  Valida o campo de um formulario, atrav�s de seu atributo value.
 *  Se ele for vazio ou tiver apenas espa�os em branco ent�o ser� exibida uma 
 * mensagem 'msg', esse campo se tornar� o foco da edi��o e a fun��o retornar�
 * false.
 *  Se n�o for vazio ent�o ser� retornado true.
 * 
 * @return true se o campo de texto foi validado com sucesso e false caso contr�rio.
 */
function validaCampoTextoJQ(id, msg){
	var campo = $(id);
	return validaCampoComMensagemJQ(id, msg, testeStringVaziaJQ(campo.val()), true);
}
