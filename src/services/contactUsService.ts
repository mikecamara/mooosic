import axios from 'axios';

export const submitContactForm = async (formValues: any) => {
  const apiUrl =
    'https://wmfgfeb8s8.execute-api.ap-southeast-2.amazonaws.com/contactUsStage-63d945b/contact-us';
  return await axios.post(apiUrl, formValues);
};
