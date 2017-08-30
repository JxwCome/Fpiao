function isMobile(mobile) {
  var searchStr = /^(1+\d{10})$/;
  if (!searchStr.test(mobile)) {
    return false;
  } else {
    return true;
  }
};
function isInvoice(invoice) {
  var searchStr = /^[0-9a-zA-Z]*$/g;
  if (!searchStr.test(invoice)) {
    return false;
  } else {
    return true;
  }
};

// 去除空格
function trim(str) {
  return str.replace(/(^\s+)|(\s+$)/g, "");
}


module.exports = {
  isMobile: isMobile,
  trim: trim,
  isInvoice: isInvoice
}
