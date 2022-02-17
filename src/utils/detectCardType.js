import cardTypes from "../config/cardTypes";

// function detectCardType(number) {
//   let visa_regex = new RegExp("^4[0-9]{0,}$"); //4
//   let mastercard_regex = new RegExp(
//     "^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[01]|2720)[0-9]{0,}$" //2221-2720, 51-55
//   );
//   let amex_regex = new RegExp("^3[47][0-9]{0,}$"); //34, 37

//   if (number.match(visa_regex)) {
//     return cardTypes.VISA;
//   }

//   if (number.match(mastercard_regex)) {
//     return cardTypes.MASTERCARD;
//   }

//   if (number.match(amex_regex)) {
//     return cardTypes.AMERICANEXPRESS;
//   }
// }

function detectCardType(number) {
  //4
  if (number[0] === "4") {
    return cardTypes.VISA;
  }

  //2221-2720, 51-55
  const sliceNumber = number.slice(0, 2);
  if (
    sliceNumber === "51" ||
    sliceNumber === "52" ||
    sliceNumber === "53" ||
    sliceNumber === "54" ||
    sliceNumber === "55"
  ) {
    return cardTypes.MASTERCARD;
  }

  //34, 37
  if (sliceNumber === "34" || sliceNumber === "37") {
    return cardTypes.AMERICANEXPRESS;
  }
}

export { detectCardType };
