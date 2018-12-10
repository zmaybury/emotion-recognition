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
  
    return fetch(getServiceURI('api/tempUploadImage'), myInit);
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

export const detectFaces = (image) => {
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

  return fetch(getServiceURI('api/faces'), myInit)
  .then((response) => response.json());
}

export const detectFacesAndEmotion = (image) => {
  let myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const myInit = { 
    method: 'POST',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default',
    body: JSON.stringify({
      imgBase64: image
    })
  };

  return fetch(getServiceURI('api/facesAndEmotion'), myInit)
  .then((response) => response.json());
}

export default {
    getServiceURI,
    uploadImage,
    detectFaces,
    detectFacesAndEmotion
};