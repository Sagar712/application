if("serviceWorker" in navigator){
    navigator.serviceWorker.register("sw.js").then(
        registration => {
            console.log("SW registered");
            console.log(registration);
        }
    ).catch(error => {
        console.log("SW failed");
    })
}


function swipeleft1(){
    document.getElementById("content1").style.transform="translateX(0%)";
    document.getElementById("content2").style.transform="translateX(100%)";
    document.getElementById("content3").style.transform="translateX(200%)";
    document.querySelectorAll("#icon1")[0].style.color="rgb(65, 47, 0)";
    document.querySelectorAll("#icon1")[1].style.color="rgb(65, 47, 0)";
    document.querySelectorAll("#icon2")[0].style.color="rgb(148, 108, 0)";
    document.querySelectorAll("#icon2")[1].style.color="rgb(148, 108, 0)";
    document.getElementById("icon3").style.color="rgb(148, 108, 0)";
    document.getElementById("allcont").scrollTop=0;
}

function swipeleft2(){
    document.getElementById("content1").style.transform="translateX(-100%)";
    document.getElementById("content2").style.transform="translateX(0%)";
    document.getElementById("content3").style.transform="translateX(100%)";
    document.querySelectorAll("#icon2")[0].style.color="rgb(65, 47, 0)";
    document.querySelectorAll("#icon2")[1].style.color="rgb(65, 47, 0)";
    document.querySelectorAll("#icon1")[0].style.color="rgb(148, 108, 0)";
    document.querySelectorAll("#icon1")[1].style.color="rgb(148, 108, 0)";
    document.getElementById("icon3").style.color="rgb(148, 108, 0)";
    document.getElementById("allcont").scrollTop=0;
}

function swipeleft3(){
    document.getElementById("content1").style.transform="translateX(-200%)";
    document.getElementById("content2").style.transform="translateX(-100%)";
    document.getElementById("content3").style.transform="translateX(0%)";
    document.getElementById("icon3").style.color="rgb(65, 47, 0)";
    document.querySelectorAll("#icon2")[0].style.color="rgb(148, 108, 0)";
    document.querySelectorAll("#icon2")[1].style.color="rgb(148, 108, 0)";
    document.querySelectorAll("#icon1")[0].style.color="rgb(148, 108, 0)";
    document.querySelectorAll("#icon1")[1].style.color="rgb(148, 108, 0)";
    document.getElementById("allcont").scrollTop=0;
}

let chngeicn=0;
const overlay = document.querySelector(".ovelay2");
let isMenuOpened = false;

let saveTitle="";

function changeicon(){
    chngeicn++;
    const drop = document.querySelector(".dropdown");
    if(chngeicn%2!=0){
        document.getElementById("changeiconq").className="fas fa-times";
        drop.classList.toggle("active");
        overlay.classList.toggle("active");
        document.querySelector(".seeting").classList.toggle("active");
    }
        
    else{
        document.getElementById("changeiconq").className="fas fa-bars";
        drop.classList.toggle("active");
        overlay.classList.toggle("active");
        document.querySelector(".seeting").classList.toggle("active");
    }
        
}



function overlayhandle(){
    console.log("overlay clicked");
    changeicon();
}


function reset(){
    document.getElementById("keyy2").value="";
    document.getElementById("encryted").innerHTML="";
    console.log("Reset clicked");
}

function encrypt(key, msg){
    
    if(key=="")
        key="7121996";

    let encypted="";
	let looper=0, len = key.length;
    let conv;
    let exchange=0;
    let firstspace = true;
    let series = [" ","!","'","#","$","%","&","\"","(",")","*","+",",","-",".","/",
        "0","1","2","3","4","5","6","7","8","9",":",";","<","=",">","?","@",
        "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
        "[","\\","]","^","_","`","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u",
        "v","w","x","y","z","{","|","}","~"];

    for(let i=0; i<msg.length; i++){
        let j=parseInt(key.charAt(looper));
        for(let k=0; k<series.length; k++){
            if(series[k]===msg.charAt(i)){
                exchange=k;
                break;
            }
        }
        if(msg.charAt(i)=="\n"){
            encypted = encypted.concat("\n");
            continue;
        }
                
        conv = series[(exchange+j)%95];
        if(conv ==" "){
            conv="©";
        }
        encypted = encypted.concat(conv);
        looper = (looper+1)%len;
    }
    
    return encypted;
    
}

