/**
 * Created by Zeng on 2015/7/2.
 */

//这个，存储调节的时间值
//sessionStorage是HTML5的新东西
//sessionStorage代表着实际歌词时间和lrc歌词时间差
if(!sessionStorage.time)
{
    sessionStorage.time=0;
}
windowHeight = (typeof window.outerHeight != 'undefined') ? Math.max(window.outerHeight, $(window).height()) : $(window).height();
var a="\
    [00:29.40]Two roads diverged in a yellow wood,\
    [00:34.79]And sorry I could not travel both\
    [00:38.39]And be one traveler, long I stood\
    [00:42.80]And looked down one as far as I could\
    [00:47.40]To where it bent in the undergrowth;\
    [00:53.20]Then took the other, as just as fair,\
    [00:57.39]And having perhaps the better claim,\
    [01:00.80]Because it was grassy and wanted wear;\
    [01:04.59]Though as for that the passing there  Had really worn them about the same,\
    [01:15.90]And both that morning equally lay\
    [01:20.90]In leaves no step had trodden black.\
    [01:26.00]Oh, I kept the first for another day!\
    [01:32.00]Yet knowing how way leads on to way,  I doubted if I should ever come back.\
    [01:43.39]I shall be telling this with a sigh\
    [01:46.00]Somewhere ages and ages hence:\
    [01:51.60]Two roads diverged in a wood, and I-\
    [01:57.20]I took the one less traveled by,\
    [02:03.00]And that has made all the difference.";
var timeArray=new Array();
var lyricsArray=new Array();
//Parse the lyrics and separate time and lyrics
//Put time into timeArray and access by timeArray[i]
//Put lyrics into lyricsArray and access by lyricsArray[i]
//Lyrics format [00:00.00]
function parse(lrc)
{
    str=lrc.split("[");
    //str[0]=""
    //str[1]="xx:xx.xx]lyrics1"
    //str[2]="yy:yy.yy]lyrics2"
    //Skip str[0]
    for(var i=1;i<str.length;i++)
    {
        //str[i] format is 00:11.22]我
        //time format is 00:11.22
        var time=str[i].split(']')[0];
        //lyrics format is "我"
        var lyrics=str[i].split(']')[1];
        var minute=time.split(":")[0];
        var second=time.split(":")[1];
        //xx:xx.xx is converted into total seconds
        var sec=parseInt(minute)*60+parseInt(second);
        //save total seconds
        timeArray[i-1]=sec-sessionStorage.time;
        //save lyrics
        lyricsArray[i-1]=lyrics;
    }
    var allLyrics=document.getElementById("allLyrics");
    for(var i=0;i<timeArray.length;i++)
    {
        allLyrics.innerHTML += '<p class="sentence" id="'+i+'">'+lyricsArray[i]+'</p>';
    }
    //Timer will update lyrics every 1 second
    setInterval(update,1000);
}
function update()
{
    $('.sentence').click(function(event)
    {
        $('.sentence').each(function()
        {
            $(this).removeClass('active');
        });
        var target = event.target.id;
        var $target = $('#'+target);
        var index = parseInt(event.target.id);
        var time = timeArray[index];
        //var all = document.getElementById('allLyrics');
        //all.innerHTML += $target.offset().top;
        var audio = document.getElementById('poemAudio');
        audio.currentTime = time;
        //audio.pause();
    });
    var i=getCurrent();
    var j=i-1;
    if($('#'+j) != null)
    {
        $('#'+j).removeClass('active');
    }
    if($('#'+i) != null)
    {
        $('#'+i).addClass('active');
    }
    $('html body').stop().animate
    (
        {'scrollTop': $('#'+i).offset().top-windowHeight/2},
        900, 'swing', function ()
        {
            var offset = $('#'+i).offset().top-windowHeight/2;
            if(offset>0)
            {
                window.scrollTo(0,offset);
            }
        }
    );
}
//Sidebar button controlling the audio
function btnControl()
{
    var $audio = document.getElementById('#poemAudio');
    $('#playBtn').click(function()
    {
        if(audio.paused)
        {
            audio.play();
        }
        else
        {
            audio.pause();
        }
    });
}
//Compare the audio time with lyrics time and get current lyrics
function getCurrent()
{
    var au=document.getElementById("poemAudio");
    var allLyrics=document.getElementById("allLyrics");
    var i=0;
    if(au.currentTime>=timeArray[timeArray.length-1])
    {
        return timeArray.length-1;
    }
    for(i=0;i<timeArray.length;i++)
    {
        if(timeArray[i]>au.currentTime)
        {
            return i-1;
        }
    }
    return i-2;
}
//Run
$(function()
{
    parse(a);
});