$(function () {
    setTimeout(function() {
        $('.loadingDiv').slideUp()
    },400)
    $("#chatBotBody").hide()
    $("#chatBotFooter").hide()
    $.post('../route/showChatBot/',{},
    function(data){
        if(!data) $("#chatBotContainer").hide()
    })
    if($( window ).width() < 600){
        $(".navBarBtn").removeClass("open")
    }

    $("#addFeedback").click(function() {
        $.post('../route/addFeedback',{
            feedbackdata : $("#feedbackdata").val(),
            isAnonymous : $("#isAnonymous").is(':checked') ? 'true' : 'false',
            rating : $("#satisfied").is(':checked') ? 1 : $("#unsatisfied").is(':checked') ? -1 : 0
        },function(data){
            if(data){
                alert("Feedback Uploaded!")
            }
            else{
                alert("Feedback already existed!")
            }
        })
     })

    $(".navBarBtn").click(function() {
        if($(".navBar").css("width")==="270px"){
            $(".main").css("padding-left","0px")
            $(".navBar").css("width","0")
            $(".navBarBtn").removeClass("open")
        } else{
            if($( window ).width() > 600){
                $(".main").css("padding-left","270px")
            }
            $(".navBar").css("width","270px")
            $(".navBarBtn").addClass("open")
        }
    })

    $("#logout").click(function () {
        $.post('../route/logout/',{},
        function(data){
            window.location.href = '/'
        })
    })

    $("#chatBotHeader").click(function(){
        $("#chatBotBody").toggle("fast","linear")
        $("#chatBotFooter").toggle("fast","linear")
    })
    
    $('#chatBotInput').on('keydown', function(e) {
        if (e.which == 13) {
            e.preventDefault()
            $("#chatBotSubmit").click()
        }
    })

    $("#chatBotSubmit").click(function () {
        let query = $("#chatBotInput").val()
        let templateUser = [`
        <div id="chatBotCLIENTSIDE">
            <span>`,
        `   </span>
        </div>
        `]
        let templateBot = [`
        <div id="chatBotBOTSIDE">
            <span>`,
        `   </span>
        </div>
        `]
        let chatContainer = $("#chatBotBody")
        chatContainer.append(templateUser[0]+query+templateUser[1])
        $("#chatBotInput").val("")
        chatContainer.animate({
            scrollTop: chatContainer.prop("scrollHeight")
        }, 1000);
        $.get('http://localhost:5000/askBot/'+query,
        function(data){
            setTimeout(function () {
                chatContainer.append(templateBot[0]+data.response+templateBot[1])
                console.log(data)
                chatContainer.animate({
                    scrollTop: chatContainer.prop("scrollHeight")
                }, 1000)
            },1500)
        })
    })
})