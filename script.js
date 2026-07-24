const SUPABASE_URL = "https://vkylgfklycpeemgwjnwn.supabase.co";
const SUPABASE_KEY = "sb_publishable_w83Ndm_xtI_A9O11GEhK-w__TXMWyEk";
function placeOrder(){

alert("Step 1");

let name = document.getElementById("name").value;
let phone = document.getElementById("phone").value;
let network = document.getElementById("network").value;
let bundle = document.getElementById("bundle").value;
alert(name + " | " + phone + " | " + network + " | " + bundle);
fetch(SUPABASE_URL + "/rest/v1/orders", {
method: "POST",
headers: {
"apikey": SUPABASE_KEY,
"Authorization": "Bearer " + SUPABASE_KEY,
"Content-Type": "application/json",
"Prefer": "return=representation"
},
body: JSON.stringify({
name: name,
phone: phone,
network: network,
bundle: bundle,
price: 0,
status: "Pending"
})
})
.then(async response => {
alert("STATUS: " + response.status);
console.log("STATUS:", response.status);

let data = await response.text();
console.log(data);

if(response.ok){
alert("Order placed successfully ✅");
}else{
alert("Error: " + data);
}
})
.catch(error => {
console.log(error);
});
}
