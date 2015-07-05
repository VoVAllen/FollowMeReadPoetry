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
var a="\
    [00:53.00]There's a lady who's sure\
    [00:57.00]All that glitters is gold\
    [00:59.00]And she's buying a stairway to heaven.\
    [01:06.00]When she gets there she knows\
    [01:09.00]If the stores are all closed\
    [01:12.00]With a word she can get what she came for.\
    [01:21.00]Ooh, ooh, and she's buying a stairway to heaven.\
    [01:35.00]There's a sign on the wall\
    [01:37.00]But she wants to be sure\
    [01:39.00]'Cause you know sometimes words have two meanings.\
    [01:46.00]In a tree by the brook\
    [01:50.00]There's a songbird who sings,\
    [01:53.00]Sometimes all of our thoughts are misgiven.\
    [02:19.00]Ooh, it makes me wonder,\
    [02:27.00]Ooh, it makes me wonder.\
    [02:38.00]There's a feeling I get\
    [02:41.00]When I look to the west,\
    [02:44.00]And my spirit is crying for leaving.\
    [02:50.00]In my thoughts I have seen\
    [02:53.00]Rings of smoke through the trees,\
    [02:56.00]And the voices of those who stand looking.\
    [03:10.00]Ooh, it makes me wonder,\
    [03:18.00]Ooh, it really makes me wonder.\
    [03:29.00]And it's whispered that soon\
    [03:32.00]If we all call the tune\
    [03:34.00]Then the piper will lead us to reason.\
    [03:40.00]And a new day will dawn\
    [03:44.00]For those who stand long\
    [03:46.00]And the forests will echo with laughter.\
    [04:19.00]If there's a bustle in your hedgerow\
    [04:23.00]Don't be alarmed now,\
    [04:25.00]It's just a spring clean for the May queen.\
    [04:30.00]Yes, there are two paths you can go by\
    [04:34.00]But in the long run\
    [04:36.00]There's still time to change the road you're on.\
    [04:49.00]And it makes me wonder.\
    [05:06.00]Your head is humming and it won't go\
    [05:10.00]In case you don't know,\
    [05:12.00]The piper's calling you to join him,\
    [05:18.00]Dear lady, can you hear the wind blow,\
    [05:21.00]And did you know\
    [05:23.00]Your stairway lies on the whispering wind.\
    [06:44.00]And as we wind on down the road\
    [06:48.00]Our shadows taller than our soul.\
    [06:52.00]There walks a lady we all know\
    [06:57.00]Who shines white light and wants to show\
    [07:02.00]How ev'rything still turns to gold.\
    [07:06.00]And if you listen very hard\
    [07:11.00]The tune will come to you at last.\
    [07:16.00]When all are one and one is all\
    [07:21.00]To be a rock and not to roll.\
    [07:44.00]And she's buying a stairway to heaven.";
var timeArray=new Array();
var lyricsArray=new Array();
var nodeArray=new Array();
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
            $(this).removeClass('activated');
        });
        var index = parseInt(event.target.id);
        var time = timeArray[index];
        var all = document.getElementById('allLyrics');
        var audio = document.getElementById('test');
        audio.currentTime = time;
    });
    var i=getcurrent();
    var j=i-1;
    if($('#'+j) != null){$('#'+j).removeClass('activated');}
    $('#'+i).addClass('activated');
}
//Compare the audio time with lyrics time and get current lyrics
function getcurrent()
{
    var a=document.getElementById("test");
    var i=0;
    for(i=0;i<timeArray.length;i++)
    {
        if(timeArray[i]>=a.currentTime)
        {
            return i-1;
        }
    }
    return i-2;
}
//forward for 2s
function back()
{
    sessionStorage.time=parseInt(sessionStorage.time)-2;
    parse(a);
}
//skip for 2s
function forward()
{
    sessionStorage.time=parseInt(sessionStorage.time)+2;
    parse(a);
}
//Run
$(function()
{
    parse(a);
})