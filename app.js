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
    document.getElementById("icon1").style.color="#fff";
    document.getElementById("icon2").style.color="rgb(151, 202, 209)";
    document.getElementById("icon3").style.color="rgb(151, 202, 209)";
    document.getElementById("allcont").scrollTop=0;
}

function swipeleft2(){
    document.getElementById("content1").style.transform="translateX(-100%)";
    document.getElementById("content2").style.transform="translateX(0%)";
    document.getElementById("content3").style.transform="translateX(100%)";
    document.getElementById("icon2").style.color="#fff";
    document.getElementById("icon1").style.color="rgb(151, 202, 209)";
    document.getElementById("icon3").style.color="rgb(151, 202, 209)";
    document.getElementById("allcont").scrollTop=0;
}

function swipeleft3(){
    document.getElementById("content1").style.transform="translateX(-200%)";
    document.getElementById("content2").style.transform="translateX(-100%)";
    document.getElementById("content3").style.transform="translateX(0%)";
    document.getElementById("icon3").style.color="#fff";
    document.getElementById("icon2").style.color="rgb(151, 202, 209)";
    document.getElementById("icon1").style.color="rgb(151, 202, 209)";
    document.getElementById("allcont").scrollTop=0;
}

let chngeicn=0;
const overlay = document.querySelector(".ovelay2");
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

function encrypt(){
    let key = document.getElementById("keyy").value;
    let msg = document.getElementById("keyy2").value;
    if(key!=""){
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
            conv = series[(exchange+j)%95];
            if(firstspace==true){
                if(conv==" ")
                break;
            }
            firstspace=false;
            if(i === msg.length-2)
                firstspace=true;
            encypted = encypted.concat(conv);
            looper = (looper+1)%len;
        }
        if(firstspace==true){
            document.getElementById("crypted").innerHTML=`Please change ${looper+1}'th digit to avoid SPACE error <br/>This occurs when encrypted code is having first or last letter as a SPACE`;
            document.getElementById("encryted").innerHTML="! Warning !<br/>SPACE at the beginning or at the end";
        }
        
        else{
            console.log("Encrypted:"+encypted);
            document.getElementById("encryted").innerText=encypted;
            document.getElementById("crypted").innerHTML="Encrypted Message:";
        }
        
    }	
    else
        alert("key not entered");
    
}

function decrypt(){
    let key = document.getElementById("keyy").value;
    let msg = document.getElementById("keyy2").value;
    if(key!=""){
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
			for(let k=0; k<series.length; k++) {
				if(series[k] === msg.charAt(i)) {
					exchange = k;
					break;
				}
			}
            let conv;
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
    else
        alert("Please enter a key");
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