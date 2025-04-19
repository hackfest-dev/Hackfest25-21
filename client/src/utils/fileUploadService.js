const handleIPFSUpload = async (file) => {
  if (!file) return alert('Please select a file first!');

  try {
    const formData = new FormData();
    formData.append('file', file);

    const VITE_PINATA_API_KEY = import.meta.env.VITE_PINATA_API_KEY;
    const VITE_PINATA_SECRET_API_KEY = import.meta.env.VITE_PINATA_SECRET_API_KEY;

    const res = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        pinata_api_key: VITE_PINATA_API_KEY,
        pinata_secret_api_key: VITE_PINATA_SECRET_API_KEY,
      },
      body: formData,
    });

    const data = await res.json();
    console.log(data);
    
    if (res.ok) return data.ipfsHash;
    else throw new Error('An error in upload');
  } catch (err) {
    console.log(err);
    return null;
  }
};

export { handleIPFSUpload };
