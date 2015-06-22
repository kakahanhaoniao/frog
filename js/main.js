    var oGlass=document.getElementById('glass');
    var oLotus=document.getElementById('lotus');
    var oFrog=document.getElementById('frog');
    var oDiv=ofrog=null,aPos=[],aLotuFrog={},isPlay=false,totalT=0,aFrogs=[];
    var video=document.getElementById('video1'),oPlay=document.getElementById('paly'),oMask=document.getElementById('mask'),oAgain=document.getElementById('again'),oPlaya=document.getElementById('palyagain');
    init();
    // 初始化
    function init(){
        aPos=[],aLotuFrog={};
        // create glass
        for(var i=0;i<1000;i++){
            oDiv=document.createElement('li');
            oDiv.style.height=Math.random()*20+10+'px';
            oDiv.style.width='1px';
            oDiv.style.top=Math.ceil((Math.random()-2)*5)+'px';
            oDiv.style.left=Math.random()*98+'%';
            oDiv.style.transform='rotate('+(Math.random()*60+5)+'deg)';
            oGlass.getElementsByTagName('ul')[0].appendChild(oDiv);
        }
        // create flower
        for(var j=0;j<20;j++){
            oDiv=document.getElementById('flower').cloneNode(true);
            oDiv.id='';
            oDiv.style.left=Math.random()*98+'%';
            oDiv.style.top=Math.ceil((Math.random()*40))+'px';
            oDiv.style.transform='scale('+Math.abs(Math.random()-0.5)+')';
            oGlass.appendChild(oDiv);
        }
        // create frog lotus
        for(var m=0;m<7;m++){
            if(m==0){
                ofrog=oFrog;
                oDiv=oLotus;
            }else{
               oDiv=oLotus.cloneNode(true);
               ofrog=oFrog.cloneNode(true); 
               oDiv.id=ofrog.id='';
            }      
            ofrog.index=m;
            oDiv.style.left=ofrog.style.left=30+180*m+'px';
            if(m>3) ofrog.className='frog ops';
            document.getElementById('lotbox').appendChild(oDiv);
            if(m!=3) {
                aFrogs.push(ofrog);  
                ofrog.onclick=frogMove;
                document.getElementById('lotbox').appendChild(ofrog);
                aLotuFrog[m]=m;
            };
            aPos.push(oDiv.offsetLeft);
        }
        // music
        video.volume=0.4; 
        oPlay.onclick=oPlaya.onclick=function(){
            var _this=this;
            isPlay=true;
            totalT=0;
            oMask.className='hide';
            oAgain.style.cssText='';
            setFrog();
            clearInterval(this.timer);
            this.timer=setInterval(function(){
                totalT+=0.5;
                if(checkIsSuccess()){
                    clearInterval(_this.timer);
                    isPlay=false;
                    oAgain.style.display='block';
                    oAgain.getElementsByTagName('font')[0].innerHTML=totalT;
                };
            },500)
        };
        
    }
    // 青蛙运动
    function frogMove(){
        if(!isPlay) return;
        var solor=checkIndex(this);
        var obj=this;
        if(solor>-1){
            this.className+=' move';      
            doMove(obj,'left',120,aPos[solor],function(){
                aLotuFrog[obj.index]=solor;
                removeClass(obj);                
            });            
            musicControl();
        }
    }

    // 判断青蛙运动位置 返回索引位置
    function checkIndex(obj){        
        var index=aLotuFrog[obj.index]; //index 荷叶索引号        
        var change=obj.index>3?-1:1;
        var solr=index+change;
        while(change<0?(solr>=(index+change*2)):(solr<=(index+change*2))){
            if(solr>-1 && solr<7 && !inArrObject(solr,aLotuFrog)){
                return solr;
            }
            solr=solr+change;
        }
        return -1;
    }

    // 检测数据是否在json中存在
    function inArrObject(val,obj){
        for(var i in obj){
            if(val==obj[i]){
                return i;
            }
        }
        return false;
    }

    // 运动函数
      function doMove(obj,attr,speed,target,fn){
        var iCur=getStyle(obj,attr);
        speed=iCur<target?Math.abs(speed):-Math.abs(speed);
        timer=setInterval(function(){
          iCur+=speed;
          if((speed<0 && iCur<=target) || (speed>0 && iCur>=target)){
            iCur=target;
          }
          obj.style[attr]=iCur+'px';
          if(iCur==target){
            clearInterval(timer);
            if(typeof fn=='function'){
              fn();
            }
          }
        },120);
      }

    // 删除 move class
    function removeClass(obj){
        var classs=obj.getAttribute('class');
        obj.className=classs.replace(/\bmove\b/g,'');
    }
    // 获取样式
    function getStyle(obj,attr){
    return parseFloat(obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr])||0;
    }
    // 音乐控制
    function musicControl(){        
        var frogmusic=document.getElementById('frogmusic');
        frogmusic.autoplay=true;
        frogmusic.load();       
    }

    function checkIsSuccess(){
        for(var i in aLotuFrog){
            if((i<3 && aLotuFrog[i]<4) || (i>3 && aLotuFrog[i]>2)) return false;
        }
        return true;
    }

    // 设置frog
    function setFrog () {
        for(var i=0;i<aFrogs.length;i++){
            var m=aFrogs[i].index;
            aFrogs[i].style.left=aPos[m]+'px';
            aLotuFrog[m]=m;
        }        
    }

