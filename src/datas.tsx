import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

const queryConfig = { refetchAllOnWindowFocus: false };

export const useDatas = ({ openModal, setImgSrc }) => {
  const { data, status, ...rest } = useQuery('movies', () =>
    axios({
      method: 'GET',
      url: 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos',
      params: {
        earth_date: '2018-05-05',
        camera: 'fhaz',
        api_key: 'Beqp6edRvivUhOiURmo4edj6ueWygR7jUdsr4Jnm',
      },
    })
  );

  if (status === 'loading') {
    return { data, status, ...rest };
  }

  const onImgClick = (src) => {
    setImgSrc(src);
    openModal();
  }

  const marsData = data.data.photos.map(photo => ({
    ...photo,
    camera: photo.camera['full_name'],
    rover: photo.rover.name,
  }));

  const columns = [
    { Header: 'id', accessor: 'id' },
    { Header: 'sol', accessor: 'sol' },
    { Header: 'camera', accessor: 'camera' },
    {
      Header: 'image',
      Cell: ({ row }) => (
        <img src={row.original['img_src']} alt="mars_picture" height={40} onClick={e => onImgClick(row.original['img_src'])}></img>
      ),
    },
    { Header: 'date', accessor: 'earth_date' },
    { Header: 'rover', accessor: 'rover' },
  ];

  return { ...rest, status, data: marsData, columns, queryConfig };
};
