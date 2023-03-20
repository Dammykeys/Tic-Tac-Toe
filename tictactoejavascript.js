// setting variables for the game
const avatar = $('#avatar');
const submit = $('#submit');
const reset = $('#reset');
const result = $('#result');
const cell1 = $('#table1 #gameCell1');
const cell2 = $('#table1 #gameCell2');
const cell3 = $('#table1 #gameCell3');
const cell4 = $('#table2 #gameCell1');
const cell5 = $('#table2 #gameCell2');
const cell6 = $('#table2 #gameCell3');
const cell7 = $('#table3 #gameCell1');
const cell8 = $('#table3 #gameCell2');
const cell9 = $('#table3 #gameCell3');
let player1 = $('#player1').val().toUpperCase();
let player2 = $('#player2').val().toUpperCase();
let newPara;

avatar.submit(function(event){
    event.preventDefault();
    player1 = $('#player1').val().toUpperCase();
    player2 = $('#player2').val().toUpperCase();          
    startGame();
});

reset.click(function(){
    $('#display').remove();
    $('#turnIndicator').remove();
    $('tr').remove();
    $('#player1').focus();
    //$("<input type='submit' id='submit' value='Start game'>").insertBefore($(this));
});

function startGame() {
    //function for table maker
    var makeGrid = function gridMaker(){
        for (var c = 1; c <= 3; c++) {
            $('#grid').append('<tr id = table'+c+'></tr>');
            for (var r = 1; r <= 3; r++) {
                $('#table'+c).append('<td id=gameCell'+r+'></td>')
            };
        };
    };

    // function for the form
    function todo(){
        $('#info').children().remove();
        $('#playerTurn').append('<p id=turnIndicator>Player ' +player1+' turn.</p>'); 
        submit.remove();
        makeGrid();
    }

    function winDetect(){
        if((cell1.children('p').text('X')) && (cell2.children('p').text('X')) && (cell3.children('p').text('X'))){
            $('#finalResult').remove();
            result.append('<p id=finalResult>Player ' +player1+' wins</p>');
            $('#finalResult').remove();
        } else if((cell4.click()) && (cell5.click()) && (cell6.click())) {
            $('#finalResult').remove();
            result.append('<p id=finalResult>Player ' +player1+' wins</p>');
        } else if((cell7.click()) && (cell8.click()) && (cell9.click())) {
            $('#finalResult').remove();
            result.append('<p id=finalResult>Player ' +player1+' wins</p>');
        } else if((cell1.click()) && (cell4.click()) && (cell7.click())) {
            $('#finalResult').remove();
            result.append('<p id=finalResult>Player ' +player1+' wins</p>');
        } else if((cell2.click()) && (cell5.click()) && (cell8.click())) {
            $('#finalResult').remove();
            result.append('<p id=finalResult>Player ' +player1+' wins</p>');
        } else if((cell3.click()) && (cell6.click()) && (cell9.click())) {
            $('#finalResult').remove();
            result.append('<p id=finalResult>Player ' +player1+' wins</p>');
        } else if((cell1.click()) && (cell5.click()) && (cell9.click())) {
            $('#finalResult').remove();
            result.append('<p id=finalResult>Player ' +player1+' wins</p>');
        } else if((cell3.click()) && (cell5.click()) && (cell7.click())) {
            $('#finalResult').remove();
            result.append('<p id=finalResult>Player ' +player1+' wins</p>');
        } else {
            console.log("nothing!!!!!!!!!!!");
        }
    }

    //selection of avatar condition statement
    if ((player1==="X") && (player2==="O")) {
        todo();
    } else if ((player1==="O") && (player2==="X")) {
        todo();
    } else {
        $('#info').children().remove();
        $('#info').append('<p id=display>Invalid avatar selected! Pls select either X or O</p>');
    }


    // Table click response
    var turnCount = 1;
    $('td').click(function() {
        if (!($(this).attr('style'))){
            if((player1==="x")||(player1==="X")){
                if (!(turnCount % 2 === 0)) {
                    if(turnCount <= 9){
                        $(this).append('<p id=gameAvatarX class=gameAvatar>X</p>');
                        $(this).attr('style', 'background-color: #05b405');
                        $('#playerTurn').children('#turnIndicator').remove();
                        $('#playerTurn').append('<p id=turnIndicator>Player ' +player2+' turn.</p>');
                        turnCount++;
                    } else {
                        $('#playerTurn').children('#turnIndicator').remove();
                        $('#playerTurn').append('<p id=turnIndicator>Player ' +player1+' turn.</p>');
                        alert('INVALID MOVE!!!');
                    };
                    winDetect();
                } else {
                    if(turnCount <= 9){
                        $(this).append('<p id=gameAvatarO class=gameAvatar>O</p>');
                        $(this).attr('style', 'background-color: #cddb02');
                        $('#playerTurn').children('#turnIndicator').remove();
                        $('#playerTurn').append('<p id=turnIndicator>Player ' +player1+' turn.</p>');
                        turnCount++;
                    } else {
                        $('#playerTurn').children('#turnIndicator').remove();
                        $('#playerTurn').append('<p id=turnIndicator>Player ' +player2+' turn.</p>');
                        alert("INVALID MOVE!!!");
                    };
                };
            } else {
                if ((turnCount % 2 === 0)) {
                    if(turnCount <= 9){
                        $(this).append('<p id=gameAvatarX class=gameAvatar>X</p>');
                        $(this).attr('style', 'background-color: #05b405');
                        $('#playerTurn').children('#turnIndicator').remove();
                        $('#playerTurn').append('<p id=turnIndicator>Player ' +player1+' turn.</p>');
                        turnCount++;
                    } else {
                        $('#playerTurn').children('#turnIndicator').remove();
                        $('#playerTurn').append('<p id=turnIndicator>Player ' +player2+' turn.</p>');
                        alert('INVALID MOVE!!!');
                    };
                } else {
                    if(turnCount <= 9){
                        $(this).append('<p id=gameAvatarO class=gameAvatar>O</p>');
                        $(this).attr('style', 'background-color: #cddb02');
                        $('#playerTurn').children('#turnIndicator').remove();
                        $('#playerTurn').append('<p id=turnIndicator>Player ' +player2+' turn.</p>');
                        turnCount++;
                    } else {
                        $('#playerTurn').children('#turnIndicator').remove();
                        $('#playerTurn').append('<p id=turnIndicator>Player ' +player1+' turn.</p>');
                        alert("INVALID MOVE!!!");
                    };
                };
            };
        } else {
            alert('INVALID MOVE!!!');
        };
    });
};