function decrypt(){
    let key = document.getElementById("keyy").value;
    let msg = document.getElementById("keyy2").value;
    if(key=="")
    key = "7121996";
		let encypted="";
		let j =0, looper=0, len = key.length;
        let exchange=0;
        let series = [" ","!","'","#","$","%","&","\"","(",")","*","+",",","-",".","/",
        "0","1","2","3","4","5","6","7","8","9",":",";","<","=",">","?","@",
        "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
        "[","\\","]","^","_","`","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u",
        "v","w","x","y","z","{","|","}","~"];

		for(let i=0; i<msg.length; i++) {
			j= parseInt(key.charAt(looper));
            let temp = msg.charAt(i)
            if(temp=="©")
                temp = " ";
            
			for(let k=0; k<series.length; k++) {
				if(series[k] === temp) {
					exchange = k;
					break;
				}
			}
            let conv;
            if(msg.charAt(i)=="\n"){
                encypted = encypted.concat("\n");
                continue;
            }
			if(exchange-j<0) {
				conv = series[95+(exchange-j)];
			}
			else
				conv = series[exchange-j];
            
			
			encypted = encypted.concat(conv);
			looper = (looper+1)%len;
		}

		console.log("Decrypted: "+encypted);
        document.getElementById("encryted").innerText=encypted;
        document.getElementById("crypted").innerHTML="Decrypted Message:";
    
}

let names = [];
let quants = [];
let prices = [];
let i=0;
let celldata = document.getElementById("allcell");

function addval(){
	console.log("clicked");
	let str=`<tr>
	<th>Sr</th>
	<th>Name</th>
	<th>Quatity</th>
	<th>Prices </th>
	<th>Remv</th>
</tr>`;
	let name = document.getElementById("name").value;
	let quant = document.getElementById("quant").value;
	let price = document.getElementById("price").value;
	
	names[i] = name;
	quants[i] = quant;
	prices[i++] = price;

	let lop=0;
	for(let j=0; j<names.length; j++){
		str += `<tr><td>${j+1}</td><td>${names[j]}</td><td>${quants[j]}</td><td>${prices[j]}</td><td><button onclick = "handler(this.id)"class="clos" id="${j+1}">X</button></td></tr>`;
	}
	celldata.innerHTML = totalcalc(str);

}

//rgb(148, 108, 0)

function handler(id){
	console.log("X clicked:"+id);
	let str=`<tr>
	<th>Sr</th>
	<th>Name</th>
	<th>Quatity</th>
	<th>Prices </th>
	<th>Remv</th>
</tr>`;
	let tempname =[];
	let tempquant =[];
	let tempprice =[];
	let x=0;
	for(let j=0; j<names.length; j++){
		if(j==(id-1)){
			i--;
		}
		else{
			tempname[x] = names[j];
			tempquant[x] = quants[j];
			tempprice[x++] =prices[j];
			if(x>=names.length)
				break;
		}	
		
	}
	names=tempname;
	quants=tempquant;
	prices=tempprice;
	console.log(names)
	for(let j=0; j<names.length; j++){
		str += `<tr><td>${j+1}</td><td>${names[j]}</td><td>${quants[j]}</td><td>${prices[j]}</td><td><button onclick = "handler(this.id)"class="clos" id="${j+1}">X</button></td></tr>`;
	}
	
	celldata.innerHTML = totalcalc(str);
}

function resetval(){

	document.getElementById("name").value="";
	document.getElementById("quant").value="";
	document.getElementById("price").value="";

	
}

function totalcalc(str){
	let tot = document.getElementById("totals");
	let total=0;
	let j;
	console.log("quant: "+quants+", prices: "+prices);
	for(j=0; j<names.length; j++){

		if(quants[j]==""){
			total += parseInt(prices[j]) ;
		}
			
		else if(prices[j]=="")
			total += parseInt(quants[j]);
		else if(prices[j]=="" && quants[j]=="");
		else
		total += quants[j]*prices[j];
	}
	str += `<tr><td>#</td><td></td><td colspan ="2"><b>Total: ${total}</b></td><td>~</td></tr>`;
	

	return str;

}

function copyElementText(idd) {
    var text = document.getElementById("encryted").innerText;
    var elem = document.createElement("textarea");
    document.getElementById("dbvalue").value = text;
    document.body.appendChild(elem);
    elem.value = text;
    elem.select();
    document.execCommand("copy");
    document.body.removeChild(elem);
    let tooltip = document.getElementById(idd);
    tooltip.animate([{
        visibility: 'visible',
        opacity: '1'
    }, 
  {
      visibility: 'hidden',
      opacity: '0'
  }],
  {
      duration:1000
  });
    
}

