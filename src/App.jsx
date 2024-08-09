import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getImages();
  }, [page]);

  const getImages = async () => {
    try {
      const res = await axios.get(`https://picsum.photos/v2/list?page=${page}&limit=10`);
      const imageUrls = res.data.map((element) => element.download_url);
      setImages(imageUrls);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleNext = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevious = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1)); 
  };

  return (
    <>
      <div className="flex flex-col border border-black">
        <div className="border border-b-black">
          <div className="flex flex-row md:p-6 items-center gap-x-14 md:gap-x-[30%]">
            <div className="md:border border-black border-r w-[20%] md:w-[5%] h-20 flex items-center float-left justify-center px-7">
              LOGO
            </div>
            <div className="border border-black h-10 w-[60%] flex items-center justify-center px-8 py-1 md:w-[30%]">
              Site Title
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center h-[20vh] items-center text-2xl font-bold">
          Header Image
        </div>
        <div className="flex flex-row flex-wrap ">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index}`}
              className="object-cover border border-black p-10 md:h-[40vh] "
            />
          ))}
        </div>
        <div className="flex justify-between p-4">
          <button
            onClick={handlePrevious}
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={page === 1}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
