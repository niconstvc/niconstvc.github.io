$(document).ready(function(){
    let commands = "";
    $.getJSON("assets/commands.json", function(data){
        commands = data.commands;
    });


    $("#console-container").on('keyup', "#user-input",function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            const value = $(this).val();
            switch(value){
                case 'continuar':
                    printHelp();
                    break;
                case 'limpiar':
                    clearConsole();
                    break;
                case 'ver todo':
                    printAllCommand();
                    break;
                    break;
                default:
                    if(value.substring(0, value.indexOf(' ')).toLowerCase() === 'argument'){
                        printArgument(value, (value) => {
                            // Implement how to return the argument in an array
                            // this example for one argument, every string after the first space will be the argument
                            return [value.substring(value.indexOf(' ') + 1)];
                        });
                    }else{
                        searchForCommand(value);
                    }
            }
        }
    });

    $("body").click(function(e) {
        if (e.target.id == "console-container" || $(e.target).parents("#console-container").length <= 0) {
            $("#user-input").focus();
        } 
    });

    $("#div2").on("click", function(e) {

        e.stopPropagation();

    });

    $("#div2").on("click", function(e) {

        e.stopPropagation();

    });

    function printOutput(text){
        $("#console-container").append('<div class="prompt">'+
            '<div class="output">' +
                text + 
            '</div>' +
        '</div>');
    }

    function printArgument(rawInput, getArguments){
        
        const argument = getArguments(rawInput);
        prompt("<p>Your argument is "+argument+"</p>");
    }

    function prompt(text){
        const input = $("#user-input")
        printOutput(text)
        $("#console-container").append(input.parent().parent().clone())
        input.prop("disabled", true);
        input.removeAttr('id');

        $('#user-input').val('');
        $("#user-input").focus();
        $("#user-input").prop("disabled", false);
    }

    function clearConsole(){
        const userInput = $("#user-input").parent().parent()

        $("#console-container").html('');
        $("#console-container").append(userInput);


        $('#user-input').val('');
        $('#user-input').focus();
    }

    function commandNotFound(){
        const notFoundText = "<p>Comando fallido!</p>"
        const helpText = "<p>Escriba 'continuar' + <kbd>ENTER</kbd> para ver las opciones disponibles</p>"
        prompt(notFoundText+helpText)
    }

    function searchForCommand(command){
        for(let i = 0; i < commands.length; i++){
            if(command == commands[i].command){
                prompt(commands[i].output);
                return;
            }
        }
        commandNotFound();
    }

    function printHelp(){
        let helpOutput = "<p>Comandos disponibles: </p>";

        helpOutput += "<table style='margin-bottom: 5px'>";
        // helpOutput += "<thead>";
        // helpOutput += "<tr>";
        // helpOutput += "<td>command</td>"
        // helpOutput += "<td>description</td>"
        // helpOutput += "</tr>";
        // helpOutput += "</thead>";

        for(let i = 0; i < commands.length; i++){
            helpOutput += "<tr>";
            helpOutput += "<td>"+commands[i].command+"</td>";
            helpOutput += "<td>"+commands[i].info+"</td>"
            helpOutput += "</tr>";
        }

        helpOutput += "<tr>";
        helpOutput += "<td>ver todo</td>"
        helpOutput += "<td>Show all information</td>"
        helpOutput += "</tr>";



        helpOutput += "<tr>";
        helpOutput += "<td>limpiar</td>"
        helpOutput += "<td>clear the console</td>"
        helpOutput += "</tr>";

        helpOutput += "</table>";
        helpOutput += "<p>Los comandos distinguen entre mayuscula y minuscula</p>"

        prompt(helpOutput);
    }

    function printAllCommand(){
        let output = "";
        for(let i = 0; i < commands.length; i++){
            output += commands[i].output;
            output += "<p style='margin-bottom: 30px'></p>"
        }

        prompt(output);
    }
      
    //   $(function() {
    //     $('body').keypress(function(e) {
    //       alert(e.which);
    //     });
    //   });
});