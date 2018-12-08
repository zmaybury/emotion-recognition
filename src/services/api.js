export const getServiceURI = (endpoint) => {
    return window.location.href + endpoint;
}

export const base64Encode = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export const genericFetchRequest = () => {

}

export const uploadImage = (image) => {
  return base64Encode(image)
  .then((encodedImage) => {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
  
    const myInit = { 
      method: 'POST',
      headers: myHeaders,
      mode: 'cors',
      cache: 'default',
      body: JSON.stringify({
        image: encodedImage
      })
    };
  
    return fetch(getServiceURI('tempUploadImage'), myInit);
  })
  .then((response) => {
    return base64Encode(image)
    .then((encodedImage) => {
      return {
        image: encodedImage,
        name: image.file
      }
    });
  });
}

export const detectFaces = (image, endpoint) => {
  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const myInit = { 
    method: 'POST',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default',
    body: JSON.stringify({
      imgBase64 : image
    })
  };

  return fetch(getServiceURI('faces'), myInit)
  .then((response) => response.json());
}

export default {
    genericFetchRequest,
    getServiceURI,
    uploadImage,
    detectFaces
};