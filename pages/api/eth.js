// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';

export default function handler(req, res) {
  const options = {
    method: 'GET',
    url: `https://api.nftport.xyz/v0/accounts/${req.body.address}`,
    params: { chain: 'ethereum', page_size: '50', include: 'metadata' },
    headers: {
      accept: 'application/json',
      Authorization: 'd7fde271-9944-4328-b120-b3e6552a6104',
    },
  };

  axios
    .request(options)
    .then(function (response) {
      res.status(200).json(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
}
