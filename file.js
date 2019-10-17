
// import { saveAs } from 'file-saver';
function loadFileAsText(mode) {
	var fileToLoad = document.getElementById('fileToLoad').files[0];
	// console.log(fileToLoad);
	read = new FileReader();

	read.readAsBinaryString(fileToLoad);

	read.onloadend =function() {
		let key = document.getElementById("password").value;
		if(mode=='en'){
			document.getElementById("input").innerHTML = read.result
			cipher=aesEncrypt(read.result,key);
			document.getElementById("output").innerHTML = cipher
			writeToFile(cipher);
		}
		if(mode=='de'){
			document.getElementById("input").innerHTML = read.result

			cipher=aesDecrypt(read.result,key);
			document.getElementById("output").innerHTML = cipher

			writeToFile(cipher);
		}
		
	};
}

function writeToFile(data) {
	var FileSaver = require('file-saver');
	var blob = new Blob([data], {type: "text/plain;charset=utf-8"});
	FileSaver.saveAs(blob, "AESOutput.txt");
	// const fs = require('fs');

	// fs.writeFile('Output1.jpg', data, (err) => {
		
	// 	if (err) throw err;
	// });
}




function aesEncrypt(content,key){
	
	var ciphertext = Aes.Ctr.encrypt(content, key, 128);
	return ciphertext;

}

function aesDecrypt(content,key){
	var origtext = Aes.Ctr.decrypt(content, key, 128);
	return origtext;
}