function inputData(){
	
    let titleIs = document.getElementById("title").value;
    let keyIs = document.getElementById("key").value;
    let descriptionIs = document.getElementById("description2").value;
    let encrypted = encrypt(keyIs, descriptionIs);
    let statusIs = "Unique Key";
    
    if(keyIs.match("7121996") !== null || keyIs == ""){
        statusIs = "Default key";
    }
    
    if(localStorage.getItem("ScriptAppData")!=null){
       
        let obj = JSON.parse(localStorage.getItem("ScriptAppData"));
        let i =1;
        while(obj.tasks[i]!=null){
            i++;
        }
        obj.tasks[i]={
            title: titleIs,
            status: statusIs,
            description: encrypted
        }

        let db = JSON.stringify(obj);
        localStorage.setItem("ScriptAppData", db);
        
    }
    else{
        let masterDb = {
            tasks:{
                1:{
                    title: titleIs,
                    status: statusIs,
                    description: encrypted
                }
            }
        }

        let db = JSON.stringify(masterDb);
        localStorage.setItem("ScriptAppData", db);
        
    }
    document.getElementById("title").textContent = "";
    document.getElementById("key").textContent = "";
    document.getElementById("description2").textContent = "";
    togglePopup('popupTask');
    renderer("ScriptAppData", ".AllTasks");

}

function deleteData(){
    if(confirm("Are you sure? You are about to wipe out whole data")){
        let len = localStorage.length;
        for(let i=0; i< len; i++){
            let tempkey = localStorage.key(0);
            localStorage.removeItem(tempkey);
            
        }
        alert("All data deleted!!");
    }
    else{
        alert("Deletion aborted");
    }
}

function handleClick(){
    const popup = document.getElementById("popup");
    const overlay = document.getElementById("overlay");
    console.log("clicked");
    popup.classList.toggle("active");
    overlay.classList.toggle("active");
    putVals();
}

function handleEdit(){
    let inputval = document.getElementById("keyy2").value;
    let targetval = document.getElementById("keyy3");
    let output = document.getElementById("encryted").innerText;
    if(isMenuOpened && output!="")
        targetval.value = output;
    else
        targetval.value = inputval;
    document.getElementById("inpuEdit").style.visibility="visible";

}

function closePop(){
    let inputval = document.getElementById("keyy2");
    let targetval = document.getElementById("keyy3").value;
    inputval.value = targetval;

    document.getElementById("inpuEdit").style.visibility="hidden";
}

function closeall(){
    const popup = document.getElementById("popup");
    const overlay = document.getElementById("overlay");
    console.log("clicked");
    popup.classList.toggle("active");
    overlay.classList.toggle("active");

}

function closeall2(){
    const updatew = document.getElementById("popup2");
    const overlay = document.getElementById("overlay");
    updatew.classList.toggle("active");
    overlay.classList.toggle("active");

}

function getVal(e){
    closeall();
    let textt = localStorage.getItem(e.textContent);
    document.getElementById("keyy2").value=textt;
    isMenuOpened = true;
    saveTitle = e.textContent;
    console.log("title name:"+saveTitle);
    decrypt();
    
}

function putVals(){
    list = document.getElementById("mainlist");

    let fullstr="";
    for(let i=0; i< localStorage.length; i++){
        let tempkey = localStorage.key(i);
        fullstr = fullstr.concat(`<li onclick="getVal(this)" class="ineerli">${tempkey}</li>`)
    }   
    list.innerHTML=fullstr; 
    
}

function updateData(){
    closeall2();
    let replacer = document.getElementById("encryted").innerText;
    console.log(saveTitle+" -> "+replacer);
    if(saveTitle!="")
    localStorage.setItem(saveTitle, replacer);
}

function togglePopup(classOfPopup) {

    let popup = document.querySelector(`.${classOfPopup}`);
    let overlay = document.querySelector(".overlay");

    popup.classList.toggle("active");
    overlay.classList.toggle("active");
}


function indexAllocTask(index) {
    localStorage.setItem("indexof", index.toString());
    
    location.href = "./output.html";
}

function renderer(key, classId) {
    if(localStorage.getItem(key)!=null){
        let obj = JSON.parse(localStorage.getItem(key));
        let i =1;
        let str = "";
        let clasTitle =  document.querySelector(classId);
        while(obj.tasks[i]!=null){
            let status1 = obj.tasks[i].status;
            let current_status;
            let color;
            let newDiv;
            if(status1 == "Default key"){
                current_status = 'fas fa-unlock-alt';
                color = 'yellow';
            }
                
            else{
                current_status = 'fas fa-lock';
                color = 'rgb(59, 255, 124)';
            }

            
                newDiv= `<div class='sample'>
                            <div class="status">
                                <i style="color: ${color}; border: 2px solid ${color};" id="statusIcon" class="${current_status}" onclick="completeTask(${i})"></i>
                            </div>
                            <div class="contentContainer" onclick="indexAllocTask(${i})">
                                <h2>${obj.tasks[i].title}</h2>
                            </div>
                        </div>`;
            let temp = newDiv;
            temp = temp+str;
            str = temp;
            i++;
            

        }
        if(str!="")
            clasTitle.innerHTML = str;
    }
}

renderer("ScriptAppData", ".AllTasks");