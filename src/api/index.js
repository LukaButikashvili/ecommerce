const API = process.env.REACT_APP_API_URL;

async function fetchCategories() {
  try {
    const res = await fetch(`${API}/products/categories`);
    if (res.ok) {
      return res.json();
    }
    throw new Error("Error while fetching categories");
  } catch (e) {
    throw new Error(e.message);
  }
}

async function removeProduct(id) {
  const res = await fetch(`${API}/products/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return data;
}

async function postProduct(product) {
  const res = await fetch(`${API}/products`, {
    method: "POST",
    body: JSON.stringify(product),
  });
  const data = await res.json();
  return data;
}

async function postUser(user) {
  const res = await fetch(`${API}/users`, {
    method: "POST",
    body: JSON.stringify(user),
  });
  if (res.ok) {
    return res.json();
  }
  throw new Error("Error while posting users");
}

async function removeUser(id) {
  const res = await fetch(`${API}/users/${id}`, {
    method: "DELETE",
  });
  console.log(res);
  const data = await res.json();
  return data;
}

async function fetchUsersCarts() {
  try {
    const res = await fetch(`${API}/carts`);
    if (res.ok) {
      return res.json();
    }
    throw new Error("Error while fetching carts");
  } catch (e) {
    throw new Error(e.message);
  }
}
export {
  fetchCategories,
  removeProduct,
  postProduct,
  postUser,
  removeUser,
  fetchUsersCarts,
};
