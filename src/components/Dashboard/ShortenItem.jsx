import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { FaExternalLinkAlt, FaRegCalendarAlt } from 'react-icons/fa';
import { IoCopy } from 'react-icons/io5';
import { LiaCheckSolid } from 'react-icons/lia';
import { MdAnalytics, MdOutlineAdsClick, MdQrCode } from 'react-icons/md';
import api from '../../api/api';
import { Link, useNavigate } from 'react-router-dom';
import { useStoreContext } from '../../contextApi/ContextApi';
import { Hourglass } from 'react-loader-spinner';
import Graph from './Graph';
import QrModal from '../../ui/QrModal';

const ShortenItem = ({ originalUrl, shortUrl, clickCount, createdDate }) => {
  const { token } = useStoreContext();
  const navigate = useNavigate();
  const [isCopied, setIsCopied] = useState(false);
  const [analyticToggle, setAnalyticToggle] = useState(false);
  const [loader, setLoader] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState('');
  const [analyticsData, setAnalyticsData] = useState([]);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false); 
  const [qrImageUrl, setQrImageUrl] = useState(null);

  const subDomain = import.meta.env.VITE_REACT_FRONT_END_URL.replace(/^https?:\/\//, '');

  const handleDownloadQR = async () => {
    try {
      const response = await api.get(`/api/urls/qr/${shortUrl}`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: 'image/png' });
      const imageUrl = URL.createObjectURL(blob);
      setQrImageUrl(imageUrl);
      setIsQrModalOpen(true);
    } catch (error) {
      console.error('QR Code fetch failed:', error);
      alert('Unable to preview QR code.');
    }
  };

  const analyticsHandler = (shortUrl) => {
    if (!analyticToggle) {
      setSelectedUrl(shortUrl);
    }
    setAnalyticToggle(!analyticToggle);
  };

  const fetchMyShortUrl = React.useCallback(async () => {
    setLoader(true);
    try {
      const { data } = await api.get(
        `/api/urls/analytics/${selectedUrl}?startDate=2024-12-01T00:00:00&endDate=2025-12-31T23:59:59`,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      setAnalyticsData(data);
      setSelectedUrl('');
    } catch (error) {
      navigate('/error');
    } finally {
      setLoader(false);
    }
  }, [selectedUrl, token, navigate]);

  useEffect(() => {
    if (selectedUrl) {
      fetchMyShortUrl();
    }
  }, [selectedUrl, fetchMyShortUrl]);

  return (
    <div className="bg-slate-100 shadow-lg border border-dotted border-slate-500 px-6 py-4 rounded-md">
      <div className="flex sm:flex-row flex-col sm:justify-between w-full gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Link
              target="_"
              to={`${import.meta.env.VITE_REACT_FRONT_END_URL}/s/${shortUrl}`}
              className="text-blue-600 font-semibold break-all"
            >
              {subDomain + '/s/' + shortUrl}
            </Link>
            <FaExternalLinkAlt className="text-blue-600" />
          </div>

          <p className="text-sm text-gray-700 truncate">{originalUrl}</p>

          <div className="flex items-center gap-4 pt-4">
            <div className="flex items-center gap-1 text-green-700 font-medium">
              <MdOutlineAdsClick />
              <span>{clickCount}</span>
              <span>{clickCount === 1 ? 'Click' : 'Clicks'}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-800 font-medium">
              <FaRegCalendarAlt />
              <span>{dayjs(createdDate).format('MMM DD, YYYY')}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
          <CopyToClipboard
            text={`${import.meta.env.VITE_REACT_FRONT_END_URL}/s/${shortUrl}`}
            onCopy={() => setIsCopied(true)}
          >
            <button className="bg-indigo-600 text-white px-4 py-2 rounded shadow-md flex items-center gap-1">
              {isCopied ? 'Copied' : 'Copy'}
              {isCopied ? <LiaCheckSolid /> : <IoCopy />}
            </button>
          </CopyToClipboard>

          <button
            onClick={() => analyticsHandler(shortUrl)}
            className="bg-rose-700 text-white px-4 py-2 rounded shadow-md flex items-center gap-1"
          >
            Analytics
            <MdAnalytics />
          </button>

          <button
            onClick={handleDownloadQR}
            className="bg-blue-600 text-white px-4 py-2 rounded shadow-md flex items-center gap-1"
          >
            QR Preview
            <MdQrCode />
          </button>
        </div>
      </div>

      {/* 📊 Analytics Graph */}
      {analyticToggle && (
        <div className="mt-4 border-t pt-4">
          {loader ? (
            <div className="flex justify-center items-center h-40">
              <Hourglass visible={true} height="50" width="50" />
            </div>
          ) : (
            <>
              {analyticsData.length === 0 ? (
                <p className="text-gray-500 text-center mt-2">No data available for this period.</p>
              ) : (
                <Graph graphData={analyticsData} />
              )}
            </>
          )}
        </div>
      )}

      {/* 🔍 QR Modal */}
      <QrModal isOpen={isQrModalOpen} imageUrl={qrImageUrl} onClose={() => setIsQrModalOpen(false)} />
    </div>
  );
};

export default ShortenItem;
