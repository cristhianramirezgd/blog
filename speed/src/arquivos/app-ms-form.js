config = {
 baseUrl: "http:/.vtexcrm.com.br/"
}

function mundoSaludableForm() {
 var storeName = $("#store_Name").val();
 var dataEntity = $("#data_Entity").val();

 var sub_filtro_Cli = $("#sub_filtro_Cli").val();
 var client_email = $("#client_email").val();
 var client_json = { //campo-nombre entidad de datos masterdata
   "mail": client_email,
   "subfiltro": sub_filtro_Cli
 };

 var endpointURL = config.baseUrl + storeName + "/dataentities/" + dataEntity + "/documents/";

 $.ajax({
   headers: {
     "Accept": "application/vnd.vtex.ds.v10+json",
     "Content-Type": "application/json",
   },
   data: JSON.stringify(client_json),
   type: 'PATCH',
   url: endpointURL,
   success: function(data, textStatus, xhr) {
     if (xhr.status == "200" || xhr.status == "201") {
       $("#co_message_success_popup").show();
       ResetFormBirthdayPopUp();
     } else {
       resetFormundoSaludable();
       $("#co_message_error_popup").show();
     }
   },
   error: function(data) {
     resetFormundoSaludable();
     $("#co_message_error_popup").show();
   }
 });
}
function resetFormundoSaludable() {
 $("#co_message_validate_popup").hide();
 $("#co_message_success_popup").hide();
 $("#co_message_error_popup").hide();
 $("#co_message_email_error_popup").hide();
}
function IsNewEmail() {
 var storeName = $("#store_Name").val();
 var dataEntity = $("#data_Entity").val();
 var client_email = $("#client_email").val();
 var endpointURL = config.baseUrl + storeName + "/dataentities/" + dataEntity + "/search?Email=" + client_email + "&_fields=mail";
 $.ajax({
   headers: {
     "Accept": "application/vnd.vtex.ds.v10+json",
     "Content-Type": "application/json"
   },
   type: 'GET',
   url: endpointURL,
   success: function(data, textStatus, xhr) {
     if (xhr.status == "200" || xhr.status == "201") {
       if (data.length == 0) {
         mundoSaludableForm();
       } else {
         $("#co_message_loading_popup").hide();
         $("#co_message_email_error_popup").show();
       }
     } else {
       resetFormundoSaludable();
       $("#co_message_error_popup").show();
     }
   },
   error: function(data) {
     resetFormundoSaludable();
     $("#co_message_error_popup").show();
   }
 });
}


function IsEmailMundoSaludable(email) {
 //validar con codeigniter
 var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
 return regex.test(email);
}

function formValidateMundoSaludable() {
 var isFormValidateMundoSaludable = true;
 if ((isFormValidateMundoSaludable) && ($("#client_email").val() == "")) {
   isFormValidateMundoSaludable = false;
   $("#client_email").focus();
 }
 if ((isFormValidateMundoSaludable) && (!IsEmailMundoSaludable($("#client_email").val()))) {
   isFormValidateMundoSaludable = false;
   $("#client_email").val("");
   $("#client_email").focus();
 }
 if ($("#sub_filtro_Cli").val() == "") {
   isFormValidateMundoSaludable = false;
   $("#sub_filtro_Cli").focus();
 }
 if (!($('#iagree').is(':checked'))) {
   isFormValidateMundoSaludable = false;
   $("#iagree").focus();
   $("#iagree-message-error").html("aceptas las políticas de manejo de información personal");
 } else {
   $("#iagree-message-error").hide();
 }
 if (isFormValidateMundoSaludable) {
   resetFormundoSaludable();
   $("#co_message_loading_popup").show();
   IsNewEmail();
 } else {
   resetFormundoSaludable();
   $("#co_message_validate_popup").show();
 }

 return true;
}




