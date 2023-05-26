import APIResponseSong from '../interfaces/APIResponseSong';

type ResponseSearchData = {
  results: APIResponseSong[];
  resultCount: number;
};

export default ResponseSearchData;
