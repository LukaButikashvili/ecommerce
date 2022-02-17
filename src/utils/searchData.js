function searchData(array, searchingValue, searchingFor) {
  const valueLength = searchingValue.length;

  const findData = array.filter((item) => {
    let partOfString;

    if (searchingFor === "products") {
      partOfString = item.title.substr(0, valueLength);
    }

    if (searchingFor === "users") {
      partOfString = item.username.substr(0, valueLength);
    }

    return partOfString === searchingValue;
  });

  return findData;
}

export default searchData;
