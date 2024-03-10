// function countryBasedDivisor(place, countryCode) {
//   if (countryCode.toUpperCase() === 'IN' ){
//     if( place > 3) {
//       console.log("returning 2")
//       return 2;
//     }
//   }
//   return 3;
// }


// Format the price above to USD using the locale, style, and currency. en-US, USD
//const price = 14340;
export let IndianRupee = new Intl.NumberFormat('en-IN', {style: 'currency', currency: 'INR',});
export let USDollar    = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD',});
export let IndianDate  = new Intl.DateTimeFormat('en-IN', {
  dateStyle: 'medium',
  timeStyle: 'long',
  timeZone:  'Asia/Kolkata',
})
//datetime: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute:'numeric', second:'numeric',timeZoneName: 'short'})
//console.log(`The formated version of ${price} is ${indianRupee.format(price)}`);
// The formated version of 14340 is $14,340.00


export const toIndianCurrency = (num) => {
  return num.toLocaleString('en-IN', {style: 'currency',currency: 'INR' });
};

//Money formatter function $1,000,000 or rupee currency ₹  
// function formatAmount(num) {
//   let p = num.toFixed(2).split('.');
//   return (
//     '₹ ' + (p[0].split('')[0] === '-' ? '-' : '') +
//     p[0].split('').reverse()
//       .reduce(function (acc, num, i, orig) {
//         return num === '-' ? acc : num + (i && !(i % 3) ? ',' : '') + acc;
//       }, '') +
//     '.' +
//     p[1]
//   );
// }
// function formattedReadableAmount(amount, locale, currcy) {
//   let amt = amount.toFixed(2);
//   amt = amt.toLocaleString(locale, {style: "currency", currency: currcy,  maximumSignificantDigits: 3 });
//   console.log(amt);
//   return amt;
// }

//export default IndianRupee;
//module.exports = {IndianRupee, USDollar, toIndianCurrency} 

// const _IndianRupee = IndianRupee;
// export { _IndianRupee as IndianRupee }; 
// const _USDollar = USDollar;
// export { _USDollar as USDollar }; 
// const _toIndianCurrency = toIndianCurrency;
// export { _toIndianCurrency as toIndianCurrency }; 

//exports.toIndianCurrency = toIndianCurrency;

//export {  IndianRupee }; 
//export {  USDollar }; 
//export {  toIndianCurrency }; 

