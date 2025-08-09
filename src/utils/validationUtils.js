export function isEmailUtil(email){
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

export function isEntryLengthUtil(txt, length){
    if(txt.length < length){
        return false;
    }
    return true;
}