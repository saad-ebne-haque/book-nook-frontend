
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// GET
export const getData = async (url: string = '/') => {
    const res = await fetch(`${BASE_URL}${url}`);
    return res.json();
};

// POST
export const postData = async (url: string, data: object) => {
    const res = await fetch(`${BASE_URL}${url}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.json();
};

// PATCH
export const patchData = async (url: string, data: object) => {
    const res = await fetch(`${BASE_URL}${url}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.json();
};

// PUT
export const putData = async (url: string, data: object) => {
    const res = await fetch(`${BASE_URL}${url}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return res.json();
};

// DELETE
export const deleteData = async (url: string) => {
    const res = await fetch(`${BASE_URL}${url}`, {
        method: "DELETE",
    });
    return res.json();
};
