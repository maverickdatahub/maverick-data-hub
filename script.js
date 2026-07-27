alert("TEST WORKING");

alert("NEW SCRIPT LOADED");

alert("SCRIPT LOADED");

const SUPABASE_URL = "https://vkylgfklycpeemgwjnwn.supabase.co";
const SUPABASE_KEY = "sb_publishable_w83Ndm_xtI_A9O11GEhK-w__TXMWyEk";
function placeOrder(){

alert("Step 1");

let name = document.getElementById("name").value;
let phone = document.getElementById("phone").value;
let network = document.getElementById("network").value;
let bundle = document.getElementById("bundle").value;

let proofFile = document.getElementById("proof").files[0];

if(!proofFile){
alert("Please upload payment screenshot");
return;
}

let formData = new FormData();
formData.append("file", proofFile);
formData.append("upload_preset", "mdh_payment_upload");

fetch("https://api.cloudinary.com/v1_1/znemrfzm/image/upload", {
method:"POST",
body:formData
})
.then(res=>res.json())
.then(data=>{

let proof = data.secure_url;

alert("PROOF LINK: " + proof);

console.log("BUNDLE:", JSON.stringify(bundle));

let matches = bundle.match(/[0-9]+\.[0-9]+$/);
console.log("MATCHES:", matches);

let price = 0;

if(bundle.includes("1GB")) price = 6.50;
if(bundle.includes("2GB")) price = 11.50;
if(bundle.includes("5GB")) price = 26.50;
if(bundle.includes("10GB")) price = 36.50;
if(bundle.includes("20GB")) price = 70.00;
if(bundle.includes("50GB")) price = 170.00;
if(bundle.includes("100GB")) price = 330.00;

alert("FINAL PRICE: " + price);

alert("FINAL PRICE BEFORE SEND: " + price);

alert("Bundle=[" + bundle + "] Price=" + price);

alert("RAW=[" + bundle + "] PRICE=" + price);

alert("FINAL PRICE BEFORE SEND: " + price);

let order = {
  name: name,
  phone: phone,
  network: network,
  bundle: bundle,
  price: price,
  proof: proof,
  status: "Pending"
};

console.log(order);
alert(JSON.stringify(order));

alert(JSON.stringify(order));

fetch(SUPABASE_URL + "/rest/v1/orders",{
method:"POST",
headers:{
"apikey":SUPABASE_KEY,
"Authorization":"Bearer "+SUPABASE_KEY,
"Content-Type":"application/json",
"Prefer":"return=representation"
},
body:JSON.stringify(order)
})
.then(response=>{
alert("STATUS: "+response.status);

if(response.ok){
alert("Order placed successfully ✅");

let message = 
"🔥 Maverick Data Hub Order 🔥\n\n" +
"Name: " + name + "\n" +
"Phone: " + phone + "\n" +
"Network: " + network + "\n" +
"Bundle: " + bundle + "\n" +
"Amount: GH₵" + price;

let whatsapp = "https://wa.me/233546155096?text=" + encodeURIComponent(message);

window.location.href = whatsapp;

}else{
alert("Order failed ❌");
}
})
.catch(error=>{
alert(error);
});

});

}