// Birdthday Children form
function FormbirthdayPopUp(storeName, dataEntity, htmlElementId, messageLoading, messageValidation, messageSuccess, messageError, mailError) {
 var htmlContent = '';
 // forms
 htmlContent += '<form id="rc_form" action="javascript:formValidateMundoSaludable();" method="post" class="main-form newsletter-ms">';
 htmlContent += '<input type="hidden" id="store_Name" name="store_Name" value="' + storeName + '" />';
 htmlContent += '<input type="hidden" id="data_Entity" name="data_Entity" value="' + dataEntity + '" />';
 // Email
 htmlContent += '<input id="client_email" maxlength="100" name="client_email" type="email" placeholder="Example@mail.com" class="jumbogreenyellow" />';
 // filtro
 htmlContent += '<div class="filter-diet form-field string required sub_filtro_Cli">';
 htmlContent += '<label for="sub_filtro_Cli" class="font-bold" >Escoge tu mejor opción</label>';
 htmlContent += '<select id="sub name="sub_filtro_Cli" >'
 htmlContent +='<option disabled="true"><b>Yo Puedo:</b></option>'
 htmlContent +='<option value="">Mi diabetes</option>'
 htmlContent +='<option value="">Mi embarazo</option>'
 htmlContent +='<option value="">Mi corazón</option>'
 htmlContent +='<option value="">Mi digestión</option>'
 htmlContent +='<option disabled="true"><b>Yo Decidí:</b></option>'
 htmlContent +='<option value="">Ser vegetariana</option>'
 htmlContent +='<option value="">Ser vegana</option>'
 htmlContent +='<option value="">Comer Kosher</option>'
 htmlContent +='<option value="">Comer Halal</option>'
 htmlContent +='<option disabled="true"><b>Yo Quiero:</b></option>'
 htmlContent +='<option value="">Adelgazar</option>'
 htmlContent +='<option value="">Desintoxicarme</option>'
 htmlContent +='<option value="">Alimentarme mejor</option>'
 htmlContent +='<option value="">Practicar un deporte</option>'
 htmlContent +='<option value="">Cuidar a mi familia</option>'
 htmlContent += '</select>';
 htmlContent += '</div>';
 // Send button
 htmlContent += '<button id="commit" name="commit" type="submit" value="Enviar" class="button-ms button-full button-ms-green-line">Enviar</button>';
 // Message form
 htmlContent += '<span id="co_message_loading_popup" class="alert alert-info" style="display:none;">' + messageLoading + '</span>';
 htmlContent += '<span id="co_message_validate_popup" class="alert alert-warning" style="display:none;">' + messageValidation + '</span>';
 htmlContent += '<span id="co_message_success_popup" class="alert alert-success" style="display:none;">' + messageSuccess + '</span>';
 htmlContent += '<span id="co_message_error_popup" class="alert alert-danger" style="display:none;">' + messageError + '</span>';
 htmlContent += '<span id="co_message_email_error_popup" class="alert alert-danger" style="display:none;">' + mailError + '</span>';
 // Check
 htmlContent += '<div class="legal-check form-field string iagree">';
 htmlContent += '<input id="iagree" maxlength="100" name="iagree" type="radio"/>';
 htmlContent += '<small for="iagree"><a data-src="#terms-conditions-ms" href="javascript:;" class="terms-ms">aceptas las políticas de manejo de información personal</a></small>';
 htmlContent += '<div id="iagree-message-error"></div>';
 htmlContent += '</div>';
 htmlContent += '</form>';

 $("#" + htmlElementId).html(htmlContent);
}

var storeName = "jumbocolombiafood"; //Designated Account Named that Used on MasterData Api
var dataEntity = "MF"; //Data Entity initials of api on MasterData
var htmlElementId = "formFilterNewsletter"; //Html ID form
var messageLoading = "Cargando..."; //Loading message (or save)
var messageValidation = "Rellena correctamente todos los campos obligatorios del formulario."; //Validation Message
var messageSuccess = "Tu registro se realizádo con exito." + "<br />" + "Tu codigo de descuento es:" + "<br />" + "<b>" + "test" + "</b>"; //Success Message
var messageError = "Se ha producido un error." + "<br />" + "Vuelve a intentarlo más tarde."; //Error Message
var mailError = "Correo Electronico ingresado ya existe.";

FormbirthdayPopUp(storeName, dataEntity, htmlElementId, messageLoading, messageValidation, messageSuccess, messageError, mailError);
// fancy box
$('.terms-ms').fancybox({
 protect: true,
 touch: false
  });
