function viewContact(id){
    jQuery.ajax({
        url: '/API/viewContact.php',
        type: "GET",
        data: {id:id},
        success: function(resp){
			if(resp!="fail whale :("){
				var obj = $.parseJSON(resp);
				$("#contactDisplay").attr("data-cid",obj.id);
				$("#nameRO").html(obj.name);
				$("#phoneRO").html(obj.phone);
				$("#emailRO").html(obj.email);

				if($("#contactDisplay").is(":hidden")){
					$(".togglePanel").toggleClass("defaultHidden");
				}
			} else {
				showError("viewContact API call fail whaled :(");
			}
        }
    });
}

function addContact(){
	var nameF=$("#nameWF").val();
    var nameL=$("#nameWL").val();
	var phone=$("#phoneW").val();
	var email=$("#emailW").val();
	$('#contactAdd .userInput').val("");
    jQuery.ajax({
        url: '/API/addContact.php',
        type: "POST",
        data: {nameF:nameF, nameL:nameL, phone:phone, email:email},
		success: function(resp){
			if(resp!="fail whale :("){
				var obj = $.parseJSON(resp);
				$("#contactDisplay").attr("data-cid",obj.id);
				$("#nameFRO").html(obj.nameF);
                $("#nameLRO").html(obj.nameL);
				$("#phoneRO").html(obj.phone);
				$("#emailRO").html(obj.email);

				if($("#contactDisplay").is(":hidden")){
					$(".togglePanel").toggleClass("defaultHidden");
				}
				$("#contactList button").last().after('<button id="' + obj.id + '" type="button" class="list-group-item contact">' + obj.name + "</button>");
				$("#"+obj.id).on("click",function(){viewContact(this.id);});
			}
			else {
				showError("addContact API call fail whaled :(");
			}
		}
    });
}

//PHP Does not easily support accessing PUT and DELETE data.
//We opted to forego these RESTful verbs for cleaner PHP code on the back end.
function deleteContact(id){
    jQuery.ajax({
        url: '/API/deleteContact.php',
        type: "POST",
        data: {id:id},
        success: function(resp){
			if(resp!="fail whale :("){
				var obj = $.parseJSON(resp);
				$("#"+obj.id).remove();
				$(".togglePanel").toggleClass("defaultHidden");
			} else {
				showError("deleteContact API call fail whaled :(");
			}
        }
    });
}

function searchContact(){}

//add to 2nd page once written <script src="/API/APIfront.js"></script>
