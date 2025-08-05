import React from 'react'
import ShortenItem from './ShortenItem'

const handleViewQR = async (shortUrl) => {
  const link = document.createElement('a');
  link.href = `http://localhost:8080/api/urls/qr/${shortUrl}`;
  link.download = `${shortUrl}-qr.png`;
  link.click();
};


const ShortenUrlList = ({ data }) => {
  return (
    <div className='my-6 space-y-4'>
        {data.map((item) => (
            <ShortenItem key={item.id} {...item} />
        ))}
    </div>
  )
}

export default ShortenUrlList